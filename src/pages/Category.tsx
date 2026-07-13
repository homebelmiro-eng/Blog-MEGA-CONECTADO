import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import { Article, FAQItem } from '../types';
import { getArticleUrl } from '../lib/navigation';
import { formatDate } from '../lib/utils';
import { heroArticle, heroSideArticles, topNewsArticles, latestArticles } from '../data';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();

  // Category specific FAQs
  const getCategoryFAQ = (slug: string | undefined): FAQItem[] => {
    const catName = slug?.replace(/-/g, ' ') || 'Tecnologia';
    return [
      {
        question: `Quais as principais novidades em ${catName} hoje?`,
        answer: `As novidades mais recentes em ${catName} incluem avanços em eficiência, novas integrações de mercado e lançamentos de ferramentas que buscam otimizar o dia a dia de profissionais e usuários.`
      },
      {
        question: `Como acompanhar tendências de ${catName}?`,
        answer: `Para ficar por dentro de ${catName}, recomendamos acompanhar portais especializados como o Mega Conectado, que filtra as informações mais relevantes e traz análises aprofundadas sobre o setor.`
      },
      {
        question: `Por que ler sobre ${catName} no Mega Conectado?`,
        answer: `No Mega Conectado, focamos em conteúdo de qualidade que une a precisão técnica da ${catName} com uma visão humanizada e prática sobre como essas mudanças impactam sua vida.`
      }
    ];
  };
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Busca todos os artigos
    const allArticles = [
      heroArticle,
      ...heroSideArticles,
      ...topNewsArticles,
      ...latestArticles
    ];
    
    // Filtra pela categoria (simulado, checando o slug com a category string)
    // Se for 'todas', mostra todos
    if (slug === 'todas') {
      setArticles(allArticles);
    } else if (slug === 'mais-lidas') {
      // Simula mostrando os primeiros 5 artigos
      setArticles(allArticles.slice(0, 5));
    } else {
       const filtered = allArticles.filter(
         a => a.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === slug
       );
       setArticles(filtered.length > 0 ? filtered : allArticles.slice(0, 3)); // fallbacks
    }

    window.scrollTo(0, 0);
  }, [slug]);

  const categoryName = slug?.replace(/-/g, ' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO 
        title={`Notícias sobre ${categoryName} | Mega Conectado`}
        description={`Fique atualizado com as últimas notícias, análises e tendências sobre ${categoryName}.`}
      />
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-4xl text-brand-primary uppercase tracking-tight mb-2">
          Categoria: {slug?.replace(/-/g, ' ')}
        </h1>
        <p className="text-slate-500">Exibindo artigos sobre {slug?.replace(/-/g, ' ')}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 flex flex-col gap-6">
           <div className="flex flex-col gap-8">
             {articles.map((article) => (
                <Link to={getArticleUrl(article)} key={article.id} className="block group">
                   <article className="flex flex-col md:flex-row gap-6 pb-8 border-b border-slate-100 last:border-0">
                    <div className="md:w-2/5 h-48 rounded-xl overflow-hidden border border-slate-200 group-hover:border-brand-secondary transition-colors">
                      {article.imageUrl && (
                        <img 
                          src={article.imageUrl} 
                          alt={article.imageAlt} 
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                        />
                      )}
                    </div>
                    <div className="md:w-3/5 flex flex-col justify-center">
                      <span className="font-mono text-xs text-brand-secondary mb-2 uppercase tracking-widest">{article.category}</span>
                      <h3 className="font-heading font-bold text-2xl leading-tight text-brand-primary group-hover:text-brand-secondary transition-colors mb-3">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-sm text-slate-400 mb-4">
                        <span>Por: {article.author || 'Equipe Editorial'}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <p className="text-slate-600 line-clamp-2">
                        {article.excerpt || "Este artigo é uma simulação de conteúdo. O texto completo será carregado na página do artigo."}
                      </p>
                    </div>
                  </article>
                </Link>
             ))}
           </div>

           <FAQ items={getCategoryFAQ(slug)} />
        </main>
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <AdSpace format="vertical" />
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
