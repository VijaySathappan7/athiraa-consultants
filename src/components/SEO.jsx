import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const metaData = {
  "/": {
    title: "Athiraa Consultants",
    description: "Athiraa Consultants — India's trusted financial advisory firm for wealth management, corporate finance, real estate, and tax planning. Personalised solutions built on trust.",
    keywords: "financial advisory India, wealth management, corporate finance, tax advisory, real estate advisory, Athiraa Consultants",
    ogTitle: "Athiraa Consultants | Trusted Financial Advisory",
    ogDescription: "Personalised financial solutions for wealth, growth, and legacy. Built on trust, driven by vision."
  },
  "/about": {
    title: "About Us | Athiraa Consultants",
    description: "Learn about Athiraa Consultants, an elite Indian financial advisory firm. Our team brings deep expertise in wealth management, corporate structuring, tax, and property advisory.",
    keywords: "about Athiraa Consultants, trusted financial advisors India, wealth preservation experts, corporate financial strategies",
    ogTitle: "About Us | Athiraa Consultants",
    ogDescription: "A trusted financial advisory team with institutional precision and a focus on integrity, transparency, and family office advisory."
  },
  "/expertise": {
    title: "Our Expertise | Athiraa Consultants",
    description: "Discover our specialized financial advisory services spanning Personal Wealth, Corporate Finance, Real Estate, and Structured Tax Advisory with transparent SEBI-aligned execution.",
    keywords: "wealth management, corporate capital advisory, real estate investment, tax advisory India",
    ogTitle: "Our Services & Expertise | Athiraa Consultants",
    ogDescription: "Tailored strategic advisory from seasoned professionals to help you grow, protect, and pass on your capital legacy seamlessly."
  },
  "/services": {
    title: "Our Services | Athiraa Consultants",
    description: "Explore our strategic advisory services: Private Wealth Planning, Debt Management, Capital Raising, Property Acquisition, and Family Office Compliance.",
    keywords: "family office advisory, corporate finance, tax advisory, real estate investment services",
    ogTitle: "Our Services | Athiraa Consultants",
    ogDescription: "Discover tailored financial strategies for individual prosperity and business growth."
  },
  "/services/wealth-management": {
    title: "Wealth Management | Athiraa Consultants",
    description: "Strategic investment planning, Direct Equity, Sovereign Gold Bonds, Mutual Funds, and Succession Planning designed to compound your generational family legacy with absolute transparency.",
    keywords: "wealth management, investment planning, direct equity India, sovereign gold bonds, estate planning",
    ogTitle: "Private Wealth Management | Athiraa Consultants",
    ogDescription: "Bespoke wealth management and succession strategy designed to compound and protect your legacy with elite Indian market research."
  },
  "/services/corporate-finance": {
    title: "Corporate Finance | Athiraa Consultants",
    description: "Structured capital advisory, debt management, and customized business growth strategies designed to optimize corporate performance and fuel sustainable market scaling.",
    keywords: "corporate finance, capital advisory, debt management, business growth strategy, raise capital",
    ogTitle: "Corporate Finance Advisory | Athiraa Consultants",
    ogDescription: "Unlock corporate scaling with structured capital, strategic debt management, and sustainable growth advisory."
  },
  "/services/capital-markets": {
    title: "Capital Markets | Athiraa Consultants",
    description: "Navigate public equity, private placements, syndication, IPO preparation, and strategic market listings with our experienced institutional capital market advisory.",
    keywords: "capital markets, equity syndication, IPO planning, private placement, debt syndicate",
    ogTitle: "Capital Markets Advisory | Athiraa Consultants",
    ogDescription: "Navigate complex capital listings, syndication, and public/private market placements with seasoned advisors."
  },
  "/services/real-estate": {
    title: "Real Estate Advisory | Athiraa Consultants",
    description: "End-to-end institutional property advisory. Comprehensive market research, acquisition strategy, and rental portfolio management for commercial, residential, and industrial properties.",
    keywords: "real estate advisory, commercial property investment, rental management, land acquisition India",
    ogTitle: "Real Estate Advisory | Athiraa Consultants",
    ogDescription: "Unlock premium real estate opportunities with rigorous market research, asset management, and structured acquisitions."
  },
  "/services/tax-advisory": {
    title: "Tax Advisory | Athiraa Consultants",
    description: "Professional tax planning, regulatory compliance, family office accounting, and structured tax optimization for high-net-worth individuals, NRIs, and Indian corporations.",
    keywords: "tax advisory, tax planning India, family office compliance, corporate tax filing, NRI tax advice",
    ogTitle: "Tax & Compliance Advisory | Athiraa Consultants",
    ogDescription: "Minimize liabilities and stay fully compliant under the latest direct and indirect Indian tax codes."
  },
  "/contact": {
    title: "Contact Us | Athiraa Consultants",
    description: "Get in touch with our expert advisors in Chennai for a confidential consultation regarding wealth, corporate capital, tax, or property investments.",
    keywords: "contact Athiraa Consultants, financial advisory Chennai, hire wealth managers, confidential consultation",
    ogTitle: "Connect With Our Advisory Team | Athiraa Consultants",
    ogDescription: "Speak directly with our strategic wealth, corporate finance, real estate, and tax consultants in Chennai."
  }
};

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentMeta = metaData[currentPath] || metaData["/"];

    // Update document title
    document.title = currentMeta.title;

    // Helper to update or inject meta tags
    const updateMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, value);
      } else {
        // Create if it doesn't exist
        const isProperty = selector.includes('property');
        const newElement = document.createElement('meta');
        if (isProperty) {
          const propName = selector.match(/property="([^"]+)"/)?.[1];
          if (propName) newElement.setAttribute('property', propName);
        } else {
          const nameValue = selector.match(/name="([^"]+)"/)?.[1];
          if (nameValue) newElement.setAttribute('name', nameValue);
        }
        newElement.setAttribute(attribute, value);
        document.head.appendChild(newElement);
      }
    };

    // Update standard meta tags
    updateMetaTag('meta[name="description"]', 'content', currentMeta.description);
    updateMetaTag('meta[name="keywords"]', 'content', currentMeta.keywords);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'content', currentMeta.ogTitle);
    updateMetaTag('meta[property="og:description"]', 'content', currentMeta.ogDescription);
    updateMetaTag('meta[property="og:url"]', 'content', window.location.href);

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', 'content', currentMeta.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', currentMeta.description);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.href);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', window.location.href);
      document.head.appendChild(canonical);
    }

  }, [location]);

  return null;
};

export default SEO;
