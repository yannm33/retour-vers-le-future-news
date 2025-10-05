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
 * Cleans a detailed, structured prompt into a simpler format suitable for the Imagen model.
 * It removes technical specs, comments, and verbose directives.
 * @param prompt The original detailed prompt.
 * @returns A cleaned-up string prompt.
 */
function cleanPromptForImagen(prompt: string): string {
    // Remove verbose directives, comments, technical specs, and empty lines.
    const cleanedPrompt = prompt
        .replace(/Objectif:.*?Interdits:.*?\./g, '') // Remove the long "Directive Artistique Principale"
        .split('\n')
        .map(line => line.trim())
        .filter(line => 
            !line.startsWith('//--') &&
            !line.startsWith("Ratio d'aspect") &&
            !line.startsWith("Qualité de rendu") &&
            !line.startsWith("Niveau d'upscale") &&
            !line.startsWith("Focale") &&
            !line.startsWith("Ouverture") &&
            !line.startsWith("Vitesse d'obturation") &&
            !line.startsWith("Sensibilité ISO") &&
            !line.startsWith("Grain photographique") &&
            !line.startsWith("Pellicule photographique") &&
            !line.startsWith("Étalonnage Cinéma") &&
            !line.startsWith("Signature") &&
            !line.match(/Mode : IMPÉRATIVEMENT/) &&
            line.trim() !== ''
        )
        .join(', '); // Join with commas for a more descriptive paragraph.
    
    return cleanedPrompt.trim();
}

/**
 * Generates a batch of images from a single text prompt using the Imagen model.
 * @param prompt The text prompt for generation.
 * @param apiKey The Google API key.
 * @param numberOfImages The number of images to generate in the batch.
 * @returns An array of data URL strings for the generated images.
 */
export async function generateImagesInBatch(prompt: string, apiKey: string, numberOfImages: number): Promise<string[]> {
    if (!apiKey) {
        throw new Error('api_key_invalid');
    }

    const ai = new GoogleGenAI({ apiKey });
    const aspectRatioMatch = prompt.match(/Ratio d'aspect : ([\d:]+)/);
    const aspectRatio = aspectRatioMatch ? aspectRatioMatch[1] : '1:1';
    const cleanedPrompt = cleanPromptForImagen(prompt);

    const request = {
        model: 'imagen-4.0-generate-001',
        prompt: cleanedPrompt,
        config: {
            numberOfImages: numberOfImages,
            outputMimeType: 'image/jpeg',
            aspectRatio: aspectRatio,
        },
    };

    try {
        const response = await ai.models.generateImages(request);

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages.map(img => {
                if (img.image?.imageBytes) {
                    return `data:image/jpeg;base64,${img.image.imageBytes}`;
                }
                throw new Error('API response included an image object without image data.');
            });
        }
        
        // If the response is empty, it's often due to safety filters.
        throw new Error('api_request_blocked');

    } catch (error) {
        console.error("An unrecoverable error occurred during batch text-to-image generation.", error);
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);

        if (errorMessage.includes('API key not valid') || errorMessage.includes('PERMISSION_DENIED')) {
            throw new Error('api_key_invalid');
        }
        if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
            throw new Error('api_quota_exceeded');
        }
        if (errorMessage.includes('prompt was blocked') || errorMessage.includes('SAFETY') || errorMessage === 'api_request_blocked') {
            throw new Error('api_request_blocked');
        }
        
        throw new Error(`The AI model failed to generate images from text.`);
    }
}


/**
 * Generates an image using Google's Gemini or Imagen models.
 * Note: This function is now primarily for single image generation/modification (image-to-image).
 * For text-to-image, prefer `generateImagesInBatch`.
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

        const editInstruction = `//-- ABSOLUTE DIRECTIVE: FACIAL ANALYSIS --//
ANALYZE AND REPLICATE THE FACE FROM THE PROVIDED PHOTO WITH EXTREME FIDELITY.
Your primary objective is to ensure the generated person is IDENTIFIABLE as the person in the source image.
Analyze these critical features from the source photo and reproduce them:
- Face shape (oval, square, round, etc.)
- Eye shape, color, and spacing.
- Nose structure (bridge, tip, width).
- Mouth shape and lip thickness.
- Jawline and chin definition.
- Unique features like moles or scars if present.

//-- SECONDARY DIRECTIVE: CREATIVE SCENE --//
While maintaining perfect facial resemblance, place this person in a completely new scene based on the creative brief below.
DO NOT copy the original photo's background, lighting, clothing, or pose. Only the facial identity is sacred.

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
    // Case 2: Text-to-Image generation (single image) - should be replaced by batch where possible.
    else {
        const results = await generateImagesInBatch(prompt, apiKey, 1);
        if (results.length > 0) {
            return results[0];
        }
        throw new Error("Batch generation returned no images.");
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
    numberOfImages: number = 1
): Promise<string | string[]> { // Return type can be single or array
    if (!apiKeys) {
        throw new Error("API keys are missing.");
    }

    switch (provider) {
        case 'google':
            const googleKey = apiKeys?.google;
            if (!googleKey) throw new Error("A Google API key is required. Please set it in the API key manager.");
            
            // Use batch generation for text-to-image
            if (!imageDataUrl) {
                return generateImagesInBatch(prompt, googleKey, numberOfImages);
            }
            // Use single generation for image-to-image (batch not supported)
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