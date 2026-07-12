import React from 'react';
import Hero from '../components/Hero';
import TrendingAINews from '../components/TrendingAINews';
import TopNews from '../components/TopNews';
import ArticleList from '../components/ArticleList';
import Sidebar from '../components/Sidebar';
import AdSpace from '../components/AdSpace';
import ErrorBoundary from '../components/ErrorBoundary';
import SEO from '../components/SEO';
import AIComparison from '../components/AIComparison';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import { FAQItem } from '../types';

export default function Home() {
  const homeFAQ: FAQItem[] = [
    {
      question: "O que é o portal Mega Conectado?",
      answer: "O Mega Conectado é um dos maiores portais brasileiros focados em Inteligência Artificial, Inovação e Tecnologia, trazendo análises críticas e notícias atualizadas."
    },
    {
      question: "Quem é o editor do Mega Conectado?",
      answer: "O portal é editado por Divino Luciano Belmiro, psicanalista e entusiasta de tecnologia, que traz uma perspectiva humanizada sobre as inovações digitais."
    },
    {
      question: "O Mega Conectado fala apenas sobre IA?",
      answer: "Não, embora a IA seja nosso foco principal em 2026, cobrimos todo o ecossistema tecnológico, incluindo Hardware, Software, Cibersegurança e Internet."
    },
    {
      question: "Como posso enviar uma sugestão de pauta?",
      answer: "Você pode entrar em contato através da nossa página de contato ou enviar um e-mail diretamente para nossa equipe editorial."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO />
      <AdSpace format="leaderboard" className="mb-8" />
      
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TrendingAINews />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TopNews />
      </ErrorBoundary>

      <ErrorBoundary>
        <div className="my-12">
          <Newsletter />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <AIComparison />
      </ErrorBoundary>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        <main className="lg:col-span-8 flex flex-col gap-12">
          <ErrorBoundary>
            <ArticleList />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <FAQ items={homeFAQ} />
          </ErrorBoundary>
        </main>
        
        <aside className="lg:col-span-4">
          <ErrorBoundary>
            <Sidebar />
          </ErrorBoundary>
        </aside>
      </div>
    </div>
  );
}
