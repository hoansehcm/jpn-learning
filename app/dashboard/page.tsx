'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, BrainCircuit, GraduationCap, Flame, Target, ChevronRight, PlayCircle, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const progressData = [
    { name: 'Đã học', value: 120, color: '#4f46e5' },
    { name: 'Chưa học', value: 880, color: '#e2e8f0' },
  ];

  const stats = [
    { label: 'Từ vựng', count: 120, total: 1000, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Ngữ pháp', count: 45, total: 200, icon: BrainCircuit, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Kanji', count: 80, total: 500, icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Chào buổi sáng, {userProfile.displayName}! 👋
            </h1>
            <p className="text-slate-600">
              Hôm nay là một ngày tuyệt vời để học tiếng Nhật. Bạn đang hướng tới mục tiêu {userProfile.targetLevel}.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Chuỗi ngày học</p>
                <p className="text-2xl font-bold text-slate-900">{userProfile.streak} <span className="text-sm font-normal text-slate-500">ngày</span></p>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Mục tiêu ngày</p>
                <p className="text-2xl font-bold text-slate-900">0/{userProfile.dailyGoal} <span className="text-sm font-normal text-slate-500">từ</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Continue Learning Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
                    Tiếp tục học
                  </span>
                  <h2 className="text-2xl font-bold mb-2">Từ vựng {userProfile.targetLevel} - Bài 5</h2>
                  <p className="text-indigo-100 max-w-md">
                    Bạn đã hoàn thành 60% bài học này. Hãy tiếp tục để hoàn thành mục tiêu hôm nay nhé!
                  </p>
                </div>
                
                <button className="flex-shrink-0 w-16 h-16 bg-white text-indigo-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                  <PlayCircle className="w-8 h-8" />
                </button>
              </div>
            </motion.div>

            {/* Progress Overview */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Tiến độ {userProfile.targetLevel}</h3>
                <Link href="/progress" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  Xem chi tiết <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-500">{Math.round((stat.count / stat.total) * 100)}%</span>
                    </div>
                    <h4 className="text-slate-600 font-medium mb-1">{stat.label}</h4>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold text-slate-900">{stat.count}</span>
                      <span className="text-sm text-slate-500 mb-1">/ {stat.total}</span>
                    </div>
                    
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`} 
                        style={{ width: `${(stat.count / stat.total) * 100}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommended Lessons */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Gợi ý cho bạn</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                        <BookOpen className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Ngữ pháp bài {i + 5}</h4>
                        <p className="text-sm text-slate-500">15 mẫu câu mới • 20 phút</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* Review Queue (SRS) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Đến hạn ôn tập</h3>
                  <p className="text-sm text-slate-500">Hôm nay</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-5xl font-black text-slate-900 mb-2">42</div>
                <p className="text-slate-500 font-medium mb-6">từ vựng & ngữ pháp</p>
                
                <Link 
                  href="/flashcards"
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-center hover:bg-slate-800 transition-colors"
                >
                  Bắt đầu ôn tập
                </Link>
              </div>
            </motion.div>

            {/* Study Plan Mini */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Kế hoạch học tập</h3>
                  <p className="text-sm text-slate-500">JLPT {userProfile.targetLevel} - Tháng 12</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <p className="text-sm text-slate-700 flex-1">Học 20 từ vựng mới</p>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Xong</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <p className="text-sm text-slate-700 flex-1">Học 3 ngữ pháp mới</p>
                  <span className="text-xs font-medium text-slate-500">Chưa làm</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <p className="text-sm text-slate-700 flex-1">Làm 1 bài test nhỏ</p>
                  <span className="text-xs font-medium text-slate-500">Chưa làm</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
