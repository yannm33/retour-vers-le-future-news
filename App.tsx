/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { generateImage } from './services/geminiService';
import { getSpecializedPrompt } from './services/promptLibrary';
import { STYLE_GUIDE } from './services/styleLibrary';
import Footer from './components/Footer';
import { IconPhoto, IconLoader, IconAlertTriangle, IconDownload, IconUpload, IconPlayerPlay, IconX } from '@tabler/icons-react';

// --- I18n Translations ---
const translations = {
    FR: {
        title: "Retour vers le futur",
        subtitle: "Prévisualisation cinématographique et photographique",
        downloadAlbum: "TÉLÉCHARGER L'ALBUM",
        loadPortrait: "CHARGER UN PORTRAIT",
        generating: "GÉNÉRATION...",
        generate: "GÉNÉRER",
        style: "Style",
        substyle: "Sous-style",
        chooseSubstyle: "Choisir un sous-style",
        customPromptTitle: "Votre Prompt Personnalisé",
        customPromptPlaceholder: "Coller ici le prompt (scène, style, lumière...)",
        uploadPlaceholder: "Chargez un portrait pour commencer",
        renderQuality: "Qualité du rendu",
        preview: "APERÇU (RAPIDE)",
        hd: "HD (QUALITÉ)",
        uhd: "UHD (RÉALISME)",
        color: "COULEUR",
        bw: "N&B",
        upscale: "Upscale",
        photoSettings: "Réglages photographiques",
        focal: "FOCALE",
        aperture: "OUVERTURE",
        speed: "VITESSE",
        hairColor: "Couleur des cheveux",
        expression: "Expression",
        glasses: "Lunettes",
        framing: "Cadrage",
        luts: "Luts Cinéma",
        dirt: "Saleté",
        grain: "Grain Photo",
        sweat: "Sueur",
        speedEffect: "Effet Vitesse",
        signature: "Signature Personnelle",
        lockedOn: "ON - VERROUILLÉ",
        off: "OFF",
        formatSize: "Format & Taille",
        portrait: "Portrait",
        square: "Carré",
        landscape: "Paysage",
        download: "TÉLÉCHARGER",
        quantity: "QUT"
    },
    EN: {
        title: "Back to the Future",
        subtitle: "Cinematic and Photographic Preview",
        downloadAlbum: "DOWNLOAD ALBUM",
        loadPortrait: "LOAD PORTRAIT",
        generating: "GENERATING...",
        generate: "GENERATE",
        style: "Style",
        substyle: "Sub-style",
        chooseSubstyle: "Choose a sub-style",
        customPromptTitle: "Your Custom Prompt",
        customPromptPlaceholder: "Paste your prompt here (scene, style, light...)",
        uploadPlaceholder: "Upload a portrait to start",
        renderQuality: "Render Quality",
        preview: "PREVIEW (FAST)",
        hd: "HD (QUALITY)",
        uhd: "UHD (REALISM)",
        color: "COLOR",
        bw: "B&W",
        upscale: "Upscale",
        photoSettings: "Photographic Settings",
        focal: "FOCAL",
        aperture: "APERTURE",
        speed: "SPEED",
        hairColor: "Hair Color",
        expression: "Expression",
        glasses: "Glasses",
        framing: "Framing",
        cinemaLUTs: "Cinema LUTs",
        dirt: "Dirt",
        photoGrain: "Photo Grain",
        sweat: "Sweat",
        speedEffect: "Speed Effect",
        signature: "Personal Signature",
        lockedOn: "ON - LOCKED",
        off: "OFF",
        formatSize: "Format & Size",
        portrait: "Portrait",
        square: "Square",
        landscape: "Landscape",
        download: "DOWNLOAD",
        quantity: "QTY"
    }
};

// --- Magazine Cover Prompt Details ---
const MAGAZINE_PROMPT_DETAILS = {
    'Couverture Vogue': {
        masthead: 'VOGUE',
        description: 'The style must be high-fashion, artistic, and iconic. Think powerful, elegant, and often minimalist compositions. The lighting should be dramatic and cinematic. The person should have a confident, high-fashion expression, styled impeccably.'
    },
    'Couverture Elle': {
        masthead: 'ELLE',
        description: 'The style must be fresh, vibrant, and accessible. The mood is joyful, modern, and relatable. Use bright, natural, or energetic studio lighting. The person should appear friendly and stylish, often with a smile or a relaxed, confident pose.'
    },
    'Couverture Elle Deco': {
        masthead: 'ELLE DECORATION',
        description: 'The focus must be on sophisticated living and design-forward interiors. The person should be elegantly integrated into a stunning and stylish home environment (e.g., a modern living room, a chic kitchen, a bohemian bedroom). The lighting should highlight both the person and the architectural/design details of the space.'
    }
};
const MAGAZINE_STYLES = Object.keys(MAGAZINE_PROMPT_DETAILS);


// --- Unified Style Configuration ---
const SPECIALIZED_PROMPT_STYLES = {
    'Militaire': { substyles: ['véhicule blindé', 'patrouille', 'uniforme parade', 'base avancée'], notes: '' },
    'Commando': { substyles: ['sniper', 'embarquement hélico', 'infiltration plage'], notes: '' },
    'Néviscile (unité spéciale)': { substyles: ['plongée sous-marine', 'saut HAHO', 'sabotage portuaire'], notes: '' }
};

const formattedStyleGuide = Object.entries(STYLE_GUIDE.styles).reduce((acc, [key, value]) => {
    const formattedKey = key.replace(/_/g, ' ');
    acc[formattedKey] = value;
    return acc;
}, {} as typeof STYLE_GUIDE.styles);

const ALL_STYLES_CONFIG = { ...formattedStyleGuide, ...SPECIALIZED_PROMPT_STYLES };
const STYLES = Object.keys(ALL_STYLES_CONFIG);


// --- Constants for UI controls ---
const HAIR_COLORS = [
    'Noir profond', 'Châtain foncé', 'Châtain clair', 'Blond platine', 'Blond cendré', 'Blond doré', 'Roux vif', 'Roux clair cuivré', 'Poivre et sel', 'Gris argenté', 'Blanc neige', 'Fantasy rose', 'Fantasy bleu'
];
const EXPRESSIONS = [
    'Neutre', 'Sourire doux', 'Sourire standard', 'Sourire large', 'Sourire discret', 'Sourire coquin', 'Sourire malicieux', 'Clin d’œil', 'Rire', 'Sérieux', 'Confiant', 'Tristesse', 'Tristesse profonde', 'Colère contenue', 'Colère explosive / rage', 'Peur légère', 'Inquiétude', 'Peur intense', 'Panique', 'Surprise neutre', 'Surprise émerveillée', 'Dégout / dédain', 'Fatigue', 'Lassitude', 'Concentration', 'Réflexion', 'Séduction assumée'
];
const ACCESSORIES = [
    'Aucun', 'Lunettes de soleil classique', 'Masque type rallye / motocross', 'Lunettes de vue basique', 'Lunettes de vue design', 'Lunettes fantasy', 'Aviator (style pilote)', 'Wafer carré', 'Sport wrap enveloppante', 'Vintage rondes', 'Casque moto', 'Casque voiture pilote de course', 'Casque voiture pilote de rallye'
];
const FRAMES = [
    'Très gros plan', 'Gros plan', 'Plan poitrine', 'Plan taille', 'Plan italien', 'Plan américain', 'Plan moyen', 'Plan en pied', 'Plan d’ensemble', 'Plan au ras du sol', 'Vue drone'
];
const LUTS = [
    'Aucun', 'Kodachrome vintage', 'Technicolor', 'Bleach bypass', 'Teal & Orange', 'Action (film d’action)', 'Film de mariage', 'AR1', 'Blast', 'Couleur cinéma', 'Pellicule classique', 'Film cinématographique', 'Vers profond / nature', 'Style documentaire', 'Effet mat de pellicule', 'Film noir cinématographique', 'Film d’horreur', 'Film indépendant', 'Film “bouddhi voyage”', 'Héros de film', 'Rétro', 'Charme rustique', 'Science-fiction colorée', 'Slog', 'Trois mariages cinéma', 'Cinéma urbain', 'Film maudit et chaud', 'Wanderlust onirique'
];
const DIRTS = [
    'Aucune', 'sueur et poussière', 'boue séchée (éclaboussures)', 'suie ou cendre', 'poussière épaisse', 'terre humide', 'grumeux', 'incrustation d’argile', 
    'fibre', 'sludge', 'peluche', 'gouttelette d’eau', 'ébou', 'cambouis', 'huile mécanique', 'algue', 'mousse ou lichen', 'sable fin', 'résidus de fumée', 
    'poussière de rouille', 'traces d’herbes écrasées', 'rouille sur métal', 'camouflage visage (militaire)'
];
const GRAINS = [
    'Aucun', 'Ultra fin', 'Fin standard', 'Moyen', 'Grossier', 'Très grossier', 'Bruit ISO élevé', 'Film ancien 35 mm', 'Fini mat', 'Contrasté', 'Doux', 'Pointillé', 'Granuleux', 'Flou doux', 'Cinéma', 'Vignetté'
];

const ASPECT_RATIOS = {
    Portrait: ['4:5', '3:4', '2:3', '10:16', '9:16', '1:2'],
    Carré: ['1:1'],
    Paysage: ['5:4', '4:3', '3:2', '16:10', '16:9', '2:1', '3:1'],
};

// --- Types ---
type ImageStatus = 'pending' | 'done' | 'error';
interface GeneratedImage {
    id: number;
    status: ImageStatus;
    url?: string;
    error?: string;
}
type AppState = 'idle' | 'image-uploaded' | 'generating' | 'results-shown';
type ColorMode = 'Couleur' | 'N&B';
type Upscale = 'Standard' | '4K' | '6K' | '8K';
type RenderQuality = 'Aperçu (Rapide)' | 'HD (Qualité)' | 'UHD (Réalisme)';
type Language = 'FR' | 'EN';

// --- Helper Components ---
const ControlSection: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">{title}</label>
        {children}
    </div>
);

const StyledSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => (
    <div className="relative w-full">
        <select {...props} className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed">
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
);

const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }> = ({ children, active, className, ...props }) => (
    <button {...props} className={`px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 w-full disabled:opacity-50 ${active ? 'bg-amber-500 text-black shadow-amber-500/50 shadow-[0_0_15px_2px]' : 'bg-neutral-800 text-white hover:bg-neutral-700 hover:shadow-amber-500/30 hover:shadow-[0_0_10px_1px]'} ${className}`}>
        {children}
    </button>
);

const FunctionalDial: React.FC<{
    label: string;
    value: number | 'Auto';
    setValue: React.Dispatch<React.SetStateAction<number | 'Auto'>>;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
}> = ({ label, value, setValue, min, max, step, defaultValue }) => {
    const isDraggingRef = useRef(false);
    
    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDraggingRef.current) return;

            const sensitivity = (max - min) / 300; 
            const change = event.movementX * sensitivity;

            setValue(prev => {
                const currentValue = typeof prev === 'string' ? defaultValue : prev;
                let newValue = currentValue + change;
                newValue = Math.max(min, Math.min(max, newValue));
                
                const roundedValue = Math.round(newValue / step) * step;
                return roundedValue;
            });
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const displayValue = typeof value === 'number' ? (value < 10 && !Number.isInteger(value) ? value.toFixed(1) : Math.round(value)) : 'Auto';

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-neutral-400 tracking-widest">{label}</span>
            <div
                className="relative w-24 h-24 flex items-center justify-center cursor-ew-resize"
                onMouseDown={handleMouseDown}
            >
                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#404040" strokeWidth="2" strokeDasharray="2 3" />
                </svg>
                <div
                    className="relative w-20 h-20 rounded-full bg-gradient-to-b from-neutral-800 to-black/50 border-2 border-neutral-700 flex items-center justify-center shadow-inner select-none"
                    onClick={(e) => {
                        e.stopPropagation();
                        setValue('Auto');
                    }}
                    title="Click to reset to Auto"
                >
                    <span className="text-sm font-bold text-neutral-300">{displayValue}</span>
                    <div className="absolute top-[6px] w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_3px_1px_rgba(245,158,11,0.7)]"></div>
                </div>
            </div>
        </div>
    );
};


function App() {
    // --- App State ---
    const [language, setLanguage] = useState<Language>('FR');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [appState, setAppState] = useState<AppState>('idle');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // --- Control Panel State ---
    const [numberOfImages, setNumberOfImages] = useState(10);
    const [style, setStyle] = useState('Portrait Glamour');
    const [subStyle, setSubStyle] = useState('');
    const [customPrompt, setCustomPrompt] = useState('');
    const [colorMode, setColorMode] = useState<ColorMode>('Couleur');
    const [upscale, setUpscale] = useState<Upscale>('8K');
    const [focale, setFocale] = useState<number | 'Auto'>('Auto');
    const [ouverture, setOuverture] = useState<number | 'Auto'>('Auto');
    const [vitesse, setVitesse] = useState<number | 'Auto'>('Auto');
    const [hairColor, setHairColor] = useState('Noir profond');
    const [expression, setExpression] = useState('Neutre');
    const [accessories, setAccessories] = useState('Aucun');
    const [framing, setFraming] = useState('Plan en pied');
    const [lutsCinema, setLutsCinema] = useState('Aucun');
    const [dirt, setDirt] = useState('Aucune');
    const [photoGrain, setPhotoGrain] = useState('Aucun');
    const [sweat, setSweat] = useState(false);
    const [speedEffect, setSpeedEffect] = useState(false);
    const [signature, setSignature] = useState('@PIXELSHOOT');
    const [signatureOn, setSignatureOn] = useState(true);
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [renderQuality, setRenderQuality] = useState<RenderQuality>('UHD (Réalisme)');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const T = translations[language];

    useEffect(() => {
        // When the main style changes, always reset the sub-style.
        // This ensures the user must make a fresh selection from the new list of sub-styles,
        // and prevents an old value from persisting incorrectly.
        setSubStyle('');
    }, [style]);

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

        setAppState('generating');
        const prompt = buildPrompt();
        
        const initialImages: GeneratedImage[] = Array.from({ length: numberOfImages }, (_, i) => ({ id: i, status: 'pending' }));
        setGeneratedImages(initialImages);

        const promises = initialImages.map(async (image) => {
             try {
                const resultUrl = await generateImage(uploadedImage, prompt);
                setGeneratedImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'done', url: resultUrl } : img));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
                setGeneratedImages(prev => prev.map(img => img.id === image.id ? { ...img, status: 'error', error: errorMessage } : img));
                console.error(`Failed to generate image #${image.id}:`, err);
            }
        });

        await Promise.all(promises);
        setAppState('results-shown');
    };

    const handleDownloadAlbum = () => {
        generatedImages.forEach((image, index) => {
            if (image.status === 'done' && image.url) {
                const link = document.createElement('a');
                link.href = image.url;
                link.download = `retour-vers-le-futur-${style.toLowerCase().replace(/\s/g, '-')}-${index + 1}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };
    
    const isLoading = appState === 'generating';
    const styleConfig = ALL_STYLES_CONFIG[style as keyof typeof ALL_STYLES_CONFIG];
    const availableSubStyles = styleConfig?.substyles;

    return (
        <main className="bg-gradient-to-t from-orange-900 via-orange-500 to-orange-200 text-neutral-800 min-h-screen w-full flex flex-col items-center p-4 font-sans selection:bg-amber-500 selection:text-black">
            <div className="w-full max-w-screen-2xl mx-auto z-10 relative">
                <div className="absolute top-0 right-0 p-4 flex gap-2 z-20">
                    <button 
                        onClick={() => setLanguage('FR')} 
                        className={`font-bold py-1 px-3 rounded-md text-sm transition-colors ${language === 'FR' ? 'bg-amber-500 text-black' : 'bg-black/20 text-white hover:bg-black/40'}`}
                        aria-pressed={language === 'FR'}
                    >
                        FR
                    </button>
                    <button 
                        onClick={() => setLanguage('EN')} 
                        className={`font-bold py-1 px-3 rounded-md text-sm transition-colors ${language === 'EN' ? 'bg-amber-500 text-black' : 'bg-black/20 text-white hover:bg-black/40'}`}
                        aria-pressed={language === 'EN'}
                    >
                        EN
                    </button>
                </div>
                <header className="text-center my-6 md:my-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 uppercase tracking-widest">{T.title}</h1>
                    <p className="text-neutral-700 mt-2 text-sm uppercase tracking-widest">{T.subtitle}</p>
                </header>

                {generatedImages.length > 0 && (
                     <div className="my-6">
                        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center`}>
                             {generatedImages.map(image => (
                                <div key={image.id} className="aspect-square bg-neutral-800 rounded-lg p-1 shadow-lg border border-neutral-700">
                                    <div className="bg-black w-full h-full rounded flex items-center justify-center overflow-hidden">
                                        {image.status === 'pending' && <IconLoader size={32} className="animate-spin text-neutral-500" />}
                                        {image.status === 'error' && <IconAlertTriangle size={32} className="text-red-500" title={image.error} />}
                                        {image.status === 'done' && image.url && (
                                            <img 
                                                src={image.url} 
                                                alt={`Generated image ${image.id + 1}`} 
                                                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" 
                                                onClick={() => setPreviewImage(image.url!)}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {appState === 'results-shown' && generatedImages.some(img => img.status === 'done') && (
                             <div className="text-center">
                                <button onClick={handleDownloadAlbum} className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg mt-8 flex items-center gap-2 transition-all duration-200 mx-auto shadow-amber-500/30 shadow-[0_0_15px_2px] hover:shadow-amber-500/50">
                                    <IconDownload size={20}/> {T.downloadAlbum}
                                </button>
                            </div>
                        )}
                     </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
                    {/* Left Column */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="bg-black rounded-xl p-4 flex flex-col gap-4">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="relative">
                                    <select value={numberOfImages} onChange={e => setNumberOfImages(Number(e.target.value))} className="bg-amber-500 text-black font-bold border border-amber-600 rounded-xl px-3 py-2 pr-8 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 h-full text-center cursor-pointer">
                                        {Array.from({ length: 15 }, (_, i) => i + 1).map(n => <option className="bg-neutral-800 text-white font-bold" key={n} value={n}>{T.quantity}: {n}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                                <button onClick={() => fileInputRef.current?.click()} className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-3 rounded-xl h-full flex items-center justify-center gap-2 transition-colors">
                                    <IconUpload size={20}/> {T.loadPortrait}
                                </button>
                                <button 
                                    onClick={handleGenerateClick}
                                    disabled={!uploadedImage || isLoading}
                                    className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-3 rounded-xl h-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                {isLoading ? <IconLoader size={20} className='animate-spin'/> : <IconPlayerPlay size={20}/>}
                                {isLoading ? T.generating : T.generate}
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <ControlSection title={T.style}>
                                    <StyledSelect value={style} onChange={e => setStyle(e.target.value)}>{STYLES.map(s => <option key={s} value={s}>{s}</option>)}</StyledSelect>
                                </ControlSection>
                                <ControlSection title={T.substyle}>
                                    <StyledSelect value={subStyle} onChange={e => setSubStyle(e.target.value)} disabled={!availableSubStyles || availableSubStyles.length === 0}>
                                        <option value="">{T.chooseSubstyle}</option>
                                        {availableSubStyles && availableSubStyles.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                                    </StyledSelect>
                                </ControlSection>
                            </div>
                            <ControlSection title={T.customPromptTitle}>
                                <textarea placeholder={T.customPromptPlaceholder} value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} rows={2} className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                            </ControlSection>
                        </div>
                        
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
                    <div className="lg:col-span-1 bg-black p-4 rounded-lg flex flex-col gap-4">
                        <ControlSection title={T.renderQuality}>
                            <div className="grid grid-cols-3 gap-2">
                                <StyledButton onClick={() => setRenderQuality('Aperçu (Rapide)')} active={renderQuality === 'Aperçu (Rapide)'}>{T.preview}</StyledButton>
                                <StyledButton onClick={() => setRenderQuality('HD (Qualité)')} active={renderQuality === 'HD (Qualité)'}>{T.hd}</StyledButton>
                                <StyledButton onClick={() => setRenderQuality('UHD (Réalisme)')} active={renderQuality === 'UHD (Réalisme)'}>{T.uhd}</StyledButton>
                            </div>
                        </ControlSection>

                        <div className='grid grid-cols-1 gap-4'>
                            <ControlSection title=''>
                                <div className="flex gap-2">
                                    <StyledButton onClick={() => setColorMode('Couleur')} active={colorMode === 'Couleur'}>{T.color}</StyledButton>
                                    <StyledButton onClick={() => setColorMode('N&B')} active={colorMode === 'N&B'}>{T.bw}</StyledButton>
                                </div>
                            </ControlSection>
                        </div>
                        
                        <ControlSection title={T.upscale}>
                            <div className="grid grid-cols-4 gap-2">
                                {(['Standard', '4K', '6K', '8K'] as Upscale[]).map(u => <StyledButton key={u} onClick={() => setUpscale(u)} active={upscale === u}>{u}</StyledButton>)}
                            </div>
                        </ControlSection>
                        
                        <ControlSection title={T.photoSettings}>
                            <div className="bg-neutral-900 p-4 rounded-lg grid grid-cols-3 gap-2 justify-items-center">
                                <FunctionalDial label={T.focal} value={focale} setValue={setFocale} min={18} max={200} step={1} defaultValue={50} />
                                <FunctionalDial label={T.aperture} value={ouverture} setValue={setOuverture} min={1.2} max={22} step={0.1} defaultValue={2.8} />
                                <FunctionalDial label={T.speed} value={vitesse} setValue={setVitesse} min={1} max={4000} step={10} defaultValue={125} />
                            </div>
                        </ControlSection>
                        
                        <div className='grid grid-cols-2 gap-4'>
                           <ControlSection title={T.hairColor}><StyledSelect value={hairColor} onChange={e => setHairColor(e.target.value)}>{HAIR_COLORS.map(c=><option key={c} value={c}>{c}</option>)}</StyledSelect></ControlSection>
                           <ControlSection title={T.expression}><StyledSelect value={expression} onChange={e => setExpression(e.target.value)}>{EXPRESSIONS.map(e=><option key={e} value={e}>{e}</option>)}</StyledSelect></ControlSection>
                           <ControlSection title={T.glasses}><StyledSelect value={accessories} onChange={e => setAccessories(e.target.value)}>{ACCESSORIES.map(g=><option key={g} value={g}>{g}</option>)}</StyledSelect></ControlSection>
                           <ControlSection title={T.framing}><StyledSelect value={framing} onChange={e => setFraming(e.target.value)}>{FRAMES.map(f=><option key={f} value={f}>{f}</option>)}</StyledSelect></ControlSection>
                           <ControlSection title={T.luts}><StyledSelect value={lutsCinema} onChange={e => setLutsCinema(e.target.value)}>{LUTS.map(l=><option key={l} value={l}>{l}</option>)}</StyledSelect></ControlSection>
                           <ControlSection title={T.dirt}><StyledSelect value={dirt} onChange={e => setDirt(e.target.value)}>{DIRTS.map(d=><option key={d} value={d}>{d}</option>)}</StyledSelect></ControlSection>
                           <ControlSection title={T.grain}><StyledSelect value={photoGrain} onChange={e => setPhotoGrain(e.target.value)}>{GRAINS.map(g=><option key={g} value={g}>{g}</option>)}</StyledSelect></ControlSection>
                           <div className="flex flex-col justify-center items-start gap-2 pt-5">
                             <label className="flex items-center gap-2 text-white cursor-pointer"><input type="checkbox" checked={sweat} onChange={e => setSweat(e.target.checked)} className="form-checkbox bg-neutral-700 border-neutral-600 text-amber-500 h-4 w-4 rounded focus:ring-amber-500" /> {T.sweat}</label>
                             <label className="flex items-center gap-2 text-white cursor-pointer"><input type="checkbox" checked={speedEffect} onChange={e => setSpeedEffect(e.target.checked)} className="form-checkbox bg-neutral-700 border-neutral-600 text-amber-500 h-4 w-4 rounded focus:ring-amber-500" /> {T.speedEffect}</label>
                           </div>
                        </div>

                        <ControlSection title={T.signature}>
                            <div className="flex gap-2">
                                <input type="text" value={signature} onChange={e => setSignature(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                                <button onClick={() => setSignatureOn(!signatureOn)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors w-48 ${signatureOn ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'}`}>
                                    {signatureOn ? T.lockedOn : T.off}
                                </button>
                            </div>
                        </ControlSection>

                        <ControlSection title={T.formatSize}>
                            {Object.entries(ASPECT_RATIOS).map(([group, ratios]) => (
                                <div key={group}>
                                    <h4 className="text-xs text-neutral-400 uppercase font-bold mb-2">{T[group.toLowerCase() as keyof typeof T]}</h4>
                                    <div className="grid grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                                        {ratios.map(ratio => <StyledButton key={ratio} onClick={() => setAspectRatio(ratio)} active={aspectRatio === ratio}>{ratio}</StyledButton>)}
                                    </div>
                                </div>
                            ))}
                        </ControlSection>
                    </div>
                </div>
            </div>

            {previewImage && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setPreviewImage(null)}
                >
                    <button className="absolute top-4 right-4 text-white hover:text-amber-500" aria-label="Close preview">
                        <IconX size={32} />
                    </button>
                    <img 
                        src={previewImage} 
                        alt="Enlarged preview" 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={e => e.stopPropagation()} 
                    />
                     <button onClick={() => {
                        const link = document.createElement('a');
                        link.href = previewImage;
                        link.download = `retour-vers-le-futur-image.jpg`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                     }} className="absolute bottom-4 right-4 bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <IconDownload size={20}/> {T.download}
                    </button>
                </div>
            )}
            <Footer />
        </main>
    );
}

export default App;