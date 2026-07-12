import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Perguntas Frequentes (FAQ)" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  // Generate JSON-LD for SEO/GEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="mt-12 bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <div className="flex items-center gap-2 mb-8">
        <HelpCircle className="w-6 h-6 text-brand-secondary" />
        <h2 className="font-heading font-bold text-2xl text-brand-primary tracking-tight">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 hover:border-brand-secondary/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
              <span className="font-heading font-bold text-brand-primary text-lg">
                {item.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-brand-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
