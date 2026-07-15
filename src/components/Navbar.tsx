import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Facebook, Twitter, Youtube, Instagram, Moon, ChevronDown, Cpu, User, Sparkles } from 'lucide-react';
import SearchModal from './SearchModal';
import { useAuth } from '../lib/AuthContext';

export default function Navbar() {
  const { user, profile } = useAuth();
  const mainLinks = ['IA', 'Software', 'Segurança', 'Hardware', 'Automação', 'Internet'];
  const megaMenuLinks = [
    'Serviços Financeiros', 'Tablets', 'Smartwatches', 'Gadgets',
    'Produtividade', 'TVs', 'Periféricos', 'Mobilidade',
    'Computadores', 'Wearables', 'Casa Conectada e IoT', 'Fones de ouvido',
    'Ciência e Saúde', 'Robótica', 'Blockchain'
  ];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#0070C0] sticky top-0 z-50 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group hover:opacity-90 transition-opacity">
            <Cpu className="w-8 h-8 text-white" />
            <span className="font-heading font-extrabold text-2xl tracking-tighter text-white italic">
              megaconectado
            </span>
          </Link>

          {/* Main Links */}
          <ul className="hidden md:flex items-center gap-x-6 h-full">
            {mainLinks.map((link) => (
              <li key={link} className="h-full flex items-center">
                <Link to={`/${link.toLowerCase()}`} className="font-sans font-bold text-[13px] uppercase tracking-wide text-white/90 hover:text-white transition-colors">
                  {link}
                </Link>
              </li>
            ))}
            {/* Mega Menu Trigger */}
            <li 
              className="h-full flex items-center"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="font-sans font-bold text-[13px] uppercase tracking-wide text-white/90 hover:text-white transition-colors flex items-center gap-1 h-full outline-none">
                MAIS <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="fixed top-16 left-0 right-0 w-full bg-[#005ea6] shadow-2xl border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-w-7xl mx-auto flex justify-between items-center p-8">
                    {/* Brand in Megamenu */}
                    <div className="flex flex-col gap-4 w-1/4">
                      <Link to="/" onClick={() => setIsMegaMenuOpen(false)} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <Cpu className="w-8 h-8 text-white" />
                        <span className="font-heading font-extrabold text-xl tracking-tighter text-white italic">
                          megaconectado
                        </span>
                      </Link>
                      <div className="flex gap-3 text-white/80">
                        <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5 cursor-pointer" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5 cursor-pointer" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Youtube className="w-5 h-5 cursor-pointer" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5 cursor-pointer" /></a>
                      </div>
                    </div>

                    {/* Pills Grid */}
                    <div className="w-3/4 flex flex-wrap gap-2 justify-center pl-8 border-l border-white/10">
                      {megaMenuLinks.map((cat) => (
                        <Link 
                          key={cat} 
                          to={`/categoria/${cat.toLowerCase().replace(/ /g, '-')}`}
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="bg-white/10 hover:bg-white/25 text-white/90 hover:text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-5 text-white/80">
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* User Auth Link */}
            <div className="border-l border-white/20 pl-5">
              {user && profile && profile.role !== 'reader' ? (
                <Link to="/admin" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-all group">
                  <User className="w-4 h-4 text-white group-hover:text-white" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-white">Painel</span>
                </Link>
              ) : (
                <Link to="/admin/login" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-all group">
                  <User className="w-4 h-4 text-white group-hover:text-white" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-white">Entrar</span>
                </Link>
              )}
            </div>

            <div className="border-l border-white/20 pl-5">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#004A81] hover:bg-[#003966] transition-colors">
                <Moon className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
