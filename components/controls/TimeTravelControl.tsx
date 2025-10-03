/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { cn } from '../../lib/utils';

const TimeTravelControl = ({ formState, T }) => {
    const { timeTravelOn, setTimeTravelOn, year, setYear } = formState;
    const minYear = 1418;
    const maxYear = 2030;

    const handleYearChange = (newYear) => {
        setYear(Math.max(minYear, Math.min(maxYear, newYear)));
    };

    return (
        <div className={cn(
            "p-2 rounded-xl flex flex-col items-center justify-center h-full transition-all duration-300",
            timeTravelOn 
                ? 'bg-orange-500 border-orange-400 shadow-[0_0_15px_2px] shadow-orange-500/50' 
                : 'bg-neutral-800 border border-neutral-700 hover:border-amber-500'
        )}>
            <label 
                htmlFor="time-travel-toggle-main" 
                className={cn(
                    "text-xs font-bold uppercase cursor-pointer select-none transition-colors duration-300",
                    timeTravelOn ? 'text-black' : 'text-amber-500'
                )}
                onClick={(e) => {
                    e.preventDefault();
                    setTimeTravelOn(!timeTravelOn)
                }}
            >
                {T.timeTravel}
            </label>
            <div className="flex items-center gap-1 mt-1">
                <input
                    id="time-travel-toggle-main"
                    type="checkbox"
                    checked={timeTravelOn}
                    onChange={() => setTimeTravelOn(!timeTravelOn)}
                    className="appearance-none w-8 h-4 bg-neutral-700 rounded-full cursor-pointer relative transition-colors duration-300 checked:bg-amber-500
                               after:content-[''] after:w-3 after:h-3 after:bg-white after:rounded-full after:absolute after:top-1/2 after:left-0.5 after:-translate-y-1/2
                               after:transition-transform after:duration-300 checked:after:translate-x-4"
                />
                <div className="relative">
                    <input
                        type="number"
                        value={year}
                        min={minYear}
                        max={maxYear}
                        onChange={(e) => handleYearChange(Number(e.target.value))}
                        disabled={!timeTravelOn}
                        className={cn(
                            "w-20 bg-transparent text-center font-mono text-xl font-bold p-0 border-none focus:outline-none disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                            timeTravelOn ? 'text-black' : 'text-white'
                        )}
                    />
                </div>
                <div className="flex flex-col">
                    <button onClick={() => handleYearChange(year + 1)} disabled={!timeTravelOn} className={cn("disabled:opacity-50 h-4 flex items-center justify-center transition-colors", timeTravelOn ? 'text-black hover:text-neutral-700' : 'text-white hover:text-amber-500')}>
                        <IconChevronUp size={16} />
                    </button>
                    <button onClick={() => handleYearChange(year - 1)} disabled={!timeTravelOn} className={cn("disabled:opacity-50 h-4 flex items-center justify-center transition-colors", timeTravelOn ? 'text-black hover:text-neutral-700' : 'text-white hover:text-amber-500')}>
                        <IconChevronDown size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeTravelControl;