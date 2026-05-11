import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/images/logo.webp';

const BespokeModal = lazy(() => import("./BespokeModal"));

const mainLinks = [
  { name: "Home", to: "/", sectionId: "hero" },
  { name: "Expertise", to: "/expertise", sectionId: "expertise" },
  { name: "About", to: "/about", sectionId: "why-choose-us" },
  { name: "Contact", to: "/contact", sectionId: "contact" }
];

const serviceLinks = [
  { name: "Wealth Management", to: "/services/wealth-management", sectionId: "wealth-hero" },
  { name: "Corporate Finance", to: "/services/corporate-finance", sectionId: "corporate-hero" },
  { name: "Capital Markets", to: "/services/capital-markets", sectionId: "capital-markets-hero" },
  { name: "Real Estate", to: "/services/real-estate", sectionId: "real-estate-hero" },
  { name: "Tax Advisory", to: "/services/tax-advisory", sectionId: "tax-hero" }
];

const servicesOverviewLink = {
  name: "Services",
  to: "/services",
  sectionId: "services"
};

// Light-background section IDs (these get white navbar)
const LIGHT_SECTIONS = new Set([
  "services",
  "wealth-content",
  "corporate-content",
  "capital-content",
  "real-estate-content",
  "tax-content",
  "expertise"
]);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWhite, setIsWhite] = useState(false);
  const [bespokeOpen, setBespokeOpen] = useState(false);

  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => {
        setIsDrawerActive(true);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsDrawerActive(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  // 1. SCROLL SENSING & DIRECTION (Cinematic headroom with idle auto-reveal)
  useEffect(() => {
    let ticking = false;
    let scrollStopTimer = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY <= 50;

      if (isAtTop) {
        setHidden(false);
        if (scrollStopTimer) {
          clearTimeout(scrollStopTimer);
          scrollStopTimer = null;
        }
      } else {
        const diff = currentScrollY - lastScrollY.current;
        const isSignificant = Math.abs(diff) > 1.5;

        if (isSignificant) {
          if (diff > 0) {
            // Scrolling DOWN -> HIDE navbar smoothly
            setHidden(true);
          } else {
            // Scrolling UP -> SHOW navbar smoothly
            setHidden(false);
          }

          // Clear previous idle timer during active scroll
          if (scrollStopTimer) {
            clearTimeout(scrollStopTimer);
          }

          // Automatically reveal navbar after 350ms of inactivity (idle)
          scrollStopTimer = setTimeout(() => {
            setHidden(false);
          }, 350);
        }
      }

      // Synchronously record current scroll position to guarantee zero lag
      lastScrollY.current = currentScrollY;

      // Defer background aesthetic state updates to requestAnimationFrame for 120fps performance
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          setServicesOpen(false); // Smoothly collapse dropdown on scroll
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
    };
  }, []);

  // 2. THEME SENSING USING INTERSECTION OBSERVER (Purely background-responsive, no scrollspy highlighting)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setIsWhite(LIGHT_SECTIONS.has(entry.target.id));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const observedSections = new Set();

    const updateObservation = () => {
      const sections = document.querySelectorAll("main > section, main > div[id]");
      sections.forEach((section) => {
        if (section.id && !observedSections.has(section.id)) {
          observer.observe(section);
          observedSections.add(section.id);
        }
      });
    };

    updateObservation();

    // Watch for new sections dynamically without costly polling
    const mutationObserver = new MutationObserver(() => {
      updateObservation();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Click Outside to Dismiss Services Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesOpen && !event.target.closest(".group")) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesOpen]);

  // 3. SCROLL LOCK
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [menuOpen]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);
    setServicesOpen(false);

    if (location.pathname !== link.to) {
      navigate(link.to + '#' + link.sectionId);
    } else {
      // Same page: delay slightly for mobile drawer animations to start closing and lenis to unlock
      setTimeout(() => {
        if (window.scrollToSection) {
          window.scrollToSection(link.sectionId);
        }
      }, 100);
    }
  };

  const contactLink = mainLinks.find((link) => link.name === "Contact");

  return (
    <>
      <motion.nav
        style={{ willChange: "transform, opacity, filter" }}
        initial={{ y: "-110%", opacity: 0, filter: "blur(12px)" }}
        animate={{
          y: (hidden && !menuOpen) ? "-110%" : "0%",
          opacity: (hidden && !menuOpen) ? 0 : 1,
          filter: (hidden && !menuOpen) ? "blur(12px)" : "blur(0px)"
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-[100] top-0 left-0 w-full rounded-none px-6 md:px-12 py-1 transition-all duration-500 ease-out ${(menuOpen || isDrawerActive)
          ? isWhite
            ? "bg-white/80 backdrop-blur-[30px] border-b border-black/[0.04] h-[100dvh] lg:h-auto"
            : "bg-[#0b0c10]/80 backdrop-blur-[30px] border-b border-white/10 h-[100dvh] lg:h-auto"
          : scrolled
            ? isWhite
              ? "bg-white/60 backdrop-blur-[40px] border-b border-black/[0.04] shadow-[0_10px_45px_rgba(0,0,0,0.03)] h-auto"
              : "bg-[#0b0c10]/70 backdrop-blur-[40px] border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.15)] h-auto"
            : "bg-transparent border-b border-transparent h-auto"
          }`}
      >
        <div className="w-full flex items-center justify-between h-[42px] md:h-[54px] transition-all duration-500">

          {/* LOGO */}
          <a href="/" onClick={(e) => handleNavClick(e, mainLinks[0])} className="flex items-center gap-2 md:gap-3 group z-[150] magnetic">
            <img src={logo} className="w-6.5 h-6.5 md:w-7.5 md:h-7.5 object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl" alt="Athiraa Logo" />
            <div className="flex flex-col">
              <span className={`text-xs md:text-sm font-black tracking-[0.25em] transition-colors duration-500 ${isWhite ? "text-brand-primary" : "text-white"}`}>
                ATHIRAA
              </span>
              <p className="text-[6.5px] md:text-[7.5px] tracking-[0.4em] text-brand-gold font-bold mt-0.5 leading-none">
                CONSULTANTS
              </p>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6.5 text-[10px] xl:text-[11px] font-bold tracking-[0.2em] uppercase">
              {mainLinks.slice(0, 1).map((link) => {
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.to}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`transition-colors duration-300 relative py-2 magnetic ${isWhite ? "text-brand-primary hover:text-brand-gold" : "text-white hover:text-brand-gold"}`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}

              {/* SERVICES DROPDOWN */}
              <li
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, servicesOverviewLink)}
                  className={`flex items-center gap-1.5 relative py-2 transition-colors duration-300 uppercase font-bold tracking-[0.2em] magnetic ${isWhite ? "text-brand-primary hover:text-brand-gold" : "text-white hover:text-brand-gold"}`}
                >
                  <span>Services</span>
                  <svg className={`w-3 h-3 transition-transform duration-700 ${servicesOpen ? 'rotate-180 text-brand-gold' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.30 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3.5 origin-top"
                    >
                      <div className={`w-64 rounded-[1.6rem] p-3 relative overflow-hidden transition-all duration-500 ${isWhite
                        ? "bg-white/95 backdrop-blur-[40px] border border-black/[0.08] shadow-[0_30px_70px_rgba(0,0,0,0.12)]"
                        : "bg-[#0b0c10]/92 backdrop-blur-[40px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
                        }`}>
                        <div className="relative z-10 flex flex-col gap-0.5">
                          {serviceLinks.map((item) => (
                            <a
                              key={item.name}
                              href={item.to}
                              onClick={(e) => handleNavClick(e, item)}
                              className={`block px-5 py-3 rounded-xl text-[9px] font-bold tracking-[0.15em] uppercase transition-all duration-500 ${isWhite
                                ? "hover:bg-black/[0.04] text-brand-primary hover:text-brand-gold hover:pl-6.5"
                                : "hover:bg-white/[0.05] text-white/85 hover:text-brand-gold hover:pl-6.5"
                                }`}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* BESPOKE NAV ITEM */}
              <li>
                <button
                  type="button"
                  onClick={() => setBespokeOpen(true)}
                  className={`relative py-2 text-[10px] xl:text-[11px] font-black uppercase transition-colors duration-300 magnetic ${isWhite ? "text-brand-primary hover:text-brand-gold" : "text-white hover:text-brand-gold"}`}
                >
                  <span className="tracking-[0.2em]">Bespoke</span>
                  <span className="text-brand-gold" style={{ letterSpacing: 'normal' }}>.</span>
                </button>
              </li>

              {mainLinks.slice(1).map((link) => {
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.to}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`transition-colors duration-300 relative py-2 magnetic ${isWhite ? "text-brand-primary hover:text-brand-gold" : "text-white hover:text-brand-gold"}`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={contactLink.to}
              onClick={(e) => handleNavClick(e, contactLink)}
              className={`px-6 py-2.5 rounded-full text-[9px] tracking-[0.2em] font-black uppercase transition-all duration-500 shadow-xl magnetic ${isWhite
                ? "bg-brand-primary text-white hover:bg-brand-gold"
                : "bg-white text-black hover:bg-brand-gold hover:text-white"
                }`}
            >
              Get Started
            </motion.a>
          </div>

          {/* MOBILE TRIGGER */}
          <button
            type="button"
            className="lg:hidden flex flex-col gap-[6px] p-2 z-[150] relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`w-7 h-[2.5px] rounded-full transition-all duration-500 ${isWhite ? "bg-brand-primary" : "bg-white"} ${menuOpen ? 'rotate-45 translate-y-[8.5px]' : ''}`}></span>
            <span className={`w-7 h-[2.5px] rounded-full transition-all duration-500 ${isWhite ? "bg-brand-primary" : "bg-white"} ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-7 h-[2.5px] rounded-full transition-all duration-500 ${isWhite ? "bg-brand-primary" : "bg-white"} ${menuOpen ? '-rotate-45 -translate-y-[8.5px]' : ''}`}></span>
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, x: "100%" },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.30,
                    ease: [0.22, 1, 0.36, 1],
                    when: "beforeChildren",
                    staggerChildren: 0.05
                  }
                },
                exit: {
                  opacity: 0,
                  x: "100%",
                  transition: {
                    duration: 0.30,
                    ease: [0.22, 1, 0.36, 1],
                    when: "afterChildren",
                    staggerChildren: 0.04,
                    staggerDirection: -1
                  }
                }
              }}
              className={`lg:hidden fixed inset-0 z-[140] flex flex-col pt-32 px-10 pb-10 overflow-y-auto custom-scrollbar transition-colors duration-500 ${isWhite
                ? "bg-white/95 backdrop-blur-[24px]"
                : "bg-[#050505]/92 backdrop-blur-[24px]"
                }`}
              data-lenis-prevent="true"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.30 } },
                  exit: { opacity: 0, y: 10 }
                }}
                className={`text-[10px] tracking-[0.5em] uppercase font-black mb-8 border-l-2 pl-4 transition-colors duration-500 ${isWhite ? "text-brand-primary/45 border-brand-gold/60" : "text-brand-gold border-brand-gold"
                  }`}
              >
                Navigation
              </motion.p>

              <div className="flex flex-col gap-6">
                {mainLinks.slice(0, 1).map((link) => (
                  <motion.a
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.30, ease: [0.22, 1, 0.36, 1] } },
                      exit: { opacity: 0, x: 20, transition: { duration: 0.30 } }
                    }}
                    key={link.name}
                    href={link.to}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`text-2xl font-black tracking-[0.1em] uppercase transition-colors duration-500 ${isWhite ? "text-brand-primary hover:text-brand-gold" : "text-white hover:text-brand-gold"
                      }`}
                  >
                    {link.name}
                  </motion.a>
                ))}

                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.30, ease: [0.22, 1, 0.36, 1] } },
                    exit: { opacity: 0, x: 20, transition: { duration: 0.30 } }
                  }}
                  onClick={() => { setMenuOpen(false); setTimeout(() => setBespokeOpen(true), 300); }}
                  className={`text-2xl font-black uppercase text-left transition-colors duration-500 ${isWhite ? "text-brand-primary hover:text-brand-gold" : "text-white hover:text-brand-gold"
                    }`}
                >
                  <span className="tracking-[0.1em]">Bespoke</span>
                  <span className="text-brand-gold" style={{ letterSpacing: 'normal' }}>.</span>
                </motion.button>

                {mainLinks.slice(1).map((link) => (
                  <motion.a
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.30, ease: [0.22, 1, 0.36, 1] } },
                      exit: { opacity: 0, x: 20, transition: { duration: 0.30 } }
                    }}
                    key={link.name}
                    href={link.to}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`text-2xl font-black tracking-[0.1em] uppercase transition-colors duration-500 ${isWhite ? "text-brand-primary hover:text-brand-gold" : "text-white hover:text-brand-gold"
                      }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.30 } },
                  exit: { opacity: 0, y: 10 }
                }}
                className={`text-[10px] tracking-[0.5em] uppercase font-black mt-16 mb-8 border-l-2 pl-4 transition-colors duration-500 ${isWhite ? "text-brand-primary/45 border-brand-gold/60" : "text-brand-gold border-brand-gold"
                  }`}
              >
                Our Services
              </motion.p>

              <div className="grid gap-4">
                {serviceLinks.map((item) => (
                  <motion.a
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.30, ease: [0.22, 1, 0.36, 1] } },
                      exit: { opacity: 0, x: 20, transition: { duration: 0.30 } }
                    }}
                    key={item.name}
                    href={item.to}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`text-sm font-bold tracking-[0.1em] uppercase transition-colors duration-500 ${isWhite ? "text-brand-primary/65 hover:text-brand-gold" : "text-white/60 hover:text-brand-gold"
                      }`}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>

              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.30, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, y: 20 }
                }}
                whileTap={{ scale: 0.95 }}
                href={contactLink.to}
                onClick={(e) => handleNavClick(e, contactLink)}
                className={`mt-16 text-center py-4.5 rounded-xl text-[11px] font-black tracking-[0.4em] uppercase shadow-2xl transition-all duration-500 ${isWhite
                  ? "bg-brand-primary text-white hover:bg-brand-gold hover:text-white"
                  : "bg-white text-black hover:bg-brand-gold hover:text-white"
                  }`}
              >
                Get Started
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* BESPOKE POPUP MODAL */}
      <Suspense fallback={null}>
        <BespokeModal open={bespokeOpen} onClose={() => setBespokeOpen(false)} />
      </Suspense>
    </>
  );
};

export default Navbar;
