import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Search, Share2, Globe, Megaphone } from 'lucide-react';

export default function Navbar() {
  const links = ['Tecnologia', 'IA', 'Aplicativos', 'Internet', 'Smartphones', 'Tutoriais'];

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0 cursor-pointer group hover:opacity-90 transition-opacity">
          <Cpu className="w-8 h-8 text-brand-secondary group-hover:text-brand-tertiary transition-colors" />
          <span className="font-heading font-extrabold text-2xl tracking-tighter text-brand-primary group-hover:opacity-80 transition-opacity">
            MEGACONECTADO
          </span>
        </Link>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link}>
              <Link to={`/${link.toLowerCase()}`} className="font-heading font-bold text-sm uppercase tracking-wide text-slate-600 hover:text-brand-secondary transition-colors">
                {link}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4 text-slate-500">
          <button className="hover:text-brand-secondary transition-colors"><Share2 className="w-5 h-5" /></button>
          <button className="hover:text-brand-secondary transition-colors"><Globe className="w-5 h-5" /></button>
          <button className="hover:text-brand-secondary transition-colors"><Megaphone className="w-5 h-5" /></button>
          <div className="relative ml-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-slate-100 border border-slate-200 rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary w-48 transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-brand-secondary">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
