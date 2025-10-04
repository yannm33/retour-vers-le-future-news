/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts an aspect ratio string (e.g., "16:9") into a corresponding Tailwind CSS class.
 * @param ratio The aspect ratio string.
 * @returns A string with the appropriate Tailwind aspect ratio class.
 */
export const getAspectRatioClass = (ratio: string): string => {
    const aspectClasses: { [key: string]: string } = {
        '1:1': 'aspect-square', '4:5': 'aspect-[4/5]', '3:4': 'aspect-[3/4]',
        '2:3': 'aspect-[2/3]', '10:16': 'aspect-[10/16]', '9:16': 'aspect-[9/16]',
        '1:2': 'aspect-[1/2]', '5:4': 'aspect-[5/4]', '4:3': 'aspect-[4/3]',
        '3:2': 'aspect-[3/2]', '16:10': 'aspect-[16/10]', '16:9': 'aspect-[16/9]',
        '2:1': 'aspect-[2/1]', '3:1': 'aspect-[3/1]'
    };
    return aspectClasses[ratio] || 'aspect-square';
};