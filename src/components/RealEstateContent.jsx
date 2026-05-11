import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, Building2, ShieldCheck, PieChart, Landmark } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';
import logo from '../assets/images/logo.webp';

import img1 from '../assets/images/realestate-1.webp';
import img2 from '../assets/images/realestate-2.webp';
import img3 from '../assets/images/realestate-3.webp';
import img4 from '../assets/images/realestate-4.webp';
import img5 from '../assets/images/realestate-5.webp';

const solutions = [
  {
    num: "01",
    title: "Property Segments",
    desc: "Navigating the full spectrum of India's real estate ecosystem with precision. Our advisory spans across RERA-compliant residential developments, Grade-A commercial office towers, and strategically positioned industrial corridors. We provide deep market intelligence to help investors capitalize on India's urban transformation and infrastructure growth.",
    includes: ["Residential", "Commercial", "RERA Projects", "Industrial"],
    image: img1,
    icon: <Building2 className="w-5 h-5" />,
    color: "rgba(184, 146, 64, 0.1)"
  },
  {
    num: "02",
    title: "Buy & Sell Advisory",
    desc: "Rigorous strategic guidance for cross-border and domestic property transactions. From initial market valuation to detailed title verification and final closing, we ensure every acquisition or divestment in Indian metros and Tier-II cities is executed with absolute transparency, minimizing risk and maximizing commercial value.",
    includes: ["Market Valuation", "Title Verification", "Transaction Advisory"],
    image: img2,
    icon: <MapPin className="w-5 h-5" />,
    color: "rgba(10, 31, 64, 0.1)"
  },
  {
    num: "03",
    title: "Rental & Management",
    desc: "Specialized asset management designed for the modern landlord and NRI investor. We handle the end-to-end lifecycle of property management, including exhaustive tenant due diligence, registered lease documentation, and proactive facilities oversight to ensure long-term yield optimization and asset preservation.",
    includes: ["NRI Services", "Tenant Screening", "Lease Structuring"],
    image: img3,
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "rgba(184, 146, 64, 0.1)"
  },
  {
    num: "04",
    title: "Real Estate Structuring",
    desc: "Sophisticated legal and tax-efficient structuring for complex real estate portfolios. We specialize in Joint Development Agreements (JDAs), land consolidation strategies, and tax-optimized divestment paths that align with the latest Indian regulatory frameworks and Ind-AS accounting standards.",
    includes: ["JDA Advisory", "Land Consolidation", "Tax Optimisation"],
    image: img4,
    icon: <PieChart className="w-5 h-5" />,
    color: "rgba(10, 31, 64, 0.1)"
  },
  {
    num: "05",
    title: "Investment Projects",
    desc: "Comprehensive feasibility and risk analysis for high-stakes real estate ventures. Our advisory covers project finance engineering, DPIIT and FDI compliance for global investors, and navigating the intricate landscape of regulatory clearances to ensure project viability and accelerated timelines.",
    includes: ["Feasibility Studies", "FDI Compliance", "Project Finance"],
    image: img5,
    icon: <Landmark className="w-5 h-5" />,
    color: "rgba(184, 146, 64, 0.1)"
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
      staggerChildren: 0.08,
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


const RealEstateContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isManualLocked, setIsManualLocked] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothY1 = useSpring(y1, springConfig);
  const smoothY2 = useSpring(y2, springConfig);

  useEffect(() => {
    if (!autoPlay || isManualLocked) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutions.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [autoPlay, isManualLocked, activeIndex]);

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

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    setAutoPlay(false);
    setIsManualLocked(true);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="real-estate-content"
      className="bg-[#fcfdfe] py-24 sm:py-24 lg:py-24 xl:py-28 relative overflow-hidden flex flex-col justify-center scroll-mt-0"
    >
      {/* ── Dynamic Ambient Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: smoothY1, rotate }}
          className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] bg-brand-gold/5 rounded-[4rem] blur-[120px]"
        />
        <motion.div
          style={{ y: smoothY2, rotate: -rotate }}
          className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-brand-primary/5 rounded-[4rem] blur-[120px]"
        />

        {/* Spotlight */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full pointer-events-none z-0 opacity-40 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            background: "radial-gradient(circle, rgba(184, 146, 64, 0.08) 0%, transparent 70%)", 
            left: 0, 
            top: 0,
            x: springX,
            y: springY
          }}
        />
      </div>

      {/* Header */}
      <div className="container mx-auto px-6 xl:px-12 mb-10 lg:mb-14 xl:mb-16 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl xl:max-w-5xl"
          >
            <p className="text-[10px] tracking-[0.6em] uppercase text-brand-gold font-black mb-4">India Real Estate</p>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-playfair text-brand-primary leading-[1.1] tracking-tight">
              Integrated Property <br />
              <span className="italic font-light text-brand-gold">Solutions.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md border-l border-brand-gold/30 pl-8 pb-2"
          >
            <p className="text-[14px] xl:text-[16px] font-light text-brand-primary/70 leading-relaxed">
              Premier advisory across India's elite residential, commercial, and industrial landscape. We navigate regulatory complexities to unlock maximum asset value.
            </p>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP: INTERACTIVE HUB */}
      <div className="hidden lg:block container mx-auto px-6 md:px-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full h-[580px] xl:h-[640px] bg-white rounded-[3.2rem] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.15)] border border-gray-100 hover:border-brand-gold/20 overflow-hidden relative group/hub transition-all duration-1000 ease-out"
        >
          {/* Navigation Panel */}
          <div className="w-[30%] bg-[#1a1614] border-r border-white/5 p-[38px] flex flex-col justify-between relative z-20 overflow-hidden shadow-[inset_-20px_0_60px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/70 pointer-events-none" />

            <div>
              <div className="mb-10 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_15px_rgba(184,146,64,1)]" />
                  <h4 className="text-[10px] tracking-[0.6em] text-white/50 font-bold uppercase">Real Estate Portfolio</h4>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              </div>

              <div className="space-y-2 relative z-10">
                {solutions.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleClick(index)}
                      className="w-full text-left relative py-4 px-6 rounded-[1.6rem] transition-all duration-700 flex items-center gap-5 group/btn magnetic"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-hub-bg"
                          className="absolute inset-0 bg-[#2d2825] backdrop-blur-3xl shadow-2xl border border-white/10 rounded-[1.6rem] -z-10"
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        />
                      )}

                      <div className={`flex items-center justify-center w-9.5 h-9.5 rounded-xl transition-all duration-700 ${isActive ? 'bg-brand-gold text-brand-primary shadow-2xl scale-110' : 'bg-white/5 text-white/30 group-hover/btn:bg-white/10 group-hover/btn:text-brand-gold group-hover/btn:scale-105'}`}>
                        {item.icon}
                      </div>

                      <div className="flex-1">
                        <h5 className={`font-playfair text-[16px] font-bold transition-all duration-700 ${isActive ? 'text-white' : 'text-white/40 group-hover/btn:text-white/90'}`}>
                          {item.title}
                        </h5>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="active-dot"
                          className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(184,146,64,1)]"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 pt-10 border-t border-white/10">
              <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  key={activeIndex + autoPlay.toString()}
                  initial={{ width: "0%" }}
                  animate={{ width: autoPlay ? "100%" : "0%" }}
                  transition={autoPlay ? { duration: 7, ease: "linear" } : { duration: 0.3 }}
                  className="h-full bg-brand-gold shadow-[0_0_15px_rgba(184,146,64,0.8)]"
                />
              </div>
            </div>
          </div>

          {/* Stage Panel */}
          <div className="flex-1 relative bg-[#0a0706] overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.70 }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full overflow-hidden"
                >
                  <ProgressiveImage
                    src={solutions[activeIndex].image}
                    className="w-full h-full object-cover brightness-[0.75]"
                    alt={solutions[activeIndex].title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
                </motion.div>

                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.70, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-6.5 right-6.5 left-6.5 lg:left-auto lg:max-w-[368px] z-20 glass-premium bg-black/35 border-white/20 p-5 xl:p-6 rounded-[2rem] shadow-2xl flex flex-col justify-between group/glass-panel transition-all duration-700"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-5 xl:mb-6.5">
                      <motion.img 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.70, delay: 0.20 }}
                        src={logo} 
                        alt="Athiraa Consultants" 
                        className="h-8 w-auto object-contain" 
                      />
                      <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.70, delay: 0.20 }}
                        className="text-2xl font-playfair font-black text-white/30 italic leading-none select-none"
                      >
                        {solutions[activeIndex].num}
                      </motion.span>
                    </div>

                    <motion.h3 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.70, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                      className="text-lg xl:text-2xl font-playfair font-bold text-white mb-3 leading-tight tracking-tight"
                    >
                      {renderTitle(solutions[activeIndex].title)}
                    </motion.h3>

                    <motion.p 
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.70, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[11px] xl:text-[13px] font-light text-white/85 leading-relaxed border-l-2 border-brand-gold/50 pl-5 mb-6.5"
                    >
                      {solutions[activeIndex].desc}
                    </motion.p>

                    <motion.div 
                      variants={staggerContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-wrap gap-1.5 pt-5 border-t border-white/10"
                    >
                      {solutions[activeIndex].includes.map((tag, i) => (
                        <motion.span 
                          key={i} 
                          variants={staggerItemVariants}
                          className="text-[8px] uppercase tracking-widest px-2.5 py-1 border border-white/15 text-white/80 rounded-full bg-white/5 font-semibold transition-colors hover:bg-brand-gold hover:border-brand-gold hover:text-brand-primary"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* MOBILE: SLIDER */}
      <div className="lg:hidden container mx-auto px-6 pb-16 z-10 relative">
        <div className="relative h-[480px] w-full rounded-[1.6rem] overflow-hidden shadow-2xl border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.70 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const threshold = 50;
                if (info.offset.x < -threshold) {
                  handleClick((activeIndex + 1) % solutions.length);
                } else if (info.offset.x > threshold) {
                  handleClick((activeIndex - 1 + solutions.length) % solutions.length);
                }
              }}
              className="absolute inset-0 touch-pan-y cursor-grab active:cursor-grabbing select-none"
            >
              <ProgressiveImage src={solutions[activeIndex].image} className="w-full h-full object-cover" alt={solutions[activeIndex].title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute inset-0 p-5 md:p-6.5 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.20 }}
                >
                  <h3 className="text-3xl font-playfair font-bold text-white mb-5 leading-tight">
                    {solutions[activeIndex].title.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className="italic font-light text-brand-gold/90">{word}</span> : word + ' ')}
                  </h3>
                  <p className="text-xs font-light text-white/85 leading-relaxed pl-5 border-l-2 border-brand-gold/40 mb-6.5">
                    {solutions[activeIndex].desc}
                  </p>

                  <motion.div 
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-1.5 pt-5 border-t border-white/10"
                  >
                    {solutions[activeIndex].includes.map((tag, i) => (
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
              onClick={() => handleClick((activeIndex - 1 + solutions.length) % solutions.length)}
              className="w-11 h-11 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleClick((activeIndex + 1) % solutions.length)}
              className="w-11 h-11 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          {solutions.map((_, i) => (
            <div
              key={i}
              onClick={() => handleClick(i)}
              className={`relative h-2 rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${activeIndex === i ? 'w-16 bg-gray-300' : 'w-3 bg-gray-300'}`}
            >
              {activeIndex === i && (
                <motion.div
                  key={activeIndex + autoPlay.toString()}
                  initial={{ width: "0%" }}
                  animate={{ width: autoPlay ? "100%" : "0%" }}
                  transition={autoPlay ? { duration: 7, ease: "linear" } : { duration: 0.3 }}
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

export default RealEstateContent;
