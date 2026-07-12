import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface FallbackUIProps {
  error?: Error;
}

export default function FallbackUI({ error }: FallbackUIProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="w-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-red-50 text-red-900 rounded-xl border border-red-200">
      <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
      <h2 className="font-heading font-bold text-xl mb-2 text-center">Ops! Algo deu errado.</h2>
      <p className="text-sm opacity-80 text-center mb-6 max-w-md">
        {error?.message || "Ocorreu um erro inesperado ao tentar carregar esta parte da página. Por favor, tente novamente."}
      </p>
      <button 
        onClick={handleReload}
        className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-red-700 transition-colors"
      >
        <RefreshCcw className="w-4 h-4" />
        Recarregar
      </button>
    </div>
  );
}
