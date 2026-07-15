import React from 'react';
import { 
  Bot, 
  Code, 
  Shield, 
  Cpu, 
  Zap, 
  Globe, 
  TrendingUp, 
  Briefcase, 
  Smartphone, 
  Home, 
  Activity, 
  Coins, 
  Tv, 
  Layers 
} from 'lucide-react';

interface CategoryConfig {
  icon: React.ComponentType<{ className?: string }>;
  classes: string;
}

export function getCategoryConfig(categoryName: string): CategoryConfig {
  const norm = (categoryName || '').toLowerCase().trim();

  // 1. IA / Inteligência Artificial / Dados
  if (
    norm === 'ia' || 
    norm.includes('inteligencia') || 
    norm.includes('ia ') || 
    norm.includes(' ia') || 
    norm.includes('dados') || 
    norm.includes('generativa')
  ) {
    return {
      icon: Bot,
      classes: 'bg-indigo-50/80 text-indigo-700 border-indigo-200/60'
    };
  }

  // 2. Segurança / Cibersegurança
  if (norm.includes('seguranca') || norm.includes('cyber') || norm.includes('ciber')) {
    return {
      icon: Shield,
      classes: 'bg-rose-50/80 text-rose-700 border-rose-200/60'
    };
  }

  // 3. Software / Aplicativos / Desenvolvimento
  if (norm.includes('software') || norm.includes('aplicativo') || norm.includes('desenvolvimento') || norm.includes('app')) {
    return {
      icon: Code,
      classes: 'bg-blue-50/80 text-blue-700 border-blue-200/60'
    };
  }

  // 4. Automação / Workflow / Tutoriais
  if (norm.includes('automacao') || norm.includes('workflow') || norm.includes('tutorial')) {
    return {
      icon: Zap,
      classes: 'bg-amber-50/80 text-amber-700 border-amber-200/60'
    };
  }

  // 5. Internet
  if (norm.includes('internet') || norm.includes('web') || norm.includes('rede')) {
    return {
      icon: Globe,
      classes: 'bg-cyan-50/80 text-cyan-700 border-cyan-200/60'
    };
  }

  // 6. Marketing / Vendas
  if (norm.includes('marketing') || norm.includes('venda')) {
    return {
      icon: TrendingUp,
      classes: 'bg-pink-50/80 text-pink-700 border-pink-200/60'
    };
  }

  // 7. Negócios / Mercado / Economia / Gestão / Trabalho / Carreira
  if (
    norm.includes('negocio') || 
    norm.includes('mercado') || 
    norm.includes('economia') || 
    norm.includes('gestao') || 
    norm.includes('trabalho') || 
    norm.includes('carreira')
  ) {
    return {
      icon: Briefcase,
      classes: 'bg-emerald-50/80 text-emerald-700 border-emerald-200/60'
    };
  }

  // 8. Smartphones / Gadgets / Tablets / Wearables / Smartwatches / Fones de ouvido
  if (
    norm.includes('smartphone') || 
    norm.includes('celular') || 
    norm.includes('gadget') || 
    norm.includes('tablet') || 
    norm.includes('wearable') || 
    norm.includes('smartwatch') || 
    norm.includes('fone') || 
    norm.includes('ouvida') || 
    norm.includes('ouvido')
  ) {
    return {
      icon: Smartphone,
      classes: 'bg-violet-50/80 text-violet-700 border-violet-200/60'
    };
  }

  // 9. Casa Conectada / IoT / Smart Home
  if (norm.includes('casa') || norm.includes('home') || norm.includes('iot')) {
    return {
      icon: Home,
      classes: 'bg-sky-50/80 text-sky-700 border-sky-200/60'
    };
  }

  // 10. Ciência / Saúde / Psicanálise / Comportamento
  if (
    norm.includes('ciencia') || 
    norm.includes('saude') || 
    norm.includes('psicanalise') || 
    norm.includes('comportamento')
  ) {
    return {
      icon: Activity,
      classes: 'bg-purple-50/80 text-purple-700 border-purple-200/60'
    };
  }

  // 11. Blockchain / Finanças
  if (norm.includes('blockchain') || norm.includes('cripto') || norm.includes('financa') || norm.includes('financeiro') || norm.includes('moeda')) {
    return {
      icon: Coins,
      classes: 'bg-orange-50/80 text-orange-700 border-orange-200/60'
    };
  }

  // 12. TVs
  if (norm.includes('tv')) {
    return {
      icon: Tv,
      classes: 'bg-teal-50/80 text-teal-700 border-teal-200/60'
    };
  }

  // 13. Hardware / Computadores / Periféricos / Robótica
  if (
    norm.includes('hardware') || 
    norm.includes('computador') || 
    norm.includes('periferico') || 
    norm.includes('robotica')
  ) {
    return {
      icon: Cpu,
      classes: 'bg-slate-100 text-slate-700 border-slate-300'
    };
  }

  // Default
  return {
    icon: Layers,
    classes: 'bg-slate-50 text-slate-600 border-slate-200'
  };
}

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  if (!category) return null;
  const config = getCategoryConfig(category);
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border shadow-sm transition-all ${config.classes} ${className}`}>
      <IconComponent className="w-3.5 h-3.5 shrink-0" />
      <span className="truncate max-w-[150px]">{category}</span>
    </span>
  );
}
