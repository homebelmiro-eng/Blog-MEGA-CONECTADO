export interface GeneratedMeta {
  summary: string;
  titles: string[];
}

/**
 * Utilitário para gerar resumo e títulos otimizados usando a API Gemini
 *
 * @param content O conteúdo do artigo
 * @param keywords Um array opcional de palavras-chave para focar
 * @returns Promessa com resumo e opções de títulos
 */
export async function generateArticleMeta(content: string, keywords: string[] = []): Promise<GeneratedMeta> {
  const response = await fetch('/api/generate-meta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, keywords }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Falha ao gerar os metadados do artigo');
  }

  return response.json();
}
