import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LazyVideo from './LazyVideo';
import corporateVid from '../assets/videos/corporatefinance.mp4';
import corporateVidWebm from '../assets/videos/corporatefinance.webm';
import corporatePoster from '../assets/images/posters/corporatefinance.webp';

const CorporateFinanceHero = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} id="corporate-hero" className="relative min-h-[100dvh] lg:min-h-[105vh] lg:h-[105vh] w-full flex items-center overflow-hidden bg-black scroll-mt-0">

      {/* VIDEO BACKGROUND */}
      <motion.div 
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 z-0"
      >
        <LazyVideo className="w-full h-full object-cover opacity-40" src={corporateVid} webmSrc={corporateVidWebm} poster={corporatePoster} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.9)_120%)]"></div>
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-20 container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 w-full min-h-[100dvh] lg:min-h-[105vh] lg:h-[105vh] flex flex-col pt-20 lg:pt-28 pb-16 xs:pb-20 sm:pb-24 lg:pb-8 justify-center">
        <div className="flex flex-col justify-center w-full mt-4 lg:mt-6">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 w-full">

            {/* LEFT SIDE */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2.60, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[50%] max-w-2xl"
            >
              <div className="flex items-center gap-6 mb-3 sm:mb-4 lg:mb-6">
                <p className="text-[10px] tracking-[0.7em] uppercase text-brand-gold font-black">Corporate Finance</p>
                <div className="w-20 h-[1px] bg-brand-gold/40"></div>
              </div>

              <h2 className="text-[2.5rem] xs:text-[2.85rem] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-playfair text-white leading-[1.05] tracking-tight mb-4 sm:mb-6 lg:mb-8">
                Corporate Advisory & <br />
                <span className="italic text-brand-gold/90 font-light">Solutions.</span>
              </h2>

              <p className="text-base md:text-lg font-light text-white/70 leading-relaxed max-w-xl mb-4 sm:mb-6 lg:mb-8">
                Strategic financial advice, restructuring, and end-to-end support to help businesses make confident corporate decisions and optimize performance.
              </p>

              <div className="hidden lg:flex flex-col sm:flex-row gap-3 sm:gap-6 xl:gap-8">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#corporate-content" 
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

            {/* RIGHT SIDE GLASS CARDS */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4 lg:gap-6 perspective-1000">
              {[
                { title: "Capital Planning", id: "01", text: "Helping businesses find the right balance of debt and equity to fund growth without taking on unnecessary risk." },
                { title: "Strategic Advisory", id: "02", text: "Expert guidance for mergers, acquisitions, partnerships, and business restructuring — backed by deep market understanding." },
                { title: "Fund Raising", id: "03", text: "Connecting businesses with the right investors and lenders — from private equity and venture capital to bank financing." }
              ].map((card) => (
                <motion.div 
                  key={card.id}
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
                  className="relative overflow-hidden p-4 sm:p-6 md:p-8 xl:p-10 min-h-[100px] md:min-h-[190px] flex flex-col justify-center glass-premium rounded-[1.75rem] group will-change-transform"
                >
                  <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700 pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <h3 className="text-[15px] sm:text-sm md:text-base lg:text-lg font-montserrat font-bold uppercase tracking-[0.12em] text-white group-hover:text-white transition-colors duration-500 mb-1">{card.title}</h3>
                    <span className="text-white/20 font-playfair font-black text-2xl sm:text-4xl group-hover:text-white/40 transition-all duration-500">{card.id}</span>
                  </div>
                  <p className="text-sm md:text-base font-light text-white/60 leading-relaxed group-hover:text-white/85 transition-colors duration-700 relative z-10">
                    {card.text}
                  </p>
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
                href="#corporate-content" 
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
          className="w-full mt-6 lg:mt-8 pt-4 border-t border-white/10 hidden lg:flex justify-between items-center"
        >
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/20 font-black">
            Financial Planning • Capital Structuring • Strategic Advisory • Performance Growth
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CorporateFinanceHero;
