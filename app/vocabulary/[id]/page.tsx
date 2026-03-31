'use client';

import { useParams, useRouter } from 'next/navigation';
import { sampleVocabulary } from '../../../lib/sampleData';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2, Bookmark, CheckCircle, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function VocabularyDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  const vocab = sampleVocabulary.find(v => v.id === id);

  if (!vocab) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy từ vựng</h1>
        <button onClick={() => router.back()} className="text-indigo-600 hover:underline">Quay lại</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">{vocab.level}</span>
                  <span className="text-indigo-100 font-medium">{vocab.type}</span>
                </div>
                <h1 className="text-6xl font-black mb-2">{vocab.word}</h1>
                <div className="text-2xl text-indigo-200 font-medium mb-4">【{vocab.kana}】 • {vocab.romaji}</div>
                <p className="text-3xl font-bold">{vocab.meaning}</p>
              </div>
              
              <button className="w-14 h-14 bg-white text-indigo-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                <Volume2 className="w-7 h-7" />
              </button>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors font-medium border-r border-slate-100">
              <Bookmark className="w-5 h-5" /> Lưu từ vựng
            </button>
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-medium border-r border-slate-100">
              <CheckCircle className="w-5 h-5" /> Đã học
            </button>
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors font-medium">
              <BrainCircuit className="w-5 h-5" /> Thêm vào Flashcard
            </button>
          </div>

          {/* Examples */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              Ví dụ minh họa
            </h2>
            
            <div className="space-y-6">
              {vocab.examples.map((ex, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <p className="text-xl font-bold text-slate-900 leading-relaxed">{ex.ja}</p>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors flex-shrink-0">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-lg text-slate-600">{ex.vi}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
