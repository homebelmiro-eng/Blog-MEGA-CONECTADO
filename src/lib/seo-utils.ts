export interface SEOAnalysis {
  score: number;
  suggestions: {
    type: 'success' | 'warning' | 'error';
    text: string;
  }[];
  details: {
    wordCount: number;
    keywordDensity: number;
    readabilityScore: number;
  };
}

export function analyzeSEO(
  title: string,
  content: string,
  slug: string,
  metaDescription: string,
  keywords: string
): SEOAnalysis {
  const suggestions: SEOAnalysis['suggestions'] = [];
  let score = 100;

  // 1. Content Length
  const words = content.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  if (wordCount < 300) {
    score -= 20;
    suggestions.push({ type: 'error', text: 'O conteúdo é muito curto (mínimo 300 palavras).' });
  } else if (wordCount < 600) {
    score -= 5;
    suggestions.push({ type: 'warning', text: 'Bom, mas artigos com mais de 600 palavras tendem a performar melhor.' });
  } else {
    suggestions.push({ type: 'success', text: 'Excelente extensão de conteúdo.' });
  }

  // 2. Keyword Density
  const mainKeywords = keywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 0);
  let maxDensity = 0;
  
  if (mainKeywords.length > 0) {
    const textLower = content.toLowerCase();
    mainKeywords.forEach(kw => {
      const count = (textLower.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      const density = (count / wordCount) * 100;
      maxDensity = Math.max(maxDensity, density);
    });

    if (maxDensity === 0) {
      score -= 15;
      suggestions.push({ type: 'error', text: 'Nenhuma das palavras-chave principais foi encontrada no texto.' });
    } else if (maxDensity > 3) {
      score -= 10;
      suggestions.push({ type: 'warning', text: 'Densidade de palavra-chave muito alta (Keyword Stuffing). Mantenha abaixo de 3%.' });
    } else {
      suggestions.push({ type: 'success', text: `Densidade de palavra-chave ideal (${maxDensity.toFixed(1)}%).` });
    }
  } else {
    score -= 10;
    suggestions.push({ type: 'warning', text: 'Defina palavras-chave para uma análise mais precisa.' });
  }

  // 3. Title & Slug
  if (title.length < 30) {
    score -= 5;
    suggestions.push({ type: 'warning', text: 'Título curto demais para SEO (ideal entre 30-60 caracteres).' });
  }
  
  if (slug && mainKeywords.length > 0 && !mainKeywords.some(kw => slug.includes(kw.replace(/\s+/g, '-')))) {
    score -= 10;
    suggestions.push({ type: 'warning', text: 'A palavra-chave principal não está presente na URL (Slug).' });
  }

  // 4. Meta Description
  if (!metaDescription) {
    score -= 15;
    suggestions.push({ type: 'error', text: 'Meta descrição ausente.' });
  } else if (metaDescription.length < 120) {
    score -= 5;
    suggestions.push({ type: 'warning', text: 'Meta descrição muito curta.' });
  }

  // 5. Readability (Simple approximation)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = wordCount / (sentences.length || 1);
  const readabilityScore = Math.max(0, 100 - (avgSentenceLength * 1.5));

  if (avgSentenceLength > 25) {
    score -= 10;
    suggestions.push({ type: 'warning', text: 'Frases muito longas detectadas. Tente usar frases mais curtas para melhorar a leitura.' });
  }

  return {
    score: Math.max(0, score),
    suggestions: suggestions.sort((a, b) => {
      const order = { error: 0, warning: 1, success: 2 };
      return (order[a.type as keyof typeof order] || 0) - (order[b.type as keyof typeof order] || 0);
    }),
    details: {
      wordCount,
      keywordDensity: maxDensity,
      readabilityScore
    }
  };
}
