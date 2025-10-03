/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { IconX, IconLock } from '@tabler/icons-react';
import { ApiKeys } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface ApiKeyManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentKeys: ApiKeys;
    onSave: (newKeys: Partial<ApiKeys>) => void;
}

const ApiKeyManagerModal: React.FC<ApiKeyManagerModalProps> = ({ isOpen, onClose, currentKeys, onSave }) => {
    const { t } = useLanguage();
    const [geminiKey, setGeminiKey] = useState('');
    const [ideogramKey, setIdeogramKey] = useState('');
    const [revartKey, setRevartKey] = useState('');

    useEffect(() => {
        if (isOpen) {
            setGeminiKey(currentKeys.gemini);
            setIdeogramKey(currentKeys.ideogram);
            setRevartKey(currentKeys.revart);
        }
    }, [isOpen, currentKeys]);

    if (!isOpen) {
        return null;
    }

    const handleLock = (keyName: keyof ApiKeys, value: string) => {
        onSave({ [keyName]: value });
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

                <div className="flex flex-col gap-5">
                    {/* Gemini Key */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="gemini-key" className="font-semibold text-neutral-300">{t('googleApiKey')}</label>
                        <div className="flex gap-2">
                            <input 
                                id="gemini-key"
                                type="password" 
                                value={geminiKey} 
                                onChange={e => setGeminiKey(e.target.value)}
                                placeholder={t('googleApiPlaceholder')}
                                className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <button onClick={() => handleLock('gemini', geminiKey)} title={t('lock')} className="bg-amber-500 hover:bg-amber-600 text-black font-bold p-2.5 rounded-lg flex items-center justify-center">
                                <IconLock size={20} />
                            </button>
                        </div>
                    </div>
                    {/* Ideogram Key */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="ideogram-key" className="font-semibold text-neutral-300">{t('ideogramApiKey')}</label>
                        <div className="flex gap-2">
                            <input 
                                id="ideogram-key"
                                type="password" 
                                value={ideogramKey} 
                                onChange={e => setIdeogramKey(e.target.value)}
                                placeholder={t('ideogramApiPlaceholder')}
                                className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <button onClick={() => handleLock('ideogram', ideogramKey)} title={t('lock')} className="bg-amber-500 hover:bg-amber-600 text-black font-bold p-2.5 rounded-lg flex items-center justify-center">
                                <IconLock size={20} />
                            </button>
                        </div>
                    </div>
                    {/* RevArt Key */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="revart-key" className="font-semibold text-neutral-300">{t('revartApiKey')}</label>
                        <div className="flex gap-2">
                            <input 
                                id="revart-key"
                                type="password" 
                                value={revartKey} 
                                onChange={e => setRevartKey(e.target.value)}
                                placeholder={t('revartApiPlaceholder')}
                                className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                             <button onClick={() => handleLock('revart', revartKey)} title={t('lock')} className="bg-amber-500 hover:bg-amber-600 text-black font-bold p-2.5 rounded-lg flex items-center justify-center">
                                <IconLock size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                     <button onClick={onClose} className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded-lg">
                        {t('close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyManagerModal;
