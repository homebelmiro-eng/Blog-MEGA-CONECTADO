import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { heroArticle, heroSideArticles, topNewsArticles, latestArticles } from '../data';
import { Article } from '../types';
import { getArticleUrl } from '../lib/navigation';
import { articleService } from '../lib/services';
import { isFirebaseConfigured } from '../lib/firebase';
import OptimizedImage from './OptimizedImage';

interface RelatedArticlesProps {
  currentCategory: string;
  currentArticleId: string;
}

export default function RelatedArticles({ currentCategory, currentArticleId }: RelatedArticlesProps) {
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        if (isFirebaseConfigured) {
          const articles = await articleService.getRelatedArticles(currentCategory, currentArticleId);
          setRelated(articles);
        } else {
          // Fallback to static data
          const allArticles: Article[] = [
            heroArticle,
            ...heroSideArticles,
            ...topNewsArticles,
            ...latestArticles
          ];
          
          const filtered = allArticles
            .filter(article => article.category === currentCategory && article.id !== currentArticleId)
            .slice(0, 3);
            
          setRelated(filtered);
        }
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRelated();
  }, [currentCategory, currentArticleId]);

  if (loading || related.length === 0) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-heading font-extrabold text-2xl text-brand-primary tracking-tight">
          Conteúdos <span className="text-brand-secondary">Relacionados</span>
        </h3>
        <Link 
          to={`/categoria/${currentCategory.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-brand-secondary font-bold text-sm hover:underline"
        >
          Ver mais de {currentCategory} →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={getArticleUrl(article)} className="group block h-full">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-brand-secondary/30">
                <div className="aspect-video relative overflow-hidden">
                  {article.imageUrl && (
                    <OptimizedImage 
                      src={article.imageUrl} 
                      alt={article.imageAlt || article.title}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 350px"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2 block">
                    {article.category}
                  </span>
                  <h4 className="font-heading font-bold text-brand-primary text-lg leading-snug group-hover:text-brand-secondary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
