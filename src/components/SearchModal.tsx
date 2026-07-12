import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { heroArticle, heroSideArticles, topNewsArticles, latestArticles } from '../data';
import { Article } from '../types';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setResults([]);
    }
    
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    const debounce = setTimeout(() => {
      const searchTerm = query.toLowerCase();
      const allArticles = [heroArticle, ...heroSideArticles, ...topNewsArticles, ...latestArticles];
      
      const filtered = allArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) || 
        (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm)) ||
        article.category.toLowerCase().includes(searchTerm)
      );
      
      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4 sm:px-6">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center border-b border-slate-200 px-4 py-4">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="O que você está procurando?"
            className="flex-1 bg-transparent border-none focus:ring-0 text-lg px-4 outline-none text-slate-800 placeholder:text-slate-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-brand-secondary animate-spin shrink-0" />
          ) : (
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="overflow-y-auto p-4 flex-1">
          {query && results.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium">Nenhum resultado encontrado para "{query}"</p>
              <p className="text-sm text-slate-400 mt-1">Tente palavras diferentes ou categorias genéricas.</p>
            </div>
          )}

          {!query && (
            <div className="py-8 text-center text-slate-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Busque por inteligência artificial, mercado, startups...</p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="space-y-4">
              {results.map((article) => (
                <li key={article.id}>
                  <Link 
                    to={`/artigo/${article.id}`} 
                    className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    onClick={onClose}
                  >
                    {article.imageUrl && (
                      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden hidden sm:block">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-mono text-brand-secondary uppercase tracking-wider mb-1">{article.category}</span>
                      <h4 className="font-heading font-bold text-brand-primary group-hover:text-brand-secondary transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                      {article.excerpt && (
                        <p className="text-sm text-slate-500 line-clamp-1 mt-1">{article.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
