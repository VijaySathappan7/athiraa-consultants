import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://athiraaconsultants.com/#organization",
  "name": "Athiraa Consultants",
  "url": "https://athiraaconsultants.com",
  "logo": "https://athiraaconsultants.com/favicon.png",
  "description": "Athiraa Consultants is a premier financial advisory firm in India, offering high-end wealth management, corporate finance capital structuring, property advisory, and tax advisory services.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-98765-43210",
    "contactType": "Client Advisory Services",
    "email": "advisory@athiraa.com",
    "availableLanguage": ["English", "Tamil", "Hindi"]
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$$"
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://athiraaconsultants.com/#website",
  "url": "https://athiraaconsultants.com",
  "name": "Athiraa Consultants",
  "description": "Trusted Financial Advisory in India",
  "publisher": {
    "@id": "https://athiraaconsultants.com/#organization"
  }
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Athiraa Consultants Advisory Services",
  "description": "Bespoke professional services tailored to wealth, growth, and legacy.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Private Wealth Management",
      "description": "Personalised investment planning, portfolio management, direct equity, commodities, and succession strategy.",
      "url": "https://athiraaconsultants.com/services/wealth-management"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Corporate Finance",
      "description": "Structured capital advisory, business growth planning, and comprehensive debt management solutions.",
      "url": "https://athiraaconsultants.com/services/corporate-finance"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Capital Markets",
      "description": "Strategic IPO coordination, direct listings, private placements, syndication, and public placements.",
      "url": "https://athiraaconsultants.com/services/capital-markets"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Real Estate Advisory",
      "description": "End-to-end guidance on high-value property acquisition, land development, rental management, and market research.",
      "url": "https://athiraaconsultants.com/services/real-estate"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Tax & Compliance Advisory",
      "description": "Elite direct/indirect tax planning, corporate compliance, and regulatory family office advisory.",
      "url": "https://athiraaconsultants.com/services/tax-advisory"
    }
  ]
};

// Map routes to specific schema objects
const routeSchemas = {
  "/": [organizationSchema, websiteSchema],
  "/about": [organizationSchema],
  "/expertise": [servicesSchema],
  "/services": [servicesSchema],
  "/services/wealth-management": [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Private Wealth Management",
      "serviceType": "Financial Advisory",
      "provider": {
        "@id": "https://athiraaconsultants.com/#organization"
      },
      "description": "Personalised investment planning and strategic advisory for compounding direct equity, mutual funds, gold, and fixed-income assets under Indian tax regulations.",
      "areaServed": "IN"
    }
  ],
  "/services/corporate-finance": [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Corporate Finance",
      "serviceType": "Capital Structuring Advisory",
      "provider": {
        "@id": "https://athiraaconsultants.com/#organization"
      },
      "description": "Optimised financial structures, debt management, and customized capital raising frameworks to drive corporate expansion.",
      "areaServed": "IN"
    }
  ],
  "/services/capital-markets": [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Capital Markets Advisory",
      "serviceType": "IPO and Equity Syndication",
      "provider": {
        "@id": "https://athiraaconsultants.com/#organization"
      },
      "description": "Institutional preparation for market listings, private placements, public equities, and structured debt syndication.",
      "areaServed": "IN"
    }
  ],
  "/services/real-estate": [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Real Estate Advisory",
      "serviceType": "Property and Asset Advisory",
      "provider": {
        "@id": "https://athiraaconsultants.com/#organization"
      },
      "description": "End-to-end commercial and residential real estate portfolio management, acquisitions, and deep local market studies.",
      "areaServed": "IN"
    }
  ],
  "/services/tax-advisory": [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Tax & Compliance Advisory",
      "serviceType": "Tax Compliance Advisory",
      "provider": {
        "@id": "https://athiraaconsultants.com/#organization"
      },
      "description": "Strategic family office tax optimization, accounting audits, regulatory filings, and direct/indirect tax advisory.",
      "areaServed": "IN"
    }
  ]
};

const JSONLD = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const schemas = routeSchemas[currentPath] || routeSchemas["/"];

    // Remove any existing injected JSONLD script tags to avoid duplication
    const existingScripts = document.querySelectorAll('script[data-schema="injected"]');
    existingScripts.forEach(script => script.remove());

    // Inject new schemas
    schemas.forEach(schemaObj => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'injected');
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });
  }, [location]);

  return null;
};

export default JSONLD;
