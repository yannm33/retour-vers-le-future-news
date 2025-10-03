/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, ChangeEvent, useRef, useEffect, useCallback } from 'react';
import { generateImage, generateVideo } from '../services/geminiService';
import { getSpecializedPrompt } from '../services/promptLibrary';
import { getDynamicEnhancements, buildPrompt } from '../services/promptEnhancer';
import type { PhotoSettings } from '../services/promptEnhancer';
import { createAlbumPage } from '../lib/albumUtils';
import { MAGAZINE_PROMPT_DETAILS, MAGAZINE_STYLES } from '../lib/constants';
import { STYLES_CONFIG, SubStyle, SubStyleGroup } from '../lib/styleConfig';
import { useGenerationForm } from '../hooks/useGenerationForm';
import { useApiKeys } from '../hooks/useApiKeys';
import { useLanguage } from '../contexts/LanguageContext';

import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import VideoResult from '../components/VideoResult';
import ImagePreviewModal from '../components/shared/ImagePreviewModal';
import MainControls from '../components/controls/MainControls';
import SettingsPanel from '../components/controls/SettingsPanel';
import ImageEditorModal from '../components/ImageEditorModal';
import ApiKeyManagerModal from '../components/ApiKeyManagerModal';
import LanguageSwitcher from '../components/LanguageSwitcher';

import { IconPhoto, IconChevronDown, IconLoader } from '@tabler/icons-react';
import { cn } from '../lib/utils';

// --- Types ---
export type ImageStatus = 'pending' | 'done' | 'error';
export interface GeneratedImage {
    id: number;
    status: ImageStatus;
    url?: string;
    error?: string;
}
export interface GeneratedVideo {
    id: number;
    status: 'pending' | 'done' | 'error';
    url?: string;
    error?: string;
    progressMessage?: string;
}
export type GenerationMode = 'image' | 'video';
export type AppState = 'idle' | 'image-uploaded' | 'generating' | 'results-shown';

function Editor() {
    // --- App State ---
    const { t } = useLanguage();
    const [generationMode, setGenerationMode] = useState<GenerationMode>('image');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
    const [appState, setAppState] = useState<AppState>('idle');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [editingImage, setEditingImage] = useState<GeneratedImage | null>(null);
    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
    const [isApiKeyManagerModalOpen, setIsApiKeyManagerModalOpen] = useState(false);
    const [isAlbumGenerating, setIsAlbumGenerating] = useState(false);

    const { apiKeys, saveApiKeys } = useApiKeys();

    const formState = useGenerationForm();
    const { 
        style, subStyle, aspectRatio, colorMode, renderQuality, upscale, focale,
        ouverture, vitesse, photoGrain, expression, framing, hairColor,
        accessories, lutsCinema, dirt, customPrompt,
        signatureOn, signature, filmBrand, iso, timeTravelOn, year,
        setStyle
    } = formState;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const headerClickTimeout = useRef<number | null>(null);
    const headerClickCount = useRef(0);
    
    // When switching generation modes, clear previous results and select a default style.
    useEffect(() => {
        setGeneratedImages([]);
        setGeneratedVideos([]);
        if (generationMode === 'video') {
            setStyle('costume_de_film');
        } else {
            setStyle('photos');
        }
    }, [generationMode, setStyle]);

    // Effect to manage the global app state based on the status of generated items.
    useEffect(() => {
        const items = generationMode === 'image' ? generatedImages : generatedVideos;
        if (items.length > 0) {
            const isGenerating = items.some(item => item.status === 'pending');
            if (isGenerating) {
                setAppState('generating');
            } else if (appState === 'generating') {
                setAppState('results-shown');
            }
        }
    }, [generatedImages, generatedVideos, appState, generationMode]);


    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setAppState('image-uploaded');
            };
            reader.readAsDataURL(file);
        }
    };
    
    const buildCreativePrompt = useCallback(() => {
        const promptOptions = { aspectRatio, colorMode, renderQuality, upscale };
        const specializedPrompt = getSpecializedPrompt(style, subStyle, promptOptions);
        if (specializedPrompt) {
            console.log("Using specialized prompt:", specializedPrompt);
            return specializedPrompt;
        }

        const isMagazineCover = MAGAZINE_STYLES.includes(style);
        let promptParts: string[] = [];

        if (timeTravelOn) {
            promptParts.push('//-- DIRECTIVE TEMPORELLE IMPÉRATIVE --');
            promptParts.push(`L'esthétique visuelle DOIT impérativement recréer l'année ${year}. Cela inclut la mode, les coiffures, et surtout, le style et le rendu photographique/cinématographique de cette époque (grain, saturation, netteté). Cette directive est prioritaire.`);
        }

        promptParts.push('//-- OBJECTIF PRINCIPAL --');
        if (style === 'Couverture Elle Deco') {
             promptParts.push(`Générer une photo d'intérieur hyper-réaliste pour un magazine de décoration. L'image fournie sert uniquement de référence de style de base ; la personne ne doit PAS apparaître.`);
        } else if (isMagazineCover) {
            promptParts.push(`Générer une couverture de magazine hyper-réaliste avec la personne de la photo fournie, en assurant une ressemblance fidèle.`);
        } else if (uploadedImage) {
            promptParts.push(`Générer un(e) ${generationMode} hyper-réaliste de la personne sur la photo fournie, en assurant une ressemblance fidèle.`);
        } else {
            promptParts.push(`Générer un(e) ${generationMode} hyper-réaliste basé sur la description textuelle suivante.`);
        }

        promptParts.push('//-- INSTRUCTION ANTI-RÉPÉTITION --');
        promptParts.push('IMPÉRATIF : Pour chaque item de ce lot, générer une composition, une pose, un cadrage et une direction du regard RADICALEMENT DIFFÉRENTS. Variété maximale.');


        const styleInfo = STYLES_CONFIG.find(s => s.key === style);
        let subStyleName = '';
        if (subStyle && styleInfo) {
            const allSubStyles: SubStyle[] = styleInfo.subStyles.flatMap(item => 'subStyles' in item ? (item as SubStyleGroup).subStyles : [item as SubStyle]);
            const subStyleInfo = allSubStyles.find(ss => ss.key === subStyle);
            if (subStyleInfo) {
                 subStyleName = subStyleInfo.name || t(`substyle_${subStyleInfo.key}`);
            }
        }

        if (isMagazineCover) {
            const magazineDetails = MAGAZINE_PROMPT_DETAILS[style as keyof typeof MAGAZINE_PROMPT_DETAILS];
            promptParts.push('//-- MAGAZINE & IDENTITÉ --');
            promptParts.push(`L'image doit être une couverture professionnelle pour "${magazineDetails.masthead}", respectant son esthétique: ${magazineDetails.description}`);
            if (subStyle) {
                promptParts.push(`Le thème spécifique est : "${subStyle.replace(/_/g, ' ')}".`);
            }
            promptParts.push('//-- TYPOGRAPHIE & MISE EN PAGE --');
            promptParts.push(`Incorporer le titre "${magazineDetails.masthead}" et plusieurs titres secondaires avec un texte de remplissage plausible.`);
        } else {
            promptParts.push('//-- STYLE & THÈME --');
            promptParts.push(`Style Principal : "${t(`style_${style}`)}".`);
            if (subStyleName) promptParts.push(`Variation : "${subStyleName}".`);
            if (styleInfo) promptParts.push(`Direction Créative : "${t(styleInfo.notesKey)}".`);
        }

        if (generationMode === 'image') {
            promptParts.push('//-- TECHNIQUE & CAMÉRA --');
            promptParts.push(`Ratio d'aspect : ${aspectRatio}`);
            promptParts.push(`Qualité : ${renderQuality}`);
            if (photoGrain !== 'Aucun') promptParts.push(`Grain : '${photoGrain}'.`);
            if (filmBrand !== 'Aucune') promptParts.push(`Film : '${filmBrand}'.`);
            if (iso !== 'Auto') promptParts.push(`ISO : ${iso}.`);
        } else {
             promptParts.push('//-- TECHNIQUE VIDÉO --');
             promptParts.push(`Ratio d'aspect : ${aspectRatio}`);
        }

        const creativeDetails: string[] = [];
        if (expression !== 'Neutre') creativeDetails.push(`Expression : '${expression}'.`);
        if (framing !== 'Plan pied') creativeDetails.push(`Cadrage : '${framing}'.`);
        if (hairColor !== 'Noir Profond') creativeDetails.push(`Couleur de cheveux : '${hairColor}'.`);
        if (accessories !== 'Aucun') creativeDetails.push(`Accessoires : '${accessories}'.`);
        if (generationMode === 'image') {
             if (lutsCinema !== 'Aucun') creativeDetails.push(`Étalonnage (LUT) : '${lutsCinema}'.`);
             if (dirt !== 'Aucune') creativeDetails.push(dirt === 'Sueur' ? `Ajouter des perles de sueur.` : `Effets : '${dirt}'.`);
        }
        
        if(creativeDetails.length > 0) {
            promptParts.push('//-- DÉTAILS CRÉATIFS --');
            promptParts.push(...creativeDetails);
        }

        if (customPrompt) {
            promptParts.push('//-- CONSIGNE UTILISATEUR --');
            promptParts.push(`"${customPrompt}".`);
        }
        
        if (generationMode === 'image' && signatureOn && signature) {
            promptParts.push('//-- SIGNATURE --');
            promptParts.push(`Incruster subtilement la signature '${signature}' dans un coin.`);
        }

        return promptParts.join('\n');
    }, [
        style, subStyle, customPrompt, aspectRatio, colorMode, renderQuality,
        upscale, timeTravelOn, year, uploadedImage, expression, framing, hairColor,
        accessories, lutsCinema, dirt, photoGrain, filmBrand, iso, signatureOn, signature, t, generationMode
    ]);

    const handleGenerateImageClick = async () => {
        if (!uploadedImage && !customPrompt.trim()) return;

        const basePrompt = buildCreativePrompt();
        const settings: PhotoSettings = {
            focalLength: focale !== 'Auto' ? focale : undefined,
            aperture: ouverture !== 'Auto' ? ouverture : undefined,
            shutterSpeed: vitesse !== 'Auto' ? vitesse : undefined,
            resolution: upscale,
            colorMode: colorMode === 'N&B' ? 'b&w' : 'color',
        };
        
        const initialImages: GeneratedImage[] = Array.from({ length: formState.numberOfImages }, (_, i) => ({ id: i, status: 'pending' }));
        setGeneratedImages(initialImages);

        for (const image of initialImages) {
            try {
                const dynamicAdditions = getDynamicEnhancements(style, subStyle);
                const userPrompt = `${basePrompt}\n\n//-- DIRECTION ARTISTIQUE UNIQUE --\n${dynamicAdditions}`;
                const finalPrompt = buildPrompt(userPrompt, settings);
                
                const resultUrl = await generateImage(uploadedImage, finalPrompt, apiKeys.gemini);
                
                setGeneratedImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'done', url: resultUrl } : img));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
                setGeneratedImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'error', error: errorMessage } : img));
            }
        }
    };

    const handleGenerateVideoClick = async () => {
        if (!customPrompt.trim() && !uploadedImage) return;
    
        const basePrompt = buildCreativePrompt();
        
        const batchId = Date.now();
        const initialVideos: GeneratedVideo[] = Array.from({ length: formState.numberOfImages }, (_, i) => ({ 
            id: batchId + i, 
            status: 'pending', 
            progressMessage: t('videoProgress_initializing') 
        }));
        
        setGeneratedVideos(initialVideos);
    
        for (const video of initialVideos) {
            try {
                const dynamicAdditions = getDynamicEnhancements(style, subStyle);
                const finalPrompt = `${basePrompt}\n\n//-- DIRECTION ARTISTIQUE UNIQUE POUR CETTE VIDÉO --\n${dynamicAdditions}`;
    
                const onProgress = (key: string) => {
                    setGeneratedVideos(prev => prev.map(v => v.id === video.id ? { ...v, progressMessage: t(key) } : v));
                };
    
                const resultUrl = await generateVideo(finalPrompt, uploadedImage, onProgress, apiKeys.gemini);
                
                setGeneratedVideos(prev => prev.map(v => v.id === video.id ? { ...v, status: 'done', url: resultUrl } : v));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
                console.error(`Failed to generate video #${video.id}:`, err);
                setGeneratedVideos(prev => prev.map(v => v.id === video.id ? { ...v, status: 'error', error: errorMessage } : v));
            }
        }
    };
    
    const handleMasterGenerateClick = () => {
        if (generationMode === 'image') {
            handleGenerateImageClick();
        } else {
            handleGenerateVideoClick();
        }
    };

    const handleRegenerateImage = async (imageId: number) => {
        if (!uploadedImage && !customPrompt.trim()) return;

        const basePrompt = buildCreativePrompt();
        const settings: PhotoSettings = {
            focalLength: focale !== 'Auto' ? focale : undefined,
            aperture: ouverture !== 'Auto' ? ouverture : undefined,
            shutterSpeed: vitesse !== 'Auto' ? vitesse : undefined,
            resolution: upscale,
            colorMode: colorMode === 'N&B' ? 'b&w' : 'color',
        };

        const dynamicAdditions = getDynamicEnhancements(style, subStyle);
        const userPrompt = `${basePrompt}\n\n//-- DIRECTION ARTISTIQUE UNIQUE --\n${dynamicAdditions}`;
        const finalPrompt = buildPrompt(userPrompt, settings);

        setGeneratedImages(prev => prev.map(img => img.id === imageId ? { ...img, status: 'pending', url: undefined, error: undefined } : img));

        try {
            const resultUrl = await generateImage(uploadedImage, finalPrompt, apiKeys.gemini);
            setGeneratedImages(prev => prev.map(img => img.id === imageId ? { ...img, status: 'done', url: resultUrl } : img));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setGeneratedImages(prev => prev.map(img => img.id === imageId ? { ...img, status: 'error', error: errorMessage } : img));
        }
    };
    
    const handleHeaderClick = () => {
        if (headerClickTimeout.current) clearTimeout(headerClickTimeout.current);
        headerClickCount.current += 1;
        if (headerClickCount.current >= 5) {
            setIsApiKeyManagerModalOpen(true);
            headerClickCount.current = 0;
        }
        headerClickTimeout.current = window.setTimeout(() => { headerClickCount.current = 0; }, 1000);
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

    const handleDownloadAlbum = async () => {
        const imagesToInclude = generatedImages
            .filter(img => img.status === 'done' && img.url)
            .reduce((acc, img, index) => {
                // Use a generic but unique caption for each image
                acc[`${subStyle.replace(/_/g, ' ')} #${index + 1}`] = img.url!;
                return acc;
            }, {} as Record<string, string>);

        if (Object.keys(imagesToInclude).length === 0) return;

        setIsAlbumGenerating(true);
        try {
            const albumUrl = await createAlbumPage(imagesToInclude);
            const link = document.createElement('a');
            link.href = albumUrl;
            link.download = `album-retour-vers-le-futur.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to create album page:", error);
        } finally {
            setIsAlbumGenerating(false);
        }
    };

    const handleSaveEdit = (imageId: number, newUrl: string) => {
        setGeneratedImages(prev => prev.map(img => img.id === imageId ? { ...img, url: newUrl } : img));
    };
    
    const isLoading = appState === 'generating';
    const selectedStyleObject = STYLES_CONFIG.find(s => s.key === style);
    const availableSubStyles = selectedStyleObject ? selectedStyleObject.subStyles : [];
    
    const getAspectRatioClass = (ratio: string) => {
        if (ratio === '1:1') return 'aspect-square';
        const [w, h] = ratio.split(':');
        return `aspect-[${w}/${h}]`;
    };

    return (
        <main className="bg-orange-500 text-neutral-800 min-h-screen w-full flex flex-col items-center py-4 font-sans selection:bg-amber-500 selection:text-black">
            <div className="w-full max-w-screen-2xl mx-auto z-10 relative px-4">
                 <div className="absolute top-4 right-4 z-20">
                    <LanguageSwitcher />
                </div>

                <header className="text-center my-6 md:my-8 pt-12">
                    <h1 onClick={handleHeaderClick} className="font-orbitron text-4xl md:text-5xl font-bold text-neutral-900 uppercase tracking-widest text-outline-white cursor-pointer select-none">{t('title')}</h1>
                    <p className="font-pixel text-white mt-2 text-lg uppercase tracking-[1px]">{t('subtitle')}</p>
                </header>

                {generationMode === 'image' ? (
                    <ImageGallery
                        generatedImages={generatedImages}
                        appState={appState}
                        handleDownloadAlbum={handleDownloadAlbum}
                        handleDownloadSingleImage={handleDownloadSingleImage}
                        handleRegenerateImage={handleRegenerateImage}
                        setPreviewImage={setPreviewImage}
                        setEditingImage={setEditingImage}
                        isAlbumGenerating={isAlbumGenerating}
                    />
                ) : (
                    <VideoResult generatedVideos={generatedVideos} />
                )}


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
                    {/* Left Column */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <MainControls
                            formState={formState}
                            handleImageUpload={handleImageUpload}
                            fileInputRef={fileInputRef}
                            handleGenerateClick={handleMasterGenerateClick}
                            isLoading={isLoading}
                            uploadedImage={uploadedImage}
                            availableSubStyles={availableSubStyles}
                            generationMode={generationMode}
                            setGenerationMode={setGenerationMode}
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
                        
                        <div className={cn(
                            "bg-black rounded-lg p-4 flex flex-col justify-center items-center shrink-0",
                            getAspectRatioClass(aspectRatio)
                        )}>
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Uploaded portrait" className="max-w-full max-h-full rounded-lg object-contain"/>
                            ) : (
                                <div className="text-center text-neutral-500 flex flex-col items-center gap-4">
                                    <IconPhoto size={64}/>
                                    <h2 className="text-xl font-semibold">{t('uploadPlaceholder')}</h2>

                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column / Mobile collapsible panel */}
                    <div id="settings-panel" className={cn(
                        "lg:block",
                        isSettingsPanelOpen ? "block" : "hidden"
                    )}>
                        <SettingsPanel formState={formState} generationMode={generationMode} />
                    </div>
                </div>
            </div>

            <ImagePreviewModal 
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
            />
            <ImageEditorModal
                image={editingImage}
                onClose={() => setEditingImage(null)}
                onSave={handleSaveEdit}
                apiKey={apiKeys.gemini}
            />
            <ApiKeyManagerModal
                isOpen={isApiKeyManagerModalOpen}
                onClose={() => setIsApiKeyManagerModalOpen(false)}
                currentKeys={apiKeys}
                onSave={saveApiKeys}
            />
            <Footer />
        </main>
    );
}

export default Editor;
