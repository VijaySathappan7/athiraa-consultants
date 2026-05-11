import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.webp';

const mainLinks = [
  { name: "Home", to: "/", sectionId: "hero" },
  { name: "About", to: "/about", sectionId: "why-choose-us" },
  { name: "Expertise", to: "/expertise", sectionId: "expertise" },
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

const footerLinkGroups = [
  {
    title: "Solutions",
    links: serviceLinks
  },
  {
    title: "Company",
    links: [
      { ...mainLinks[1], name: "About Us" },
      servicesOverviewLink,
      { ...mainLinks[2], name: "Our Expertise" },
      { ...mainLinks[3], name: "Contact Us" }
    ]
  }
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [activeModal]);

  const footerLinks = [
    ...footerLinkGroups,
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", id: "privacy" },
        { name: "Terms of Engagement", id: "terms" },
        { name: "Cookie Policy", id: "cookie" },
        { name: "Disclaimers", id: "disclaimers" }
      ]
    }
  ];

  const socialLinks = [
    { name: "LinkedIn" },
    { name: "Twitter" },
    { name: "Instagram" }
  ];

  const legalContent = {
    privacy: {
      title: "Privacy & Confidentiality Policy",
      subtitle: "Data Protection Framework under the DPDP Act, 2023",
      sizeClass: "max-w-4xl w-[95vw] lg:w-full h-[85vh] md:h-[80vh]",
      sections: [
        {
          heading: "1. Information Collection Architecture",
          content: "As a premier advisory firm, we collect personal and corporate data strictly for the evaluation of potential mandates. This includes identity contours, corporate balance sheets, tax filings, and real estate asset registries provided voluntarily during exploratory offline or email communications."
        },
        {
          heading: "2. Non-Transactional Web Environment",
          content: "This digital portal does not harvest transactional data, credit card metadata, or banking credentials. We do not employ automated payment gateways. Web telemetry is restricted to basic session analytics without individual profiling."
        },
        {
          heading: "3. Confidentiality & Non-Disclosure",
          content: "All client information, prospective business models, and financial structures are treated under the strictest doctrines of corporate confidentiality. We do not sell, lease, or syndicate client data to third-party marketing entities under any circumstances."
        },
        {
          heading: "4. Statutory Disclosures",
          content: "Information may only be disclosed to third parties if legally subpoenaed by statutory authorities, including the Income Tax Department, Enforcement Directorate, or under obligations of the Prevention of Money Laundering Act (PMLA), 2002."
        },
        {
          heading: "5. Data Retention & Erasure",
          content: "We retain exploratory data only for the duration necessary to formulate advisory proposals. Upon explicit request, or if a mandate is not executed, data is securely purged in compliance with the Digital Personal Data Protection (DPDP) Act, 2023."
        },
        {
          heading: "6. Grievance Redressal Mechanism",
          content: "For any concerns regarding data handling or to request erasure under the DPDP Act, clients may direct communications to our designated Grievance Redressal Officer at legal@athiraaconsultants.in."
        }
      ]
    },
    terms: {
      title: "Terms of Engagement",
      subtitle: "Governing Framework for Strategic & Financial Advisory Mandates",
      sizeClass: "max-w-5xl w-[95vw] lg:w-full h-[85vh] md:h-[80vh]",
      sections: [
        {
          heading: "1. Nature of Engagement",
          content: "Athiraa Consultants acts exclusively as a strategic advisor. Our mandates encompass corporate finance structuring, wealth management coordination, real estate advisory, and tax consulting. We do not execute trades, hold client funds, or act as a principal or underwriter in any financial transaction."
        },
        {
          heading: "2. No Fiduciary Duty & Information Reliance",
          content: "Our advisory services are provided based on the financial and corporate information furnished by the client. We assume no independent obligation to verify the accuracy or completeness of such data. Our engagement does not create a fiduciary relationship beyond the scope of a mutually signed advisory mandate."
        },
        {
          heading: "3. Absence of Transactional Capability",
          content: "This website operates solely as a digital brochure and informational portal. We do not process online financial transactions, accept digital payments, or facilitate electronic fund transfers. All commercial engagements are executed via offline, physical or electronically signed bipartite mandate letters governed by the Indian Contract Act, 1872."
        },
        {
          heading: "4. Non-SEBI Portfolio Manager Limitation",
          content: "Athiraa Consultants provides macro-level strategic management consulting and transaction structuring. We are not registered as a Portfolio Manager, Stock Broker, or Mutual Fund Distributor under the Securities and Exchange Board of India (SEBI). Clients must consult SEBI-registered intermediaries for direct equity execution."
        },
        {
          heading: "5. Intellectual Property Rights",
          content: "The site architecture, visual assets, methodologies, and proprietary financial structuring models displayed herein remain the exclusive intellectual property of Athiraa Consultants. Unauthorised reproduction or commercial deployment is strictly prohibited under the Copyright Act, 1957."
        },
        {
          heading: "6. Limitation of Liability",
          content: "In no event shall Athiraa Consultants, its partners, or affiliates be held liable for any indirect, consequential, or punitive damages arising from the implementation of our strategic advice. Liability is strictly capped to the professional fees received under a specific executed mandate."
        },
        {
          heading: "7. Governing Law & Dispute Resolution",
          content: "All engagements and interpretations of this portal shall be governed by the laws of the Republic of India. Disputes shall be subject to binding arbitration under the Arbitration and Conciliation Act, 1996, with the exclusive seat of arbitration in Chennai, Tamil Nadu."
        }
      ]
    },
    cookie: {
      title: "Cookie & Telemetry Policy",
      subtitle: "Session Management & Analytics Framework",
      sizeClass: "max-w-4xl w-[95vw] lg:w-full h-[85vh] md:h-[80vh]",
      sections: [
        {
          heading: "1. Infrastructure & Telemetry",
          content: "To deliver a premium, high-performance web experience, Athiraa Consultants utilizes minimal, non-intrusive cookies. These are strictly engineered for site performance, asset loading optimization, and global layout stability."
        },
        {
          heading: "2. Strictly Necessary Cookies",
          content: "These foundational files govern internal state management, such as the initial loading splash screens, interactive viewport animations, and cache warming for high-resolution graphics. They are immune to tracking and collect zero personally identifiable information (PII)."
        },
        {
          heading: "3. Analytical Processing",
          content: "We deploy passive analytics to measure aggregate engagement metrics—such as time spent on core pillar pages (Wealth Management, Corporate Finance). This aggregated intelligence dictates our UI/UX refinement roadmap."
        },
        {
          heading: "4. Zero Advertising Trackers",
          content: "Our platform is devoid of third-party advertising cookies, cross-site trackers, or marketing pixels. Your browsing habits on this portal are never commodified or shared with external advertising networks."
        },
        {
          heading: "5. Consent & Browser Configurations",
          content: "By continuing to navigate this portal, you accede to our minimal telemetry framework. Users retain the autonomy to disable cookies via browser parameters, acknowledging that specific cinematic animations may degrade."
        }
      ]
    },
    disclaimers: {
      title: "Statutory Disclaimers",
      subtitle: "Regulatory Limitations & Scope of Advisory",
      sizeClass: "max-w-4xl w-[95vw] lg:w-full h-[85vh] md:h-[80vh]",
      sections: [
        {
          heading: "1. Financial Advisory & Market Volatility",
          content: "All macroeconomic forecasts, debt syndication models, and wealth structuring strategies are formulated on current market paradigms. Financial markets are inherently volatile; past structuring successes are not indicative of future yield or capital preservation guarantees."
        },
        {
          heading: "2. Regulatory Alignment (SEBI & RBI)",
          content: "Athiraa Consultants operates strictly as a consultant and facilitator. We do not manage funds or operate as a Non-Banking Financial Company (NBFC) under Reserve Bank of India (RBI) directives, nor as an Investment Adviser under SEBI regulations. All equity and debt executions must be routed through registered intermediaries."
        },
        {
          heading: "3. Tax Compliance & Legislative Amendments",
          content: "Tax advisory structures are modeled upon the extant provisions of the Income Tax Act, 1961, and current CBDT circulars. Legislative amendments in the Union Budget or subsequent judicial pronouncements may retroactively or prospectively alter the efficacy of proposed tax structures."
        },
        {
          heading: "4. Real Estate & RERA Verification",
          content: "Real estate advisory is limited to strategic asset allocation and transaction structuring. While due diligence is exercised, Athiraa Consultants explicitly disclaims liability for title defects or builder non-compliance under the Real Estate (Regulation and Development) Act, 2016 (RERA). Independent legal verification of titles is strictly advised."
        }
      ]
    }
  };

  const handleFooterNav = (e, link) => {
    e.preventDefault();

    // Instantly release scroll locks to ensure touch scrolling is active immediately
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (window.lenis) {
      window.lenis.start();
    }

    if (location.pathname !== link.to) {
      navigate(link.to + '#' + link.sectionId);
    } else {
      setTimeout(() => {
        window.scrollToSection?.(link.sectionId);
      }, 250);
    }
  };

  const homeLink = mainLinks[0];

  return (
    <footer className="bg-black pt-16 pb-10 relative overflow-hidden border-t border-white/5">
      {/* Decorative Gradient Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12 transform-gpu">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a
              href={homeLink.to}
              onClick={(e) => handleFooterNav(e, homeLink)}
              className="flex items-center gap-4 mb-5 w-fit"
            >
              <img src={logo} alt="Athiraa Logo" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="text-white font-montserrat font-black text-xl tracking-[0.2em] uppercase">Athiraa</h3>
                <p className="text-brand-gold text-[10px] tracking-[0.4em] uppercase font-bold">Consultants</p>
              </div>
            </a>
            <p className="text-white/50 font-light leading-relaxed max-w-sm mb-6 text-[11px]">
              Personalised advisory for wealth creation, growth, and legacy. We combine deep knowledge with strategic clarity to build your financial future.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  type="button"
                  onClick={(e) => handleFooterNav(e, mainLinks[3])}
                  className="text-white/40 hover:text-brand-gold transition-colors duration-300 text-xs font-bold tracking-widest uppercase"
                >
                  {social.name}
                </button>
              ))}
            </div>
          </div>
 
          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-montserrat font-bold text-[11px] tracking-widest uppercase mb-5 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {section.title === "Legal" ? (
                      <button 
                        onClick={() => setActiveModal(link.id)}
                        className="text-white/40 hover:text-white transition-all duration-300 text-[11px] font-light hover:translate-x-2 inline-block text-left uppercase tracking-wider"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a 
                        href={link.to}
                        onClick={(e) => handleFooterNav(e, link)}
                        className="text-white/40 hover:text-white transition-all duration-300 text-[11px] font-light hover:translate-x-2 inline-block uppercase tracking-wider"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
 
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/30 text-[9px] tracking-[0.2em] uppercase font-bold">
            © {currentYear} Athiraa Consultants. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
            <span className="text-white/50 text-[10px] font-light uppercase tracking-widest">Chennai & Bengaluru | Pan-India</span>
          </div>
        </div>
      </div>

      {/* LEGAL POPUP MODAL SYSTEM */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 overflow-hidden">
              {/* Backdrop Blur Overlay */}
              <motion.div
                key="legal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-[15px] cursor-pointer z-10"
              />

              {/* Modal Box */}
              <motion.div
                key="legal-modal-box"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                className={`relative ${legalContent[activeModal].sizeClass} bg-black/75 backdrop-blur-[30px] border-[0.5px] border-brand-gold/25 rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] flex flex-col z-20`}
              >
                {/* Real Wood & Linen Texture Overlays */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] z-20" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] z-20" />
                
                {/* Top Banner Header */}
                <div className="p-6 md:p-8 border-b border-white/5 bg-black/40 flex items-start justify-between relative z-30 shrink-0">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                      <span className="text-[9px] tracking-[0.3em] text-brand-gold uppercase font-bold">
                        Athiraa Legal Framework
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-playfair font-black text-white">
                      {legalContent[activeModal].title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-white/50 font-light mt-1.5 tracking-wider">
                      {legalContent[activeModal].subtitle}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0 ml-4"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Scrollable Document Content */}
                <div 
                  className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 md:space-y-10 relative z-30 custom-scrollbar"
                  data-lenis-prevent="true"
                >
                  {legalContent[activeModal].sections.map((sec, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-sm md:text-base font-montserrat font-bold text-white tracking-widest uppercase border-l-2 border-brand-gold pl-4">
                        {sec.heading}
                      </h4>
                      <p className="text-xs md:text-sm font-light text-white/70 leading-relaxed pl-4 pr-2 text-justify">
                        {sec.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom Sticky Policy Footer */}
                <div className="p-4 md:p-6 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row justify-between items-center gap-3 relative z-30 text-[9px] tracking-[0.2em] text-white/30 uppercase font-bold shrink-0">
                  <div>Athiraa Consultants | Legal & Compliance Division</div>
                  <div>© 2026 Chennai & Bengaluru, India</div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </footer>
  );
};

export default Footer;
