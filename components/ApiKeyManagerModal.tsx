/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { IconX, IconDeviceFloppy, IconAlertTriangle } from '@tabler/icons-react';
import { ApiKeys } from '../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';
import { GOOGLE_KEY_LS, IDEOGRAM_KEY_LS, REVART_KEY_LS, LANGUAGE_KEY_LS } from '../../lib/constants';

interface ApiKeyManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentKeys: ApiKeys;
    onSave: (newKeys: ApiKeys) => void;
    mode: 'public' | 'private';
}

const ApiKeyManagerModal: React.FC<ApiKeyManagerModalProps> = ({ isOpen, onClose, currentKeys, onSave, mode }) => {
    const { t } = useLanguage();
    const [googleKey, setGoogleKey] = useState('');
    
    useEffect(() => {
        if (isOpen) {
            setGoogleKey(currentKeys.google);
        }
    }, [isOpen, currentKeys]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        // Only saves the Google key, preserves others
        onSave({ ...currentKeys, google: googleKey });
        onClose();
    };

    const handleResetApp = () => {
        if (window.confirm(t('resetAppConfirm'))) {
            // Clear all known localStorage keys
            localStorage.removeItem(GOOGLE_KEY_LS);
            localStorage.removeItem(IDEOGRAM_KEY_LS);
            localStorage.removeItem(REVART_KEY_LS);
            localStorage.removeItem(LANGUAGE_KEY_LS);
            
            // Reload the page
            window.location.reload();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gradient-to-br from-orange-700 to-red-800 rounded-lg shadow-2xl w-full max-w-lg flex flex-col gap-6 p-8 relative text-white border border-orange-500/50"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-amber-400 z-10 transition-colors" aria-label={t('close')}>
                    <IconX size={24} />
                </button>

                <h2 className="text-2xl font-bold border-b border-orange-400/30 pb-3">{t('apiKeyModalTitle_user')}</h2>
                
                <p className="text-base text-orange-100">
                    {t('apiKeyModalDesc_user')}
                </p>

                <div className="flex flex-col gap-2">
                    <label htmlFor="google-key" className="font-semibold text-white">{t('googleGeminiApiKey')}</label>
                    <input 
                        id="google-key"
                        type="password" 
                        value={googleKey} 
                        onChange={e => setGoogleKey(e.target.value)}
                        placeholder={t('googleApiPlaceholder')}
                        className="bg-black/40 border border-red-500 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-orange-200/60"
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-center text-sm">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-bold underline text-amber-300 hover:text-white transition-colors">
                        {t('getApiKeyLink')}
                    </a>
                    <a href="https://accounts.google.com/signup" target="_blank" rel="noopener noreferrer" className="font-bold underline text-amber-300 hover:text-white transition-colors">
                        {t('createGoogleAccountLink')}
                    </a>
                </div>

                <p className="text-sm text-orange-200/80 italic mt-2">
                    {t('apiKeyModalSecurity')}
                </p>


                <div className={`flex items-center mt-4 ${mode === 'private' ? 'justify-between' : 'justify-end'}`}>
                    {mode === 'private' && (
                         <button onClick={handleResetApp} className="bg-red-800/50 hover:bg-red-700/70 text-red-200 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                            <IconAlertTriangle size={18} /> {t('resetApp')}
                        </button>
                    )}
                    <div className="flex gap-3">
                         <button onClick={onClose} className="bg-black/20 hover:bg-black/40 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            {t('cancel')}
                        </button>
                        <button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                            <IconDeviceFloppy size={20} /> {t('lockApiKeys')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyManagerModal;