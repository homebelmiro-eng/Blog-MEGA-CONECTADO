import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import { FAQItem } from '../types';
import authorPortrait from '../assets/images/author_portrait_1783796349533.jpg';

export default function Page() {
  const { slug } = useParams<{ slug: string }>();

  // Default FAQs for institutional pages to improve GEO ranking
  const getPageFAQ = (slug: string | undefined): FAQItem[] => {
    switch (slug) {
      case 'sobre-o-autor':
        return [
          {
            question: "Quem é Divino Luciano Belmiro?",
            answer: "Divino Luciano Belmiro é Psicanalista Clínico e Terapeuta Integrativo, além de editor do portal Mega Conectado, focado em tecnologia e inovação."
          },
          {
            question: "Como entrar em contato com o autor?",
            answer: "Você pode entrar em contato através do e-mail contato@megaconectado.com.br ou pelo telefone +55 (43) 98439-0879."
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
    if (slug === 'sobre-o-autor') {
      return (
        <div className="flex flex-col gap-10">
          <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-[300px] md:h-[450px]">
            <img 
              src={authorPortrait} 
              alt="Divino Luciano Belmiro" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <div className="flex flex-col gap-2">
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight">Divino Luciano Belmiro</h2>
                <p className="text-lg md:text-2xl font-semibold text-brand-secondary">Psicanalista Clínico & Terapeuta Integrativo</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-brand-secondary/30 group">
              <div className="p-3 bg-brand-secondary/10 rounded-lg text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telefone</span>
                <span className="font-bold text-brand-primary">+55 (43) 98439-0879</span>
              </div>
            </div>
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
                <span className="font-bold text-brand-primary">Londrina, PR, Brasil</span>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h3 className="font-heading font-bold text-brand-primary m-0 uppercase tracking-[0.2em] text-sm">Biografia & Atuação</h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <p className="lead text-xl text-slate-600 font-medium">
              Com uma abordagem que une a escuta analítica profunda e práticas integrativas de saúde, 
              Divino Luciano Belmiro dedica-se a ajudar pessoas a ressignificarem suas dores e encontrarem equilíbrio emocional.
            </p>
            <p>
              Sua jornada profissional é marcada pela busca constante por conhecimento e pela paixão 
              em compreender a complexidade da mente humana. Como Psicanalista Clínico, utiliza ferramentas 
              técnicas para explorar o inconsciente e promover o autoconhecimento.
            </p>
            <p>
              Além de sua atuação clínica, é o editor-chefe do portal <strong>Mega Conectado</strong>, 
              onde funde seu interesse por comportamento humano com a inovação tecnológica. No portal, 
              ele analisa como a Inteligência Artificial e as transformações digitais impactam nossa 
              psique e o tecido social, promovendo um debate humanizado sobre o futuro da tecnologia.
            </p>
          </div>
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
