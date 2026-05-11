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
        <div className="w-[75vw] xs:w-[80vw] sm:w-[43vw] md:w-[35vw] lg:w-[25vw] max-w-[340px] min-w-[220px] mb-6">
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
          <p className="text-[19.5px] xs:text-[22.5px] sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-brand-primary tracking-[0.14em] xs:tracking-[0.18em] leading-none mb-4 sm:mb-5 text-center">
            ATHIRAA CONSULTANTS
          </p>

          <div className="flex items-center justify-center mb-4.5 sm:mb-6 gap-2 sm:gap-[10px]">
            <span className="block w-[60px] xs:w-[85px] sm:w-[120px] h-[1px] sm:h-[1.5px] bg-brand-gold/60" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-gold rotate-45" />
            <div className="w-[3px] h-[3px] sm:w-1 sm:h-1 bg-brand-gold rotate-45" />
            <span className="block w-[60px] xs:w-[85px] sm:w-[120px] h-[1px] sm:h-[1.5px] bg-brand-gold/60" />
          </div>

          <p className="text-[11.2px] xs:text-[12.8px] sm:text-[14px] md:text-sm tracking-[0.12em] xs:tracking-[0.16em] sm:tracking-[0.25em] text-brand-muted font-bold uppercase font-montserrat text-center">
            Built on trust. Driven by vision
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
