/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect } from 'react';
import type { ColorMode, Upscale, RenderQuality } from '../lib/constants';

export const useGenerationForm = () => {
    const [numberOfImages, setNumberOfImages] = useState(1);
    const [style, setStyle] = useState('photos'); // Use key instead of name
    const [subStyle, setSubStyle] = useState(''); // Use key instead of name
    const [customPrompt, setCustomPrompt] = useState('');
    const [provider, setProvider] = useState<'google' | 'ideogram' | 'revart'>('google');
    const [colorMode, setColorMode] = useState<ColorMode>('Couleur');
    const [upscale, setUpscale] = useState<Upscale>('8K');
    const [focale, setFocale] = useState('Auto');
    const [ouverture, setOuverture] = useState('Auto');
    const [vitesse, setVitesse] = useState('Auto');
    const [hairColor, setHairColor] = useState('Noir Profond');
    const [expression, setExpression] = useState('Neutre');
    const [glasses, setGlasses] = useState('Aucun');
    const [universalAccessory, setUniversalAccessory] = useState('');
    const [framing, setFraming] = useState('Plan pied');
    const [lutsCinema, setLutsCinema] = useState('none');
    const [effects, setEffects] = useState('Aucune');
    const [photographicEffect, setPhotographicEffect] = useState('');
    const [photoGrain, setPhotoGrain] = useState('Aucun');
    const [filmBrand, setFilmBrand] = useState('Aucune');
    const [iso, setIso] = useState('Auto');
    const [signature, setSignature] = useState('@PIXELSHOOT');
    const [signatureOn, setSignatureOn] = useState(true);
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [renderQuality, setRenderQuality] = useState<RenderQuality>('UHD (RÉALISME)');
    const [timeTravelOn, setTimeTravelOn] = useState(false);
    const [year, setYear] = useState(1985);

    useEffect(() => {
        setSubStyle('');
        setPhotographicEffect(''); // Reset effect when style changes
    }, [style]);

    useEffect(() => {
        setPhotographicEffect(''); // Reset effect when substyle changes
    }, [subStyle]);

    // Automatically set color mode for specific sub-styles
    useEffect(() => {
        if (subStyle === 'nb_dramatique') {
            setColorMode('N&B');
        }
    }, [subStyle]);

    return {
        numberOfImages, setNumberOfImages,
        style, setStyle,
        subStyle, setSubStyle,
        customPrompt, setCustomPrompt,
        provider, setProvider,
        colorMode, setColorMode,
        upscale, setUpscale,
        focale, setFocale,
        ouverture, setOuverture,
        vitesse, setVitesse,
        hairColor, setHairColor,
        expression, setExpression,
        glasses, setGlasses,
        universalAccessory, setUniversalAccessory,
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
        renderQuality, setRenderQuality,
        timeTravelOn, setTimeTravelOn,
        year, setYear,
    };
};

export type FormState = ReturnType<typeof useGenerationForm>;