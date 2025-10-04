/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { IconPhoto, IconCamera, IconLoader, IconPlus, IconMinus } from '@tabler/icons-react';
import { ControlSection } from './shared/ControlSection';
import { StyledSelect } from './shared/StyledSelect';
import { STYLES_CONFIG } from '../../lib/styleConfig';
import type { SubStyle, SubStyleGroup } from '../../lib/styleConfig';
import { cn } from '../../lib/utils';
import SpeechToTextButton from './SpeechToTextButton';
import { useLanguage } from '../../contexts/LanguageContext';

const MainControls = ({ formState, handleImageUpload, fileInputRef, handleGenerateClick, isLoading, uploadedImage, availableSubStyles, onTakePhotoClick, isApiKeySet }) => {
    const { t, language } = useLanguage();
    const { 
        style, setStyle,
        subStyle, setSubStyle,
        customPrompt, setCustomPrompt,
        numberOfImages, setNumberOfImages,
        provider, setProvider,
    } = formState;
    const [isListening, setIsListening] = useState(false);

    const isGenerationDisabled = (!uploadedImage && !customPrompt.trim()) || isLoading || !isApiKeySet;
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
            newIndex = (currentIndex + 1) % quantities.length;
        } else {
            newIndex = (currentIndex - 1 + quantities.length) % quantities.length;
        }
        setNumberOfImages(quantities[newIndex]);
    };
    
    const isGrouped = availableSubStyles.length > 0 && 'subStyles' in availableSubStyles[0];

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
                                className="p-0 rounded-full text-amber-500 hover:bg-amber-500/20 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <IconPlus size={18} />
                            </button>
                             <button 
                                onClick={() => handleQuantityChange('decrease')} 
                                className="p-0 rounded-full text-amber-500 hover:bg-amber-500/20 transition-colors"
                                aria-label="Decrease quantity"
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
                        "hover:shadow-lg hover:shadow-orange-400/50", // Glow effect is always active on hover
                        {
                            'bg-gradient-to-b from-orange-400 to-orange-500 text-white border-orange-700 hover:text-black hover:brightness-110 active:translate-y-1 active:border-b-0': !isGenerationDisabled,
                            'opacity-70 cursor-not-allowed bg-orange-400 border-orange-500 text-black/70 brightness-95': isGenerationDisabled
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
                    <StyledSelect value={style} onChange={e => setStyle(e.target.value)}>
                        {STYLES_CONFIG.map(s => <option key={s.key} value={s.key}>{t(`style_${s.key}`)}</option>)}
                    </StyledSelect>
                </ControlSection>
                <ControlSection title={t('substyle')}>
                    <StyledSelect value={subStyle} onChange={e => setSubStyle(e.target.value)} disabled={availableSubStyles.length === 0}>
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
                </ControlSection>
            </div>
            <ControlSection title={t('customPromptTitle')} className="flex flex-col flex-grow">
                <div className="relative w-full flex-grow h-full">
                    <textarea 
                        placeholder={t('customPromptPlaceholder')} 
                        value={customPrompt} 
                        onChange={e => setCustomPrompt(e.target.value)} 
                        className="bg-neutral-800 border border-neutral-700 rounded-md p-2 pr-12 text-white w-full h-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="absolute top-2 right-2">
                        <SpeechToTextButton 
                            isListening={isListening}
                            onListeningChange={setIsListening}
                            onTranscript={(transcript) => {
                                setCustomPrompt(prev => (prev ? prev + ' ' : '') + transcript);
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