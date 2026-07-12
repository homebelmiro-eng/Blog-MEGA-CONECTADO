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
        model: 'gemini-3.5-flash',
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

  app.get('/api/trending-ai', async (req, res) => {
    try {
      const prompt = `Faça uma pesquisa rápida na web pelas 5 principais notícias de hoje sobre Inteligência Artificial, Tecnologia e Inovação. 
      Resuma cada uma delas de forma concisa em um parágrafo.
      Retorne APENAS um array JSON válido contendo objetos com 'title', 'summary' e 'sourceUrl'.
      Não inclua marcações markdown no JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                sourceUrl: { type: Type.STRING }
              },
              required: ["title", "summary", "sourceUrl"]
            }
          }
        }
      });

      const result = JSON.parse(response.text || '[]');
      res.json(result);
    } catch (error) {
      const fallbackData = [
        {
          title: "Avanços em Modelos de Linguagem Visual",
          summary: "Pesquisadores anunciaram novas arquiteturas de IA capazes de interpretar vídeos em tempo real com precisão sem precedentes, abrindo caminho para avanços na robótica e visão computacional.",
          sourceUrl: "https://megaconectado.com.br/ia"
        },
        {
          title: "Regulamentação da IA entra em pauta global",
          summary: "Líderes de tecnologia e governos reúnem-se para debater os limites éticos e de segurança no desenvolvimento de Inteligência Artificial generativa, focando em transparência.",
          sourceUrl: "https://megaconectado.com.br/tecnologia"
        },
        {
          title: "Novos chips aceleradores prometem mais eficiência",
          summary: "Uma nova geração de processadores otimizados para IA promete reduzir o consumo de energia em até 40% durante o treinamento e inferência de grandes modelos de linguagem.",
          sourceUrl: "https://megaconectado.com.br/hardware"
        },
        {
          title: "IA na Saúde: Diagnósticos mais rápidos",
          summary: "Ferramentas de inteligência artificial estão acelerando diagnósticos complexos em hospitais, auxiliando médicos na análise de exames de imagem e reduzindo o tempo de espera dos pacientes.",
          sourceUrl: "https://megaconectado.com.br/ciencia-e-saude"
        },
        {
          title: "A evolução da robótica autônoma",
          summary: "Novos robôs com aprendizado de máquina integrado estão se tornando capazes de executar tarefas domésticas e industriais complexas sem supervisão direta.",
          sourceUrl: "https://megaconectado.com.br/robotica"
        }
      ];
      
      res.json(fallbackData);
    }
  });

  app.get('/sitemap.xml', async (req, res) => {
    try {
      // Import data dynamically to ensure we get the latest if we need to, 
      // but a static import at the top is better for bundling.
      // We will just import it at the top of the file.
      const { heroArticle, heroSideArticles, topNewsArticles, latestArticles } = await import('./src/data.ts');
      const BASE_URL = 'https://megaconectado.com.br';
      
      const allArticles = [
        heroArticle,
        ...heroSideArticles,
        ...topNewsArticles,
        ...latestArticles
      ];

      const articleUrls = allArticles.map(article => {
        return `  <url>
    <loc>${BASE_URL}/artigo/${article.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });

      const categories = [
        'ia', 'software', 'seguranca', 'hardware', 'automacao', 'internet', 'tutoriais', 'reviews', 'comparativos',
        'servicos-financeiros', 'tablets', 'smartwatches', 'gadgets',
        'produtividade', 'tvs', 'perifericos', 'mobilidade',
        'computadores', 'wearables', 'casa-conectada-e-iot', 'fones-de-ouvido',
        'ciencia-e-saude', 'robotica', 'blockchain'
      ];
      const categoryUrls = categories.map(cat => {
        return `  <url>
    <loc>${BASE_URL}/categoria/${cat}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });

      const pages = [
        'sobre-nos', 'equipe-editorial', 'privacidade', 'termos', 
        'politica-de-cookies', 'divulgacao-de-afiliados', 'politica-editorial'
      ];
      const pageUrls = pages.map(page => {
        return `  <url>
    <loc>${BASE_URL}/pagina/${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
      });

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contato</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
${categoryUrls.join('\n')}
${articleUrls.join('\n')}
${pageUrls.join('\n')}
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
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
