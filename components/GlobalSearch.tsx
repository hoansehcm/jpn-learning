'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, BrainCircuit, GraduationCap, Search, X } from 'lucide-react';
import Link from 'next/link';
import { globalSearchResults } from '../lib/sampleData';

interface SearchResult {
  id: string;
  type: 'vocabulary' | 'grammar' | 'kanji';
  title: string;
  subtitle: string;
  level: string;
  keywords: string;
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const results: SearchResult[] =
    query.trim().length > 0
      ? globalSearchResults
          .filter((item) => item.keywords.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 8)
      : [];

  const icons = {
    vocabulary: <BookOpen className="w-4 h-4 text-emerald-700" />,
    grammar: <BrainCircuit className="w-4 h-4 text-violet-700" />,
    kanji: <GraduationCap className="w-4 h-4 text-amber-700" />,
  };

  const badgeStyles = {
    vocabulary: 'bg-emerald-100/80',
    grammar: 'bg-violet-100/80',
    kanji: 'bg-amber-100/80',
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-black/5 px-3.5 py-2 text-sm text-soft hover:text-[var(--text-color)]"
      >
        <Search className="w-4 h-4" />
        Tìm nhanh
        <kbd className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-mono">Ctrl K</kbd>
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden surface-card rounded-full p-2.5 text-soft"
        aria-label="Mở tìm kiếm"
      >
        <Search className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm px-4 pt-20 sm:pt-28">
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              className="surface-panel max-w-3xl mx-auto rounded-[32px] overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)]">
                <Search className="w-5 h-5 text-soft" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm theo Nhật ngữ, romaji hoặc nghĩa tiếng Việt"
                  className="flex-1 bg-transparent outline-none text-base text-[var(--text-color)] placeholder:text-soft"
                />
                <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-black/5">
                  <X className="w-4 h-4 text-soft" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-3">
                {query.trim().length === 0 && (
                  <div className="px-4 py-12 text-center">
                    <p className="font-serif text-2xl">Tra cứu mọi thứ trong một chỗ</p>
                    <p className="text-soft mt-2">Gõ ví dụ như `taberu`, `〜ようにする`, `責任` hoặc `kinh nghiệm`.</p>
                  </div>
                )}

                {query.trim().length > 0 && results.length === 0 && (
                  <div className="px-4 py-12 text-center">
                    <p className="text-lg font-semibold">Chưa có kết quả phù hợp</p>
                    <p className="text-soft mt-2">Thử bằng chữ Nhật, kana, romaji hoặc nghĩa tiếng Việt.</p>
                  </div>
                )}

                {results.length > 0 && (
                  <ul className="space-y-2">
                    {results.map((result) => (
                      <li key={`${result.type}-${result.id}`}>
                        <Link
                          href={`/${result.type}/${result.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between rounded-[24px] px-4 py-3 hover:bg-black/5"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${badgeStyles[result.type]}`}>
                              {icons[result.type]}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold truncate">{result.title}</p>
                              <p className="text-sm text-soft truncate">{result.subtitle}</p>
                            </div>
                          </div>
                          <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-mono">{result.level}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
