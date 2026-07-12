import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API capture
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="relative bg-brand-primary rounded-2xl overflow-hidden shadow-2xl">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
      
      <div className="relative z-10 px-6 py-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-secondary animate-pulse" />
            <span className="text-brand-secondary font-mono text-xs uppercase tracking-widest font-bold">
              Fique Conectado
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tight mb-4">
            Aceleramos sua jornada na <span className="text-brand-secondary">Nova Economia</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Receba insights exclusivos sobre IA e tecnologia que você não encontrará em nenhum outro lugar.
          </p>
        </div>

        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Bem-vindo a bordo!</h4>
                <p className="text-green-100/80 text-sm">Sua inscrição foi confirmada. Verifique seu e-mail em breve.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail corporativo"
                    disabled={status === 'loading'}
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all disabled:opacity-50"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-brand-secondary hover:bg-sky-500 text-white font-heading font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-brand-secondary/20 flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Assinar Gratuitamente
                      <CheckCircle2 className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest">
                  Privacidade garantida. Sem spam, apenas inteligência.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
