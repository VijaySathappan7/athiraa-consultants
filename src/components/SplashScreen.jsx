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
        <div className="w-[26vw] xs:w-[22vw] sm:w-[18vw] md:w-[15vw] max-w-[200px] min-w-[90px] mb-4">
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
          <p className="text-[12.5px] xs:text-[14.5px] sm:text-lg md:text-2xl lg:text-3xl font-montserrat font-semibold text-brand-primary tracking-[0.24em] leading-[1.2] mb-3 text-center whitespace-nowrap">
            ATHIRAA CONSULTANTS
          </p>

          <div className="flex items-center justify-center mb-3 gap-2 sm:gap-[10px]">
            <span className="block w-[50px] xs:w-[60px] sm:w-[80px] md:w-[120px] h-[1px] bg-brand-gold/80" />
            <div className="w-[5px] h-[5px] sm:w-[7px] sm:h-[7px] bg-brand-gold rotate-45" />
            <div className="w-[2.5px] h-[2.5px] sm:w-[3.5px] sm:h-[3.5px] bg-brand-gold rotate-45" />
            <span className="block w-[50px] xs:w-[60px] sm:w-[80px] md:w-[120px] h-[1px] bg-brand-gold/80" />
          </div>

          <p className="text-[7.8px] xs:text-[9px] sm:text-[10px] md:text-xs tracking-[0.22em] text-brand-muted font-medium uppercase font-montserrat text-center whitespace-nowrap">
            Built on trust. Driven by vision
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
