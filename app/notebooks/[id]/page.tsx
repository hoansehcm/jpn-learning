'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, MoreVertical, BookOpen, Trash2, Edit2, Play } from 'lucide-react';

interface NotebookItem {
  id: string;
  type: 'vocabulary' | 'grammar' | 'kanji';
  content: string;
  meaning: string;
  reading?: string;
  level: string;
  addedAt: string;
}

const mockNotebookData = {
  id: 'n1',
  title: 'Từ vựng N5 quan trọng',
  description: 'Các từ vựng hay xuất hiện trong đề thi N5',
  color: 'bg-blue-100 border-blue-300 text-blue-800',
  items: [
    { id: 'i1', type: 'vocabulary', content: '食べる', reading: 'たべる', meaning: 'Ăn', level: 'N5', addedAt: '2023-10-25' },
    { id: 'i2', type: 'vocabulary', content: '飲む', reading: 'のむ', meaning: 'Uống', level: 'N5', addedAt: '2023-10-25' },
    { id: 'i3', type: 'kanji', content: '水', reading: 'みず', meaning: 'Nước', level: 'N5', addedAt: '2023-10-24' },
    { id: 'i4', type: 'grammar', content: '〜は〜です', reading: '', meaning: '... là ...', level: 'N5', addedAt: '2023-10-23' },
  ] as NotebookItem[],
};

export default function NotebookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [items, setItems] = useState<NotebookItem[]>(mockNotebookData.items);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.reading && item.reading.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteItem = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa mục này khỏi sổ tay?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'bg-emerald-100 text-emerald-800';
      case 'grammar': return 'bg-purple-100 text-purple-800';
      case 'kanji': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'Từ vựng';
      case 'grammar': return 'Ngữ pháp';
      case 'kanji': return 'Kanji';
      default: return 'Khác';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/notebooks" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-sans font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại Sổ tay
      </Link>

      <div className={`rounded-2xl border-2 p-8 mb-8 relative overflow-hidden ${mockNotebookData.color}`}>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <h1 className="text-3xl font-serif font-bold text-inherit pr-12">
            {mockNotebookData.title}
          </h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-black/10 transition-colors" title="Chỉnh sửa">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-lg opacity-90 font-sans relative z-10 max-w-2xl">
          {mockNotebookData.description}
        </p>
        <div className="mt-6 flex items-center gap-4 relative z-10">
          <span className="font-mono font-medium opacity-80">{items.length} mục</span>
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors backdrop-blur-sm">
            <Play className="w-4 h-4" fill="currentColor" />
            Ôn tập sổ tay này
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <BookOpen className="w-64 h-64" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Tìm kiếm trong sổ tay..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterType === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterType('vocabulary')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterType === 'vocabulary' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Từ vựng
          </button>
          <button
            onClick={() => setFilterType('grammar')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterType === 'grammar' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Ngữ pháp
          </button>
          <button
            onClick={() => setFilterType('kanji')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterType === 'kanji' ? 'bg-rose-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Kanji
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredItems.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${getTypeColor(item.type)}`}>
                    {getTypeLabel(item.type)}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-900 font-serif">
                        {item.content}
                      </h3>
                      {item.reading && (
                        <span className="text-sm text-gray-500 font-mono">
                          {item.reading}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 font-medium">
                      {item.meaning}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                  <span className="text-xs text-gray-400 font-mono">
                    Thêm: {item.addedAt}
                  </span>
                  <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/${item.type}/${item.id}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Xem chi tiết">
                      <BookOpen className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                      title="Xóa khỏi sổ tay"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-1">Không tìm thấy mục nào</p>
            <p className="text-sm">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
          </div>
        )}
      </div>
    </div>
  );
}
