import React from 'react';
import { Check, Minus } from 'lucide-react';

export default function AIComparison() {
  const models = [
    {
      name: 'ChatGPT Plus',
      company: 'OpenAI',
      price: 'US$ 20/mês',
      context: '128K tokens',
      vision: true,
      webSearch: true,
      plugins: true,
      speed: 'Rápido',
      bestFor: 'Programação e Textos Criativos',
    },
    {
      name: 'Gemini Advanced',
      company: 'Google',
      price: 'R$ 96,99/mês',
      context: '1M tokens',
      vision: true,
      webSearch: true,
      plugins: false, // Integrated Workspace
      speed: 'Muito Rápido',
      bestFor: 'Integração Google e Análise de Dados Longos',
    },
    {
      name: 'Claude 3 Opus',
      company: 'Anthropic',
      price: 'US$ 20/mês',
      context: '200K tokens',
      vision: true,
      webSearch: false,
      plugins: false,
      speed: 'Moderado',
      bestFor: 'Textos Complexos e Escrita Natural',
    },
    {
      name: 'Copilot Pro',
      company: 'Microsoft',
      price: 'R$ 110/mês',
      context: '128K tokens',
      vision: true,
      webSearch: true,
      plugins: true,
      speed: 'Rápido',
      bestFor: 'Integração Office e Criação de Imagens',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 my-12 overflow-x-auto">
      <div className="mb-6">
        <h2 className="font-heading font-extrabold text-2xl text-brand-primary mb-2">
          Tabela Comparativa: Principais IAs do Mercado
        </h2>
        <p className="text-slate-600">
          Compare as ferramentas de Inteligência Artificial generativa mais populares para escolher a ideal para o seu perfil.
        </p>
      </div>

      <div className="min-w-[800px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="py-4 px-4 font-bold text-slate-800">Modelo</th>
              <th className="py-4 px-4 font-bold text-slate-800">Empresa</th>
              <th className="py-4 px-4 font-bold text-slate-800">Preço</th>
              <th className="py-4 px-4 font-bold text-slate-800">Janela de Contexto</th>
              <th className="py-4 px-4 font-bold text-slate-800 text-center">Visão</th>
              <th className="py-4 px-4 font-bold text-slate-800 text-center">Busca Web</th>
              <th className="py-4 px-4 font-bold text-slate-800">Melhor Para</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr key={model.name} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <td className="py-4 px-4 font-bold text-brand-primary">{model.name}</td>
                <td className="py-4 px-4 text-slate-600">{model.company}</td>
                <td className="py-4 px-4 font-medium text-slate-700">{model.price}</td>
                <td className="py-4 px-4 text-slate-600">{model.context}</td>
                <td className="py-4 px-4 text-center">
                  {model.vision ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Minus className="w-5 h-5 text-slate-300 mx-auto" />}
                </td>
                <td className="py-4 px-4 text-center">
                  {model.webSearch ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Minus className="w-5 h-5 text-slate-300 mx-auto" />}
                </td>
                <td className="py-4 px-4 text-slate-600 text-sm">{model.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
