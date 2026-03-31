'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ChevronRight, Search, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { jlptLevels, sampleVocabulary } from '../../lib/sampleData';

export default function VocabularyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const levels = ['All', ...jlptLevels];

  const vocabList = sampleVocabulary.filter((item) => {
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      [item.word, item.kana, item.romaji, item.meaning, item.type].some((field) => field.toLowerCase().includes(query));

    return matchesLevel && matchesSearch;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="surface-panel rounded-[40px] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-soft">Vocabulary Library</p>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Từ vựng tiếng Nhật theo JLPT</h1>
              <p className="mt-4 max-w-2xl text-soft leading-7">
                Tra cứu bằng chữ Nhật, kana, romaji hoặc nghĩa tiếng Việt. Danh sách này được mở rộng để bạn có đủ chất liệu học thực sự.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {jlptLevels.map((level) => (
                <div key={level} className="rounded-[24px] bg-black/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.15em] text-soft">{level}</p>
                  <p className="mt-2 text-2xl font-bold">{sampleVocabulary.filter((item) => item.level === level).length}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card rounded-[32px] p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
              <input
                type="text"
                placeholder="Tìm taberu, 食べる, たべる hoặc nghĩa tiếng Việt"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-[22px] border border-[var(--border-color)] bg-[#fffaf2] pl-12 pr-4 py-3.5 outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-full px-4 py-2.5 whitespace-nowrap text-sm font-medium ${
                    selectedLevel === level ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'bg-black/5 text-soft'
                  }`}
                >
                  {level === 'All' ? 'Tất cả' : level}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          {vocabList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="surface-card rounded-[30px] p-5 sm:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="rounded-full bg-[#f6efe6] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">{item.level}</span>
                    <span className="text-sm text-soft">{item.type}</span>
                  </div>
                  <div className="mt-4 flex items-end gap-4 flex-wrap">
                    <h2 className="text-4xl font-bold">{item.word}</h2>
                    <p className="text-lg text-soft">{item.kana}</p>
                    <p className="text-sm font-mono text-soft">{item.romaji}</p>
                  </div>
                  <p className="mt-3 text-lg">{item.meaning}</p>
                  <p className="mt-4 text-soft">{item.examples[0].ja}</p>
                  <p className="text-sm text-soft mt-1">{item.examples[0].vi}</p>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center">
                  <button className="surface-card rounded-full p-3 text-soft hover:text-[var(--accent-strong)]" title="Nghe phát âm">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <Link
                    href={`/vocabulary/${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-3 text-white"
                  >
                    Chi tiết
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {vocabList.length === 0 && (
            <div className="surface-card rounded-[30px] p-10 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-soft" />
              <p className="mt-4 text-lg font-semibold">Không tìm thấy mục từ phù hợp</p>
              <p className="mt-2 text-soft">Thử bỏ bớt điều kiện lọc hoặc tìm theo kana/romaji.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
