/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import PilotLibrary from './PilotLibrary';
import { IconX } from '@tabler/icons-react';

interface PilotLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PilotLibraryModal: React.FC<PilotLibraryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pilot-library-title"
    >
      <div 
        className="bg-neutral-900 border border-amber-500/50 rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-neutral-700 flex-shrink-0">
           <h2 id="pilot-library-title" className="text-xl font-bold text-amber-500">Librairie de Scénarios : Pilote de Chasse</h2>
           <button onClick={onClose} className="text-white hover:text-amber-400" aria-label="Fermer">
             <IconX size={24} />
           </button>
        </header>
        <div className="flex-grow p-4 overflow-y-hidden">
            <PilotLibrary />
        </div>
      </div>
    </div>
  );
};

export default PilotLibraryModal;
