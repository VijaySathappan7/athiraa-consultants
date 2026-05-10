import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LazyVideo from './LazyVideo';
import wealthVid from '../assets/videos/wealthmanage.mp4';
import wealthVidWebm from '../assets/videos/wealthmanage.webm';
import wealthPoster from '../assets/images/posters/wealthmanage.webp';

const pillars = [
  {
    id: "01",
    title: "Equities",
    desc: "Strategic stock market investments designed for steady, long-term wealth creation and growth."
  },
  {
    id: "02",
    title: "Fixed Income",
    desc: "Stable instruments like bonds and deposits that provide predictable returns and capital safety."
  },
  {
    id: "03",
    title: "Gold & Commodities",
    desc: "Safe investments like Gold, Silver, and other commodities to protect your wealth against inflation."
  },
  {
    id: "04",
    title: "Traditional Plans",
    desc: "Time-tested avenues like FD, PPF, NPS, and insurance for secure, worry-free long-term savings."
  }
];

const WealthHero = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} id="wealth-hero" className="relative min-h-[100dvh] lg:min-h-[105vh] lg:h-[105vh] w-full flex items-center overflow-hidden bg-black scroll-mt-0">

      {/* VIDEO BACKGROUND */}
      <motion.div 
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 z-0"
      >
        <LazyVideo className="w-full h-full object-cover opacity-40" src={wealthVid} webmSrc={wealthVidWebm} poster={wealthPoster} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.9)_120%)]"></div>
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 w-full min-h-[100dvh] lg:min-h-[105vh] lg:h-[105vh] flex flex-col justify-center pt-20 lg:pt-28 pb-16 xs:pb-20 sm:pb-24 lg:pb-8">
        <div className="flex flex-col justify-center w-full mt-4 lg:mt-6">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 w-full">

            {/* LEFT SIDE: TEXT BLOCK */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2.60, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[40%] max-w-2xl"
            >
              <div className="flex items-center gap-6 mb-3 sm:mb-4 lg:mb-6">
                <p className="text-[10px] tracking-[0.7em] uppercase text-brand-gold font-black">
                  Wealth Management
                </p>
                <div className="w-20 h-[1px] bg-brand-gold/40"></div>
              </div>

              <h2 className="text-[2.5rem] xs:text-[2.85rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] font-playfair text-white leading-[1.05] tracking-tight mb-4 sm:mb-6 lg:mb-8">
                Plan, Grow & Protect <br />
                Your <span className="italic text-brand-gold/90 font-light">Wealth.</span>
              </h2>

              <p className="text-base md:text-lg font-light text-white/70 leading-relaxed max-w-xl mb-4 sm:mb-6 lg:mb-8">
                We provide personalised financial planning and expert investment advisory to help you build, safeguard, and grow your wealth — across every stage of life.
              </p>

              <div className="hidden lg:flex flex-col sm:flex-row gap-3 sm:gap-6 xl:gap-8">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#wealth-content" 
                  className="inline-block text-center px-8 py-3.5 sm:px-12 sm:py-5 bg-white text-black text-[10px] md:text-[11px] tracking-[0.4em] uppercase rounded-full font-black hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-2xl magnetic"
                >
                  Explore Strategy
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="inline-block text-center px-8 py-3.5 sm:px-12 sm:py-5 border border-white/20 text-white text-[10px] md:text-[11px] tracking-[0.4em] uppercase rounded-full font-black hover:bg-white/10 transition-all duration-500 backdrop-blur-md magnetic"
                >
                  Book a Consultation
                </motion.a>
              </div>
            </motion.div>

            {/* RIGHT SIDE: GLASS CARDS (Unified with other heros) */}
            <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 perspective-1000 transform-gpu">
              {pillars.map((item) => (
                <motion.div 
                  key={item.id} 
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
                  transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.8 }}
                  className="relative overflow-hidden p-4 sm:p-6 md:p-8 aspect-auto sm:aspect-[2/1] min-h-[100px] sm:min-h-0 flex flex-col items-center justify-center text-center glass-premium rounded-[1.75rem] group will-change-transform"
                >
                  {/* Embedded Glass Glow Sphere */}
                  <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-all duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <span className="text-brand-gold/80 font-playfair font-black text-2xl sm:text-3xl mb-1 group-hover:text-brand-gold transition-colors duration-500">
                      {item.id}
                    </span>
                    <h3 className="text-[14px] sm:text-xs md:text-sm lg:text-[15px] font-montserrat font-black uppercase tracking-[0.15em] text-white group-hover:text-brand-gold transition-colors duration-500 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[12px] sm:text-[11px] md:text-xs font-light text-white/50 leading-relaxed group-hover:text-white/85 transition-colors duration-700 max-w-[90%]">
                      {item.desc}
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
                href="#wealth-content" 
                className="flex-1 text-center py-3.5 px-2 bg-brand-gold text-white text-[10px] xs:text-[11px] tracking-[0.25em] xs:tracking-[0.35em] uppercase rounded-full font-black shadow-2xl"
              >
                Explore Strategy
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
        </div>

        {/* BOTTOM STRIP */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 2.60, delay: 0.80 }}
          className="mt-6 lg:mt-8 pt-4 border-t border-white/10 hidden lg:flex justify-between items-center w-full"
        >
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/20 font-black">
            Equities • Fixed Income • Gold & Commodities • Traditional Plans
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WealthHero;
