/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import type { FormState } from '../../hooks/useGenerationForm';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

interface TimeTravelPanelProps {
    formState: Pick<FormState, 'timeTravelOn' | 'setTimeTravelOn' | 'year' | 'setYear'>;
}

const TimeTravelPanel: React.FC<TimeTravelPanelProps> = ({ formState }) => {
    const { t } = useLanguage();
    const { timeTravelOn, setTimeTravelOn, year, setYear } = formState;
    const minYear = 1700;
    const maxYear = 2030;

    const [flipped, setFlipped] = useState(false);

    // Flip animation on year change
    useEffect(() => {
        if (!timeTravelOn) return;
        setFlipped(true);
        const timeout = setTimeout(() => setFlipped(false), 400); // Duration should match CSS
        return () => clearTimeout(timeout);
    }, [year, timeTravelOn]);

    // Mouse scroll (1 notch = ±1 year). Scroll up -> future, scroll down -> past.
    const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        if (!timeTravelOn) return;
        e.preventDefault();
        setYear((prev) => {
            let next = prev + (e.deltaY < 0 ? 1 : -1);
            if (next < minYear) next = minYear;
            if (next > maxYear) next = maxYear;
            return next;
        });
    };

    // Manual slider input
    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!timeTravelOn) return;
        setYear(parseInt(e.target.value));
    };
    
    // The visual component for the year digits, with separators
    const YearDigits = ({ currentYear }: { currentYear: number }) => (
        <div className="flex items-center justify-center divide-x divide-white/50">
            {currentYear.toString().split('').map((digit, index) => (
                <span key={index} className="px-2">{digit}</span>
            ))}
        </div>
    );

    return (
        <div
            className="flex flex-col items-center justify-center bg-black/90 rounded-xl p-4 w-full border border-orange-500 shadow-[0_0_20px_rgba(255,100,0,0.3)] select-none"
            onWheel={handleScroll}
        >
            <div className="flex justify-between items-center w-full mb-3">
                <h3 className="text-orange-400 font-semibold text-sm tracking-wider uppercase">
                    {t('timeTravel')}
                </h3>
                {/* Toggle switch in the corner */}
                <div className="flex items-center gap-2">
                     <span className={`text-xs font-bold transition-colors ${timeTravelOn ? 'text-orange-500' : 'text-neutral-500'}`}>
                        {timeTravelOn ? t('open').toUpperCase() : t('timeTravel_close').toUpperCase()}
                    </span>
                    <button
                        onClick={() => setTimeTravelOn(!timeTravelOn)}
                        className={cn(
                            "w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300",
                            timeTravelOn ? "bg-orange-500 justify-end" : "bg-neutral-700 justify-start"
                        )}
                        aria-label={t(timeTravelOn ? 'timeTravel_close' : 'open')}
                    >
                        <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                    </button>
                </div>
            </div>
            
            {/* Year Display with Flip Animation */}
            <div className="relative w-44 h-16" style={{ perspective: '1000px' }}>
                <div
                    className={cn(
                        "absolute w-full h-full flex items-center justify-center font-mono font-bold text-4xl rounded-lg tracking-widest transition-transform duration-500",
                        timeTravelOn
                            ? "bg-black text-orange-500 shadow-[inset_0_0_10px_rgba(255,100,0,0.5)]"
                            : "bg-neutral-800 text-neutral-600",
                        flipped && "[transform:rotateX(180deg)]"
                    )}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front Face */}
                    <div className="absolute w-full h-full flex items-center justify-center [backface-visibility:hidden]">
                        <YearDigits currentYear={year} />
                    </div>
                    {/* Back Face */}
                    <div className="absolute w-full h-full flex items-center justify-center [transform:rotateX(180deg)] [backface-visibility:hidden]">
                        <YearDigits currentYear={year} />
                    </div>
                    
                    {/* Horizontal Separator Line */}
                    <div 
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/50" 
                        style={{ transform: 'translateZ(1px)' }}
                    />
                </div>
            </div>
            
            {/* Horizontal Slider */}
            <input
                type="range"
                min={minYear}
                max={maxYear}
                value={year}
                onChange={handleSlider}
                disabled={!timeTravelOn}
                className="w-full h-3 appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed mt-4
                           [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-3 [&::-webkit-slider-runnable-track]:bg-neutral-400
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:-mt-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 disabled:[&::-webkit-slider-thumb]:bg-neutral-600
                           [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-3 [&::-moz-range-track]:bg-neutral-400
                           [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-orange-500 disabled:[&::-moz-range-thumb]:bg-neutral-600"
            />

            {/* Instruction Text */}
            <p className="text-xs text-white mt-3 italic text-center">
                {t('timeTravel_scroll_instruction')}
            </p>
        </div>
    );
};

export default TimeTravelPanel;