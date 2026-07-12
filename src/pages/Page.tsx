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
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img 
              src={authorPortrait} 
              alt="Foto de Divino Luciano Belmiro" 
              className="w-48 h-48 rounded-2xl object-cover shadow-md border-4 border-white"
            />
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-heading font-extrabold text-3xl text-brand-primary mb-2">Divino Luciano Belmiro</h2>
                <p className="text-xl font-semibold text-brand-secondary">Psicanalista Clínico & Terapeuta Integrativo</p>
              </div>
              
              <div className="flex flex-col gap-2 text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-brand-secondary" />
                  <span>+55 (43) 98439-0879</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-secondary" />
                  <span>contato@megaconectado.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-secondary" />
                  <span>Londrina, Paraná, Brasil</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <p>
              Com uma abordagem que une a escuta analítica profunda e práticas integrativas de saúde, 
              dedica-se a ajudar pessoas a ressignificarem suas dores e encontrarem equilíbrio emocional.
            </p>
            <p>
              Sua jornada profissional é marcada pela busca constante por conhecimento e pela paixão 
              em compreender a complexidade da mente humana. Através do portal Mega Conectado, 
              busca compartilhar insights valiosos e promover a conscientização sobre saúde mental 
              e bem-estar no mundo digital.
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
