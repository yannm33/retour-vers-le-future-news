/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// FIX: Add default React import to fix 'Cannot find namespace React' error.
import React, { useRef, useEffect, useCallback, useState } from 'react';

interface UseMaskCanvasProps {
    brushSize: number;
    isErasing: boolean;
    imageRef: React.RefObject<HTMLImageElement>;
}

const useMaskCanvas = ({ brushSize, isErasing, imageRef }: UseMaskCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawingRef = useRef(false);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [hasDrawing, setHasDrawing] = useState(false);

    const setCanvasDimensions = useCallback(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        const ctx = contextRef.current;
        if (canvas && image && ctx && image.complete && image.naturalHeight > 0) {
            const imageRect = image.getBoundingClientRect();
            // If the image isn't rendered yet, its dimensions will be 0.
            if (imageRect.width === 0 || imageRect.height === 0) {
                return;
            }
            
            const containerRect = image.parentElement!.getBoundingClientRect();

            const top = imageRect.top - containerRect.top;
            const left = imageRect.left - containerRect.left;

            // Set visual size and position to overlay the image perfectly
            canvas.style.top = `${top}px`;
            canvas.style.left = `${left}px`;
            canvas.style.width = `${imageRect.width}px`;
            canvas.style.height = `${imageRect.height}px`;

            // Set drawing buffer size to match visual size
            if (canvas.width !== imageRect.width || canvas.height !== imageRect.height) {
                const oldHistory = history[history.length - 1];
                canvas.width = imageRect.width;
                canvas.height = imageRect.height;
                // Restore previous drawing after resize, if it exists
                if (oldHistory) {
                    // Create a temporary canvas to resize the old history ImageData
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = oldHistory.width;
                    tempCanvas.height = oldHistory.height;
                    const tempCtx = tempCanvas.getContext('2d');
                    if (tempCtx) {
                        tempCtx.putImageData(oldHistory, 0, 0);
                        ctx.drawImage(tempCanvas, 0, 0, imageRect.width, imageRect.height);
                    }
                }
            }
        }
    }, [history, imageRef]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image) return;

        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context) return;
        contextRef.current = context;
        
        const handleResize = () => {
             // Use requestAnimationFrame to ensure the browser has completed layout and paint
            requestAnimationFrame(() => {
                setCanvasDimensions();
            });
        };
        
        // Initial setup
        if (image.complete && image.naturalWidth > 0) {
            handleResize();
        } else {
            image.addEventListener('load', handleResize, { once: true });
        }

        // Observe the image itself for any size changes (e.g., from window resize).
        // This is more reliable than observing the parent container.
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(image);
        
        return () => {
            resizeObserver.disconnect();
            image.removeEventListener('load', handleResize);
        };
    }, [setCanvasDimensions, imageRef]);

    const saveHistory = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
         // Check canvas has a drawable area before saving history
        if (canvas && ctx && canvas.width > 0 && canvas.height > 0) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            setHistory(prev => [...prev.slice(-10), imageData]); // Keep last 10 states
        }
    }, []);

    const startDrawing = useCallback((event: MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas || !contextRef.current) return;

        saveHistory(); // Save state before drawing
        isDrawingRef.current = true;
        setHasDrawing(true);

        const { offsetX, offsetY } = getCoords(event, canvas);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    }, [saveHistory]);

    const finishDrawing = useCallback(() => {
        if (!contextRef.current || !isDrawingRef.current) return;
        contextRef.current.closePath();
        isDrawingRef.current = false;
    }, []);

    const draw = useCallback((event: MouseEvent | TouchEvent) => {
        if (!isDrawingRef.current || !contextRef.current || !canvasRef.current) return;
        
        const { offsetX, offsetY } = getCoords(event, canvasRef.current);

        contextRef.current.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
        contextRef.current.strokeStyle = 'white';
        contextRef.current.fillStyle = 'white';
        contextRef.current.lineWidth = brushSize;
        contextRef.current.lineCap = 'round';
        contextRef.current.lineJoin = 'round';

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }, [brushSize, isErasing]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseDown = (e: MouseEvent) => startDrawing(e);
        const handleMouseUp = () => finishDrawing();
        const handleMouseMove = (e: MouseEvent) => draw(e);
        const handleMouseLeave = () => finishDrawing();

        const handleTouchStart = (e: TouchEvent) => { e.preventDefault(); startDrawing(e); };
        const handleTouchEnd = (e: TouchEvent) => { e.preventDefault(); finishDrawing(); };
        const handleTouchMove = (e: TouchEvent) => { e.preventDefault(); draw(e); };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });


        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchend', handleTouchEnd);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, [startDrawing, finishDrawing, draw]);

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
            saveHistory();
            context.clearRect(0, 0, canvas.width, canvas.height);
            setHistory([]); // Clear history as well
            setHasDrawing(false);
        }
    }, [saveHistory]);

    const undo = useCallback(() => {
        if (history.length > 0) {
            const canvas = canvasRef.current;
            const ctx = contextRef.current;
            const lastState = history[history.length - 1];
            if (canvas && ctx && lastState) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.putImageData(lastState, 0, 0);
                setHistory(prev => prev.slice(0, -1));
                if (history.length <= 1) { 
                    setHasDrawing(false);
                }
            }
        }
    }, [history]);
    
    const exportMask = useCallback((): string | null => {
        const visibleCanvas = canvasRef.current;
        const image = imageRef.current;
        if (!visibleCanvas || !image || !image.complete || image.naturalHeight === 0) return null;
    
        // Create a new canvas with the original image's dimensions
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = image.naturalWidth;
        maskCanvas.height = image.naturalHeight;
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return null;
    
        // Draw the scaled mask from the visible canvas to the new canvas
        maskCtx.drawImage(visibleCanvas, 0, 0, image.naturalWidth, image.naturalHeight);
    
        // Process this new canvas to create the B&W mask
        const imageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha > 0) { // If pixel has been drawn on (is white)
                data[i] = 255;     // R
                data[i + 1] = 255; // G
                data[i + 2] = 255; // B
            } else { // Undrawn areas are black
                data[i] = 0;       // R
                data[i + 1] = 0;   // G
                data[i + 2] = 0;   // B
            }
            data[i + 3] = 255; // Make all pixels opaque
        }
        
        maskCtx.putImageData(imageData, 0, 0);
        return maskCanvas.toDataURL('image/png');
    }, [imageRef]);

    const getCoords = (event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top,
        };
    };

    return { canvasRef, clearCanvas, undo, exportMask, hasDrawing };
};

export default useMaskCanvas;