import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, X, Eye, Calendar, User, Tag, Share2, 
  Facebook, Twitter, Linkedin, Link as LinkIcon, MessageSquare,
  ChevronRight, Clock, MapPin, Bookmark, ExternalLink,
  Volume2, Square, Pause, Play
} from 'lucide-react';
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
import authorPortrait from '../assets/images/divino_luciano_belmiro.jpg';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import Breadcrumbs from '../components/Breadcrumbs';

const SocialShare = () => (
  <div className="flex items-center gap-2 mb-8">
    <button className="p-2 rounded-full bg-[#1877F2] text-white hover:brightness-110 transition-all">
      <Facebook className="w-4 h-4" />
    </button>
    <button className="p-2 rounded-full bg-[#1DA1F2] text-white hover:brightness-110 transition-all">
      <Twitter className="w-4 h-4" />
    </button>
    <button className="p-2 rounded-full bg-[#0A66C2] text-white hover:brightness-110 transition-all">
      <Linkedin className="w-4 h-4" />
    </button>
    <button className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
      <LinkIcon className="w-4 h-4" />
    </button>
    <button className="ml-auto p-2 rounded-full bg-slate-50 text-slate-400 hover:text-brand-secondary transition-all">
      <Bookmark className="w-4 h-4" />
    </button>
  </div>
);

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
          let dbArticle = await articleService.getArticleBySlug(slugOrId);
          if (!dbArticle) {
            dbArticle = await articleService.getArticleById(slugOrId);
          }

          if (dbArticle) {
            setArticle(dbArticle);
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

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlayAudio = () => {
    if (!article) return;
    
    if (isPausedAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      setIsPlayingAudio(true);
      return;
    }
    
    if (isPlayingAudio) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      setIsPlayingAudio(false);
      return;
    }
    
    const plainText = (article.content || '').replace(/[#*_>\[\]]/g, '').replace(/\n/g, ' ');
    const utterance = new SpeechSynthesisUtterance(article.title + '. ' + plainText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    
    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };
    
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };
    
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
  };
  
  const handleStopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium font-heading">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4 text-brand-primary">Artigo não encontrado</h2>
        <Link to="/" className="text-brand-secondary hover:underline font-bold">Voltar para a Página Inicial</Link>
      </div>
    );
  }

  const renderContent = () => (
    <div className="space-y-8">
      <header className="space-y-6">
        <div className="space-y-4">
          <Link to={`/categoria/${article.category.toLowerCase()}`} className="text-brand-secondary font-mono text-xs font-bold uppercase tracking-[0.2em] hover:underline">
            {article.category}
          </Link>
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-brand-primary tracking-tight leading-[1.1] mb-6">
            {article.title}
          </h1>
          
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 my-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-brand-primary mb-4">Resposta rápida</h2>
            <p className="text-slate-700 font-medium text-lg leading-relaxed">
              Se você procura <strong className="text-brand-secondary">{article.tags?.[0] || article.title}</strong>, a melhor opção atualmente depende do seu objetivo e orçamento. Neste guia reunimos os principais modelos, destacando vantagens, desvantagens e custo-benefício para ajudar você a fazer a melhor escolha.
            </p>
          </div>

          {article.excerpt && (
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium border-l-4 border-brand-secondary/30 pl-6 italic">
              {article.excerpt}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-y border-slate-100">
          <div className="flex items-center gap-4">
            <img 
              src={authorPortrait} 
              alt={article.author || 'Divino Luciano Belmiro'} 
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-brand-primary">Por {article.author || 'Divino Luciano Belmiro'}</span>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.date)}
                </span>
                {article.views !== undefined && (
                  <span className="flex items-center gap-1 text-brand-secondary">
                    <Eye className="w-3 h-3" />
                    {article.views.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {(isPlayingAudio || isPausedAudio) && (
              <button 
                onClick={handleStopAudio}
                className="flex items-center gap-2 px-3 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 transition-all text-xs font-bold uppercase tracking-wider"
                title="Parar Áudio"
              >
                <Square className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={handlePlayAudio}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg text-xs font-bold uppercase tracking-wider ${isPlayingAudio ? 'bg-brand-secondary text-white' : 'bg-slate-100 hover:bg-slate-200 text-brand-primary border border-slate-200'}`}
              title={isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Artigo'}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : isPausedAudio ? <Play className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Pausar' : isPausedAudio ? 'Continuar' : 'Ouvir Artigo'}</span>
            </button>

            <button 
              onClick={() => setIsReaderMode(!isReaderMode)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-secondary text-white transition-all shadow-md hover:shadow-lg text-xs font-bold uppercase tracking-wider"
              title="Modo de Leitura"
            >
              {isReaderMode ? <X className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              <span className="hidden sm:inline">{isReaderMode ? 'Sair' : 'Modo Leitura'}</span>
            </button>
          </div>
        </div>
      </header>
      
      <SocialShare />

      {article.imageUrl && (
        <figure className="space-y-3 -mx-4 md:-mx-12 lg:-mx-16">
          <div className="aspect-video w-full overflow-hidden shadow-2xl">
            <img 
              src={article.imageUrl} 
              alt={article.imageAlt || article.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          {article.imageAlt && (
            <figcaption className="px-4 md:px-12 lg:px-16 text-center text-xs text-slate-400 italic">
              {article.imageAlt}
            </figcaption>
          )}
        </figure>
      )}

      <div className="article-body">
        <TableOfContents />
        
        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-secondary hover:prose-a:text-brand-primary prose-img:rounded-2xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            components={{
              h2: ({node, ...props}) => (
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-primary mt-14 mb-8 pb-4 border-b-2 border-slate-100 flex items-center gap-3 relative before:content-[''] before:absolute before:-left-6 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-8 before:bg-brand-secondary before:rounded-full before:hidden md:before:block" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-800 mt-10 mb-6 flex items-center gap-3" {...props}>
                  <span className="w-2 h-6 bg-brand-tertiary rounded-full block"></span>
                  {props.children}
                </h3>
              ),
              a: ({node, href, children, ...props}) => {
                const isExternal = href?.startsWith('http');
                return (
                  <a 
                    href={href}
                    className="inline-flex items-center gap-1.5 font-bold text-brand-primary hover:text-white bg-brand-secondary/10 hover:bg-brand-secondary px-2 py-1 rounded-md transition-all border border-brand-secondary/20 shadow-sm"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    {...props}
                  >
                    {children}
                    {isExternal && <ExternalLink className="w-4 h-4 flex-shrink-0" />}
                  </a>
                );
              },
              img: ({node, alt, ...props}) => (
                <span className="block my-10 relative group rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200">
                  <img className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" alt={alt} {...props} />
                  {alt && (
                    <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {alt}
                    </span>
                  )}
                </span>
              )
            }}
          >
            {article.content || `
## Introdução ao Tema
Este é o conteúdo demonstrativo do artigo "${article.title}". A Inteligência Artificial e a tecnologia estão avançando a passos largos, e compreender esse movimento é essencial. De acordo com especialistas do setor, o cenário atual exige adaptabilidade e visão de longo prazo.

Muitos profissionais se perguntam como essas inovações afetarão suas carreiras. A resposta não é simples, mas envolve aprendizado contínuo e a capacidade de se reinventar.

## Impacto no Mercado Atual
Os números mostram uma mudança clara. Empresas que adotaram novas tecnologias de forma precoce relataram um aumento significativo em suas métricas de eficiência. A automação, aliada à análise de dados, permite decisões mais ágeis e precisas.

> "A tecnologia não substitui o ser humano; ela amplia suas capacidades. O verdadeiro desafio é como integramos essas ferramentas em nosso dia a dia de forma ética e sustentável." - Especialista do Setor.

## Principais Desafios e Oportunidades
Apesar do otimismo, existem barreiras. A implementação exige investimentos em infraestrutura e, principalmente, no treinamento das equipes. Além disso, questões regulatórias, de privacidade e segurança da informação estão na pauta das discussões globais.

- Falta de mão de obra qualificada no mercado.
- Dilemas éticos e a necessidade de regulamentação clara.
- Segurança de dados em ambientes altamente conectados.

## O que Esperar do Futuro
As projeções para os próximos anos indicam uma integração ainda maior entre o mundo físico e o digital. A Internet das Coisas (IoT), redes 6G e novos paradigmas computacionais (como a computação quântica) devem acelerar esse processo.

## Conclusão
Estar preparado para essas mudanças é o que diferenciará os líderes dos seguidores na próxima década. Acompanhar as notícias e tendências no Mega Conectado é o primeiro passo para garantir seu lugar nesse futuro promissor.
            `}
          </ReactMarkdown>
        </div>

        {article.faq && article.faq.length > 0 && (
          <FAQ items={article.faq} />
        )}

        {article.locationName && article.geoEnabled && (
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="p-3 bg-white rounded-full shadow-sm text-brand-secondary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Conteúdo Localizado em:</p>
              <p className="text-lg font-heading font-bold text-brand-primary">{article.locationName}</p>
            </div>
          </div>
        )}
      </div>

      <footer className="pt-12 border-t border-slate-100 mt-12">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Tag className="w-4 h-4 text-slate-400" />
          {article.tags?.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium hover:bg-brand-secondary/10 hover:text-brand-secondary transition-all cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
        <SocialShare />
      </footer>
    </div>
  );

  if (isReaderMode) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#fdfaf6] text-[#2c2c2c] overflow-y-auto selection:bg-brand-secondary/30 selection:text-brand-primary">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-24">
           {renderContent()}
        </div>
        <button 
          onClick={() => setIsReaderMode(false)}
          className="fixed top-8 right-8 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg border border-slate-200 hover:bg-white transition-all text-slate-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30">
      <SEO 
        title={article.title} 
        description={article.excerpt || article.metaDescription} 
        image={article.imageUrl}
        type="article"
        publishDate={article.date}
        canonicalUrl={`https://megaconectado.com.br/artigo/${article.slug || article.id}`}
        authorName={article.author || 'Divino Luciano Belmiro'}
        geoEnabled={article.geoEnabled}
        locationName={article.locationName}
        latitude={article.latitude}
        longitude={article.longitude}
        faq={article.faq}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Breadcrumbs category={article.category} title={article.title} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8 flex flex-col gap-8">
             <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 md:p-12 lg:p-16">
                 {renderContent()}
               </div>
             </article>

             <RelatedArticles currentCategory={article.category} currentArticleId={article.id} />
          </main>
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="sticky top-24 space-y-8">
              <AdSpace format="vertical" />
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
