/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ControlSection } from './shared/ControlSection';
import { RoundCameraDial } from './shared/RoundCameraDial';
import { SHUTTER_SPEEDS, APERTURES, FOCAL_LENGTHS } from '../../lib/constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

// --- Mobile-Specific Slider Component ---
const MobilePhotoSlider: React.FC<{
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    values: readonly string[];
    label: string;
}> = ({ value, setValue, values, label }) => {
    const isAuto = value === 'Auto';
    const currentIndex = isAuto ? -1 : values.indexOf(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newIndex = parseInt(e.target.value, 10);
        if (newIndex >= 0 && newIndex < values.length) {
            setValue(values[newIndex]);
        }
    };

    const handleToggleAuto = () => {
        // If it's auto, switch to a default manual value (middle of the range).
        // If it's manual, switch back to auto.
        setValue(isAuto ? values[Math.floor(values.length / 2)] : 'Auto');
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-neutral-400 uppercase">{label}</span>
                <button 
                    onClick={handleToggleAuto}
                    className={cn(
                        "font-mono font-bold px-3 py-1 rounded transition-colors text-base",
                         isAuto 
                            ? "text-amber-500" 
                            : "text-white bg-neutral-800 hover:bg-neutral-700"
                    )}
                    title={isAuto ? "Passer en mode manuel" : "Passer en mode Auto"}
                >
                    {value}
                </button>
            </div>
            <input
                type="range"
                min={0}
                max={values.length - 1}
                step={1}
                // Use a valid index for the value, or a default (e.g., 0) if auto
                value={currentIndex > -1 ? currentIndex : 0}
                onChange={handleChange}
                disabled={isAuto}
                className={cn(
                    "w-full h-2 bg-neutral-700 rounded-lg appearance-none",
                    isAuto ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                    // Webkit styles
                    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500",
                    "disabled:[&::-webkit-slider-thumb]:bg-neutral-600",
                    // Firefox styles
                    "[&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-amber-500",
                    "disabled:[&::-moz-range-thumb]:bg-neutral-600"
                )}
            />
        </div>
    );
};


const PhotoSettingsPanel = ({ formState }) => {
    const { t } = useLanguage();
    const {
        focale, setFocale,
        ouverture, setOuverture,
        vitesse, setVitesse,
    } = formState;

    return (
        <ControlSection title={t('photoSettings')}>
            {/* Desktop: Circular Dials (hidden on screens smaller than lg) */}
            <div className="hidden lg:block">
                <div className="bg-neutral-900 p-4 rounded-lg grid grid-cols-3 gap-2 justify-items-center">
                    <RoundCameraDial value={focale} setValue={setFocale} values={FOCAL_LENGTHS} />
                    <RoundCameraDial value={ouverture} setValue={setOuverture} values={APERTURES} />
                    <RoundCameraDial value={vitesse} setValue={setVitesse} values={SHUTTER_SPEEDS} />
                </div>
                <p className="text-xs text-white mt-3 text-center">
                    {t('photo_settings_scroll_instruction')}
                </p>
            </div>


            {/* Mobile: Horizontal Sliders (only visible on screens smaller than lg) */}
            <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-6 lg:hidden">
                 <MobilePhotoSlider label={t('focal')} value={focale} setValue={setFocale} values={FOCAL_LENGTHS} />
                 <MobilePhotoSlider label={t('aperture')} value={ouverture} setValue={setOuverture} values={APERTURES} />
                 <MobilePhotoSlider label={t('speed')} value={vitesse} setValue={setVitesse} values={SHUTTER_SPEEDS} />
            </div>
        </ControlSection>
    );
};

export default PhotoSettingsPanel;