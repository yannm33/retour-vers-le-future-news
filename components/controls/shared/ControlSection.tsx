/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

export const ControlSection: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">{title}</label>
        {children}
    </div>
);
