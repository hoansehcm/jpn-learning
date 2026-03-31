'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, BrainCircuit, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

interface SearchResult {
  id: string;
  type: 'vocabulary' | 'grammar' | 'kanji';
  title: string;
  subtitle?: string;
  level: string;
}

// Mock search results for demonstration
const mockSearchResults: SearchResult[] = [
  { id: 'v1', type: 'vocabulary', title: '食べる', subtitle: 'Ăn', level: 'N5' },
  { id: 'g1', type: 'grammar', title: '〜は〜です', subtitle: '... là ...', level: 'N5' },
  { id: 'k1', type: 'kanji', title: '水', subtitle: 'Nước', level: 'N5' },
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredResults = query.length > 1 
    ? mockSearchResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'grammar': return <BrainCircuit className="w-4 h-4 text-purple-600" />;
      case 'kanji': return <GraduationCap className="w-4 h-4 text-rose-600" />;
      default: return <Search className="w-4 h-4 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'bg-emerald-100';
      case 'grammar': return 'bg-purple-100';
      case 'kanji': return 'bg-rose-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors border border-slate-200"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm font-medium">Tìm kiếm...</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-300 text-[10px] font-mono font-bold text-slate-500">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              ref={containerRef}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="flex items-center px-4 py-4 border-b border-slate-100">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tìm từ vựng, ngữ pháp, kanji..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 placeholder:text-slate-400 font-sans"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 hide-scrollbar">
                {query.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    <p className="text-sm font-medium">Nhập từ khóa để tìm kiếm</p>
                    <p className="text-xs mt-1 opacity-70">Hỗ trợ tiếng Nhật, Romaji và tiếng Việt</p>
                  </div>
                ) : filteredResults.length > 0 ? (
                  <ul className="space-y-1">
                    {filteredResults.map((result) => (
                      <li key={result.id}>
                        <Link 
                          href={`/${result.type}/${result.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getBgColor(result.type)}`}>
                              {getIcon(result.type)}
                            </div>
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="font-bold text-slate-900 font-serif text-lg">{result.title}</span>
                                {result.subtitle && (
                                  <span className="text-sm text-slate-500 font-sans">{result.subtitle}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                            {result.level}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-12 text-center text-slate-500">
                    <p className="text-sm font-medium">Không tìm thấy kết quả cho &quot;{query}&quot;</p>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono">↑↓</kbd> Điều hướng</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono">↵</kbd> Chọn</span>
                </div>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono">ESC</kbd> Đóng</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
