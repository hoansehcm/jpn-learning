'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, GraduationCap, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { jlptLevels } from '../../lib/sampleData';

export default function KanjiList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [kanjis, setKanjis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(40);
  
  const levels = ['All', ...jlptLevels];

  useEffect(() => {
    fetch('/data/kanji_data.json')
      .then(res => res.json())
      .then(data => {
        setKanjis(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi tải dữ liệu Kanji:', err);
        setLoading(false);
      });
  }, []);

  const kanjiList = kanjis.filter((item) => {
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      [item.kanji, item.meaning, item.onyomi, item.kunyomi].some((field) => field && field.toLowerCase().includes(query));

    return matchesLevel && matchesSearch;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16 min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="bg-card text-card-foreground border border-border rounded-[40px] p-6 sm:p-8 lg:p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Kanji Reference</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold">Thư viện 5000+ Kanji</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground leading-7">
            Tra cứu toàn bộ Kanji từ N5 tới N1. Cung cấp chi tiết âm On, âm Kun, số nét và ví dụ trực quan.
            Mã nguồn đã được tích hợp lượng lớn dữ liệu để bạn tự do tra cứu.
          </p>
        </section>

        <section className="bg-card border border-border shadow-sm rounded-[32px] p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm từ khóa: 学, gaku, học, hoặc 日"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-[22px] border border-border bg-background pl-12 pr-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => {
                     setSelectedLevel(level);
                     setVisibleCount(40);
                  }}
                  className={`rounded-full px-5 py-2.5 whitespace-nowrap text-sm font-medium transition-colors ${
                    selectedLevel === level
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {level === 'All' ? 'Tất cả' : level}
                </button>
              ))}
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center items-center py-20 flex-col gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-muted-foreground font-medium">Đang tải dữ liệu 5000+ Kanji...</p>
          </div>
        ) : (
          <>
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {kanjiList.slice(0, visibleCount).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 40) * 0.02 }}
                  className="bg-card text-card-foreground border border-border shadow-sm hover:shadow-md transition-shadow rounded-[32px] p-5 flex flex-col"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {item.level}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.strokeCount} nét</span>
                  </div>
                  
                  <div className="mt-6 rounded-[28px] bg-secondary/50 py-8 text-center border border-border/50">
                    <p className="font-serif text-7xl leading-none text-foreground">{item.kanji}</p>
                  </div>
                  
                  <p className="mt-5 text-xl font-bold flex-grow text-foreground">{item.meaning}</p>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">On</span>
                      <span className="font-medium text-right text-foreground">{item.onyomi || '—'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-muted-foreground">Kun</span>
                      <span className="font-medium text-right text-foreground">{item.kunyomi || '—'}</span>
                    </div>
                  </div>
                  
                  {item.examples && item.examples.length > 0 && (
                    <div className="mt-5 rounded-[22px] bg-secondary p-4">
                      <p className="font-medium text-foreground">{item.examples[0].ja}</p>
                      <p className="text-sm text-muted-foreground mt-2">{item.examples[0].vi}</p>
                    </div>
                  )}
                  
                  <Link href={`/kanji/${item.id}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 transition-colors">
                    Xem chi tiết
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}

              {kanjiList.length === 0 && (
                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 bg-card border border-border rounded-[30px] p-10 text-center">
                  <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-xl font-semibold text-foreground">Không tìm thấy Kanji phù hợp</p>
                  <p className="text-muted-foreground mt-2">Vui lòng thử từ khóa khác.</p>
                </div>
              )}
            </section>
            
            {visibleCount < kanjiList.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount(v => v + 40)}
                  className="bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-md active:scale-95"
                >
                  Tải thêm ({visibleCount} / {kanjiList.length})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
