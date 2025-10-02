
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { IconX, IconDownload } from '@tabler/icons-react';

interface ImagePreviewModalProps {
    previewImage: string | null;
    setPreviewImage: (url: string | null) => void;
    T: any;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ previewImage, setPreviewImage, T }) => {
    if (!previewImage) {
        return null;
    }

    return (
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
    );
};

export default ImagePreviewModal;