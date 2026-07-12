import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { heroArticle, heroSideArticles, topNewsArticles, latestArticles } from '../src/data.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://megaconectado.com.br'; // Substitua pelo domínio real

function generateSitemap() {
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

  const categories = ['tecnologia', 'inovacao', 'startups', 'seguranca', 'mais-lidas', 'todas', 'patrocinado'];
  const categoryUrls = categories.map(cat => {
    return `  <url>
    <loc>${BASE_URL}/categoria/${cat}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  const pages = ['sobre-o-autor', 'equipe-editorial', 'anuncie', 'privacidade', 'termos', 'politica-de-cookies'];
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
${categoryUrls.join('\n')}
${articleUrls.join('\n')}
${pageUrls.join('\n')}
</urlset>`;

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap gerado com sucesso em public/sitemap.xml');
}

generateSitemap();
