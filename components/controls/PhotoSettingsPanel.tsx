/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ControlSection } from './shared/ControlSection';
import { RoundCameraDial } from './shared/RoundCameraDial';
import { SHUTTER_SPEEDS, APERTURES, FOCAL_LENGTHS } from '../../lib/constants';

const PhotoSettingsPanel = ({ formState, T }) => {
    const {
        focale, setFocale,
        ouverture, setOuverture,
        vitesse, setVitesse,
    } = formState;

    return (
        <ControlSection title={T.photoSettings}>
            <div className="bg-neutral-900 p-4 rounded-lg grid grid-cols-3 gap-2 justify-items-center">
                <RoundCameraDial value={focale} setValue={setFocale} values={FOCAL_LENGTHS} />
                <RoundCameraDial value={ouverture} setValue={setOuverture} values={APERTURES} />
                <RoundCameraDial value={vitesse} setValue={setVitesse} values={SHUTTER_SPEEDS} />
            </div>
        </ControlSection>
    );
};

export default PhotoSettingsPanel;