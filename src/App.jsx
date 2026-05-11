import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import InViewSection from './components/InViewSection';
import SEO from './components/SEO';
import JSONLD from './components/JSONLD';

import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';

const WealthHero = lazy(() => import('./components/WealthHero'));
const WealthContent = lazy(() => import('./components/WealthContent'));
const CorporateFinanceHero = lazy(() => import('./components/CorporateFinanceHero'));
const CorporateFinanceContent = lazy(() => import('./components/CorporateFinanceContent'));
const CapitalMarketsHero = lazy(() => import('./components/CapitalMarketsHero'));
const CapitalMarketsContent = lazy(() => import('./components/CapitalMarketsContent'));
const RealEstateHero = lazy(() => import('./components/RealEstateHero'));
const RealEstateContent = lazy(() => import('./components/RealEstateContent'));
const TaxHero = lazy(() => import('./components/TaxHero'));
const TaxContent = lazy(() => import('./components/TaxContent'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Expertise = lazy(() => import('./components/Expertise'));
const Contact = lazy(() => import('./components/Contact'));

const routeSections = {
  "/": "hero",
  "/about": "why-choose-us",
  "/expertise": "expertise",
  "/contact": "contact",
  "/services": "services",
  "/services/wealth-management": "wealth-hero",
  "/services/corporate-finance": "corporate-hero",
  "/services/capital-markets": "capital-markets-hero",
  "/services/real-estate": "real-estate-hero",
  "/services/tax-advisory": "tax-hero"
};

const scrollToSection = (sectionId, immediate = false, attempt = 0) => {
  // Fire event to instantly mount targeted deferred sections
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nav-mount-section', { detail: { sectionId } }));
  }

  const section = document.getElementById(sectionId);
  if (!section) {
    if (attempt < 180) {
      requestAnimationFrame(() => scrollToSection(sectionId, immediate, attempt + 1));
    }
    return;
  }

  const triggerActiveAnimation = () => {
    section.classList.add('section-navigated-active');
    setTimeout(() => {
      section.classList.remove('section-navigated-active');
    }, 1500);
  };

  if (window.lenis) {
    window.lenis.scrollTo(section, {
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential glide
      offset: 0,
      onComplete: triggerActiveAnimation
    });
    return;
  }

  if (immediate) {
    window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY);
    triggerActiveAnimation();
    return;
  }

  const targetY = section.getBoundingClientRect().top + window.scrollY;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 1200;
  let startTime = null;

  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      triggerActiveAnimation();
    }
  };

  requestAnimationFrame(step);
};

if (typeof window !== 'undefined') {
  window.scrollToSection = scrollToSection;
}

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(15px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(10px)' }
};

const pageTransition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1]
};

const getSectionForLocation = (location) => {
  if (location.hash) {
    return location.hash.replace('#', '');
  }

  return routeSections[location.pathname] || routeSections['/'];
};

function RouteScrollManager({ enabled }) {
  const location = useLocation();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    scrollToSection(getSectionForLocation(location));
  }, [enabled, location]);

  return null;
}

function LandingPage() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={pageTransition}
      className="relative"
    >
      <Hero />
      <Services />

      <InViewSection id="wealth-hero" estimatedHeight="105vh" component={WealthHero} />
      <InViewSection id="wealth-content" estimatedHeight="120vh" component={WealthContent} />

      <InViewSection id="corporate-hero" estimatedHeight="105vh" component={CorporateFinanceHero} />
      <InViewSection id="corporate-content" estimatedHeight="120vh" component={CorporateFinanceContent} />

      <InViewSection id="capital-markets-hero" estimatedHeight="105vh" component={CapitalMarketsHero} />
      <InViewSection id="capital-markets-content" estimatedHeight="120vh" component={CapitalMarketsContent} />

      <InViewSection id="real-estate-hero" estimatedHeight="105vh" component={RealEstateHero} />
      <InViewSection id="real-estate-content" estimatedHeight="120vh" component={RealEstateContent} />

      <InViewSection id="tax-hero" estimatedHeight="105vh" component={TaxHero} />
      <InViewSection id="tax-content" estimatedHeight="120vh" component={TaxContent} />

      <InViewSection id="why-choose-us" estimatedHeight="105vh" component={WhyChooseUs} />
      <InViewSection id="expertise" estimatedHeight="120vh" component={Expertise} />
      <InViewSection id="contact" estimatedHeight="100vh" component={Contact} />
      
      <Footer />
    </motion.main>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true, // Universally enable smooth scroll for mouse/trackpad, even on hybrid laptops with touchscreens!
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5, // Natural sensitivity setting for touch scrolls
      syncTouch: false, // Allows mobile and tablet browsers to run native, high-performance compositor-thread swipe scrolling
    });

    window.lenis = lenis;

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen onAnimationEnd={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-gold/30 relative">
      {/* GLOBAL AESTHETICS */}
      <div className="noise-overlay" />
      <CustomCursor />
      
      <SEO />
      <JSONLD />
      <Navbar />
      <RouteScrollManager enabled />
      
      <LandingPage />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
