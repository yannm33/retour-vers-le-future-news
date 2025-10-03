/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useCallback } from 'react';
import type { ApiKeys } from '../services/geminiService';

const GEMINI_KEY_LS = 'geminiApiKey';
const IDEOGRAM_KEY_LS = 'ideogramApiKey';
const REVART_KEY_LS = 'revartApiKey';

export const useApiKeys = () => {
    const [apiKeys, setApiKeys] = useState<ApiKeys>({
        gemini: '',
        ideogram: '',
        revart: '',
    });

    useEffect(() => {
        // Load keys from localStorage on initial mount
        const geminiKey = localStorage.getItem(GEMINI_KEY_LS) || '';
        const ideogramKey = localStorage.getItem(IDEOGRAM_KEY_LS) || '';
        const revartKey = localStorage.getItem(REVART_KEY_LS) || '';
        setApiKeys({ gemini: geminiKey, ideogram: ideogramKey, revart: revartKey });
    }, []);

    const saveApiKeys = useCallback((newKeys: Partial<ApiKeys>) => {
        const updatedKeys = { ...apiKeys, ...newKeys };

        if (newKeys.gemini !== undefined) {
            localStorage.setItem(GEMINI_KEY_LS, newKeys.gemini);
        }
        if (newKeys.ideogram !== undefined) {
            localStorage.setItem(IDEOGRAM_KEY_LS, newKeys.ideogram);
        }
        if (newKeys.revart !== undefined) {
            localStorage.setItem(REVART_KEY_LS, newKeys.revart);
        }
        
        setApiKeys(updatedKeys);
    }, [apiKeys]);

    return { apiKeys, saveApiKeys };
};
