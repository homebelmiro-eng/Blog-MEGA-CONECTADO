import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, BarChart3, BookOpen, Hash } from 'lucide-react';
import { SEOAnalysis } from '../lib/seo-utils';

interface SEOAnalysisPanelProps {
  analysis: SEOAnalysis;
}

export function SEOAnalysisPanel({ analysis }: SEOAnalysisPanelProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-brand-secondary" />
          Análise SEO em Tempo Real
        </h3>
        <div className={`text-xl font-black ${getScoreColor(analysis.score)}`}>
          {analysis.score}/100
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Score Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${getScoreBg(analysis.score)}`}
            style={{ width: `${analysis.score}%` }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-50 p-2 rounded-lg text-center">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center justify-center gap-1">
              <BookOpen className="w-3 h-3" /> Palavras
            </div>
            <div className="text-sm font-bold text-slate-800">{analysis.details.wordCount}</div>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg text-center">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center justify-center gap-1">
              <Hash className="w-3 h-3" /> Densidade
            </div>
            <div className="text-sm font-bold text-slate-800">{analysis.details.keywordDensity.toFixed(1)}%</div>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg text-center">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Leitura
            </div>
            <div className="text-sm font-bold text-slate-800">{analysis.details.readabilityScore.toFixed(0)}</div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Melhorias Sugeridas</h4>
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {analysis.suggestions.length > 0 ? (
              analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex gap-2 text-xs leading-relaxed">
                  {suggestion.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {suggestion.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />}
                  {suggestion.type === 'error' && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                  <span className={suggestion.type === 'success' ? 'text-slate-500' : 'text-slate-700 font-medium'}>
                    {suggestion.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">Escreva algo para ver sugestões...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
