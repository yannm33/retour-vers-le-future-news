/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';

export const RoundCameraDial: React.FC<{
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    values: readonly string[];
}> = ({ value, setValue, values }) => {
    const isDraggingRef = useRef(false);
    const dragStartYRef = useRef(0);
    const valueIndexOnDragStartRef = useRef(0);
    const dialContainerRef = useRef<HTMLDivElement>(null);

    const [displayValue, setDisplayValue] = useState(value);

    // Update display when prop changes
    useEffect(() => {
        setDisplayValue(value);
    }, [value]);
    
    const handleTouchStart = (e: React.TouchEvent) => {
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        isDraggingRef.current = true;
        dragStartYRef.current = e.touches[0].clientY;
        
        const currentIndex = values.indexOf(value);
        valueIndexOnDragStartRef.current = currentIndex === -1 ? Math.floor(values.length / 2) : currentIndex;

        const handleTouchMove = (event: TouchEvent) => {
            if (!isDraggingRef.current) return;
            event.preventDefault(); // Prevent page scroll

            const sensitivity = 15; // Pixels moved per value change
            const deltaY = event.touches[0].clientY - dragStartYRef.current;
            
            if (Math.abs(deltaY) > sensitivity) {
                const direction = deltaY > 0 ? 1 : -1;
                
                setValue(prev => {
                    const currentIndex = values.indexOf(prev);
                    if (currentIndex === -1) {
                        return values[Math.floor(values.length / 2)];
                    }
                    const newIndex = Math.max(0, Math.min(values.length - 1, currentIndex + direction));
                    return values[newIndex];
                });

                // Reset start position for "ratcheting" feel
                dragStartYRef.current = event.touches[0].clientY;
            }
        };

        const handleTouchEnd = () => {
            isDraggingRef.current = false;
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };

        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
    };

    useEffect(() => {
        const dialNode = dialContainerRef.current;
        if (!dialNode) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // Prevent the browser's default scroll action
            e.stopPropagation(); // Stop the event from bubbling up to other elements

            const direction = e.deltaY > 0 ? 1 : -1;
            
            setValue(prev => {
                const currentIndex = values.indexOf(prev);
                if (currentIndex === -1) { // If current is "Auto"
                    const midIndex = Math.floor(values.length / 2);
                    return values[midIndex];
                }
                const newIndex = Math.max(0, Math.min(values.length - 1, currentIndex + direction));
                return values[newIndex];
            });
        };

        // Add event listener with { passive: false } to allow preventDefault()
        dialNode.addEventListener('wheel', handleWheel, { passive: false });

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            dialNode.removeEventListener('wheel', handleWheel);
        };
    }, [values, setValue]); // Re-run effect if these change

    const isActive = value !== 'Auto';

    return (
        <div className="flex flex-col items-center gap-2">
            <div 
                className={cn(
                    "px-3 py-1 rounded text-center w-24 cursor-pointer select-none transition-all duration-200 font-mono font-bold uppercase",
                    isActive 
                        ? 'bg-amber-500 text-black shadow-amber-500/50 shadow-[0_0_15px_2px]' 
                        : 'bg-neutral-800 text-white hover:bg-neutral-700 hover:shadow-amber-500/30 hover:shadow-[0_0_10px_1px]'
                )}
                onClick={() => setValue('Auto')}
                title="Cliquer pour réinitialiser en Auto"
            >
                {displayValue}
            </div>
            <div
                ref={dialContainerRef}
                className="relative w-20 h-20 flex items-center justify-center cursor-ns-resize group"
                onTouchStart={handleTouchStart}
            >
                <div className="w-full h-full rounded-full bg-neutral-800 border border-amber-500 shadow-inner flex items-center justify-center relative overflow-hidden">
                    <div 
                        className="absolute w-full h-full"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(0deg, transparent, transparent 3px, #4a4a4a 3px, #4a4a4a 4px),
                                repeating-linear-gradient(90deg, transparent, transparent 3px, #4a4a4a 3px, #4a4a4a 4px)
                            `,
                             backgroundSize: '4px 4px',
                             opacity: 0.2
                        }}
                    ></div>
                     <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent any parent handlers
                            setValue('Auto');
                        }}
                        className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 active:bg-red-700 transition-colors cursor-pointer z-10"
                        aria-label="Réinitialiser en Auto"
                        title="Cliquer pour réinitialiser en Auto"
                    ></button>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1 h-1 rounded-full bg-amber-500 shadow-[0_0_3px_1px_rgba(245,158,11,0.7)]"></div>
            </div>
        </div>
    );
};