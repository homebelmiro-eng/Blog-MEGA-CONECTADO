import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterWidget() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="bg-brand-primary text-white rounded-xl p-8 shadow-sm relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#0EA5E9 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <Mail className="text-brand-secondary w-12 h-12 mb-4" />
        <h3 className="font-heading font-bold text-2xl mb-2">Newsletter</h3>
        <p className="text-sm text-slate-300 mb-6">Receba as principais notícias de inovação e tecnologia diretamente na sua caixa de entrada.</p>
        
        {status === 'success' ? (
          <div className="w-full bg-green-500/20 text-green-100 border border-green-500/50 rounded py-3 px-4 flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold text-sm">Inscrito com sucesso!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Seu email principal" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="w-full bg-white text-brand-primary border-none rounded py-3 px-4 text-sm focus:ring-2 focus:ring-brand-secondary outline-none disabled:opacity-70" 
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-brand-secondary hover:bg-sky-500 text-white font-heading font-bold text-sm uppercase tracking-wider py-3 rounded transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                'Inscrever-se'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
