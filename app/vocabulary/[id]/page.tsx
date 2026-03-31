'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, BrainCircuit, Volume2 } from 'lucide-react';
import { sampleVocabulary } from '../../../lib/sampleData';

export default function VocabularyDetail() {
  const { id } = useParams();
  const router = useRouter();
  const vocab = sampleVocabulary.find((item) => item.id === id);

  if (!vocab) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-2xl font-semibold">Không tìm thấy từ vựng</p>
        <button onClick={() => router.back()} className="mt-4 text-[var(--accent-strong)]">
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
          <div className="p-8 sm:p-10 bg-[linear-gradient(135deg,#be5b35,#7f3f2a)] text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">{vocab.level}</span>
                  <span className="text-white/80">{vocab.type}</span>
                </div>
                <h1 className="mt-6 text-5xl sm:text-6xl font-bold">{vocab.word}</h1>
                <p className="mt-3 text-2xl text-white/75">{vocab.kana} • {vocab.romaji}</p>
                <p className="mt-5 text-3xl font-semibold">{vocab.meaning}</p>
              </div>
              <button className="rounded-full bg-white text-[var(--accent-strong)] p-4 shadow-lg">
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-2xl bg-[#f6efe6] flex items-center justify-center text-[var(--accent-strong)]">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Ví dụ minh họa</p>
                <p className="text-sm text-soft">Học theo ngữ cảnh sẽ nhớ từ tốt hơn.</p>
              </div>
            </div>

            <div className="space-y-4">
              {vocab.examples.map((example, index) => (
                <div key={index} className="rounded-[28px] bg-black/5 p-5">
                  <p className="text-xl font-semibold">{example.ja}</p>
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
