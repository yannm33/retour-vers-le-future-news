/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { IconX, IconKey, IconDeviceFloppy } from '@tabler/icons-react';
import { useLanguage } from '../contexts/LanguageContext';

interface UserApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentKey: string;
    onSave: (key: string) => void;
}

const UserApiKeyModal: React.FC<UserApiKeyModalProps> = ({ isOpen, onClose, currentKey, onSave }) => {
    const { t } = useLanguage();
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        if (isOpen) {
            setApiKey(currentKey);
        }
    }, [isOpen, currentKey]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        onSave(apiKey);
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

                <div className="flex items-center gap-4">
                    <IconKey size={28} className="text-amber-500" />
                    <h2 className="text-2xl font-bold">{t('userApiKeyTitle')}</h2>
                </div>
                
                <p className="text-sm text-neutral-400" dangerouslySetInnerHTML={{ __html: t('userApiKeyDesc') }} />

                <div className="flex flex-col gap-2">
                    <label htmlFor="google-api-key" className="font-semibold text-neutral-300">{t('googleApiKey')}</label>
                    <input 
                        id="google-api-key"
                        type="password" 
                        value={apiKey} 
                        onChange={e => setApiKey(e.target.value)}
                        placeholder={t('googleApiPlaceholder')}
                        className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-white font-bold underline self-end hover:text-amber-400 transition-colors">
                        {t('getApiKeyLink')}
                    </a>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                     <button onClick={onClose} className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded-lg">
                        {t('cancel')}
                    </button>
                    <button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                        <IconDeviceFloppy size={20} /> {t('save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserApiKeyModal;