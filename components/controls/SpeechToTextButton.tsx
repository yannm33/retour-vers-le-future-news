/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useRef } from 'react';
import { IconMicrophone, IconMicrophoneOff } from '@tabler/icons-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../contexts/LanguageContext';

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
    const { t } = useLanguage();
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // This effect synchronizes the speech recognition service with the `isListening` state.
    useEffect(() => {
        if (!SpeechRecognitionApi) {
            console.warn('Speech Recognition API not supported in this browser.');
            return;
        }

        // If the user is not supposed to be listening, do nothing.
        // The cleanup function from a previous run will handle stopping the service.
        if (!isListening) {
            return;
        }

        // Create and configure a new recognition instance.
        const recognition: SpeechRecognition = new SpeechRecognitionApi();
        recognitionRef.current = recognition;
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
            // The 'aborted' error is a non-fatal timeout. We ignore it, as the `onend`
            // handler will gracefully restart the service.
            if (event.error === 'aborted') {
                return;
            }
            // For all other errors, log it and stop listening.
            console.error('Speech recognition error:', event.error);
            onListeningChange(false);
        };

        recognition.onend = () => {
            // The service has stopped (e.g., due to a browser timeout).
            // As this effect is still active (isListening is true), we automatically
            // restart it to provide a continuous listening experience.
            try {
                recognition.start();
            } catch (e) {
                console.error("Error auto-restarting speech recognition:", e);
                onListeningChange(false); // If restart fails, stop.
            }
        };

        // Start the service.
        try {
            recognition.start();
        } catch (e) {
            console.error("Error starting speech recognition:", e);
            onListeningChange(false);
        }

        // This cleanup function is critical. It runs when the component unmounts OR
        // when `isListening` changes from true to false (i.e., the user clicks stop).
        return () => {
            // We must disable the onend handler *before* stopping. Otherwise, stop()
            // would trigger onend(), which would immediately restart the service,
            // preventing the service from ever stopping.
            recognition.onend = null;
            recognition.stop();
            recognitionRef.current = null;
        };
    // This dependency array ensures the effect runs only when the listening state or language changes.
    }, [isListening, targetLang, onTranscript, onListeningChange]);

    const handleToggleListening = () => {
        // The handler's only job is to toggle the state in the parent.
        // The useEffect hook will handle the rest of the logic.
        onListeningChange(!isListening);
    };

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
                    ? 'bg-orange-500 text-black animate-pulse'
                    : 'bg-orange-500/30 text-white hover:bg-red-600'
            )}
            title={t('speechToTextTitle')}
        >
            {isListening ? <IconMicrophoneOff size={18} /> : <IconMicrophone size={18} />}
        </button>
    );
};

export default SpeechToTextButton;
