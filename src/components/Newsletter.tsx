import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-slate-100 rounded-xl p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-brand-secondary/10 rounded-lg text-brand-secondary">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-lg text-brand-primary">
          Assine nossa Newsletter
        </h3>
      </div>
      
      {subscribed ? (
        <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
          <p className="text-slate-700 font-medium">Inscrição confirmada!</p>
          <p className="text-sm text-slate-500">Obrigado por se juntar a nós.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-4">
            Receba as principais notícias sobre tecnologia, IA e inovação diretamente no seu e-mail, toda semana.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="px-4 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary w-full"
              required
            />
            <button
              type="submit"
              className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-2 px-4 rounded-md transition-colors w-full"
            >
              Inscrever-se
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Prometemos não enviar spam. Você pode se desinscrever a qualquer momento.
          </p>
        </>
      )}
    </div>
  );
}
