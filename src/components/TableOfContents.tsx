import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  title: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Scan for H2 and H3 headings in the article body
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;

    const headingElements = Array.from(articleBody.querySelectorAll('h2, h3'));
    const items = headingElements.map((el, index) => {
      // Ensure element has an ID
      if (!el.id) {
        el.id = `heading-${index}`;
      }
      return {
        id: el.id,
        title: el.textContent || '',
        level: parseInt(el.tagName.substring(1))
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px' }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 mb-12 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-brand-primary">
        <List className="w-5 h-5" />
        <h3 className="font-heading font-bold text-xl">Neste Artigo</h3>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {headings.map((heading) => (
          <li 
            key={heading.id}
            className={`${heading.level === 3 ? 'ml-4' : ''}`}
          >
            <a
              href={`#${heading.id}`}
              className={`text-sm block transition-all duration-200 py-1 ${
                activeId === heading.id
                  ? 'text-brand-secondary font-bold translate-x-1'
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
