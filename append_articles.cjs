const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const newArticles = `
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
`;

// Insert before the last bracket
const lastBracketIndex = dataContent.lastIndexOf(']');
const newContent = dataContent.substring(0, lastBracketIndex) + ',' + newArticles + '];\n';

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Artigos adicionados com sucesso.');
