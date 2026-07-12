import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Grid, MousePointerClick, Mail } from 'lucide-react';
import AdSpace from './AdSpace';
import AuthorProfile from './AuthorProfile';
import AITermOfDay from './AITermOfDay';

export default function Sidebar() {
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
          <input 
            type="text" 
            placeholder="Pesquisar artigos..." 
            className="w-full bg-slate-50 border border-slate-200 rounded py-3 px-4 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all" 
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-brand-secondary text-slate-400">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

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
      <div className="bg-brand-primary text-white rounded-xl p-8 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0EA5E9 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="relative z-10 flex flex-col items-center text-center">
          <Mail className="text-brand-secondary w-12 h-12 mb-4" />
          <h3 className="font-heading font-bold text-2xl mb-2">Newsletter</h3>
          <p className="text-sm text-slate-300 mb-6">Receba as principais notícias de inovação e tecnologia diretamente na sua caixa de entrada.</p>
          <form className="w-full flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Seu email principal" 
              className="w-full bg-white text-brand-primary border-none rounded py-3 px-4 text-sm focus:ring-2 focus:ring-brand-secondary outline-none" 
            />
            <button type="button" className="w-full bg-brand-secondary hover:bg-sky-500 text-white font-heading font-bold text-sm uppercase tracking-wider py-3 rounded transition-colors duration-300">
              Inscrever-se
            </button>
          </form>
        </div>
      </div>

      {/* Ad Space Vertical */}
      <AdSpace format="vertical" className="mt-4" />
    </div>
  );
}
