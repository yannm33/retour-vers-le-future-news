/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { generateImage } from '../services/geminiService';
import { getSpecializedPrompt } from '../services/promptLibrary';
import { getDynamicEnhancements } from '../services/promptEnhancer';
import { ALL_STYLES_CONFIG, translations, MAGAZINE_PROMPT_DETAILS, MAGAZINE_STYLES } from '../lib/constants';
import { useGenerationForm } from '../hooks/useGenerationForm';

import Footer from '../components/Footer';
import Header from '../components/shared/Header';
import ImageGallery from '../components/ImageGallery';
import ImagePreviewModal from '../components/shared/ImagePreviewModal';
import MainControls from '../components/controls/MainControls';
import SettingsPanel from '../components/controls/SettingsPanel';

import { IconPhoto } from '@tabler/icons-react';

// --- Types ---
export type ImageStatus = 'pending' | 'done' | 'error';
export interface GeneratedImage {
    id: number;
    status: ImageStatus;
    url?: string;
    error?: string;
}
export type AppState = 'idle' | 'image-uploaded' | 'generating' | 'results-shown';
export type Language = 'FR' | 'EN';

function Editor() {
    // --- App State ---
    const [language, setLanguage] = useState<Language>('FR');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [appState, setAppState] = useState<AppState>('idle');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const formState = useGenerationForm();
    const { 
        style, subStyle, aspectRatio, colorMode, renderQuality, upscale, focale,
        ouverture, vitesse, photoGrain, expression, framing, hairColor,
        accessories, lutsCinema, dirt, sweat, speedEffect, customPrompt,
        signatureOn, signature
    } = formState;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const T = translations[language];

    // Effect to manage the global app state based on the status of generated images.
    useEffect(() => {
        if (generatedImages.length > 0) {
            const isGenerating = generatedImages.some(img => img.status === 'pending');
            if (isGenerating) {
                setAppState('generating');
            } else if (appState === 'generating') { // Only transition from generating to results
                setAppState('results-shown');
            }
        }
    }, [generatedImages, appState]);


    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setAppState('image-uploaded');
                setGeneratedImages([]);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const buildPrompt = () => {
        const promptOptions = { aspectRatio, colorMode, renderQuality, upscale };
        const specializedPrompt = getSpecializedPrompt(style, subStyle, promptOptions);
        if (specializedPrompt) {
            console.log("Using specialized prompt:", specializedPrompt);
            return specializedPrompt;
        }

        const isMagazineCover = MAGAZINE_STYLES.includes(style);
        let promptParts: string[] = [];

        // 1. Primary Goal
        promptParts.push('//-- PRIMARY GOAL --');
        if (isMagazineCover) {
            promptParts.push(`Generate a hyper-realistic magazine cover featuring the person from the provided photo. Their facial features and likeness must be faithfully represented.`);
        } else {
            promptParts.push(`Generate a hyper-realistic image of the person in the provided photo, ensuring faithful representation of their facial features and likeness.`);
        }

        // 2. Style & Theme / Magazine Identity
        if (isMagazineCover) {
            const magazineDetails = MAGAZINE_PROMPT_DETAILS[style as keyof typeof MAGAZINE_PROMPT_DETAILS];
            promptParts.push('//-- MAGAZINE & BRAND IDENTITY --');
            promptParts.push(`The image must be a professional front cover for "${magazineDetails.masthead}".`);
            promptParts.push(`Adhere to the brand's core aesthetic: ${magazineDetails.description}`);
            
            promptParts.push('//-- COVER THEME & COMPOSITION --');
            if (subStyle) {
                promptParts.push(`The specific theme for this cover is: "${subStyle.replace(/_/g, ' ')}". Adapt the scene, clothing, lighting, and mood to perfectly match this theme.`);
            }

            promptParts.push('//-- TYPOGRAPHY & LAYOUT --');
            promptParts.push(`The composition must include a prominent, realistic masthead (the magazine title: "${magazineDetails.masthead}").`);
            promptParts.push(`Incorporate several smaller cover lines with plausible-looking but ultimately unreadable placeholder text (similar to 'lorem ipsum') to complete the professional cover layout.`);
            promptParts.push(`The typography style must match the magazine's established branding.`);
        } else {
            const styleInfo = ALL_STYLES_CONFIG[style as keyof typeof ALL_STYLES_CONFIG];
            promptParts.push('//-- STYLE & THEME --');
            promptParts.push(`Main Style: "${style}".`);
            if (subStyle) {
                promptParts.push(`Specific Variation: "${subStyle.replace(/_/g, ' ')}".`);
            }
            if (styleInfo && styleInfo.notes) {
                promptParts.push(`Creative Direction: "${styleInfo.notes}".`);
            }
        }

        // 3. Technical & Camera Settings
        promptParts.push('//-- TECHNICAL & CAMERA --');
        promptParts.push(`Aspect Ratio: ${aspectRatio}`);
        promptParts.push(`Color Mode: ${colorMode}`);
        promptParts.push(`Render Quality: ${renderQuality}`);
        promptParts.push(`Upscale Target: ${upscale}`);
        if (focale !== 'Auto') promptParts.push(`Focal Length: approximately ${focale}mm.`);
        if (ouverture !== 'Auto') promptParts.push(`Aperture: f/${ouverture}.`);
        if (vitesse !== 'Auto') promptParts.push(`Shutter Speed: 1/${vitesse}s.`);
        if (photoGrain !== 'Aucun') promptParts.push(`Photographic Grain: '${photoGrain}'.`);
        
        // 4. Creative Details
        const creativeDetails: string[] = [];
        if (expression !== 'Neutre') creativeDetails.push(`Expression: '${expression}'.`);
        if (framing !== 'Plan en pied') creativeDetails.push(`Framing: '${framing}'.`);
        if (hairColor !== 'Noir profond') creativeDetails.push(`Hair Color: '${hairColor}'.`);
        if (accessories !== 'Aucun') creativeDetails.push(`Accessories: '${accessories}'.`);
        if (lutsCinema !== 'Aucun') creativeDetails.push(`Cinematic Color Grade (LUT): '${lutsCinema}'.`);
        if (dirt !== 'Aucune') creativeDetails.push(`Environmental Effects: '${dirt}'.`);
        if (sweat) creativeDetails.push(`Add beads of sweat to the person's skin.`);
        if (speedEffect) creativeDetails.push(`Incorporate a motion blur or 'speed effect' to suggest movement.`);
        
        if(creativeDetails.length > 0) {
            promptParts.push('//-- CREATIVE DETAILS --');
            promptParts.push(...creativeDetails);
        }

        // 5. User Override
        if (customPrompt) {
            promptParts.push('//-- USER OVERRIDE --');
            promptParts.push(`Follow these custom instructions carefully: "${customPrompt}".`);
        }
        
        // 6. Signature
        if (signatureOn && signature) {
            promptParts.push('//-- SIGNATURE --');
            promptParts.push(`Subtly embed the signature or watermark '${signature}' in a lower corner of the image.`);
        }

        return promptParts.join('\n');
    };

    const handleGenerateClick = async () => {
        if (!uploadedImage) return;

        const basePrompt = buildPrompt();
        
        const initialImages: GeneratedImage[] = Array.from({ length: formState.numberOfImages }, (_, i) => ({ id: i, status: 'pending' }));
        setGeneratedImages(initialImages); // This will trigger the useEffect

        // Generate images sequentially, but with a unique prompt for each one.
        for (const image of initialImages) {
            try {
                // Get unique artistic direction for this specific image
                const dynamicAdditions = getDynamicEnhancements(style, subStyle);
                const finalPrompt = `${basePrompt}\n\n//-- UNIQUE ARTISTIC DIRECTION FOR THIS IMAGE --\n${dynamicAdditions}`;
                
                console.log(`Generating image #${image.id} with unique prompt:`, finalPrompt);
                const resultUrl = await generateImage(uploadedImage, finalPrompt);
                
                setGeneratedImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'done', url: resultUrl } : img));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
                setGeneratedImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'error', error: errorMessage } : img));
                console.error(`Failed to generate image #${image.id}:`, err);
            }
        }
    };

    const handleRegenerateImage = async (imageId: number) => {
        if (!uploadedImage) return;

        const basePrompt = buildPrompt();
        // Generate new, unique enhancements for the regeneration
        const dynamicAdditions = getDynamicEnhancements(style, subStyle);
        const finalPrompt = `${basePrompt}\n\n//-- UNIQUE ARTISTIC DIRECTION FOR THIS IMAGE --\n${dynamicAdditions}`;

        // Set just this image to pending
        setGeneratedImages(prev =>
            prev.map(img =>
                img.id === imageId
                    ? { ...img, status: 'pending', url: undefined, error: undefined }
                    : img
            )
        );

        try {
            console.log(`Regenerating image #${imageId} with unique prompt:`, finalPrompt);
            const resultUrl = await generateImage(uploadedImage, finalPrompt);
            setGeneratedImages(prev =>
                prev.map(img =>
                    img.id === imageId ? { ...img, status: 'done', url: resultUrl } : img
                )
            );
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'An unknown error occurred.';
            setGeneratedImages(prev =>
                prev.map(img =>
                    img.id === imageId
                        ? { ...img, status: 'error', error: errorMessage }
                        : img
                )
            );
            console.error(`Failed to regenerate image #${imageId}:`, err);
        }
    };

    const handleDownloadSingleImage = (url: string, imageId: number) => {
        if (!url) return;
        const link = document.createElement('a');
        link.href = url;
        link.download = `retour-vers-le-futur-${style.toLowerCase().replace(/\s/g, '-')}-${imageId + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadAlbum = () => {
        generatedImages.forEach((image) => {
            if (image.status === 'done' && image.url) {
                handleDownloadSingleImage(image.url, image.id);
            }
        });
    };
    
    const isLoading = appState === 'generating';
    const styleConfig = ALL_STYLES_CONFIG[style as keyof typeof ALL_STYLES_CONFIG];
    
    // Handle both array and object for substyles
    const availableSubStyles = styleConfig?.substyles 
        ? (Array.isArray(styleConfig.substyles) ? styleConfig.substyles : Object.keys(styleConfig.substyles))
        : [];
    
    return (
        <main className="bg-gradient-to-t from-orange-900 via-orange-500 to-orange-200 text-neutral-800 min-h-screen w-full flex flex-col items-center p-4 font-sans selection:bg-amber-500 selection:text-black">
            <div className="w-full max-w-screen-2xl mx-auto z-10 relative">
                <Header language={language} setLanguage={setLanguage} T={T} />
                <header className="text-center my-6 md:my-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 uppercase tracking-widest">{T.title}</h1>
                    <p className="text-neutral-700 mt-2 text-sm uppercase tracking-widest">{T.subtitle}</p>
                </header>

                <ImageGallery
                    generatedImages={generatedImages}
                    appState={appState}
                    handleDownloadAlbum={handleDownloadAlbum}
                    handleDownloadSingleImage={handleDownloadSingleImage}
                    handleRegenerateImage={handleRegenerateImage}
                    setPreviewImage={setPreviewImage}
                    T={T}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
                    {/* Left Column */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <MainControls
                            formState={formState}
                            T={T}
                            language={language}
                            handleImageUpload={handleImageUpload}
                            fileInputRef={fileInputRef}
                            handleGenerateClick={handleGenerateClick}
                            isLoading={isLoading}
                            uploadedImage={uploadedImage}
                            availableSubStyles={availableSubStyles}
                        />
                        
                        <div className="bg-black rounded-lg p-4 flex-grow flex flex-col justify-center items-center min-h-[50vh]">
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Uploaded portrait" className="max-h-[70vh] w-auto rounded-lg object-contain"/>
                            ) : (
                                <div className="text-center text-neutral-500 flex flex-col items-center gap-4">
                                    <IconPhoto size={64}/>
                                    <h2 className="text-xl font-semibold">{T.uploadPlaceholder}</h2>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <SettingsPanel formState={formState} T={T} language={language} />
                </div>
            </div>

            <ImagePreviewModal 
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
                T={T}
            />
            <Footer />
        </main>
    );
}

export default Editor;