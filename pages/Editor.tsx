/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import { generateImage } from '../services/geminiService';
import { STYLES_CONFIG } from '../lib/styleConfig';
import { useGenerationForm } from '../hooks/useGenerationForm';
import type { FormState } from '../hooks/useGenerationForm';
import { useApiKeys } from '../hooks/useApiKeys';
import { useLanguage } from '../contexts/LanguageContext';

import { getSpecializedPrompt } from '../services/promptLibrary';
import { getDynamicEnhancements } from '../services/promptEnhancer';
import { getEffectInstruction } from '../services/effectsLibrary';
import { LUXE_EVOLUPTE_PROMPTS } from '../services/luxeEvolupteLibrary';
import { LUTS_LIBRARY } from '../services/lutsLibrary';
import { MAGAZINE_PROMPT_DETAILS } from '../lib/constants';

import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import ImagePreviewModal from '../components/shared/ImagePreviewModal';
import MainControls from '../components/controls/MainControls';
import SettingsPanel from '../components/controls/SettingsPanel';
import ApiKeyManagerModal from '../components/ApiKeyManagerModal';
import LanguageSwitcher from '../components/LanguageSwitcher';
import CameraModal from '../components/CameraModal';


import { IconPhoto, IconChevronDown } from '@tabler/icons-react';
import { cn, getAspectRatioClass } from '../lib/utils';

// --- Types ---
export type ImageStatus = 'pending' | 'done' | 'error';
export interface GeneratedImage {
    id: number;
    status: ImageStatus;
    url?: string;
    originalUrl?: string;
    error?: string;
}
export type AppState = 'idle' | 'image-uploaded' | 'generating' | 'results-shown';

const buildFullPrompt = (
    formState: FormState,
    uploadedImage: string | null,
    t: (key: string) => string
): string => {
    const {
        style, subStyle, customPrompt, colorMode, upscale, focale, ouverture, vitesse,
        hairColor, expression, glasses, universalAccessory, framing, lutsCinema, effects,
        photographicEffect, photoGrain, filmBrand, iso, signature, signatureOn,
        aspectRatio, renderQuality, timeTravelOn, year
    } = formState;

    let promptParts: string[] = [];
    
    // --- Directive Artistique Principale ---
    if (style === 'luxe_evolupte') {
        promptParts.push('//-- DIRECTIVE ARTISTIQUE PRINCIPALE : STYLE "MARKETING LUXE ÉVOLUPTÉ" --');
        promptParts.push('Objectif: Créer des images réalistes, élégantes et hautement professionnelles dans un style publicitaire haut de gamme. Le rendu doit évoquer le luxe contemporain, la mode internationale, et la présentation de produits de prestige (parfum, montre, bijou, etc.). Style: Photographie ultra réaliste. Lumière douce, souvent dorée, ivoire ou neutre. Profondeur de champ naturelle. Décors: hôtels de luxe, boutiques parisiennes, palaces, etc. Tenues: haute couture. Expression naturelle, regard calme. Interdits: aucun effet "cyberpunk", "digital art", "illustration", pas de couleurs saturées ou de néons.');
        
        if (subStyle && LUXE_EVOLUPTE_PROMPTS[subStyle]) {
            promptParts.push(`//-- SOUS-STYLE SPÉCIFIQUE --\n${LUXE_EVOLUPTE_PROMPTS[subStyle]}`);
        }
    } else {
        promptParts.push('//-- DIRECTIVE ARTISTIQUE PRINCIPALE : STYLE "RETOUR VERS LE FUTUR" --');
        promptParts.push('Objectif: Produire des images réalistes, cohérentes et variées. Style: Photographie pure : rendu naturel, textures de peau réalistes, lumière de studio ou naturelle. Ambiance cinéma réaliste : profondeur de champ maîtrisée, flou d’arrière-plan doux. Cohérence des corps et des visages. Composition naturelle. Interdits: tout ce qui touche au cyberpunk, digital art, couleurs bleues/violettes/néons, filtres SF, effets d’illustration.');
    }
    
    // --- Prompts Spécialisés (Overriding) ---
    const specializedPrompt = getSpecializedPrompt(style, subStyle, { aspectRatio, colorMode, renderQuality, upscale });
    if (specializedPrompt) {
        return specializedPrompt; // These are self-contained and override everything else.
    }

    // --- Améliorations Créatives Dynamiques ---
    const dynamicEnhancements = getDynamicEnhancements(style, subStyle);
    if (dynamicEnhancements) {
        promptParts.push(`//-- AMÉLIORATIONS CRÉATIVES DYNAMIQUES --\n${dynamicEnhancements}`);
    }

    // --- Brief Magazine ---
    const selectedStyleConfig = STYLES_CONFIG.find(s => s.key === style);
    if (selectedStyleConfig && MAGAZINE_PROMPT_DETAILS[subStyle]) {
        promptParts.push(`//-- BRIEF MAGAZINE --\nMasthead: ${MAGAZINE_PROMPT_DETAILS[subStyle].masthead}. Description: ${MAGAZINE_PROMPT_DETAILS[subStyle].description}.`);
    }

    // --- Prompt Utilisateur ---
    if (customPrompt.trim()) {
        promptParts.push(`//-- PROMPT UTILISATEUR --\n${customPrompt.trim()}`);
    }

    // --- Détails Créatifs ---
    const creativeDetails: string[] = [];
    if (timeTravelOn) creativeDetails.push(`Année de la scène : ${year}.`);
    if (expression !== 'Neutre') creativeDetails.push(`Expression faciale : ${expression}.`);
    if (hairColor !== 'Noir Profond') creativeDetails.push(`Couleur des cheveux : ${hairColor}.`);
    if (glasses !== 'Aucun') creativeDetails.push(`Lunettes : ${glasses}.`);
    if (universalAccessory) creativeDetails.push(`Accessoire : ${universalAccessory}.`);
    if (framing !== 'Plan pied') creativeDetails.push(`Cadrage : ${framing}.`);
    if (effects !== 'Aucune') creativeDetails.push(`Effet sur la peau/tenue : ${effects}.`);
    
    const effectInstruction = getEffectInstruction(photographicEffect);
    if (effectInstruction) {
        creativeDetails.push(`Effet photographique spécifique : ${effectInstruction}.`);
    }

    if (creativeDetails.length > 0) {
        promptParts.push(`//-- DÉTAILS CRÉATIFS --\n${creativeDetails.join('\n')}`);
    }
    
    // --- Spécifications Techniques ---
    const techSpecs: string[] = [];
    techSpecs.push(`Ratio d'aspect : ${style === 'luxe_evolupte' && subStyle === 'automobile_luxe_moderne' ? '21:9' : aspectRatio}.`);
    techSpecs.push(`Qualité de rendu : ${renderQuality}.`);
    techSpecs.push(`Niveau d'upscale : ${upscale}.`);
    if (focale !== 'Auto') techSpecs.push(`Focale : ${focale}.`);
    if (ouverture !== 'Auto') techSpecs.push(`Ouverture : ${ouverture}.`);
    if (vitesse !== 'Auto') techSpecs.push(`Vitesse d'obturation : ${vitesse}.`);
    if (iso !== 'Auto') techSpecs.push(`Sensibilité ISO : ${iso}.`);
    if (photoGrain !== 'Aucun') techSpecs.push(`Grain photographique : ${photoGrain}.`);
    if (filmBrand !== 'Aucune') techSpecs.push(`Pellicule photographique : ${filmBrand}.`);

    const selectedLut = LUTS_LIBRARY.find(l => l.id === lutsCinema);
    if (selectedLut) {
        techSpecs.push(`Étalonnage Cinéma (LUT) : Appliquer un style de colorimétrie '${selectedLut.name}'. Description technique : ${selectedLut.description}. Idéal pour : ${selectedLut.usage}.`);
    }

    if (signatureOn && signature.trim()) {
        techSpecs.push(`Signature : ${signature.trim()}.`);
    }

    // Final color mode enforcement
    if (colorMode === 'N&B') {
        techSpecs.push('Mode : IMPÉRATIVEMENT en Noir et Blanc (monochrome). Ne PAS générer en couleur.');
    } else {
        techSpecs.push('Mode : IMPÉRATIVEMENT en Couleur. Ne PAS générer en noir et blanc.');
    }

    promptParts.push(`//-- SPÉCIFICATIONS TECHNIQUES --\n${techSpecs.join('\n')}`);

    return promptParts.join('\n\n');
};


function Editor() {
    // --- App State ---
    const { t } = useLanguage();
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [appState, setAppState] = useState<AppState>('idle');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
    const [isApiKeyManagerModalOpen, setIsApiKeyManagerModalOpen] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [isZipping, setIsZipping] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    // State for the hidden API key modal trigger
    const [titleClickCount, setTitleClickCount] = useState(0);
    const lastTitleClickTimeRef = useRef(0);

    const { apiKeys, saveApiKeys } = useApiKeys();
    const formState = useGenerationForm();
    const { style, customPrompt, provider, aspectRatio } = formState;

    const fileInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (generatedImages.length > 0) {
            const isGenerating = generatedImages.some(item => item.status === 'pending');
            if (isGenerating) {
                setAppState('generating');
            } else if (appState === 'generating') {
                setAppState('results-shown');
            }
        }
    }, [generatedImages, appState]);
    
    const handleTitleClick = () => {
        const now = Date.now();
        // Reset if clicks are more than 500ms apart
        if (now - lastTitleClickTimeRef.current > 500) {
            setTitleClickCount(1);
        } else {
            setTitleClickCount(prev => prev + 1);
        }
        lastTitleClickTimeRef.current = now;
    };

    useEffect(() => {
        if (titleClickCount === 5) {
            setIsApiKeyManagerModalOpen(true);
            setTitleClickCount(0); // Reset after triggering
        }
    }, [titleClickCount]);

    const processImageFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setAppState('image-uploaded');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processImageFile(e.target.files[0]);
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processImageFile(e.dataTransfer.files[0]);
        }
    };
    
    const handlePhotoCapture = (dataUrl: string) => {
        setUploadedImage(dataUrl);
        setAppState('image-uploaded');
        setIsCameraOpen(false);
    };

    const runGeneration = async (imageInput: string | null, currentFormState: FormState, imageIdToUpdate: number) => {
        const finalPrompt = buildFullPrompt(currentFormState, imageInput, t);
        
        try {
            const resultUrl = await generateImage(imageInput, finalPrompt, provider, apiKeys);
            setGeneratedImages(prev => prev.map(img => img.id === imageIdToUpdate ? { ...img, status: 'done', url: resultUrl, originalUrl: resultUrl } : img));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            let displayedError;

            // Translate custom error keys from geminiService.
            if (errorMessage === 'api_key_invalid') {
                displayedError = t('api_key_invalid');
            } else if (errorMessage === 'api_quota_exceeded') {
                displayedError = t('api_quota_exceeded');
            } else if (errorMessage === 'api_request_blocked') {
                displayedError = t('api_request_blocked');
            } else {
                console.error("Unhandled generation error:", err); // Log full error for debugging
                displayedError = t('api_generic_error');
            }
            setGeneratedImages(prev => prev.map(img => img.id === imageIdToUpdate ? { ...img, status: 'error', error: displayedError } : img));
        }
    };

    const handleGenerateImageClick = async () => {
        const imageInput = uploadedImage;
        if (!imageInput && !customPrompt.trim()) return;

        // Ensure an API key is set before proceeding.
        if (!apiKeys.google) {
            setIsApiKeyManagerModalOpen(true);
            return;
        }

        const initialImages: GeneratedImage[] = Array.from({ length: formState.numberOfImages }, (_, i) => ({ id: Date.now() + i, status: 'pending' }));
        setGeneratedImages(initialImages);

        for (const image of initialImages) {
            runGeneration(imageInput, formState, image.id);
        }
    };

    const handleRegenerateImage = async (imageId: number) => {
        const imageInput = uploadedImage;
        if (!imageInput && !customPrompt.trim()) return;
        
        setGeneratedImages(prev => prev.map(img => img.id === imageId ? { ...img, status: 'pending', url: undefined, error: undefined } : img));
        runGeneration(imageInput, formState, imageId);
    };

    const handleDownloadSingleImage = (url: string, imageId: number) => {
        if (!url) return;
        try {
            const link = document.createElement('a');
            link.href = url;
            link.download = `retour-vers-le-futur-${style.toLowerCase().replace(/\s/g, '-')}-${imageId + 1}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error('Download failed', e);
        }
    };

    const handleDownloadAlbum = async () => {
        setIsZipping(true);
        try {
            const zip = new JSZip();
            const imagesToZip = generatedImages.filter(img => img.status === 'done' && img.url);

            if (imagesToZip.length === 0) {
                return;
            }

            for (const image of imagesToZip) {
                try {
                    const base64Data = image.url!.substring(image.url!.indexOf(',') + 1);
                    const fileName = `retour-vers-le-futur-${style.toLowerCase().replace(/\s/g, '-')}-${image.id + 1}.jpg`;
                    zip.file(fileName, base64Data, { base64: true });
                } catch (e) {
                    console.error(`Failed to add image ${image.id} to zip`, e);
                }
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(zipBlob);
            link.download = `album-retour-vers-le-futur.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error('Error creating zip file:', error);
        } finally {
            setIsZipping(false);
        }
    };
    
    const isLoading = appState === 'generating';
    const isApiKeySet = !!apiKeys.google;
    const selectedStyleObject = STYLES_CONFIG.find(s => s.key === style);
    const availableSubStyles = selectedStyleObject ? selectedStyleObject.subStyles : [];

    return (
        <main className="bg-orange-500 text-neutral-800 min-h-screen w-full flex flex-col items-center py-4 font-sans selection:bg-amber-500 selection:text-black">
            <div className="w-full max-w-screen-2xl mx-auto z-10 relative px-4">
                 <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center gap-4">
                    <button
                        onClick={() => setIsApiKeyManagerModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold text-sm sm:text-base shadow-[0_0_10px_rgba(255,122,0,0.6)] transition-all duration-300"
                    >
                        <span role="img" aria-label="key">🔑</span>
                        <span className="hidden sm:inline">{t('tryTheAppFull')}</span>
                        <span className="inline sm:hidden">{t('tryTheAppShort')}</span>
                    </button>
                    <LanguageSwitcher />
                </div>

                <header className="text-center my-6 md:my-8 pt-12">
                    <h1 onClick={handleTitleClick} className="font-open-sans text-4xl md:text-5xl font-bold text-neutral-900 uppercase tracking-widest text-outline-white cursor-pointer select-none">{t('title')}</h1>
                    <p className="font-pixel text-white mt-2 text-lg uppercase tracking-[1px]">{t('subtitle')}</p>
                </header>

                <ImageGallery
                    generatedImages={generatedImages}
                    appState={appState}
                    handleDownloadAlbum={handleDownloadAlbum}
                    handleDownloadSingleImage={handleDownloadSingleImage}
                    handleRegenerateImage={handleRegenerateImage}
                    setPreviewImage={setPreviewImage}
                    aspectRatio={aspectRatio}
                    isZipping={isZipping}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
                    {/* Left Column */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <MainControls
                            formState={formState}
                            handleImageUpload={handleImageUpload}
                            fileInputRef={fileInputRef}
                            handleGenerateClick={handleGenerateImageClick}
                            onTakePhotoClick={() => setIsCameraOpen(true)}
                            isLoading={isLoading}
                            uploadedImage={uploadedImage}
                            availableSubStyles={availableSubStyles}
                            isApiKeySet={isApiKeySet}
                        />

                        {/* Mobile-only button to show settings */}
                        <div className="lg:hidden">
                            <button 
                                onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
                                className="w-full bg-black border border-neutral-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-between transition-colors hover:bg-neutral-800"
                                aria-expanded={isSettingsPanelOpen}
                                aria-controls="settings-panel"
                            >
                                <span>{t('advancedSettings')}</span>
                                <IconChevronDown className={`transform transition-transform duration-300 ${isSettingsPanelOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                        
                        <div
                            className={cn(
                                "bg-black rounded-lg p-4 flex flex-col justify-center items-center shrink-0 transition-all duration-300",
                                getAspectRatioClass(aspectRatio),
                                isDraggingOver && "border-2 border-dashed border-amber-500 bg-amber-500/10 scale-105"
                            )}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Uploaded portrait" className="max-w-full max-h-full rounded-lg object-contain pointer-events-none"/>
                            ) : (
                                <div className="text-center text-neutral-500 flex flex-col items-center gap-4 pointer-events-none">
                                    <IconPhoto size={64}/>
                                    <h2 className="text-xl font-semibold">{t('uploadPlaceholder')}</h2>
                                    <p className="text-sm text-neutral-600">{t('dragAndDropPrompt')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column / Mobile collapsible panel */}
                    <div id="settings-panel" className={cn(
                        "lg:block",
                        isSettingsPanelOpen ? "block" : "hidden"
                    )}>
                        <SettingsPanel formState={formState} generationMode="image" />
                    </div>
                </div>
            </div>

            <ImagePreviewModal 
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
            />
            <ApiKeyManagerModal
                isOpen={isApiKeyManagerModalOpen}
                onClose={() => setIsApiKeyManagerModalOpen(false)}
                currentKeys={apiKeys}
                onSave={saveApiKeys}
            />
             <CameraModal
                isOpen={isCameraOpen}
                onClose={() => setIsCameraOpen(false)}
                onCapture={handlePhotoCapture}
            />
            <Footer />
        </main>
    );
}

export default Editor;