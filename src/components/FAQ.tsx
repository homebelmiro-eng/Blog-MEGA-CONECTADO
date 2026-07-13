import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Perguntas Frequentes (FAQ)" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <section className="mt-12 bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200">
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
            className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 hover:border-brand-secondary/50 focus-within:ring-2 focus-within:ring-brand-secondary/20"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
              aria-expanded={openIndex === index}
            >
              <span className={`font-heading font-bold text-lg transition-colors ${
                openIndex === index ? 'text-brand-secondary' : 'text-brand-primary group-hover:text-brand-secondary'
              }`}>
                {item.question}
              </span>
              <ChevronDown 
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 text-brand-secondary' : 'text-slate-400 group-hover:text-brand-secondary'
                }`} 
              />
            </button>
            
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
