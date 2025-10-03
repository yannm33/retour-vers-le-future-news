/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { HAIR_COLORS, EXPRESSIONS, ACCESSORIES, FRAMES, LUTS, DIRTS, GRAINS, FILM_STOCKS, ISO_SENSITIVITIES, ASPECT_RATIOS } from '../../lib/constants';
import type { Upscale } from '../../lib/constants';
import { ControlSection } from './shared/ControlSection';
import { StyledSelect } from './shared/StyledSelect';
import { StyledButton } from './shared/StyledButton';
import PhotoSettingsPanel from './PhotoSettingsPanel';
import { useLanguage } from '../../contexts/LanguageContext';


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
        dirt, setDirt,
        photoGrain, setPhotoGrain,
        filmBrand, setFilmBrand,
        iso, setIso,
        signature, setSignature,
        signatureOn, setSignatureOn,
        aspectRatio, setAspectRatio,
        timeTravelOn, setTimeTravelOn,
        year, setYear,
        subStyle,
    } = formState;

    const isColorSelectionDisabled = subStyle === 'nb_dramatique';

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
            
             <ControlSection title={t('timeTravel')}>
                <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="time-travel-toggle" className="font-semibold text-white cursor-pointer select-none">{t('enableTimeTravel')}</label>
                        <label htmlFor="time-travel-toggle" className="relative cursor-pointer">
                             <input
                                id="time-travel-toggle"
                                type="checkbox"
                                checked={timeTravelOn}
                                onChange={() => setTimeTravelOn(!timeTravelOn)}
                                className="sr-only peer" // Hide default checkbox
                            />
                            <div className="w-12 h-6 bg-neutral-700 rounded-full peer-checked:bg-amber-500 transition-colors duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white peer-checked:translate-x-6 transition-transform duration-300"></div>
                        </label>
                    </div>
                    <div className={`transition-opacity duration-300 ${timeTravelOn ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="year-slider" className="text-sm font-semibold text-neutral-400">{t('year')}</label>
                            <input
                                type="number"
                                value={year}
                                min={1418}
                                max={2030}
                                onChange={(e) => setYear(Math.max(1418, Math.min(2030, Number(e.target.value))))}
                                className="w-24 bg-neutral-800 border border-neutral-700 rounded-md p-1 text-white text-center font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <input
                            id="year-slider"
                            type="range"
                            min={1418}
                            max={2030}
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
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
                    <ControlSection title={t('dirt')}><StyledSelect value={dirt} onChange={e => setDirt(e.target.value)}>{DIRTS.map(d=><option key={d} value={d}>{d}</option>)}</StyledSelect></ControlSection>
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