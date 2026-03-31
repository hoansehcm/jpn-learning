'use client';

import { useParams, useRouter } from 'next/navigation';
import { sampleKanji } from '../../../lib/sampleData';
import { motion } from 'motion/react';
import { ArrowLeft, Bookmark, CheckCircle, BrainCircuit } from 'lucide-react';

export default function KanjiDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  const kanji = sampleKanji.find(k => k.id === id);

  if (!kanji) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy Kanji</h1>
        <button onClick={() => router.back()} className="text-emerald-600 hover:underline">Quay lại</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8 font-medium"
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
          <div className="bg-emerald-600 p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="w-48 h-48 bg-white text-emerald-600 rounded-3xl flex items-center justify-center text-8xl font-black font-serif shadow-xl relative z-10">
              {kanji.kanji}
            </div>

            <div className="relative z-10 flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">{kanji.level}</span>
                <span className="text-emerald-100 font-medium">{kanji.strokeCount} nét</span>
              </div>
              <h1 className="text-4xl font-black mb-6">{kanji.meaning}</h1>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-700/50 p-4 rounded-xl backdrop-blur-sm">
                  <p className="text-emerald-200 text-sm font-medium mb-1">Âm On</p>
                  <p className="text-xl font-bold">{kanji.onyomi}</p>
                </div>
                <div className="bg-emerald-700/50 p-4 rounded-xl backdrop-blur-sm">
                  <p className="text-emerald-200 text-sm font-medium mb-1">Âm Kun</p>
                  <p className="text-xl font-bold">{kanji.kunyomi}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors font-medium border-r border-slate-100">
              <Bookmark className="w-5 h-5" /> Lưu Kanji
            </button>
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-medium border-r border-slate-100">
              <CheckCircle className="w-5 h-5" /> Đã học
            </button>
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">
              <BrainCircuit className="w-5 h-5" /> Thêm vào Flashcard
            </button>
          </div>

          {/* Examples */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Từ vựng chứa Kanji này</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kanji.examples.map((ex, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
                  <p className="text-2xl font-black text-slate-900 mb-2">{ex.ja}</p>
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
