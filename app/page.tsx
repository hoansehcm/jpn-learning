'use client';

import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, BrainCircuit, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleStart = async () => {
    if (user) {
      router.push('/dashboard');
    } else {
      await signInWithGoogle();
      router.push('/dashboard');
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Từ vựng & Ngữ pháp',
      description: 'Hệ thống từ vựng và ngữ pháp đầy đủ từ N5 đến N1, kèm ví dụ song ngữ chi tiết.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: GraduationCap,
      title: 'Kanji theo cấp độ',
      description: 'Học Hán tự với âm On, âm Kun, số nét và từ vựng liên quan một cách bài bản.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: BrainCircuit,
      title: 'Ôn tập thông minh (SRS)',
      description: 'Thuật toán lặp lại ngắt quãng giúp bạn ghi nhớ từ vựng lâu hơn, học ít nhớ nhiều.',
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: Sparkles,
      title: 'Thi thử JLPT',
      description: 'Đánh giá năng lực với các bài thi thử chuẩn cấu trúc JLPT thực tế.',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/japan/1920/1080?blur=10')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-slate-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Nền tảng học tiếng Nhật thế hệ mới</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
            >
              Chinh phục JLPT <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                từ N5 đến N1
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 leading-relaxed"
            >
              Hệ thống học tập toàn diện với từ vựng, ngữ pháp, kanji và thuật toán ôn tập thông minh giúp bạn đạt mục tiêu nhanh nhất.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {user ? 'Vào bảng điều khiển' : 'Bắt đầu học miễn phí'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Mọi thứ bạn cần để đỗ JLPT</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Không cần tìm kiếm tài liệu rải rác. NihongoMaster tổng hợp tất cả kiến thức và công cụ ôn luyện vào một nơi duy nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Lộ trình học tập rõ ràng</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Theo dõi tiến độ của bạn qua từng cấp độ. Từ người mới bắt đầu đến khi thành thạo.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            {['N5', 'N4', 'N3', 'N2', 'N1'].map((level, index) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-1 w-full relative"
              >
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl text-center relative z-10 hover:bg-slate-700 transition-colors cursor-pointer group">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400 mb-2 group-hover:scale-110 transition-transform">
                    {level}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    {index === 0 ? 'Nhập môn' : index === 1 ? 'Sơ cấp' : index === 2 ? 'Trung cấp' : index === 3 ? 'Thượng cấp' : 'Cao cấp'}
                  </div>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="font-bold text-xl text-slate-900">NihongoMaster</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} NihongoMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
