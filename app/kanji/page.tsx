'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Bookmark, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { sampleKanji } from '../../lib/sampleData';
import { useAuth } from '../../contexts/AuthContext';

export default function KanjiList() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [kanjiList, setKanjiList] = useState(sampleKanji);

  const levels = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];

  useEffect(() => {
    let filtered = sampleKanji;
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(k => k.level === selectedLevel);
    }
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(k => 
        k.kanji.toLowerCase().includes(lower) || 
        k.meaning.toLowerCase().includes(lower) ||
        k.onyomi.toLowerCase().includes(lower) ||
        k.kunyomi.toLowerCase().includes(lower)
      );
    }
    setKanjiList(filtered);
  }, [searchTerm, selectedLevel]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hán tự (Kanji)</h1>
          <p className="text-slate-600">Học và ôn tập Kanji theo cấp độ JLPT.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm chữ Hán, âm On, âm Kun hoặc nghĩa..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  selectedLevel === level 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level === 'All' ? 'Tất cả' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Kanji List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kanjiList.length > 0 ? (
            kanjiList.map((kanji, index) => (
              <motion.div
                key={kanji.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-4 left-4 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-bold">{kanji.level}</div>
                <div className="absolute top-4 right-4 text-xs text-slate-400 font-medium">{kanji.strokeCount} nét</div>
                
                <h3 className="text-7xl font-black text-slate-900 mt-8 mb-4 group-hover:text-emerald-600 transition-colors font-serif">{kanji.kanji}</h3>
                <p className="text-xl font-bold text-slate-800 mb-6">{kanji.meaning}</p>
                
                <div className="w-full space-y-2 mb-6">
                  <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">On</span>
                    <span className="text-slate-900 font-bold">{kanji.onyomi}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Kun</span>
                    <span className="text-slate-900 font-bold">{kanji.kunyomi}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-slate-100">
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-colors" title="Lưu Kanji">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors" title="Đánh dấu đã học">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <Link 
                    href={`/kanji/${kanji.id}`}
                    className="p-2 bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-colors flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg">Không tìm thấy Kanji nào phù hợp.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
