'use client';

import { useEffect, useRef } from 'react';

export function BackgroundVideo({
  videoSrc,
  posterSrc,
  mobilePosterSrc,
  paused = false,
}: {
  videoSrc: string;
  posterSrc: string;
  mobilePosterSrc?: string;
  paused?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      video.pause();
    } else {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Ignore browser autoplay interruption; poster remains visible underneath
        });
      }
    }
  }, [paused, videoSrc]);

  return (
    <div className="bg-video-wrap" aria-hidden="true">
      <picture>
        {mobilePosterSrc && <source media="(max-width: 767px)" srcSet={mobilePosterSrc} />}
        <img src={posterSrc} alt="" className="img-cover bg-video-poster" />
      </picture>
      <video
        ref={videoRef}
        key={videoSrc}
        className="bg-video-el"
        src={videoSrc}
        poster={posterSrc}
        autoPlay={!paused}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
