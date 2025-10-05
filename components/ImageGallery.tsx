

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { GeneratedImage, AppState } from '../pages/Editor';
import { IconLoader, IconDownload, IconFileDownload, IconRefresh, IconClipboard, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageGalleryProps {
    generatedImages: GeneratedImage[];
    appState: AppState;
    handleDownloadAlbum: () => void;
    handleDownloadSingleImage: (url: string, id: number) => void;
    handleRegenerateImage: (id: number) => void;
    setPreviewImage: (url: string) => void;
    isZipping: boolean;
    isPdfGenerating: boolean;
    handleDownloadPdf: () => void;
    handleCopyPrompt: (prompt: string) => void;
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const ErrorDisplay = ({ message }: { message?: string }) => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-2 text-white bg-red-900/80 backdrop-blur-sm border border-red-500/50">
            <IconAlertCircle className="h-8 w-8 text-red-300 mb-2 flex-shrink-0" />
            <p className="font-semibold text-sm text-white">{t('generation_failed')}</p>
            {message && (
                <p className="text-xs mt-1 text-red-200/80 overflow-y-auto max-h-20">
                   {message}
                </p>
            )}
        </div>
    );
};


const ImageCard: React.FC<{
    image: GeneratedImage;
    onRegenerate: () => void;
    onDownload: () => void;
    onCopyPrompt: (prompt: string) => void;
    onPreview: () => void;
}> = ({ image, onRegenerate, onDownload, onCopyPrompt, onPreview }) => {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (image.prompt) {
            onCopyPrompt(image.prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div 
            className="aspect-square bg-black/20 rounded-lg overflow-hidden relative group cursor-pointer"
            onClick={onPreview}
        >
            {image.status === 'pending' && <LoadingSpinner />}
            {image.status === 'error' && <ErrorDisplay message={image.error} />}
            {image.status === 'done' && image.url && (
                <>
                    <img src={image.url} alt={`Generated image ${image.id}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
                        <button
                            onClick={(e) => { e.stopPropagation(); onRegenerate(); }}
                            title={t('regenerate')}
                            className="p-3 bg-black/50 rounded-full hover:bg-amber-500 hover:text-black transition-colors"
                        >
                            <IconRefresh size={22} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDownload(); }}
                            title={t('download')}
                            className="p-3 bg-black/50 rounded-full hover:bg-amber-500 hover:text-black transition-colors"
                        >
                            <IconDownload size={22} />
                        </button>
                         {image.prompt && (
                            <button
                                onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                                title="Copier le prompt"
                                className="p-3 bg-black/50 rounded-full hover:bg-amber-500 hover:text-black transition-colors disabled:cursor-wait"
                                disabled={copied}
                            >
                                {copied ? <IconCheck size={22} className="text-green-400"/> : <IconClipboard size={22} />}
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};


const ImageGallery: React.FC<ImageGalleryProps> = ({ 
    generatedImages, 
    appState, 
    handleDownloadAlbum, 
    handleDownloadSingleImage, 
    handleRegenerateImage, 
    setPreviewImage,
    isZipping,
    isPdfGenerating,
    handleDownloadPdf,
    handleCopyPrompt
}) => {
    const { t } = useLanguage();

    if (generatedImages.length === 0) {
        return null;
    }

    return (
         <div className="my-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {generatedImages.map((image) => (
                    <ImageCard 
                        key={image.id}
                        image={image}
                        onRegenerate={() => handleRegenerateImage(image.id)}
                        onDownload={() => image.url && handleDownloadSingleImage(image.url, image.id)}
                        onCopyPrompt={handleCopyPrompt}
                        onPreview={() => image.url && setPreviewImage(image.url)}
                    />
                ))}
            </div>

            {appState === 'results-shown' && generatedImages.some(img => img.status === 'done') && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center mt-8">
                    <button 
                        onClick={handleDownloadAlbum} 
                        disabled={isZipping || isPdfGenerating}
                        className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all duration-200 mx-auto shadow-amber-500/30 shadow-[0_0_15px_2px] hover:shadow-amber-500/50 disabled:bg-neutral-500 disabled:shadow-none disabled:cursor-wait"
                    >
                        {isZipping ? (
                            <>
                                <IconLoader size={20} className="animate-spin" />
                                {t('zipping')}...
                            </>
                        ) : (
                            <>
                                <IconDownload size={20}/> {t('downloadAlbum')}
                            </>
                        )}
                    </button>
                    <button 
                        onClick={handleDownloadPdf} 
                        disabled={isZipping || isPdfGenerating}
                        className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all duration-200 mx-auto shadow-neutral-500/20 shadow-[0_0_15px_2px] hover:shadow-neutral-500/40 disabled:bg-neutral-500 disabled:shadow-none disabled:cursor-wait"
                    >
                        {isPdfGenerating ? (
                            <>
                                <IconLoader size={20} className="animate-spin" />
                                Génération PDF...
                            </>
                        ) : (
                            <>
                                <IconFileDownload size={20}/> Télécharger PDF
                            </>
                        )}
                    </button>
                </div>
            )}
         </div>
    );
};

export default ImageGallery;