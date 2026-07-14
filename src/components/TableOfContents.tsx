import React, { useEffect, useState } from 'react';
import { List, ChevronDown, ChevronUp, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content?: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024; // Collapse on mobile/tablet, expand on large screens by default
    }
    return true;
  });

  useEffect(() => {
    // Scan for H2 and H3 headings strictly in the article prose content
    const proseContainer = document.querySelector('.article-body .prose');
    if (!proseContainer) return;

    // We scan for h2 and h3 elements inside the prose body
    const headingElements = Array.from(proseContainer.querySelectorAll('h2, h3'));
    
    const items = headingElements.map((el, index) => {
      // If the heading doesn't have an ID, we assign one based on its slugified text
      if (!el.id) {
        const text = el.textContent || '';
        const slug = text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // remove accents
          .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // replace spaces with hyphens
          .replace(/-+/g, '-'); // collapse dashes
        el.id = slug || `section-${index}`;
      }
      
      return {
        id: el.id,
        title: el.textContent || '',
        level: parseInt(el.tagName.substring(1))
      };
    });

    setHeadings(items);

    // Track active heading using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is currently intersecting the active viewport area
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by bounding client rect top to get the topmost visible heading
          const topmost = visibleEntries.reduce((prev, curr) => 
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveId(topmost.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px', // Focus window offset for sticky navbar
        threshold: [0, 1.0]
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]); // Re-run when article content changes

  if (headings.length === 0) return null;

  return (
    <nav className="bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-5 md:p-6 mb-10 transition-all duration-300 shadow-sm">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between text-brand-primary group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/30 rounded-xl cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="bg-brand-secondary/10 p-2 rounded-xl group-hover:bg-brand-secondary/20 transition-colors">
            <List className="w-4 h-4 text-brand-secondary" />
          </div>
          <span className="font-heading font-extrabold text-lg text-brand-primary tracking-tight group-hover:text-brand-secondary transition-colors">
            Índice do Conteúdo
          </span>
        </div>
        <div className="bg-white hover:bg-slate-100 p-1.5 rounded-full border border-slate-200/60 shadow-sm transition-colors">
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="space-y-1.5 mt-5 pt-4 border-t border-slate-200/60">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                const isH3 = heading.level === 3;

                return (
                  <li
                    key={heading.id}
                    style={{ paddingLeft: isH3 ? '1.25rem' : '0' }}
                    className="relative animate-in fade-in slide-in-from-top-1 duration-200"
                  >
                    <a
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(heading.id);
                        if (element) {
                          const offset = 90; // offset for sticky navbar
                          const bodyRect = document.body.getBoundingClientRect().top;
                          const elementRect = element.getBoundingClientRect().top;
                          const elementPosition = elementRect - bodyRect;
                          const offsetPosition = elementPosition - offset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                          setActiveId(heading.id);
                        }
                      }}
                      className={`group flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm transition-all duration-200 ${
                        isActive
                          ? 'text-brand-secondary font-bold bg-brand-secondary/5 border-l-2 border-brand-secondary pl-2.5'
                          : 'text-slate-600 hover:text-brand-primary hover:bg-slate-100/80 pl-3'
                      }`}
                    >
                      {isH3 ? (
                        <span className={`text-[10px] uppercase font-mono tracking-widest shrink-0 transition-colors ${
                          isActive ? 'text-brand-secondary/80' : 'text-slate-400 group-hover:text-slate-600'
                        }`}>
                          •
                        </span>
                      ) : (
                        <Hash className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? 'text-brand-secondary' : 'text-slate-400 group-hover:text-slate-600'
                        }`} />
                      )}
                      <span className="truncate leading-relaxed">{heading.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
