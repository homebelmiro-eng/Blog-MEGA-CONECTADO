import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { getDb, handleFirestoreError, OperationType } from '../lib/firebase';
import { GlossaryTerm } from '../types';
import { generateSlug } from '../lib/utils';

export const DEFAULT_GLOSSARY_TERMS = [
  {
    term: 'Inteligência Artificial',
    definition: 'Campo da ciência da computação dedicado a criar sistemas capazes de realizar tarefas que normalmente exigiriam inteligência humana, como aprendizado, raciocínio e resolução de problemas.',
    category: 'IA Básica'
  },
  {
    term: 'Aprendizado de Máquina',
    definition: 'Subcampo da inteligência artificial focado no desenvolvimento de algoritmos que permitem aos computadores aprender com dados e fazer previsões ou decisões sem serem explicitamente programados.',
    category: 'Machine Learning'
  },
  {
    term: 'Redes Neurais Artificiais',
    definition: 'Modelos computacionais inspirados na estrutura e funcionamento do cérebro humano, compostos por neurônios interconectados que processam informações em camadas para identificar padrões complexos.',
    category: 'Arquitetura'
  },
  {
    term: 'Processamento de Linguagem Natural',
    definition: 'Ramo da IA focado na habilidade de computadores de entender, interpretar, gerar e responder à linguagem humana de maneira valiosa e contextualizada.',
    category: 'Aplicações'
  },
  {
    term: 'Deep Learning',
    definition: 'Uma classe de aprendizado de máquina que utiliza redes neurais com muitas camadas (daí o "profundo") para modelar e solucionar problemas complexos, como visão computacional e reconhecimento de fala.',
    category: 'Machine Learning'
  },
  {
    term: 'LLM',
    definition: 'Large Language Model (Modelo de Linguagem de Grande Escala) é um modelo de rede neural profunda treinado em vastas quantidades de texto para compreender, resumir, traduzir e gerar linguagem natural.',
    category: 'Aplicações'
  },
  {
    term: 'Algoritmo',
    definition: 'Uma sequência finita de instruções lógicas, matemáticas e bem definidas para solucionar um problema ou executar uma tarefa específica.',
    category: 'Fundamentos'
  },
  {
    term: 'Visão Computacional',
    definition: 'Área da IA que capacita computadores e sistemas a interpretar e compreender informações visuais e detalhadas obtidas de imagens digitais, vídeos e sensores do mundo real.',
    category: 'Aplicações'
  },
  {
    term: 'SEO',
    definition: 'Search Engine Optimization (Otimização para Motores de Busca) é um conjunto de estratégias e técnicas de otimização aplicadas a páginas de sites para melhorar seu posicionamento orgânico nos resultados de busca.',
    category: 'Marketing Digital'
  },
  {
    term: 'Computação em Nuvem',
    definition: 'Entrega de recursos de computação sob demanda pela internet, incluindo servidores virtuais, servidores físicos, armazenamento de dados, bancos de dados, redes e softwares específicos.',
    category: 'Infraestrutura'
  }
];

/**
 * Automatically injects glossary links inside a markdown string without corrupting 
 * markdown elements (code blocks, inline code, existing links, images, or html tags).
 */
export function injectGlossaryLinks(markdown: string, terms: GlossaryTerm[]): string {
  if (!markdown || !terms || terms.length === 0) return markdown;

  // Sort terms by length in descending order to match longer terms first 
  // (e.g. "Inteligência Artificial" before "IA")
  const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);

  // Regex to match markdown links/images, inline code, code blocks, or HTML tags so we can preserve them
  const preserveRegex = /(```[\s\S]*?```|`[^`\n]+`|!?\[[^\]]*\]\([^)]*\)|<[^>]+>)/gi;

  // Split content by the preserved parts
  const parts = markdown.split(preserveRegex);

  const placeholders: string[] = [];

  const processedParts = parts.map((part, index) => {
    // If index is odd, it matched the preserveRegex, so keep it completely untouched
    if (index % 2 !== 0) {
      return part;
    }

    let result = part;
    // Word character regex supporting Portuguese accentuation
    const wordChar = '[a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]';

    for (const termObj of sortedTerms) {
      const escapedTerm = termObj.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Case-insensitive match with accents word boundary support
      const regex = new RegExp(`(?<!${wordChar})${escapedTerm}(?!${wordChar})`, 'gi');

      result = result.replace(regex, (match) => {
        const placeholder = `___GLOSSARY_PLACEHOLDER_${placeholders.length}___`;
        placeholders.push(`[${match}](/glossario#${termObj.slug})`);
        return placeholder;
      });
    }
    return result;
  });

  let finalMarkdown = processedParts.join('');

  // Replace placeholders back in original slots
  for (let i = 0; i < placeholders.length; i++) {
    finalMarkdown = finalMarkdown.replace(`___GLOSSARY_PLACEHOLDER_${i}___`, placeholders[i]);
  }

  return finalMarkdown;
}

/**
 * Fetches all glossary terms from Firestore
 */
export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  const db = getDb();
  const q = query(collection(db, 'glossary'), orderBy('term', 'asc'));
  
  try {
    const querySnapshot = await getDocs(q);
    const terms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GlossaryTerm[];

    return terms;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'glossary');
    return [];
  }
}

/**
 * Seeds the default glossary terms if the collection is currently empty
 */
export async function seedDefaultGlossaryTerms(): Promise<void> {
  const db = getDb();
  try {
    const existingTerms = await getDocs(collection(db, 'glossary'));
    if (existingTerms.empty) {
      console.log('Seeding default glossary terms...');
      for (const item of DEFAULT_GLOSSARY_TERMS) {
        const slug = generateSlug(item.term);
        const docId = slug;
        await setDoc(doc(db, 'glossary', docId), {
          term: item.term,
          definition: item.definition,
          slug: slug,
          category: item.category,
          createdAt: serverTimestamp()
        }).catch((error) => {
          handleFirestoreError(error, OperationType.CREATE, `glossary/${docId}`);
        });
      }
      console.log('Glossary seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding glossary:', error);
  }
}
