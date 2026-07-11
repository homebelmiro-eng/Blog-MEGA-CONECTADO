import React from 'react';

interface AdSpaceProps {
  format: 'leaderboard' | 'medium-rectangle' | 'vertical';
  className?: string;
}

export default function AdSpace({ format, className = '' }: AdSpaceProps) {
  const dimensions = {
    leaderboard: 'w-full max-w-[728px] h-[90px]',
    'medium-rectangle': 'w-[300px] h-[250px]',
    vertical: 'w-full h-[250px]', 
  };

  const labels = {
    leaderboard: 'Anuncie Aqui',
    'medium-rectangle': 'Anúncio (300x250)',
    vertical: 'Anúncio Vertical',
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest mb-1">Publicidade</span>
      <div className={`${dimensions[format]} bg-slate-200 border border-dashed border-slate-300 rounded flex items-center justify-center`}>
        <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">{labels[format]}</span>
      </div>
    </div>
  );
}
