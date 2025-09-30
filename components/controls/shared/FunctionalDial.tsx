/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef } from 'react';

export const FunctionalDial: React.FC<{
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
