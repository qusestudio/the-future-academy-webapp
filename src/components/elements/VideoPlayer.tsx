"use client"

import React, {useEffect, useRef, useState} from 'react';
import {Maximize, Minimize, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX} from "lucide-react";

const VideoPlayer = ({src, poster}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        }
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play().then();
        }
        setIsPlaying(!isPlaying);
    }

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const newVolume = parseFloat(e.target.value);
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const progressBar = progressBarRef.current;
        if (!video || !progressBar) return;

        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * duration;
    }

    const skip = (seconds: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        const container = videoRef.current?.parentElement;
        if (!container) return;

        if (!isFullscreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen().then();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then();
            }
        }
        setIsFullscreen(!isFullscreen);
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className="relative w-full bg-black rounded-3xl overflow-hidden group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(!isPlaying)}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className={"w-full h-full"}
            />

            {/*PLAY / PAUSE BUTTON*/}
            <div
                className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
                    showControls && !isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={togglePlay}
            >
                <button
                    className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/90 hover:bg-primary transition-all hover:scale-110">
                    <Play className="w-10 h-10 text-white ml-1" fill="white"/>
                </button>
            </div>


            <div
                className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {/* Progress Bar */}
                <div
                    ref={progressBarRef}
                    className="w-full h-1.5 bg-gray-600 rounded-full cursor-pointer mb-4 group/progress"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-primary rounded-full relative group-hover/progress:h-2 transition-all"
                        style={{width: `${progress}%`}}
                    >
                        <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"/>
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Play/Pause */}
                        <button
                            onClick={togglePlay}
                            className="text-white hover:text-primary transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6" fill="white"/>
                            ) : (
                                <Play className="w-6 h-6" fill="white"/>
                            )}
                        </button>

                        {/* Skip Backward */}
                        <button
                            onClick={() => skip(-10)}
                            className="text-white hover:text-primary transition-colors"
                        >
                            <SkipBack className="w-5 h-5"/>
                        </button>

                        {/* Skip Forward */}
                        <button
                            onClick={() => skip(10)}
                            className="text-white hover:text-primary transition-colors"
                        >
                            <SkipForward className="w-5 h-5"/>
                        </button>

                        {/* Volume */}
                        <div className="flex items-center gap-2 group/volume">
                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-primary transition-colors"
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="w-5 h-5"/>
                                ) : (
                                    <Volume2 className="w-5 h-5"/>
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-0 group-hover/volume:w-20 transition-all opacity-0 group-hover/volume:opacity-100 accent-primary"
                            />
                        </div>

                        {/* Time */}
                        <span className="text-white text-sm font-medium">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Fullscreen */}
                    <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-primary transition-colors"
                    >
                        {isFullscreen ? (
                            <Minimize className="w-5 h-5"/>
                        ) : (
                            <Maximize className="w-5 h-5"/>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;