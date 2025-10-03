/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { IconBrush, IconEraser, IconX, IconLoader, IconDeviceFloppy, IconArrowBackUp } from '@tabler/icons-react';
import { editImageWithMask } from '../services/geminiService';
import useMaskCanvas from '../hooks/useMaskCanvas';
import { GeneratedImage } from '../pages/Editor';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageEditorModalProps {
    image: GeneratedImage | null;
    onClose: () => void;
    onSave: (imageId: number, newUrl: string) => void;
    apiKey: string;
}

const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ image, onClose, onSave, apiKey }) => {
    const { t } = useLanguage();
    const [prompt, setPrompt] = useState('');
    const [brushSize, setBrushSize] = useState(40);
    const [isErasing, setIsErasing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);

    const imageRef = useRef<HTMLImageElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    
    const { canvasRef, clearCanvas, undo, exportMask, hasDrawing } = useMaskCanvas({
        brushSize,
        isErasing,
        imageRef,
    });

    useEffect(() => {
        // Reset state when a new image is opened
        setPrompt('');
        setIsEditing(false);
        setError(null);
        setEditedImageUrl(null);
        clearCanvas();
    }, [image, clearCanvas]);
    
    const handleEdit = async () => {
        if (!image?.url || !prompt || !hasDrawing) return;
        setIsEditing(true);
        setError(null);

        try {
            const maskDataUrl = exportMask();
            if (!maskDataUrl) {
                throw new Error("Could not generate mask from canvas.");
            }
            const resultUrl = await editImageWithMask(image.url, maskDataUrl, prompt, apiKey);
            setEditedImageUrl(resultUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('editError'));
        } finally {
            setIsEditing(false);
        }
    };
    
    const handleSave = () => {
        if (editedImageUrl && image) {
            onSave(image.id, editedImageUrl);
            onClose();
        }
    };
    
    if (!image || !image.url) return null;
    
    const isApplyDisabled = isEditing || !prompt || !hasDrawing;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-neutral-900 rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col md:flex-row gap-4 p-4 relative text-white"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-amber-500 z-30" aria-label={t('close')}>
                    <IconX size={28} />
                </button>

                {/* Left Panel: Toolbar */}
                <div className="flex-shrink-0 w-full md:w-64 bg-neutral-800 rounded-lg p-4 flex flex-col gap-4">
                    <h2 className="text-xl font-bold border-b border-neutral-700 pb-2">{t('editPanelTitle')}</h2>
                    
                    <div>
                        <label className="text-sm font-semibold text-neutral-400">{t('brushSize')}</label>
                        <div className='flex items-center gap-2'>
                             <input type="range" min="5" max="150" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                             <span className='font-mono text-xs w-8 text-center'>{brushSize}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setIsErasing(false)} className={cn('p-2 rounded-md flex items-center justify-center gap-2', !isErasing ? 'bg-amber-500 text-black' : 'bg-neutral-700 hover:bg-neutral-600')}>
                            <IconBrush size={20} /><span>{t('brush')}</span>
                        </button>
                        <button onClick={() => setIsErasing(true)} className={cn('p-2 rounded-md flex items-center justify-center gap-2', isErasing ? 'bg-amber-500 text-black' : 'bg-neutral-700 hover:bg-neutral-600')}>
                            <IconEraser size={20} /><span>{t('eraser')}</span>
                        </button>
                    </div>
                     <button onClick={undo} className='p-2 rounded-md bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center gap-2'>
                        <IconArrowBackUp size={20} /><span>{t('undo')}</span>
                    </button>
                    <button onClick={clearCanvas} className="text-red-400 hover:bg-red-900/50 p-2 rounded-md transition-colors">{t('clearMask')}</button>
                    
                    <div className='flex-grow flex flex-col justify-end'>
                         <label htmlFor="edit-prompt" className="text-sm font-semibold text-neutral-400 mb-2">{t('editInstruction')}</label>
                        <textarea 
                            id="edit-prompt"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            placeholder={hasDrawing ? t('editPlaceholder') : t('editPlaceholderDrawFirst')}
                            rows={4}
                            disabled={!hasDrawing}
                            className="bg-neutral-700 border border-neutral-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                         <button 
                            onClick={() => !isApplyDisabled && handleEdit()} 
                            title={isApplyDisabled ? t('applyEditTooltip') : ''}
                            className={cn(
                                "mt-2 w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all",
                                "hover:shadow-lg hover:shadow-orange-400/50",
                                isApplyDisabled 
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-orange-600 active:translate-y-px"
                            )}
                        >
                            {isEditing ? <><IconLoader className='animate-spin' /> {t('generating')}</> : t('applyEdit')}
                        </button>
                        {error && <p className="text-red-400 text-xs mt-2 text-center">{error}</p>}
                    </div>

                </div>

                {/* Right Panel: Image Viewer */}
                <div className="flex-grow bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div ref={canvasContainerRef} className="relative w-full h-full flex items-center justify-center">
                        <img
                           ref={imageRef}
                           src={editedImageUrl ?? image.url}
                           alt={t('imageToEdit')}
                           className="max-w-full max-h-full object-contain"
                           // This key forces a re-render and re-attachment of the 'load' event listener in the hook
                           key={image.url}
                        />
                        <canvas ref={canvasRef} className="absolute opacity-50 cursor-crosshair" />
                    </div>
                    {editedImageUrl && (
                         <div className="absolute bottom-4 right-4 flex gap-2">
                             <button onClick={() => setEditedImageUrl(null)} className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">{t('revert')}</button>
                             <button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                                <IconDeviceFloppy size={20} /> {t('save')}
                            </button>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageEditorModal;