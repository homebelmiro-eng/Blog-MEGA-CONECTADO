import React from 'react';
import { Link } from 'react-router-dom';
import { heroArticle, heroSideArticles } from '../data';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
      <Link to={`/artigo/${heroArticle.id}`} className="lg:col-span-8 group block">
        <article>
          <div className="relative overflow-hidden rounded-xl mb-4 h-[400px] border border-slate-200 group-hover:border-brand-secondary transition-colors duration-300">
            <img 
              src={heroArticle.imageUrl} 
              alt={heroArticle.imageAlt} 
              fetchPriority="high"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="inline-block px-3 py-1 bg-brand-secondary text-white font-mono text-xs rounded mb-3 shadow-sm uppercase tracking-wider">
                {heroArticle.category}
              </span>
              <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tighter leading-tight mb-2 group-hover:text-brand-tertiary transition-colors">
                {heroArticle.title}
              </h1>
            </div>
          </div>
          <p className="font-sans text-lg text-slate-600 mb-3 line-clamp-2">
            {heroArticle.excerpt}
          </p>
          <div className="flex items-center text-sm font-sans text-slate-500">
            <span>Por: {heroArticle.author}</span>
            <span className="mx-2">•</span>
            <span>{heroArticle.date}</span>
          </div>
        </article>
      </Link>

      <div className="lg:col-span-4 flex flex-col gap-6">
        {heroSideArticles.map((article) => (
          <Link to={`/artigo/${article.id}`} key={article.id} className="block group">
            <article className="flex gap-4">
              <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 group-hover:border-brand-secondary transition-colors">
                <img 
                  src={article.imageUrl} 
                  alt={article.imageAlt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-heading font-bold text-lg leading-tight text-brand-primary group-hover:text-brand-secondary transition-colors mb-2">
                  {article.title}
                </h3>
                <span className="font-mono text-xs text-brand-secondary uppercase tracking-widest">{article.category}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
