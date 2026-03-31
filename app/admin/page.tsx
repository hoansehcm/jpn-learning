'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ShieldAlert, Plus, Edit, Trash2, Database, Users, BookOpen, BrainCircuit, GraduationCap } from 'lucide-react';

export default function AdminPanel() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('vocabulary');

  useEffect(() => {
    if (!loading && (!user || userProfile?.role !== 'admin')) {
      router.push('/dashboard');
    }
  }, [user, userProfile, loading, router]);

  if (loading || !user || userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <ShieldAlert className="w-12 h-12 text-amber-500" />
          <p className="font-medium">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'vocabulary', name: 'Từ vựng', icon: BookOpen },
    { id: 'grammar', name: 'Ngữ pháp', icon: BrainCircuit },
    { id: 'kanji', name: 'Kanji', icon: GraduationCap },
    { id: 'users', name: 'Người dùng', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
              <Database className="w-8 h-8 text-indigo-600" />
              Quản trị hệ thống
            </h1>
            <p className="text-slate-600">Quản lý nội dung học tập và người dùng.</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" /> Thêm mới
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Quản lý {tabs.find(t => t.id === activeTab)?.name.toLowerCase()}
              </h2>

              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                <Database className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-1">Chưa có dữ liệu</h3>
                <p className="text-slate-500 mb-4">Tính năng đang được phát triển. Dữ liệu sẽ được kết nối với Firestore.</p>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                  Tải dữ liệu mẫu
                </button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
