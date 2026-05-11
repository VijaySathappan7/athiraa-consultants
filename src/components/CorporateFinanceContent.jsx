import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

import corpImg1 from '../assets/images/corpmanage-1.webp';
import corpImg2 from '../assets/images/corpmanage-2.webp';
import corpImg3 from '../assets/images/corpmanage-3.webp';
import corpImg4 from '../assets/images/corpmanage-4.webp';
import corpImg5 from '../assets/images/corpmanage-5.webp';

const services = [
  {
    num: "01",
    title: "Financial Planning",
    desc: "Rigorous operational modeling, Ind-AS compliant financial forecasting, and cash budget engineering. We build scenario-based business plans for mid-market and large-cap Indian conglomerates, optimizing tax efficiency and ensuring compliance with SEBI reporting mandates.",
    includes: ["Ind-AS Forecasting", "Scenario Analysis", "Revenue Modelling", "SEBI Compliance"],
    image: corpImg1
  },
  {
    num: "02",
    title: "Capital Structuring",
    desc: "Engineering optimal debt-equity mixes under RBI Master Directions to minimize WACC. We structure customized corporate bonds, debentures, and promoter equity strategies that align with long-term capital expenditure plans and corporate governance requirements.",
    includes: ["RBI Debt-Equity Norms", "WACC Minimization", "Debenture Engineering", "Promoter Capital Advisory"],
    image: corpImg2
  },
  {
    num: "03",
    title: "Working Capital",
    desc: "Maximizing operational liquidity and shortening cash conversion cycles. We specialize in structuring consortium-backed Working Capital Term Loans (WCTL), TReDS-based bill discounting models, and inventory financing structures aligned with Nayak Committee guidelines.",
    includes: ["Consortium Lending", "TReDS Discounting", "Inventory Credit Structure", "Nayak Committee Benchmarks"],
    image: corpImg3
  },
  {
    num: "04",
    title: "Strategic Advisory",
    desc: "Formulating cross-border JV frameworks, transaction readiness, and corporate restructuring under NCLT guidelines. We prepare Indian founders and enterprises for PE/VC placements, strategic buyouts, and institutional capital positioning.",
    includes: ["NCLT Restructuring", "JV Strategy", "Transaction Readiness", "PE/VC Capital Positioning"],
    image: corpImg4
  },
  {
    num: "05",
    title: "Debt Management",
    desc: "Designing structured debt solutions and MCA-compliant corporate leverage frameworks. We advise on commercial paper issues, credit rating enhancement strategies, IBC-aligned pre-packaged insolvency advisories, and banking covenant management.",
    includes: ["MCA Leverage Governance", "CP Advisory", "Credit Rating Enhancement", "IBC Pre-pack Advisory"],
    image: corpImg5
  }
];

const CorporateFinanceContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isManualLocked, setIsManualLocked] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  useEffect(() => {
    [corpImg1, corpImg2, corpImg3, corpImg4, corpImg5].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!autoPlay || isManualLocked) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 7000);
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
    setActiveIndex(index);
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
      id="corporate-content" 
      className="bg-[#fcfdfe] relative flex flex-col justify-center overflow-hidden border-t border-white/10 py-24 sm:py-24 lg:py-24 xl:py-28 scroll-mt-0"
    >
      
      {/* ── Premium Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-[120px]" />
        
        {/* Spotlight */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full z-0 opacity-40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ 
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)", 
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
            <p className="text-[10px] tracking-[0.6em] uppercase text-brand-gold font-black mb-4">Corporate Advisory</p>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-playfair text-brand-primary leading-[1.1] tracking-tight">
              Institutional Finance <br />
              <span className="italic font-light text-brand-gold">Strategies.</span>
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
              Navigating the complexities of corporate growth with precision. From structured debt to equity lifecycle management, we provide the capital intelligence needed to scale in the Indian market.
            </p>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP: GRID HUB */}
      <div className="hidden lg:block w-full container mx-auto px-6 xl:px-12 pb-12 z-10 relative">
        {/* Top 2 Cards */}
        <div className="grid grid-cols-2 gap-8 mb-10 items-stretch transform-gpu">
          {services.slice(0, 2).map((service, idx) => (
            <motion.div 
              key={`top-${service.num}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.70, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex bg-white rounded-[1.6rem] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all duration-700 border border-gray-100 group hover:-translate-y-2 magnetic"
            >
              <div className="w-[42%] relative overflow-hidden shrink-0 self-stretch">
                <ProgressiveImage src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-700"></div>
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-5xl font-playfair text-white opacity-20 font-black italic">{service.num}</span>
                </div>
              </div>
              <div className="w-[58%] p-5 xl:p-6.5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg xl:text-[22px] font-playfair font-bold text-brand-primary mb-2.5 leading-tight">
                    {service.title.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className="italic font-light text-brand-gold/90">{word} </span> : word + ' ')}
                  </h3>
                  <p className="text-xs xl:text-[13.5px] font-light text-brand-primary/80 leading-relaxed border-l-2 border-brand-gold/40 pl-4 mb-3.5">{service.desc}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3.5 border-t border-brand-primary/5">
                  {service.includes.map((item, i) => (
                    <span key={i} className="px-3.5 py-1 bg-brand-primary/[0.03] border border-brand-primary/5 text-brand-primary/80 text-[8px] xl:text-[9.5px] font-bold rounded-full uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all duration-500">{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom 3 Cards */}
        <div className="grid grid-cols-3 gap-8 items-stretch transform-gpu">
          {services.slice(2, 5).map((service, idx) => (
            <motion.div 
              key={`bottom-${service.num}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.70, delay: 0.20 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col bg-white rounded-[1.6rem] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all duration-700 border border-gray-100 group hover:-translate-y-2 magnetic"
            >
              <div className="w-full h-[150px] xl:h-[170px] relative overflow-hidden shrink-0">
                <ProgressiveImage src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-700"></div>
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-5xl font-playfair text-white opacity-20 font-black italic">{service.num}</span>
                </div>
              </div>
              <div className="p-5 xl:p-6.5 flex flex-col flex-1 justify-between h-full">
                <div>
                  <h3 className="text-[17px] xl:text-[20px] font-playfair font-bold text-brand-primary mb-2.5 leading-tight">
                    {service.title.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className="italic font-light text-brand-gold/90">{word} </span> : word + ' ')}
                  </h3>
                  <p className="text-xs xl:text-[13.5px] font-light text-brand-primary/70 leading-relaxed border-l-2 border-brand-gold/40 pl-4 mb-3.5">{service.desc}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3.5 border-t border-brand-primary/5">
                  {service.includes.map((item, i) => (
                    <span key={i} className="px-3.5 py-1 bg-brand-primary/[0.03] border border-brand-primary/5 text-brand-primary/80 text-[8px] xl:text-[9px] font-bold rounded-full uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all duration-500">{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MOBILE ONLY: Tap Feed */}
      <div className="lg:hidden container mx-auto px-6 pb-12 z-10 relative">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {services.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                onClick={() => handleManualSwitch(index)}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-500 font-bold text-[10px] uppercase tracking-widest ${
                  isActive 
                    ? "bg-brand-gold border-brand-gold text-brand-primary shadow-xl" 
                    : "bg-white border-gray-100 text-brand-primary/50"
                }`}
              >
                <span>{item.num}</span>
                <span>{item.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full min-h-[400px] rounded-[1.6rem] bg-white border border-gray-100 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const threshold = 50;
                if (info.offset.x < -threshold) {
                  handleManualSwitch((activeIndex + 1) % services.length);
                } else if (info.offset.x > threshold) {
                  handleManualSwitch((activeIndex - 1 + services.length) % services.length);
                }
              }}
              className="p-5 flex flex-col h-full touch-pan-y cursor-grab active:cursor-grabbing select-none"
            >
              <div className="w-full h-[179px] rounded-2xl overflow-hidden relative mb-5 shadow-lg shrink-0">
                <ProgressiveImage src={services[activeIndex].image} alt={services[activeIndex].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-2xl font-playfair text-white/20 font-black italic">{services[activeIndex].num}</span>
                </div>
              </div>

              <span className="text-brand-gold text-[7px] font-black tracking-[0.5em] uppercase mb-1 block">Service Focal</span>
              <h3 className="text-xl font-playfair font-bold text-brand-primary mb-2.5 leading-tight">
                {services[activeIndex].title.split(' ').map((word, i, arr) => 
                  i === arr.length - 1 
                    ? <span key={i} className="italic font-light text-brand-gold/90">{word}</span> 
                    : word + ' '
                )}
              </h3>
              <p className="text-[11px] font-light text-brand-primary/70 leading-relaxed border-l-2 border-brand-gold/30 pl-4 mb-3.5">
                {services[activeIndex].desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-brand-primary/5 mt-auto">
                {services[activeIndex].includes.map((item) => (
                  <span key={item} className="text-[7px] xl:text-[8px] uppercase tracking-widest px-3.5 py-1 bg-brand-primary/[0.03] border border-brand-primary/5 text-brand-primary/70 rounded-full font-bold">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {services.map((_, i) => (
            <div
              key={i}
              onClick={() => handleManualSwitch(i)}
              className={`relative h-2 rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${activeIndex === i ? 'w-16 bg-gray-200' : 'w-3 bg-gray-200'}`}
            >
              {activeIndex === i && (
                <motion.div
                  key={activeIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
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

export default CorporateFinanceContent;
