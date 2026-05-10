import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressiveImage from './ProgressiveImage';
import backgroundImage from '../assets/images/background.webp';
import ganeshImage from '../assets/images/ganesh.webp';
import logoImage from '../assets/images/logo.webp';
const mainLinks = [
  { name: "Home", to: "/", sectionId: "hero" },
  { name: "About", to: "/about", sectionId: "why-choose-us" },
  { name: "Expertise", to: "/expertise", sectionId: "expertise" },
  { name: "Contact", to: "/contact", sectionId: "contact" }
];

const servicesOverviewLink = {
  name: "Services",
  to: "/services",
  sectionId: "services"
};

const phrases = [
  "Wealth Management",
  "Corporate Finance",
  "Tax Advisory",
  "Trusted Guidance"
];

const Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(30);
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(80);
      }

      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, typingSpeed]);

  const handleHeroNav = (e, link) => {
    e.preventDefault();
    if (location.pathname !== link.to) {
      navigate(link.to);
      return;
    }
    window.scrollToSection?.(link.sectionId);
  };

  const contactLink = mainLinks.find((link) => link.name === "Contact");

  return (
    <section id="hero" className="relative min-h-[100dvh] lg:min-h-[100vh] lg:h-[100vh] w-full flex items-center overflow-hidden bg-black m-0 p-0 scroll-mt-0">
      {/* BACKGROUND WITH PARALLAX */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-[1.1]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.95)_100%)] z-10"></div>
      </motion.div>

      {/* AMBIENT FLOATING ELEMENTS */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-brand-gold/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 50, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute bottom-[10%] right-[5%] w-[40rem] h-[40rem] bg-brand-gold/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 z-20 flex min-h-[100dvh] lg:min-h-[100vh] lg:h-[100vh] flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-12 pt-[84px] pb-16 xs:pb-20 sm:pb-24 lg:pt-[100px] lg:pb-6">

        {/* RIGHT SIDE: IMAGE (Order 1 on mobile, 2 on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[40%] flex flex-col items-center justify-center order-1 lg:order-2 mt-4 lg:mt-0"
        >
          <div className="relative">
            {/* Majestic floating animation for Ganesha */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 0.5, 0, -0.5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ProgressiveImage
                src={ganeshImage}
                alt="Ganesha"
                className="relative z-10 h-[400px] xs:h-[460px] sm:h-[520px] lg:h-[clamp(360px,52vh,540px)] w-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
                fetchPriority="high"
                loading="eager"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-center max-w-lg px-4 flex flex-col items-center justify-center"
          >
            {/* 1. Quote (Very big, elegant, placed directly below Ganesha) */}
            {/* 1. Official Logo Image & Name (Mobile view branding, hidden on desktop) */}
            <div className="flex lg:hidden items-center justify-center gap-4 mb-4 sm:mb-6">
              <img src={logoImage} className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 object-contain drop-shadow-2xl" alt="Athiraa Logo" />
              <div className="flex flex-col text-left">
                <h2 className="text-base xs:text-lg sm:text-xl font-black tracking-[0.25em] uppercase text-white leading-none">
                  ATHIRAA
                </h2>
                <p className="text-[9px] xs:text-[10px] sm:text-[11px] tracking-[0.4em] text-brand-gold font-bold mt-2 leading-none uppercase">
                  CONSULTANTS
                </p>
              </div>
            </div>

            {/* Divider (visible only on mobile viewports, matching the above logo block) */}
            <div className="w-16 h-[1px] bg-brand-gold/30 mx-auto mb-4 sm:mb-6 lg:hidden"></div>

            {/* 2. Quote (Very big, elegant, placed below logo on mobile, directly below Ganesha on desktop) */}
            <p className="text-[18px] xs:text-[22px] sm:text-[26px] lg:text-[23px] xl:text-[26px] text-brand-gold font-playfair italic tracking-wide leading-relaxed font-light mb-4 sm:mb-6">
              "Prosperity begins with the right guidance."
            </p>

            {/* Divider below Quote for desktop only */}
            <div className="w-16 h-[1px] bg-brand-gold/30 mx-auto mb-4 sm:mb-6 hidden lg:block"></div>
          </motion.div>
        </motion.div>

        {/* LEFT SIDE: TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[60%] order-2 lg:order-1"
        >
          <div className="p-0 md:p-6 xl:p-12 transition-all duration-400 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-center lg:justify-start gap-6 mb-4 lg:mb-8"
            >
              <p className="text-xs sm:text-xs md:text-xs tracking-[0.5em] md:tracking-[0.7em] uppercase text-brand-gold font-black">
                Athiraa Consultants
              </p>
              <div className="w-20 h-[1px] bg-brand-gold/40 hidden md:block"></div>
            </motion.div>

            <h1 className="text-[2.75rem] xs:text-[3.25rem] sm:text-6xl lg:text-[3.8rem] xl:text-[4.25rem] font-playfair text-white leading-[1.15] tracking-tight mb-4 sm:mb-8 lg:mb-8 perspective-1000">
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                Trusted Financial Advisory for
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                Wealth, Growth, and <span className="italic text-brand-gold/90 font-light">Legacy.</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] xs:text-[18px] sm:text-xl xl:text-xl text-white/80 leading-relaxed mb-4 sm:mb-8 lg:mb-8 max-w-2xl font-light mx-auto lg:mx-0"
            >
              We provide personalised financial and advisory solutions designed to help individuals, families, and businesses create, grow, and protect wealth with clarity and confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center lg:justify-start text-white/70 font-light text-sm sm:text-xl mb-6 sm:mb-10 lg:mb-8 h-10 font-playfair"
            >
              <span className="mr-3 md:mr-4 text-white/50">Expertise in</span>
              <span className="font-medium text-white border-b border-brand-gold/40 pb-1">
                {displayText}
              </span>
              <span className="inline-block w-[3px] h-[16px] md:h-[22px] bg-brand-gold ml-3 animate-blink align-middle"></span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2.60, delay: 0.80, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={contactLink.to}
                onClick={(e) => handleHeroNav(e, contactLink)}
                className="w-full sm:w-auto px-8 py-3.5 sm:px-12 sm:py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] md:text-xs rounded-full transition-all duration-300 hover:bg-brand-gold hover:text-white shadow-2xl text-center magnetic"
              >
                Get Started
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={servicesOverviewLink.to}
                onClick={(e) => handleHeroNav(e, servicesOverviewLink)}
                className="w-full sm:w-auto px-8 py-3.5 sm:px-12 sm:py-5 border border-white/40 text-white font-black uppercase tracking-[0.4em] text-[10px] md:text-xs rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white text-center backdrop-blur-md magnetic"
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
