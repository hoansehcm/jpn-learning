'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { sampleKanji } from '../../../lib/sampleData';

export default function KanjiDetail() {
  const { id } = useParams();
  const router = useRouter();
  const kanji = sampleKanji.find((item) => item.id === id);

  if (!kanji) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-2xl font-semibold">Không tìm thấy kanji</p>
        <button onClick={() => router.back()} className="mt-4 text-emerald-700">
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-soft hover:text-[var(--text-color)]">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </button>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface-panel rounded-[40px] overflow-hidden">
          <div className="p-8 sm:p-10 bg-[linear-gradient(135deg,#0f9f6e,#065f46)] text-white">
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
              <div className="rounded-[36px] bg-white text-emerald-700 h-[220px] flex items-center justify-center font-serif text-[120px] shadow-xl">
                {kanji.kanji}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">{kanji.level}</span>
                  <span className="text-white/80">{kanji.strokeCount} nét</span>
                </div>
                <h1 className="mt-5 text-4xl font-bold">{kanji.meaning}</h1>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <div className="rounded-[24px] bg-white/10 p-4">
                    <p className="text-sm text-white/70">Âm On</p>
                    <p className="mt-2 text-xl font-semibold">{kanji.onyomi || '—'}</p>
                  </div>
                  <div className="rounded-[24px] bg-white/10 p-4">
                    <p className="text-sm text-white/70">Âm Kun</p>
                    <p className="mt-2 text-xl font-semibold">{kanji.kunyomi || '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="font-semibold">Từ vựng chứa chữ này</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {kanji.examples.map((example, index) => (
                <div key={index} className="rounded-[28px] bg-black/5 p-5">
                  <p className="text-2xl font-semibold">{example.ja}</p>
                  <p className="text-soft mt-3">{example.vi}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
