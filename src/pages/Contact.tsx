import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
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
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO 
        title="Contato | Mega Conectado" 
        description="Fale com a equipe do Mega Conectado. Envie suas dúvidas, sugestões de pauta ou informações sobre anúncios."
      />
      <Link to="/" className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Home
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 flex flex-col gap-6">
           <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200">
             <div className="mb-8">
                <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight leading-tight mb-4 uppercase">
                  Fale Conosco
                </h1>
                <p className="text-slate-600 text-lg">
                  Tem alguma dúvida, sugestão de pauta ou quer anunciar conosco? Preencha o formulário abaixo e nossa equipe entrará em contato.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <Mail className="w-8 h-8 text-brand-secondary mb-3" />
                  <h3 className="font-bold text-brand-primary mb-1">E-mail</h3>
                  <p className="text-sm text-slate-500">contato@megaconectado.com.br</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <Phone className="w-8 h-8 text-brand-secondary mb-3" />
                  <h3 className="font-bold text-brand-primary mb-1">Telefone</h3>
                  <p className="text-sm text-slate-500">(11) 9999-0000</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <MapPin className="w-8 h-8 text-brand-secondary mb-3" />
                  <h3 className="font-bold text-brand-primary mb-1">Endereço</h3>
                  <p className="text-sm text-slate-500">Av. Paulista, São Paulo - SP</p>
                </div>
             </div>

             {isSubmitted ? (
               <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                 <h3 className="font-bold text-xl mb-2">Mensagem Enviada!</h3>
                 <p>Obrigado pelo seu contato. Retornaremos o mais breve possível.</p>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                       className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all"
                       placeholder="Seu nome"
                     />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label htmlFor="email" className="font-bold text-sm text-brand-primary">E-mail</label>
                     <input 
                       type="email" 
                       id="email" 
                       name="email" 
                       required
                       value={formData.email}
                       onChange={handleChange}
                       className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all"
                       placeholder="seu.email@exemplo.com"
                     />
                   </div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                   <label htmlFor="subject" className="font-bold text-sm text-brand-primary">Assunto</label>
                   <select 
                     id="subject" 
                     name="subject" 
                     required
                     value={formData.subject}
                     onChange={handleChange}
                     className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all bg-white"
                   >
                     <option value="" disabled>Selecione um assunto</option>
                     <option value="sugestao">Sugestão de Pauta</option>
                     <option value="anuncio">Anuncie Conosco</option>
                     <option value="duvida">Dúvida Geral</option>
                     <option value="outro">Outro</option>
                   </select>
                 </div>

                 <div className="flex flex-col gap-2">
                   <label htmlFor="message" className="font-bold text-sm text-brand-primary">Sua Mensagem</label>
                   <textarea 
                     id="message" 
                     name="message" 
                     required
                     rows={5}
                     value={formData.message}
                     onChange={handleChange}
                     className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all resize-none"
                     placeholder="Escreva sua mensagem aqui..."
                   ></textarea>
                 </div>

                 <button 
                   type="submit" 
                   className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 uppercase tracking-wider"
                 >
                   <Send className="w-5 h-5" />
                   Enviar Mensagem
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
