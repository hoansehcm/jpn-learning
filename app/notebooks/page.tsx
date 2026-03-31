'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Book, Plus, MoreVertical, Trash2, Edit2 } from 'lucide-react';

interface Notebook {
  id: string;
  title: string;
  description: string;
  color: string;
  itemCount: number;
  updatedAt: string;
}

const mockNotebooks: Notebook[] = [
  {
    id: 'n1',
    title: 'Từ vựng N5 quan trọng',
    description: 'Các từ vựng hay xuất hiện trong đề thi N5',
    color: 'bg-blue-100 border-blue-300 text-blue-800',
    itemCount: 45,
    updatedAt: '2023-10-25',
  },
  {
    id: 'n2',
    title: 'Ngữ pháp N4 khó nhớ',
    description: 'Tổng hợp ngữ pháp N4 cần ôn tập nhiều lần',
    color: 'bg-rose-100 border-rose-300 text-rose-800',
    itemCount: 12,
    updatedAt: '2023-10-24',
  },
  {
    id: 'n3',
    title: 'Kanji chủ đề Công việc',
    description: 'Kanji dùng trong giao tiếp công sở',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    itemCount: 28,
    updatedAt: '2023-10-20',
  },
];

export default function NotebooksPage() {
  const [notebooks, setNotebooks] = useState<Notebook[]>(mockNotebooks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNotebookTitle, setNewNotebookTitle] = useState('');
  const [newNotebookDesc, setNewNotebookDesc] = useState('');

  const handleCreateNotebook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotebookTitle.trim()) return;

    const colors = [
      'bg-blue-100 border-blue-300 text-blue-800',
      'bg-rose-100 border-rose-300 text-rose-800',
      'bg-emerald-100 border-emerald-300 text-emerald-800',
      'bg-amber-100 border-amber-300 text-amber-800',
      'bg-purple-100 border-purple-300 text-purple-800',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newNotebook: Notebook = {
      id: `n${Date.now()}`,
      title: newNotebookTitle,
      description: newNotebookDesc,
      color: randomColor,
      itemCount: 0,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setNotebooks([newNotebook, ...notebooks]);
    setIsCreateModalOpen(false);
    setNewNotebookTitle('');
    setNewNotebookDesc('');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa sổ tay này?')) {
      setNotebooks(notebooks.filter(n => n.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#2c2c2c] mb-2 flex items-center">
            <Book className="mr-3 h-8 w-8 text-indigo-600" />
            Sổ tay của tôi
          </h1>
          <p className="text-gray-600 font-sans text-lg">
            Tạo và quản lý các bộ sưu tập từ vựng, ngữ pháp, kanji cá nhân.
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tạo sổ tay mới
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notebooks.map((notebook) => (
          <Link href={`/notebooks/${notebook.id}`} key={notebook.id}>
            <div className={`relative h-48 rounded-xl border-2 p-5 flex flex-col transition-transform duration-200 hover:-translate-y-1 cursor-pointer ${notebook.color} shadow-sm group`}>
              {/* Notebook binding effect */}
              <div className="absolute left-0 top-0 bottom-0 w-6 border-r-2 border-inherit opacity-30 flex flex-col justify-evenly py-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-3 h-1 bg-black/20 rounded-r-full"></div>
                ))}
              </div>
              
              <div className="pl-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-serif line-clamp-2 pr-6">
                    {notebook.title}
                  </h3>
                  <button 
                    onClick={(e) => handleDelete(notebook.id, e)}
                    className="absolute top-4 right-4 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-black/10 transition-all text-inherit"
                    title="Xóa sổ tay"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-sm opacity-80 font-sans line-clamp-2 mb-4">
                  {notebook.description}
                </p>
                
                <div className="mt-auto flex justify-between items-center text-xs font-medium opacity-70">
                  <span>{notebook.itemCount} mục</span>
                  <span>Cập nhật: {notebook.updatedAt}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-indigo-50/50">
              <h3 className="text-lg font-bold text-gray-800 font-serif">Tạo sổ tay mới</h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MoreVertical className="w-5 h-5 rotate-90" />
              </button>
            </div>
            
            <form onSubmit={handleCreateNotebook} className="p-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên sổ tay <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={newNotebookTitle}
                  onChange={(e) => setNewNotebookTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="VD: Từ vựng N3 tuần 1"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả (tùy chọn)
                </label>
                <textarea
                  id="desc"
                  rows={3}
                  value={newNotebookDesc}
                  onChange={(e) => setNewNotebookDesc(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Mô tả ngắn về nội dung sổ tay..."
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!newNotebookTitle.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tạo mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
