/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const buttonClasses = (isActive: boolean) => cn(
        "px-3 py-1 text-xs font-bold rounded-md transition-colors duration-200",
        isActive ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/30"
    );

    return (
        <div className="flex items-center gap-1 p-1 bg-black/40 border border-white/20 rounded-lg backdrop-blur-sm">
            <button
                onClick={() => setLanguage('en')}
                className={buttonClasses(language === 'en')}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('fr')}
                className={buttonClasses(language === 'fr')}
                aria-pressed={language === 'fr'}
            >
                FR
            </button>
        </div>
    );
};

export default LanguageSwitcher;
