export interface CategoryStructure {
  name: string;
  slug: string;
  subcategories: string[];
  description: string;
  seoPilar: string;
  seoClusters: string[];
}

export const CATEGORIES_STRUCTURE: CategoryStructure[] = [
  {
    name: "Smartphones",
    slug: "smartphones",
    description: "Últimas notícias, reviews, comparativos, lançamentos, atualizações e dicas de celulares.",
    subcategories: [
      "Android", "iPhone (iOS)", "Samsung", "Motorola", "Xiaomi", "Realme", 
      "POCO", "Google Pixel", "Huawei", "OnePlus", "Comparativos", 
      "Melhores celulares", "Lançamentos", "Atualizações", "Dicas"
    ],
    seoPilar: "Smartphones",
    seoClusters: ["Reviews", "Comparativos", "Atualizações", "Dicas", "Rumores", "Lançamentos"]
  },
  {
    name: "Computadores",
    slug: "computadores",
    description: "Tudo sobre notebooks, desktops, MacBooks, Chromebooks, mini PCs e upgrades.",
    subcategories: [
      "Notebooks", "PCs Gamer", "Desktop", "Mac", "Chromebooks", "Mini PC", 
      "Workstation", "Upgrade", "Montagem"
    ],
    seoPilar: "Computadores",
    seoClusters: ["Reviews", "Análises", "Guias", "Montagem", "Upgrade"]
  },
  {
    name: "Hardware",
    slug: "hardware",
    description: "Análises técnicas de processadores, placas de vídeo, placas-mãe, SSDs e monitores.",
    subcategories: [
      "Processadores", "Placas de Vídeo", "Placas-mãe", "Memórias RAM", "SSD", 
      "HD", "Fontes", "Gabinetes", "Coolers", "Monitores", "Periféricos"
    ],
    seoPilar: "Hardware",
    seoClusters: ["Reviews", "Benchmarks", "Guias", "Montagem", "Upgrade"]
  },
  {
    name: "Games",
    slug: "games",
    description: "Novidades, lançamentos, reviews e guias de PlayStation, Xbox, Nintendo, PC e mobile.",
    subcategories: [
      "PlayStation", "Xbox", "Nintendo", "PC Gamer", "Jogos Mobile", "Steam", 
      "Epic Games", "Roblox", "Minecraft", "GTA", "Fortnite", "EA FC", "Call of Duty"
    ],
    seoPilar: "Games",
    seoClusters: ["Notícias", "Reviews", "Guias", "Códigos", "Atualizações"]
  },
  {
    name: "TVs & Áudio",
    slug: "tvs-audio",
    description: "Reviews e guias de Smart TVs OLED e QLED, soundbars, caixas bluetooth e fones.",
    subcategories: [
      "Smart TVs", "TVs OLED", "TVs QLED", "Soundbars", "Caixas Bluetooth", 
      "Fones Bluetooth", "Headsets", "Home Theater"
    ],
    seoPilar: "TVs & Áudio",
    seoClusters: ["Reviews", "Comparativos", "Planos"]
  },
  {
    name: "Wearables",
    slug: "wearables",
    description: "Acompanhe tudo sobre smartwatches, smartbands, anéis inteligentes e wearables fitness.",
    subcategories: ["Smartwatch", "Smartband", "Pulseiras Fitness", "Anéis Inteligentes"],
    seoPilar: "Wearables",
    seoClusters: ["Reviews", "Guias", "Dicas"]
  },
  {
    name: "Casa Inteligente",
    slug: "casa-inteligente",
    description: "Automação residencial com Alexa, Google Home, lâmpadas, câmeras e robôs aspiradores.",
    subcategories: [
      "Alexa", "Google Home", "Apple HomeKit", "Lâmpadas", "Câmeras", 
      "Robôs Aspiradores", "Fechaduras Inteligentes", "IoT"
    ],
    seoPilar: "Casa Inteligente",
    seoClusters: ["Reviews", "Guias", "Dicas"]
  },
  {
    name: "Internet",
    slug: "internet",
    description: "Dicas de redes sociais, navegadores, streamings, VPNs, Wi-Fi e 5G.",
    subcategories: [
      "Navegadores", "Redes Sociais", "Streaming", "E-mail", "VPN", "Cloud", 
      "Wi-Fi", "DNS", "Provedores", "Banda Larga", "Fibra", "5G"
    ],
    seoPilar: "Internet",
    seoClusters: ["Guias", "Dicas", "Tutoriais"]
  },
  {
    name: "Telecom",
    slug: "telecom",
    description: "Notícias e planos da Claro, Vivo, TIM, Starlink e regulamentações da Anatel.",
    subcategories: ["Claro", "Vivo", "TIM", "Oi", "Starlink", "Anatel", "Planos", "Portabilidade"],
    seoPilar: "Telecom",
    seoClusters: ["Planos", "Comparativos"]
  },
  {
    name: "Inteligência Artificial",
    slug: "ia",
    description: "As últimas atualizações de ChatGPT, Gemini, Claude, Grok, DeepSeek e IA generativa.",
    subcategories: [
      "ChatGPT", "Gemini", "Claude", "Copilot", "Midjourney", "Grok", 
      "DeepSeek", "IA Generativa", "Automação", "Prompt Engineering"
    ],
    seoPilar: "IA",
    seoClusters: ["Ferramentas", "Prompts", "Comparativos", "Notícias", "Tutoriais"]
  },
  {
    name: "Software",
    slug: "software",
    description: "Tudo sobre Windows, Linux, macOS, aplicativos, antivírus e produtividade.",
    subcategories: ["Windows", "Linux", "macOS", "Android", "iOS", "Office", "Adobe", "Antivírus", "Navegadores", "Apps"],
    seoPilar: "Software",
    seoClusters: ["Tutoriais", "Downloads", "Configuração", "Solução de Problemas"]
  },
  {
    name: "Streaming",
    slug: "streaming",
    description: "O que assistir na Netflix, Prime Video, Disney+, Max, Apple TV+, Spotify e YouTube.",
    subcategories: ["Netflix", "Prime Video", "Disney+", "Max", "Apple TV+", "Paramount+", "Crunchyroll", "Spotify", "YouTube"],
    seoPilar: "Streaming",
    seoClusters: ["Catálogo", "Estreias", "Comparativos", "Planos"]
  },
  {
    name: "Negócios & Mercado",
    slug: "negocios-mercado",
    description: "Big Techs, startups, fusões, investimentos, IPOs e direito digital.",
    subcategories: ["Big Techs", "Startups", "Fusões", "Investimentos", "IPO", "Regulamentação", "Direito Digital", "Fintechs"],
    seoPilar: "Negócios & Mercado",
    seoClusters: ["Investimentos", "Fusões", "Notícias"]
  },
  {
    name: "Guias de Compra",
    slug: "guias-de-compra",
    description: "Seleções de melhores celulares, notebooks, TVs e periféricos custo-benefício.",
    subcategories: [
      "Melhores Smartphones", "Melhores Notebooks", "Melhores TVs", "Melhores SSDs", 
      "Melhores Headsets", "Melhor Custo-benefício", "Até R$ 1.000", "Até R$ 2.000", "Premium"
    ],
    seoPilar: "Guias de Compra",
    seoClusters: ["Melhores", "Custo-benefício", "Reviews"]
  },
  {
    name: "Comparativos",
    slug: "comparativos",
    description: "Embate direto de produtos e marcas: Android vs iPhone, Intel vs AMD, NVIDIA vs AMD.",
    subcategories: ["Produto vs Produto", "Android vs iPhone", "Intel vs AMD", "NVIDIA vs AMD", "Samsung vs Xiaomi"],
    seoPilar: "Comparativos",
    seoClusters: ["Reviews", "Benchmarks"]
  },
  {
    name: "Tutoriais",
    slug: "tutoriais",
    description: "Guias passo a passo de como fazer, dicas, configurações e soluções de problemas.",
    subcategories: ["Como Fazer", "Dicas", "Configuração", "Solução de Problemas", "Recuperação", "Segurança"],
    seoPilar: "Tutoriais",
    seoClusters: ["Dicas", "Configuração", "Solução de Problemas"]
  },
  {
    name: "Segurança Digital",
    slug: "seguranca-digital",
    description: "Fique seguro contra golpes, malwares, phishing, ransomware e aprenda a proteger sua privacidade.",
    subcategories: ["Golpes", "Malware", "Phishing", "Ransomware", "Privacidade", "VPN", "Senhas"],
    seoPilar: "Segurança",
    seoClusters: ["Golpes", "Privacidade", "Antivírus", "LGPD"]
  },
  {
    name: "Finanças Digitais",
    slug: "financas-digitais",
    description: "Notícias e dicas sobre bancos digitais, Pix, cartões, criptomoedas e carteiras digitais.",
    subcategories: ["Bancos Digitais", "Pix", "Cartões", "Criptomoedas", "Carteiras Digitais"],
    seoPilar: "Finanças Digitais",
    seoClusters: ["Bancos Digitais", "Notícias", "Criptomoedas"]
  },
  {
    name: "Tecnologia Automotiva",
    slug: "tecnologia-automotiva",
    description: "Tudo sobre carros elétricos, sistemas inteligentes como Android Auto e CarPlay, e veículos autônomos.",
    subcategories: ["Carros Elétricos", "Android Auto", "Apple CarPlay", "Veículos Autônomos"],
    seoPilar: "Tecnologia Automotiva",
    seoClusters: ["Carros Elétricos", "Autônomos"]
  },
  {
    name: "Ciência & Inovação",
    slug: "ciencia-inovacao",
    description: "As novidades sobre o espaço, NASA, SpaceX, robótica e computação quântica.",
    subcategories: ["Espaço", "NASA", "SpaceX", "Robótica", "Computação Quântica"],
    seoPilar: "Ciência & Inovação",
    seoClusters: ["Espaço", "Robótica"]
  }
];

export const CONTENT_FORMATS = [
  "Notícias",
  "Reviews",
  "Análises",
  "Comparativos",
  "Guias de Compra",
  "Tutoriais",
  "Listas",
  "Opinião",
  "Entrevistas",
  "Cobertura de Eventos",
  "Rumores",
  "Ofertas"
];

// Helper to normalized resolve a category match
export function findCategoryBySlug(slug: string): CategoryStructure | undefined {
  const normSlug = slug?.toLowerCase().trim();
  
  // Try exact slug match
  let matched = CATEGORIES_STRUCTURE.find(c => c.slug === normSlug);
  if (matched) return matched;

  // Try flexible matches (replace - with space, remove accents, check if slug is subset)
  const cleanSlug = normSlug.replace(/-/g, ' ');
  matched = CATEGORIES_STRUCTURE.find(c => 
    c.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 
    cleanSlug.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  );
  if (matched) return matched;

  // Partial match fallback
  return CATEGORIES_STRUCTURE.find(c => 
    c.slug.includes(normSlug) || normSlug.includes(c.slug) ||
    c.name.toLowerCase().includes(cleanSlug) || cleanSlug.includes(c.name.toLowerCase())
  );
}
