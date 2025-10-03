/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
// FIX: Import missing constants to resolve reference errors.
import { HAIR_COLORS, EXPRESSIONS, ACCESSORIES, FRAMES, LUTS, EFFECTS, GRAINS, FILM_STOCKS, ISO_SENSITIVITIES, ASPECT_RATIOS } from '../../lib/constants';
import { PHOTOGRAPHIC_EFFECTS_CONFIG } from '../../lib/effectsConfig';
import type { Upscale } from '../../lib/constants';
import { ControlSection } from './shared/ControlSection';
import { StyledSelect } from './shared/StyledSelect';
import { StyledButton } from './shared/StyledButton';
import PhotoSettingsPanel from './PhotoSettingsPanel';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';


const SettingsPanel = ({ formState, generationMode }) => {
    const { t } = useLanguage();
    const {
        renderQuality, setRenderQuality,
        colorMode, setColorMode,
        upscale, setUpscale,
        hairColor, setHairColor,
        expression, setExpression,
        accessories, setAccessories,
        framing, setFraming,
        lutsCinema, setLutsCinema,
        effects, setEffects,
        photographicEffect, setPhotographicEffect,
        photoGrain, setPhotoGrain,
        filmBrand, setFilmBrand,
        iso, setIso,
        signature, setSignature,
        signatureOn, setSignatureOn,
        aspectRatio, setAspectRatio,
        timeTravelOn, setTimeTravelOn,
        year, setYear,
        style,
        subStyle,
    } = formState;

    const isColorSelectionDisabled = subStyle === 'nb_dramatique';
    const availablePhotographicEffects = (style === 'photos' && subStyle && PHOTOGRAPHIC_EFFECTS_CONFIG[subStyle])
        ? PHOTOGRAPHIC_EFFECTS_CONFIG[subStyle]
        : [];
    
    const minYear = 1700;
    const maxYear = 2030;

    return (
        <div className="lg:col-span-1 bg-black p-4 rounded-lg flex flex-col gap-4">
            <ControlSection title={t('renderQuality')}>
                <div className="grid grid-cols-3 gap-2">
                    <StyledButton onClick={() => setRenderQuality('APERÇU (RAPIDE)')} active={renderQuality === 'APERÇU (RAPIDE)'}>{t('preview')}</StyledButton>
                    <StyledButton onClick={() => setRenderQuality('HD (QUALITÉ)')} active={renderQuality === 'HD (QUALITÉ)'}>{t('hd')}</StyledButton>
                    <StyledButton onClick={() => setRenderQuality('UHD (RÉALISME)')} active={renderQuality === 'UHD (RÉALISME)'}>{t('uhd')}</StyledButton>
                </div>
            </ControlSection>

            <div className='grid grid-cols-1 gap-4'>
                <ControlSection title=''>
                    <div className="flex gap-2">
                        <StyledButton onClick={() => setColorMode('Couleur')} active={colorMode === 'Couleur'} disabled={isColorSelectionDisabled}>{t('color')}</StyledButton>
                        <StyledButton onClick={() => setColorMode('N&B')} active={colorMode === 'N&B'} disabled={isColorSelectionDisabled}>{t('bw')}</StyledButton>
                    </div>
                </ControlSection>
            </div>
            
            <ControlSection title={t('upscale')}>
                <div className="grid grid-cols-4 gap-2">
                    {(['Standard', '4K', '6K', '8K'] as Upscale[]).map(u => <StyledButton key={u} onClick={() => setUpscale(u)} active={upscale === u}>{u}</StyledButton>)}
                </div>
            </ControlSection>
            
            {generationMode === 'image' && <PhotoSettingsPanel formState={formState} />}

            {availablePhotographicEffects.length > 0 && (
                <ControlSection title={t('photographicEffects')}>
                    <StyledSelect value={photographicEffect} onChange={e => setPhotographicEffect(e.target.value)}>
                        <option value="">{t('chooseEffect')}</option>
                        {availablePhotographicEffects.map(effect => (
                            <option key={effect.key} value={effect.key}>{t(effect.nameKey)}</option>
                        ))}
                    </StyledSelect>
                </ControlSection>
            )}
            
             <ControlSection title={t('timeTravel')}>
                <div className="bg-neutral-900 p-4 rounded-lg flex flex-col items-center gap-4">
                    <label className="font-semibold text-white select-none">{t('enableTimeTravel')}</label>
                    <div className="flex items-center justify-center gap-4">
                        {/* FIX: Use the specific 'timeTravel_close' translation key to avoid conflict with the general 'close' key. */}
                        <span className="text-xs font-semibold text-neutral-400 uppercase">{t('timeTravel_close')}</span>
                        <label htmlFor="time-travel-toggle" className="time-travel-switch">
                            <input
                                id="time-travel-toggle"
                                type="checkbox"
                                checked={timeTravelOn}
                                onChange={() => setTimeTravelOn(!timeTravelOn)}
                                className="time-travel-switch-checkbox"
                            />
                            <div className="time-travel-switch-slider">
                                <div className="time-travel-switch-thumb"></div>
                            </div>
                        </label>
                        <span className="text-xs font-semibold text-neutral-400 uppercase">{t('open')}</span>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className={cn(
                            "px-3 py-1 rounded text-center w-24 select-none transition-all duration-200 font-mono font-bold uppercase mx-auto mb-2",
                            timeTravelOn 
                                ? 'bg-amber-500 text-black shadow-amber-500/50 shadow-[0_0_15px_2px]' 
                                : 'bg-neutral-800 text-white'
                        )}>
                            {year}
                        </div>
                        <input
                            id="year-slider"
                            type="range"
                            min={minYear}
                            max={maxYear}
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="w-full appearance-none cursor-pointer year-slider"
                        />
                    </div>
                </div>
            </ControlSection>

            <div className='grid grid-cols-2 gap-4'>
               <ControlSection title={t('hairColor')}><StyledSelect value={hairColor} onChange={e => setHairColor(e.target.value)}>{HAIR_COLORS.map(c=><option key={c} value={c}>{c}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={t('expression')}><StyledSelect value={expression} onChange={e => setExpression(e.target.value)}>{EXPRESSIONS.map(e=><option key={e} value={e}>{e}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={t('glasses')}><StyledSelect value={accessories} onChange={e => setAccessories(e.target.value)}>{ACCESSORIES.map(g=><option key={g} value={g}>{g}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={t('framing')}><StyledSelect value={framing} onChange={e => setFraming(e.target.value)}>{FRAMES.map(f=><option key={f} value={f}>{f}</option>)}</StyledSelect></ControlSection>
            </div>
            
            {generationMode === 'image' && (
                <>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                        <ControlSection title={t('photoGrain')}><StyledSelect value={photoGrain} onChange={e => setPhotoGrain(e.target.value)}>{GRAINS.map(g=><option key={g} value={g}>{g}</option>)}</StyledSelect></ControlSection>
                        <ControlSection title={t('filmBrand')}><StyledSelect value={filmBrand} onChange={e => setFilmBrand(e.target.value)}>{FILM_STOCKS.map(f=><option key={f} value={f}>{f}</option>)}</StyledSelect></ControlSection>
                        <ControlSection title={t('iso')}><StyledSelect value={iso} onChange={e => setIso(e.target.value)}>{ISO_SENSITIVITIES.map(i=><option key={i} value={i}>{i}</option>)}</StyledSelect></ControlSection>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                    <ControlSection title={t('luts')}><StyledSelect value={lutsCinema} onChange={e => setLutsCinema(e.target.value)}>{LUTS.map(l=><option key={l} value={l}>{l}</option>)}</StyledSelect></ControlSection>
                    <ControlSection title={t('effects')}><StyledSelect value={effects} onChange={e => setEffects(e.target.value)}>{EFFECTS.map(d=><option key={d} value={d}>{d}</option>)}</StyledSelect></ControlSection>
                    </div>

                    <ControlSection title={t('signature')}>
                        <div className="flex gap-2">
                            <input type="text" value={signature} onChange={e => setSignature(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                            <button onClick={() => setSignatureOn(!signatureOn)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors w-48 ${signatureOn ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'}`}>
                                {signatureOn ? t('lockedOn') : t('off')}
                            </button>
                        </div>
                    </ControlSection>
                </>
            )}


            <ControlSection title={t('formatSize')}>
                {Object.entries(ASPECT_RATIOS).map(([group, ratios]) => (
                    <div key={group}>
                        <h4 className="text-xs text-neutral-400 uppercase font-bold mb-2">{t(group.toLowerCase())}</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {ratios.map(ratio => <StyledButton key={ratio} onClick={() => setAspectRatio(ratio)} active={aspectRatio === ratio}>{ratio}</StyledButton>)}
                        </div>
                    </div>
                ))}
            </ControlSection>
        </div>
    );
};

export default SettingsPanel;