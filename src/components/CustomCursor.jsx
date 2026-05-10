import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOffScreen, setIsOffScreen] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Highly responsive, elegant trailing physics for the precision dot
  const dotSpringConfig = { damping: 28, stiffness: 150, mass: 0.8 };
  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  // Soft, responsive trailing physics for the background glow (keeps up nicely without dragging)
  const glowSpringConfig = { damping: 35, stiffness: 100, mass: 1.2 };
  const glowX = useSpring(cursorX, glowSpringConfig);
  const glowY = useSpring(cursorY, glowSpringConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isOffScreen) {
        setIsOffScreen(false);
      }
    };

    const handleMouseLeave = () => {
      setIsOffScreen(true);
    };

    const handleMouseEnter = () => {
      setIsOffScreen(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !target.tagName) return; // Fast exit

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        (target.classList && target.classList.contains('magnetic'));

      setIsHovering(prev => {
        if (prev !== !!isInteractive) return !!isInteractive;
        return prev;
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isOffScreen]);

  if (isMobile) return null;

  return (
    <>
      {/* Main Glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-brand-gold/20 rounded-full pointer-events-none z-[9999] blur-xl"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2.5 : 1,
          opacity: isOffScreen ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, opacity: { duration: 0.3 } }}
      />

      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-gold rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isOffScreen ? 0 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
    </>
  );
};

export default CustomCursor;
