/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect, useCallback } from 'react';
import { GOOGLE_KEY_LS, IDEOGRAM_KEY_LS, REVART_KEY_LS } from '../lib/constants';
import type { ApiKeys } from '../services/geminiService';

export const useApiKeys = () => {
    const [apiKeys, setApiKeys] = useState<ApiKeys>({
        google: '',
        ideogram: '',
        revart: '',
    });

    useEffect(() => {
        const googleKey = localStorage.getItem(GOOGLE_KEY_LS) || '';
        const ideogramKey = localStorage.getItem(IDEOGRAM_KEY_LS) || '';
        const revartKey = localStorage.getItem(REVART_KEY_LS) || '';

        setApiKeys({
            google: googleKey,
            ideogram: ideogramKey,
            revart: revartKey,
        });
    }, []);

    const saveApiKeys = useCallback((newKeys: ApiKeys) => {
        localStorage.setItem(GOOGLE_KEY_LS, newKeys.google);
        localStorage.setItem(IDEOGRAM_KEY_LS, newKeys.ideogram);
        localStorage.setItem(REVART_KEY_LS, newKeys.revart);
        setApiKeys(newKeys);
    }, []);

    return { apiKeys, saveApiKeys };
};