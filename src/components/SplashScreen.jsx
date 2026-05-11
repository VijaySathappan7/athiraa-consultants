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
        <div className="w-[88vw] xs:w-[92vw] sm:w-[50vw] md:w-[38vw] lg:w-[28vw] max-w-[440px] min-w-[260px] mb-8">
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
          <p className="text-[20px] xs:text-[24px] sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-brand-primary tracking-[0.24em] leading-[1.3] mb-5 sm:mb-6 text-center max-w-[90vw]">
            ATHIRAA <br className="sm:hidden" /> CONSULTANTS
          </p>

          <div className="flex items-center justify-center mb-5 sm:mb-7 gap-2.5 sm:gap-[12px]">
            <span className="block w-[75px] xs:w-[110px] sm:w-[160px] h-[1.5px] sm:h-[2px] bg-brand-gold/60" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-brand-gold rotate-45" />
            <div className="w-[4px] h-[4px] sm:w-[5px] sm:h-[5px] bg-brand-gold rotate-45" />
            <span className="block w-[75px] xs:w-[110px] sm:w-[160px] h-[1.5px] sm:h-[2px] bg-brand-gold/60" />
          </div>

          <p className="text-[12px] xs:text-[14px] sm:text-lg md:text-xl tracking-[0.22em] text-brand-muted font-medium uppercase font-montserrat text-center max-w-[85vw] leading-relaxed">
            Built on trust. <br className="xs:hidden" /> Driven by vision
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
