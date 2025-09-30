/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { GeneratedImage, AppState } from '../pages/Editor';
import { IconLoader, IconAlertTriangle, IconDownload } from '@tabler/icons-react';

interface ImageGalleryProps {
    generatedImages: GeneratedImage[];
    appState: AppState;
    handleDownloadAlbum: () => void;
    setPreviewImage: (url: string) => void;
    T: any;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ generatedImages, appState, handleDownloadAlbum, setPreviewImage, T }) => {
    if (generatedImages.length === 0) {
        return null;
    }

    return (
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
    );
};

export default ImageGallery;