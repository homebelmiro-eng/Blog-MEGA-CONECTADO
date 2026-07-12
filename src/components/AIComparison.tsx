import React from 'react';
import ComparisonTable, { ColumnDef } from './ComparisonTable';

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

  const columns: ColumnDef[] = [
    { key: 'name', header: 'Modelo', type: 'highlight' },
    { key: 'company', header: 'Empresa' },
    { key: 'price', header: 'Preço' },
    { key: 'context', header: 'Janela de Contexto' },
    { key: 'vision', header: 'Visão', type: 'boolean', align: 'center' },
    { key: 'webSearch', header: 'Busca Web', type: 'boolean', align: 'center' },
    { key: 'bestFor', header: 'Melhor Para' },
  ];

  return (
    <ComparisonTable 
      title="Tabela Comparativa: Principais IAs do Mercado"
      description="Compare as ferramentas de Inteligência Artificial generativa mais populares para escolher a ideal para o seu perfil."
      columns={columns}
      data={models}
    />
  );
}
