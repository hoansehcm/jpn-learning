'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Bookmark, CheckCircle, BrainCircuit, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { sampleGrammar } from '../../lib/sampleData';
import { useAuth } from '../../contexts/AuthContext';

export default function GrammarList() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const levels = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];
  const grammarList = sampleGrammar.filter(g => {
    const matchesLevel = selectedLevel === 'All' || g.level === selectedLevel;
    const lower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      g.pattern.toLowerCase().includes(lower) || 
      g.meaning.toLowerCase().includes(lower) ||
      g.explanation.toLowerCase().includes(lower);
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Ngữ pháp tiếng Nhật</h1>
          <p className="text-slate-600">Học và ôn tập các cấu trúc ngữ pháp theo cấp độ JLPT.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm cấu trúc hoặc ý nghĩa..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  selectedLevel === level 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level === 'All' ? 'Tất cả' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Grammar List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grammarList.length > 0 ? (
            grammarList.map((grammar, index) => (
              <motion.div
                key={grammar.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-bold">{grammar.level}</span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-colors" title="Lưu ngữ pháp">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors" title="Đánh dấu đã học">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">{grammar.pattern}</h3>
                <p className="text-lg text-slate-700 font-medium mb-4 flex-1">{grammar.meaning}</p>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-sm text-slate-500 line-clamp-1">{grammar.explanation}</span>
                  <Link 
                    href={`/grammar/${grammar.id}`}
                    className="ml-4 p-2 bg-slate-100 text-slate-600 hover:bg-purple-600 hover:text-white rounded-xl transition-colors flex items-center justify-center flex-shrink-0"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg">Không tìm thấy ngữ pháp nào phù hợp.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
