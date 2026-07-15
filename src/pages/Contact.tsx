import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, Clock, ShieldCheck, MessageSquare, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 8 seconds
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO 
        title="Contato | MegaConectado" 
        description="Fale com a equipe do MegaConectado. Envie suas dúvidas, sugestões de pauta, propostas comerciais ou informações sobre anúncios."
      />
      <Link to="/" className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Home
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 flex flex-col gap-6">
           <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
             <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full font-bold text-xs uppercase tracking-wider mb-3">
                  <MessageSquare className="w-3.5 h-3.5" /> Canal de Atendimento
                </div>
                <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight leading-tight mb-4 uppercase">
                  Fale Conosco
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Tem alguma dúvida sobre Inteligência Artificial, sugestão de pauta técnica, proposta de parceria de marketing de afiliados ou deseja anunciar em nosso portal? Escolha o melhor canal abaixo ou envie uma mensagem direta pelo nosso formulário oficial.
                </p>
             </div>
             
             {/* Contact Cards Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <a 
                  href="mailto:contato@megaconectado.com.br" 
                  className="flex flex-col p-6 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-brand-secondary transition-all hover:shadow-md group"
                >
                  <div className="p-3 bg-brand-secondary/10 text-brand-secondary rounded-lg w-fit mb-4 group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-brand-primary text-base mb-1">E-mail Oficial</h3>
                  <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Contato Direto</p>
                  <span className="text-sm font-bold text-brand-secondary break-all">contato@megaconectado.com.br</span>
                </a>

                <a 
                  href="https://wa.me/5543984390879" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col p-6 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-brand-secondary transition-all hover:shadow-md group"
                >
                  <div className="p-3 bg-green-500/10 text-green-600 rounded-lg w-fit mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-brand-primary text-base mb-1">WhatsApp Business</h3>
                  <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Suporte Comercial</p>
                  <span className="text-sm font-bold text-green-600">+55 (43) 98439-0879</span>
                </a>

                <div className="flex flex-col p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="p-3 bg-amber-500/10 text-amber-600 rounded-lg w-fit mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-brand-primary text-base mb-1">Localização</h3>
                  <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Sede Administrativa</p>
                  <span className="text-sm font-bold text-slate-700">Londrina, Paraná, Brasil</span>
                </div>
             </div>

             {/* SLA and Commitment Info Banner */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 mb-12 text-xs text-slate-600">
               <div className="flex gap-3 items-start">
                 <Clock className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                 <div>
                   <h4 className="font-bold text-brand-primary mb-1 uppercase tracking-wider">Resposta Rápida</h4>
                   <p className="m-0 leading-relaxed">Nossa equipe editorial responde a 98% dos e-mails em até 24 horas úteis.</p>
                 </div>
               </div>
               <div className="flex gap-3 items-start border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
                 <ShieldCheck className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                 <div>
                   <h4 className="font-bold text-brand-primary mb-1 uppercase tracking-wider">Dados Seguros</h4>
                   <p className="m-0 leading-relaxed">Seus dados de contato estão protegidos e são tratados estritamente sob a LGPD.</p>
                 </div>
               </div>
               <div className="flex gap-3 items-start border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
                 <AlertCircle className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                 <div>
                   <h4 className="font-bold text-brand-primary mb-1 uppercase tracking-wider">Horário Operacional</h4>
                   <p className="m-0 leading-relaxed">Atendimento administrativo de Segunda a Sexta-feira, das 09h às 18h (Horário de Brasília).</p>
                 </div>
               </div>
             </div>

             {isSubmitted ? (
               <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-xl text-center flex flex-col items-center gap-4 animate-fade-in">
                 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-3xl">✓</div>
                 <div>
                   <h3 className="font-heading font-bold text-2xl mb-2">Mensagem Recebida com Sucesso!</h3>
                   <p className="text-slate-600 max-w-md mx-auto">
                     Agradecemos o seu contato. Um de nossos especialistas revisará sua solicitação e responderá diretamente no seu e-mail em até 24 horas.
                   </p>
                 </div>
                 <button 
                   onClick={() => setIsSubmitted(false)}
                   className="mt-2 text-xs font-bold text-brand-secondary hover:underline uppercase tracking-widest"
                 >
                   Enviar outra mensagem
                 </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                 <div className="border-t border-slate-100 pt-8 mb-2">
                   <h2 className="font-heading font-bold text-xl text-brand-primary mb-2 uppercase tracking-wide">Formulário de Mensagem Direta</h2>
                   <p className="text-sm text-slate-500">Campos marcados são de preenchimento obrigatório.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                     <label htmlFor="name" className="font-bold text-sm text-brand-primary">Nome Completo</label>
                     <input 
                       type="text" 
                       id="name" 
                       name="name" 
                       required
                       value={formData.name}
                       onChange={handleChange}
                       className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all"
                       placeholder="Ex: João da Silva"
                     />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label htmlFor="email" className="font-bold text-sm text-brand-primary">Endereço de E-mail</label>
                     <input 
                       type="email" 
                       id="email" 
                       name="email" 
                       required
                       value={formData.email}
                       onChange={handleChange}
                       className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all"
                       placeholder="Ex: joao.silva@empresa.com"
                     />
                   </div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                   <label htmlFor="subject" className="font-bold text-sm text-brand-primary">Assunto de Contato</label>
                   <select 
                     id="subject" 
                     name="subject" 
                     required
                     value={formData.subject}
                     onChange={handleChange}
                     className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all bg-white"
                   >
                     <option value="" disabled>Selecione a finalidade do contato</option>
                     <option value="sugestao">Sugestão de Pauta / Artigo Técnico</option>
                     <option value="anuncio">Anuncie Conosco (Mídia Kit & Banners)</option>
                     <option value="afiliado">Parceria de Afiliados / SaaS Reviews</option>
                     <option value="duvida">Dúvida / Erro em Tutorial Prático</option>
                     <option value="outro">Outro Assunto</option>
                   </select>
                 </div>

                 <div className="flex flex-col gap-2">
                   <label htmlFor="message" className="font-bold text-sm text-brand-primary">Mensagem Detalhada</label>
                   <textarea 
                     id="message" 
                     name="message" 
                     required
                     rows={6}
                     value={formData.message}
                     onChange={handleChange}
                     className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all resize-none"
                     placeholder="Escreva detalhadamente sua dúvida, sugestão ou proposta comercial. Se aplicável, inclua links ou referências para nos ajudar a entender melhor."
                   ></textarea>
                 </div>

                 <button 
                   type="submit" 
                   className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 uppercase tracking-wider cursor-pointer shadow-sm"
                 >
                   <Send className="w-5 h-5" />
                   Enviar Mensagem com Segurança
                 </button>
               </form>
             )}
           </div>
        </main>
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <AdSpace format="vertical" />
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
