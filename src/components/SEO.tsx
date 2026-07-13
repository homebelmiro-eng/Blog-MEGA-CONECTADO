import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  image?: string;
  authorName?: string;
  publishDate?: string;
  // GEO Schema fields
  geoEnabled?: boolean;
  locationName?: string;
  latitude?: number;
  longitude?: number;
  faq?: { question: string, answer: string }[];
}

export default function SEO({ 
  title = 'MegaConectado | Inteligência Artificial, Tecnologia e SEO', 
  description = 'O MegaConectado é um portal especializado em Inteligência Artificial, tecnologia, SEO, marketing digital, produtividade e inovação. Confira tutoriais, análises, reviews, comparativos e as principais novidades do mercado.',
  canonicalUrl = 'https://megaconectado.com.br/',
  type = 'website',
  image = 'https://megaconectado.com.br/imagens/logo-social.png',
  authorName = 'Equipe MegaConectado',
  publishDate,
  geoEnabled,
  locationName,
  latitude,
  longitude,
  faq
}: SEOProps) {
  const siteTitle = title === 'MegaConectado | Inteligência Artificial, Tecnologia e SEO' 
    ? title 
    : `${title} | MegaConectado`;

  // Structured Data (JSON-LD) for GEO (Generative Engine Optimization)
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "NewsArticle" : "WebPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": siteTitle,
    "image": [image],
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": "https://megaconectado.com.br/pagina/equipe"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MegaConectado",
      "logo": {
        "@type": "ImageObject",
        "url": "https://megaconectado.com.br/logo.png"
      }
    },
    "description": description
  };

  const organizationSchema = {
    "@context":"https://schema.org",
    "@type":"Organization",
    "name":"MegaConectado",
    "url":"https://megaconectado.com.br",
    "logo":"https://megaconectado.com.br/logo.png",
    "description":"Portal especializado em Inteligência Artificial, SEO, tecnologia e marketing digital.",
    "sameAs":[
      "https://facebook.com/megaconectado",
      "https://instagram.com/megaconectado",
      "https://youtube.com/@megaconectado"
    ]
  };

  const websiteSchema = {
    "@context":"https://schema.org",
    "@type":"WebSite",
    "url":"https://megaconectado.com.br",
    "name":"MegaConectado",
    "publisher":{
       "@type":"Organization",
       "name":"MegaConectado"
    },
    "inLanguage":"pt-BR",
    "potentialAction":{
       "@type":"SearchAction",
       "target":"https://megaconectado.com.br/?s={search_term_string}",
       "query-input":"required name=search_term_string"
    }
  };

  // Add GEO data if enabled
  if (geoEnabled && locationName) {
    (baseSchema as any).contentLocation = {
      "@type": "Place",
      "name": locationName
    };
    
    if (latitude && longitude) {
      (baseSchema as any).contentLocation.geo = {
        "@type": "GeoCoordinates",
        "latitude": latitude,
        "longitude": longitude
      };
    }
  }

  if (type === 'article' && publishDate) {
    (baseSchema as any).datePublished = publishDate;
    (baseSchema as any).dateModified = publishDate;
  }

  // Generate FAQ Schema if FAQs are provided
  let faqSchema = null;
  if (faq && faq.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Inteligência Artificial, IA, ChatGPT, Gemini, Claude, SEO, GEO, AI Overview, tecnologia, reviews, tutoriais, marketing digital, produtividade, MegaConectado" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content={authorName} />
      <meta name="publisher" content="MegaConectado" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="MegaConectado" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD for Search Engines & AI Models (GEO) */}
      <script type="application/ld+json">
        {JSON.stringify(baseSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
}
