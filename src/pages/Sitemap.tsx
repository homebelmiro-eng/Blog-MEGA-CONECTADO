import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Sitemap() {
  const categories = [
    'IA', 'Software', 'Segurança', 'Hardware', 'Automação', 'Internet', 'Tutoriais', 'Reviews', 'Comparativos',
    'Serviços Financeiros', 'Tablets', 'Smartwatches', 'Gadgets',
    'Produtividade', 'TVs', 'Periféricos', 'Mobilidade',
    'Computadores', 'Wearables', 'Casa Conectada e IoT', 'Fones de ouvido',
    'Ciência e Saúde', 'Robótica', 'Blockchain'
  ];

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Sobre Nós', path: '/pagina/sobre-nos' },
    { name: 'Contato', path: '/contato' },
    { name: 'Política de Privacidade', path: '/pagina/privacidade' },
    { name: 'Termos de Uso', path: '/pagina/termos' },
    { name: 'Política de Cookies', path: '/pagina/politica-de-cookies' },
    { name: 'Divulgação de Afiliados', path: '/pagina/divulgacao-de-afiliados' },
    { name: 'Nossa Equipe', path: '/pagina/equipe-editorial' },
    { name: 'Política Editorial', path: '/pagina/politica-editorial' },
    { name: 'Correções e Atualizações', path: '/pagina/correcoes-e-atualizacoes' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full min-h-[60vh]">
      <SEO 
        title="Sitemap (HTML) | Mega Conectado"
        description="Mapa do site Mega Conectado. Encontre todas as páginas e categorias."
      />
      <h1 className="font-heading font-extrabold text-4xl text-brand-primary mb-8 border-b border-slate-200 pb-4">
        Mapa do Site
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading font-bold text-2xl text-brand-primary mb-4">Páginas Institucionais</h2>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li key={page.name}>
                <Link to={page.path} className="text-brand-secondary hover:underline font-medium">
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading font-bold text-2xl text-brand-primary mb-4">Categorias</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {categories.map((cat) => (
              <li key={cat}>
                <Link 
                  to={`/categoria/${cat.toLowerCase().replace(/ /g, '-')}`} 
                  className="text-brand-secondary hover:underline font-medium"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
