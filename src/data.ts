import { Article } from './types';

export const heroArticle: Article = {
  id: '1',
  title: 'O Futuro da Criação de Conteúdo e Design',
  category: 'IA GENERATIVA',
  date: '12 de Julho de 2026',
  author: 'Equipe Editorial',
  excerpt: 'A inteligência artificial generativa está redefinindo as fronteiras criativas. Descubra como novas ferramentas estão moldando o futuro de indústrias inteiras e o que isso significa para os profissionais da área tecnológica.',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWgJ2qCfmj3iBdTrsTBWA6iqbgnMo0OfOLnH-qxzK3hBAY5PHAXtjURgjIUL5TDOcfOnk0qi_ZOuS6ZDUelMp_ejTO22sWBfPf3ffAoKmspJXkLMjbnXutiKvHSCF3ja5sBcz9Z-rv71f6oMvlGSnox9bvxdb0cKEwwrBbaWKIbsFtVpbsMc8_9bUmB2fNrDEcrSBhWO6DcSas6cYu7d3M2g0EF0aJWcUbK06upuL3w1tp5mCCF_wdRIUEn07Q7x8Cr07lcIZzHfbm',
  imageAlt: 'Figura robótica interagindo com interface holográfica',
  faq: [
    {
      question: "O que é IA Generativa?",
      answer: "IA Generativa é um ramo da inteligência artificial que se concentra na criação de novos conteúdos, como textos, imagens, áudio e vídeo, baseando-se em padrões aprendidos de dados existentes."
    },
    {
      question: "A IA vai substituir designers e redatores?",
      answer: "A IA é vista como uma ferramenta de auxílio que aumenta a produtividade e criatividade, permitindo que profissionais foquem em tarefas estratégicas e conceituais, enquanto a IA lida com a execução repetitiva."
    },
    {
      question: "Quais as principais ferramentas de design com IA em 2026?",
      answer: "Atualmente, destacam-se ferramentas que integram geração de imagem em tempo real, edição vetorial automatizada e prototipagem dinâmica baseada em comandos de voz ou texto."
    }
  ]
};

export const heroSideArticles: Article[] = [
  {
    id: '2',
    title: 'Starlink no Brasil: Impacto no Acesso à Internet Rural',
    category: 'INTERNET',
    date: '11 de Julho de 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8FzyQHiAIH7HWJImUDegiVxi6_v3O01wx4yV4vgxqz1FsVydGzvI97zB3cHUPCxn67TUi8DNzhKPuQUq2IDXnfAv_LRD-2sSV0DviExDpBttQ-WqOKHqXc3xOya-Uot-F1XlcKbqSeYDXLVmJGKCdabcteOqp-NSrvDdSwXas2j-pMCvAGIb0i0V1-ZVYbj8ck58t6vGzmTtpXGWdMVpwc9nrOkTxxk4FvFxWK9077LAauga7Cj2aT4f66K1gIsXq8jGt1byOJqQU',
    imageAlt: 'Antena Starlink em telhado rural',
  },
  {
    id: '3',
    title: 'Revolução dos Chips: A Corrida Pelo Poder Computacional',
    category: 'HARDWARE',
    date: '10 de Julho de 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArtRihgdgxCTOlNVuZ7R1xPaaj9KJhN3WJtGp8SgzMO9gTSysc6ymV-Vi-1zh-rDDAQwsGR-yS1DC9rwFPMX0ge00qnqBu5eXX9Ls7WblcnfOt0ZIZgoDH4oisU-Qmi2nwAeDsM83ZdmmEVv6zr0VY9qjRnhWkssWkuXuNSCl3euQI3LURzTextCnEQw6m8viBK4LXVtAfb3X8G41aT-_YhFIiuigjVKMdbzdiKBF9j199rkf_VfVq28CW1o6WJ_5r6Lj3MuVsQJs0',
    imageAlt: 'Microchip brilhante com código binário',
  },
  {
    id: '4',
    title: 'As 5 Melhores Ferramentas de IA para Marketing Digital',
    category: 'MARKETING',
    date: '09 de Julho de 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKZbfGbNncOzz-a2mVs87wb08WxzWbzcImj3Euj3-4UO7KJDdsikBGUq75y0ON-4G6IPSvLbjVOvHoydpiaDu_zwvif7xlQQvmKsP1sQAtEgWCCXAAY16IV0BVwznct0oNscE_JeGG0M5tDindFTB_042MIwzPYnZjQad0v6xMnDYLnVwIjx0tckUX-3uOUAlKyLTqpRIdDpB5G9Ov509N-pC_Oh6wwz7XOBud_ICPGNXTGBa0KDA1dxRhKEo9vHNSqEyDduDt-pGe',
    imageAlt: 'Smartphone exibindo painel de dados',
  },
  {
    id: '5',
    title: 'Guia: Como Integrar APIs de IA no seu Aplicativo',
    category: 'TUTORIAIS',
    date: '08 de Julho de 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArUbfG6q0vImSCd8JIzV5fV30V_oFDrTzoHUR1n0_QXDCv5CTHLEEr6Mhve3BSFIuw5bFTLobWF2OMMDTeddmLjfQsZWfrJRNesldCzYK89DP4se8D_d47N2y9lMloW6HzqmAFYWIZCv8Xn67U9g4wWhaOqveIedujrMNieffgJ9FUYiMzNG8U0zKL_5TEBvEkYa5MwtY786yT8EdMtAL40wCJFGxyxaouZDOs_h_uLIx60k7zMkfwaf1El0yb1tikIhSQk2S404wt',
    imageAlt: 'Ícone de espaço reservado para tutorial',
  },
];

export const topNewsArticles: Article[] = [
  {
    id: '6',
    title: 'Modelos de Linguagem: O Próximo Salto Evolutivo',
    category: 'IA & DADOS',
    date: '10 de Julho de 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8ShOiwYMl-dS7tT9LaY0YgmOZHab3dAboD6bHBOXyXEaea0yhNPikBZXxr5kR1reW-z2XXk8UeOQ7FIdlwqc8lAcFpSgxqHYkXq1JVxXuX19aVCc_RZwULswIbwD1bKX6c7X4jcqq7sEIlwEuVlsyEF8McRhHXnZHARjE7sEu4o6I2Zfy0l0CD2HMVq0ubHmQ8qpMl20KdhOzKAraZm5W7g0cegMlfBzKIM1CxYC73WJC81QUErzqBQ1zcbiyite-3WT8ngvjRTHF',
    imageAlt: 'Rede neural abstrata',
  },
  {
    id: '7',
    title: 'Análise: O Novo Flagship Supera as Expectativas?',
    category: 'SMARTPHONES',
    date: '09 de Julho de 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR0F2oXKXXQszvGtHBGkOcjyeYzMedGDKmmuwg7zmwTo7ItE1rvkZTyBy_-YMYpFWm-DMsyhxbQHdraAYlPeVXkVkANmQJfhIcqiFs-b3BqyGz-QCXWYmIgHN_oGTe_SmxUVfxc1CBkkpLsiUchUuHmo0ZIGMZuKpvODu7SXgFSol7wW0H8ruTQ9VkR5uc1f-0Z1I2HcerbqxPbtlwctN-b72X-A7WxZL_5EeYo8GT3kGpQbZTOEv3Akg20gp36qjkb4vHXzyNhNcJ',
    imageAlt: 'Dispositivo inteligente ou celular elegante em uma mesa',
  },
  {
    id: '8',
    title: 'Cibersegurança em 2026: Ameaças e Soluções',
    category: 'SEGURANÇA',
    date: '08 de Julho de 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsUcGbODJJOzM-Xv3OPrW-afjCNy70yOIMET9_da_0nxF6sKHaBJeauIsTIKuVkiIZypOZfoDKzyYStSiSBVO6FXaUR8aoc2bLh3lQiDavHafux_7UxWuB2fHS_Jdwm-UlMofw9pr_N45r1Ks26KFPyM_PX3PMKdUjsGE2mePGVTeIyWAcVKqx1PIOhAps9IPD-n3KaTncl17Do-qibJpBY-6zOVxKcXvUiPltRO08dMzc-sS51-J1qoujZvUT0nU6_6BU3IvWyds3',
    imageAlt: 'Código de computador e ícones de segurança',
  },
  {
    id: '9',
    title: 'Apps de Produtividade que Utilizam IA Nativa',
    category: 'APLICATIVOS',
    date: '07 de Julho de 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_Gg5BoQJpwcnNQ-7PRCYZBMrxCba9BEb39HLW3XkV3BJcdP-E4MBZ0_7mI3RwkbP43uzF9mnkqrG4Y4kedstAU9CBt52pKvwq3TTUQw-dDoGWwInTuWfLhs9WAu9IRUCYnM0ML3rYaUPSdS0FMqThL-DqE1IIj1ByeJLRLpLeDU8NsCZNvADD-tetitkiYrQtpcty1QwABQjSxe2lARZk1XSrvYvzB9CVci6lRYFzeeF6k_IAS1b7J-47Twgz2RqWDBvFIpwFDqk',
    imageAlt: 'Mesa de trabalho moderna',
  },
];

export const latestArticles: Article[] = [
  {
    id: '10',
    title: 'O Guia Definitivo para Programação Funcional em 2026',
    category: 'DESENVOLVIMENTO',
    date: '12 de Julho de 2026',
    author: 'João Silva',
    excerpt: 'Mergulhe nos conceitos avançados de programação funcional e entenda por que os grandes frameworks estão adotando esse paradigma para construir aplicações mais robustas e escaláveis no cenário atual.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgf4sH_Hxch5Qow93335l2-fD2VM7zLw722e9wpcYGlnV0RvkLYu2DNo_szdO3HsIqNEoYynXrKcv4sdJlxbqtDtzhaifnbanKwyo3XLjHKkbIwEE8H4vI7z6qb7GpZsnPvszAFVkJG1QbKRmyDhwocwn5AfI6Ib7TADJAeNHaQB42dJuJpMA-AU0Xs2Mq5h-SyhX8wh6e6NS3u4Cl1-l8N8JloWgTvG16ZO7cFSI-Em_bSYDDDVzns4LbZXxH7Ldez4662hXk-9dZ',
    imageAlt: 'Desenvolvedor digitando em teclado mecânico'
  },
  {
    id: '11',
    title: 'Como a IA Está Transformando o Espaço de Trabalho Híbrido',
    category: 'MERCADO',
    date: '11 de Julho de 2026',
    author: 'Maria Oliveira',
    excerpt: 'Explore as ferramentas de colaboração impulsionadas por inteligência artificial que estão redefinindo a comunicação, a gestão de projetos e a produtividade nas empresas modernas ao redor do globo.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2n_jNtRNGEw9IB3t2rv_dyBkHmzMb9SkIen854ieZFT1d_2V9NfDIvsslGoCRFJyL1L4PtWymKHdtoSrCrPPhlHLIe1-zRTdvYeciJLBfw3MEtoc0ApzFNK3uDN4UKRhSTBpIup-4sQRQCLhmqfZl61EIA4CvoFhNPDVqiRsiH2snzsTD0Zc8gbHOTIDM9Wled1lzQhPw8KFeze6KClQ7egHuCQ_due6SAJZIct5PEflQZzaoJDeU3QOaqWtxWZDpXwh5nmJn9Do4',
    imageAlt: 'Equipe revisando planos arquitetônicos em tela transparente'
  },
  {
    id: '12',
    title: 'Semicondutores: A Nova Fronteira da Geopolítica Tecnológica',
    category: 'ECONOMIA',
    date: '10 de Julho de 2026',
    author: 'Carlos Mendes',
    excerpt: 'Uma análise aprofundada sobre como a fabricação de chips e semicondutores se tornou o principal campo de batalha econômico e estratégico entre as maiores potências tecnológicas globais nesta década.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZUKlhnirI_95Evpa2oeIbLiCXjqTmvoso2NkFzFNdYLhyMM-Hj4BdQXUt9_jHSt9769Vn845RfODUn7fwfKL9stjjMsmhjmSk9Uvz5jwQsczixNK2GVUX4_SEzLmj35RPfkgWRzK6O1zGU5lazcu24jBBYqaJXsi7G6uKg6qMxpxZ7IbfRbyQjfgy7NAC-2obaCPCcD_4m5D220Qv53e6ScaOg1sAKQXZ1241ppvlv2-QrjL2U5H5anbzUhLUDIW-nxrHU7MxALL7',
    imageAlt: 'Fotografia macro de um wafer de silício'
  }
,
  {
    id: '13',
    title: 'Energia Solar: O Retorno sobre o Investimento em 2026',
    category: 'ENERGIA LIMPA',
    date: '12 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Descubra como a queda nos custos de instalação e a alta eficiência dos novos painéis solares estão tornando a energia solar a opção mais rentável para residências e pequenos negócios no Brasil.',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    imageAlt: 'Painéis solares fotovoltaicos',
  },
  {
    id: '14',
    title: 'Carros Elétricos Populares: O Fim do Motor a Combustão?',
    category: 'MOBILIDADE',
    date: '11 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Com as novas baterias de estado sólido e montadoras focadas em modelos populares, a acessibilidade aos carros elétricos atingiu um ponto de virada histórico neste ano.',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    imageAlt: 'Carro elétrico carregando a bateria',
  },
  {
    id: '15',
    title: 'Impressão 3D na Indústria: Redução de Custos e Customização',
    category: 'INDÚSTRIA 4.0',
    date: '10 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Da manufatura de peças de reposição à medicina, veja como a popularização da impressão 3D industrial está gerando alta lucratividade para pequenas empresas de nicho.',
    imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80',
    imageAlt: 'Impressora 3D em operação',
  },
  {
    id: '16',
    title: 'Automação Residencial Acessível: O Lar Inteligente',
    category: 'SMART HOME',
    date: '09 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Como transformar sua casa usando dispositivos IoT de baixo custo e plataformas open-source, criando automações que economizam energia e melhoram a segurança.',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    imageAlt: 'Interface de automação residencial em tablet',
  },
  {
    id: '17',
    title: 'Setup de Home Office: Produtividade e Ergonomia',
    category: 'TRABALHO',
    date: '08 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Guia completo para montar um escritório em casa que maximize seu foco e evite lesões, focando nos equipamentos com melhor custo-benefício.',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
    imageAlt: 'Setup minimalista de home office',
  },
  {
    id: '18',
    title: 'Trabalho Remoto Global: Oportunidades em Dólar',
    category: 'CARREIRA',
    date: '07 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Estratégias validadas para profissionais de tecnologia e marketing conquistarem vagas remotas internacionais e multiplicarem seus ganhos usando plataformas especializadas.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    imageAlt: 'Pessoa trabalhando remotamente em um café',
  },
  {
    id: '19',
    title: 'Software para Empresas: SaaS B2B de Alta Retenção',
    category: 'NEGÓCIOS',
    date: '06 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'O desenvolvimento de soluções de software sob medida para problemas específicos de pequenas e médias empresas tornou-se o modelo de negócio digital mais resiliente e lucrativo.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    imageAlt: 'Dashboard de software empresarial',
  },
  {
    id: '20',
    title: 'O Futuro do CRM: Dados Preditivos para Vendas',
    category: 'VENDAS',
    date: '05 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'A evolução dos sistemas de Customer Relationship Management e como a análise preditiva está ajudando times de vendas a dobrarem suas taxas de conversão.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    imageAlt: 'Equipe de vendas analisando funil no CRM',
  },
  {
    id: '21',
    title: 'Implementação de ERP em PMEs: Desafios e Ganhos',
    category: 'GESTÃO',
    date: '04 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Sistemas Integrados de Gestão (ERP) agora são acessíveis. Veja o roteiro de implantação para pequenas empresas que desejam centralizar sua operação sem explodir o orçamento.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    imageAlt: 'Profissionais usando sistema ERP em notebook',
  },
  {
    id: '22',
    title: 'Agricultura de Precisão: Tecnologia no Campo',
    category: 'AGROTECH',
    date: '03 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Sensores, drones e análise de solo em tempo real. O agronegócio passa por uma revolução digital silenciosa que aumenta exponencialmente o rendimento por hectare.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    imageAlt: 'Drone sobrevoando plantação verde',
  },
  {
    id: '23',
    title: 'Inteligência Artificial Aplicada a Negócios Tradicionais',
    category: 'IA PARA NEGÓCIOS',
    date: '02 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'Como padarias, clínicas e escritórios contábeis estão usando modelos simples de IA para automatizar atendimento, reduzir custos e prever demandas com alta rentabilidade.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    imageAlt: 'Gráfico de negócios com visualização de IA',
  },
  {
    id: '24',
    title: 'Segurança Digital Simplificada: Proteja seus Ativos',
    category: 'CIBERSEGURANÇA',
    date: '01 de Julho de 2026',
    author: 'Equipe Editorial',
    excerpt: 'As ameaças cibernéticas mudaram. Conheça as estratégias vitais de segurança digital e governança de dados que não exigem orçamentos milionários, essenciais para qualquer negócio digital.',
    imageUrl: 'https://images.unsplash.com/photo-1614064641913-a520faff8b03?w=800&q=80',
    imageAlt: 'Cadeado digital sobreposto em código',
  }
];
