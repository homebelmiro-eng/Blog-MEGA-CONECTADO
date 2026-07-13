import { generateSlug } from './utils';

// This service will now act as a proxy to our server-side API to keep the Gemini key secure
export const geminiService = {
  async generateContent(prompt: string) {
    const response = await fetch('/api/admin/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      throw new Error('Erro ao processar com IA');
    }
    
    const data = await response.json();
    return data.text;
  },

  async improveText(text: string) {
    const prompt = `Melhore o seguinte texto para um artigo de blog sobre tecnologia e psicanálise, mantendo o tom profissional e engajador do portal Mega Conectado. Retorne apenas o texto melhorado:\n\n${text}`;
    return this.generateContent(prompt);
  },

  async generateSEO(title: string, content: string) {
    const prompt = `Com base no título "${title}" e no conteúdo resumido "${content.substring(0, 500)}", gere um JSON com os seguintes campos: metaTitle, metaDescription (máximo 160 caracteres) e keywords (array de strings). Retorne apenas o JSON puro, sem formatação markdown:\n\n`;
    const response = await this.generateContent(prompt);
    
    try {
      // Cleanup common markdown artifact from AI response
      const cleanJson = response.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (e) {
      console.error("Erro ao analisar JSON da IA", e);
      return null;
    }
  },

  async generateSeoSlug(title: string) {
    const prompt = `Crie um slug otimizado para SEO, curto e direto (apenas palavras-chave essenciais, sem stop words, separado por hífens, minúsculo, sem acentos) para o seguinte título de artigo: "${title}". Retorne APENAS o slug. Ex: inteligencia-artificial-saude`;
    const response = await this.generateContent(prompt);
    return generateSlug(response);
  }
};
