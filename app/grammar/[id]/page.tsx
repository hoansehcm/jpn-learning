'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { sampleGrammar } from '../../../lib/sampleData';

export default function GrammarDetail() {
  const { id } = useParams();
  const router = useRouter();
  const grammar = sampleGrammar.find((item) => item.id === id);

  if (!grammar) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-2xl font-semibold">Không tìm thấy ngữ pháp</p>
        <button onClick={() => router.back()} className="mt-4 text-violet-700">
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
          <div className="p-8 sm:p-10 bg-[linear-gradient(135deg,#7c3aed,#4c1d95)] text-white">
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">{grammar.level}</span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-bold">{grammar.pattern}</h1>
            <p className="mt-4 text-2xl text-white/80">{grammar.meaning}</p>
          </div>

          <div className="p-8 sm:p-10">
            <div className="rounded-[28px] bg-black/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-700">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <p className="font-semibold">Giải thích cách dùng</p>
              </div>
              <p className="leading-8 text-soft">{grammar.explanation}</p>
            </div>

            <div className="mt-6 space-y-4">
              {grammar.examples.map((example, index) => (
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
