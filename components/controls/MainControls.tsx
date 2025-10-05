
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { IconPhoto, IconCamera, IconLoader, IconPlus, IconMinus, IconBook2 } from '@tabler/icons-react';
import { ControlSection } from './shared/ControlSection';
import { StyledSelect } from './shared/StyledSelect';
import { STYLES_CONFIG } from '../../lib/styleConfig';
import type { SubStyle, SubStyleGroup } from '../../lib/styleConfig';
import { cn } from '../../lib/utils';
import SpeechToTextButton from './SpeechToTextButton';
import { useLanguage } from '../../contexts/LanguageContext';

const BlinkingCursor = () => (
    <span className="animate-pulse" style={{ animationDuration: '1s' }}>|</span>
);

const MainControls = ({ formState, handleImageUpload, fileInputRef, handleGenerateClick, isLoading, isGenerationDisabled, uploadedImage, availableSubStyles, onTakePhotoClick, onOpenPilotLibrary, isApiKeySet }) => {
    const { t, language } = useLanguage();
    const { 
        style, setStyle,
        subStyle, setSubStyle,
        customPrompt, setCustomPrompt,
        numberOfImages, setNumberOfImages,
        provider, setProvider,
    } = formState;
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');

     useEffect(() => {
        if (!isListening) {
            setInterimTranscript('');
        }
    }, [isListening]);

    const generateButtonTooltip = isApiKeySet
        ? (isGenerationDisabled && !isLoading ? t('generateTooltip') : t('generate'))
        : t('apiKeyMissingTooltip');

    const quantities = [1, 2, 3, 4, 5, 10, 20];
    
    const handleQuantityChange = (direction: 'increase' | 'decrease') => {
        const currentIndex = quantities.indexOf(numberOfImages);
        if (currentIndex === -1) { 
            setNumberOfImages(quantities[0]);
            return;
        }

        let newIndex;
        if (direction === 'increase') {
            newIndex = Math.min(currentIndex + 1, quantities.length - 1);
        } else {
            newIndex = Math.max(currentIndex - 1, 0);
        }
        setNumberOfImages(quantities[newIndex]);
    };
    
    const isGrouped = availableSubStyles.length > 0 && 'subStyles' in availableSubStyles[0];
    const displayedPrompt = customPrompt + interimTranscript;

    return (
        <div className="bg-black rounded-xl p-2 sm:p-4 flex flex-col gap-4 flex-grow">
            <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-3 gap-2 items-stretch">
                <div className="group bg-transparent rounded-xl border border-amber-500 text-amber-500 px-2 py-1 sm:p-2 transition-colors duration-300 flex flex-col items-center justify-center">
                    <span className="text-[10px] sm:text-xs font-bold uppercase select-none text-amber-500">{t('quantity')}</span>
                    <div className="flex items-center justify-center w-full gap-2 mt-1">
                        <span className="font-bold text-xl sm:text-3xl text-white select-none">{numberOfImages}</span>
                        <div className="flex flex-col">
                            <button 
                                onClick={() => handleQuantityChange('increase')}
                                className="p-0 rounded-full text-amber-500 hover:bg-amber-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Increase quantity"
                                disabled={numberOfImages === quantities[quantities.length - 1]}
                            >
                                <IconPlus size={18} />
                            </button>
                             <button 
                                onClick={() => handleQuantityChange('decrease')} 
                                className="p-0 rounded-full text-amber-500 hover:bg-amber-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Decrease quantity"
                                disabled={numberOfImages === quantities[0]}
                            >
                                <IconMinus size={18} />
                            </button>
                        </div>
                    </div>
                </div>
                
                <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />

                <div className="flex gap-1">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors text-center">
                        <IconPhoto size={20}/> 
                        <span className="text-[10px] leading-tight">{t('upload_photo_label')}</span>
                    </button>
                    <button onClick={onTakePhotoClick} className="flex-1 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors text-center">
                        <IconCamera size={20}/> 
                        <span className="text-[10px] leading-tight">{t('takePhoto')}</span>
                    </button>
                </div>

                <button 
                    onClick={() => !isGenerationDisabled && handleGenerateClick()}
                    title={generateButtonTooltip}
                    className={cn(
                        "font-bold p-2 rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all duration-150 border-b-4 text-center",
                        "w-20 aspect-square sm:w-auto sm:aspect-auto", // Mobile: square, Desktop: auto
                        "flex-col sm:flex-row", // Mobile: column, Desktop: row
                        "hover:shadow-lg hover:shadow-amber-400/50", // Glow effect is always active on hover
                        {
                            'bg-gradient-to-b from-amber-400 to-amber-500 text-black border-amber-700 hover:brightness-110 active:translate-y-1 active:border-b-0': !isGenerationDisabled,
                            'opacity-70 cursor-not-allowed bg-neutral-700 border-neutral-800 text-neutral-400 brightness-95': isGenerationDisabled
                        }
                    )}
                >
                {isLoading ? (
                    <>
                        <IconLoader size={20} className='animate-spin'/>
                        <span className="text-[10px] sm:text-xs uppercase">{t('generating')}</span>
                    </>
                ) : (
                    <span className="text-xs sm:text-base uppercase">{t('generate')}</span>
                )}
                </button>
            </div>

             <ControlSection title={t('provider')}>
                <StyledSelect value={provider} onChange={e => setProvider(e.target.value as any)}>
                    <option value="google">Google Gemini</option>
                    <option value="ideogram" disabled>Ideogram (bientôt)</option>
                    <option value="revart" disabled>RevArt (bientôt)</option>
                </StyledSelect>
            </ControlSection>

            <div className="grid grid-cols-2 gap-4">
                <ControlSection title={t('style')}>
                    <StyledSelect value={style} onChange={e => setStyle(e.target.value)} dropdownClassName="max-h-none">
                        {STYLES_CONFIG.map(s => <option key={s.key} value={s.key}>{t(`style_${s.key}`)}</option>)}
                    </StyledSelect>
                </ControlSection>
                <ControlSection title={t('substyle')}>
                     <div className="flex items-center gap-2">
                        <StyledSelect value={subStyle} onChange={e => setSubStyle(e.target.value)} disabled={availableSubStyles.length === 0} dropdownClassName="max-h-none">
                            <option value="">{t('chooseSubstyle')}</option>
                            {isGrouped ? (
                                (availableSubStyles as SubStyleGroup[]).map(group => (
                                    <optgroup key={group.nameKey} label={t(group.nameKey)}>
                                        {group.subStyles.map(sub => (
                                            <option key={sub.key} value={sub.key}>{sub.name || t(`substyle_${sub.key}`)}</option>
                                        ))}
                                    </optgroup>
                                ))
                            ) : (
                                (availableSubStyles as SubStyle[]).map(s => <option key={s.key} value={s.key}>{s.name || t(`substyle_${s.key}`)}</option>)
                            )}
                        </StyledSelect>
                         {style === 'pilote_de_chasse' && (
                             <button
                                onClick={onOpenPilotLibrary}
                                className="p-2 h-full bg-neutral-800 border border-neutral-700 text-amber-500 rounded-md hover:bg-neutral-700 hover:border-amber-500 transition-colors"
                                title="Ouvrir la librairie de scénarios"
                                aria-label="Ouvrir la librairie de scénarios"
                            >
                                <IconBook2 size={20} />
                            </button>
                        )}
                    </div>
                </ControlSection>
            </div>
            <ControlSection title={t('customPromptTitle')} className="flex flex-col flex-grow">
                <div className="relative w-full flex-grow h-full">
                    <textarea 
                        placeholder={t('customPromptPlaceholder')} 
                        value={displayedPrompt} 
                        onChange={e => {
                            if (!isListening) {
                                setCustomPrompt(e.target.value);
                            }
                        }}
                        className="bg-neutral-800 border border-neutral-700 rounded-md p-2 pr-12 text-white w-full h-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {isListening && <div className="absolute inset-0 p-2 pr-12 pointer-events-none text-white/50">{customPrompt}<span className="text-white">{interimTranscript}</span><BlinkingCursor/></div>}
                    <div className="absolute top-2 right-2">
                        <SpeechToTextButton 
                            isListening={isListening}
                            onListeningChange={setIsListening}
                            onInterimTranscript={setInterimTranscript}
                            onFinalTranscript={(transcript) => {
                                setCustomPrompt(prev => (prev ? prev.trim() + ' ' : '') + transcript);
                            }}
                            targetLang={language === 'en' ? 'en-US' : 'fr-FR'}
                        />
                    </div>
                </div>
            </ControlSection>
        </div>
    );
};

export default MainControls;