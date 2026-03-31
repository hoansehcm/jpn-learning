'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, GraduationCap, Search } from 'lucide-react';
import Link from 'next/link';
import { jlptLevels, sampleKanji } from '../../lib/sampleData';

export default function KanjiList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const levels = ['All', ...jlptLevels];

  const kanjiList = sampleKanji.filter((item) => {
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      [item.kanji, item.meaning, item.onyomi, item.kunyomi].some((field) => field.toLowerCase().includes(query));

    return matchesLevel && matchesSearch;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="surface-panel rounded-[40px] p-6 sm:p-8 lg:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-soft">Kanji Shelf</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Kanji theo cấp độ, có ví dụ để nhớ lâu hơn</h1>
          <p className="mt-4 max-w-3xl text-soft leading-7">
            Mỗi chữ gồm âm On, âm Kun, số nét và từ vựng tiêu biểu, giúp bạn nhìn chữ theo cụm ứng dụng chứ không học rời rạc.
          </p>
        </section>

        <section className="surface-card rounded-[32px] p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
              <input
                type="text"
                placeholder="Tìm 学, けん, trách nhiệm hoặc かいぜん"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-[22px] border border-[var(--border-color)] bg-[#fffaf2] pl-12 pr-4 py-3.5 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-full px-4 py-2.5 whitespace-nowrap text-sm font-medium ${
                    selectedLevel === level ? 'bg-emerald-600 text-white' : 'bg-black/5 text-soft'
                  }`}
                >
                  {level === 'All' ? 'Tất cả' : level}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {kanjiList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="surface-card rounded-[32px] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{item.level}</span>
                <span className="text-xs text-soft">{item.strokeCount} nét</span>
              </div>
              <div className="mt-6 rounded-[28px] bg-[#f7fbf8] py-8 text-center">
                <p className="font-serif text-7xl leading-none">{item.kanji}</p>
              </div>
              <p className="mt-5 text-xl font-semibold">{item.meaning}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-soft">On</span>
                  <span className="font-medium text-right">{item.onyomi || '—'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-soft">Kun</span>
                  <span className="font-medium text-right">{item.kunyomi || '—'}</span>
                </div>
              </div>
              <div className="mt-5 rounded-[22px] bg-black/5 p-4">
                <p className="font-medium">{item.examples[0].ja}</p>
                <p className="text-sm text-soft mt-2">{item.examples[0].vi}</p>
              </div>
              <Link href={`/kanji/${item.id}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-700">
                Xem chi tiết
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}

          {kanjiList.length === 0 && (
            <div className="sm:col-span-2 xl:col-span-4 surface-card rounded-[30px] p-10 text-center">
              <GraduationCap className="w-8 h-8 mx-auto text-soft" />
              <p className="mt-4 text-lg font-semibold">Không tìm thấy kanji phù hợp</p>
              <p className="text-soft mt-2">Hãy thử tìm theo nghĩa hoặc âm đọc.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
