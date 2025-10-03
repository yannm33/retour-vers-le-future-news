/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="w-full px-4 py-5 mt-8 text-xs bg-white/40 backdrop-blur-md border-t border-white/40 shadow-lg">
            <p className='text-center text-black font-open-sans font-medium text-[11px] tracking-normal'>{t('footer_text')}</p>
        </footer>
    );
};

export default Footer;