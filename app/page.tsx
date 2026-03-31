'use client';

import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  Layers3,
  Sparkles,
  Target,
} from 'lucide-react';
import { collectionStats, dashboardRoadmap } from '../lib/sampleData';

export default function Home() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleStart = async () => {
    if (user) {
      router.push('/dashboard');
      return;
    }

    await signInWithGoogle();
    router.push('/dashboard');
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Kho nội dung thật sự dùng được',
      description: 'Từ vựng, ngữ pháp và kanji được gom theo JLPT để bạn học có trật tự thay vì nhảy tài liệu.',
    },
    {
      icon: BrainCircuit,
      title: 'Học rồi phải ôn lại',
      description: 'Flashcard và nhịp ôn tập được đặt ngay trong flow học để giảm cảm giác “học xong quên luôn”.',
    },
    {
      icon: GraduationCap,
      title: 'Tập trung vào tiến độ',
      description: 'Mỗi cấp độ có mục tiêu rõ ràng, dễ thấy mình đang ở đâu và cần làm gì tiếp theo.',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <section className="px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="surface-panel editorial-grid rounded-[40px] p-6 sm:p-10 lg:p-14 overflow-hidden relative">
            <div className="absolute inset-y-0 right-0 w-[38%] bg-[radial-gradient(circle_at_top,rgba(190,91,53,0.22),transparent_58%)] pointer-events-none" />
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start relative z-10">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-white/70 px-4 py-2 text-sm"
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  Studio học tiếng Nhật cho người tự học nghiêm túc
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="mt-6 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl"
                >
                  Học JLPT theo cách có cấu trúc,
                  <span className="block text-[var(--accent-strong)]">đẹp mắt và đỡ rối hơn.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="mt-6 max-w-2xl text-lg text-soft leading-8"
                >
                  NihongoMaster gom bài học, tra cứu, ôn tập và lộ trình vào cùng một không gian.
                  Bạn không cần học kiểu chắp vá nữa, chỉ cần mở ra và đi tiếp đúng nhịp.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 }}
                  className="mt-8 flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={handleStart}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-4 font-semibold text-[var(--accent-ink)] accent-ring"
                  >
                    {user ? 'Vào dashboard' : 'Bắt đầu học'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <a
                    href="#collections"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-color)] bg-white/70 px-7 py-4 font-semibold"
                  >
                    Xem kho nội dung
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="surface-card rounded-[32px] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-soft">Collection</p>
                      <p className="mt-3 font-serif text-3xl">Kho học liệu đang sẵn sàng</p>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                      <Layers3 className="w-6 h-6 text-[var(--accent-strong)]" />
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <div className="rounded-3xl bg-[#f6efe6] p-4">
                      <p className="text-3xl font-bold">{collectionStats.vocabulary}</p>
                      <p className="mt-1 text-sm text-soft">mục từ</p>
                    </div>
                    <div className="rounded-3xl bg-[#efe9ff] p-4">
                      <p className="text-3xl font-bold">{collectionStats.grammar}</p>
                      <p className="mt-1 text-sm text-soft">mẫu ngữ pháp</p>
                    </div>
                    <div className="rounded-3xl bg-[#e7f4ee] p-4">
                      <p className="text-3xl font-bold">{collectionStats.kanji}</p>
                      <p className="mt-1 text-sm text-soft">kanji</p>
                    </div>
                  </div>
                </div>

                <div className="surface-card rounded-[32px] p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Roadmap 5 tầng</p>
                      <p className="text-sm text-soft">N5 đến N1, mỗi chặng đều có focus rõ ràng</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {dashboardRoadmap.slice(0, 3).map((item) => (
                      <div key={item.level} className="flex items-center justify-between rounded-2xl bg-black/5 px-4 py-3">
                        <div>
                          <p className="font-semibold">{item.level}</p>
                          <p className="text-sm text-soft">{item.focus}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-soft" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Hệ thống nội dung</p>
            <h2 className="mt-3 font-serif text-4xl">Không chỉ đẹp, mà phải học được lâu dài</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="surface-card rounded-[32px] p-7"
              >
                <div className="h-14 w-14 rounded-2xl bg-black text-white flex items-center justify-center">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-4 text-soft leading-7">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="max-w-7xl mx-auto surface-card rounded-[40px] p-8 sm:p-10 lg:p-14">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-soft">Lộ trình JLPT</p>
              <h2 className="mt-3 font-serif text-4xl">Thiết kế để bạn luôn biết bước tiếp theo</h2>
              <p className="mt-5 text-soft leading-7">
                Mỗi level không chỉ là tên gọi. Nó có mục tiêu, loại kỹ năng cần ưu tiên và độ phủ nội dung tương ứng.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
              {dashboardRoadmap.map((item) => (
                <div key={item.level} className="rounded-[28px] bg-black/5 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-soft">{item.focus}</p>
                  <p className="mt-4 font-serif text-3xl">{item.level}</p>
                  <p className="mt-4 text-sm text-soft leading-6">{item.target}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
