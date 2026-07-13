import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  category?: string;
  title?: string;
}

export default function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  const breadcrumbList = [
    { name: 'Home', url: 'https://megaconectado.com.br/' }
  ];

  if (category) {
    breadcrumbList.push({
      name: category,
      url: `https://megaconectado.com.br/categoria/${category.toLowerCase().replace(/ /g, '-')}`
    });
  }

  if (title) {
    breadcrumbList.push({
      name: title,
      url: window.location.href
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbList.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <Link to="/" className="hover:text-brand-secondary transition-colors">Home</Link>
      
      {category && (
        <>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link 
            to={`/categoria/${category.toLowerCase().replace(/ /g, '-')}`} 
            className="hover:text-brand-secondary transition-colors"
          >
            {category}
          </Link>
        </>
      )}

      {title && (
        <>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="text-slate-500 truncate max-w-[200px]" aria-current="page">
            {title}
          </span>
        </>
      )}
    </nav>
  );
}
