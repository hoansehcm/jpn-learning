'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Bookmark, CheckCircle, Volume2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { sampleVocabulary } from '../../lib/sampleData';
import { useAuth } from '../../contexts/AuthContext';

export default function VocabularyList() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const levels = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];
  const vocabList = sampleVocabulary.filter(v => {
    const matchesLevel = selectedLevel === 'All' || v.level === selectedLevel;
    const lower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      v.word.toLowerCase().includes(lower) || 
      v.kana.toLowerCase().includes(lower) || 
      v.meaning.toLowerCase().includes(lower) ||
      v.romaji.toLowerCase().includes(lower);
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Từ vựng tiếng Nhật</h1>
          <p className="text-slate-600">Học và ôn tập từ vựng theo cấp độ JLPT.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm bằng tiếng Nhật, Romaji hoặc nghĩa..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  selectedLevel === level 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level === 'All' ? 'Tất cả' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Vocabulary List */}
        <div className="space-y-4">
          {vocabList.length > 0 ? (
            vocabList.map((vocab, index) => (
              <motion.div
                key={vocab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold">{vocab.level}</span>
                    <span className="text-sm text-slate-500">{vocab.type}</span>
                  </div>
                  <div className="flex items-end gap-3 mb-2">
                    <h3 className="text-3xl font-black text-slate-900">{vocab.word}</h3>
                    <span className="text-lg text-slate-500 font-medium mb-1">【{vocab.kana}】</span>
                  </div>
                  <p className="text-lg text-slate-700 font-medium">{vocab.meaning}</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" title="Nghe phát âm">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-colors" title="Lưu từ vựng">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors" title="Đánh dấu đã học">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <Link 
                    href={`/vocabulary/${vocab.id}`}
                    className="ml-2 p-2 bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-colors flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg">Không tìm thấy từ vựng nào phù hợp.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
