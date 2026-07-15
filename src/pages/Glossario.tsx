import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Filter, 
  ArrowLeft,
  BookMarked,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getGlossaryTerms, seedDefaultGlossaryTerms } from '../services/glossary';
import { GlossaryTerm } from '../types';
import SEO from '../components/SEO';

export default function Glossario() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState('');
  const location = useLocation();

  useEffect(() => {
    const loadTerms = async () => {
      try {
        setLoading(true);
        // First try to seed if empty
        await seedDefaultGlossaryTerms();
        const data = await getGlossaryTerms();
        setTerms(data);
      } catch (error) {
        console.error('Error loading glossary:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTerms();
  }, []);

  // Listen to hash changes for active highlighting
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      setActiveHash(hash);
      
      // Scroll to the element after a short delay
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    } else {
      setActiveHash('');
    }
  }, [location.hash, terms]);

  // Unique starting letters for the alphabetic filter
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  // Unique categories of terms
  const categories = Array.from(new Set(terms.map(t => t.category).filter(Boolean)));

  // Filter terms based on search, selected letter, and category
  const filteredTerms = terms.filter(t => {
    const matchesSearch = searchQuery === '' || 
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLetter = !selectedLetter || 
      t.term.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().startsWith(selectedLetter);
    
    const matchesCategory = !selectedCategory || t.category === selectedCategory;

    return matchesSearch && matchesLetter && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <SEO 
        title="Glossário de Termos de IA e Tecnologia - Mega Conectado" 
        description="Aprenda e consulte as definições completas dos principais conceitos, termos e siglas sobre Inteligência Artificial, Machine Learning e Tecnologia."
        type="website"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-primary transition-all">
            <ArrowLeft className="w-4 h-4" />
            Voltar para a Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-brand-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-tertiary/10 rounded-full blur-2xl -ml-20 -mb-20" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-brand-secondary mb-4">
              <BookOpen className="w-4 h-4" />
              Índice de Conhecimento
            </div>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight mb-4">
              Glossário de Termos
            </h1>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed">
              Consulte definições simples e objetivas dos principais conceitos sobre Inteligência Artificial, Machine Learning e Inovação. Nossos artigos incluem links automáticos diretos para estas definições sempre que um termo é mencionado.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 space-y-6">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Pesquisar termo ou definição..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLetter(null); // Clear letter filter on search
              }}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary rounded-xl text-slate-700 font-medium outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Alphabet Index */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-slate-300" />
              Filtrar por letra inicial
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedLetter(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !selectedLetter 
                    ? 'bg-brand-secondary text-brand-primary' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                TODOS
              </button>
              {alphabet.map((letter) => {
                const hasTerms = terms.some(t => t.term.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().startsWith(letter));
                return (
                  <button
                    key={letter}
                    onClick={() => {
                      setSelectedLetter(letter);
                      setSearchQuery(''); // Clear search on letter click
                    }}
                    disabled={!hasTerms}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                      selectedLetter === letter 
                        ? 'bg-brand-secondary text-brand-primary shadow-sm' 
                        : hasTerms
                          ? 'bg-slate-50 text-slate-700 hover:bg-slate-100 cursor-pointer'
                          : 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Badges */}
          {categories.length > 0 && (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-slate-300" />
                Filtrar por Categoria
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    !selectedCategory 
                      ? 'bg-brand-primary text-white' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Todas Categorias
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === category 
                        ? 'bg-brand-primary text-white shadow-sm' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-medium">Carregando termos do glossário...</p>
          </div>
        ) : filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTerms.map((t) => {
              const isHighlighted = activeHash === t.slug;
              return (
                <div 
                  key={t.id}
                  id={t.slug}
                  className={`bg-white rounded-2xl border p-6 md:p-8 transition-all duration-500 relative overflow-hidden ${
                    isHighlighted 
                      ? 'border-brand-secondary ring-4 ring-brand-secondary/10 shadow-lg scale-[1.01] bg-amber-50/10' 
                      : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-secondary animate-pulse" />
                  )}
                  
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="font-heading font-extrabold text-xl text-brand-primary tracking-tight">
                      {t.term}
                    </h2>
                    {t.category && (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        {t.category}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {t.definition}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm max-w-md mx-auto">
            <div className="p-3 bg-slate-50 rounded-full w-fit mx-auto mb-4 border border-slate-100 text-slate-400">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-primary mb-2">Nenhum termo encontrado</h3>
            <p className="text-sm text-slate-500">
              Tente redefinir seus filtros ou pesquisar por outra palavra-chave.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLetter(null);
                setSelectedCategory(null);
              }}
              className="mt-4 px-4 py-2 bg-brand-secondary text-brand-primary rounded-xl font-bold text-xs hover:brightness-110 transition-all"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
