import React, { useEffect, useState } from 'react';

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');

  const headings = [
    { id: 'introducao', title: 'Introdução ao Tema' },
    { id: 'impacto-mercado', title: 'Impacto no Mercado Atual' },
    { id: 'principais-desafios', title: 'Principais Desafios e Oportunidades' },
    { id: 'futuro', title: 'O que Esperar do Futuro' },
    { id: 'conclusao', title: 'Conclusão' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
      <h3 className="font-heading font-bold text-lg mb-4 text-brand-primary">Índice do Conteúdo</h3>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`text-sm block transition-colors ${
                activeId === heading.id
                  ? 'text-brand-secondary font-bold'
                  : 'text-slate-600 hover:text-brand-secondary'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
