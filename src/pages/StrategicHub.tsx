import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Sliders, 
  Check, 
  Sparkles, 
  Cpu, 
  Filter, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  ExternalLink, 
  Table, 
  AlertCircle, 
  Zap, 
  Info, 
  FileCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { 
  semanticClustersData, 
  glossaryTermsData, 
  calendarData, 
  GlossaryTerm, 
  CalendarItem, 
  SemanticCluster 
} from '../strategicData';
import { Link } from 'react-router-dom';

export default function StrategicHub() {
  const [activeTab, setActiveTab] = useState<'pillars' | 'glossary' | 'calendar' | 'adsense' | 'geotool'>('pillars');

  // --- GLOSSARY STATE ---
  const [glossarySearch, setGlossarySearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('todos');

  // --- CALENDAR STATE ---
  const [calendarFunnel, setCalendarFunnel] = useState<string>('todos');
  const [calendarPillar, setCalendarPillar] = useState<string>('todos');
  const [calendarSearch, setCalendarSearch] = useState('');

  // --- PILLAR ACCORDION STATE ---
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0);

  // --- GEO OPTIMIZER STATE ---
  const [draftTitle, setDraftTitle] = useState('Como usar Agentes de IA para automatizar vendas em PMEs');
  const [draftContent, setDraftContent] = useState(`Neste artigo, explicamos como agentes autônomos de inteligência artificial ajudam pequenas e médias empresas a economizar tempo e fechar mais negócios.

O que é um Agente de IA para vendas?
Um Agente de IA para vendas é um software inteligente projetado para automatizar tarefas comerciais complexas como triagem, qualificação e nutrição de leads sem supervisão humana constante. Ele analisa informações do CRM e dispara respostas imediatas.

Vantagens da Automação de Processos com IA:
1. Resposta em tempo real: Atendimento 24/7 sem atraso.
2. Qualificação precisa: Avaliação de leads usando critérios de vendas pré-definidos.
3. Conexão direta por Webhooks: Envia os leads quentes imediatamente para o WhatsApp dos vendedores via Make.com.

Perguntas Frequentes (FAQ):
P: Como começar a usar Agentes de IA?
R: O primeiro passo é mapear o funil de vendas atual e identificar gargalos repetitivos que podem ser conectados via APIs.

P: Preciso de desenvolvedores para configurar?
R: Ferramentas modernas de no-code como Make.com e Zapier permitem que gestores configurem fluxos com facilidade.`);

  // AdSense selected position for explanatory modal
  const [selectedAdPosition, setSelectedAdPosition] = useState<string>('leaderboard_header');

  // --- GLOSSARY FILTERING ---
  const filteredGlossary = useMemo(() => {
    return glossaryTermsData.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(glossarySearch.toLowerCase()) || 
                            term.definition.toLowerCase().includes(glossarySearch.toLowerCase());
      const matchesCategory = glossaryCategory === 'todos' || term.category === glossaryCategory;
      return matchesSearch && matchesCategory;
    });
  }, [glossarySearch, glossaryCategory]);

  // --- CALENDAR FILTERING ---
  const filteredCalendar = useMemo(() => {
    return calendarData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(calendarSearch.toLowerCase()) || 
                            item.description.toLowerCase().includes(calendarSearch.toLowerCase());
      const matchesFunnel = calendarFunnel === 'todos' || item.funnelStage === calendarFunnel;
      const matchesPillar = calendarPillar === 'todos' || item.pillar === calendarPillar;
      return matchesSearch && matchesFunnel && matchesPillar;
    });
  }, [calendarSearch, calendarFunnel, calendarPillar]);

  // --- GEO/SEO OPTIMIZER SCORES & CHECKS ---
  const optimizationReport = useMemo(() => {
    let score = 30;
    const checks = {
      titleLength: false,
      wordCount: false,
      directAnswer: false,
      listOrTable: false,
      entitiesDetected: [] as string[],
      faqIncluded: false,
    };

    // Title length check (ideal between 40 and 70 characters)
    if (draftTitle.length >= 40 && draftTitle.length <= 80) {
      score += 15;
      checks.titleLength = true;
    }

    // Word count check (minimum 250 words for draft check)
    const words = draftContent.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 200) {
      score += 15;
      checks.wordCount = true;
    }

    // Direct answer check (definition formatted for GEO search/LLM citations, e.g., "O que é... [Termo] é [definição direta]")
    const lowerContent = draftContent.toLowerCase();
    const hasIsDefinitionPattern = /é um|é uma|significa|refere-se a/i.test(lowerContent);
    if (hasIsDefinitionPattern && (lowerContent.includes('o que é') || lowerContent.includes('definição'))) {
      score += 15;
      checks.directAnswer = true;
    }

    // List or table checker (critical for list layouts in LLMs / SGE)
    if (lowerContent.includes('1.') || lowerContent.includes('2.') || lowerContent.includes('•') || lowerContent.includes('- ') || lowerContent.includes('<table>') || lowerContent.includes('|')) {
      score += 15;
      checks.listOrTable = true;
    }

    // Entities detection
    const entitiesToTest = ['agente', 'ia', 'make.com', 'zapier', 'webhook', 'crm', 'seo', 'geo', 'eeat', 'vendas', 'automação', 'empresa'];
    entitiesToTest.forEach(ent => {
      if (lowerContent.includes(ent)) {
        checks.entitiesDetected.push(ent);
      }
    });
    const entityScoreMultiplier = Math.min(checks.entitiesDetected.length, 5);
    score += entityScoreMultiplier * 2.5; // Up to 12.5 points

    // FAQ Section inclusion (with Q: / A: or P: / R:)
    if ((lowerContent.includes('faq') || lowerContent.includes('perguntas frequentes')) && (lowerContent.includes('p:') || lowerContent.includes('q:'))) {
      score += 12.5;
      checks.faqIncluded = true;
    }

    // Constrain score
    const finalScore = Math.min(Math.round(score), 100);

    return {
      score: finalScore,
      checks,
      wordCount: words.length
    };
  }, [draftTitle, draftContent]);

  // AdSense position metadata
  const adPositions = {
    leaderboard_header: {
      name: "Topo do Cabeçalho (Leaderboard)",
      dimensions: "728x90px ou Responsivo",
      reason: "Gera o maior número de impressões logo na abertura da página. Essencial para CPM alto.",
      policy: "Não deve cobrir o menu principal ou deslocar o conteúdo de forma irritante (Cumulative Layout Shift). Deve ter rotulagem discreta 'Anúncio'.",
      ctr: "Alto (1.8% - 2.5%)"
    },
    mid_content: {
      name: "No Meio do Artigo (In-Article Ads)",
      dimensions: "Responsivo / Bloco Nativo",
      reason: "Engaja o usuário durante a leitura profunda. Excelente para cliques orgânicos e anúncios contextuais.",
      policy: "Não colocar mais do que 1 anúncio a cada 350-400 palavras para manter a legibilidade EEAT. Evitar botões falsos de download próximos ao banner.",
      ctr: "Muito Alto (2.2% - 3.8%)"
    },
    sidebar_sticky: {
      name: "Lateral Flutuante (Sticky Sidebar)",
      dimensions: "300x600px (Skyscraper)",
      reason: "Permanece visível na tela enquanto o usuário rola artigos longos, aumentando o tempo de exibição ativo.",
      policy: "Permitido pelo AdSense apenas se não sobrepor elementos críticos e for implementado via CSS seguro (position: sticky).",
      ctr: "Médio-Alto (1.2% - 1.9%)"
    },
    bottom_sticky: {
      name: "Ancorado Rodapé (Anchor/Sticky Bottom)",
      dimensions: "320x50 ou 728x90",
      reason: "Flutua na base da tela em dispositivos móveis. Altíssimo valor de visibilidade.",
      policy: "Deve permitir fechamento fácil com um botão 'X'. Não pode obstruir botões de navegação cruciais.",
      ctr: "Extremo (3.5% - 5.0% em mobile)"
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#005ea6] to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-brand-secondary bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-3">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              Painel de Consultoria Estratégica
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white">
              MegaConectado <span className="font-light text-white/80">Blueprint</span>
            </h1>
            <p className="text-slate-200 mt-2 text-sm sm:text-base max-w-2xl">
              Central estratégica de inteligência SEO/GEO, arquitetura temática de clusters, glossários autoritativos, calendário editorial de 365 dias e otimização de monetização AdSense.
            </p>
          </div>
          <a 
            href="https://megaconectado.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-[#005ea6] hover:bg-slate-100 font-bold text-sm px-5 py-2.5 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            megaconectado.com.br
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-none">
            <button
              onClick={() => setActiveTab('pillars')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-sans font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === 'pillars' 
                  ? 'bg-[#0070C0] text-white' 
                  : 'text-slate-600 hover:text-[#0070C0] hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              Pilares & Clusters
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-sans font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === 'glossary' 
                  ? 'bg-[#0070C0] text-white' 
                  : 'text-slate-600 hover:text-[#0070C0] hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Glossários do Projeto
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-sans font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === 'calendar' 
                  ? 'bg-[#0070C0] text-white' 
                  : 'text-slate-600 hover:text-[#0070C0] hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendário 12 Meses
            </button>
            <button
              onClick={() => setActiveTab('adsense')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-sans font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === 'adsense' 
                  ? 'bg-[#0070C0] text-white' 
                  : 'text-slate-600 hover:text-[#0070C0] hover:bg-slate-100'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Anúncios & Monetização
            </button>
            <button
              onClick={() => setActiveTab('geotool')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-sans font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === 'geotool' 
                  ? 'bg-[#0070C0] text-white' 
                  : 'text-slate-600 hover:text-[#0070C0] hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Otimizador SEO/GEO
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- PILLARS & CLUSTERS TAB --- */}
        {activeTab === 'pillars' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-150">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-2 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#0070C0]" />
                Arquitetura Semântica Pillar + Cluster
              </h2>
              <p className="text-sm text-slate-600">
                A estrutura do MegaConectado é baseada em 6 Pilares temáticos principais. Cada pilar possui uma página pilar robusta interligada semanticamente a clusters, focando em entidades recomendadas pelos algoritmos do Google e mecanismos de IA generativa para garantir EEAT e rankeamento rápido.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-4">
                {semanticClustersData.map((cluster, idx) => {
                  const isExpanded = expandedPillar === idx;
                  return (
                    <div 
                      key={cluster.pillarName}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-[#0070C0]/40 transition-all"
                    >
                      <button
                        onClick={() => setExpandedPillar(isExpanded ? null : idx)}
                        className="w-full px-6 py-5 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div>
                          <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Pilar Temático</span>
                          <h3 className="font-heading font-bold text-lg text-slate-900">{cluster.pillarName}</h3>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-500" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-6 py-6 border-t border-slate-100 space-y-6">
                          {/* Subthemes / Clusters */}
                          <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Subtemas Recomendados (Semantic Clusters)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {cluster.subthemes.map((sub, i) => (
                                <div key={i} className="flex gap-2.5 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  <div className="w-5 h-5 shrink-0 bg-[#0070C0]/10 text-[#0070C0] flex items-center justify-center rounded-full text-xs font-bold">
                                    {i+1}
                                  </div>
                                  <span className="text-xs font-semibold text-slate-700 leading-tight">{sub}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Entities */}
                          <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Entidades Principais Citadas</h4>
                            <div className="flex flex-wrap gap-2">
                              {cluster.entities.map((ent, i) => (
                                <span key={i} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                                  {ent}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Backlinks & SEO markup */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Schema Markup Recomendado</h4>
                              <div className="flex gap-2">
                                {cluster.schemaMarkup.split(', ').map((sc, i) => (
                                  <span key={i} className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded text-xs font-bold font-mono">
                                    {sc}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Canais de Backlink Recomendados</h4>
                              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                                {cluster.backlinkOpportunities.map((back, i) => (
                                  <li key={i}>{back}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* CTA to categories */}
                          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                            <span className="text-slate-500">Mapeamento estrutural concluído em 2026.</span>
                            <Link 
                              to={cluster.pillarPage}
                              className="inline-flex items-center gap-1 font-bold text-[#0070C0] hover:underline"
                            >
                              Ver Categoria Pública
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Guide */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-heading font-extrabold text-lg mb-4 flex items-center gap-2 text-amber-400">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    SEO/GEO Direcionais
                  </h3>
                  <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                    <div className="border-l-2 border-brand-secondary pl-3">
                      <strong className="text-white block mb-0.5">Arquitetura Pillar + Cluster:</strong>
                      A página pilar centraliza o assunto macro. Os artigos satélites (clusters) cobrem dúvidas específicas e herdam autoridade por links internos profundos.
                    </div>
                    <div className="border-l-2 border-brand-secondary pl-3">
                      <strong className="text-white block mb-0.5">Presença de Entidades:</strong>
                      Mecanismos de IA não contam palavras-chave, mas mapeiam entidades nomeadas e relações. Citar parceiros oficiais, conceitos técnicos e marcas consolidadas eleva o escore de confiança.
                    </div>
                    <div className="border-l-2 border-brand-secondary pl-3">
                      <strong className="text-white block mb-0.5">Marcações de Schema:</strong>
                      Fornecer metadados em JSON-LD (FAQPage, Article) ajuda os crawlers tradicionais a estruturarem blocos em Rich Snippets, garantindo cliques imediatos na primeira página do Google.
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#0070C0]" />
                    Requisitos Técnicos do Artigo
                  </h3>
                  <ul className="text-xs text-slate-600 space-y-3">
                    <li className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>H1 idêntico ao <strong>Meta Title</strong> para consistência.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Meta Description contendo call-to-action e palavra-chave.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>URLs amigáveis curtas (máximo 4 termos separados por hífen).</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Introdução respondendo imediatamente o 'O quê' e 'Como'.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Tabelas de dados e FAQs em código visíveis.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- GLOSSARY TAB --- */}
        {activeTab === 'glossary' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-150 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0070C0]" />
                  Glossário Temático Autoritativo
                </h2>
                <p className="text-sm text-slate-600">
                  Definições ricas, aplicações práticas e exemplos reais para as principais entidades digitais do ecossistema.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {['todos', 'IA', 'SEO', 'Marketing', 'Automação', 'Negócios', 'Tecnologia'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGlossaryCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                      glossaryCategory === cat
                        ? 'bg-[#0070C0] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'todos' ? 'Ver Todos' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Pesquise por termos do glossário (ex: LLM, GEO, Webhook, SaaS...)"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0070C0] focus:ring-1 focus:ring-[#0070C0] shadow-sm transition-all"
              />
            </div>

            {/* Glossary grid */}
            {filteredGlossary.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGlossary.map((term, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col h-full">
                    {/* Category tag */}
                    <span className="absolute top-4 right-4 bg-[#0070C0]/10 text-[#0070C0] px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {term.category}
                    </span>

                    <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-2 border-b border-slate-100 pb-2 pr-12">
                      {term.term}
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-grow">
                      {term.definition}
                    </p>

                    <div className="space-y-3 bg-slate-50 p-4 rounded-lg text-[11px] border border-slate-100">
                      <div>
                        <strong className="text-slate-800 block mb-0.5">Exemplo Prático:</strong>
                        <span className="text-slate-600 italic font-mono">{term.examples}</span>
                      </div>
                      <div>
                        <strong className="text-slate-800 block mb-0.5">Aplicação de Negócio:</strong>
                        <span className="text-slate-600">{term.applications}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <strong className="text-[11px] text-slate-400 uppercase tracking-wider block mb-2">GEO FAQs Relacionadas:</strong>
                      <div className="space-y-1.5">
                        {term.relatedQuestions.map((q, j) => (
                          <div key={j} className="flex gap-2 items-start text-xs text-slate-700 font-medium">
                            <span className="text-[#0070C0]">Q:</span>
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl py-12 text-center border border-slate-200">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">Nenhum termo encontrado para sua busca.</p>
              </div>
            )}
          </div>
        )}

        {/* --- CALENDAR TAB --- */}
        {activeTab === 'calendar' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-150">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#0070C0]" />
                    Calendário Editorial Estratégico (12 Meses)
                  </h2>
                  <p className="text-sm text-slate-600">
                    O funil de conteúdo cobre Topo, Meio e Fundo de Funil, distribuídos sistematicamente para capturar tráfego SEO e GEO e converter em ganhos AdSense e afiliados.
                  </p>
                </div>
                
                {/* Visual stats counters */}
                <div className="flex flex-wrap gap-3">
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 text-center">
                    <span className="text-xs text-indigo-600 block font-bold">Total Mapeado</span>
                    <span className="text-lg font-extrabold text-indigo-800">{calendarData.length} Semanas</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-center">
                    <span className="text-xs text-emerald-600 block font-bold">Fundo de Funil</span>
                    <span className="text-lg font-extrabold text-emerald-800">
                      {calendarData.filter(i => i.funnelStage === 'Fundo de Funil').length} Arts
                    </span>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-center">
                    <span className="text-xs text-amber-600 block font-bold">Monetização Alta</span>
                    <span className="text-lg font-extrabold text-amber-800">
                      {calendarData.filter(i => i.monetizationPotential === 'Alto').length} Arts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters panel */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-1/3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Pesquisar pautas..."
                  value={calendarSearch}
                  onChange={(e) => setCalendarSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0070C0] focus:ring-1 focus:ring-[#0070C0]"
                />
              </div>

              <div className="flex gap-4 w-full md:w-2/3 justify-end flex-wrap md:flex-nowrap">
                <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500 font-bold whitespace-nowrap">Funil:</span>
                  <select
                    value={calendarFunnel}
                    onChange={(e) => setCalendarFunnel(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-1.5 focus:outline-none focus:border-[#0070C0]"
                  >
                    <option value="todos">Todos os Níveis</option>
                    <option value="Topo de Funil">Topo (Atração)</option>
                    <option value="Meio de Funil">Meio (Consideração)</option>
                    <option value="Fundo de Funil">Fundo (Conversão)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
                  <span className="text-slate-500 font-bold whitespace-nowrap">Pilar:</span>
                  <select
                    value={calendarPillar}
                    onChange={(e) => setCalendarPillar(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-1.5 focus:outline-none focus:border-[#0070C0]"
                  >
                    <option value="todos">Todos os Pilares</option>
                    <option value="Inteligência Artificial">IA</option>
                    <option value="Automação Inteligente">Automação</option>
                    <option value="Marketing Digital">Marketing</option>
                    <option value="Produtividade">Produtividade</option>
                    <option value="Negócios">Negócios</option>
                    <option value="Tecnologia">Tecnologia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Editorial Table Grid */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                      <th className="p-4 w-16">Período</th>
                      <th className="p-4 w-1/4">Título da Pauta</th>
                      <th className="p-4">Pilar</th>
                      <th className="p-4">Etapa Funil</th>
                      <th className="p-4">Dificuldade SEO</th>
                      <th className="p-4">Monetização</th>
                      <th className="p-4">Intenção Busca</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCalendar.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 whitespace-nowrap font-bold text-slate-700">
                          {item.month}<br/>
                          <span className="text-[10px] font-normal text-slate-400">Semana {item.week}</span>
                        </td>
                        <td className="p-4">
                          <strong className="text-slate-900 block text-sm font-bold mb-1">{item.title}</strong>
                          <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                        </td>
                        <td className="p-4 whitespace-nowrap font-medium text-slate-700">
                          {item.pillar}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.funnelStage === 'Topo de Funil' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100'
                              : item.funnelStage === 'Meio de Funil'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          }`}>
                            {item.funnelStage}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                            item.seoDifficulty === 'Baixa'
                              ? 'text-emerald-700 bg-emerald-50'
                              : item.seoDifficulty === 'Média'
                              ? 'text-amber-700 bg-amber-50'
                              : 'text-rose-700 bg-rose-50'
                          }`}>
                            {item.seoDifficulty}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className={`font-bold ${
                            item.monetizationPotential === 'Alto'
                              ? 'text-emerald-600'
                              : item.monetizationPotential === 'Médio'
                              ? 'text-slate-600'
                              : 'text-slate-400'
                          }`}>
                            {item.monetizationPotential === 'Alto' ? '$$$ Alto' : item.monetizationPotential === 'Médio' ? '$$ Médio' : '$ Baixo'}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-slate-500 italic">
                          {item.searchIntent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredCalendar.length === 0 && (
                <div className="py-12 text-center">
                  <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500">Nenhuma pauta encontrada com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- ADSENSE MONETIZATION TAB --- */}
        {activeTab === 'adsense' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-150">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-2 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Mapa de Posicionamento de Anúncios AdSense
              </h2>
              <p className="text-sm text-slate-600 font-medium">
                Clique nos blocos vermelhos interativos da representação visual abaixo para analisar as regras do Google, boas práticas de posicionamento e o multiplicador de CTR estimado para cada bloco de anúncio.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Visual Map Simulator */}
              <div className="lg:col-span-7 bg-slate-200 border border-slate-300 rounded-2xl p-6 shadow-inner relative space-y-4">
                <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200 uppercase">Simulador de Layout</span>
                
                {/* Ad Position 1 */}
                <button 
                  onClick={() => setSelectedAdPosition('leaderboard_header')}
                  className={`w-full p-3 text-center border-2 border-dashed rounded-lg transition-all ${
                    selectedAdPosition === 'leaderboard_header'
                      ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-md ring-2 ring-rose-400'
                      : 'bg-white border-rose-300 text-rose-500 hover:bg-rose-50/50'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider">Espaço AdSense (Leaderboard Cabeçalho)</div>
                  <div className="text-xs font-black">728x90px - Banner Responsivo Superior</div>
                </button>

                {/* Site Mockup Header */}
                <div className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-center border border-slate-300">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#0070C0]" />
                    <span className="font-bold text-slate-800 tracking-tight italic text-xs">megaconectado</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-2 bg-slate-200 rounded"></div>
                    <div className="w-8 h-2 bg-slate-200 rounded"></div>
                    <div className="w-8 h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>

                {/* Site Main Area Mockup */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Article content simulated */}
                  <div className="md:col-span-8 bg-white rounded-lg p-5 border border-slate-300 space-y-3">
                    <div className="h-4 bg-slate-300 rounded w-1/4 mb-1"></div>
                    <div className="h-6 bg-slate-400 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-11/12"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>

                    {/* Ad Position 2 */}
                    <button 
                      onClick={() => setSelectedAdPosition('mid_content')}
                      className={`w-full p-4 my-4 text-center border-2 border-dashed rounded-lg transition-all ${
                        selectedAdPosition === 'mid_content'
                          ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-md ring-2 ring-rose-400'
                          : 'bg-white border-rose-300 text-rose-500 hover:bg-rose-50/50'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider">Espaço AdSense (In-Article Ad)</div>
                      <div className="text-xs font-black">Anúncio de Meio de Artigo / Nativo Responsivo</div>
                    </button>

                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>

                  {/* Sidebar simulated */}
                  <div className="md:col-span-4 bg-white rounded-lg p-4 border border-slate-300 space-y-4">
                    <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                    <div className="h-2 bg-slate-200 rounded w-full"></div>

                    {/* Ad Position 3 */}
                    <button 
                      onClick={() => setSelectedAdPosition('sidebar_sticky')}
                      className={`w-full py-8 px-2 text-center border-2 border-dashed rounded-lg transition-all ${
                        selectedAdPosition === 'sidebar_sticky'
                          ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-md ring-2 ring-rose-400'
                          : 'bg-white border-rose-300 text-rose-500 hover:bg-rose-50/50'
                      }`}
                    >
                      <div className="text-[9px] font-bold uppercase tracking-wider">Espaço AdSense</div>
                      <div className="text-[10px] font-black">300x600px</div>
                      <span className="text-[9px] block text-slate-400 font-semibold mt-1">Sticky Lateral</span>
                    </button>
                  </div>
                </div>

                {/* Ad Position 4 */}
                <button 
                  onClick={() => setSelectedAdPosition('bottom_sticky')}
                  className={`w-full p-2.5 text-center border-2 border-dashed rounded-lg transition-all ${
                    selectedAdPosition === 'bottom_sticky'
                      ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-md ring-2 ring-rose-400'
                      : 'bg-white border-rose-300 text-rose-500 hover:bg-rose-50/50'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider">Espaço AdSense (Anchor / Ancorado Rodapé)</div>
                  <div className="text-xs font-black">728x90px ou 320x50px Móvel Flutuante</div>
                </button>
              </div>

              {/* Position Explanations Panel */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bloco Selecionado</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                      <h4 className="font-heading font-extrabold text-lg text-[#0070C0] mb-1">
                        {adPositions[selectedAdPosition as keyof typeof adPositions].name}
                      </h4>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                        Dimenções sugeridas: {adPositions[selectedAdPosition as keyof typeof adPositions].dimensions}
                      </span>
                    </div>

                    <div className="space-y-3.5 text-xs leading-relaxed">
                      <div>
                        <strong className="text-slate-800 block mb-0.5">Propósito Estratégico:</strong>
                        <p className="text-slate-600">{adPositions[selectedAdPosition as keyof typeof adPositions].reason}</p>
                      </div>
                      
                      <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                        <div>
                          <strong className="text-slate-800 block">CTR Estimado:</strong>
                          <span className="text-sm font-extrabold text-emerald-600">
                            {adPositions[selectedAdPosition as keyof typeof adPositions].ctr}
                          </span>
                        </div>
                        <div className="text-right">
                          <strong className="text-slate-800 block">Tipo:</strong>
                          <span className="text-xs text-slate-500 font-bold uppercase">CPM / CPC Híbrido</span>
                        </div>
                      </div>

                      <div className="bg-amber-50/70 border border-amber-100 p-3 rounded-lg flex gap-2.5 items-start">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-800 font-bold block mb-0.5">Política de Conformidade AdSense:</strong>
                          <p className="text-amber-700 text-[11px] leading-normal">
                            {adPositions[selectedAdPosition as keyof typeof adPositions].policy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm space-y-4 text-xs">
                  <h4 className="font-heading font-bold text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    Regras de Qualidade AdSense & EEAT
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>
                      <strong>Proporção de Conteúdo:</strong> Pelo menos 65% do conteúdo da página deve ser texto original e relevante escrito pelo autor. Excesso de anúncios gera rejeição e redução no CPC.
                    </li>
                    <li>
                      <strong>Anúncios Automáticos:</strong> Recomenda-se ativar apenas formatos de âncora e vinheta, limitando banners tradicionais no corpo aos locais predefinidos para evitar destruição de UX.
                    </li>
                    <li>
                      <strong>Acessibilidade de Botões:</strong> Nunca posicione anúncios muito próximos a botões interativos como links de paginação para evitar cliques inválidos acidentais.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SEO & GEO CONTENT OPTIMIZER TOOL TAB --- */}
        {activeTab === 'geotool' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-150">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-2 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#0070C0]" />
                Analisador e Otimizador de Conteúdo SEO & GEO
              </h2>
              <p className="text-sm text-slate-600">
                Teste e audite o escore de adaptabilidade do seu artigo de rascunho para mecanismos generativos (ChatGPT, Perplexity, Claude, Gemini, SGE). Otimize a estrutura em tempo real.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Text Inputs */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">H1 / Título do Artigo</label>
                  <input
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0070C0] transition-all"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                    <span>Recomendado: 40 a 70 caracteres</span>
                    <span>{draftTitle.length} caracteres</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Corpo do Conteúdo (Markdown / Texto)</label>
                  <textarea
                    rows={12}
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 leading-relaxed focus:outline-none focus:border-[#0070C0] transition-all resize-y"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                    <span>Recomendado: Mínimo 200 palavras para auditoria</span>
                    <span>{optimizationReport.wordCount} palavras</span>
                  </div>
                </div>
              </div>

              {/* Scores & Checklist */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Score Dial */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Escore de Otimização SEO/GEO</h3>
                  
                  <div className="relative flex items-center justify-center py-2">
                    <div className={`w-28 h-28 rounded-full border-8 flex flex-col items-center justify-center transition-all ${
                      optimizationReport.score >= 80 
                        ? 'border-emerald-500 text-emerald-600 bg-emerald-50/20' 
                        : optimizationReport.score >= 50
                        ? 'border-amber-400 text-amber-600 bg-amber-50/20'
                        : 'border-rose-500 text-rose-600 bg-rose-50/20'
                    }`}>
                      <span className="text-3xl font-black">{optimizationReport.score}</span>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Pontos</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-semibold max-w-sm mx-auto">
                    {optimizationReport.score >= 80 
                      ? 'Excelente! Seu artigo está altamente preparado para ser citado pelo ChatGPT, Gemini e Google AI Overviews.'
                      : optimizationReport.score >= 50
                      ? 'Moderado. Estruture melhor as respostas e adicione entidades para elevar o escore de citação.'
                      : 'Fraco. Adicione definições diretas, listas estruturadas e uma seção FAQ.'}
                  </p>
                </div>

                {/* Audit Checklist */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Checklist Estrutural GEO</h3>
                  
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <div className={`p-0.5 rounded-full ${optimizationReport.checks.titleLength ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold block text-slate-800">Meta Título e H1 Saudável</span>
                          <span className="text-[10px] text-slate-500">Tamanho ideal para motores de busca tradicionais.</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-400">{optimizationReport.checks.titleLength ? 'APROVADO' : 'CORRIGIR'}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <div className={`p-0.5 rounded-full ${optimizationReport.checks.wordCount ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold block text-slate-800">Profundidade do Conteúdo</span>
                          <span className="text-[10px] text-slate-500">Pelo menos 200 palavras no rascunho de análise.</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-400">{optimizationReport.checks.wordCount ? 'APROVADO' : 'CORRIGIR'}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <div className={`p-0.5 rounded-full ${optimizationReport.checks.directAnswer ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold block text-slate-800">Resposta Direta GEO (Definições)</span>
                          <span className="text-[10px] text-slate-500">Termo chave definido de forma imediata (O que é...).</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-400">{optimizationReport.checks.directAnswer ? 'APROVADO' : 'FALTA'}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <div className={`p-0.5 rounded-full ${optimizationReport.checks.listOrTable ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold block text-slate-800">Listas Estruturadas / Tabelas</span>
                          <span className="text-[10px] text-slate-500">Uso de listas numeradas ou pontos (crucial para SGE).</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-400">{optimizationReport.checks.listOrTable ? 'APROVADO' : 'FALTA'}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <div className={`p-0.5 rounded-full ${optimizationReport.checks.faqIncluded ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold block text-slate-800">Seção FAQ Mapeada</span>
                          <span className="text-[10px] text-slate-500">Perguntas comuns com respostas de uma linha.</span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-400">{optimizationReport.checks.faqIncluded ? 'APROVADO' : 'FALTA'}</span>
                    </div>

                    {/* Entities details */}
                    <div className="border-t border-slate-100 pt-3">
                      <strong className="text-slate-800 block mb-1">Entidades Detectadas:</strong>
                      {optimizationReport.checks.entitiesDetected.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {optimizationReport.checks.entitiesDetected.map((ent, i) => (
                            <span key={i} className="bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              {ent}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500">Nenhuma entidade identificada no texto.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
