/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { IconCamera, IconLoader, IconPlus, IconMinus } from '@tabler/icons-react';
import { ControlSection } from './shared/ControlSection';
import { StyledSelect } from './shared/StyledSelect';
import { STYLES_CONFIG } from '../../lib/styleConfig';
import type { SubStyle, SubStyleGroup } from '../../lib/styleConfig';
import { cn } from '../../lib/utils';
import SpeechToTextButton from './SpeechToTextButton';
import { useLanguage } from '../../contexts/LanguageContext';

const MainControls = ({ formState, handleImageUpload, fileInputRef, handleGenerateClick, isLoading, uploadedImage, availableSubStyles }) => {
    const { t, language } = useLanguage();
    const { 
        style, setStyle,
        subStyle, setSubStyle,
        customPrompt, setCustomPrompt,
        numberOfImages, setNumberOfImages,
        provider, setProvider,
    } = formState;
    const [isListening, setIsListening] = useState(false);

    const isGenerationDisabled = (!uploadedImage && !customPrompt.trim()) || isLoading;

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
        <div className="bg-black rounded-xl p-4 flex flex-col gap-4 flex-grow">
            <div className="grid grid-cols-3 gap-2">
                <div className="group col-span-1 bg-transparent rounded-xl border border-amber-500 text-amber-500 p-2 transition-colors duration-300 flex flex-col items-center justify-center h-full">
                    <span className="text-xs font-bold uppercase select-none text-amber-500">{t('quantity')}</span>
                    <div className="flex items-center justify-around w-full mt-1">
                        <button 
                            onClick={() => handleQuantityChange('decrease')} 
                            className="p-1 rounded-full text-amber-500 hover:bg-amber-500/20 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <IconMinus size={20} />
                        </button>
                        <span className="font-bold text-3xl text-white select-none mx-2">{numberOfImages}</span>
                        <button 
                            onClick={() => handleQuantityChange('increase')}
                            className="p-1 rounded-full text-amber-500 hover:bg-amber-500/20 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <IconPlus size={20} />
                        </button>
                    </div>
                </div>
                
                <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                <button onClick={() => fileInputRef.current?.click()} className="col-span-1 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold py-2 px-3 rounded-xl h-full flex flex-col items-center justify-center gap-1 transition-colors">
                    <IconCamera size={24}/> 
                    <span className="text-xs uppercase">{t('loadPortrait')}</span>
                </button>
                
                <button 
                    onClick={() => !isGenerationDisabled && handleGenerateClick()}
                    title={isGenerationDisabled && !isLoading ? t('generateTooltip') : t('generate')}
                    className={cn(
                        "col-span-1 font-bold py-2 px-3 rounded-xl h-full flex items-center justify-center gap-2 transition-all duration-150 border-b-4", // Base layout
                        "hover:shadow-lg hover:shadow-orange-400/50", // Glow effect is always active on hover
                        {
                            // Styles for ENABLED state
                            'bg-gradient-to-b from-orange-400 to-orange-500 text-white border-orange-700 hover:text-black hover:brightness-110 active:translate-y-1 active:border-b-0': !isGenerationDisabled,
                            
                            // Styles for DISABLED state
                            'opacity-70 cursor-not-allowed bg-orange-400 border-orange-500 text-black/70 brightness-95': isGenerationDisabled
                        }
                    )}
                >
                {isLoading ? (
                    <>
                        <IconLoader size={20} className='animate-spin'/>
                        <span className="text-xs uppercase">{t('generating')}</span>
                    </>
                ) : (
                    <span className="uppercase">{t('generate')}</span>
                )}
                </button>
            </div>

             <ControlSection title={t('provider')}>
                <StyledSelect value={provider} onChange={e => setProvider(e.target.value as any)}>
                    <option value="google">Google Gemini</option>
                    <option value="ideogram">Ideogram</option>
                    <option value="revart">RevArt</option>
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