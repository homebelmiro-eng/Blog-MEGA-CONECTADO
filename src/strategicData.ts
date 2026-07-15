export interface SemanticCluster {
  pillarName: string;
  pillarPage: string;
  subthemes: string[];
  entities: string[];
  schemaMarkup: string;
  backlinkOpportunities: string[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  examples: string;
  applications: string;
  category: 'IA' | 'SEO' | 'Marketing' | 'Automação' | 'Negócios' | 'Tecnologia';
  relatedQuestions: string[];
}

export interface CalendarItem {
  week: number;
  month: string;
  title: string;
  funnelStage: 'Topo de Funil' | 'Meio de Funil' | 'Fundo de Funil';
  pillar: string;
  seoDifficulty: 'Baixa' | 'Média' | 'Alta';
  searchIntent: 'Informacional' | 'Comercial' | 'Transacional' | 'Navegacional';
  monetizationPotential: 'Baixo' | 'Médio' | 'Alto';
  description: string;
}

export const semanticClustersData: SemanticCluster[] = [
  {
    pillarName: "Inteligência Artificial",
    pillarPage: "/categoria/ia",
    subthemes: [
      "Modelos de Linguagem de Grande Porte (LLMs)",
      "Engenharia de Prompts para Produtividade",
      "Agentes Autônomos de IA para Negócios",
      "Modelos de Visão Computacional e Imagem",
      "Aplicações Práticas de ChatGPT, Gemini e Claude"
    ],
    entities: [
      "OpenAI", "Google DeepMind", "Anthropic", "Transformer Architecture", "Generative AI", "Neural Networks"
    ],
    schemaMarkup: "Article, FAQPage, TechnicalArticle",
    backlinkOpportunities: [
      "Blogs de tecnologia nacionais (TechTudo, Meio Bit)",
      "Portais de negócios de PMEs (Exame PME, PEGN)",
      "Artigos acadêmicos sobre inovação e transformação digital"
    ]
  },
  {
    pillarName: "Automação Inteligente",
    pillarPage: "/categoria/automacao",
    subthemes: [
      "Integração de APIs de IA em Sistemas Legados",
      "Automação de Atendimento ao Cliente com Chatbots",
      "RPA (Robotic Process Automation) para PMEs",
      "Fluxos de Trabalho Automatizados no Make e Zapier",
      "Agentes Inteligentes de Triagem de Emails"
    ],
    entities: [
      "Zapier", "Make.com", "RPA", "API Integration", "Webhooks", "Workflow Automation"
    ],
    schemaMarkup: "SoftwareApplication, HowTo, WebPage",
    backlinkOpportunities: [
      "Comunidades de no-code brasileiras",
      "Portais de produtividade e desenvolvimento de sistemas",
      "Fóruns de empreendedores SaaS"
    ]
  },
  {
    pillarName: "Marketing Digital",
    pillarPage: "/categoria/marketing",
    subthemes: [
      "GEO (Generative Engine Optimization) - O Futuro do SEO",
      "Criação de Conteúdo Escalonável com IA Sem Copiar e Colar",
      "Funis de Vendas Automatizados por IA",
      "Copywriting Persuasivo com Modelos Customizados de Linguagem",
      "Análise Preditiva de Campanhas de Tráfego Pago"
    ],
    entities: [
      "Generative Engine Optimization", "EEAT Google", "Search Generative Experience", "Semantic Search", "Conversion Rate"
    ],
    schemaMarkup: "Article, VideoObject, SpecialtyPrereq",
    backlinkOpportunities: [
      "Agências de marketing digital parceiras",
      "Comunidades de tráfego pago e SEO",
      "Portais de e-commerce e vendas digitais"
    ]
  },
  {
    pillarName: "Produtividade",
    pillarPage: "/categoria/produtividade",
    subthemes: [
      "Sistemas de Organização Pessoal Integrados com Assistentes",
      "Gestão do Tempo Dinâmica com Agendas Inteligentes",
      "Métodos de Foco Apoiados por Tecnologia",
      "SaaS de Organização e Projetos (Notion, ClickUp)",
      "Automação de Tarefas Diárias Repetitivas"
    ],
    entities: [
      "Notion", "ClickUp", "Time Blocking", "Getting Things Done (GTD)", "Context Switching", "Task Delegation"
    ],
    schemaMarkup: "HowTo, FAQPage",
    backlinkOpportunities: [
      "Blogs de desenvolvimento pessoal",
      "Comunidades de Notion e ClickUp Brasil",
      "Canais de produtividade no YouTube"
    ]
  },
  {
    pillarName: "Negócios",
    pillarPage: "/categoria/negocios",
    subthemes: [
      "Transformação Digital de Negócios Tradicionais",
      "SaaS B2B: Como Escalar Lucratividade",
      "Estratégia e Escalar de Startups",
      "Gestão de Processos Corporativos de Alta Retenção",
      "Monetização de Blogs e Portais de Notícias"
    ],
    entities: [
      "SaaS B2B", "LTV (Lifetime Value)", "Churn Rate", "CAC (Customer Acquisition Cost)", "Scale-up", "Business Model"
    ],
    schemaMarkup: "Brand, Organization, FinancialProduct",
    backlinkOpportunities: [
      "Anuários de startups e venture capital",
      "Redes de investidores anjo",
      "Revistas eletrônicas de finanças e economia"
    ]
  },
  {
    pillarName: "Tecnologia",
    pillarPage: "/categoria/tecnologia",
    subthemes: [
      "Cibersegurança e Proteção de Dados com LGPD",
      "Sistemas SaaS de Alta Performance",
      "Desenvolvimento Moderno e Código Limpo",
      "Reviews Detalhados de Ferramentas SaaS",
      "Diferenças entre Nuvem Pública e Híbrida"
    ],
    entities: [
      "LGPD", "SaaS Architecture", "Cloud Computing", "Cybersecurity", "Zero Trust", "Modern Frameworks"
    ],
    schemaMarkup: "TechArticle, Review, Product",
    backlinkOpportunities: [
      "GitHub repos e comunidades Open Source",
      "Fóruns de segurança da informação e redes",
      "Artigos sobre legislação digital brasileira"
    ]
  }
];

export const glossaryTermsData: GlossaryTerm[] = [
  // IA
  {
    term: "LLM (Large Language Model)",
    definition: "Algoritmo de inteligência artificial treinado em enormes volumes de dados de texto para compreender, resumir, gerar e prever novos conteúdos em linguagem natural.",
    examples: "GPT-4o da OpenAI, Gemini 1.5 Pro do Google, Claude 3.5 Sonnet da Anthropic.",
    applications: "Geração automática de rascunhos de artigos, chatbots inteligentes de atendimento ao cliente, programação assistida por IA, tradução simultânea.",
    category: "IA",
    relatedQuestions: [
      "Como funciona o treinamento de um LLM?",
      "Quais são os limites de contexto dos modelos atuais?",
      "Qual LLM é melhor para análise de dados?"
    ]
  },
  {
    term: "Agentes de IA (AI Agents)",
    definition: "Sistemas autônomos que percebem seu ambiente por meio de sensores, tomam decisões usando modelos de linguagem e realizam ações usando ferramentas externas para alcançar metas específicas.",
    examples: "Agentes que respondem e organizam emails automaticamente, integrando CRM, faturamento e chat sem intervenção humana.",
    applications: "Automatizar operações de pós-venda, triagem inteligente de leads, pesquisa de mercado profunda de forma automatizada.",
    category: "IA",
    relatedQuestions: [
      "Qual a diferença de um chatbot simples para um agente de IA?",
      "O que são as 'ferramentas' (tools) usadas por agentes?",
      "Como implementar agentes com CrewAI ou LangChain?"
    ]
  },
  // SEO
  {
    term: "GEO (Generative Engine Optimization)",
    definition: "Conjunto de práticas de otimização focadas em garantir que uma marca, serviço ou artigo seja citado e recomendado pelas novas ferramentas de busca baseadas em IA generativa.",
    examples: "Aparecer como recomendação primária no Perplexity AI ou nos resumos do Google AI Overviews.",
    applications: "Formatura de conteúdos com respostas curtas e precisas, uso de citações autoritativas, tabelas comparativas e dados estatísticos claros de alta confiabilidade.",
    category: "SEO",
    relatedQuestions: [
      "GEO é diferente do SEO tradicional?",
      "Como as IAs escolhem quais links citar em suas respostas?",
      "Quais as melhores estratégias de formatação para GEO?"
    ]
  },
  {
    term: "EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)",
    definition: "Diretrizes de qualidade do Google usadas para avaliar se o criador do conteúdo possui Experiência prática, Especialidade, Autoridade no tema e Confiabilidade.",
    examples: "Artigos assinados por autores reais certificados com biografias verificáveis e links para seus portfólios profissionais.",
    applications: "Incluir revisões por especialistas, citar fontes primárias de pesquisa, evitar clickbaits e detalhar a metodologia de testes de produtos.",
    category: "SEO",
    relatedQuestions: [
      "Como comprovar experiência prática em um artigo técnico?",
      "O que o Google considera como sinal de autoridade temática?",
      "Conteúdo escrito por IA viola as regras de EEAT?"
    ]
  },
  // Marketing
  {
    term: "Funil de Vendas Automatizado",
    definition: "Estrutura de marketing digital que conduz um cliente em potencial desde o primeiro contato até a conversão final, utilizando disparos automatizados e segmentação por IA.",
    examples: "Envio automático de materiais ricos conforme as interações do lead no site e pontuação automática de propensão de compra (Lead Scoring).",
    applications: "Acelerar o ciclo de vendas de empresas SaaS, nutrir clientes de infoprodutos e recuperar carrinhos abandonados de forma personalizada.",
    category: "Marketing",
    relatedQuestions: [
      "Como desenhar um funil de conversão para vendas SaaS?",
      "Quais as principais ferramentas de automação de marketing recomendadas?",
      "Como a IA ajuda na personalização de fluxos de email?"
    ]
  },
  {
    term: "Análise Preditiva de Conversão",
    definition: "Uso de dados históricos e modelos estatísticos com inteligência artificial para antecipar o comportamento futuro dos usuários em um portal ou campanha de tráfego pago.",
    examples: "Sistemas que predizem se um usuário irá assinar uma newsletter premium com base na velocidade de rolagem e profundidade de leitura.",
    applications: "Otimizar o orçamento de anúncios no Google Ads e Meta Ads, focando apenas nos públicos com maior probabilidade de alta conversão.",
    category: "Marketing",
    relatedQuestions: [
      "Como configurar modelos preditivos simples no Google Analytics?",
      "O que é atribuição de conversão baseada em dados?",
      "Como melhorar o custo por aquisição (CPA) com IA?"
    ]
  },
  // Automação
  {
    term: "Webhook",
    definition: "Mecanismo que permite que uma aplicação envie dados em tempo real para outra aplicação assim que um determinado evento ocorre, servindo de gatilho para integrações.",
    examples: "Um novo pagamento aprovado na Stripe dispara automaticamente uma notificação para o Slack e libera o acesso do usuário no banco de dados.",
    applications: "Conectar formulários de captura com planilhas inteligentes, atualizar bases de dados instantaneamente e integrar plataformas no-code.",
    category: "Automação",
    relatedQuestions: [
      "Qual a diferença entre Webhook e chamadas de API tradicionais?",
      "Como tratar falhas de entrega e retentativas em webhooks?",
      "O webhook é seguro para transmitir dados de vendas?"
    ]
  },
  {
    term: "RPA (Robotic Process Automation)",
    definition: "Tecnologia que automatiza processos repetitivos em computadores mimetizando as ações humanas em interfaces gráficas, como cliques, digitação e preenchimento de planilhas.",
    examples: "Robôs que entram em portais do governo todos os dias, fazem login, baixam notas fiscais eletrônicas e salvam no Google Drive.",
    applications: "Reduzir o trabalho manual nos departamentos de contabilidade, recursos humanos e faturamento de pequenas e médias empresas.",
    category: "Automação",
    relatedQuestions: [
      "Quando escolher RPA em vez de integrações diretas por API?",
      "Quais são as melhores ferramentas para iniciar em RPA?",
      "Como manter robôs estáveis quando a interface de um site muda?"
    ]
  },
  // Negócios
  {
    term: "SaaS B2B (Software as a Service)",
    definition: "Modelo de licenciamento e distribuição de software no qual as aplicações são hospedadas por provedores de serviços e disponibilizadas para empresas clientes via internet, geralmente sob assinatura recorrente.",
    examples: "Plataformas como Salesforce, Slack, e softwares de contabilidade digital.",
    applications: "Desenvolvimento de ferramentas de automação de nicho com alta receita recorrente mensal (MRR) e excelente margem de lucro operacional.",
    category: "Negócios",
    relatedQuestions: [
      "Quais as principais métricas de saúde financeira de um SaaS B2B?",
      "Como reduzir a taxa de cancelamento (Churn Rate) de assinantes corporativos?",
      "Como validar a ideia de um SaaS B2B antes de escrever a primeira linha de código?"
    ]
  },
  {
    term: "Receita Recorrente Mensal (MRR)",
    definition: "Métrica operacional e financeira essencial para negócios de assinatura, que calcula o faturamento previsível e constante que a empresa espera receber mensalmente dos clientes ativos.",
    examples: "Se um portal de notícias possui 500 membros na newsletter premium pagando R$ 30 por mês, seu MRR é de R$ 15.000.",
    applications: "Planejar reinvestimentos seguros na contratação de redatores, infraestrutura de nuvem e campanhas de aquisição de tráfego orgânico.",
    category: "Negócios",
    relatedQuestions: [
      "Como calcular o MRR deduzindo impostos e estornos?",
      "Qual a diferença entre MRR e faturamento total?",
      "Como aumentar o ticket médio (ARPU) de clientes de recorrência?"
    ]
  },
  // Tecnologia
  {
    term: "Zero Trust Architecture",
    definition: "Modelo estratégico de segurança cibernética baseado na premissa de que nenhuma identidade ou dispositivo deve ser confiado por padrão, seja de dentro ou fora da rede corporativa.",
    examples: "Sistemas corporativos que exigem dupla autenticação, validação de segurança do dispositivo e análise de IP anômalo para cada acesso único.",
    applications: "Proteger servidores de bancos de dados de clientes, garantir conformidade estrita com a LGPD e evitar vazamento de propriedade intelectual.",
    category: "Tecnologia",
    relatedQuestions: [
      "Quais são os pilares fundamentais da segurança Zero Trust?",
      "Como implementar políticas Zero Trust em pequenas equipes remotas?",
      "Quais as diferenças de segurança entre uma VPN e acesso Zero Trust?"
    ]
  },
  {
    term: "Nuvem Híbrida (Hybrid Cloud)",
    definition: "Ambiente de computação em nuvem que combina uma nuvem privada local com nuvens públicas de terceiros, permitindo que dados e aplicativos sejam compartilhados de maneira flexível e segura entre eles.",
    examples: "Processar dados confidenciais de saúde em servidores locais privados e usar a inteligência artificial do Google Cloud para gerar relatórios preditivos.",
    applications: "Garantir conformidade com leis rígidas de dados locais ao mesmo tempo em que se usufrui da escalabilidade econômica das grandes nuvens globais.",
    category: "Tecnologia",
    relatedQuestions: [
      "Quais as vantagens de custos de uma arquitetura de nuvem híbrida?",
      "Como gerenciar a orquestração de servidores híbridos usando Kubernetes?",
      "Como garantir a latência mínima na transferência de dados híbridos?"
    ]
  }
];

export const calendarData: CalendarItem[] = [
  // Mês 1
  {
    week: 1,
    month: "Mês 1",
    title: "GEO (Generative Engine Optimization): O Guia Definitivo de Otimização para IAs",
    funnelStage: "Topo de Funil",
    pillar: "Marketing Digital",
    seoDifficulty: "Alta",
    searchIntent: "Informacional",
    monetizationPotential: "Médio",
    description: "Introduzir o conceito de GEO, como as ferramentas Perplexity, Gemini e ChatGPT buscam informações e como formatar posts para serem citados por elas."
  },
  {
    week: 2,
    month: "Mês 1",
    title: "Como Configurar o Make.com para Enviar Leads de Formulários Diretamente para o WhatsApp",
    funnelStage: "Meio de Funil",
    pillar: "Automação Inteligente",
    seoDifficulty: "Baixa",
    searchIntent: "Comercial",
    monetizationPotential: "Alto",
    description: "Tutorial prático passo a passo de integração com Make.com e APIs de mensageria, promovendo links de afiliados de APIs e da própria plataforma Make."
  },
  {
    week: 3,
    month: "Mês 1",
    title: "ChatGPT vs Gemini vs Claude: Comparativo Técnico das Versões Pro em 2026",
    funnelStage: "Topo de Funil",
    pillar: "Inteligência Artificial",
    seoDifficulty: "Média",
    searchIntent: "Informacional",
    monetizationPotential: "Médio",
    description: "Tabela comparativa robusta analisando tamanho de contexto, precisão lógica, geração de código e custos para desenvolvedores e empresas."
  },
  {
    week: 4,
    month: "Mês 1",
    title: "Como Montar uma Agência de Automação de Processos com IA Sem Saber Programar",
    funnelStage: "Fundo de Funil",
    pillar: "Negócios",
    seoDifficulty: "Média",
    searchIntent: "Transacional",
    monetizationPotential: "Alto",
    description: "Modelo de negócios focado na venda de serviços de consultoria e automação inteligente de processos corporativos para pequenas e médias empresas locais."
  },
  
  // Mês 2
  {
    week: 5,
    month: "Mês 2",
    title: "10 Prompts Avançados do Claude 3.5 Sonnet para Criar Copywriting de Vendas",
    funnelStage: "Meio de Funil",
    pillar: "Inteligência Artificial",
    seoDifficulty: "Baixa",
    searchIntent: "Navegacional",
    monetizationPotential: "Médio",
    description: "Guia de engenharia de prompts com templates prontos para copiar e aplicar em páginas de captura e anúncios altamente persuasivos."
  },
  {
    week: 6,
    month: "Mês 2",
    title: "A Lei Geral de Proteção de Dados (LGPD) em SaaS B2B: Checklist de Conformidade",
    funnelStage: "Fundo de Funil",
    pillar: "Tecnologia",
    seoDifficulty: "Média",
    searchIntent: "Informacional",
    monetizationPotential: "Alto",
    description: "Artigo aprofundado com as regras legais obrigatórias para desenvolvedores e fundadores de startups de software operando no mercado brasileiro."
  },
  {
    week: 7,
    month: "Mês 2",
    title: "Como Automatizar sua Planilha de Fluxo de Caixa Utilizando Inteligência Artificial",
    funnelStage: "Meio de Funil",
    pillar: "Produtividade",
    seoDifficulty: "Baixa",
    searchIntent: "Transacional",
    monetizationPotential: "Alto",
    description: "Guia mostrando conexões do Google Sheets com OpenAI API para categorização de faturas e notas de despesas sem complicação."
  },
  {
    week: 8,
    month: "Mês 2",
    title: "O que é EEAT do Google e Como Ele Impacta Artigos Escritos com IA?",
    funnelStage: "Topo de Funil",
    pillar: "Marketing Digital",
    seoDifficulty: "Média",
    searchIntent: "Informacional",
    monetizationPotential: "Baixo",
    description: "Explicar as novas regras de qualidade do algoritmo do Google, ensinando a adicionar experiência real em conteúdos para não perder tráfego."
  },

  // Mês 3 a 12 (Amostras consolidadas para cobrir todo o período)
  {
    week: 12,
    month: "Mês 3",
    title: "Guia Prático de Redução de Custos de Cloud Computing com Arquitetura Híbrida",
    funnelStage: "Fundo de Funil",
    pillar: "Tecnologia",
    seoDifficulty: "Alta",
    searchIntent: "Comercial",
    monetizationPotential: "Alto",
    description: "Roteiro técnico mostrando como balancear servidores dedicados com recursos na nuvem pública para diminuir a conta mensal em até 40%."
  },
  {
    week: 20,
    month: "Mês 5",
    title: "Como Criar Agentes de Vendas Autônomos com CrewAI e Integrar no Hubspot",
    funnelStage: "Fundo de Funil",
    pillar: "Automação Inteligente",
    seoDifficulty: "Média",
    searchIntent: "Transacional",
    monetizationPotential: "Alto",
    description: "Codificação prática em Python mostrando um agente coletando emails, qualificando leads e atualizando funis no CRM corporativo sem ajuda humana."
  },
  {
    week: 32,
    month: "Mês 8",
    title: "SaaS Micro-SaaS de Nicho: Como Faturar R$ 10mil/mês Sendo Desenvolvedor Solo",
    funnelStage: "Meio de Funil",
    pillar: "Negócios",
    seoDifficulty: "Baixa",
    searchIntent: "Informacional",
    monetizationPotential: "Alto",
    description: "Dicas de validação de produto, precificação em fatias de mercado negligenciadas e técnicas de marketing direto de baixo custo para desenvolvedores."
  },
  {
    week: 45,
    month: "Mês 11",
    title: "Análise das Melhores Ferramentas SaaS para Otimização de Imagens em Lotes em 2026",
    funnelStage: "Topo de Funil",
    pillar: "Tecnologia",
    seoDifficulty: "Baixa",
    searchIntent: "Comercial",
    monetizationPotential: "Médio",
    description: "Avaliação técnica das velocidades, taxas de compressão, e suporte a formatos de próxima geração como WebP, AVIF e srcset dinâmico."
  },
  {
    week: 52,
    month: "Mês 12",
    title: "Retrospectiva MegaConectado: O Impacto Real da IA em Pequenas Empresas Brasileiras",
    funnelStage: "Topo de Funil",
    pillar: "Negócios",
    seoDifficulty: "Média",
    searchIntent: "Informacional",
    monetizationPotential: "Médio",
    description: "Compilado de cases de sucesso práticos, estatísticas nacionais de adoção de automação e previsões tecnológicas para o próximo ano."
  }
];
