import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import ganeshImage from '../assets/images/ganesh.webp';
import logoImage from '../assets/images/logo.webp';
import backgroundImage from '../assets/images/background.webp';

const Expertise = () => {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="expertise" 
      className="bg-brand-light py-28 lg:py-28 relative overflow-hidden flex flex-col justify-center border-t border-brand-primary/10 scroll-mt-0"
    >
      {/* ── Premium Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Ambient Blobs */}
        <div className="absolute -top-[10%] left-[10%] w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] right-[10%] w-[450px] h-[450px] bg-indigo-900/5 rounded-full blur-[120px]" />

        {/* Spotlight */}
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full z-0 opacity-40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ 
            background: "radial-gradient(circle, rgba(184, 146, 64, 0.06) 0%, transparent 70%)", 
            left: 0, 
            top: 0,
            x: springX,
            y: springY
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-brand-gold"></div>
            <p className="text-[10px] tracking-[0.7em] uppercase text-brand-gold font-black">
              Our Expertise
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-brand-gold/50 to-brand-gold"></div>
          </div>
          
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-playfair text-brand-primary leading-[1.05] tracking-tight mb-8">
            Deep Knowledge. Clear <br />
            <span className="italic font-light text-brand-gold">Vision.</span>
          </h2>
          
          <p className="text-brand-primary/70 leading-relaxed font-light text-lg lg:text-xl max-w-4xl mb-16 px-4">
            Athiraa Consultants combines deep sector knowledge with practical, research-backed strategies. We don't just advise — we help you build a strong financial foundation designed to grow steadily and withstand market changes for years to come.
          </p>

          {/* Laptop Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl mx-auto select-none pointer-events-none px-4 md:px-0 mt-8"
          >
            <div className="relative mx-auto w-[92%] md:w-[90%] aspect-[16/10] h-auto bg-[#0c0c0c] rounded-[1.5rem] xs:rounded-[2rem] sm:rounded-[2.5rem] border-[8px] sm:border-[12px] md:border-[16px] border-[#1a1a1a] shadow-[0_60px_120px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-between">
              {/* Webcam */}
              <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neutral-900 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500/30 animate-pulse" />
              </div>

              {/* Screen Content */}
              <div 
                className="flex-1 w-full relative overflow-hidden bg-cover bg-center flex flex-col items-center justify-between p-4 md:p-8 text-center gap-4 sm:gap-6"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-black/20 z-0" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* 1. Top Spacer to align middle content perfectly */}
                <div className="flex-1 min-h-[10px]" />
                
                {/* 2. Perfectly Centered Graphics Container */}
                <div className="flex-shrink-0 flex flex-row items-center justify-center gap-4 xs:gap-8 sm:gap-16 lg:gap-28 xl:gap-36 relative z-10 w-full">
                  {/* Left: Ganesha (Stacked on mobile, Left on laptop) */}
                  <div className="relative flex items-center justify-center h-[95px] w-[95px] xs:h-[120px] xs:w-[120px] sm:h-[110px] sm:w-[110px] md:h-[150px] md:w-[150px] lg:h-[220px] lg:w-[220px] xl:h-[270px] xl:w-[270px] z-10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute w-[110%] h-[110%] rounded-full border border-brand-gold/15 border-dashed"
                    />
                    
                    <motion.img
                      src={ganeshImage}
                      alt="Lord Ganesha"
                      animate={{ 
                        y: [0, -4, 0],
                        rotate: [0, 1.5, 0, -1.5, 0]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="h-full w-auto object-contain relative z-10"
                    />
                  </div>

                  {/* Right: Logo (Stacked on mobile, Right on laptop) */}
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 5, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
                    className="h-[75px] w-[75px] xs:h-[95px] xs:w-[95px] sm:h-[84px] sm:w-[84px] md:h-[115px] md:w-[115px] lg:h-[170px] lg:w-[170px] xl:h-[210px] xl:w-[210px] flex items-center justify-center relative z-10"
                  >
                    <img 
                      src={logoImage} 
                      alt="Athiraa Logo" 
                      className="h-full w-auto object-contain relative z-10"
                    />
                  </motion.div>
                </div>

                {/* 3. Bottom Spacer containing the Down Button */}
                <div className="flex-1 flex flex-col justify-end pb-2 md:pb-6 relative z-10 w-full">
                  <div className="relative mx-auto mt-2 sm:mt-4">
                    <motion.button
                      animate={{ scale: [1, 1, 0.94, 1, 1] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.5, 0.6, 1]
                      }}
                      className="px-8 py-2.5 sm:px-12 sm:py-3.5 bg-gradient-to-r from-brand-gold to-brand-gold/80 text-brand-primary font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] rounded-full shadow-[0_10px_35px_rgba(184,146,64,0.35)] border border-brand-gold/30 relative overflow-hidden"
                    >
                      ATHIRAA
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent skew-x-12 pointer-events-none"
                      />
                    </motion.button>

                    <motion.div
                      animate={{ scale: [1, 1.6, 1.15], opacity: [0, 0.45, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: "easeInOut",
                        times: [0, 0.5, 0.8, 1]
                      }}
                      className="absolute inset-0 rounded-full border-2 border-brand-gold/35 -z-10 pointer-events-none"
                    />

                    {/* Simulated Cursor - Smooth hover and click sequence synchronized with button physics */}
                    <motion.div
                      animate={{
                        x: [60, 0, -2, 0, 60],
                        y: [80, 15, 12, 15, 80],
                        scale: [1, 1, 0.8, 1, 1]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.5, 0.6, 1]
                      }}
                      className="absolute z-30 pointer-events-none"
                      style={{ top: '100%', left: '50%', marginLeft: '-5px', marginTop: '-15px' }}
                    >
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-brand-gold filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)]" viewBox="0 0 24 24">
                        <path d="M4.5 1.5 L21 10 L13 12 L17 19.5 L14 21 L10 13.5 L4.5 18 Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base */}
            <div className="relative mx-auto w-full h-4 md:h-6 bg-[#1a1a1a] rounded-b-[2rem] shadow-2xl flex justify-center z-20">
              <div className="absolute top-0 inset-x-10 h-[3px] bg-white/10" />
              <div className="w-[20%] h-[6px] md:h-[8px] bg-[#0c0c0c] rounded-b-xl border-t border-black/50 shadow-inner" />
            </div>
            <div className="mx-auto w-[90%] h-4 bg-black/40 rounded-full filter blur-xl -mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;
