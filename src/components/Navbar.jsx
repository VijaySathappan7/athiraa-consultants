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

  const [activeSection, setActiveSection] = useState("hero");
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

  const sectionsRef = useRef([]);

  // Cache sections to avoid querySelectorAll in the scroll handler
  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll("section"));
  }, [location.pathname]);

  // 1. SCROLL SENSING & DIRECTION (Optimized for 120fps with jitter-immune scroll-stop state machine)
  useEffect(() => {
    let ticking = false;
    let scrollStopTimer = null;
    let lastRegisteredScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastRegisteredScrollY);

      // Only clear and reset the timer if the scroll delta is significant (active user scrolling).
      // If delta is tiny (inertia decay or micro-drifting), we allow the scheduled timer to fire.
      const isSignificantScroll = delta > 1.2;

      if (isSignificantScroll || currentScrollY <= 50) {
        if (scrollStopTimer) {
          clearTimeout(scrollStopTimer);
        }
      }

      // Hide the navbar during active scroll
      if (currentScrollY > 50) {
        if (isSignificantScroll) {
          setHidden(true);
        }

        // Schedule re-reveal after active scroll ceases
        if (isSignificantScroll || !scrollStopTimer) {
          scrollStopTimer = setTimeout(() => {
            setHidden(false);
          }, 200); // Snappy 200ms delay for instant perceived responsiveness
        }
      } else {
        setHidden(false);
      }

      lastRegisteredScrollY = currentScrollY;

      // Defer background layout styling updates to requestAnimationFrame for 120fps performance
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          setServicesOpen(false); // Smoothly collapse dropdown on scroll
          lastScrollY.current = window.scrollY;
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

  // 2. THEME SENSING USING INTERSECTION OBSERVER
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
          setActiveSection(entry.target.id);
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

    // Use MutationObserver instead of costly setInterval to watch for new sections
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
    const handleOutsideClick = (e) => {
      if (!e.target.closest("nav")) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // 3. SCROLL LOCK (Enhanced with Lenis lifecycle control)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [menuOpen]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);
    setServicesOpen(false);

    if (location.pathname !== link.to) {
      navigate(link.to);
    }

    // Instantly trigger the native smooth scroll without artificial delays
    if (window.scrollToSection) {
      window.scrollToSection(link.sectionId);
    }
  };

  const active = isWhite;
  const isServicesActive = [
    "services",
    "wealth-hero",
    "wealth-content",
    "corporate-hero",
    "corporate-content",
    "capital-markets-hero",
    "capital-markets-content",
    "real-estate-hero",
    "real-estate-content",
    "tax-hero",
    "tax-content"
  ].includes(activeSection);
  const contactLink = mainLinks.find((link) => link.name === "Contact");

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: (hidden && !menuOpen) ? -100 : 0 }}
        transition={{ duration: 0.40, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-[100] top-0 left-0 w-full rounded-none px-6 md:px-12 py-1 transition-all duration-500 ease-out ${(menuOpen || isDrawerActive)
          ? isWhite
            ? "bg-white/80 backdrop-blur-[30px] border-b border-black/[0.04] h-[100dvh] lg:h-auto"
            : "bg-[#0b0c10]/80 backdrop-blur-[30px] border-b border-white/10 h-[100dvh] lg:h-auto"
          : scrolled
            ? active
              ? "bg-white/60 backdrop-blur-[40px] border-b border-black/[0.04] shadow-[0_10px_45px_rgba(0,0,0,0.03)] h-auto"
              : "bg-[#0b0c10]/70 backdrop-blur-[40px] border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.15)] h-auto"
            : "bg-transparent border-b border-transparent h-auto"
          }`}
      >
        <div className="w-full flex items-center justify-between h-[52px] md:h-[68px] transition-all duration-500">

          {/* LOGO */}
          <a href="/" onClick={(e) => handleNavClick(e, mainLinks[0])} className="flex items-center gap-2.5 md:gap-3.5 group z-[150] magnetic">
            <img src={logo} className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl" alt="Athiraa Logo" />
            <div className="flex flex-col">
              <span className={`text-sm md:text-base font-black tracking-[0.25em] transition-colors duration-500 ${active ? "text-brand-primary" : "text-white"}`}>
                ATHIRAA
              </span>
              <p className="text-[8px] md:text-[9px] tracking-[0.4em] text-brand-gold font-bold mt-0.5 leading-none">
                CONSULTANTS
              </p>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8 text-[12px] xl:text-[13px] font-bold tracking-[0.2em] uppercase">
              {mainLinks.slice(0, 1).map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.to}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`transition-colors duration-300 relative group py-2 magnetic ${active ? "text-brand-primary" : "text-white"} ${isActive ? "text-brand-gold" : "hover:text-brand-gold"}`}
                    >
                      {link.name}
                      {isActive ? (
                        <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold rounded-full" />
                      ) : (
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 ease-[0.22, 1, 0.36, 1] group-hover:w-full"></span>
                      )}
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
                  className={`flex items-center gap-2 relative group py-2 transition-colors duration-300 uppercase font-bold tracking-[0.2em] magnetic ${active ? "text-brand-primary" : "text-white"} ${isServicesActive ? "text-brand-gold" : "hover:text-brand-gold"}`}
                >
                  <span>Services</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-700 ${servicesOpen ? 'rotate-180 text-brand-gold' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                  {isServicesActive ? (
                    <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold rounded-full" />
                  ) : (
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 ease-[0.22, 1, 0.36, 1] group-hover:w-full"></span>
                  )}
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.30 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 origin-top"
                    >
                      <div className={`w-80 rounded-[2rem] p-4 relative overflow-hidden transition-all duration-500 ${active
                        ? "bg-white/95 backdrop-blur-[40px] border border-black/[0.08] shadow-[0_30px_70px_rgba(0,0,0,0.12)]"
                        : "bg-[#0b0c10]/92 backdrop-blur-[40px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
                        }`}>
                        <div className="relative z-10 flex flex-col gap-1">
                          {serviceLinks.map((item) => (
                            <a
                              key={item.name}
                              href={item.to}
                              onClick={(e) => handleNavClick(e, item)}
                              className={`block px-6 py-4 rounded-2xl text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-500 ${active
                                ? "hover:bg-black/[0.04] text-brand-primary hover:text-brand-gold hover:pl-8"
                                : "hover:bg-white/[0.05] text-white/85 hover:text-brand-gold hover:pl-8"
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
                  className={`relative group py-2 text-[12px] xl:text-[13px] font-black uppercase transition-colors duration-300 magnetic ${active ? "text-brand-primary" : "text-white"
                    } hover:text-brand-gold`}
                >
                  <span className="tracking-[0.2em]">Bespoke</span>
                  <span className="text-brand-gold" style={{ letterSpacing: 'normal' }}>.</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-brand-gold transition-all duration-500 ease-out group-hover:w-full"></span>
                </button>
              </li>

              {mainLinks.slice(1).map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.to}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`transition-colors duration-300 relative group py-2 magnetic ${active ? "text-brand-primary" : "text-white"} ${isActive ? "text-brand-gold" : "hover:text-brand-gold"}`}
                    >
                      {link.name}
                      {isActive ? (
                        <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold rounded-full" />
                      ) : (
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 ease-out group-hover:w-full"></span>
                      )}
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
              className={`px-8 py-3.5 rounded-full text-[11px] tracking-[0.2em] font-black uppercase transition-all duration-500 shadow-xl magnetic ${active
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
              className={`lg:hidden fixed inset-0 z-[140] flex flex-col pt-32 px-10 pb-10 touch-none overflow-y-auto transition-colors duration-500 ${isWhite
                  ? "bg-white/95 backdrop-blur-[24px]"
                  : "bg-[#050505]/92 backdrop-blur-[24px]"
                }`}
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
                className={`mt-16 text-center py-6 rounded-2xl text-[11px] font-black tracking-[0.4em] uppercase shadow-2xl transition-all duration-500 ${isWhite
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
