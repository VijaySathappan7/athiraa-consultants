import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';
import taxImg1 from '../assets/images/tax-1.webp';
import taxImg2 from '../assets/images/tax-2.webp';
import taxImg3 from '../assets/images/tax-3.webp';
import taxImg4 from '../assets/images/tax-4.webp';
import taxImg5 from '../assets/images/tax-5.webp';

const taxServices = [
  {
    num: "01",
    title: "Tax Planning & Compliance",
    shortTitle: "Tax & Filing",
    desc: "Comprehensive support for Income Tax Act compliance, GST Council regulations, and efficient ITR filing — tailored for Indian HNIs, NRIs, and corporates.",
    tags: ["Income Tax", "GST Compliance", "Audit Support"],
    image: taxImg1
  },
  {
    num: "02",
    title: "Corporate Training",
    shortTitle: "Training",
    desc: "Bespoke training programmes on Indian compliance frameworks, financial literacy for leadership teams, and corporate governance best practices.",
    tags: ["Corporate Governance", "Compliance Training", "Skill Development"],
    image: taxImg2
  },
  {
    num: "03",
    title: "Portfolio Management",
    shortTitle: "Portfolios",
    desc: "SEBI-aligned investment strategies focused on domestic equities, fixed-income instruments, and alternative assets — personalised for Indian market dynamics.",
    tags: ["SEBI Regulated", "Indian Equities", "Wealth Growth"],
    image: taxImg3
  },
  {
    num: "04",
    title: "Family Office Solutions",
    shortTitle: "Family Office",
    desc: "Holistic wealth management for Indian business families — encompassing HUF structuring, succession planning, and multi-generational estate protection.",
    tags: ["HUF Planning", "Succession Advisory", "Wealth Legacy"],
    image: taxImg4
  },
  {
    num: "05",
    title: "Trust & NGO Advisory",
    shortTitle: "Trust & NGO",
    desc: "Specialised advisory for Section 12A/80G registrations, FCRA compliance, and robust governance frameworks for Indian charitable organisations.",
    tags: ["FCRA Advisory", "80G & 12A", "Governance"],
    image: taxImg5
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

const popupVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.70,
      delay: 0.20,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.70,
      delay: 0.20,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};


const TaxContent = () => {
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayDesktop, setAutoPlayDesktop] = useState(true);
  const [isManualLocked, setIsManualLocked] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  useEffect(() => {
    [taxImg1, taxImg2, taxImg3, taxImg4, taxImg5].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const currentTimeout = hoverTimeoutRef.current;
    return () => {
      if (currentTimeout) clearTimeout(currentTimeout);
    };
  }, []);

  useEffect(() => {
    if (!autoPlayDesktop || isManualLocked) return;
    const timer = setInterval(() => {
      setActiveDesktopIndex((prev) => (prev + 1) % taxServices.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlayDesktop, isManualLocked, activeDesktopIndex]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setIsManualLocked(false);
          setAutoPlayDesktop(true);
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

  const handleDesktopCardHover = (index) => {
    setActiveDesktopIndex(index);
    setAutoPlayDesktop(false);
    setIsManualLocked(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="tax-content" 
      className="bg-brand-light py-24 sm:py-24 lg:py-24 xl:py-28 relative overflow-hidden flex flex-col justify-center border-t border-white/10 scroll-mt-0"
    >
      {/* ── Premium Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px]" />
        
        {/* Spotlight */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full z-0 opacity-40 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ 
            background: "radial-gradient(circle, rgba(184, 146, 64, 0.05) 0%, transparent 70%)", 
            left: 0, 
            top: 0,
            x: springX,
            y: springY
          }}
        />
      </div>

      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-10 lg:mb-14 xl:mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl xl:max-w-5xl"
          >
            <p className="text-[10px] tracking-[0.5em] uppercase text-brand-gold font-black mb-4">Tax & Compliance Advisory</p>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-playfair text-brand-primary leading-[1.1] tracking-tight">
              Simplifying Complexity <br />
              with Clarity & <br />
              <span className="italic font-light text-brand-gold">Expertise.</span>
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
              Our advisory spans tax strategy, family wealth management, and corporate compliance — providing actionable insights to protect your assets and grow your wealth for the long term.
            </p>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP: Expanding Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex container mx-auto px-6 md:px-12 h-[460px] xl:h-[520px] z-10 relative"
      >
        <div className="flex w-full h-full gap-5">
          {taxServices.map((service, index) => {
            const isActive = activeDesktopIndex === index;
            return (
              <motion.div
                key={index}
                onMouseEnter={() => handleDesktopCardHover(index)}
                animate={{ 
                  width: isActive ? '60%' : '10%',
                }}
                transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full rounded-[2.8rem] overflow-hidden cursor-pointer flex shadow-2xl border border-white/5 group"
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <motion.div
                    animate={{ scale: isActive ? 1.05 : 1.15 }}
                    transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <ProgressiveImage src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </motion.div>
                  <div className={`absolute inset-0 transition-all duration-1000 ${isActive ? 'bg-gradient-to-t from-black via-black/40 to-transparent' : 'bg-black/50 group-hover:bg-black/35'}`}></div>
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 xl:p-10">
                  {/* INACTIVE STATE */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 0 : 1,
                      scale: isActive ? 0.8 : 1,
                      y: isActive ? 40 : 0,
                    }}
                    transition={{ duration: 0.70 }}
                    className={`absolute inset-0 flex flex-col items-center justify-center ${isActive ? 'pointer-events-none' : ''}`}
                  >
                    <span className="text-brand-gold font-playfair font-bold text-4xl mb-6 opacity-30 group-hover:opacity-60 transition-opacity duration-500">{service.num}</span>
                    <h3 className="text-white font-playfair font-medium tracking-[0.5em] uppercase text-[10px] xl:text-[12px] rotate-180" style={{ writingMode: 'vertical-rl' }}>
                      {service.shortTitle}
                    </h3>
                  </motion.div>

                  {/* ACTIVE STATE */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        variants={popupVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-[368px] glass-premium bg-black/25 border-white/20 p-5 xl:p-6.5 rounded-[2rem] shadow-2xl"
                      >
                        <div className="flex items-center gap-5 mb-5">
                          <span className="text-brand-gold font-playfair font-bold text-3xl leading-none italic opacity-60">{service.num}</span>
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-gold/50 to-transparent" />
                        </div>

                        <h3 className="text-[16px] xl:text-[19px] font-playfair font-bold text-white mb-3 leading-tight">
                          {renderTitle(service.title)}
                        </h3>

                        <p className="text-xs xl:text-xs font-light text-white/85 leading-relaxed mb-5 border-l-2 border-brand-gold/50 pl-5">
                          {service.desc}
                        </p>

                        <div className="w-full h-1 bg-white/10 rounded-full mb-5 overflow-hidden relative">
                          <motion.div
                            key={activeDesktopIndex + autoPlayDesktop.toString()}
                            initial={{ width: "0%" }}
                            animate={{ width: autoPlayDesktop ? "100%" : "0%" }}
                            transition={autoPlayDesktop ? { duration: 5, ease: "linear" } : { duration: 0.3 }}
                            className="absolute top-0 left-0 h-full bg-brand-gold shadow-[0_0_15px_rgba(184,146,64,0.8)]"
                          />
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {service.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/5 border border-white/10 text-white/90 font-bold text-[7px] uppercase tracking-widest rounded-full hover:bg-brand-gold hover:border-brand-gold transition-all duration-500 cursor-default"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* MOBILE ONLY: ACCORDION */}
      <div className="lg:hidden w-full flex flex-col gap-6 px-6 pb-12 z-10 relative">
        {taxServices.map((service, index) => {
          const isOpen = activeIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-[2rem] border transition-all duration-700 bg-white ${
                isOpen 
                  ? "border-brand-gold shadow-2xl" 
                  : "border-gray-100 shadow-xl"
              }`}
            >
              <button
                onClick={() => setActiveIndex(isOpen ? -1 : index)}
                className="w-full text-left p-6.5 flex items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-5">
                  <span className={`text-xl font-playfair font-bold transition-all duration-700 ${isOpen ? "text-brand-gold" : "text-brand-primary/20"}`}>
                    {service.num}
                  </span>
                  <div className={`h-5 w-[2px] ${isOpen ? "bg-brand-gold" : "bg-gray-100"}`} />
                  <h3 className={`font-sans font-bold text-[14.5px] transition-all duration-700 ${isOpen ? "text-brand-primary" : "text-brand-primary/50"}`}>
                    {service.shortTitle}
                  </h3>
                </div>

                <span className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-700 ${
                  isOpen 
                    ? "border-brand-gold text-brand-gold rotate-180 bg-brand-gold/10" 
                    : "border-gray-100 text-brand-primary/30"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6.5 pb-8 pt-1.5 border-t border-gray-100 flex flex-col">
                      <div className="w-full h-[220px] rounded-[1.6rem] overflow-hidden relative mb-6.5 shadow-2xl">
                        <ProgressiveImage src={service.image} alt={service.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      <h4 className="text-[19px] font-playfair font-bold text-brand-primary mb-3 leading-tight">
                        {service.title.split(' ').map((word, i, arr) => 
                          i === arr.length - 1 
                            ? <span key={i} className="italic font-light text-brand-gold/90">{word}</span> 
                            : word + ' '
                        )}
                      </h4>

                      <p className="text-[13px] font-light text-brand-primary/70 leading-relaxed border-l-2 border-brand-gold/40 pl-5 mb-6.5">
                        {service.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-5 border-t border-brand-primary/5">
                        {service.tags.map((tag, i) => (
                          <span key={i} className="text-[8px] uppercase tracking-widest px-3 py-1.5 bg-brand-primary/[0.03] border border-brand-primary/5 text-brand-primary/60 rounded-full font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TaxContent;
