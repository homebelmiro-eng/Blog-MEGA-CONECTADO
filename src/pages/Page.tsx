import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import { FAQItem } from '../types';
import authorPortrait from '../assets/images/divino_luciano_belmiro.jpg';

export default function Page() {
  const { slug } = useParams<{ slug: string }>();

  // Default FAQs for institutional pages to improve GEO ranking
  const getPageFAQ = (slug: string | undefined): FAQItem[] => {
    switch (slug) {
      case 'equipe':
      case 'sobre-o-autor':
        return [
          {
            question: "Quem faz parte da Equipe MegaConectado?",
            answer: "Nossa equipe é formada por profissionais e colaboradores especializados em tecnologia, Inteligência Artificial, SEO e marketing digital."
          },
          {
            question: "Como entrar em contato com a equipe?",
            answer: "Você pode entrar em contato através do e-mail contato@megaconectado.com.br."
          }
        ];
      case 'sobre':
        return [
          {
            question: "O que é o MegaConectado?",
            answer: "O MegaConectado é um portal especializado em Inteligência Artificial, tecnologia, SEO, marketing digital e produtividade."
          },
          {
            question: "Como os conteúdos são produzidos?",
            answer: "Todos os conteúdos são elaborados com base em pesquisas, documentação oficial, testes práticos e análise de fontes confiáveis."
          }
        ];
      case 'metodologia-editorial':
        return [
          {
            question: "Como os produtos são avaliados?",
            answer: "Avaliamos desempenho, qualidade de construção, recursos disponíveis, facilidade de uso, custo-benefício, suporte e atualizações, reputação da marca e avaliações de usuários."
          }
        ];
      case 'privacidade':
        return [
          {
            question: "Como meus dados são protegidos no Mega Conectado?",
            answer: "Seguimos rigorosamente a LGPD, utilizando criptografia e práticas de segurança avançadas para garantir que suas informações pessoais estejam seguras."
          },
          {
            question: "O site utiliza cookies?",
            answer: "Sim, utilizamos cookies para melhorar sua experiência de navegação e analisar o tráfego do site de forma anônima."
          }
        ];
      default:
        return [
          {
            question: "O que é o portal Mega Conectado?",
            answer: "O Mega Conectado é um portal de notícias dedicado a Inteligência Artificial, Inovação e Tecnologia, trazendo análises diárias e tendências do mercado global."
          },
          {
            question: "Como posso acompanhar as novidades do site?",
            answer: "Você pode nos seguir nas redes sociais e ativar as notificações do navegador para receber os artigos mais recentes em tempo real."
          }
        ];
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const renderContent = () => {
    if (slug === 'equipe' || slug === 'sobre-o-autor') {
      return (
        <div className="flex flex-col gap-10">
          <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-[300px] md:h-[450px]">
            <img 
              src={authorPortrait} 
              alt="Equipe MegaConectado" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <div className="flex flex-col gap-2">
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight">Equipe MegaConectado</h2>
                <p className="text-lg md:text-2xl font-semibold text-brand-secondary">Especialistas em Tecnologia & Inovação</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-brand-secondary/30 group">
              <div className="p-3 bg-brand-secondary/10 rounded-lg text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail</span>
                <span className="font-bold text-brand-primary">contato@megaconectado.com.br</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-brand-secondary/30 group">
              <div className="p-3 bg-brand-secondary/10 rounded-lg text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Localização</span>
                <span className="font-bold text-brand-primary">Brasil</span>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h3 className="font-heading font-bold text-brand-primary m-0 uppercase tracking-[0.2em] text-sm">Nossa Equipe</h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <p className="lead text-xl text-slate-600 font-medium">
              A Equipe MegaConectado é formada por profissionais e colaboradores especializados em tecnologia, Inteligência Artificial, SEO e marketing digital.
            </p>
            <p>
              Nosso compromisso é produzir conteúdos confiáveis, atualizados e úteis, sempre baseados em fontes verificadas e nas melhores práticas do setor.
            </p>
          </div>
        </div>
      );
    }
    
    if (slug === 'sobre') {
      return (
        <div className="prose prose-lg prose-slate max-w-none">
          <h2>Quem somos</h2>
          <p>
            O MegaConectado é um portal especializado em Inteligência Artificial, tecnologia, SEO, marketing digital e produtividade. Nosso objetivo é produzir conteúdo confiável, atualizado e acessível para ajudar pessoas e empresas a tomar melhores decisões.
          </p>
          <p>
            Publicamos tutoriais, análises, reviews, comparativos, guias de compra e notícias sobre as principais tendências do mercado digital.
          </p>
          <h2>Nossa missão</h2>
          <p>
            Nossa missão é transformar temas complexos em conteúdos claros, completos e úteis, facilitando o aprendizado e o uso de novas tecnologias por qualquer pessoa.
          </p>
          <h2>Como produzimos nossos conteúdos</h2>
          <p>
            Todos os conteúdos do MegaConectado são elaborados com base em pesquisas, documentação oficial, testes práticos quando possível e análise de fontes confiáveis. Nossos artigos passam por revisão editorial para garantir precisão, clareza e atualização constante.
          </p>
        </div>
      );
    }

    if (slug === 'metodologia-editorial') {
      return (
        <div className="prose prose-lg prose-slate max-w-none">
          <h2>Como avaliamos produtos</h2>
          <p>
            Os reviews e comparativos do MegaConectado seguem critérios objetivos, como:
          </p>
          <ul>
            <li>desempenho;</li>
            <li>qualidade de construção;</li>
            <li>recursos disponíveis;</li>
            <li>facilidade de uso;</li>
            <li>custo-benefício;</li>
            <li>suporte e atualizações;</li>
            <li>reputação da marca;</li>
            <li>avaliações de usuários.</li>
          </ul>
          <p>
            Nosso objetivo é fornecer informações imparciais para auxiliar o leitor na escolha do produto mais adequado.
          </p>
        </div>
      );
    }

    return (
      <div className="prose prose-lg prose-slate max-w-none">
        <p>O conteúdo da página "{slug?.replace(/-/g, ' ')}" será exibido aqui. Esta é uma página institucional em construção.</p>
      </div>
    );
  };

  const pageTitle = slug ? slug.replace(/-/g, ' ') : 'Página';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO 
        title={`${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)} | Mega Conectado`}
      />
      <Link to="/" className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Home
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 flex flex-col gap-6">
           <article className="bg-white p-8 md:p-12 rounded-xl border border-slate-200">
             <div className="mb-6">
                <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight leading-tight mb-4 capitalize">
                  {slug?.replace(/-/g, ' ')}
                </h1>
             </div>
             
             {renderContent()}

             <FAQ items={getPageFAQ(slug)} />
           </article>
        </main>
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
