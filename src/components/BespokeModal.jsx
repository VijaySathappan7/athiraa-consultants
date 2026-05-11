import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import logo from '../assets/images/logo.webp';
import wealth1 from '../assets/images/wealth-1.webp';
import wealth2 from '../assets/images/wealth-2.webp';
import wealth3 from '../assets/images/wealth-3.webp';
import corpImg from '../assets/images/corpmanage-1.webp';
import corpImg2 from '../assets/images/corpmanage-3.webp';
import capitalDebt from '../assets/images/capital-debt.webp';
import capitalEquity from '../assets/images/capital-equity.webp';
import realEstate1 from '../assets/images/realestate-1.webp';
import realEstate3 from '../assets/images/realestate-3.webp';
import tax1 from '../assets/images/tax-1.webp';
import tax2 from '../assets/images/tax-2.webp';

const services = [
  {
    img: wealth1,
    category: "Wealth Management",
    title: "Personalised Wealth Management",
    desc: "Holistic asset structuring tailored to your income, lifestyle, and generational wealth goals.",
    tags: ["HNI Advisory", "Asset Allocation", "Family Office"],
    badge: "SEBI Facilitated",
  },
  {
    img: wealth2,
    category: "Financial Planning",
    title: "Financial Planning & Investment Advisory",
    desc: "Comprehensive roadmaps covering investment scheduling, milestone planning, and cash flow optimisation.",
    tags: ["Goal Planning", "SIP Strategy", "Cash Flow"],
    badge: "Pan-India",
  },
  {
    img: wealth3,
    category: "Portfolio Design",
    title: "Bespoke Investment Portfolios",
    desc: "Custom-crafted multi-asset portfolios engineered to your risk tolerance and return expectations.",
    tags: ["Multi-Asset", "Risk Profiled", "Custom Built"],
    badge: "Customised",
  },
  {
    img: capitalEquity,
    category: "Capital Markets",
    title: "Equity, Mutual Fund & Debt Allocation",
    desc: "Strategic asset class mix balancing growth equities, high-grade debt instruments, and liquid funds.",
    tags: ["Equity", "Debt Funds", "Liquid"],
    badge: "AMFI Aligned",
  },
  {
    img: tax1,
    category: "Protection",
    title: "Insurance & Protection Planning",
    desc: "Life, health, and asset protection frameworks to safeguard your wealth and dependents.",
    tags: ["Life Cover", "Health Shield", "Asset Guard"],
    badge: "IRDAI Compliant",
  },
  {
    img: wealth1,
    category: "Retirement",
    title: "Retirement & Long-Term Wealth Creation",
    desc: "Post-retirement income structuring, corpus building, and annuity advisory for a dignified future.",
    tags: ["NPS", "Corpus Build", "Annuity"],
    badge: "Long Term",
  },
  {
    img: capitalDebt,
    category: "Alternatives",
    title: "Gold, Bonds & Alternative Investments",
    desc: "Diversification into sovereign gold bonds, G-Secs, commodities, and alternative asset classes.",
    tags: ["SGB", "G-Sec", "Commodities"],
    badge: "RBI Instruments",
  },
  {
    img: tax2,
    category: "Tax Advisory",
    title: "Tax-Efficient Financial Structuring",
    desc: "LTCG, Section 80C, HUF structuring, and deduction optimisation strategies tailored to your tax bracket.",
    tags: ["80C", "LTCG", "HUF"],
    badge: "IT Act 1961",
  },
  {
    img: corpImg,
    category: "Corporate Finance",
    title: "Corporate Finance & Capital Management",
    desc: "Debt syndication, equity structuring, working capital solutions, and balance sheet optimisation.",
    tags: ["Debt Syndication", "Working Capital", "NCD"],
    badge: "Corporate",
  },
  {
    img: realEstate1,
    category: "Real Estate",
    title: "Real Estate Investment Advisory",
    desc: "Premium property allocation, RERA-compliant due diligence, and rental yield structuring.",
    tags: ["RERA", "Yield", "Due Diligence"],
    badge: "RERA Aligned",
  },
  {
    img: corpImg2,
    category: "Monitoring",
    title: "Portfolio Monitoring & Optimisation",
    desc: "Ongoing performance tracking, rebalancing triggers, and strategic reviews to keep portfolios on course.",
    tags: ["Rebalancing", "Tracking", "Review"],
    badge: "Actively Managed",
  },
];



const heroFadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.30, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const SectionTitle = ({ eyebrow, title, body, light = false }) => (
  <div className="max-w-xl">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-80px" }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="mb-3 text-[9px] md:text-[10px] tracking-[0.7em] uppercase text-brand-gold font-black"
    >
      {eyebrow}
    </motion.div>
    <motion.h3
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-80px" }}
      transition={{ duration: 0.25, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`font-playfair text-2xl md:text-3xl lg:text-[2rem] font-black leading-[1.2] ${
        light ? "text-white" : "text-brand-primary"
      }`}
    >
      {title}
    </motion.h3>
    {body ? (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "-80px" }}
        transition={{ duration: 0.25, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-3 max-w-md text-[11.5px] lg:text-[12px] leading-relaxed ${
          light ? "text-white/60" : "text-brand-primary/60"
        }`}
      >
        {body}
      </motion.p>
    ) : null}
  </div>
);

const MagneticButton = ({ children, className, onClick, href }) => {
  const btnRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.35);
    y.set((clientY - (top + height / 2)) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ref: btnRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: springX, y: springY },
    whileHover: { scale: 1.015 },
    whileTap: { scale: 0.985 },
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.30 },
    className: className,
    onClick: onClick,
  };

  if (href) {
    return <motion.a href={href} {...commonProps}>{children}</motion.a>;
  }
  return <motion.button type="button" {...commonProps}>{children}</motion.button>;
};

const BespokeModal = ({ open, onClose }) => {
  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Warm up the browser image cache in the background for ultra-smooth rendering
    const assets = [
      logo, wealth1, wealth2, wealth3, corpImg, corpImg2, 
      capitalDebt, capitalEquity, realEstate1, realEstate3, tax1, tax2
    ];
    assets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.lenis?.start();
    }
    
    const handleScroll = () => {
      if (scrollRef.current && scrollRef.current.scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.lenis?.start();
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleModalLinkClick = (e, sectionId) => {
    e.preventDefault();
    onClose();
    window.lenis?.start();
    setTimeout(() => {
      window.scrollToSection?.(sectionId);
    }, 120);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bespoke-modal-title"
            initial={{ opacity: 0, y: 35, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.99 }}
            transition={{ duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[220] flex h-[95vh] w-[98vw] lg:h-[90vh] lg:w-[92vw] flex-col overflow-hidden bg-[#0a0a0c]/85 backdrop-blur-[45px] shadow-[0_50px_120px_rgba(0,0,0,0.95)] rounded-[1.125rem] lg:rounded-[1.5rem] border-[0.5px] border-brand-gold/25 will-change-gpu"
          >
            {/* Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[250] opacity-[0.03] mix-blend-overlay">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
            </div>

            <motion.div
              className="absolute top-0 left-0 right-0 h-[4px] bg-brand-gold z-[260] origin-left"
              style={{ scaleX }}
            />

            <header 
               className={`relative z-[240] flex shrink-0 items-center justify-between border-b transition-all duration-600 px-8 md:px-12 ${
                 scrolled 
                   ? "bg-[#0a0a0c]/90 border-white/5 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2.5 md:py-3" 
                   : "bg-transparent border-transparent pt-6 pb-2 md:pt-8 md:pb-3"
               }`}
               style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
             >
               <div className="flex items-center gap-2.5 border border-brand-gold/15 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                 <img src={logo} className="w-6.5 h-6.5 md:w-7 md:h-7 object-contain" alt="Athiraa Logo" />
                 <div className="flex flex-col">
                   <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-white leading-none">
                     ATHIRAA
                   </span>
                   <span className="text-[6px] md:text-[6.5px] font-black tracking-[0.38em] text-brand-gold mt-0.5 leading-none uppercase">
                     CONSULTANTS
                   </span>
                 </div>
               </div>
 
               <div className="flex items-center gap-4.5">
                 <div className="hidden rounded-full border border-white/5 bg-black/40 px-4 py-1.5 md:flex md:items-center md:gap-2.5 backdrop-blur-md shadow-sm">
                   <div className="relative h-1.2 w-1.2">
                     <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                     <span className="relative block h-1.2 w-1.2 rounded-full bg-emerald-500" />
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">
                     Institutional Standard • India
                   </span>
                 </div>
                 <motion.button
                   type="button"
                   onClick={onClose}
                   whileHover={{ rotate: 90, scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.30 }}
                   className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white/70 hover:border-brand-gold hover:text-brand-gold focus:outline-none"
                 >
                   <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </motion.button>
               </div>
            </header>

            <div ref={scrollRef} className="relative flex-1 overflow-y-auto scroll-smooth custom-scrollbar" data-lenis-prevent="true">
              {/* HERO SECTION */}
              <section className="relative min-h-[36vh] lg:min-h-[38vh] flex items-center overflow-hidden bg-[#0a0a0c]">
                <div className="absolute inset-0 z-0">
                  <motion.img 
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    src={realEstate3} 
                    alt="Athiraa Luxury Real Estate Portfolio Overview" 
                    className="h-full w-full object-cover opacity-[0.35]" 
                    style={{ willChange: "transform" }}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 w-full px-8 py-8 md:px-16 lg:px-24">
                  <motion.div initial="hidden" animate="visible" variants={heroStagger} className="max-w-4xl">
                    <motion.div variants={heroFadeUp} className="inline-flex items-center gap-3.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[8.5px] font-black uppercase tracking-[0.5em] text-brand-gold backdrop-blur-xl">
                      <span className="h-1.2 w-1.2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(194,154,73,1)] animate-pulse" />
                      Institutional Wealth & Advisory
                    </motion.div>

                    <motion.h2
                      id="bespoke-modal-title"
                      variants={heroFadeUp}
                      className="mt-4 font-playfair text-2xl md:text-3xl lg:text-[2.25rem] font-black md:leading-[1.1] leading-[1.15] tracking-tight text-white"
                    >
                      Bespoke Wealth, Capital &
                      <br />
                      <span className="italic font-light text-brand-gold">Planning.</span>
                    </motion.h2>

                    <motion.p variants={heroFadeUp} className="mt-5 max-w-lg text-xs leading-relaxed text-white/50 font-light md:text-[13px] lg:leading-6">
                      Athiraa builds tailored financial strategies for those who demand institutional precision with personal attention. We align every decision with your liquidity needs and generational legacy.
                    </motion.p>

                    <motion.div variants={heroFadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
                      <MagneticButton
                        onClick={(e) => handleModalLinkClick(e, "contact")}
                        className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-2.5 text-[9px] md:text-[9.5px] font-black uppercase tracking-[0.4em] text-black shadow-2xl"
                      >
                        Initiate Consultation
                      </MagneticButton>
                      <MagneticButton
                         onClick={() => scrollRef.current?.scrollTo({ top: 360, behavior: "smooth" })}
                         className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-[9px] md:text-[9.5px] font-black uppercase tracking-[0.4em] text-white backdrop-blur-xl"
                       >
                        Explore Disciplines
                      </MagneticButton>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* Advisory Context */}
              <section className="bg-[#0a0a0c] border-y border-white/5 px-8 py-16 md:px-16 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center transform-gpu">
                   <SectionTitle
                    eyebrow="The Bespoke Character"
                    title="A sharper, more deliberate advisory lens."
                    body="The engagement model is built to feel measured and high-trust: clear thinking, nuanced structuring, and planning that respects both growth ambition and downside protection."
                    light={true}
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2, margin: "-80px" }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-2 gap-4 transform-gpu"
                  >
                    {["Private Client", "Institutional", "Execution", "Discretion"].map((item, i) => (
                      <div 
                        key={item} 
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-brand-gold/25 hover:-translate-y-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                      >
                        <span className="text-[8px] font-black text-brand-gold mb-1 opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/95">{item}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* Spectrum */}
              <section className="bg-[#060608] px-8 py-16 md:px-16 lg:px-24 lg:py-20">
                <SectionTitle
                  eyebrow="Advisory Spectrum"
                  title="Integrated financial intelligence."
                  body="Each solution area stands independently, but the strongest outcomes come from coordinated planning across core disciplines."
                  light={true}
                />

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transform-gpu">
                  {services.map((service, idx) => (
                    <motion.article
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2, margin: "-80px" }}
                      transition={{ duration: 0.25, delay: idx * 0.03, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-[0_15px_45px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_60px_rgba(201,164,76,0.06)] hover:border-brand-gold/25 hover:-translate-y-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-gpu"
                    >
                      <div className="relative h-[140px] md:h-[150px] overflow-hidden">
                        <img 
                          src={service.img} 
                          alt={service.title} 
                          className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104" 
                          style={{ willChange: "transform" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                        <div className="absolute left-6 top-6">
                          <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[6px] font-black uppercase tracking-[0.4em] text-white backdrop-blur-md">
                            {service.badge}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5.5">
                          <span className="text-[6.5px] font-black uppercase tracking-[0.5em] text-brand-gold mb-1 block">{service.category}</span>
                          <h4 className="text-[12.5px] md:text-[13.5px] font-playfair font-black leading-tight text-white">{service.title}</h4>
                        </div>
                      </div>
                      <div className="p-4 md:p-5.5">
                        <p className="text-xs lg:text-[10px] leading-relaxed text-white/55 font-light">{service.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {service.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/5 bg-white/5 px-2 py-1 text-[6.5px] md:text-[7px] font-black uppercase tracking-[0.2em] text-white/45 group-hover:border-brand-gold/20 group-hover:text-brand-gold transition-all">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>

              {/* Assurance Strip */}
              <section className="bg-[#0a0a0c] border-y border-white/5 py-10 px-6 md:px-12 lg:px-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/20 rounded-full blur-[100px]" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <div className="text-[9px] font-black uppercase tracking-[0.6em] text-brand-gold mb-2">Regulatory Assurance</div>
                    <h3 className="text-white font-playfair text-base md:text-lg font-light italic opacity-90">Adhering to Indian Institutional Frameworks</h3>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {["SEBI Facilitated", "RBI Aligned", "RERA Verified", "IT Act 1961"].map((item) => (
                      <span key={item} className="px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[7.5px] md:text-[8px] font-black uppercase tracking-[0.4em] text-white/40 backdrop-blur-xl">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* preservations */}
              <section className="bg-[#060608] px-8 py-16 md:px-16 lg:px-24 lg:py-20">
                <div className="grid gap-16 lg:grid-cols-2 items-center transform-gpu">
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2, margin: "-80px" }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] will-change-gpu"
                  >
                    <img src={tax2} alt="Sophisticated Frameworks for Wealth Preservation and Tax Planning" className="w-full h-[18rem] md:h-[19rem] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent opacity-95" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                       <span className="text-brand-gold text-[6.5px] font-black uppercase tracking-[0.6em] mb-2 block">Structuring Principle</span>
                       <h3 className="text-white text-lg md:text-xl lg:text-[22px] font-playfair font-black leading-tight max-w-sm">
                          Sophisticated frameworks for <span className="italic font-light">wealth preservation.</span>
                       </h3>
                    </div>
                  </motion.div>

                  <div>
                    <SectionTitle
                      eyebrow="The Outcome"
                      title="Clarity across every financial horizon."
                      body="We provide a unified decision-making engine that connects investment growth to risk discipline, tax efficiency, and family objectives."
                      light={true}
                    />

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 transform-gpu">
                      {[
                        { title: "Portfolio Clarity", text: "Understand exactly what you hold and why." },
                        { title: "Tax Efficiency", text: "Reduce friction with complex Indian tax laws." },
                        { title: "Legacy Security", text: "Ensure multi-generational wealth continuity." },
                        { title: "Expert Oversight", text: "Stay ahead of market and regulatory shifts." },
                      ].map((item) => (
                        <motion.div 
                          key={item.title} 
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2, margin: "-80px" }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] shadow-[0_15px_45px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_60px_rgba(201,164,76,0.05)] hover:border-brand-gold/20 hover:-translate-y-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-gpu"
                        >
                          <h4 className="text-[11px] md:text-[12px] font-black text-white mb-1">{item.title}</h4>
                          <p className="text-xs md:text-[9.5px] leading-relaxed text-white/50 font-light">{item.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="relative overflow-hidden bg-[#0c0d12] px-8 py-20 lg:py-24 text-center">
                 <div className="absolute inset-0 z-0">
                    <img src={corpImg2} alt="Athiraa Corporate Advisory Consultation Background" className="h-full w-full object-cover opacity-[0.25]" />
                    <div className="absolute inset-0 bg-black/40" />
                 </div>
                 
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, amount: 0.2 }}
                   className="relative z-10 max-w-3xl mx-auto"
                 >
                    <span className="text-brand-gold text-[9px] font-black uppercase tracking-[0.8em] mb-6 block">The Mandate</span>
                    <h2 className="text-white text-2xl md:text-3xl font-playfair font-black leading-tight mb-6">
                       Design Your Financial <span className="italic font-light text-brand-gold">Masterpiece.</span>
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
                       <MagneticButton
                        onClick={(e) => handleModalLinkClick(e, "contact")}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-black uppercase tracking-[0.5em] text-[9px] md:text-[9.5px] hover:bg-brand-gold hover:text-white transition-all shadow-2xl"
                      >
                        Book Private Consultation
                      </MagneticButton>
                    </div>
                 </motion.div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BespokeModal;

