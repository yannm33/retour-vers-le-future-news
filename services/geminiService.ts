/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse, GenerateContentParameters, VideosOperation } from "@google/genai";

// FIX: Updated ApiKeys interface to manage keys for Gemini, Ideogram, and RevArt as per user request.
export interface ApiKeys {
    gemini: string;
    ideogram: string;
    revart: string;
}

// --- Helper Functions ---

/**
 * Processes the Gemini API response, extracting the image or throwing an error if none is found.
 * @param response The response from the generateContent call.
 * @returns A data URL string for the generated image.
 */
function processGeminiResponse(response: GenerateContentResponse): string {
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        return `data:${mimeType};base64,${data}`;
    }

    const textResponse = response.text;
    console.error("API did not return an image. Response:", textResponse);
    throw new Error(`The AI model responded with text instead of an image: "${textResponse || 'No text response received.'}"`);
}

/**
 * A generic wrapper for the Gemini API call that includes a retry mechanism for internal server errors.
 * @param request The complete request payload for the generateContent API.
 * @param apiKey An optional user-provided API key.
 * @returns The GenerateContentResponse from the API.
 */
async function callGeminiApi(request: GenerateContentParameters, apiKey?: string): Promise<GenerateContentResponse> {
    const finalApiKey = apiKey || process.env.API_KEY;
    if (!finalApiKey) {
        throw new Error("Google API key is not configured.");
    }
    const ai = new GoogleGenAI({ apiKey: finalApiKey });
    const maxRetries = 3;
    const initialDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await ai.models.generateContent(request);
        } catch (error) {
            console.error(`Error calling Gemini API (Attempt ${attempt}/${maxRetries}):`, error);
            const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
            const isInternalError = errorMessage.includes('"code":500') || errorMessage.includes('INTERNAL');

            if (isInternalError && attempt < maxRetries) {
                const delay = initialDelay * Math.pow(2, attempt - 1);
                console.log(`Internal error detected. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            throw error; // Re-throw if not a retriable error or if max retries are reached.
        }
    }
    // This should be unreachable due to the loop and throw logic above.
    throw new Error("Gemini API call failed after all retries.");
}


/**
 * Generates an image using Google's Gemini or Imagen models.
 */
async function generateWithGemini(imageDataUrl: string | null, prompt: string, apiKey?: string): Promise<string> {
    const finalApiKey = apiKey || process.env.API_KEY;
    if (!finalApiKey) {
        throw new Error("Google API key is not configured.");
    }
    const ai = new GoogleGenAI({ apiKey: finalApiKey });

    // Case 1: Image-to-Image generation/modification (using the provided image)
    if (imageDataUrl) {
        const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
        if (!match) {
            throw new Error("Invalid image data URL format. Expected 'data:image/...;base64,...'");
        }
        const [, mimeType, base64Data] = match;

        const imagePart = {
            inlineData: { mimeType, data: base64Data },
        };
        const textPart = { text: prompt };

        const request = {
            model: 'gemini-2.5-flash-image',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        };

        try {
            console.log("Attempting image modification with prompt:", prompt);
            const response = await callGeminiApi(request, apiKey);
            return processGeminiResponse(response);
        } catch (error) {
            console.error("An unrecoverable error occurred during image modification.", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`The AI model failed to modify the image. Details: ${errorMessage}`);
        }
    }
    // Case 2: Text-to-Image generation (no image provided)
    else {
        const aspectRatioMatch = prompt.match(/Ratio d'aspect : ([\d:]+)/);
        const aspectRatio = aspectRatioMatch ? aspectRatioMatch[1] : '1:1';

        const request = {
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        };

        try {
            console.log("Attempting text-to-image generation with prompt:", request.prompt);
            const response = await ai.models.generateImages(request);

            if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
                const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                return `data:image/jpeg;base64,${base64ImageBytes}`;
            }

            throw new Error("The AI model did not return any images.");

        } catch (error) {
            console.error("An unrecoverable error occurred during text-to-image generation.", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`The AI model failed to generate an image from text. Details: ${errorMessage}`);
        }
    }
}

/**
 * Main image generation router.
 * Calls the Gemini generation function.
 */
export async function generateImage(
    imageDataUrl: string | null,
    prompt: string,
    apiKey?: string,
): Promise<string> {
    return generateWithGemini(imageDataUrl, prompt, apiKey);
}


/**
 * Edits an image based on a user-provided mask and text prompt.
 * This function uses the Gemini model.
 */
export async function editImageWithMask(
    originalImageUrl: string,
    maskImageUrl: string,
    prompt: string,
    apiKey?: string,
): Promise<string> {
    const originalMatch = originalImageUrl.match(/^data:(image\/\w+);base64,(.*)$/);
    const maskMatch = maskImageUrl.match(/^data:(image\/\w+);base64,(.*)$/);

    if (!originalMatch || !maskMatch) {
        throw new Error("Invalid image data URL format for editing.");
    }
    const [, originalMimeType, originalBase64] = originalMatch;
    const [, maskMimeType, maskBase64] = maskMatch;
    
    const originalImagePart = { inlineData: { mimeType: originalMimeType, data: originalBase64 } };
    const maskImagePart = { inlineData: { mimeType: maskMimeType, data: maskBase64 } };
    
    // Construct a more directive prompt for the model
    const detailedText = `You are an expert image editor. The user wants to modify an image.
    User's instruction: "${prompt}".
    You have been provided with two images: the original image and a black-and-white mask image.
    Your task is to apply the user's instruction ONLY to the area of the original image corresponding to the WHITE part of the mask.
    The BLACK part of the mask indicates the area that MUST remain completely unchanged.
    Preserve the original image's style, lighting, and texture in the unmasked areas. Blend the changes in the masked area seamlessly.`;
    const textPart = { text: detailedText };

    const request = {
        model: 'gemini-2.5-flash-image',
        contents: { parts: [originalImagePart, maskImagePart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    };

    try {
        console.log("Attempting image edit with prompt:", prompt);
        const response = await callGeminiApi(request, apiKey);
        return processGeminiResponse(response);
    } catch (error) {
        console.error("An unrecoverable error occurred during image editing.", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`The AI model failed to edit the image. Details: ${errorMessage}`);
    }
}

/**
 * Generates a video using Google's Veo model.
 * @param prompt The text prompt for the video.
 * @param imageDataUrl An optional base64 image data URL to use as a starting point.
 * @param onProgress A callback function to report progress updates.
 * @param apiKey An optional user-provided API key.
 * @returns A promise that resolves to the URL of the generated video.
 */
export async function generateVideo(
    prompt: string,
    imageDataUrl: string | null,
    onProgress: (key: string) => void,
    apiKey?: string,
): Promise<string> {
    const finalApiKey = apiKey || process.env.API_KEY;
    if (!finalApiKey) {
        throw new Error("Google API key is not configured.");
    }
    const ai = new GoogleGenAI({ apiKey: finalApiKey });

    onProgress('videoProgress_initializing');

    let image;
    if (imageDataUrl) {
        const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
        if (!match) {
            throw new Error("Invalid image data URL format.");
        }
        const [, mimeType, base64Data] = match;
        image = { imageBytes: base64Data, mimeType };
    }

    let operation: VideosOperation = await ai.models.generateVideos({
        model: 'veo-2.0-generate-001',
        prompt: prompt,
        ...(image && { image }), // Conditionally add image if it exists
        config: {
            numberOfVideos: 1
        }
    });

    onProgress('videoProgress_polling');

    // Poll for the result
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    onProgress('videoProgress_almostDone');

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
        throw new Error("Video generation completed, but no download link was provided.");
    }

    // Fetch the video content and create a blob URL
    const response = await fetch(`${downloadLink}&key=${finalApiKey}`);
    if (!response.ok) {
        throw new Error(`Failed to download the generated video. Status: ${response.status}`);
    }
    const videoBlob = await response.blob();
    return URL.createObjectURL(videoBlob);
}
