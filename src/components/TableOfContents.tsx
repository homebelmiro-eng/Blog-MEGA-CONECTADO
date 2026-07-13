import React, { useEffect, useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface Heading {
  id: string;
  title: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(true);

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
    <nav className="bg-slate-50 p-6 md:p-8 rounded-2xl border-2 border-slate-200 mb-12 shadow-md hover:shadow-lg transition-all duration-300">
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between text-brand-primary group focus:outline-none bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-brand-secondary/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="bg-brand-secondary/10 p-2 rounded-lg group-hover:bg-brand-secondary/20 transition-colors">
            <List className="w-5 h-5 text-brand-secondary" />
          </div>
          <h3 className="font-heading font-bold text-xl group-hover:text-brand-secondary transition-colors">Índice do Artigo</h3>
        </div>
        <div className="bg-slate-100 p-2 rounded-full group-hover:bg-brand-secondary/10 transition-colors">
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-brand-secondary transition-colors" />
          ) : (
            <ChevronUp className="w-5 h-5 text-slate-500 group-hover:text-brand-secondary transition-colors" />
          )}
        </div>
      </button>
      
      {!isCollapsed && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
          {headings.map((heading) => (
            <li 
              key={heading.id}
              className={`${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <a
                href={`#${heading.id}`}
                className={`text-sm block transition-all duration-200 py-2 px-3 rounded-lg border ${
                  activeId === heading.id
                    ? 'text-brand-secondary font-bold translate-x-1 bg-brand-secondary/10 border-brand-secondary/20 shadow-sm'
                    : 'text-slate-600 hover:text-brand-primary hover:translate-x-1 hover:bg-white border-transparent hover:border-slate-200 hover:shadow-sm'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                <div className="flex items-center gap-2">
                  {activeId === heading.id && <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary shrink-0 shadow-sm"></span>}
                  {heading.title}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
