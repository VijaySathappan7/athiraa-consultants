import React, { useState, useEffect, useRef, useCallback } from 'react';
import logoVideo from '../assets/videos/animationlogo.mp4';

const SplashScreen = ({ onAnimationEnd }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);

  const triggerExit = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(onAnimationEnd, 800);
  }, [onAnimationEnd]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    const safetyTimer = setTimeout(triggerExit, 7000);
    return () => clearTimeout(safetyTimer);
  }, [triggerExit]);

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl">
        <div className="w-[56vw] sm:w-[43vw] md:w-[35vw] lg:w-[25vw] max-w-[280px] min-w-[167px] mb-4">
          <video
            ref={videoRef}
            className="w-full h-auto object-contain"
            muted
            playsInline
            preload="auto"
            onEnded={triggerExit}
          >
            <source src={logoVideo} type="video/mp4" />
          </video>
        </div>
        
        <div className="animate-fade-in-up opacity-0 [animation-delay:0.2s] flex flex-col items-center">
          <p className="text-xl md:text-2xl lg:text-3xl font-montserrat font-bold text-brand-primary tracking-[0.25em] leading-[1.2] mb-2">
            ATHIRAA CONSULTANTS
          </p>

          <div className="flex items-center justify-center mb-4 gap-[10px]">
            <span className="block w-[80px] md:w-[120px] h-[1.5px] bg-brand-gold" />
            <div className="w-[8px] h-[8px] bg-brand-gold rotate-45" />
            <div className="w-[4px] h-[4px] bg-brand-gold rotate-45" />
            <span className="block w-[80px] md:w-[120px] h-[1.5px] bg-brand-gold" />
          </div>

          <p className="text-[12px] tracking-[var(--spacing-brand-normal)] text-brand-muted font-medium uppercase font-montserrat">
            Built on trust. Driven by vision
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
