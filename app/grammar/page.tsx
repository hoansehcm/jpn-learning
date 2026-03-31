'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { jlptLevels, sampleGrammar } from '../../lib/sampleData';

export default function GrammarList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const levels = ['All', ...jlptLevels];

  const grammarList = sampleGrammar.filter((item) => {
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      [item.pattern, item.meaning, item.explanation].some((field) => field.toLowerCase().includes(query));

    return matchesLevel && matchesSearch;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="surface-panel rounded-[40px] p-6 sm:p-8 lg:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-soft">Grammar Atlas</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Ngữ pháp được gom theo độ khó và ngữ cảnh</h1>
          <p className="mt-4 max-w-3xl text-soft leading-7">
            Không chỉ liệt kê công thức. Mỗi mẫu đều có nghĩa ngắn gọn, giải thích cách dùng và ví dụ dễ đưa vào luyện đọc hoặc hội thoại.
          </p>
        </section>

        <section className="surface-card rounded-[32px] p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
              <input
                type="text"
                placeholder="Tìm 〜ようにする, đối với, càng... càng..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-[22px] border border-[var(--border-color)] bg-[#fffaf2] pl-12 pr-4 py-3.5 outline-none focus:border-violet-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`rounded-full px-4 py-2.5 whitespace-nowrap text-sm font-medium ${
                    selectedLevel === level ? 'bg-violet-600 text-white' : 'bg-black/5 text-soft'
                  }`}
                >
                  {level === 'All' ? 'Tất cả' : level}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-5">
          {grammarList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="surface-card rounded-[30px] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">{item.level}</span>
                <BrainCircuit className="w-5 h-5 text-violet-500" />
              </div>
              <h2 className="mt-5 text-3xl font-bold">{item.pattern}</h2>
              <p className="mt-3 text-lg">{item.meaning}</p>
              <p className="mt-4 text-soft leading-7 flex-1">{item.explanation}</p>
              <div className="mt-5 rounded-[22px] bg-black/5 p-4">
                <p className="font-medium">{item.examples[0].ja}</p>
                <p className="text-sm text-soft mt-2">{item.examples[0].vi}</p>
              </div>
              <Link href={`/grammar/${item.id}`} className="mt-5 inline-flex items-center gap-2 text-violet-700 font-semibold">
                Xem bài đầy đủ
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}

          {grammarList.length === 0 && (
            <div className="md:col-span-2 surface-card rounded-[30px] p-10 text-center">
              <p className="text-lg font-semibold">Không tìm thấy mẫu ngữ pháp phù hợp</p>
              <p className="text-soft mt-2">Hãy thử tìm theo ý nghĩa tiếng Việt hoặc ký hiệu ngữ pháp.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
