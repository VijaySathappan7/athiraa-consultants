import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';
import logo from '../assets/images/logo.webp';

import debtImg from '../assets/images/capital-debt.webp';
import equityImg from '../assets/images/capital-equity.webp';
import hybridImg from '../assets/images/capital-hybrid.webp';

const services = [
  {
    num: "01",
    title: "Debt Financing",
    desc: "Architecting high-liquidity debt structures aligned with RBI Master Directions. We specialize in NCDs, syndicated term loans, and ECB advisory to optimize interest coverage and funding diversity for leading Indian enterprises.",
    includes: [
      "Corporate Bonds & NCDs",
      "ECB Master Advisory",
      "Working Capital Optimization",
      "Syndicated Term Loans",
      "Debt Architecture"
    ],
    image: debtImg
  },
  {
    num: "02",
    title: "Equity Financing",
    desc: "Precision management of the equity lifecycle under SEBI-compliant frameworks. We guide ventures through IPO readiness, PE/VC placements, and secondary market exits to maximize stakeholder value in the Indian ecosystem.",
    includes: [
      "IPO Advisory & SEBI",
      "Private Equity (PE)",
      "Venture Capital (VC)",
      "Pre-IPO Placements",
      "Equity Valuation"
    ],
    image: equityImg
  },
  {
    num: "03",
    title: "Hybrid & Structured",
    desc: "Engineering complex instruments like CCDs and Mezzanine Debt for high-growth sectors. Our structured hybrids balance dilution with rapid scaling, ensuring robust financial health and capital flexibility.",
    includes: [
      "Mezzanine Engineering",
      "Convertible CCDs",
      "Structured Preference",
      "Strategic Bridge Finance",
      "Hybrid Architectures"
    ],
    image: hybridImg
  }
];

const renderTitle = (title, goldClass = "italic font-light text-brand-gold/90") => {
  const words = title.split(' ');
  return words.map((word, i, arr) =>
    i === arr.length - 1
      ? <span key={i} className={goldClass}>{word}</span>
      : word + ' '
  );
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 } 
  }
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "110%" : "-110%",
    rotate: direction > 0 ? 8 : -8,
    scale: 0.85,
    opacity: 0,
    filter: "blur(4px)"
  }),
  center: {
    x: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 220, damping: 24, mass: 0.9 },
      opacity: { duration: 0.4 },
      rotate: { type: "spring", stiffness: 180, damping: 22 },
      scale: { type: "spring", stiffness: 180, damping: 22 },
      filter: { duration: 0.3 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? "110%" : "-110%",
    rotate: direction < 0 ? 8 : -8,
    scale: 0.85,
    opacity: 0,
    filter: "blur(4px)",
    zIndex: 0,
    transition: {
      x: { type: "spring", stiffness: 220, damping: 24, mass: 0.9 },
      opacity: { duration: 0.3 },
      rotate: { type: "spring", stiffness: 180, damping: 22 },
      scale: { type: "spring", stiffness: 180, damping: 22 }
    }
  })
};

const textVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 24, delay: 0.1 }
  },
  exit: (direction) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: { duration: 0.2 }
  })
};

const CapitalMarketsContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isManualLocked, setIsManualLocked] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveIndex((prev) => (prev + newDirection + services.length) % services.length);
  };

  useEffect(() => {
    [debtImg, equityImg, hybridImg].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!autoPlay || isManualLocked) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, isManualLocked]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setIsManualLocked(false);
          setAutoPlay(true);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleManualSwitch = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setAutoPlay(false);
    setIsManualLocked(true);
  };

  const handleManualPaginate = (newDirection) => {
    paginate(newDirection);
    setAutoPlay(false);
    setIsManualLocked(true);
  };

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
      id="capital-content" 
      className="bg-brand-light relative flex flex-col justify-center overflow-hidden border-t border-brand-primary/10 py-24 sm:py-24 lg:py-24 xl:py-28 scroll-mt-0"
    >
      {/* ── Premium Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-[120px]" />
        
        {/* Spotlight */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full z-0 opacity-40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ 
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, transparent 70%)", 
            left: 0, 
            top: 0,
            x: springX,
            y: springY
          }}
        />
      </div>

      <div className="container mx-auto px-6 xl:px-12 mb-12 lg:mb-16 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl xl:max-w-5xl"
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-gold font-black mb-4">Capital Markets & Debt</p>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-playfair text-brand-primary leading-[1.1] tracking-tight">
              Precision. Strategy. <br />
              Sustainable <br />
              <span className="italic font-light text-brand-gold">Growth.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md border-l border-brand-gold/30 pl-8 pb-2"
          >
            <p className="text-[14px] xl:text-[16px] font-light text-brand-primary/80 leading-relaxed">
              We navigate complex Indian capital markets to structure the right funding and growth strategies for your business — ensuring every decision is backed by deep regulatory and financial analysis.
            </p>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP: 3-Column Grid */}
      <div className="hidden lg:block w-full container mx-auto px-6 xl:px-12 pb-12 z-10 relative">
        <div className="grid grid-cols-3 gap-10 transform-gpu">
          {services.map((service, i) => (
            <motion.div
              key={`desktop-${service.num}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.70, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col h-[512px] xl:h-[552px] rounded-[1.6rem] overflow-hidden bg-[#1a1614] border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] group hover:-translate-y-3 magnetic"
            >
              <div className="absolute inset-0 bg-glow-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-full h-[296px] xl:h-[320px] overflow-hidden relative z-0">
                <ProgressiveImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614] via-transparent to-transparent z-10" />

                <div className="absolute top-6 left-6 z-30">
                  <div className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-brand-gold shadow-2xl">
                    <span className="text-[10px] font-black">{service.num}</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-6 right-6 z-30 flex flex-wrap gap-1.5">
                  {service.includes.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white/95 font-bold text-[6.5px] xl:text-[7.5px] uppercase tracking-widest rounded-full shadow-lg hover:bg-brand-gold hover:border-brand-gold transition-all duration-500 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-4 xl:p-5.5 flex flex-col justify-start gap-3.5 relative z-30 border-t border-white/5 bg-[#1a1614]">
                <h3 className="text-[16px] xl:text-[19px] font-playfair font-bold text-white leading-tight">
                  {renderTitle(service.title)}
                </h3>

                <p className="text-[11px] xl:text-[13px] font-light text-white/80 leading-relaxed border-l-2 border-brand-gold/30 pl-4">
                  {service.desc}
                </p>

                <div className="absolute bottom-6 right-8 opacity-[0.05] group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                  <img src={logo} alt="Athiraa Logo" className="w-10 h-10 object-contain brightness-0 invert" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MOBILE ONLY: Slider */}
      <div className="lg:hidden container mx-auto px-6 pb-16 z-10 relative">
        <div className="relative h-[464px] w-full rounded-[1.6rem] overflow-hidden shadow-2xl border border-gray-100">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <ProgressiveImage src={services[activeIndex].image} className="w-full h-full object-cover" alt={services[activeIndex].title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute inset-0 p-5 md:p-6.5 flex flex-col justify-end">
                <motion.div
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <h3 className="text-3xl font-playfair font-bold text-white mb-5 leading-tight">
                    {services[activeIndex].title.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className="italic font-light text-brand-gold/90">{word}</span> : word + ' ')}
                  </h3>
                  <p className="text-xs font-light text-white/85 leading-relaxed pl-5 border-l-2 border-brand-gold/40 mb-6.5">
                    {services[activeIndex].desc}
                  </p>

                  <motion.div 
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-1.5 pt-5 border-t border-white/10"
                  >
                    {services[activeIndex].includes.map((tag, i) => (
                      <motion.span 
                        key={i} 
                        variants={staggerItemVariants}
                        className="text-[8px] uppercase tracking-widest px-2.5 py-1 border border-white/15 text-white/90 rounded-full bg-white/5 font-bold"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-6 right-6 flex flex-col gap-3 z-30">
            <button
              onClick={() => handleManualPaginate(-1)}
              className="w-11 h-11 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualPaginate(1)}
              className="w-11 h-11 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          {services.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                if (i !== activeIndex) {
                  handleManualSwitch(i);
                }
              }}
              className={`relative h-2 rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${activeIndex === i ? 'w-16 bg-gray-300' : 'w-3 bg-gray-300'}`}
            >
              {activeIndex === i && (
                <motion.div
                  key={activeIndex + autoPlay.toString()}
                  initial={{ width: "0%" }}
                  animate={{ width: autoPlay ? "100%" : "0%" }}
                  transition={autoPlay ? { duration: 5, ease: "linear" } : { duration: 0.3 }}
                  className="absolute inset-y-0 left-0 bg-brand-gold rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapitalMarketsContent;
