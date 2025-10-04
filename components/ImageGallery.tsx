/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { GeneratedImage, AppState } from '../pages/Editor';
import { IconLoader, IconAlertTriangle, IconDownload, IconRefresh } from '@tabler/icons-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn, getAspectRatioClass } from '../lib/utils';

interface ImageGalleryProps {
    generatedImages: GeneratedImage[];
    appState: AppState;
    handleDownloadAlbum: () => void;
    handleDownloadSingleImage: (url: string, id: number) => void;
    handleRegenerateImage: (id: number) => void;
    setPreviewImage: (url: string) => void;
    aspectRatio: string;
    isZipping: boolean;
}

const GalleryItem: React.FC<{
    image: GeneratedImage;
    onRegenerate: (id: number) => void;
    onDownload: (url: string, id: number) => void;
    onPreview: (url: string) => void;
    aspectRatio: string;
}> = ({ image, onRegenerate, onDownload, onPreview, aspectRatio }) => {
    const { t } = useLanguage();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (image.status !== 'done' || !image.url) {
            setIsLoaded(false);
        }
    }, [image.status, image.url]);

    return (
        <div className={cn(
            "bg-neutral-800 rounded-lg p-1 shadow-lg border border-neutral-700 relative group",
            getAspectRatioClass(aspectRatio)
        )}>
            <div className="bg-black w-full h-full rounded flex items-center justify-center overflow-hidden">
                {image.status === 'pending' && <IconLoader size={32} className="animate-spin text-neutral-500" />}
                {image.status === 'error' && <IconAlertTriangle size={32} className="text-red-500" title={image.error} />}
                {image.status === 'done' && image.url && (
                    <>
                        <img 
                            src={image.url} 
                            alt={`Generated image ${image.id + 1}`} 
                            className={cn(
                                "w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-all duration-500",
                                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            )}
                            onClick={() => onPreview(image.url!)}
                            onLoad={() => setIsLoaded(true)}
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 md:gap-4 md:opacity-0 group-hover:md:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRegenerate(image.id);
                                }}
                                className="p-3 bg-black/50 rounded-full text-white hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                                aria-label={t('regenerate')}
                                title={t('regenerate')}
                            >
                                <IconRefresh size={20} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDownload(image.url!, image.id);
                                }}
                                className="p-3 bg-black/50 rounded-full text-white hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                                aria-label={t('download')}
                                title={t('download')}
                            >
                                <IconDownload size={20} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ generatedImages, appState, handleDownloadAlbum, handleDownloadSingleImage, handleRegenerateImage, setPreviewImage, aspectRatio, isZipping }) => {
    const { t } = useLanguage();

    if (generatedImages.length === 0) {
        return null;
    }

    return (
         <div className="my-6">
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center`}>
                 {generatedImages.map(image => (
                    <GalleryItem
                        key={image.id}
                        image={image}
                        onRegenerate={handleRegenerateImage}
                        onDownload={handleDownloadSingleImage}
                        onPreview={setPreviewImage}
                        aspectRatio={aspectRatio}
                    />
                ))}
            </div>
            {appState === 'results-shown' && generatedImages.some(img => img.status === 'done') && (
                 <div className="text-center">
                    <button 
                        onClick={handleDownloadAlbum} 
                        disabled={isZipping}
                        className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg mt-8 flex items-center gap-2 transition-all duration-200 mx-auto shadow-amber-500/30 shadow-[0_0_15px_2px] hover:shadow-amber-500/50 disabled:bg-neutral-500 disabled:shadow-none disabled:cursor-wait"
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
                </div>
            )}
         </div>
    );
};

export default ImageGallery;