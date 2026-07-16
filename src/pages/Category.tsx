import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import { Article, FAQItem } from '../types';
import { getArticleUrl } from '../lib/navigation';
import { formatDate } from '../lib/utils';
import { articleService } from '../lib/services';
import { isFirebaseConfigured } from '../lib/firebase';
import { heroArticle, heroSideArticles, topNewsArticles, latestArticles } from '../data';
import OptimizedImage from '../components/OptimizedImage';
import CategoryBadge, { getCategoryConfig } from '../components/CategoryBadge';
import { 
  CATEGORIES_STRUCTURE, 
  CONTENT_FORMATS, 
  findCategoryBySlug, 
  CategoryStructure 
} from '../categoriesData';
import { 
  Search, 
  SlidersHorizontal, 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Layers, 
  ChevronRight,
  Bookmark
} from 'lucide-react';

import Breadcrumbs from '../components/Breadcrumbs';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  
  // States
  const [dbArticles, setDbArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  // 1. Resolve current Category using our robust search helper
  const currentCategory: CategoryStructure | undefined = useMemo(() => {
    if (!slug) return undefined;
    if (slug === 'todas' || slug === 'mais-lidas') {
      return {
        name: slug === 'todas' ? 'Todas as Categorias' : 'Mais Lidas',
        slug: slug,
        description: 'Navegue por todo o acervo de conteúdo e tecnologia do Mega Conectado.',
        subcategories: CATEGORIES_STRUCTURE.map(c => c.name),
        seoPilar: 'Portal',
        seoClusters: ['Tecnologia', 'Inovação', 'IA']
      };
    }
    return findCategoryBySlug(slug);
  }, [slug]);

  // 2. Fetch all articles from DB & static fallback
  useEffect(() => {
    // Reset filters when category changes
    setSelectedSubcategory(null);
    setSelectedFormat(null);
    setSearchQuery('');
    setVisibleCount(6);

    async function loadArticles() {
      setLoading(true);
      try {
        let list: Article[] = [];
        if (isFirebaseConfigured) {
          list = await articleService.getAllArticles();
        }
        setDbArticles(list);
      } catch (err) {
        console.error('Erro ao buscar artigos para a categoria:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
    window.scrollTo(0, 0);
  }, [slug]);

  // Merge database and static articles
  const allMergedArticles = useMemo(() => {
    const staticList = [
      heroArticle,
      ...heroSideArticles,
      ...topNewsArticles,
      ...latestArticles
    ];

    // Build unique list by slug/id
    const seen = new Set<string>();
    const unique: Article[] = [];

    // Add db articles first
    dbArticles.forEach(a => {
      const key = a.slug || a.id;
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(a);
      }
    });

    // Add static articles if they don't duplicate
    staticList.forEach(a => {
      const key = a.slug || a.id;
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(a);
      }
    });

    return unique;
  }, [dbArticles]);

  // 3. Filter articles matching this Category
  const categoryArticles = useMemo(() => {
    if (!currentCategory) return [];

    if (currentCategory.slug === 'todas') {
      return allMergedArticles;
    }

    if (currentCategory.slug === 'mais-lidas') {
      // Sort by views if available, otherwise return popular slice
      return [...allMergedArticles].sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    // Filter by category name (case insensitive match)
    return allMergedArticles.filter(art => {
      const artCat = (art.category || '').toLowerCase().trim();
      const matchCat = currentCategory.name.toLowerCase().trim();
      
      // Also match if currentCategory is "Inteligência Artificial" and article category is "IA GENERATIVA" or "IA & DADOS"
      if (matchCat === 'inteligência artificial') {
        return artCat.includes('ia') || artCat.includes('inteligencia') || artCat.includes('dados') || artCat.includes('generativa');
      }
      if (matchCat === 'segurança digital') {
        return artCat.includes('seguranca') || artCat.includes('cyber') || artCat.includes('ciber');
      }
      if (matchCat === 'finanças digitais') {
        return artCat.includes('financa') || artCat.includes('cripto') || artCat.includes('banco');
      }
      if (matchCat === 'casa inteligente') {
        return artCat.includes('casa') || artCat.includes('home') || artCat.includes('iot');
      }
      if (matchCat === 'tvs & áudio') {
        return artCat.includes('tv') || artCat.includes('audio') || artCat.includes('som');
      }
      if (matchCat === 'negócios & mercado') {
        return artCat.includes('negocio') || artCat.includes('mercado') || artCat.includes('empresa') || artCat.includes('startup');
      }

      return artCat === matchCat || artCat.includes(matchCat) || matchCat.includes(artCat);
    });
  }, [allMergedArticles, currentCategory]);

  // 4. Refine with active Interactive Filters (Subcategory, Format, Search inside category)
  const filteredArticles = useMemo(() => {
    let result = [...categoryArticles];

    // Filter by Subcategory if selected (looks inside content, title, excerpt or meta)
    if (selectedSubcategory) {
      const subLower = selectedSubcategory.toLowerCase();
      result = result.filter(art => {
        const titleMatch = art.title.toLowerCase().includes(subLower);
        const excerptMatch = (art.excerpt || '').toLowerCase().includes(subLower);
        const contentMatch = (art.content || '').toLowerCase().includes(subLower);
        const catMatch = (art.category || '').toLowerCase().includes(subLower);
        return titleMatch || excerptMatch || contentMatch || catMatch;
      });
    }

    // Filter by Content Format if selected
    if (selectedFormat) {
      const formatLower = selectedFormat.toLowerCase();
      result = result.filter(art => {
        const titleMatch = art.title.toLowerCase().includes(formatLower);
        const excerptMatch = (art.excerpt || '').toLowerCase().includes(formatLower);
        const contentMatch = (art.content || '').toLowerCase().includes(formatLower);
        
        // Also simulate standard categories having metadata if possible
        return titleMatch || excerptMatch || contentMatch;
      });
    }

    // Filter by internal Search Query
    if (searchQuery.trim()) {
      const queryLower = searchQuery.toLowerCase().trim();
      result = result.filter(art => 
        art.title.toLowerCase().includes(queryLower) ||
        (art.excerpt || '').toLowerCase().includes(queryLower) ||
        (art.content || '').toLowerCase().includes(queryLower)
      );
    }

    return result;
  }, [categoryArticles, selectedSubcategory, selectedFormat, searchQuery]);

  // 5. Generate high-fidelity simulated articles matching the specific subcategory
  // This allows beautiful prototype visual coverage when database doesn't have articles for a specific cluster yet!
  const simulatedArticlesForCluster = useMemo(() => {
    if (filteredArticles.length > 0 || !currentCategory) return [];

    const categoryLabel = currentCategory.name;
    const subLabel = selectedSubcategory || currentCategory.subcategories[0] || 'Geral';
    const formatLabel = selectedFormat || 'Artigo';

    // We generate 2 highly relevant simulated drafts
    return [
      {
        id: `sim-1-${subLabel}`,
        title: `${formatLabel}: Tudo o que você precisa saber sobre ${subLabel} em 2026`,
        category: categoryLabel,
        excerpt: `Uma análise profunda sobre o impacto de ${subLabel} no ecossistema de ${categoryLabel}. Confira especificações técnicas, tendências e dicas práticas elaboradas por nossos especialistas.`,
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        imageAlt: `${subLabel} ilustração`,
        author: "Divino Luciano Belmiro",
        date: new Date().toISOString(),
        slug: `guia-completo-${subLabel.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        status: 'published',
        views: 450,
        content: ''
      },
      {
        id: `sim-2-${subLabel}`,
        title: `Comparativo Técnico: Os melhores produtos e soluções de ${subLabel} no mercado brasileiro`,
        category: categoryLabel,
        excerpt: `Comparamos os principais players de ${subLabel} avaliando o custo-benefício, desempenho em tarefas diárias e facilidade de integração. Descubra qual vale mais a pena para você.`,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        imageAlt: `${subLabel} comparativo`,
        author: "Equipe Mega Conectado",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        slug: `comparativo-melhores-${subLabel.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        status: 'published',
        views: 290,
        content: ''
      }
    ] as Article[];
  }, [filteredArticles, currentCategory, selectedSubcategory, selectedFormat]);

  // 6. Generate FAQ Dynamically based on current Category & Subcategory
  const dynamicFAQ = useMemo(() => {
    if (!currentCategory) return [];
    const catName = currentCategory.name;
    const activeSub = selectedSubcategory || 'geral';

    return [
      {
        question: `Como o Mega Conectado avalia conteúdos de ${catName}?`,
        answer: `Nossa equipe analisa as novidades de ${catName} com base em testes práticos de usabilidade, especificações de mercado, tendências em SEO e impacto tecnológico real no cotidiano dos usuários brasileiros.`
      },
      {
        question: `O que foca a seção de ${activeSub} dentro de ${catName}?`,
        answer: `A seção dedicada a ${activeSub} reúne análises detalhadas, tutoriais de como configurar, comparativos de preços e listas de melhores opções para ajudar na tomada de decisão sobre ${catName}.`
      },
      {
        question: `Qual a frequência de atualizações para ${catName}?`,
        answer: `Atualizamos este portal diariamente. Conforme novas atualizações, lançamentos de produtos e novidades da indústria tecnológica surgem, nossos editores publicam guias completos sobre ${catName}.`
      }
    ];
  }, [currentCategory, selectedSubcategory]);

  if (!currentCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Layers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-800">Categoria não encontrada</h1>
        <p className="text-slate-500 mt-2">A seção que você está procurando não existe ou foi movida.</p>
        <Link to="/" className="inline-block mt-6 px-6 py-2.5 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  const categoryConfig = getCategoryConfig(currentCategory.name);
  const IconComponent = categoryConfig.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full font-sans">
      <SEO 
        title={`${currentCategory.name} - Notícias, Reviews e Tutoriais | Mega Conectado`}
        description={currentCategory.description}
      />

      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={[{ label: currentCategory.name }]} />

      {/* 2. Page Header Board */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-brand-secondary text-xs font-extrabold mb-4 uppercase tracking-widest">
              <IconComponent className="w-3.5 h-3.5" />
              Pilar Editorial: {currentCategory.seoPilar}
            </div>
            
            <h1 className="font-heading font-black text-3xl md:text-5xl leading-tight mb-4 tracking-tight">
              {currentCategory.name}
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {currentCategory.description}
            </p>
          </div>

          <div className="shrink-0 bg-white/5 border border-white/10 rounded-2xl p-6 text-center md:min-w-[160px] backdrop-blur-sm">
            <span className="block text-3xl md:text-4xl font-black text-brand-secondary">
              {categoryArticles.length}
            </span>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mt-1">
              Artigos no Pilar
            </span>
          </div>
        </div>
      </div>

      {/* 3. Level 2 Cluster - Subcategories navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-brand-secondary" />
          <h2 className="text-xs font-black text-brand-primary uppercase tracking-widest">
            Subcategorias de {currentCategory.name}
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSubcategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              !selectedSubcategory 
                ? 'bg-brand-primary text-white border-brand-primary shadow-sm' 
                : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            Todas as Subcategorias
          </button>
          
          {currentCategory.subcategories.map((sub) => {
            const isActive = selectedSubcategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(isActive ? null : sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
                  isActive 
                    ? 'bg-brand-secondary text-white border-brand-secondary shadow-sm' 
                    : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content (Left Column) */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* Filters & Search Toolbar (Level 3 - Format / Search refinement) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Internal Search */}
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Buscar em ${currentCategory.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-secondary focus:bg-white transition-all"
                />
              </div>

              {/* Formats refinement */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider hidden sm:inline">Formato:</span>
                <div className="flex gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar">
                  <button
                    onClick={() => setSelectedFormat(null)}
                    className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md transition-all uppercase tracking-wider ${
                      !selectedFormat 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    Todos
                  </button>
                  {CONTENT_FORMATS.slice(0, 6).map((format) => {
                    const isActive = selectedFormat === format;
                    return (
                      <button
                        key={format}
                        onClick={() => setSelectedFormat(isActive ? null : format)}
                        className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md transition-all uppercase tracking-wider whitespace-nowrap ${
                          isActive 
                            ? 'bg-brand-secondary text-white' 
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {format}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active filters summary */}
            {(selectedSubcategory || selectedFormat || searchQuery) && (
              <div className="flex flex-wrap gap-2 items-center mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
                <span>Filtros ativos:</span>
                {selectedSubcategory && (
                  <span className="bg-brand-secondary/10 text-brand-secondary px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                    Subcategoria: {selectedSubcategory}
                    <button onClick={() => setSelectedSubcategory(null)} className="hover:text-red-500 font-extrabold ml-1">×</button>
                  </span>
                )}
                {selectedFormat && (
                  <span className="bg-slate-900/10 text-slate-800 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                    Formato: {selectedFormat}
                    <button onClick={() => setSelectedFormat(null)} className="hover:text-red-500 font-extrabold ml-1">×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                    Termo: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-500 font-extrabold ml-1">×</button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedSubcategory(null);
                    setSelectedFormat(null);
                    setSearchQuery('');
                  }}
                  className="text-brand-secondary hover:underline ml-auto font-bold"
                >
                  Limpar tudo
                </button>
              </div>
            )}
          </div>

          {/* 4. Articles Grid / List */}
          <div className="space-y-6">
            {filteredArticles.length === 0 ? (
              /* High fidelity Simulated Fallback Drafts block */
              <div className="space-y-6">
                {simulatedArticlesForCluster.length > 0 && (
                  <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-500 text-white rounded-lg shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 text-sm">Visualização de Clusters de Conteúdo</h4>
                        <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                          Nenhum artigo real foi publicado no banco de dados para a subcategoria <strong>"{selectedSubcategory || 'Geral'}"</strong> ainda. 
                          Abaixo, geramos ideias de pauta de alta fidelidade para demonstrar a escala e SEO deste pilar:
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {(simulatedArticlesForCluster.length > 0 ? simulatedArticlesForCluster : []).map((article) => (
                  <Link to={`/artigo/${article.slug}`} key={article.id} className="block group">
                    <article className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-secondary transition-all flex flex-col md:flex-row gap-6 hover:shadow-md">
                      <div className="md:w-1/3 h-44 rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
                        {article.imageUrl && (
                          <OptimizedImage 
                            src={article.imageUrl} 
                            alt={article.imageAlt || article.title} 
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                          />
                        )}
                        <span className="absolute top-2 left-2 bg-brand-primary/95 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md backdrop-blur-sm">
                          Ideia de Pauta
                        </span>
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryBadge category={article.category} />
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">• 2026</span>
                        </div>
                        <h3 className="font-heading font-black text-lg md:text-xl leading-snug text-brand-primary group-hover:text-brand-secondary transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-slate-100">
                          <span className="flex items-center gap-1 font-medium"><User className="w-3.5 h-3.5" /> {article.author}</span>
                          <span className="text-brand-secondary font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Escrever Artigo <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}

                {simulatedArticlesForCluster.length === 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-bold">Nenhum resultado encontrado</p>
                    <p className="text-slate-400 text-xs mt-1">Tente ajustar seus filtros ou digite um termo diferente.</p>
                  </div>
                )}
              </div>
            ) : (
              /* Real articles matching filters */
              <div className="space-y-6">
                {filteredArticles.slice(0, visibleCount).map((article) => (
                  <Link to={getArticleUrl(article)} key={article.id} className="block group">
                    <article className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-brand-secondary transition-all flex flex-col md:flex-row gap-6 hover:shadow-md">
                      <div className="md:w-1/3 h-44 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        {article.imageUrl && (
                          <OptimizedImage 
                            src={article.imageUrl} 
                            alt={article.imageAlt || article.title} 
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                          />
                        )}
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryBadge category={article.category} />
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {formatDate(article.date)}
                          </span>
                        </div>
                        <h3 className="font-heading font-black text-lg md:text-xl leading-snug text-brand-primary group-hover:text-brand-secondary transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-slate-100">
                          <span className="flex items-center gap-1 font-medium">
                            <User className="w-3.5 h-3.5" /> {article.author || 'Redação'}
                          </span>
                          <span className="text-brand-primary font-bold group-hover:text-brand-secondary transition-colors inline-flex items-center gap-1">
                            Ler artigo <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}

                {filteredArticles.length > visibleCount && (
                  <div className="pt-4 text-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 4)}
                      className="px-8 py-3 rounded-xl border-2 border-brand-primary text-brand-primary font-heading font-black text-xs uppercase tracking-wider hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                    >
                      Carregar Mais Conteúdos
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 5. Category-specific dynamic FAQs */}
          <div className="pt-4">
            <FAQ items={dynamicFAQ} />
          </div>

        </main>

        {/* Sidebar (Right Column) */}
        <aside className="lg:col-span-4 space-y-8">
          {/* SEO Authority Silo Info card */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-secondary/15 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h4 className="text-xs font-black text-brand-secondary uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Cluster de SEO Ativo
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Este portal organiza os conteúdos de <strong>{currentCategory.name}</strong> em clusters semânticos para indexar perfeitamente no Google.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">Pilar Principal</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{currentCategory.seoPilar}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">Clusters Monitorados</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentCategory.seoClusters.map(c => (
                      <span key={c} className="text-[9px] font-bold bg-brand-secondary/20 text-brand-secondary px-1.5 py-0.5 rounded">
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdSpace format="vertical" />
          
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
