/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useRef } from 'react';
import { IconMicrophone, IconMicrophoneOff } from '@tabler/icons-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../contexts/LanguageContext';

const SpeechRecognitionApi = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

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
    onFinalTranscript: (transcript: string) => void;
    onInterimTranscript: (transcript: string) => void;
    onListeningChange: (isListening: boolean) => void;
    isListening: boolean;
    targetLang?: string;
}

const SpeechToTextButton: React.FC<SpeechToTextButtonProps> = ({ onFinalTranscript, onInterimTranscript, onListeningChange, isListening, targetLang = 'fr-FR' }) => {
    const { t } = useLanguage();
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (!SpeechRecognitionApi) {
            console.warn('Speech Recognition API not supported in this browser.');
            return;
        }

        if (!isListening) {
            return;
        }

        const recognition: SpeechRecognition = new SpeechRecognitionApi();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = targetLang;

        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            onInterimTranscript(interimTranscript);
            if (finalTranscript) {
                onFinalTranscript(finalTranscript.trim());
            }
        };

        recognition.onerror = (event) => {
            if (event.error === 'aborted') {
                return;
            }
            console.error('Speech recognition error:', event.error);
            onListeningChange(false);
        };

        recognition.onend = () => {
            // Clear any lingering interim transcript when the service stops for any reason
            onInterimTranscript(''); 
            if (recognitionRef.current) { // Check if we are supposed to be listening
                 try {
                    recognition.start();
                } catch (e) {
                    console.error("Error auto-restarting speech recognition:", e);
                    onListeningChange(false);
                }
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error("Error starting speech recognition:", e);
            onListeningChange(false);
        }

        return () => {
            if (recognition) {
                recognition.onend = null; // Prevent restart on manual stop
                recognition.stop();
                recognitionRef.current = null;
            }
        };
    }, [isListening, targetLang, onFinalTranscript, onInterimTranscript, onListeningChange]);

    const handleToggleListening = () => {
        onListeningChange(!isListening);
    };

    if (!SpeechRecognitionApi) {
        return null;
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