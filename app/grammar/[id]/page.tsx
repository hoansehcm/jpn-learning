'use client';

import { useParams, useRouter } from 'next/navigation';
import { sampleGrammar } from '../../../lib/sampleData';
import { motion } from 'motion/react';
import { ArrowLeft, Bookmark, CheckCircle, BrainCircuit } from 'lucide-react';

export default function GrammarDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  const grammar = sampleGrammar.find(g => g.id === id);

  if (!grammar) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy ngữ pháp</h1>
        <button onClick={() => router.back()} className="text-purple-600 hover:underline">Quay lại</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-purple-600 transition-colors mb-8 font-medium"
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
          <div className="bg-purple-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">{grammar.level}</span>
              </div>
              <h1 className="text-5xl font-black mb-4">{grammar.pattern}</h1>
              <p className="text-3xl font-bold text-purple-100">{grammar.meaning}</p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors font-medium border-r border-slate-100">
              <Bookmark className="w-5 h-5" /> Lưu ngữ pháp
            </button>
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-medium border-r border-slate-100">
              <CheckCircle className="w-5 h-5" /> Đã học
            </button>
            <button className="flex-1 py-4 flex items-center justify-center gap-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors font-medium">
              <BrainCircuit className="w-5 h-5" /> Thêm vào Flashcard
            </button>
          </div>

          {/* Explanation */}
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Giải thích cách dùng</h2>
            <p className="text-lg text-slate-700 leading-relaxed">{grammar.explanation}</p>
          </div>

          {/* Examples */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Ví dụ minh họa</h2>
            
            <div className="space-y-6">
              {grammar.examples.map((ex, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-xl font-bold text-slate-900 leading-relaxed mb-3">{ex.ja}</p>
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
