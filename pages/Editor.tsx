/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { generateImage } from '../services/geminiService';
import { getSpecializedPrompt } from '../services/promptLibrary';
import { getDynamicEnhancements, buildPrompt } from '../services/promptEnhancer';
import type { PhotoSettings } from '../services/promptEnhancer';
import { translations as T, MAGAZINE_PROMPT_DETAILS, MAGAZINE_STYLES } from '../lib/constants';
import { STYLES_CONFIG, SubStyle } from '../lib/styleConfig';
import { useGenerationForm } from '../hooks/useGenerationForm';

import Footer from '../components/Footer';
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

function Editor() {
    // --- App State ---
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [appState, setAppState] = useState<AppState>('idle');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const formState = useGenerationForm();
    const { 
        style, subStyle, aspectRatio, colorMode, renderQuality, upscale, focale,
        ouverture, vitesse, photoGrain, expression, framing, hairColor,
        accessories, lutsCinema, dirt, customPrompt,
        signatureOn, signature, filmBrand, iso
    } = formState;

    const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    const buildCreativePrompt = () => {
        const promptOptions = { aspectRatio, colorMode, renderQuality, upscale };
        const specializedPrompt = getSpecializedPrompt(style, subStyle, promptOptions);
        if (specializedPrompt) {
            console.log("Utilisation du prompt spécialisé :", specializedPrompt);
            return specializedPrompt;
        }

        const isMagazineCover = MAGAZINE_STYLES.includes(style);
        let promptParts: string[] = [];

        // 1. Objectif Principal
        promptParts.push('//-- OBJECTIF PRINCIPAL --');
        if (style === 'Couverture Elle Deco') {
             promptParts.push(`Générer une photo d'intérieur hyper-réaliste pour un magazine de décoration. L'image fournie sert uniquement de référence de style de base ; la personne ne doit PAS apparaître. La scène doit correspondre à la description suivante.`);
        } else if (isMagazineCover) {
            promptParts.push(`Générer une couverture de magazine hyper-réaliste avec la personne de la photo fournie. Ses traits de visage et sa ressemblance doivent être fidèlement représentés.`);
        } else {
            promptParts.push(`Générer une image hyper-réaliste de la personne sur la photo fournie, en assurant une représentation fidèle de ses traits de visage et de sa ressemblance.`);
        }

        // 2. Style & Thème / Identité du Magazine
        if (isMagazineCover) {
            const magazineDetails = MAGAZINE_PROMPT_DETAILS[style as keyof typeof MAGAZINE_PROMPT_DETAILS];
            promptParts.push('//-- MAGAZINE & IDENTITÉ DE MARQUE --');
            promptParts.push(`L'image doit être une couverture professionnelle pour "${magazineDetails.masthead}".`);
            promptParts.push(`Respecter l'esthétique de base de la marque : ${magazineDetails.description}`);
            
            promptParts.push('//-- THÈME & COMPOSITION DE LA COUVERTURE --');
            if (subStyle) {
                promptParts.push(`Le thème spécifique pour cette couverture est : "${subStyle.replace(/_/g, ' ')}". Adapter la scène, les vêtements, l'éclairage et l'ambiance pour correspondre parfaitement à ce thème.`);
            }

            promptParts.push('//-- TYPOGRAPHIE & MISE EN PAGE --');
            promptParts.push(`La composition doit inclure un titre de magazine (masthead) proéminent et réaliste : "${magazineDetails.masthead}".`);
            promptParts.push(`Incorporer plusieurs titres secondaires avec un texte de remplissage plausible mais illisible (similaire à 'lorem ipsum') pour compléter la mise en page professionnelle de la couverture.`);
            promptParts.push(`Le style de la typographie doit correspondre à l'image de marque établie du magazine.`);
        } else {
            const styleInfo = STYLES_CONFIG.find(s => s.name === style);
            promptParts.push('//-- STYLE & THÈME --');
        
            // Find subStyleName for all styles
            let subStyleName = '';
            if (subStyle && styleInfo) {
                // Flatten the sub-styles list to find the name from the key, works for both flat and grouped structures.
                const allSubStyles: SubStyle[] = styleInfo.subStyles.flatMap(item => 'subStyles' in item ? item.subStyles : [item as SubStyle]);
                const subStyleInfo = allSubStyles.find(ss => ss.key === subStyle);
                if (subStyleInfo) {
                    subStyleName = subStyleInfo.name;
                }
            }
        
            if (style === "Photographes") {
                promptParts.push(`Émuler le style photographique iconique de ${subStyleName || 'un photographe célèbre'}. Se concentrer sur sa signature visuelle, son utilisation de la lumière (naturelle ou studio), ses compositions, ses thèmes de prédilection et le rendu de ses images (grain, contraste, couleur).`);
            } else {
                promptParts.push(`Style Principal : "${style}".`);
                if (subStyleName) {
                    promptParts.push(`Variation Spécifique : "${subStyleName}".`);
                }
            }
            
            if (styleInfo && styleInfo.notes) {
                promptParts.push(`Direction Créative : "${styleInfo.notes}".`);
            }
        }

        // 3. Réglages Techniques & Caméra (créatifs uniquement)
        promptParts.push('//-- TECHNIQUE & CAMÉRA --');
        promptParts.push(`Ratio d'aspect : ${aspectRatio}`);
        promptParts.push(`Qualité de rendu : ${renderQuality}`);
        if (photoGrain !== 'Aucun') promptParts.push(`Grain photographique : '${photoGrain}'.`);
        if (filmBrand !== 'Aucune') promptParts.push(`Émuler le rendu du film argentique : '${filmBrand}'.`);
        if (iso !== 'Auto') promptParts.push(`Sensibilité ISO : ${iso}.`);
        
        // 4. Détails Créatifs
        const creativeDetails: string[] = [];
        if (expression !== 'Neutre') creativeDetails.push(`Expression : '${expression}'.`);
        if (framing !== 'Plan pied') creativeDetails.push(`Cadrage : '${framing}'.`);
        if (hairColor !== 'Noir Profond') creativeDetails.push(`Couleur de cheveux : '${hairColor}'.`);
        if (accessories !== 'Aucun') creativeDetails.push(`Accessoires : '${accessories}'.`);
        if (lutsCinema !== 'Aucun') creativeDetails.push(`Étalonnage couleur cinématique (LUT) : '${lutsCinema}'.`);
        if (dirt !== 'Aucune') {
            if (dirt === 'Sueur') {
                creativeDetails.push(`Ajouter des perles de sueur sur la peau de la personne.`);
            } else {
                creativeDetails.push(`Effets environnementaux : '${dirt}'.`);
            }
        }
        
        if(creativeDetails.length > 0) {
            promptParts.push('//-- DÉTAILS CRÉATIFS --');
            promptParts.push(...creativeDetails);
        }

        // 5. Surcharge Utilisateur
        if (customPrompt) {
            promptParts.push('//-- CONSIGNE UTILISATEUR --');
            promptParts.push(`Suivre attentivement ces instructions personnalisées : "${customPrompt}".`);
        }
        
        // 6. Signature
        if (signatureOn && signature) {
            promptParts.push('//-- SIGNATURE --');
            promptParts.push(`Incruster subtilement la signature ou le filigrane '${signature}' dans un coin inférieur de l'image.`);
        }

        return promptParts.join('\n');
    };

    const handleGenerateClick = async () => {
        if (!uploadedImage) return;

        const basePrompt = buildCreativePrompt();
        const settings: PhotoSettings = {
            focalLength: focale !== 'Auto' ? focale : undefined,
            aperture: ouverture !== 'Auto' ? ouverture : undefined,
            shutterSpeed: vitesse !== 'Auto' ? vitesse : undefined,
            resolution: upscale,
            colorMode: colorMode === 'N&B' ? 'b&w' : 'color',
        };
        
        const initialImages: GeneratedImage[] = Array.from({ length: formState.numberOfImages }, (_, i) => ({ id: i, status: 'pending' }));
        setGeneratedImages(initialImages); // This will trigger the useEffect

        // Generate images sequentially, but with a unique prompt for each one.
        for (const image of initialImages) {
            try {
                // Get unique artistic direction for this specific image
                const dynamicAdditions = getDynamicEnhancements(style, subStyle);
                const userPrompt = `${basePrompt}\n\n//-- DIRECTION ARTISTIQUE UNIQUE POUR CETTE IMAGE --\n${dynamicAdditions}`;
                const finalPrompt = buildPrompt(userPrompt, settings);
                
                console.log(`Génération de l'image #${image.id} avec un prompt unique :`, finalPrompt);
                const resultUrl = await generateImage(uploadedImage, finalPrompt);
                
                setGeneratedImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'done', url: resultUrl } : img));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue est survenue.";
                setGeneratedImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'error', error: errorMessage } : img));
                console.error(`Échec de la génération de l'image #${image.id}:`, err);
            }
        }
    };

    const handleRegenerateImage = async (imageId: number) => {
        if (!uploadedImage) return;

        const basePrompt = buildCreativePrompt();
        const settings: PhotoSettings = {
            focalLength: focale !== 'Auto' ? focale : undefined,
            aperture: ouverture !== 'Auto' ? ouverture : undefined,
            shutterSpeed: vitesse !== 'Auto' ? vitesse : undefined,
            resolution: upscale,
            colorMode: colorMode === 'N&B' ? 'b&w' : 'color',
        };

        // Generate new, unique enhancements for the regeneration
        const dynamicAdditions = getDynamicEnhancements(style, subStyle);
        const userPrompt = `${basePrompt}\n\n//-- DIRECTION ARTISTIQUE UNIQUE POUR CETTE IMAGE --\n${dynamicAdditions}`;
        const finalPrompt = buildPrompt(userPrompt, settings);

        // Set just this image to pending
        setGeneratedImages(prev =>
            prev.map(img =>
                img.id === imageId
                    ? { ...img, status: 'pending', url: undefined, error: undefined }
                    : img
            )
        );

        try {
            console.log(`Régénération de l'image #${imageId} avec un prompt unique :`, finalPrompt);
            const resultUrl = await generateImage(uploadedImage, finalPrompt);
            setGeneratedImages(prev =>
                prev.map(img =>
                    img.id === imageId ? { ...img, status: 'done', url: resultUrl } : img
                )
            );
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Une erreur inconnue est survenue.';
            setGeneratedImages(prev =>
                prev.map(img =>
                    img.id === imageId
                        ? { ...img, status: 'error', error: errorMessage }
                        : img
                )
            );
            console.error(`Échec de la régénération de l'image #${imageId}:`, err);
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
    const selectedStyleObject = STYLES_CONFIG.find(s => s.name === style);
    const availableSubStyles = selectedStyleObject ? selectedStyleObject.subStyles : [];
    
    return (
        <main className="bg-gradient-to-t from-orange-900 via-orange-500 to-orange-200 text-neutral-800 min-h-screen w-full flex flex-col items-center p-4 font-sans selection:bg-amber-500 selection:text-black">
            <div className="w-full max-w-screen-2xl mx-auto z-10 relative">
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
                            handleImageUpload={handleImageUpload}
                            fileInputRef={fileInputRef}
                            handleGenerateClick={handleGenerateClick}
                            isLoading={isLoading}
                            uploadedImage={uploadedImage}
                            availableSubStyles={availableSubStyles}
                        />
                        
                        <div className="bg-black rounded-lg p-4 flex-grow flex flex-col justify-center items-center aspect-square">
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Uploaded portrait" className="max-w-full max-h-full rounded-lg object-contain"/>
                            ) : (
                                <div className="text-center text-neutral-500 flex flex-col items-center gap-4">
                                    <IconPhoto size={64}/>
                                    <h2 className="text-xl font-semibold">{T.uploadPlaceholder}</h2>

                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <SettingsPanel formState={formState} T={T} />
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