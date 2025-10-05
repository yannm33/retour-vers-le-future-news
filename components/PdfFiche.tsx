/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface PdfFicheProps {
    id: string;
    title: string;
    imageUrl: string;
    prompt: string;
}

const PdfFiche: React.FC<PdfFicheProps> = ({ id, title, imageUrl }) => {
    // This component serves as a template for a single A4 page in the PDF.
    // It is designed to display the generated image at the maximum possible size,
    // filling the page while maintaining its aspect ratio.
    // The surrounding text and prompt have been removed as per user request.
    return (
        <div
            id={id}
            className="bg-white flex items-center justify-center" // Center the image on the page
            style={{ width: '826px', height: '1169px' }} // Fixed A4-like dimensions for consistent canvas capture
        >
            <img
                src={imageUrl}
                alt={title}
                className="max-w-full max-h-full object-contain" // Ensures image fits page without distortion
            />
        </div>
    );
};

export default PdfFiche;