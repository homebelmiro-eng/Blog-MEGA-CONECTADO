import React from 'react';
import { Clock, BookOpen } from 'lucide-react';

interface ReadingTimeProps {
  content?: string;
  className?: string;
}

export default function ReadingTime({ content, className = '' }: ReadingTimeProps) {
  if (!content) return null;

  // Calculate words and estimated reading time
  // Remove markdown symbols to get a cleaner word count
  const cleanContent = content
    .replace(/[#*`_~\[\]()\-+]/g, '')
    .trim();
  
  const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;
  
  // Standard reading speed for technical/editorial Portuguese is ~200 WPM
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  // Determine reading depth category
  let category = '';
  let categoryColor = '';
  
  if (minutes <= 3) {
    category = 'Leitura rápida';
    categoryColor = 'bg-emerald-50 text-emerald-700 border-emerald-100';
  } else if (minutes <= 7) {
    category = 'Leitura moderada';
    categoryColor = 'bg-blue-50 text-blue-700 border-blue-100';
  } else {
    category = 'Leitura aprofundada';
    categoryColor = 'bg-amber-50 text-amber-700 border-amber-100';
  }

  return (
    <div id="reading-time-badge" className={`flex flex-wrap items-center gap-3 text-sm ${className}`}>
      <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3.5 py-1.5 rounded-full text-slate-600 shadow-sm hover:bg-slate-100/50 transition-all duration-200">
        <Clock className="w-4 h-4 text-brand-secondary shrink-0" />
        <span className="font-medium">
          Tempo estimado: <strong className="text-brand-primary">{minutes} {minutes === 1 ? 'minuto' : 'minutos'}</strong>
        </span>
      </div>

      <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3.5 py-1.5 rounded-full text-slate-600 shadow-sm hover:bg-slate-100/50 transition-all duration-200">
        <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="font-medium text-slate-500">
          <strong className="text-slate-700">{wordCount.toLocaleString()}</strong> palavras
        </span>
      </div>

      <div className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-sm ${categoryColor}`}>
        {category}
      </div>
    </div>
  );
}
