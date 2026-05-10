import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ZoomingImage = ({
  src,
  alt,
  loading,
  fetchPriority,
  loaded,
  imgRef,
  containerRef,
  onLoad,
  ...props
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <motion.img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onLoad={onLoad}
      initial={{ filter: 'blur(20px)', opacity: 0, scale: 1.1 }}
      animate={loaded ? { filter: 'blur(0px)', opacity: 1, scale: 1 } : {}}
      style={{
        scale,
        willChange: 'filter, opacity, transform'
      }}
      transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full object-cover"
      {...props}
    />
  );
};

const ProgressiveImage = ({
  src,
  alt,
  className = '',
  style = {},
  loading = 'lazy',
  fetchPriority,
  zoomOnScroll = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={style}>
      {zoomOnScroll ? (
        <ZoomingImage
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          loaded={loaded}
          imgRef={imgRef}
          containerRef={containerRef}
          onLoad={() => setLoaded(true)}
          {...props}
        />
      ) : (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onLoad={() => setLoaded(true)}
          initial={{ filter: 'blur(10px)', scale: 1.05 }}
          animate={loaded ? { filter: 'blur(0px)', scale: 1 } : { filter: 'blur(10px)', scale: 1.05 }}
          style={{
            willChange: 'filter, transform'
          }}
          transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover"
          {...props}
        />
      )}

      {/* Premium Shimmer Overlay */}
      {!loaded && (
        <div className="absolute inset-0 bg-slate-900/50 animate-pulse" />
      )}
    </div>
  );
};

export default ProgressiveImage;
