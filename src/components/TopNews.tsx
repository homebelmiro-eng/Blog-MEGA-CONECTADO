import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import { topNewsArticles } from '../data';

export default function TopNews() {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-2 mb-8">
        <Zap className="text-brand-secondary w-6 h-6" />
        <h2 className="font-heading font-bold text-2xl text-brand-primary uppercase tracking-tight">Principais Notícias em Tecnologia</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topNewsArticles.map((article) => (
          <Link to={`/artigo/${article.id}`} key={article.id} className="block h-full group">
            <article className="flex flex-col h-full bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-brand-secondary hover:shadow-sm transition-all duration-300">
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={article.imageUrl} 
                  alt={article.imageAlt} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="font-mono text-xs text-brand-secondary mb-2 uppercase tracking-widest">{article.category}</span>
                <h3 className="font-heading font-bold text-lg leading-snug text-brand-primary group-hover:text-brand-secondary transition-colors mb-3">
                  {article.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-400">
                  <span>{article.date}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:text-brand-secondary transition-all transform -translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
