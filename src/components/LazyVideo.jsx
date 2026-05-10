import React, { useRef, useState, useEffect } from 'react';

const LazyVideo = ({ 
  src, 
  webmSrc = '',
  className = '', 
  once = false, 
  margin = '400px', // Increased margin to ensure video has time to decode before entering viewport
  poster = '',
  ...props 
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentSrcRef = useRef('');

  useEffect(() => {
    if (!containerRef.current) return;

    // Observe the closest parent section instead of the translated video container itself
    // to avoid layout/parallax-induced feedback loops!
    const target = containerRef.current.closest('section') || containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      {
        rootMargin: margin,
        threshold: 0, // Fire as soon as it enters the margin
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [once, margin]);

  // Unified video management using native hardware-accelerated looping
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.playsInline = true;
      video.playbackRate = 1.0; 
      
      const targetSrc = webmSrc || src;
      // Trigger native reloading if the source file reference changes
      if (currentSrcRef.current !== targetSrc) {
        currentSrcRef.current = targetSrc;
        video.load();
      } else if (video.readyState === 0) {
        video.load();
      }
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasLoaded(true);
          })
          .catch((err) => {
            console.warn("Autoplay policy or resource load interrupted:", err);
            // Even if interrupted, we remove the loading spinner
            setHasLoaded(true);
          });
      }
    } else {
      video.pause();
    }
  }, [inView, src, webmSrc]);

  // Handle local fallback replacement only in development
  const finalWebmSrc = webmSrc || (src && src.endsWith('.mp4') && !import.meta.env.PROD ? src.replace(/\.mp4$/, '.webm') : null);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black overflow-hidden transform-gpu">
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="none"
        poster={poster}
        className={`${className} transition-opacity duration-1000 transform-gpu ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform, opacity' }}
        {...props}
      >
        {finalWebmSrc && <source src={finalWebmSrc} type="video/webm" />}
        {src && <source src={src} type="video/mp4" />}
      </video>
      {!hasLoaded && !poster && (
        <div className="absolute inset-0 bg-black flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-2 border-white/10 border-t-brand-gold rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LazyVideo;
