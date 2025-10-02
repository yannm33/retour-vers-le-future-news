/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { IconCamera, IconLoader } from '@tabler/icons-react';
import { ControlSection } from './shared/ControlSection';
import { StyledSelect } from './shared/StyledSelect';
import { STYLES_CONFIG } from '../../lib/styleConfig';

const MainControls = ({ formState, T, handleImageUpload, fileInputRef, handleGenerateClick, isLoading, uploadedImage, availableSubStyles }) => {
    const { 
        style, setStyle,
        subStyle, setSubStyle,
        customPrompt, setCustomPrompt,
        numberOfImages, setNumberOfImages,
    } = formState;
    
    return (
        <div className="bg-black rounded-xl p-4 flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                    <select value={numberOfImages} onChange={e => setNumberOfImages(Number(e.target.value))} className="bg-amber-500 text-black font-bold border border-amber-600 rounded-xl px-3 py-2 pr-8 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 h-full text-center cursor-pointer">
                        {[1, 5, 10, 20].map(n => <option className="bg-neutral-800 text-white font-bold" key={n} value={n}>{n}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                <button onClick={() => fileInputRef.current?.click()} className="bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold py-2 px-3 rounded-xl h-full flex items-center justify-center gap-2 transition-colors">
                    <IconCamera size={20}/> {T.loadPortrait}
                </button>
                <button 
                    onClick={handleGenerateClick}
                    disabled={!uploadedImage || isLoading}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-xl h-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
                >
                {isLoading ? (
                    <>
                        <IconLoader size={20} className='animate-spin'/>
                        {T.generating}
                    </>
                ) : (
                    T.generate
                )}
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <ControlSection title={T.style}>
                    <StyledSelect value={style} onChange={e => setStyle(e.target.value)}>
                        {STYLES_CONFIG.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </StyledSelect>
                </ControlSection>
                <ControlSection title={T.substyle}>
                    <StyledSelect value={subStyle} onChange={e => setSubStyle(e.target.value)} disabled={!availableSubStyles || availableSubStyles.length === 0}>
                        <option value="">{T.chooseSubstyle}</option>
                        {availableSubStyles && availableSubStyles.map(s => <option key={s.key} value={s.key}>{s.name}</option>)}
                    </StyledSelect>
                </ControlSection>
            </div>
            <ControlSection title={T.customPromptTitle}>
                <textarea placeholder={T.customPromptPlaceholder} value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} rows={4} className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"/>
            </ControlSection>
        </div>
    );
};

export default MainControls;