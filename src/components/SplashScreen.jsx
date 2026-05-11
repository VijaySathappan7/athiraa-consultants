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
        
        <div className="animate-fade-in-up opacity-0 [animation-delay:0.2s] flex flex-col items-center w-full">
          <p className="text-[12px] xs:text-[15px] sm:text-xl md:text-2xl lg:text-3xl font-montserrat font-bold text-brand-primary tracking-[0.2em] xs:tracking-[0.25em] leading-none mb-3 sm:mb-4 text-center">
            ATHIRAA CONSULTANTS
          </p>

          <div className="flex items-center justify-center mb-3.5 sm:mb-5 gap-2 sm:gap-[10px]">
            <span className="block w-[40px] xs:w-[60px] sm:w-[80px] md:w-[120px] h-[1px] sm:h-[1.5px] bg-brand-gold/60" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-gold rotate-45" />
            <div className="w-[3px] h-[3px] sm:w-1 sm:h-1 bg-brand-gold rotate-45" />
            <span className="block w-[40px] xs:w-[60px] sm:w-[80px] md:w-[120px] h-[1px] sm:h-[1.5px] bg-brand-gold/60" />
          </div>

          <p className="text-[7.5px] xs:text-[9px] sm:text-[10px] md:text-xs tracking-[0.18em] xs:tracking-[0.22em] sm:tracking-[0.3em] text-brand-muted font-bold uppercase font-montserrat text-center">
            Built on trust. Driven by vision
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
