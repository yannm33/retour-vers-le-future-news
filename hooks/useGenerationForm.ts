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
    const [colorMode, setColorMode] = useState<ColorMode>('Couleur');
    const [upscale, setUpscale] = useState<Upscale>('8K');
    const [focale, setFocale] = useState('Auto');
    const [ouverture, setOuverture] = useState('Auto');
    const [vitesse, setVitesse] = useState('Auto');
    const [hairColor, setHairColor] = useState('Noir Profond');
    const [expression, setExpression] = useState('Neutre');
    const [accessories, setAccessories] = useState('Aucun');
    const [framing, setFraming] = useState('Plan pied');
    const [lutsCinema, setLutsCinema] = useState('Aucun');
    const [dirt, setDirt] = useState('Aucune');
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
    }, [style]);

    // Automatically set color mode for specific sub-styles
    useEffect(() => {
        if (subStyle === 'nb_dramatique') {
            setColorMode('N&B');
        } else {
            setColorMode('Couleur');
        }
    }, [subStyle]);

    return {
        numberOfImages, setNumberOfImages,
        style, setStyle,
        subStyle, setSubStyle,
        customPrompt, setCustomPrompt,
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