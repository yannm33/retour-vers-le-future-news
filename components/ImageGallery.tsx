/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { GeneratedImage, AppState } from '../pages/Editor';
import { IconLoader, IconAlertTriangle, IconDownload, IconRefresh, IconBrush } from '@tabler/icons-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageGalleryProps {
    generatedImages: GeneratedImage[];
    appState: AppState;
    handleDownloadAlbum: () => void;
    handleDownloadSingleImage: (url: string, id: number) => void;
    handleRegenerateImage: (id: number) => void;
    setPreviewImage: (url: string) => void;
    setEditingImage: (image: GeneratedImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ generatedImages, appState, handleDownloadAlbum, handleDownloadSingleImage, handleRegenerateImage, setPreviewImage, setEditingImage }) => {
    const { t } = useLanguage();

    if (generatedImages.length === 0) {
        return null;
    }

    return (
         <div className="my-6">
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center`}>
                 {generatedImages.map(image => (
                    <div key={image.id} className="aspect-square bg-neutral-800 rounded-lg p-1 shadow-lg border border-neutral-700 relative group">
                        <div className="bg-black w-full h-full rounded flex items-center justify-center overflow-hidden">
                            {image.status === 'pending' && <IconLoader size={32} className="animate-spin text-neutral-500" />}
                            {image.status === 'error' && <IconAlertTriangle size={32} className="text-red-500" title={image.error} />}
                            {image.status === 'done' && image.url && (
                                <>
                                    <img 
                                        src={image.url} 
                                        alt={`Generated image ${image.id + 1}`} 
                                        className="w-full h-full object-contain cursor-pointer group-hover:scale-105 transition-transform duration-300" 
                                        onClick={() => setPreviewImage(image.url!)}
                                    />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 md:gap-4 md:opacity-0 group-hover:md:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingImage(image);
                                            }}
                                            className="p-3 bg-black/50 rounded-full text-white hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                                            aria-label={t('edit')}
                                            title={t('edit')}
                                        >
                                            <IconBrush size={20} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRegenerateImage(image.id);
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
                                                handleDownloadSingleImage(image.url!, image.id);
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
                ))}
            </div>
            {appState === 'results-shown' && generatedImages.some(img => img.status === 'done') && (
                 <div className="text-center">
                    <button onClick={handleDownloadAlbum} className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg mt-8 flex items-center gap-2 transition-all duration-200 mx-auto shadow-amber-500/30 shadow-[0_0_15px_2px] hover:shadow-amber-500/50">
                        <IconDownload size={20}/> {t('downloadAlbum')}
                    </button>
                </div>
            )}
         </div>
    );
};

export default ImageGallery;