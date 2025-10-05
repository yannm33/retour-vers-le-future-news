/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';

// FIX: Define a specific props interface for this custom component instead of using SelectHTMLAttributes.
// This resolves type conflicts as the component uses a <button>, not a <select>.
interface StyledSelectProps {
    children: React.ReactNode;
    value?: string | number | readonly string[] | undefined;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    dropdownClassName?: string;
}

export const StyledSelect: React.FC<StyledSelectProps> = ({ children, value, onChange, disabled, dropdownClassName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const options = React.Children.toArray(children).filter(React.isValidElement);

    const findLabelForValue = (val: string | number | readonly string[] | undefined) => {
        let label = '';
        React.Children.forEach(children, child => {
            // FIX: Cast child props to `any` to safely access `value` and `children` properties.
            // TypeScript cannot infer the props of arbitrary children elements.
            if (React.isValidElement(child)) {
                if ((child.props as any).value === val) {
                    label = (child.props as any).children;
                } else if (child.type === 'optgroup' && (child.props as any).children) {
                    React.Children.forEach((child.props as any).children, subChild => {
                        if (React.isValidElement(subChild) && (subChild.props as any).value === val) {
                           label = (subChild.props as any).children;
                        }
                    });
                }
            }
        });
        return label;
    };

    const selectedLabel = findLabelForValue(value) || '';

    const handleOptionClick = (optionValue: string) => {
        if (onChange && !disabled) {
            const syntheticEvent = {
                target: { value: optionValue },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange(syntheticEvent);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={selectRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={cn(
                    "bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full text-left flex justify-between items-center",
                    "focus:outline-none focus:ring-2 focus:ring-amber-500",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                <span className="truncate">{selectedLabel}</span>
                <div className="pointer-events-none inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                    <svg className={`fill-current h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && !disabled && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "absolute z-10 w-full mt-1 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg max-h-60 overflow-y-auto",
                            dropdownClassName
                        )}
                    >
                        <ul>
                            {options.map((option, index) => {
                                // FIX: Cast option props to `any` for safe property access.
                                if ((option as any).type === 'optgroup') {
                                    return (
                                        <li key={(option.props as any).label || index}>
                                            <div className="px-3 py-2 text-xs font-bold text-neutral-400 uppercase tracking-wider select-none">{(option.props as any).label}</div>
                                            <ul>
                                                {React.Children.map((option.props as any).children, (child, subIndex) => {
                                                    if (React.isValidElement(child)) {
                                                        return (
                                                            <li
                                                                key={(child.props as any).value || subIndex}
                                                                className="px-3 py-2 text-white cursor-pointer hover:bg-amber-500 hover:text-black"
                                                                onClick={() => handleOptionClick((child.props as any).value)}
                                                            >
                                                                {(child.props as any).children}
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </ul>
                                        </li>
                                    );
                                }
                                return (
                                    <li
                                        key={(option.props as any).value || index}
                                        className="px-3 py-2 text-white cursor-pointer hover:bg-amber-500 hover:text-black"
                                        onClick={() => handleOptionClick((option.props as any).value)}
                                    >
                                        {(option.props as any).children}
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};