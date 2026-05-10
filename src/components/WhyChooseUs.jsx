import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import LazyVideo from './LazyVideo';
import whyChooseVid from '../assets/videos/whychoose.mp4';
import whyChooseVidWebm from '../assets/videos/whychoose.webm';
import whyChoosePoster from '../assets/images/posters/whychoose.webp';

const points = [
  {
    id: "01",
    title: "Tailored Strategies",
    desc: "Every financial plan is designed around your unique Indian market goals, life stage, and cultural legacy."
  },
  {
    id: "02",
    title: "Complete Solutions",
    desc: "A single hub for Indian Wealth Management, GST/Tax Compliance, RERA-aligned Real Estate, and Corporate Finance."
  },
  {
    id: "03",
    title: "Deep Knowledge",
    desc: "Backed by rigorous research and a deep understanding of India's evolving regulatory and economic landscape."
  },
  {
    id: "04",
    title: "Absolute Integrity",
    desc: "Operating with Dharma and transparency—committed to your long-term prosperity across generations."
  }
];

const WhyChooseUs = () => {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 35, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 120 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
      id="why-choose-us" 
      className="relative min-h-[100dvh] lg:min-h-[105vh] lg:h-[105vh] w-full flex items-center overflow-hidden bg-black scroll-mt-0"
    >
      {/* ── Match Global Hero Video Background & Gradients (Identical to WealthHero) ── */}
      <motion.div 
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 z-0"
      >
        <LazyVideo className="w-full h-full object-cover opacity-40" src={whyChooseVid} webmSrc={whyChooseVidWebm} poster={whyChoosePoster} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.9)_120%)]"></div>
        
        {/* Spotlight Overlay */}
        <motion.div
          className="absolute w-[1200px] h-[1200px] rounded-full z-10 opacity-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ 
            background: "radial-gradient(circle, rgba(184, 146, 64, 0.1) 0%, transparent 70%)", 
            left: 0, 
            top: 0,
            x: springX,
            y: springY
          }}
        />
      </motion.div>

      {/* Subtle Indian Motif Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl aspect-square opacity-[0.03] pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
          <path d="M50 0 C 55 15 70 15 75 30 C 90 35 90 50 75 55 C 70 70 55 70 50 85 C 45 70 30 70 25 55 C 10 50 10 35 25 30 C 30 15 45 15 50 0" />
          <circle cx="50" cy="50" r="10" variant="outline" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="20" variant="outline" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M50 10 L 50 90 M 10 50 L 90 50" stroke="white" strokeWidth="0.2" />
        </svg>
      </div>

      {/* ── Match Global Container Padding & Dimensions ── */}
      <div className="relative z-20 container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 w-full min-h-[100dvh] lg:min-h-[105vh] lg:h-[105vh] flex flex-col justify-center pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-8">
        <div className="flex flex-col justify-center w-full mt-4 lg:mt-6">
          
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 w-full mb-10 lg:mb-12">
            
            {/* LEFT SIDE: TYPOGRAPHY & ACTIONS (100% matched with WealthHero) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[40%] max-w-2xl"
            >
              <div className="flex items-center gap-6 mb-4 lg:mb-6">
                <p className="text-[10px] tracking-[0.7em] uppercase text-brand-gold font-black">
                  Why Choose Athiraa
                </p>
                <div className="w-20 h-[1px] bg-brand-gold/40"></div>
              </div>

              <h2 className="text-[2.5rem] xs:text-[2.85rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] font-playfair text-white leading-[1.05] tracking-tight mb-6 lg:mb-8">
                Built on Trust, <br />
                Driven by <span className="italic text-brand-gold/90 font-light">Vision.</span>
              </h2>

              <p className="text-base md:text-lg font-light text-white/70 leading-relaxed max-w-xl mb-6 lg:mb-8">
                We combine deep expertise with a personalised approach to deliver financial solutions that are practical, transparent, and designed to last across generations.
              </p>

              <div className="hidden lg:flex flex-col sm:flex-row gap-6 xl:gap-8">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#services" 
                  className="inline-block text-center px-12 py-5 bg-white text-black text-[10px] md:text-[11px] tracking-[0.4em] uppercase rounded-full font-black hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-2xl magnetic"
                >
                  Explore Services
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="inline-block text-center px-12 py-5 border border-white/20 text-white text-[10px] md:text-[11px] tracking-[0.4em] uppercase rounded-full font-black hover:bg-white/10 transition-all duration-500 backdrop-blur-md magnetic"
                >
                  Book a Consultation
                </motion.a>
              </div>
            </motion.div>

            {/* RIGHT SIDE: GLASS CARDS (Unified with other heros) */}
            <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 perspective-1000 transform-gpu">
               {points.map((point) => (
                  <motion.div 
                    key={point.id} 
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      borderColor: "rgba(255, 255, 255, 0.4)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 22,
                      mass: 0.8
                    }}
                    className="relative overflow-hidden p-4 sm:p-6 md:p-8 aspect-auto sm:aspect-[2/1] min-h-[100px] sm:min-h-0 flex flex-col items-center justify-center text-center glass-premium rounded-[1.75rem] group will-change-transform"
                  >
                     {/* Embedded Glass Glow Sphere */}
                     <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-all duration-700 pointer-events-none" />

                     <div className="relative z-10 flex flex-col items-center justify-center text-center">
                       <span className="text-brand-gold/80 font-playfair font-black text-2xl sm:text-3xl mb-1 group-hover:text-brand-gold transition-colors duration-500">
                         {point.id}
                       </span>
                       <h3 className="text-[14px] sm:text-xs md:text-sm lg:text-[15px] font-montserrat font-black uppercase tracking-[0.15em] text-white group-hover:text-brand-gold transition-colors duration-500 mb-2">
                         {point.title}
                       </h3>
                       <p className="text-[12px] sm:text-[11px] md:text-xs font-light text-white/50 leading-relaxed group-hover:text-white/85 transition-colors duration-700 max-w-[90%]">
                         {point.desc}
                       </p>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* MOBILE ONLY ACTIONS (Below the cards on mobile/tablet) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex lg:hidden flex-row gap-3 w-full mt-6"
            >
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#services" 
                className="flex-1 text-center py-3.5 px-2 bg-brand-gold text-white text-[10px] xs:text-[11px] tracking-[0.25em] xs:tracking-[0.35em] uppercase rounded-full font-black shadow-2xl"
              >
                Explore Services
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="flex-1 text-center py-3.5 px-2 border border-white/20 text-white text-[10px] xs:text-[11px] tracking-[0.25em] xs:tracking-[0.35em] uppercase rounded-full font-black backdrop-blur-md"
              >
                Consultation
              </motion.a>
            </motion.div>

          </div>

          {/* BOTTOM PARTNERSHIP STRIP */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.85, delay: 0.60 }}
            className="w-full mt-6 lg:mt-8 pt-4 border-t border-white/10 hidden lg:flex justify-between items-center"
          >
            <p className="text-[10px] tracking-[0.6em] uppercase text-white/20 font-black">
              Athiraa Consultants • Your Trusted Financial Partner
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
