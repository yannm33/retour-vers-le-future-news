
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { HAIR_COLORS, EXPRESSIONS, ACCESSORIES, FRAMES, LUTS, DIRTS, GRAINS, ASPECT_RATIOS } from '../../lib/constants';
import type { Upscale } from '../../lib/constants';
import { ControlSection } from './shared/ControlSection';
import { StyledSelect } from './shared/StyledSelect';
import { StyledButton } from './shared/StyledButton';
import { FunctionalDial } from './shared/FunctionalDial';


const SettingsPanel = ({ formState, T }) => {
    const {
        renderQuality, setRenderQuality,
        colorMode, setColorMode,
        upscale, setUpscale,
        focale, setFocale,
        ouverture, setOuverture,
        vitesse, setVitesse,
        hairColor, setHairColor,
        expression, setExpression,
        accessories, setAccessories,
        framing, setFraming,
        lutsCinema, setLutsCinema,
        dirt, setDirt,
        photoGrain, setPhotoGrain,
        sweat, setSweat,
        speedEffect, setSpeedEffect,
        signature, setSignature,
        signatureOn, setSignatureOn,
        aspectRatio, setAspectRatio
    } = formState;

    return (
        <div className="lg:col-span-1 bg-black p-4 rounded-lg flex flex-col gap-4">
            <ControlSection title={T.renderQuality}>
                <div className="grid grid-cols-3 gap-2">
                    <StyledButton onClick={() => setRenderQuality('Preview (Fast)')} active={renderQuality === 'Preview (Fast)'}>{T.preview}</StyledButton>
                    <StyledButton onClick={() => setRenderQuality('HD (Quality)')} active={renderQuality === 'HD (Quality)'}>{T.hd}</StyledButton>
                    <StyledButton onClick={() => setRenderQuality('UHD (Realism)')} active={renderQuality === 'UHD (Realism)'}>{T.uhd}</StyledButton>
                </div>
            </ControlSection>

            <div className='grid grid-cols-1 gap-4'>
                <ControlSection title=''>
                    <div className="flex gap-2">
                        <StyledButton onClick={() => setColorMode('Color')} active={colorMode === 'Color'}>{T.color}</StyledButton>
                        <StyledButton onClick={() => setColorMode('B&W')} active={colorMode === 'B&W'}>{T.bw}</StyledButton>
                    </div>
                </ControlSection>
            </div>
            
            <ControlSection title={T.upscale}>
                <div className="grid grid-cols-4 gap-2">
                    {(['Standard', '4K', '6K', '8K'] as Upscale[]).map(u => <StyledButton key={u} onClick={() => setUpscale(u)} active={upscale === u}>{u}</StyledButton>)}
                </div>
            </ControlSection>
            
            <ControlSection title={T.photoSettings}>
                <div className="bg-neutral-900 p-4 rounded-lg grid grid-cols-3 gap-2 justify-items-center">
                    <FunctionalDial label={T.focal} value={focale} setValue={setFocale} min={18} max={200} step={1} defaultValue={50} />
                    <FunctionalDial label={T.aperture} value={ouverture} setValue={setOuverture} min={1.2} max={22} step={0.1} defaultValue={2.8} />
                    <FunctionalDial label={T.speed} value={vitesse} setValue={setVitesse} min={1} max={4000} step={10} defaultValue={125} />
                </div>
            </ControlSection>
            
            <div className='grid grid-cols-2 gap-4'>
               <ControlSection title={T.hairColor}><StyledSelect value={hairColor} onChange={e => setHairColor(e.target.value)}>{HAIR_COLORS.map(c=><option key={c} value={c}>{c}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={T.expression}><StyledSelect value={expression} onChange={e => setExpression(e.target.value)}>{EXPRESSIONS.map(e=><option key={e} value={e}>{e}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={T.glasses}><StyledSelect value={accessories} onChange={e => setAccessories(e.target.value)}>{ACCESSORIES.map(g=><option key={g} value={g}>{g}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={T.framing}><StyledSelect value={framing} onChange={e => setFraming(e.target.value)}>{FRAMES.map(f=><option key={f} value={f}>{f}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={T.luts}><StyledSelect value={lutsCinema} onChange={e => setLutsCinema(e.target.value)}>{LUTS.map(l=><option key={l} value={l}>{l}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={T.dirt}><StyledSelect value={dirt} onChange={e => setDirt(e.target.value)}>{DIRTS.map(d=><option key={d} value={d}>{d}</option>)}</StyledSelect></ControlSection>
               <ControlSection title={T.grain}><StyledSelect value={photoGrain} onChange={e => setPhotoGrain(e.target.value)}>{GRAINS.map(g=><option key={g} value={g}>{g}</option>)}</StyledSelect></ControlSection>
               <div className="flex flex-col justify-center items-start gap-2 pt-5">
                 <label className="flex items-center gap-2 text-white cursor-pointer"><input type="checkbox" checked={sweat} onChange={e => setSweat(e.target.checked)} className="form-checkbox bg-neutral-700 border-neutral-600 text-amber-500 h-4 w-4 rounded focus:ring-amber-500" /> {T.sweat}</label>
                 <label className="flex items-center gap-2 text-white cursor-pointer"><input type="checkbox" checked={speedEffect} onChange={e => setSpeedEffect(e.target.checked)} className="form-checkbox bg-neutral-700 border-neutral-600 text-amber-500 h-4 w-4 rounded focus:ring-amber-500" /> {T.speedEffect}</label>
               </div>
            </div>

            <ControlSection title={T.signature}>
                <div className="flex gap-2">
                    <input type="text" value={signature} onChange={e => setSignature(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                    <button onClick={() => setSignatureOn(!signatureOn)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors w-48 ${signatureOn ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'}`}>
                        {signatureOn ? T.lockedOn : T.off}
                    </button>
                </div>
            </ControlSection>

            <ControlSection title={T.formatSize}>
                {Object.entries(ASPECT_RATIOS).map(([group, ratios]) => (
                    <div key={group}>
                        <h4 className="text-xs text-neutral-400 uppercase font-bold mb-2">{T[group.toLowerCase() as keyof typeof T]}</h4>
                        <div className="grid grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {ratios.map(ratio => <StyledButton key={ratio} onClick={() => setAspectRatio(ratio)} active={aspectRatio === ratio}>{ratio}</StyledButton>)}
                        </div>
                    </div>
                ))}
            </ControlSection>
        </div>
    );
};

export default SettingsPanel;
