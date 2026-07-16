import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  category?: string;
  title?: string;
}

export default function Breadcrumbs({ items, category, title }: BreadcrumbsProps) {
  let breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' }
  ];

  if (items) {
    breadcrumbItems = [...breadcrumbItems, ...items];
  } else {
    if (category) {
      breadcrumbItems.push({
        label: category,
        url: `/categoria/${category.toLowerCase().replace(/ /g, '-')}`
      });
    }
  
    if (title) {
      breadcrumbItems.push({
        label: title
      });
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.url ? `https://megaconectado.com.br${item.url === '/' ? '' : item.url}` : undefined
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return (
          <React.Fragment key={`breadcrumb-${index}`}>
            {index > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
            {item.url && !isLast ? (
              <Link 
                to={item.url} 
                className="hover:text-brand-secondary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-slate-500 truncate max-w-[200px]" : "text-slate-600"} aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
