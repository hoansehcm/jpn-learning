'use client';

import { motion } from 'motion/react';
import { PlayCircle, Target, Clock, Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Quizzes() {
  const mockTests = [
    { id: 'n5', level: 'N5', title: 'Đề thi thử N5 - Đề số 1', duration: 105, questions: 60, status: 'new' },
    { id: 'n4', level: 'N4', title: 'Đề thi thử N4 - Đề số 1', duration: 125, questions: 70, status: 'new' },
    { id: 'n3', level: 'N3', title: 'Đề thi thử N3 - Đề số 1', duration: 140, questions: 80, status: 'completed', score: 120 },
    { id: 'n2', level: 'N2', title: 'Đề thi thử N2 - Đề số 1', duration: 155, questions: 90, status: 'new' },
    { id: 'n1', level: 'N1', title: 'Đề thi thử N1 - Đề số 1', duration: 170, questions: 100, status: 'locked' },
  ];

  const practiceQuizzes = [
    { id: 'v1', title: 'Từ vựng N5 - Bài 1-5', type: 'Từ vựng', questions: 20, color: 'bg-blue-100 text-blue-600' },
    { id: 'g1', title: 'Ngữ pháp N5 - Bài 1-5', type: 'Ngữ pháp', questions: 15, color: 'bg-purple-100 text-purple-600' },
    { id: 'k1', title: 'Kanji N5 - Bài 1-5', type: 'Kanji', questions: 20, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'm1', title: 'Tổng hợp N5', type: 'Tổng hợp', questions: 30, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Luyện tập & Thi thử</h1>
          <p className="text-slate-600">Đánh giá năng lực của bạn qua các bài kiểm tra và đề thi thử chuẩn JLPT.</p>
        </div>

        {/* Practice Quizzes */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-600" /> Luyện tập theo chuyên đề
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl ${quiz.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{quiz.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{quiz.questions} câu hỏi</p>
                
                <button className="mt-auto w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Bắt đầu
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mock Tests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-orange-500" /> Đề thi thử JLPT
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {mockTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors ${test.status === 'locked' ? 'bg-slate-50 opacity-75' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${
                      test.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                      test.status === 'locked' ? 'bg-slate-200 text-slate-400' :
                      'bg-indigo-100 text-indigo-600'
                    }`}>
                      {test.level}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                        {test.title}
                        {test.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {test.duration} phút</span>
                        <span className="flex items-center gap-1"><Target className="w-4 h-4" /> {test.questions} câu</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6">
                    {test.status === 'completed' && (
                      <div className="text-right">
                        <p className="text-sm text-slate-500 font-medium">Điểm số</p>
                        <p className="text-2xl font-black text-emerald-600">{test.score}/180</p>
                      </div>
                    )}
                    
                    <button 
                      disabled={test.status === 'locked'}
                      className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                        test.status === 'completed' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' :
                        test.status === 'locked' ? 'bg-slate-200 text-slate-400 cursor-not-allowed' :
                        'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-200'
                      }`}
                    >
                      {test.status === 'completed' ? 'Làm lại' : test.status === 'locked' ? 'Chưa mở khóa' : 'Bắt đầu thi'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
