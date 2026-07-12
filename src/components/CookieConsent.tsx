import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Info, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 text-slate-300 z-50 px-4 py-4 md:py-6 shadow-2xl border-t border-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <Info className="w-6 h-6 text-brand-secondary shrink-0 hidden md:block" />
          <p className="text-sm">
            Nós utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência no nosso portal, 
            personalizar conteúdo e analisar nosso tráfego. Ao continuar navegando, você concorda com a nossa{' '}
            <Link to="/pagina/politica-de-cookies" className="text-brand-secondary hover:underline font-medium">
              Política de Cookies
            </Link> e{' '}
            <Link to="/pagina/privacidade" className="text-brand-secondary hover:underline font-medium">
              Política de Privacidade
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-brand-secondary hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-md transition-colors text-sm uppercase tracking-wider"
          >
            Entendi e Aceito
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
