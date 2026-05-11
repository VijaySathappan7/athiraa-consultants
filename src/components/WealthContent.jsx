import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import ProgressiveImage from "./ProgressiveImage";
import wealthImg1 from '../assets/images/wealth-1.webp';
import wealthImg2 from '../assets/images/wealth-2.webp';
import wealthImg3 from '../assets/images/wealth-3.webp';
import wealthImg4 from '../assets/images/wealth-4.webp';
import wealthImg5 from '../assets/images/wealth-5.webp';

const topics = [
  {
    id: "01",
    title: "Financial Planning",
    subtitle: "Personalised Advisory",
    desc: "A structured advisory framework that brings clarity to your financial journey — from short-term liquidity goals to long-term family wealth preservation under Indian tax regulations.",
    includes: ["Goal Mapping", "Cash Flow Planning", "Succession Strategy"]
  },
  {
    id: "02",
    title: "Market Investments",
    subtitle: "Capital Growth",
    desc: "SEBI-aligned equity and mutual fund strategies designed to compound wealth steadily through research-driven, risk-adjusted investment decisions across Indian markets.",
    includes: ["Direct Equity", "Mutual Funds", "Bond Portfolios"]
  },
  {
    id: "03",
    title: "Gold & Commodities",
    subtitle: "Inflation Hedge",
    desc: "Strategic allocation to Sovereign Gold Bonds (SGBs), Silver ETFs, and MCX-traded commodities — protecting your portfolio against inflation and currency volatility.",
    includes: ["SGBs & Gold ETFs", "Commodity Allocation", "Inflation Shield"]
  },
  {
    id: "04",
    title: "Traditional Savings",
    subtitle: "Capital Protection",
    desc: "Time-tested instruments like Fixed Deposits, PPF, and NPS that offer guaranteed, low-risk returns — ideal for conservative investors and retirement planning in India.",
    includes: ["Fixed Deposits", "PPF & EPF", "National Pension System"]
  },
  {
    id: "05",
    title: "Portfolio Structuring",
    subtitle: "Asset Allocation",
    desc: "Institutional-grade portfolio construction that balances equity, debt, and alternative assets — optimising risk-adjusted returns through disciplined diversification.",
    includes: ["Asset Allocation", "Risk Management", "Rebalancing"]
  }
];

const images = [wealthImg1, wealthImg2, wealthImg3, wealthImg4, wealthImg5];

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

const WealthContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isManualLocked, setIsManualLocked] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!autoPlay || isManualLocked) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topics.length);
    }, 7000);
    return () => clearInterval(interval);
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
      id="wealth-content"
      className="w-full bg-[#fcfdfe] flex flex-col justify-center overflow-hidden relative py-24 sm:py-24 lg:py-24 xl:py-28 scroll-mt-0"
    >
      {/* ── Premium Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-brand-primary/5 rounded-full blur-[120px]" />

        {/* Spotlight */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full z-0 opacity-40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(184, 146, 64, 0.08) 0%, transparent 70%)",
            left: 0,
            top: 0,
            x: springX,
            y: springY
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 relative z-10">
        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex w-full items-end justify-between mb-10 lg:mb-14 xl:mb-16 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl xl:max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-brand-gold font-black">Wealth Management</p>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-playfair text-brand-primary leading-[1.1] tracking-tight">
              Strategic Wealth <br />
              <span className="italic font-light text-brand-gold">Planning.</span>
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
              We engineer personalized financial frameworks that bridge the gap between current liquidity and long-term legacy preservation, ensuring your wealth compounds with institutional precision.
            </p>
          </motion.div>
        </div>

        {/* MOBILE HEADER */}
        <div className="lg:hidden w-full mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-brand-gold font-black">Wealth Management</p>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-playfair text-brand-primary leading-[1.1] tracking-tight">
              Strategic Wealth <br />
              <span className="italic font-light text-brand-gold">Planning.</span>
            </h2>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 xl:gap-24">

          {/* DESKTOP LEFT: IMAGE DISPLAY */}
          <div className="hidden lg:flex lg:w-[48%] flex-col gap-8 relative perspective-1000">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.80, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-[4/5] lg:aspect-auto lg:h-[58vh] min-h-[420px] rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)] border border-brand-gold/20 bg-slate-950 relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.60, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <ProgressiveImage
                    src={images[activeIndex]}
                    alt={topics[activeIndex].title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-12 left-12 z-10 pointer-events-none">
                <span className="text-9xl font-playfair font-black italic text-white/10 leading-none">
                  {topics[activeIndex].id}
                </span>
              </div>

              <div className="absolute bottom-12 left-12 right-12 z-10">
                <motion.div
                  key={activeIndex}
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="glass-premium bg-black/40 border-white/10 rounded-xl p-6.5 shadow-2xl"
                >
                  <span className="text-[8px] tracking-[0.5em] uppercase text-brand-gold font-bold mb-3.5 block">Core Components</span>
                  <div className="flex flex-wrap gap-2">
                    {topics[activeIndex].includes.map((inc, i) => (
                      <motion.span
                        key={i}
                        variants={staggerItemVariants}
                        className="text-[8px] font-bold tracking-widest text-white bg-white/10 border border-white/10 px-3 py-1.5 rounded-full uppercase transition-colors hover:bg-brand-gold hover:border-brand-gold"
                      >
                        ✓ {inc}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="w-full mt-8 flex justify-center">
              <div className="w-72 h-[3px] bg-gray-100 rounded-full overflow-hidden relative">
                <motion.div
                  key={activeIndex + autoPlay.toString()}
                  initial={{ width: "0%" }}
                  animate={{ width: autoPlay ? "100%" : "0%" }}
                  transition={autoPlay ? { duration: 7, ease: "linear" } : { duration: 0.3 }}
                  className="h-full bg-brand-gold rounded-full"
                />
              </div>
            </div>
          </div>

          {/* DESKTOP RIGHT: ACCORDION */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:w-[48%] flex-col justify-start relative"
          >
            <div className="space-y-5 w-full">
              {topics.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.div
                    key={index}
                    onClick={() => handleClick(index)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    animate={{
                      height: isActive ? "auto" : 68
                    }}
                    transition={{
                      height: { duration: 0.70, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.70, delay: index * 0.1 },
                      y: { duration: 0.70, delay: index * 0.1 }
                    }}
                    className={`relative cursor-pointer transition-colors duration-500 rounded-[1.6rem] py-4 px-5 border group overflow-hidden magnetic ${isActive
                        ? 'bg-white shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)] border-gray-100'
                        : 'hover:bg-white/60 border-transparent hover:border-brand-gold/10 hover:shadow-2xl'
                      }`}
                  >
                    <div className="absolute inset-0 bg-glow-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex gap-6 items-start relative z-10">
                      <div className={`flex flex-col items-center pt-1 transition-all duration-700 ${isActive ? 'text-brand-gold scale-125' : 'text-brand-primary/20 group-hover:text-brand-gold/50'}`}>
                        <span className="text-[8px] font-black tracking-tight mb-1.5">{item.id}</span>
                        <div className={`w-[1px] transition-all duration-700 ${isActive ? 'bg-brand-gold h-11' : 'bg-brand-primary/10 h-6.5'}`}></div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-playfair text-lg xl:text-2xl font-bold transition-all duration-700 ${isActive ? 'text-brand-primary' : 'text-brand-primary/40 group-hover:text-brand-primary/70'}`}>
                            {item.title.split(' ').map((word, i, arr) =>
                              i === arr.length - 1
                                ? <span key={i} className={isActive ? "italic font-light text-brand-gold/90" : "group-hover:text-brand-gold/70"}>{word} </span>
                                : word + ' '
                            )}
                          </h3>
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-700 ${isActive
                              ? 'border-brand-gold text-brand-gold rotate-180 bg-brand-gold/5 shadow-inner'
                              : 'border-brand-primary/10 text-brand-primary/30 group-hover:border-brand-gold/30 group-hover:text-brand-gold'
                            }`}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.70 }}
                              className="overflow-hidden mt-3.5"
                            >
                              <p className="text-[13px] xl:text-[14.5px] font-light text-brand-primary/70 leading-relaxed border-l-2 border-brand-gold/30 pl-5">
                                {item.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* MOBILE FEED */}
          <div className="lg:hidden w-full flex flex-col gap-10 relative z-10">
            {topics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.70, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-[2.4rem] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6.5"
              >
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-brand-gold tracking-widest bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full">{item.id}</span>
                    <span className="text-[8px] tracking-[0.3em] uppercase font-bold text-brand-primary/40">{item.subtitle}</span>
                  </div>
                </div>

                <div className="w-full h-[179px] rounded-2xl overflow-hidden relative mb-5.5 shadow-2xl">
                  <ProgressiveImage src={images[index]} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <h3 className="text-[24px] font-playfair font-bold text-brand-primary mb-3.5 leading-tight">
                  {item.title.split(' ').map((word, i, arr) =>
                    i === arr.length - 1
                      ? <span key={i} className="italic font-light text-brand-gold/90">{word}</span>
                      : word + ' '
                  )}
                </h3>

                <p className="text-[13px] font-light text-brand-primary/70 leading-relaxed border-l-2 border-brand-gold/30 pl-4 mb-6.5">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-5 border-t border-brand-primary/5">
                  {item.includes.map((inc, i) => (
                    <span key={i} className="text-[8px] uppercase tracking-widest px-3 py-1.5 bg-brand-primary/[0.03] border border-brand-primary/5 text-brand-primary/80 rounded-full font-bold">
                      ✓ {inc}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WealthContent;