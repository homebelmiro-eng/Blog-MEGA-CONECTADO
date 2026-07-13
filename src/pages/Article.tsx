import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, X, Eye, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { articleService } from '../lib/services';
import { isFirebaseConfigured } from '../lib/firebase';
import { formatDate } from '../lib/utils';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';
import FAQ from '../components/FAQ';
import RelatedArticles from '../components/RelatedArticles';
import { heroArticle, heroSideArticles, topNewsArticles, latestArticles } from '../data';
import { Article as ArticleType } from '../types';

export default function Article() {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!slugOrId) return;
      setLoading(true);
      
      const fallbackToStatic = () => {
        const allArticles = [
          heroArticle,
          ...heroSideArticles,
          ...topNewsArticles,
          ...latestArticles
        ];
        const foundArticle = allArticles.find(a => a.id === slugOrId || a.slug === slugOrId);
        setArticle(foundArticle || null);
      };

      try {
        if (isFirebaseConfigured) {
          // Try fetching by slug first
          let dbArticle = await articleService.getArticleBySlug(slugOrId);
          
          // If not found by slug, try by ID
          if (!dbArticle) {
            dbArticle = await articleService.getArticleById(slugOrId);
          }

          if (dbArticle) {
            setArticle(dbArticle);
            // Track view using the internal ID
            articleService.trackView(dbArticle.id);
          } else {
            fallbackToStatic();
          }
        } else {
          fallbackToStatic();
        }
      } catch (error) {
        console.error('Error loading article from Firestore:', error);
        fallbackToStatic();
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
    window.scrollTo(0, 0);
  }, [slugOrId]);

  // Toggle body class for reader mode
  useEffect(() => {
    if (isReaderMode) {
      document.body.classList.add('reader-mode-active');
    } else {
      document.body.classList.remove('reader-mode-active');
    }
    return () => {
      document.body.classList.remove('reader-mode-active');
    };
  }, [isReaderMode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Artigo não encontrado</h2>
        <Link to="/" className="text-brand-secondary hover:underline">Voltar para Home</Link>
      </div>
    );
  }

  const renderContent = () => (
    <>
      <div className="mb-6">
        <span className="inline-block px-3 py-1 bg-slate-100 text-brand-secondary font-mono text-xs rounded mb-4 uppercase tracking-wider">
          {article.category}
        </span>
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight leading-tight mb-4">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm font-sans text-slate-500">
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author || 'Equipe Editorial'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.date)}
            </span>
            {article.views !== undefined && (
              <span className="flex items-center gap-1 text-brand-secondary font-bold">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()} visualizações
              </span>
            )}
          </div>
          <button 
            onClick={() => setIsReaderMode(!isReaderMode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Modo de Leitura"
          >
            {isReaderMode ? <X className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
            <span className="hidden sm:inline">{isReaderMode ? 'Sair do Modo' : 'Modo de Leitura'}</span>
          </button>
        </div>
      </div>
      
      <div className="prose prose-lg prose-slate max-w-none">
        {article.excerpt && (
          <p className="lead font-semibold text-slate-700 text-xl mb-8">
            {article.excerpt}
          </p>
        )}
        
        <TableOfContents />

        <section id="introducao" className="mt-8 scroll-mt-24">
          <h2>Introdução ao Tema</h2>
          <p>Este é o conteúdo demonstrativo do artigo "{article.title}". A Inteligência Artificial e a tecnologia estão avançando a passos largos, e compreender esse movimento é essencial. De acordo com especialistas do setor, o cenário atual exige adaptabilidade e visão de longo prazo.</p>
          <p>Muitos profissionais se perguntam como essas inovações afetarão suas carreiras. A resposta não é simples, mas envolve aprendizado contínuo e a capacidade de se reinventar.</p>
        </section>

        <section id="impacto-mercado" className="mt-8 scroll-mt-24">
          <h2>Impacto no Mercado Atual</h2>
          <p>Os números mostram uma mudança clara. Empresas que adotaram novas tecnologias de forma precoce relataram um aumento significativo em suas métricas de eficiência. A automação, aliada à análise de dados, permite decisões mais ágeis e precisas.</p>
          <blockquote>
            "A tecnologia não substitui o ser humano; ela amplia suas capacidades. O verdadeiro desafio é como integramos essas ferramentas em nosso dia a dia de forma ética e sustentável." - Especialista do Setor.
          </blockquote>
        </section>

        <section id="principais-desafios" className="mt-8 scroll-mt-24">
          <h2>Principais Desafios e Oportunidades</h2>
          <p>Apesar do otimismo, existem barreiras. A implementação exige investimentos em infraestrutura e, principalmente, no treinamento das equipes. Além disso, questões regulatórias, de privacidade e segurança da informação estão na pauta das discussões globais.</p>
          <ul>
            <li>Falta de mão de obra qualificada no mercado.</li>
            <li>Dilemas éticos e a necessidade de regulamentação clara.</li>
            <li>Segurança de dados em ambientes altamente conectados.</li>
          </ul>
        </section>

        <section id="futuro" className="mt-8 scroll-mt-24">
          <h2>O que Esperar do Futuro</h2>
          <p>As projeções para os próximos anos indicam uma integração ainda maior entre o mundo físico e o digital. A Internet das Coisas (IoT), redes 6G e novos paradigmas computacionais (como a computação quântica) devem acelerar esse processo.</p>
        </section>

        <section id="conclusao" className="mt-8 scroll-mt-24">
          <h2>Conclusão</h2>
          <p>Estar preparado para essas mudanças é o que diferenciará os líderes dos seguidores na próxima década. Acompanhar as notícias e tendências no Mega Conectado é o primeiro passo para garantir seu lugar nesse futuro promissor.</p>
        </section>

        {article.faq && article.faq.length > 0 && (
          <FAQ items={article.faq} />
        )}
      </div>
    </>
  );

  if (isReaderMode) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#fdfaf6] text-[#2c2c2c] overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
           {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO 
         title={article.title} 
         description={article.excerpt} 
         image={article.imageUrl}
        type="article"
      />
      <Link to="/" className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Home
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 flex flex-col gap-6">
           <article className="bg-white rounded-xl border border-slate-200 overflow-hidden">
             {article.imageUrl && (
               <div className="w-full aspect-video md:h-[400px]">
                 <img src={article.imageUrl} alt={article.imageAlt} className="w-full h-full object-cover" />
               </div>
             )}
             <div className="p-8 md:p-12">
               {renderContent()}
             </div>
           </article>

           <RelatedArticles currentCategory={article.category} currentArticleId={article.id} />
        </main>
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <AdSpace format="vertical" />
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
