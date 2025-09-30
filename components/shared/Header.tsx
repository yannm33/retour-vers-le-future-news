/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { Language } from '../../pages/Editor';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    T: any;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
    return (
        <div className="absolute top-0 right-0 p-4 flex gap-2 z-20">
            <button 
                onClick={() => setLanguage('FR')} 
                className={`font-bold py-1 px-3 rounded-md text-sm transition-colors ${language === 'FR' ? 'bg-amber-500 text-black' : 'bg-black/20 text-white hover:bg-black/40'}`}
                aria-pressed={language === 'FR'}
            >
                FR
            </button>
            <button 
                onClick={() => setLanguage('EN')} 
                className={`font-bold py-1 px-3 rounded-md text-sm transition-colors ${language === 'EN' ? 'bg-amber-500 text-black' : 'bg-black/20 text-white hover:bg-black/40'}`}
                aria-pressed={language === 'EN'}
            >
                EN
            </button>
        </div>
    );
};

export default Header;
