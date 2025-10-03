/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

export const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }> = ({ children, active, className, ...props }) => (
    <button {...props} className={`px-3 py-2 rounded-md text-xs font-bold transition-all duration-200 w-full disabled:opacity-50 ${active ? 'bg-amber-500 text-black shadow-amber-500/30 shadow-[0_0_15px_2px]' : 'bg-neutral-800 text-white hover:bg-neutral-700 hover:shadow-amber-500/30 hover:shadow-[0_0_10px_1px]'} ${className}`}>
        {children}
    </button>
);