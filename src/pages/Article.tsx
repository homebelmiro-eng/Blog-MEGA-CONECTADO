import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import SEO from '../components/SEO';
import { heroArticle, heroSideArticles, topNewsArticles, latestArticles } from '../data';
import { Article as ArticleType } from '../types';

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);

  useEffect(() => {
    // Busca o artigo nos diferentes arrays do mock de dados
    const allArticles = [
      heroArticle,
      ...heroSideArticles,
      ...topNewsArticles,
      ...latestArticles
    ];
    
    const foundArticle = allArticles.find(a => a.id === id);
    setArticle(foundArticle || null);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Artigo não encontrado</h2>
        <Link to="/" className="text-brand-secondary hover:underline">Voltar para Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO 
        title={article.title} 
        description={article.excerpt} 
        image={article.imageUrl}
        type="article"
      />
      <Link to="/" className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Home
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 flex flex-col gap-6">
           <article className="bg-white rounded-xl border border-slate-200 overflow-hidden">
             {article.imageUrl && (
               <div className="w-full h-[400px]">
                 <img src={article.imageUrl} alt={article.imageAlt} className="w-full h-full object-cover" />
               </div>
             )}
             <div className="p-8 md:p-12">
               <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-brand-secondary font-mono text-xs rounded mb-4 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight leading-tight mb-4">
                    {article.title}
                  </h1>
                  <div className="flex items-center text-sm font-sans text-slate-500">
                    <span>Por: {article.author || 'Equipe Editorial'}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                  </div>
               </div>
               <div className="prose prose-lg prose-slate max-w-none">
                  {article.excerpt && (
                    <p className="lead font-semibold text-slate-700 text-xl mb-8">
                      {article.excerpt}
                    </p>
                  )}
                  <p>O conteúdo completo deste artigo é um mock para demonstração. {article.excerpt} {article.title}</p>
               </div>
             </div>
           </article>
        </main>
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <AdSpace format="vertical" />
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
