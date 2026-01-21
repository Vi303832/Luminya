import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

/**
 * SEO Component - Her sayfa için optimize edilmiş meta tag yönetimi
 * 
 * @param {string} title - Sayfa başlığı
 * @param {string} description - Sayfa açıklaması
 * @param {string} keywords - SEO anahtar kelimeleri
 * @param {string} canonical - Canonical URL
 * @param {string} ogImage - Open Graph görseli
 * @param {string} ogType - Open Graph tipi (website, article, vb.)
 * @param {object} structuredData - JSON-LD structured data
 */
const SEO = ({
  title = "Luminya Wellness & Spa Center | Türkiye'nin En İyi Spa ve Masaj Merkezi",
  description = "Luminya Wellness Center olarak 13+ şubemizde İsveç masajı, Thai masajı, aromaterapi, Türk hamamı, cilt bakımı ve wellness paketleri sunuyoruz. Hemen randevu alın!",
  keywords = "spa, wellness, masaj, hamam, türk hamamı, aromaterapi, isveç masajı, thai masajı, cilt bakımı, spa merkezi, masaj salonu, kese köpük, spa paketleri, relax, rahatlama, terapi, luminya",
  canonical = "/",
  ogImage = "/vite.svg",
  ogType = "website",
  structuredData = null,
  author = "Luminya Wellness Center",
  publishedTime = null,
  modifiedTime = null,
}) => {
  // Site base URL (SSR güvenli + deploy domainini otomatik alır)
  const siteUrl =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : "https://luminya.com";
  
  // Full canonical URL
  const fullCanonical = canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`;
  
  // Full image URL
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Luminya Wellness Center" />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Article specific tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@luminya" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonical: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  structuredData: PropTypes.object,
  author: PropTypes.string,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
};

export default SEO;

/**
 * Önceden tanımlanmış Structured Data şablonları
 */

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Luminya Wellness & Spa Center",
  "description": "Türkiye'nin önde gelen wellness ve spa merkezi. 13+ şubemizde profesyonel masaj, hamam, aromaterapi ve cilt bakım hizmetleri.",
  "url": "https://luminya.com",
  "logo": "https://luminya.com/logo.png",
  "image": "https://luminya.com/og-image.jpg",
  "telephone": "+90-xxx-xxx-xxxx",
  "email": "info@luminya.com",
  "priceRange": "$$-$$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TR",
    "addressLocality": "Türkiye"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.0082",
    "longitude": "28.9784"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "22:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/luminya",
    "https://www.instagram.com/luminya",
    "https://www.twitter.com/luminya"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2850",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Service Schema Generator
export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.title,
  "provider": {
    "@type": "BeautySalon",
    "name": "Luminya Wellness & Spa Center",
    "url": "https://luminya.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Turkey"
  },
  "description": service.description,
  "offers": {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": "TRY",
    "availability": "https://schema.org/InStock"
  }
});

// BreadcrumbList Schema Generator
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// FAQ Schema Generator
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Article/Blog Post Schema Generator
export const generateArticleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.excerpt,
  "image": article.image,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Person",
    "name": article.author,
    "jobTitle": article.authorTitle
  },
  "publisher": {
    "@type": "Organization",
    "name": "Luminya Wellness Center",
    "logo": {
      "@type": "ImageObject",
      "url": "https://luminya.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://luminya.com/blog/${article.slug}`
  },
  "keywords": article.tags.join(", ")
});

// LocalBusiness Schema Generator for Branches
export const generateBranchSchema = (branch) => ({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": `Luminya Wellness Center - ${branch.name}`,
  "description": "Luminya Wellness Center şubesi",
  "telephone": branch.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": branch.address,
    "addressLocality": branch.city,
    "addressCountry": "TR"
  },
  "geo": branch.coordinates ? {
    "@type": "GeoCoordinates",
    "latitude": branch.coordinates.lat,
    "longitude": branch.coordinates.lng
  } : undefined,
  "url": "https://luminya.com",
  "priceRange": "$$-$$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "22:00"
    }
  ]
});
