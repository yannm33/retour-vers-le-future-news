/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { IconLoader, IconAlertTriangle, IconDownload } from '@tabler/icons-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { GeneratedVideo } from '../pages/Editor';

interface VideoResultProps {
    generatedVideos: GeneratedVideo[];
}

const LoadingIndicator: React.FC<{ progressMessage?: string }> = ({ progressMessage }) => {
    const { t } = useLanguage();
    return (
        <div className="text-center text-white flex flex-col items-center justify-center gap-4 p-4">
            <IconLoader size={48} className="animate-spin text-amber-500" />
            <p className="font-semibold text-lg">{t('videoGenerationTitle')}</p>
            <p className="text-neutral-400 text-sm h-4">{progressMessage || '...'}</p>
        </div>
    );
};

const VideoResult: React.FC<VideoResultProps> = ({ generatedVideos }) => {
    const { t } = useLanguage();

    if (generatedVideos.length === 0) {
        return null;
    }

    const handleDownloadVideo = (url: string, id: number) => {
        if (!url) return;
        const link = document.createElement('a');
        link.href = url;
        link.download = `retour-vers-le-futur-video-${id + 1}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                {generatedVideos.map(video => (
                    <div key={video.id} className="aspect-video bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 relative group flex items-center justify-center overflow-hidden">
                        {video.status === 'pending' && <LoadingIndicator progressMessage={video.progressMessage} />}
                        {video.status === 'error' && (
                            <div className="text-center p-4 text-red-400">
                                <IconAlertTriangle size={32} className="mx-auto mb-2" />
                                <p className="font-bold">{t('generation_failed')}</p>
                                <p className="text-xs mt-1 text-red-300/80 max-h-24 overflow-y-auto">{video.error}</p>
                            </div>
                        )}
                        {video.status === 'done' && video.url && (
                            <>
                                <video
                                    src={video.url}
                                    controls
                                    loop
                                    autoPlay
                                    muted
                                    className="w-full h-full object-contain rounded-lg"
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => handleDownloadVideo(video.url!, video.id)}
                                        className="p-3 bg-black/50 rounded-full text-white hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                                        aria-label={t('downloadVideo')}
                                        title={t('downloadVideo')}
                                    >
                                        <IconDownload size={20} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoResult;