/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { LANGUAGE_KEY_LS } from '../lib/constants';
import { translations } from '../i18n/translations';

type Language = 'en' | 'fr';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const storedLang = localStorage.getItem(LANGUAGE_KEY_LS) as Language;
        return storedLang && ['en', 'fr'].includes(storedLang) ? storedLang : 'fr';
    });

    useEffect(() => {
        localStorage.setItem(LANGUAGE_KEY_LS, language);
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = useCallback((key: string): string => {
        const langDict = translations[language] as Record<string, string>;
        const defaultLangDict = translations.fr as Record<string, string>;
        return langDict[key] || defaultLangDict[key] || key;
    }, [language]);

    const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};