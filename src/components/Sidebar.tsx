import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Grid, MousePointerClick, Mail } from 'lucide-react';
import AdSpace from './AdSpace';
import AuthorProfile from './AuthorProfile';
import AITermOfDay from './AITermOfDay';
import NewsletterWidget from './NewsletterWidget';
import SearchModal from './SearchModal';

export default function Sidebar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Author Profile Widget */}
      <AuthorProfile />
      
      {/* AI Term of the Day Widget */}
      <AITermOfDay />
      
      {/* Search Widget */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-lg text-brand-primary mb-4">Buscar</h3>
        <div className="relative">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center bg-slate-50 border border-slate-200 rounded py-3 px-4 text-left text-slate-500 hover:border-brand-secondary hover:ring-1 hover:ring-brand-secondary transition-all"
          >
            <span className="flex-1">Pesquisar artigos...</span>
            <Search className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Tabs / Links Widget */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm overflow-hidden">
        <h3 className="font-heading font-bold text-lg text-brand-primary mb-6 border-b border-slate-200 pb-2">Conteúdo em Destaque</h3>
        <ul className="flex flex-col gap-4">
          <li className="group cursor-pointer">
            <Link to="/mais-lidas" className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 p-2 rounded transition-transform origin-left group-hover:scale-[1.02]">
              <TrendingUp className="text-brand-secondary w-5 h-5" />
              <div className="flex flex-col">
                <span className="font-bold text-brand-primary">Mais Lidas</span>
                <span className="text-xs text-slate-400">Os artigos mais populares da semana</span>
              </div>
            </Link>
          </li>
          <li className="group cursor-pointer">
            <Link to="/todas" className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 p-2 rounded transition-transform origin-left group-hover:scale-[1.02]">
              <Grid className="text-brand-secondary w-5 h-5" />
              <div className="flex flex-col">
                <span className="font-bold text-brand-primary">Categorias</span>
                <span className="text-xs text-slate-400">Explore nossos tópicos principais</span>
              </div>
            </Link>
          </li>
          <li className="group cursor-pointer">
            <Link to="/patrocinado" className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 p-2 rounded transition-transform origin-left group-hover:scale-[1.02]">
              <MousePointerClick className="text-brand-secondary w-5 h-5" />
              <div className="flex flex-col">
                <span className="font-bold text-brand-primary">Patrocinado</span>
                <span className="text-xs text-slate-400">Conteúdo de nossos parceiros</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Newsletter Widget */}
      <NewsletterWidget />

      {/* Ad Space Vertical */}
      <AdSpace format="vertical" className="mt-4" />
    </div>
  );
}
