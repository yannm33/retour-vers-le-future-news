/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { ApiKeys } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface ApiKeyManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentKeys: ApiKeys;
    onSave: (newKeys: ApiKeys) => void;
}

const ApiKeyManagerModal: React.FC<ApiKeyManagerModalProps> = ({ isOpen, onClose, currentKeys, onSave }) => {
    const { t } = useLanguage();
    const [googleKey, setGoogleKey] = useState('');
    const [ideogramKey, setIdeogramKey] = useState('');
    const [revartKey, setRevartKey] = useState('');

    useEffect(() => {
        if (isOpen) {
            setGoogleKey(currentKeys.google);
            setIdeogramKey(currentKeys.ideogram);
            setRevartKey(currentKeys.revart);
        }
    }, [isOpen, currentKeys]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        onSave({ google: googleKey, ideogram: ideogramKey, revart: revartKey });
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-neutral-900 rounded-lg shadow-2xl w-full max-w-lg flex flex-col gap-4 p-6 relative text-white"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-amber-500 z-10" aria-label={t('close')}>
                    <IconX size={24} />
                </button>

                <h2 className="text-2xl font-bold border-b border-neutral-700 pb-3">{t('apiKeyManagerTitle')}</h2>
                
                <p className="text-sm text-neutral-400">
                    {t('apiKeyManagerDesc')}
                </p>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="google-key" className="font-semibold text-neutral-300">{t('googleGeminiApiKey')}</label>
                        <input 
                            id="google-key"
                            type="password" 
                            value={googleKey} 
                            onChange={e => setGoogleKey(e.target.value)}
                            placeholder={t('googleApiPlaceholder')}
                            className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-white font-bold underline self-end hover:text-amber-400 transition-colors">
                            {t('getApiKeyLink')}
                        </a>
                    </div>
                     <div className="flex flex-col gap-2">
                        <label htmlFor="ideogram-key" className="font-semibold text-neutral-300">{t('ideogramApiKey')}</label>
                        <input 
                            id="ideogram-key"
                            type="password" 
                            value={ideogramKey} 
                            onChange={e => setIdeogramKey(e.target.value)}
                            placeholder={t('ideogramApiPlaceholder')}
                            className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                     <div className="flex flex-col gap-2">
                        <label htmlFor="revart-key" className="font-semibold text-neutral-300">{t('revArtApiKey')}</label>
                        <input 
                            id="revart-key"
                            type="password" 
                            value={revartKey} 
                            onChange={e => setRevartKey(e.target.value)}
                            placeholder={t('revArtApiPlaceholder')}
                            className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>


                <div className="flex justify-end gap-3 mt-4">
                     <button onClick={onClose} className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded-lg">
                        {t('cancel')}
                    </button>
                    <button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                        <IconDeviceFloppy size={20} /> {t('lockApiKeys')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyManagerModal;