import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';
import logo from '../assets/images/logo.webp';
import wealthManageImg from '../assets/images/wealthmanage.webp';
import corporateFinanceImg from '../assets/images/corporatefinance.webp';
import realEstateImg from '../assets/images/realestate.webp';
import taxAdvisoryImg from '../assets/images/taxadvisory.webp';

const coreServices = [
  {
    title: "Wealth Management",
    description: "Personalised investment planning and strategic advisory to help you grow, protect, and pass on your wealth to the next generation — with complete transparency.",
    points: ["Smart Investment Planning", "Portfolio Management", "Succession & Estate Planning"],
    image: wealthManageImg
  },
  {
    title: "Corporate Finance",
    description: "Structured financial solutions for businesses — from raising capital and managing debt to optimising business performance and driving sustainable growth.",
    points: ["Capital Advisory", "Debt Management", "Business Growth Strategy"],
    image: corporateFinanceImg
  },
  {
    title: "Real Estate Advisory",
    description: "End-to-end guidance for buying, selling, and managing residential, commercial, and industrial properties — backed by deep market knowledge.",
    points: ["Property Acquisition", "Rental Management", "Market Research"],
    image: realEstateImg
  },
  {
    title: "Tax & Advisory",
    description: "Expert tax planning, compliance support, and strategic advisory to help individuals and businesses stay compliant while keeping more of what they earn.",
    points: ["Tax Planning & Filing", "Regulatory Compliance", "Family Office Advisory"],
    image: taxAdvisoryImg
  }
];

const TiltCard = ({ service, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.70, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group bg-white border border-brand-primary/10 rounded-[28px] flex flex-row overflow-hidden shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 relative perspective-1000"
    >
      <div className="w-[40%] aspect-[3/4] overflow-hidden bg-gray-50">
        <ProgressiveImage 
          src={service.image} 
          alt={service.title} 
          zoomOnScroll={false}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
          fetchPriority={idx < 2 ? "high" : "low"}
        />
      </div>
      <div className="w-[60%] p-8 flex flex-col justify-between relative" style={{ transform: "translateZ(30px)" }}>
        <div className="absolute inset-0 bg-glow-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-brand-primary font-playfair mb-3 group-hover:text-brand-gold transition-colors duration-500">{service.title}</h3>
          <p className="text-sm text-brand-primary/70 font-light leading-relaxed mb-6">{service.description}</p>
          <div className="space-y-3 mb-6">
            {service.points.map(p => (
              <div key={p} className="flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-primary/50">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3 opacity-80"></span>
                {p}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-end relative z-10">
          <motion.a 
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="px-6 py-2.5 bg-brand-light text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-sm magnetic"
          >
            Talk to Us
          </motion.a>
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain transition-transform duration-700 group-hover:scale-125 opacity-10 group-hover:opacity-40 pointer-events-none grayscale" />
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    let interval = null;

    const handleMediaChange = (e) => {
      if (e.matches) {
        if (!interval) {
          interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % coreServices.length);
          }, 4000);
        }
      } else {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    };

    handleMediaChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  return (
    <section id="services" className="py-28 md:py-28 lg:py-32 bg-white relative z-10 -mt-[1px] overflow-hidden flex flex-col justify-center scroll-mt-0">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex w-full items-end justify-between mb-16 md:mb-24 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl xl:max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <p className="text-[10px] md:text-xs tracking-[0.7em] uppercase text-brand-gold font-black">
                Our Expertise
              </p>
            </div>
            <h2 className="text-[2.1rem] xs:text-[2.5rem] sm:text-4xl lg:text-6xl xl:text-[4.5rem] font-playfair text-brand-primary leading-[1.15] tracking-tight">
              Personalised <span className="italic font-light text-brand-gold">Guidance.</span> <br />
              Deep <span className="italic font-light text-brand-gold">Commitment.</span>
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
              We provide a comprehensive range of financial and advisory services, each tailored to your unique goals and delivered with a focus on integrity and transparency.
            </p>
          </motion.div>
        </div>

        {/* MOBILE HEADER */}
        <div className="lg:hidden w-full mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <p className="text-[10px] tracking-[0.7em] uppercase text-brand-gold font-black">Our Expertise</p>
            </div>
            <h2 className="text-[1.6rem] xs:text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-playfair text-brand-primary leading-[1.15] tracking-tight mb-6">
              Personalised <span className="italic font-light text-brand-gold">Guidance.</span> <br />
              Deep <span className="italic font-light text-brand-gold">Commitment.</span>
            </h2>
            <p className="text-base text-brand-primary/60 font-light leading-relaxed">
              We provide a comprehensive range of financial and advisory services, each tailored to your unique goals and delivered with a focus on integrity and transparency.
            </p>
          </motion.div>
        </div>

        {/* Services Display */}
        <div className="relative">
          {/* Mobile Slider */}
          <div className="lg:hidden relative overflow-hidden">
            <motion.div 
              className="flex"
              drag="x"
              dragConstraints={{ left: -300 * (coreServices.length - 1), right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset }) => {
                const swipeThreshold = 50;
                if (offset.x < -swipeThreshold && activeIndex < coreServices.length - 1) {
                  setActiveIndex(activeIndex + 1);
                } else if (offset.x > swipeThreshold && activeIndex > 0) {
                  setActiveIndex(activeIndex - 1);
                }
              }}
              animate={{ x: -activeIndex * 100 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {coreServices.map((service, idx) => (
                <div key={idx} className="min-w-full px-1">
                  <div className="bg-white border border-brand-primary/10 rounded-[24px] overflow-hidden shadow-sm">
                    <div className="aspect-[3/2] bg-gray-50 overflow-hidden">
                      <ProgressiveImage 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover" 
                        fetchPriority={idx === 0 ? "high" : "low"}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-brand-primary font-playfair mb-1">{service.title}</h3>
                        <img src={logo} alt="Logo" className="w-6 h-6 object-contain opacity-20 grayscale" />
                      </div>
                      <p className="text-sm text-brand-primary/70 font-light leading-relaxed mb-5">{service.description}</p>
                      <div className="space-y-2 mb-6">
                        {service.points.map(p => (
                          <div key={p} className="flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-primary/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-3 opacity-80"></span>
                            {p}
                          </div>
                        ))}
                      </div>
                      <motion.a 
                        whileTap={{ scale: 0.95 }}
                        href="#contact" 
                        className="inline-block px-6 py-2.5 bg-brand-light text-brand-primary border border-brand-primary/20 text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-brand-primary hover:text-white transition-colors shadow-sm"
                      >
                        Talk to Us
                      </motion.a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Progress Tracks */}
            <div className="flex justify-center gap-2 mt-8">
              {coreServices.map((_, i) => (
                <div 
                  key={i} 
                  className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${activeIndex === i ? 'w-10 bg-gray-200' : 'w-2 bg-gray-200'}`} 
                >
                  {activeIndex === i && (
                    <motion.div
                      key={activeIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-y-0 left-0 bg-brand-primary rounded-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 gap-8 md:gap-10 transform-gpu">
            {coreServices.map((service, idx) => (
              <TiltCard key={service.title} service={service} idx={idx} />
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.70 }}
          className="mt-28 pt-16 border-t border-brand-primary/10 text-center"
        >
          <blockquote className="text-xl md:text-3xl text-brand-primary font-playfair italic max-w-4xl mx-auto leading-relaxed">
            "We believe in building lasting relationships — offering honest advice, clear solutions, and a genuine commitment to your financial well-being."
          </blockquote>
          <p className="mt-8 text-[10px] tracking-[0.6em] uppercase text-brand-gold font-bold">Athiraa Consultants</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
