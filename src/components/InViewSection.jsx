import React, { useState, useEffect, useRef, Suspense } from 'react';

/**
 * InViewSection is an elite enterprise-grade performance component.
 * It defers the rendering (and asset loading/Framer Motion execution) of heavy sections
 * until they are close to the viewport, while maintaining perfect support for 
 * instant scroll navigation targets.
 */
const InViewSection = ({
  id,
  estimatedHeight = '600px',
  component,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const Component = component;

  useEffect(() => {
    // 1. Listen for custom navigation events to instantly mount if targeted by navbar
    const handleInstantMount = (e) => {
      if (e.detail && (e.detail.sectionId === id || e.detail.sectionId === `${id}-hero`)) {
        setIsMounted(true);
      }
    };

    window.addEventListener('nav-mount-section', handleInstantMount);

    // 2. Setup intersection observer for natural proximity-based lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '600px 0px 600px 0px', // Pre-render 600px before coming into view for zero latency
        threshold: 0
      }
    );

    if (containerRef.current && !isMounted) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('nav-mount-section', handleInstantMount);
      observer.disconnect();
    };
  }, [id, isMounted]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        minHeight: isMounted ? 'auto' : estimatedHeight,
        display: 'block',
        width: '100%',
        position: 'relative'
      }}
    >
      {isMounted ? (
        <Suspense fallback={<div style={{ height: estimatedHeight }} />}>
          <Component {...props} />
        </Suspense>
      ) : (
        // Minimal visual skeleton matching the brand's aesthetic while loading
        <div 
          className="w-full bg-black flex items-center justify-center pointer-events-none transition-opacity duration-500" 
          style={{ height: estimatedHeight }}
        >
          <div className="w-10 h-10 border border-brand-gold/20 border-t-brand-gold rounded-full animate-spin opacity-20" />
        </div>
      )}
    </div>
  );
};

export default InViewSection;
