import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/generate-meta', async (req, res) => {
    try {
      const { content, keywords } = req.body;
      if (!content) {
        return res.status(400).json({ error: 'O conteúdo do artigo é obrigatório.' });
      }

      const prompt = `Você é um especialista em SEO e redação para web de um grande portal de tecnologia. Leia o seguinte artigo e as palavras-chave sugeridas.
      
      Palavras-chave: ${keywords && keywords.length ? keywords.join(', ') : 'Nenhuma fornecida'}
      
      Artigo:
      ${content}
      
      Gere:
      1. Um resumo atraente e conciso do artigo para atrair o leitor (máximo de 3 frases).
      2. 3 opções de títulos criativos e otimizados para SEO.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { 
                type: Type.STRING,
                description: "O resumo atraente e conciso do artigo."
              },
              titles: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "3 opções de títulos otimizados para SEO."
              }
            },
            required: ["summary", "titles"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      res.json(result);
    } catch (error) {
      console.error('Error generating meta:', error);
      res.status(500).json({ error: 'Erro ao gerar o resumo e os títulos.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
