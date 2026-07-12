import React, { useEffect, useState } from 'react';
import { Sparkles, ExternalLink, Loader2 } from 'lucide-react';

interface TrendingNews {
  title: string;
  summary: string;
  sourceUrl: string;
}

export default function TrendingAINews() {
  const [news, setNews] = useState<TrendingNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const response = await fetch('/api/trending-ai');
        if (!response.ok) {
          throw new Error('Falha ao buscar notícias.');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError('Não foi possível carregar as notícias em tempo real no momento.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNews();
  }, []);

  return (
    <section className="mb-20">
      <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-4">
        <Sparkles className="text-indigo-600 w-6 h-6 animate-pulse" />
        <h2 className="font-heading font-bold text-2xl text-brand-primary uppercase tracking-tight">Em Alta: Radar IA em Tempo Real</h2>
        <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full animate-pulse"></span>
          Ao Vivo
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 bg-slate-50 rounded-xl border border-slate-100">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="ml-3 text-slate-500 font-medium tracking-wide">Mapeando tendências globais de IA...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 flex flex-col items-center justify-center text-center">
          <p className="mb-2 font-semibold">Ops!</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <article key={index} className="flex flex-col bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">
                  {index + 1}
                </span>
                <span className="font-mono text-xs text-indigo-600 font-semibold tracking-wider uppercase">Tendência</span>
              </div>
              <h3 className="font-heading font-bold text-lg leading-snug text-brand-primary mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                {item.summary}
              </p>
              <a 
                href={item.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider"
              >
                Ler Fonte Original <ExternalLink className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
