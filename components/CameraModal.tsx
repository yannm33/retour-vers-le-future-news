/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IconX, IconCameraRotate, IconRefresh, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

interface CameraModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCapture: (dataUrl: string) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
    const { t } = useLanguage();
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const stopStream = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    const startStream = useCallback(async (mode: 'user' | 'environment') => {
        stopStream();
        setError(null);
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: mode }
            });
            setStream(newStream);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            if (err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
                setError(t('cameraPermissionDenied'));
            } else if (err instanceof DOMException && err.name === 'NotFoundError') {
                setError(t('cameraNotFound'));
            } else {
                setError(t('cameraGenericError'));
            }
        }
    }, [stopStream, t]);

    useEffect(() => {
        if (isOpen) {
            startStream(facingMode);
        } else {
            stopStream();
            setCapturedImage(null);
            setError(null);
        }
    }, [isOpen, startStream, stopStream, facingMode]);

    const handleSwitchCamera = () => {
        const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
        setFacingMode(newFacingMode);
        startStream(newFacingMode);
    };

    const handleTakePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/jpeg');
                setCapturedImage(dataUrl);
                stopStream();
            }
        }
    };
    
    const handleRetake = () => {
        setCapturedImage(null);
        startStream(facingMode);
    };

    const handleUsePhoto = () => {
        if (capturedImage) {
            onCapture(capturedImage);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white" role="dialog" aria-modal="true">
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/50">
                 <button onClick={onClose} aria-label={t('close')} className="p-2 bg-black/50 rounded-full hover:bg-black/75">
                    <IconX size={24} />
                </button>
                {!capturedImage && (
                    <button onClick={handleSwitchCamera} aria-label="Switch Camera" className="p-2 bg-black/50 rounded-full hover:bg-black/75">
                        <IconCameraRotate size={24} />
                    </button>
                )}
            </div>

            <div className="w-full h-full flex items-center justify-center">
                {error ? (
                    <div className="text-center p-8 flex flex-col items-center gap-4">
                        <IconAlertCircle size={48} className="text-red-500"/>
                        <p className="max-w-sm">{error}</p>
                    </div>
                ) : (
                    <>
                        <video ref={videoRef} autoPlay playsInline className={cn("w-full h-full object-contain", capturedImage ? "hidden" : "block")} />
                        <canvas ref={canvasRef} className="hidden" />
                        {capturedImage && (
                            <img src={capturedImage} alt="Captured preview" className="w-full h-full object-contain" />
                        )}
                    </>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-center z-20 bg-gradient-to-t from-black/50">
                {!error && (
                    !capturedImage ? (
                        <button onClick={handleTakePhoto} aria-label="Take Photo" className="w-20 h-20 rounded-full border-4 border-white bg-white/30 hover:bg-white/50 transition-colors"></button>
                    ) : (
                        <div className="flex w-full justify-around items-center">
                            <button onClick={handleRetake} className="flex items-center gap-2 text-lg font-semibold py-3 px-6 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                                <IconRefresh size={24} /> {t('retakePhoto')}
                            </button>
                             <button onClick={handleUsePhoto} className="flex items-center gap-2 text-lg font-semibold py-3 px-6 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-colors">
                                <IconCheck size={24} /> {t('usePhoto')}
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default CameraModal;