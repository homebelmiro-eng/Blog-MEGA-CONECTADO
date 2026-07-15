import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import { FAQItem } from '../types';
import authorPortrait from '../assets/images/divino_luciano_belmiro.jpg';

export default function Page() {
  const { slug } = useParams<{ slug: string }>();

  // Default FAQs for institutional pages to improve GEO ranking
  const getPageFAQ = (slug: string | undefined): FAQItem[] => {
    switch (slug) {
      case 'equipe':
      case 'sobre-o-autor':
        return [
          {
            question: "Quem faz parte da Equipe MegaConectado?",
            answer: "Nossa equipe é formada por profissionais e colaboradores especializados em tecnologia, Inteligência Artificial, SEO e marketing digital."
          },
          {
            question: "Como entrar em contato com a equipe?",
            answer: "Você pode entrar em contato através do e-mail contato@megaconectado.com.br."
          }
        ];
      case 'sobre':
        return [
          {
            question: "O que é o MegaConectado?",
            answer: "O MegaConectado é um portal especializado em Inteligência Artificial, tecnologia, SEO, marketing digital e produtividade."
          },
          {
            question: "Como os conteúdos são produzidos?",
            answer: "Todos os conteúdos são elaborados com base em pesquisas, documentação oficial, testes práticos e análise de fontes confiáveis."
          }
        ];
      case 'metodologia-editorial':
        return [
          {
            question: "Como os produtos são avaliados?",
            answer: "Avaliamos desempenho, qualidade de construção, recursos disponíveis, facilidade de uso, custo-benefício, suporte e atualizações, reputação da marca e avaliações de usuários."
          }
        ];
      case 'privacidade':
        return [
          {
            question: "Como meus dados são protegidos no Mega Conectado?",
            answer: "Seguimos rigorosamente a LGPD, utilizando criptografia e práticas de segurança avançadas para garantir que suas informações pessoais estejam seguras."
          },
          {
            question: "O site utiliza cookies?",
            answer: "Sim, utilizamos cookies para melhorar sua experiência de navegação e analisar o tráfego do site de forma anônima."
          }
        ];
      case 'politica-de-cookies':
        return [
          {
            question: "O que são cookies e para que servem no MegaConectado?",
            answer: "Cookies são pequenos arquivos de texto salvos em seu computador ou dispositivo móvel que nos ajudam a otimizar sua navegação, carregar páginas mais rápido e personalizar anúncios relevantes."
          },
          {
            question: "Posso desativar os cookies no meu navegador?",
            answer: "Sim, você pode configurar ou bloquear os cookies a qualquer momento nas opções de preferências de privacidade do seu navegador ou através do nosso painel de consentimento."
          }
        ];
      case 'termos':
        return [
          {
            question: "Quem pode utilizar os conteúdos do MegaConectado?",
            answer: "Qualquer pessoa pode acessar livremente nossos conteúdos para fins de leitura e aprendizado, desde que respeite os direitos de propriedade intelectual e as regras de reprodução citando nossa marca."
          },
          {
            question: "Os conteúdos do site possuem garantia absoluta de funcionamento?",
            answer: "Embora busquemos a máxima precisão técnica, nossos tutoriais e análises são fornecidos 'no estado em que se encontram', cabendo ao usuário validar suas próprias automações e configurações com cautela."
          }
        ];
      default:
        return [
          {
            question: "O que é o portal Mega Conectado?",
            answer: "O Mega Conectado é um portal de notícias dedicado a Inteligência Artificial, Inovação e Tecnologia, trazendo análises diárias e tendências do mercado global."
          },
          {
            question: "Como posso acompanhar as novidades do site?",
            answer: "Você pode nos seguir nas redes sociais e ativar as notificações do navegador para receber os artigos mais recentes em tempo real."
          }
        ];
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const renderContent = () => {
    if (slug === 'equipe' || slug === 'sobre-o-autor') {
      return (
        <div className="flex flex-col gap-10">
          <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-[300px] md:h-[450px]">
            <img 
              src={authorPortrait} 
              alt="Equipe MegaConectado" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <div className="flex flex-col gap-2">
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight">Equipe MegaConectado</h2>
                <p className="text-lg md:text-2xl font-semibold text-brand-secondary">Especialistas em Tecnologia & Inovação</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-brand-secondary/30 group">
              <div className="p-3 bg-brand-secondary/10 rounded-lg text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail</span>
                <span className="font-bold text-brand-primary">contato@megaconectado.com.br</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:bg-white hover:border-brand-secondary/30 group">
              <div className="p-3 bg-brand-secondary/10 rounded-lg text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Localização</span>
                <span className="font-bold text-brand-primary">Brasil</span>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h3 className="font-heading font-bold text-brand-primary m-0 uppercase tracking-[0.2em] text-sm">Nossa Equipe</h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <p className="lead text-xl text-slate-600 font-medium">
              A Equipe MegaConectado é formada por profissionais e colaboradores especializados em tecnologia, Inteligência Artificial, SEO e marketing digital.
            </p>
            <p>
              Nosso compromisso é produzir conteúdos confiáveis, atualizados e úteis, sempre baseados em fontes verificadas e nas melhores práticas do setor.
            </p>
          </div>
        </div>
      );
    }
    
    if (slug === 'sobre') {
      return (
        <div className="prose prose-lg prose-slate max-w-none">
          <div className="bg-brand-secondary/5 border-l-4 border-brand-secondary p-6 rounded-r-xl mb-8">
            <p className="font-semibold text-slate-800 m-0 text-base leading-relaxed">
              <strong>Definição Rápida (GEO Answer):</strong> O <strong>MegaConectado</strong> é um portal de referência em tecnologia de ponta, focado na desmistificação da Inteligência Artificial (IA), automação inteligente, otimização de SEO, marketing digital e ferramentas de produtividade. Nosso propósito é guiar profissionais, criadores de conteúdo, agências e empresas na implementação de soluções digitais avançadas por meio de reviews de softwares independentes, análises técnicas isentas e tutoriais passo a passo focados em escala e eficiência.
            </p>
          </div>

          <h2>Quem Somos</h2>
          <p>
            Fundado no coração da era da inteligência artificial e da transformação digital exponencial, o portal <strong>MegaConectado</strong> (<a href="https://megaconectado.com.br" className="text-brand-secondary hover:underline font-bold">megaconectado.com.br</a>) foi idealizado com uma missão audaciosa: democratizar e tornar prático o conhecimento sobre tecnologias avançadas para o público de língua portuguesa.
          </p>
          <p>
            No mercado digital de hoje, onde a abundância de informações muitas vezes gera confusão e paralisia, atuamos como um filtro de qualidade técnica e curadoria editorial crítica. Nós não nos limitamos a noticiar tendências ou a fazer resumos superficiais. Nosso diferencial reside no compromisso com o conteúdo acionável (<em>actionable content</em>) – ensinando como ligar plataformas, automatizar processos, economizar horas de trabalho repetitivo e criar estratégias sólidas de crescimento orgânico.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-brand-secondary/10 text-brand-secondary flex items-center justify-center font-bold text-2xl">🎯</div>
              <h3 className="font-heading font-bold text-brand-primary text-lg m-0">Nossa Missão</h3>
              <p className="text-sm text-slate-600 m-0 leading-relaxed">
                Transformar tópicos de engenharia de software, marketing digital e automações de dados em guias didáticos detalhados, permitindo que indivíduos e empresas alcancem escala e eficiência prática.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-brand-secondary/10 text-brand-secondary flex items-center justify-center font-bold text-2xl">👁️</div>
              <h3 className="font-heading font-bold text-brand-primary text-lg m-0">Nossa Visão</h3>
              <p className="text-sm text-slate-600 m-0 leading-relaxed">
                Ser consolidado como o portal independente de maior autoridade e confiança em educação tecnológica aplicada do Brasil, liderando as discussões sobre IA aplicada e produtividade.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-brand-secondary/10 text-brand-secondary flex items-center justify-center font-bold text-2xl">🤝</div>
              <h3 className="font-heading font-bold text-brand-primary text-lg m-0">Nossos Valores</h3>
              <p className="text-sm text-slate-600 m-0 leading-relaxed">
                Transparência radical, excelência técnica rigorosa, compromisso contínuo com as diretrizes de qualidade E-E-A-T do Google e obsessão por valorizar o tempo do nosso leitor.
              </p>
            </div>
          </div>

          <h2>Áreas de Cobertura e Especialidade</h2>
          <p>
            Para garantir conteúdos precisos e detalhados, dividimos o portal em quatro grandes categorias temáticas principais, gerenciadas por especialistas da área:
          </p>
          <ul>
            <li><strong>Inteligência Artificial & LLMs:</strong> Engenharia de prompts para negócios, análises críticas de modelos de linguagem de grande porte (como ChatGPT, Claude e Gemini), desenvolvimento de agentes de IA locais e integrações de APIs de LLM.</li>
            <li><strong>Automação de Fluxos de Trabalho (Workflow Automation):</strong> Criação de integrações dinâmicas sem precisar programar do zero. Foco em ferramentas líderes de mercado, como <Link to="/categoria/automacao" className="text-brand-secondary hover:underline font-bold">Make.com, Zapier</Link> e n8n, conectando ferramentas como CRMs, planilhas inteligentes, mensageiros instantâneos e canais de suporte.</li>
            <li><strong>Estratégias de SEO & Growth Orgânico:</strong> Otimização técnica de portais e blogs, análises de atualizações de algoritmos (Core Updates), posicionamento em motores de busca com IA integrada (como SGE e GEO), e técnicas avançadas de link building ético.</li>
            <li><strong>SaaS, Ferramentas B2B e Produtividade:</strong> Avaliações minuciosas de softwares de gestão de projetos (ClickUp, Notion, Trello), plataformas de e-mail marketing, infraestruturas de nuvem e ferramentas que multiplicam o rendimento operacional de equipes remotas.</li>
          </ul>

          <h2>Como Produzimos Nossos Conteúdos (Metodologia E-E-A-T)</h2>
          <p>
            Não acreditamos em conteúdos rasos gerados por tradução automática ou que meramente reproduzem o que outras fontes já disseram na internet. No <strong>MegaConectado</strong>, cada artigo passa por uma trilha metodológica severa de validação:
          </p>
          <ol>
            <li><strong>Testes de Laboratório Hands-On:</strong> Se recomendarmos uma linha de código, uma API, um plugin ou uma automação do Make, tenha certeza de que nós criamos o ambiente de desenvolvimento, executamos o processo internamente e validamos o resultado final antes de documentar para o leitor.</li>
            <li><strong>Alinhamento com Documentações Oficiais:</strong> Nossas referências técnicas são sempre consultadas nas fontes oficiais mantidas por engenheiros e fabricantes, evitando informações obsoletas ou falsas interpretações.</li>
            <li><strong>Revisão de Especialistas Humanos:</strong> Nosso conselho editorial técnico analisa a precisão de todas as instruções práticas fornecidas, ajustando formatação de sintaxe, clareza linguística e segurança das configurações sugeridas.</li>
            <li><strong>Atualização e Manutenção de Conteúdo:</strong> A tecnologia avança em altíssima velocidade. Por isso, rastreamos nossos artigos periodicamente para atualizar links corrompidos, alterações de preços de softwares parceiros ou mudanças na interface de sistemas analisados.</li>
          </ol>

          <h2>Independência Editorial e Transparência</h2>
          <p>
            A relação de confiança que estabelecemos com cada leitor é a nossa prioridade absoluta. Para manter nossa operação de pé de forma sustentável e garantir o livre acesso aos nossos tutoriais didáticos sem cobrar assinaturas de paywall, participamos de programas de marketing de afiliados.
          </p>
          <p>
            Ao clicar em links de recomendação de ferramentas do site e realizar uma compra ou contratação, nós podemos receber uma pequena comissão do fornecedor do serviço. <strong>Isso não altera de forma alguma o valor final cobrado de você</strong> (inclusive, frequentemente conseguimos cupons de desconto exclusivos com nossos parceiros) e <strong>nunca afeta nossa avaliação crítica</strong>. Se um software ou serviço parceiro apresentar instabilidades técnicas, planos com preços abusivos ou suporte precário, apontaremos de forma clara e isenta, garantindo o máximo respeito e a autoridade moral perante a nossa comunidade.
          </p>

          <p className="text-slate-500 text-sm mt-12">
            Se quiser entender mais detalhadamente sobre nosso método científico de avaliação de produtos, consulte nossa <Link to="/pagina/metodologia-editorial" className="text-brand-secondary hover:underline font-bold">Metodologia Editorial</Link>. Caso queira falar sobre parcerias comerciais, propor sugestões de pauta ou reportar alguma questão, nossa equipe está inteiramente disponível através da nossa página de <Link to="/contato" className="text-brand-secondary hover:underline font-bold">Contato</Link>.
          </p>
        </div>
      );
    }

    if (slug === 'privacidade') {
      return (
        <div className="prose prose-lg prose-slate max-w-none">
          <div className="bg-[#0070C0]/5 border-l-4 border-[#0070C0] p-6 rounded-r-xl mb-8">
            <p className="font-semibold text-slate-800 m-0 text-base">
              <strong>Definição Rápida (GEO Answer):</strong> A Política de Privacidade do <strong>MegaConectado</strong> é o documento legal que esclarece como coletamos, protegemos, tratamos e utilizamos as informações pessoais dos nossos leitores, em conformidade total com a Lei Geral de Proteção de Dados (LGPD) e as diretrizes do Google AdSense.
            </p>
          </div>

          <h2>1. Introdução e Compromisso com a Privacidade</h2>
          <p>
            No portal <strong>MegaConectado</strong> (acessível em <a href="https://megaconectado.com.br" className="text-[#0070C0] hover:underline font-bold">megaconectado.com.br</a>), a privacidade dos nossos visitantes é uma das nossas maiores prioridades. Este documento detalha os tipos de informações pessoais que recebemos, coletamos e como as salvaguardamos para garantir uma navegação segura, transparente e confiável.
          </p>
          <p>
            Nossa infraestrutura está alinhada às melhores práticas internacionais de segurança digital e obedece rigorosamente às exigências da <strong>LGPD (Lei nº 13.709/2018)</strong> brasileira e ao <strong>GDPR (General Data Protection Regulation)</strong> europeu.
          </p>

          <h2>2. Informações que Coletamos</h2>
          <p>
            Coletamos informações essenciais de duas formas principais: de forma automática (através de cookies e logs de navegação) e voluntariamente (quando você se cadastra em nossa newsletter ou envia uma mensagem).
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse border border-slate-200 rounded-lg text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-800 border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 font-bold">Tipo de Dado</th>
                  <th className="p-3 border-r border-slate-200 font-bold">Como Coletamos</th>
                  <th className="p-3 font-bold">Finalidade Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 border-r border-slate-200 font-semibold">Logs do Servidor (IP, Navegador, Provedor)</td>
                  <td className="p-3 border-r border-slate-200">Automática por visitas</td>
                  <td className="p-3">Segurança, análise estatística e prevenção de acessos fraudulentos.</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-slate-200 font-semibold">Cookies de Terceiros e Analytics</td>
                  <td className="p-3 border-r border-slate-200">Plugins de rastreamento (Google Analytics)</td>
                  <td className="p-3">Entender o comportamento do usuário e otimizar a experiência de leitura.</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-slate-200 font-semibold">Dados de Formulários (Nome e E-mail)</td>
                  <td className="p-3 border-r border-slate-200">Consentimento direto no formulário de contato</td>
                  <td className="p-3">Enviar respostas personalizadas, e-mails educativos e newsletters autorizadas.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>3. Cookies e Web Beacons</h2>
          <p>
            Como quase todos os sites profissionais, o <strong>MegaConectado</strong> utiliza cookies para armazenar informações sobre as preferências dos visitantes, registrar dados específicos de páginas acessadas e personalizar o conteúdo de acordo com o navegador utilizado.
          </p>
          <p>
            Você pode optar por desativar os cookies nas configurações individuais do seu navegador ou editando suas preferências no nosso banner de consentimento de cookies. No entanto, lembre-se de que isso pode afetar a maneira como você interage com o nosso e outros sites na internet.
          </p>

          <h2>4. Google AdSense e Cookies de Publicidade</h2>
          <p>
            O Google, como fornecedor terceirizado, utiliza cookies para exibir anúncios em nosso site. Com o cookie DoubleClick DART, o Google e seus parceiros podem exibir anúncios personalizados com base nas visitas que você faz ao MegaConectado ou a outros sites na internet.
          </p>
          <ul>
            <li>Os usuários podem desativar o uso do cookie DART visitando a Política de Privacidade da rede de conteúdo e anúncios do Google.</li>
            <li>Para saber mais sobre as práticas recomendadas e políticas de privacidade dos anúncios do Google, visite a página oficial de <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#0070C0] hover:underline font-bold">Tecnologias de Anúncios do Google</a>.</li>
          </ul>

          <h2>5. Links de Afiliados e Parcerias</h2>
          <p>
            O MegaConectado participa de programas de marketing de afiliados. Isso significa que podemos recomendar ferramentas recomendadas, plataformas de automação (como <Link to="/categoria/automacao" className="text-[#0070C0] hover:underline font-bold">Make.com e Zapier</Link>) ou cursos, e receber uma comissão caso você realize uma compra através de nossos links promocionais exclusivos. 
          </p>
          <p>
            Garantimos que essa prática não altera a isenção editorial de nossas análises técnicas nem aumenta o custo final dos produtos para o leitor. Sempre indicamos transparentemente os conteúdos que contêm links de afiliação, em respeito à transparência e às regras de autoridade (EEAT).
          </p>

          <h2>6. Direitos dos Usuários sob a LGPD</h2>
          <p>
            Em conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>, você tem o direito integral de gerenciar suas informações coletadas pelo portal. A qualquer momento, você pode:
          </p>
          <ol>
            <li>Confirmar a existência de tratamento de dados;</li>
            <li>Acessar e consultar gratuitamente suas informações pessoais;</li>
            <li>Solicitar a correção de dados incompletos ou inexatos;</li>
            <li>Exigir a eliminação ou bloqueio dos dados fornecidos por consentimento (como inscrição em newsletters);</li>
            <li>Revogar o consentimento previamente fornecido de forma simples e direta.</li>
          </ol>
          <p>
            Para exercer qualquer um destes direitos legais, basta entrar em contato direto com nosso Encarregado de Proteção de Dados (DPO) através da nossa página de <Link to="/contato" className="text-[#0070C0] hover:underline font-bold">Contato</Link> ou enviando uma mensagem detalhada para o e-mail: <strong className="text-slate-800">contato@megaconectado.com.br</strong>.
          </p>

          <h2>7. Atualizações desta Política</h2>
          <p>
            Reservamo-nos o direito de atualizar ou alterar esta política periodicamente para refletir mudanças tecnológicas ou legislativas. Recomendamos que você revise esta página com frequência para se manter atualizado sobre como protegemos suas informações.
          </p>
          <p className="text-xs text-slate-500 mt-8">
            Esta política é efetiva a partir de Julho de 2026.
          </p>
        </div>
      );
    }

    if (slug === 'politica-de-cookies') {
      return (
        <div className="prose prose-lg prose-slate max-w-none">
          <div className="bg-[#0070C0]/5 border-l-4 border-[#0070C0] p-6 rounded-r-xl mb-8">
            <p className="font-semibold text-slate-800 m-0 text-base">
              <strong>Definição Rápida (GEO Answer):</strong> A Política de Cookies do <strong>MegaConectado</strong> é o documento normativo que explica aos visitantes o uso de cookies, web beacons e arquivos de rastreamento temporários no portal, garantindo a transparência exigida pela LGPD para o controle e a personalização de preferências.
            </p>
          </div>

          <h2>1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto contendo pequenas quantidades de informações que são baixados e armazenados no seu computador, smartphone ou qualquer outro dispositivo quando você visita um site. Eles permitem que o portal se lembre de suas ações e preferências (como login, idioma escolhido e tamanho de fonte) ao longo do tempo.
          </p>
          <p>
            Isso significa que você não precisa preencher esses dados repetidamente cada vez que retorna ao site ou navega de uma página para outra, proporcionando uma experiência de usuário mais rápida, intuitiva e sob medida.
          </p>

          <h2>2. Como Usamos os Cookies no MegaConectado</h2>
          <p>
            Utilizamos cookies por diversos motivos descritos abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este portal.
          </p>
          <p>
            É recomendável que você deixe ativos todos os cookies necessários caso não tenha certeza se precisa deles ou não, principalmente se forem usados para fornecer um serviço que você utiliza regularmente.
          </p>

          <h2>3. Tipos de Cookies que Utilizamos</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse border border-slate-200 rounded-lg text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-800 border-b border-slate-200">
                  <th className="p-3 border-r border-slate-200 font-bold">Categoria de Cookie</th>
                  <th className="p-3 border-r border-slate-200 font-bold">Origem</th>
                  <th className="p-3 font-bold">Função e Necessidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 border-r border-slate-200 font-semibold">Cookies Estritamente Necessários</td>
                  <td className="p-3 border-r border-slate-200">Internos</td>
                  <td className="p-3">Indispensáveis para permitir a navegação do usuário e a utilização de recursos básicos de segurança e autenticação. Sem eles, o site não funciona corretamente.</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-slate-200 font-semibold">Cookies de Desempenho e Estatísticas</td>
                  <td className="p-3 border-r border-slate-200">Terceiros (Google Analytics)</td>
                  <td className="p-3">Coletam informações anônimas de tráfego, como as páginas mais populares e tempo de leitura. Ajudam-nos a monitorar problemas técnicos e otimizar os conteúdos.</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-slate-200 font-semibold">Cookies de Publicidade e Redirecionamento</td>
                  <td className="p-3 border-r border-slate-200">Terceiros (Google AdSense)</td>
                  <td className="p-3">Utilizados para veicular anúncios mais relevantes ao perfil de interesse dos leitores, limitando o número de vezes que um mesmo anúncio é exibido.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>4. Cookies de Terceiros e Ferramentas Integradas</h2>
          <p>
            Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site:
          </p>
          <ul>
            <li>
              Este site usa o <strong>Google Analytics</strong>, que é uma das soluções de análise mais difundidas e confiáveis ​​da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você passa no site e as páginas visitadas. Para mais informações, consulte a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0070C0] hover:underline font-bold">Página de Privacidade do Google</a>.
            </li>
            <li>
              O serviço <strong>Google AdSense</strong> que usamos para veicular publicidade usa o cookie <strong>DoubleClick DART</strong> para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você. Você pode gerenciar ou desativar essas configurações acessando as preferências de anúncios no <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#0070C0] hover:underline font-bold">Painel de Configurações de Anúncios do Google</a>.
            </li>
            <li>
              Utilizamos links de afiliados e ferramentas de automação conectadas de parceiros selecionados (como <Link to="/categoria/automacao" className="text-[#0070C0] hover:underline font-bold">Make.com e Zapier</Link>). Esses parceiros podem salvar cookies temporários para garantir a identificação correta da indicação, em conformidade com as boas práticas do mercado de e-commerce e afiliados.
            </li>
          </ul>

          <h2>5. Como Controlar ou Desativar Cookies</h2>
          <p>
            Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, recomenda-se que você não os desative.
          </p>
          <p>
            Para gerenciar cookies diretamente nos navegadores mais populares, consulte os guias oficiais correspondentes:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#0070C0] hover:underline font-bold">Gerenciamento de Cookies no Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-sites" target="_blank" rel="noopener noreferrer" className="text-[#0070C0] hover:underline font-bold">Gerenciamento de Cookies no Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0070C0] hover:underline font-bold">Gerenciamento de Cookies no Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/pt-br/windows/excluir-e-gerenciar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#0070C0] hover:underline font-bold">Gerenciamento de Cookies no Microsoft Edge</a></li>
          </ul>

          <h2>6. Mais Informações e Suporte</h2>
          <p>
            Esperamos que esta política tenha esclarecido suas dúvidas sobre a utilização de cookies no portal <strong>MegaConectado</strong>. Se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
          </p>
          <p>
            Para quaisquer esclarecimentos adicionais, sinta-se à vontade para nos contatar através da nossa página de <Link to="/contato" className="text-[#0070C0] hover:underline font-bold">Contato</Link> ou enviando uma mensagem para <strong className="text-slate-800">contato@megaconectado.com.br</strong>. Para compreender como tratamos seus dados pessoais de modo amplo, consulte nossa <Link to="/pagina/privacidade" className="text-[#0070C0] hover:underline font-bold">Política de Privacidade</Link>.
          </p>
        </div>
      );
    }

    if (slug === 'termos') {
      return (
        <div className="prose prose-lg prose-slate max-w-none">
          <div className="bg-[#0070C0]/5 border-l-4 border-[#0070C0] p-6 rounded-r-xl mb-8">
            <p className="font-semibold text-slate-800 m-0 text-base">
              <strong>Definição Rápida (GEO Answer):</strong> Os Termos de Uso do <strong>MegaConectado</strong> constituem o acordo legal de caráter contratual estabelecido entre os visitantes do portal e a administração do site, regulando o acesso, os direitos sobre os conteúdos informativos publicados e as responsabilidades mútuas durante a navegação.
            </p>
          </div>

          <h2>1. Termos Gerais e Aceitação de Uso</h2>
          <p>
            Ao acessar e navegar pelo portal <strong>MegaConectado</strong> (disponível em <a href="https://megaconectado.com.br" className="text-[#0070C0] hover:underline font-bold">megaconectado.com.br</a>), você concorda de forma expressa em cumprir e estar vinculado a estes Termos e Condições de Uso, bem como a todas as leis e regulamentos aplicáveis ​​no território nacional brasileiro.
          </p>
          <p>
            Se você não concorda com qualquer uma das condições estabelecidas neste documento, está expressamente proibido de utilizar ou acessar este site e seus respectivos subdomínios, devendo interromper a navegação imediatamente.
          </p>

          <h2>2. Direitos de Propriedade Intelectual e Uso de Licença</h2>
          <p>
            Todo o conteúdo publicado no portal MegaConectado – incluindo artigos de análise, guias passo a passo, imagens geradas, logos, gráficos, códigos de programação de exemplo e banco de dados – é de propriedade exclusiva da nossa administração ou licenciado por terceiros autorizados, estando protegido pelas leis nacionais de direitos autorais (Lei de Direitos Autorais nº 9.610/98) e de propriedade industrial.
          </p>
          <p>
            Fica terminantemente proibido:
          </p>
          <ul>
            <li>Modificar, copiar, duplicar ou republicar nossos artigos na íntegra sem autorização prévia por escrito;</li>
            <li>Utilizar softwares automatizados de raspagem de dados (scrapers) ou bots para minerar textos ou coletar o conteúdo de pautas sem o devido consentimento;</li>
            <li>Alimentar modelos de linguagem de grande porte (LLMs) ou sistemas de inteligência artificial generativa com nossos textos autorais para fins comerciais, sem a devida citação primária e links retroativos de autoridade para a fonte original;</li>
            <li>Utilizar o conteúdo protegido para qualquer fim comercial direto ou exibição pública sem licenciamento explícito.</li>
          </ul>
          <p>
            A citação parcial e compartilhamento voluntário de trechos em redes sociais ou blogs de tecnologia são amplamente permitidos e incentivados, desde que acompanhados obrigatoriamente de créditos nítidos e de um hiperlink ativo que aponte para o endereço original do artigo no MegaConectado.
          </p>

          <h2>3. Isenção e Limitação de Responsabilidade Editorial</h2>
          <p>
            Os materiais contidos no MegaConectado são fornecidos exclusivamente para fins educacionais, de pesquisa tecnológica e informativos de caráter geral. Nosso compromisso é o de publicar análises imparciais e atualizadas. No entanto, o portal MegaConectado não oferece garantias implícitas ou explícitas sobre a precisão absoluta, aplicabilidade garantida ou ausência de erros em seus artigos de consultoria ou nos tutoriais práticos.
          </p>
          <p>
            Embora demonstremos como automatizar planilhas e conectar sistemas usando APIs (como em nossos tutoriais de <Link to="/categoria/automacao" className="text-[#0070C0] hover:underline font-bold">Make.com e Zapier</Link>), as ferramentas de terceiros sofrem alterações constantes. A aplicação prática de qualquer método sugerido é de inteira responsabilidade do usuário, que deve validar suas operações de forma independente e com backups ativos.
          </p>
          <p>
            Em circunstância alguma o MegaConectado ou seus editores serão responsáveis por quaisquer perdas de faturamento, interrupções de sistemas, falhas de banco de dados ou perdas de dados decorrentes da aplicação de orientações técnicas contidas nas nossas publicações.
          </p>

          <h2>4. Links Externos e Links de Afiliados</h2>
          <p>
            O portal pode conter links externos que direcionam para sites, serviços, fóruns ou documentações de terceiros. Nós não revisamos continuamente todos os links apontados de forma externa e não somos responsáveis pelos conteúdos, políticas de cookies ou práticas de segurança de tais destinos.
          </p>
          <p>
            Recomendamos que você leia sempre as políticas locais dos sites externos visitados. Além disso, reafirmamos nossa transparência ao leitor de que determinados links incluídos em nossas reviews técnicas são links de afiliação e podem gerar uma comissão ao portal MegaConectado caso o usuário decida assinar a referida ferramenta de automação ou SaaS B2B recomendada.
          </p>

          <h2>5. Modificações de Termos e Condições</h2>
          <p>
            O MegaConectado pode revisar ou alterar estes Termos de Uso a qualquer momento, sem aviso prévio. Ao continuar utilizando o portal após novas revisões entrarem em vigor, você concorda em cumprir e estar sujeito à versão atualizada destes termos contratuais.
          </p>

          <h2>6. Legislação Aplicável e Foro de Eleição</h2>
          <p>
            Estes Termos de Uso e o relacionamento geral entre o usuário e o portal são regidos pelas leis vigentes na República Federativa do Brasil, em especial o <strong>Marco Civil da Internet (Lei nº 12.965/14)</strong> e a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/18)</strong>. 
          </p>
          <p>
            Fica eleito o foro da comarca de domicílio do leitor ou o foro de administração do portal para dirimir quaisquer eventuais disputas ou controvérsias decorrentes destes termos de uso.
          </p>
          <p>
            Se restou qualquer dúvida jurídica ou se deseja reportar alguma infração de propriedade intelectual, por favor contate a nossa equipe em nossa página de <Link to="/contato" className="text-[#0070C0] hover:underline font-bold">Contato</Link> ou envie um e-mail para <strong className="text-slate-800">contato@megaconectado.com.br</strong>. Para compreender nossas práticas de cookies, leia também nossa <Link to="/pagina/politica-de-cookies" className="text-[#0070C0] hover:underline font-bold">Política de Cookies</Link>.
          </p>
        </div>
      );
    }

    if (slug === 'metodologia-editorial') {
      return (
        <div className="prose prose-lg prose-slate max-w-none">
          <h2>Como avaliamos produtos</h2>
          <p>
            Os reviews e comparativos do MegaConectado seguem critérios objetivos, como:
          </p>
          <ul>
            <li>desempenho;</li>
            <li>qualidade de construção;</li>
            <li>recursos disponíveis;</li>
            <li>facilidade de uso;</li>
            <li>custo-benefício;</li>
            <li>suporte e atualizações;</li>
            <li>reputação da marca;</li>
            <li>avaliações de usuários.</li>
          </ul>
          <p>
            Nosso objetivo é fornecer informações imparciais para auxiliar o leitor na escolha do produto mais adequado.
          </p>
        </div>
      );
    }

    return (
      <div className="prose prose-lg prose-slate max-w-none">
        <p>O conteúdo da página "{slug?.replace(/-/g, ' ')}" será exibido aqui. Esta é uma página institucional em construção.</p>
      </div>
    );
  };

  const pageTitle = slug ? slug.replace(/-/g, ' ') : 'Página';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SEO 
        title={`${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)} | Mega Conectado`}
      />
      <Link to="/" className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Home
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 flex flex-col gap-6">
           <article className="bg-white p-8 md:p-12 rounded-xl border border-slate-200">
             <div className="mb-6">
                <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight leading-tight mb-4 capitalize">
                  {slug?.replace(/-/g, ' ')}
                </h1>
             </div>
             
             {renderContent()}

             <FAQ items={getPageFAQ(slug)} />
           </article>
        </main>
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
