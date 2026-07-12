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
}

export default function SEO({ 
  title = 'Mega Conectado - Notícias de Tecnologia, IA e Inovação', 
  description = 'Sua fonte diária de notícias, análises e tendências sobre Inteligência Artificial, Inovação, Smartphones e Tecnologia. Editado por Divino Luciano Belmiro.',
  canonicalUrl = 'https://megaconectado.com.br',
  type = 'website',
  image = 'https://megaconectado.com.br/og-image.jpg',
  authorName = 'Divino Luciano Belmiro',
  publishDate
}: SEOProps) {
  const siteTitle = title === 'Mega Conectado - Notícias de Tecnologia, IA e Inovação' 
    ? title 
    : `${title} | Mega Conectado`;

  // Structured Data (JSON-LD) for GEO (Generative Engine Optimization)
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "NewsArticle" : "WebSite",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": siteTitle,
    "image": [image],
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": "https://megaconectado.com.br/pagina/sobre-o-autor"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mega Conectado",
      "logo": {
        "@type": "ImageObject",
        "url": "https://megaconectado.com.br/logo.png"
      }
    },
    "description": description
  };

  if (type === 'article' && publishDate) {
    (baseSchema as any).datePublished = publishDate;
    (baseSchema as any).dateModified = publishDate;
  }

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Mega Conectado" />

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
    </Helmet>
  );
}
