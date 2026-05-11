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
        <div className="w-[44vw] xs:w-[46vw] sm:w-[25vw] md:w-[19vw] lg:w-[14vw] max-w-[220px] min-w-[130px] mb-6">
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
        
        <div className="animate-fade-in-up opacity-0 [animation-delay:0.2s] flex flex-col items-center w-full">
          <p className="text-[12.5px] xs:text-[14.5px] sm:text-xl md:text-2xl lg:text-3xl font-montserrat font-bold text-brand-primary tracking-[0.24em] leading-[1.3] mb-4 text-center whitespace-nowrap">
            ATHIRAA CONSULTANTS
          </p>

          <div className="flex items-center justify-center mb-4 gap-2 sm:gap-[10px]">
            <span className="block w-[55px] xs:w-[70px] sm:w-[100px] md:w-[120px] h-[1px] bg-brand-gold/80" />
            <div className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] bg-brand-gold rotate-45" />
            <div className="w-[3px] h-[3px] sm:w-[4px] sm:h-[4px] bg-brand-gold rotate-45" />
            <span className="block w-[55px] xs:w-[70px] sm:w-[100px] md:w-[120px] h-[1px] bg-brand-gold/80" />
          </div>

          <p className="text-[8px] xs:text-[9.2px] sm:text-[11px] md:text-sm tracking-[0.22em] text-brand-muted font-medium uppercase font-montserrat text-center whitespace-nowrap">
            Built on trust. Driven by vision
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
