'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './VideoIntro.module.css';

export default function VideoIntro() {
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false); // default: sound ON
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-hide sound hint after 5s
  useEffect(() => {
    if (!showSoundHint) return;
    const timer = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(timer);
  }, [showSoundHint]);

  // Sync bg video to fg
  const syncVideos = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (Math.abs(bg.currentTime - fg.currentTime) > 0.5) {
      bg.currentTime = fg.currentTime;
    }
  }, []);

  const handleToggleMute = () => {
    const fg = fgVideoRef.current;
    if (!fg || !isPlaying) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
  };

  const handleTogglePlay = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    if (fg.paused || fg.ended) {
      if (fg.ended) {
        fg.currentTime = 0;
        bg.currentTime = 0;
      }
      fg.muted = false;
      fg.play().then(() => {
        bg.play();
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => {
        // If unmuted play fails, try muted
        fg.muted = true;
        fg.play().then(() => {
          bg.play();
          setIsPlaying(true);
          setIsMuted(true);
          setShowSoundHint(true);
        });
      });
    } else {
      fg.pause();
      bg.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoLoaded = () => {
    setIsLoaded(true);
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    // Try to autoplay WITH sound first
    fg.muted = false;
    fg.play()
      .then(() => {
        bg.play();
        setIsPlaying(true);
        setIsMuted(false); // Sound is ON
      })
      .catch(() => {
        // Browser blocked sound — fall back to muted autoplay
        fg.muted = true;
        fg.play()
          .then(() => {
            bg.play();
            setIsPlaying(true);
            setIsMuted(true);
            setShowSoundHint(true); // Hint only shown if forced muted
          })
          .catch(() => {
            setIsPlaying(false);
          });
      });
  };

  // Video ends → just pause cleanly on last frame, no overlay
  const handleEnded = () => {
    bgVideoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div className={`${styles.videoWrapper} ${isLoaded ? styles.loaded : ''}`}>
      {/* Blurred ambient background video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src="/video/self_intro.mp4"
        muted
        playsInline
        aria-hidden="true"
        preload="auto"
      />

      {/* Cinematic gradient overlays */}
      <div className={styles.overlayTop} />
      <div className={styles.overlayBottom} />
      <div className={styles.overlayLeft} />
      <div className={styles.overlayRight} />
      <div className={styles.overlayCenter} />

      {/* Foreground video — plays once, no loop */}
      <video
        ref={fgVideoRef}
        className={styles.fgVideo}
        src="/video/self_intro.mp4"
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoaded}
        onTimeUpdate={syncVideos}
        onEnded={handleEnded}
      />

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          id="btn-play-pause"
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Mute button — disabled only when video is not playing */}
        <button
          className={`${styles.controlBtn} ${!isPlaying ? styles.controlBtnDisabled : ''}`}
          onClick={handleToggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          id="btn-mute-unmute"
        >
          {isMuted ? (
            /* Muted icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17 18.09L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            /* Sound ON icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Sound hint — only shown when browser forced muted autoplay */}
      {showSoundHint && isPlaying && (
        <div className={styles.soundBadge} onClick={handleToggleMute} id="sound-badge">
          <span className={styles.soundPulse} />
          <span>Tap for sound</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        </div>
      )}
    </div>
  );
}
