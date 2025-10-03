/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useRef } from 'react';
import { IconMicrophone, IconMicrophoneOff } from '@tabler/icons-react';
import { cn } from '../../lib/utils';

const SpeechRecognitionApi = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

// Add a minimal type definition for the SpeechRecognition instance as it's a non-standard API.
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
}

interface SpeechToTextButtonProps {
    onTranscript: (transcript: string) => void;
    onListeningChange: (isListening: boolean) => void;
    isListening: boolean;
    targetLang?: string;
}

const SpeechToTextButton: React.FC<SpeechToTextButtonProps> = ({ onTranscript, onListeningChange, isListening, targetLang = 'fr-FR' }) => {
    // Use the defined SpeechRecognition interface for the ref type.
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (!SpeechRecognitionApi) {
            console.warn('Speech Recognition API not supported in this browser.');
            return;
        }

        // Instantiate using the renamed API constructor.
        const recognition: SpeechRecognition = new SpeechRecognitionApi();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = targetLang;

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                onTranscript(finalTranscript.trim());
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            onListeningChange(false);
        };

        recognition.onend = () => {
            onListeningChange(false);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [targetLang, onTranscript, onListeningChange]);

    const handleToggleListening = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
        } else {
            try {
                recognition.start();
            } catch (e) {
                console.error("Error starting speech recognition:", e);
                onListeningChange(false);
                return;
            }
        }
        onListeningChange(!isListening);
    };

    // Use the renamed API constructor for the check.
    if (!SpeechRecognitionApi) {
        return null; // Don't render if not supported
    }

    return (
        <button
            type="button"
            onClick={handleToggleListening}
            className={cn(
                'p-2 rounded-full transition-colors duration-200',
                isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-neutral-700 text-white hover:bg-neutral-600'
            )}
            title="Activer/Désactiver la saisie vocale"
        >
            {isListening ? <IconMicrophoneOff size={18} /> : <IconMicrophone size={18} />}
        </button>
    );
};

export default SpeechToTextButton;