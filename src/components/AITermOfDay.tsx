import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AITermOfDay() {
  const term = "Rede Neural (Neural Network)";
  const definition = "Um modelo computacional inspirado no cérebro humano, projetado para reconhecer padrões, aprender com grandes volumes de dados e tomar decisões de forma semelhante à cognição biológica.";

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
        <Sparkles className="w-32 h-32 text-indigo-600" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 text-indigo-600">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Termo de IA do Dia</h3>
        </div>
        
        <h4 className="font-heading font-extrabold text-xl text-slate-900 mb-3">
          {term}
        </h4>
        
        <p className="text-sm text-slate-700 leading-relaxed mb-5">
          {definition}
        </p>
        
        <Link 
          to="/categoria/ia" 
          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors group uppercase tracking-wider"
        >
          Explorar Mais
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
