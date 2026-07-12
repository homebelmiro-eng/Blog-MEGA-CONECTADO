import React from 'react';
import { Link } from 'react-router-dom';
import { latestArticles } from '../data';

export default function ArticleList() {
  return (
    <section>
      <h2 className="font-heading font-bold text-2xl text-brand-primary uppercase tracking-tight mb-8 border-b border-slate-200 pb-2">Últimos Artigos</h2>
      <div className="flex flex-col gap-8">
        {latestArticles.map((article) => (
          <Link to={`/artigo/${article.id}`} key={article.id} className="block group">
            <article className="flex flex-col md:flex-row gap-6 pb-8 border-b border-slate-100 last:border-0">
              <div className="md:w-2/5 h-48 rounded-xl overflow-hidden border border-slate-200 group-hover:border-brand-secondary transition-colors">
                <img 
                  src={article.imageUrl} 
                  alt={article.imageAlt} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="md:w-3/5 flex flex-col justify-center">
                <h3 className="font-heading font-bold text-2xl leading-tight text-brand-primary group-hover:text-brand-secondary transition-colors mb-3">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm text-slate-400 mb-4">
                  <span>Por: {article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.date}</span>
                </div>
                <p className="text-slate-600 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button className="px-8 py-3 rounded border border-brand-secondary text-brand-secondary font-heading font-bold text-sm uppercase tracking-wider hover:bg-brand-secondary hover:text-white transition-colors duration-300">
          Carregar Mais
        </button>
      </div>
    </section>
  );
}
