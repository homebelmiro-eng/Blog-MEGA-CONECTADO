import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Facebook, Twitter, Youtube, Instagram, Send, Linkedin, Rss } from 'lucide-react';

export default function Footer() {
  const categoryPills = [
    'Serviços Financeiros', 'Tablets', 'Smartwatches', 'Gadgets',
    'Produtividade', 'TVs', 'Periféricos', 'Mobilidade',
    'Computadores', 'Wearables', 'Casa Conectada e IoT', 'Fones de ouvido',
    'Ciência e Saúde', 'Robótica', 'Blockchain'
  ];

  const bottomLinks = [
    { name: 'Sobre Nós', path: '/pagina/sobre' },
    { name: 'Contato', path: '/contato' },
    { name: 'Política de Privacidade', path: '/pagina/privacidade' },
    { name: 'Termos de Uso', path: '/pagina/termos' },
    { name: 'Política de Cookies', path: '/pagina/politica-de-cookies' },
    { name: 'Nossa Equipe', path: '/pagina/equipe' },
    { name: 'Metodologia Editorial', path: '/pagina/metodologia-editorial' }
  ];

  return (
    <footer className="mt-20">
      {/* Top Section */}
      <div className="bg-[#005ea6] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Brand & Socials */}
          <div className="flex flex-col items-center lg:items-start gap-6 lg:w-1/4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Cpu className="w-10 h-10 text-white" />
              <span className="font-heading font-extrabold text-3xl text-white tracking-tighter italic">
                megaconectado
              </span>
            </Link>
            <div className="flex gap-4 text-white/90">
              <a href="#" className="hover:text-white transition-colors"><Send className="w-5 h-5 cursor-pointer" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5 cursor-pointer" /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube className="w-5 h-5 cursor-pointer" /></a>
              <a href="#" className="hover:text-white transition-colors"><Rss className="w-5 h-5 cursor-pointer" /></a>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start lg:w-2/4">
            {categoryPills.map((cat) => (
              <Link 
                key={cat} 
                to={`/categoria/${cat.toLowerCase().replace(/ /g, '-')}`}
                className="bg-white/10 hover:bg-white/25 text-white/90 hover:text-white px-4 py-1.5 rounded text-[13px] font-medium transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Right Placeholder (for illustration in original design) */}
          <div className="hidden lg:flex lg:w-1/4 justify-end">
            <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <Cpu className="w-20 h-20 text-white/20" />
            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="bg-[#004A81]">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-[13px] text-white/80">
            {bottomLinks.map((link, index) => (
              <Link key={index} to={link.path} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="text-[13px] text-white/80 whitespace-nowrap text-center lg:text-right">
            © Megaconectado 2026.
          </div>
        </div>
      </div>
    </footer>
  );
}
