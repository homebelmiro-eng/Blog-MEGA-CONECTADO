import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-slate-300 mt-20 border-t-4 border-brand-secondary">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-2 mb-2 hover:opacity-90 transition-opacity">
            <Cpu className="w-8 h-8 text-brand-secondary" />
            <span className="font-heading font-extrabold text-xl text-white tracking-tighter">MEGACONECTADO</span>
          </Link>
          <p className="text-sm opacity-80 leading-relaxed">
            Sua fonte diária de notícias, análises e tendências sobre Inteligência Artificial, Inovação e Tecnologia. Editado por Divino Luciano Belmiro.
          </p>
        </div>

        {/* Links 1 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-heading font-bold text-white text-base mb-2 uppercase tracking-wider">Navegação</h4>
          <Link to="/pagina/sobre-o-autor" className="hover:text-white hover:underline transition-colors">Sobre o Autor</Link>
          <Link to="/pagina/equipe-editorial" className="hover:text-white hover:underline transition-colors">Equipe Editorial</Link>
          <Link to="/pagina/anuncie" className="hover:text-white hover:underline transition-colors">Anuncie</Link>
          <Link to="/contato" className="hover:text-white hover:underline transition-colors">Contato</Link>
        </div>

        {/* Links 2 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-heading font-bold text-white text-base mb-2 uppercase tracking-wider">Legal</h4>
          <Link to="/pagina/privacidade" className="hover:text-white hover:underline transition-colors">Privacidade</Link>
          <Link to="/pagina/termos" className="hover:text-white hover:underline transition-colors">Termos</Link>
          <Link to="/pagina/politica-de-cookies" className="hover:text-white hover:underline transition-colors">Política de Cookies</Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="font-heading font-bold text-white text-base mb-2 uppercase tracking-wider">Fale Conosco</h4>
          <a href="mailto:contato@megaconectado.com.br" className="flex items-center gap-2 hover:text-white hover:underline transition-colors">
            <Mail className="w-5 h-5 text-brand-secondary" /> 
            <span className="text-sm">contato@megaconectado.com.br</span>
          </a>
          <a href="tel:+5543984390879" className="flex items-center gap-2 hover:text-white hover:underline transition-colors">
            <Phone className="w-5 h-5 text-brand-secondary" /> 
            <span className="text-sm">+55 (43) 98439-0879</span>
          </a>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="w-5 h-5 text-brand-secondary" /> 
            <span className="text-sm opacity-80">Londrina, PR, Brasil</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-sm opacity-60 text-center md:text-left">
          © 2026 MEGACONECTADO. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
