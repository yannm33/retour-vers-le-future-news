
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState, useEffect } from 'react';
import type { ColorMode, Upscale, RenderQuality } from '../lib/constants';

export const useGenerationForm = () => {
    const [numberOfImages, setNumberOfImages] = useState(5);
    const [style, setStyle] = useState('Portrait Glamour');
    const [subStyle, setSubStyle] = useState('');
    const [customPrompt, setCustomPrompt] = useState('');
    const [colorMode, setColorMode] = useState<ColorMode>('Couleur');
    const [upscale, setUpscale] = useState<Upscale>('8K');
    const [focale, setFocale] = useState<number | 'Auto'>('Auto');
    const [ouverture, setOuverture] = useState<number | 'Auto'>('Auto');
    const [vitesse, setVitesse] = useState<number | 'Auto'>('Auto');
    const [hairColor, setHairColor] = useState('Noir Profond');
    const [expression, setExpression] = useState('Neutre');
    const [accessories, setAccessories] = useState('Aucun');
    const [framing, setFraming] = useState('Plan pied');
    const [lutsCinema, setLutsCinema] = useState('Aucun');
    const [dirt, setDirt] = useState('Aucune');
    const [photoGrain, setPhotoGrain] = useState('Aucun');
    const [sweat, setSweat] = useState(false);
    const [speedEffect, setSpeedEffect] = useState(false);
    const [signature, setSignature] = useState('@PIXELSHOOT');
    const [signatureOn, setSignatureOn] = useState(true);
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [renderQuality, setRenderQuality] = useState<RenderQuality>('UHD (RÉALISME)');

    useEffect(() => {
        setSubStyle('');
    }, [style]);

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
        sweat, setSweat,
        speedEffect, setSpeedEffect,
        signature, setSignature,
        signatureOn, setSignatureOn,
        aspectRatio, setAspectRatio,
        renderQuality, setRenderQuality,
    };
};