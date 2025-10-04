/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse, GenerateContentParameters } from "@google/genai";

// --- Type Definitions ---
export interface ApiKeys {
    google: string;
    ideogram: string;
    revart: string;
}

// --- Helper Functions ---

/**
 * Processes the Gemini API response, extracting the image or throwing a detailed error if issues occur.
 * @param response The response from the generateContent call.
 * @returns A data URL string for the generated image.
 */
function processGeminiResponse(response: GenerateContentResponse): string {
    // Check for safety blocks or other reasons for no candidates.
    if (!response.candidates || response.candidates.length === 0) {
        const blockReason = response.promptFeedback?.blockReason;
        if (blockReason) {
            // Throw a specific key for the UI to translate.
            throw new Error('api_request_blocked');
        }
        // Handle cases where there are no candidates without a specific block reason.
        throw new Error("The AI model returned an empty response. This may be due to a content filter or an internal server error. Please try a different prompt.");
    }

    const imagePartFromResponse = response.candidates[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        return `data:${mimeType};base64,${data}`;
    }

    // If there are candidates but no image, extract the text response for debugging.
    const textResponse = response.text;
    console.error("API did not return an image. Text response:", textResponse);
    
    const errorMessage = textResponse
        ? `The AI model responded with text instead of an image: "${textResponse}"`
        : "The AI model did not return an image and provided no text explanation. This could be due to a content filter or an issue with the prompt.";
    throw new Error(errorMessage);
}


/**
 * A generic wrapper for the Gemini API call that includes a retry mechanism for internal server errors.
 * @param request The complete request payload for the generateContent API.
 * @param apiKey The user-provided Google API key.
 * @returns The GenerateContentResponse from the API.
 */
async function callGeminiApi(request: GenerateContentParameters, apiKey: string): Promise<GenerateContentResponse> {
    if (!apiKey) {
        // This error is caught before the API call in `generateWithGemini`.
        throw new Error("Google API key is not configured.");
    }
    const ai = new GoogleGenAI({ apiKey });
    const maxRetries = 3;
    const initialDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await ai.models.generateContent(request);
        } catch (error) {
            console.error(`Error calling Gemini API (Attempt ${attempt}/${maxRetries}):`, error);
            const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
            
            // Handle specific user-facing errors by throwing translatable keys.
            if (errorMessage.includes('API key not valid') || errorMessage.includes('PERMISSION_DENIED')) {
                throw new Error('api_key_invalid');
            }
            if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
                throw new Error('api_quota_exceeded');
            }

            const isInternalError = errorMessage.includes('"code":500') || errorMessage.includes('INTERNAL');

            if (isInternalError && attempt < maxRetries) {
                const delay = initialDelay * Math.pow(2, attempt - 1);
                console.log(`Internal error detected. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            // For other errors, re-throw the original to be handled generically.
            throw error; 
        }
    }
    // This should be unreachable due to the loop and throw logic above.
    throw new Error("Gemini API call failed after all retries.");
}


/**
 * Generates an image using Google's Gemini or Imagen models.
 */
async function generateWithGemini(imageDataUrl: string | null, prompt: string, apiKey: string): Promise<string> {
    if (!apiKey) {
        throw new Error('api_key_invalid'); // Use a key that can be translated
    }

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
        
        const aspectRatioMatch = prompt.match(/Ratio d'aspect : ([\d:]+)/);
        const aspectRatio = aspectRatioMatch ? aspectRatioMatch[1] : '1:1';

        // This instruction forces the model to re-imagine the scene, using the photo
        // only as a reference for the person's face, not for clothes or pose.
        // It now also includes a strong directive to respect the aspect ratio.
        const editInstruction = `IMPORTANT: Use the provided photo ONLY as a reference for the person's face. DO NOT copy the clothing, pose, or background. Create a completely new and different image based on the following creative brief, ensuring the face resembles the person in the photo.
        
        CRITICAL FORMATTING INSTRUCTION: The final generated image MUST have an aspect ratio of ${aspectRatio}. Compose the scene to fill this format perfectly.
        
        --- CREATIVE BRIEF ---\n${prompt}`;
        const textPart = { text: editInstruction };

        const request = {
            model: 'gemini-2.5-flash-image',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        };

        try {
            const response = await callGeminiApi(request, apiKey);
            return processGeminiResponse(response);
        } catch (error) {
            console.error("An unrecoverable error occurred during image modification.", error);
             // Re-throw specific errors or a generic one if not already handled.
            if (error instanceof Error && (error.message === 'api_key_invalid' || error.message === 'api_quota_exceeded' || error.message === 'api_request_blocked')) {
                throw error;
            }
            throw new Error(`The AI model failed to modify the image.`);
        }
    }
    // Case 2: Text-to-Image generation (no image provided)
    else {
        const ai = new GoogleGenAI({ apiKey });
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
            const response = await ai.models.generateImages(request);

            if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
                const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                return `data:image/jpeg;base64,${base64ImageBytes}`;
            }

            throw new Error("The AI model did not return any images.");

        } catch (error) {
            console.error("An unrecoverable error occurred during text-to-image generation.", error);
            if (error instanceof Error && (error.message === 'api_key_invalid' || error.message === 'api_quota_exceeded')) {
                throw error;
            }
            throw new Error(`The AI model failed to generate an image from text.`);
        }
    }
}

/**
 * Placeholder for Ideogram image generation.
 */
async function generateWithIdeogram(imageDataUrl: string | null, prompt: string, apiKey: string): Promise<string> {
    if (!apiKey) {
        throw new Error("Ideogram API key is not configured.");
    }
    // TODO: Implement actual API call to Ideogram
    throw new Error("Ideogram generation is not yet implemented.");
}

/**
 * Placeholder for RevArt image generation.
 */
async function generateWithRevArt(imageDataUrl: string | null, prompt: string, apiKey: string): Promise<string> {
    if (!apiKey) {
        throw new Error("RevArt API key is not configured.");
    }
    // TODO: Implement actual API call to RevArt
    throw new Error("RevArt generation is not yet implemented.");
}


/**
 * Main image generation router.
 * Calls the appropriate generation function based on the selected provider.
 */
export async function generateImage(
    imageDataUrl: string | null,
    prompt: string,
    provider: 'google' | 'ideogram' | 'revart',
    apiKeys?: ApiKeys,
): Promise<string> {
    if (!apiKeys) {
        throw new Error("API keys are missing.");
    }

    switch (provider) {
        case 'google':
            const googleKey = apiKeys?.google;
            if (!googleKey) throw new Error("A Google API key is required. Please set it in the API key manager.");
            return generateWithGemini(imageDataUrl, prompt, googleKey);
        case 'ideogram':
            const ideogramKey = apiKeys?.ideogram;
            if (!ideogramKey) throw new Error("An Ideogram API key is required. Please set it in the API key manager.");
            return generateWithIdeogram(imageDataUrl, prompt, ideogramKey);
        case 'revart':
            const revartKey = apiKeys?.revart;
            if (!revartKey) throw new Error("A RevArt API key is required. Please set it in the API key manager.");
            return generateWithRevArt(imageDataUrl, prompt, revartKey);
        default:
            throw new Error(`Unknown or unsupported provider: ${provider}`);
    }
}