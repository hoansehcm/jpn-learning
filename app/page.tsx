'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CalendarCheck2,
  GraduationCap,
  Sparkles,
  Star,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collectionStats, dashboardRoadmap } from '../lib/sampleData';

const starterWords = [
  { ja: 'こんにちは', vi: 'xin chào' },
  { ja: 'ありがとう', vi: 'cảm ơn' },
  { ja: 'がんばる', vi: 'cố gắng' },
];

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

  return (
    <div className="relative overflow-hidden">
      <section className="px-4 sm:px-6 lg:px-8 pt-10 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="surface-panel friendly-grid rounded-[42px] p-6 sm:p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute -top-12 right-8 h-44 w-44 rounded-full bg-[rgba(233,119,75,0.16)] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[rgba(63,165,124,0.12)] blur-3xl" />

            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start relative z-10">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full soft-pill px-4 py-2 text-sm"
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  App học tiếng Nhật thân thiện cho người mới lẫn người ôn JLPT
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="mt-6 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl"
                >
                  Mở app ra là biết
                  <span className="block text-[var(--accent-strong)]">hôm nay học gì tiếp theo.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="mt-6 max-w-2xl text-lg text-soft leading-8"
                >
                  NihongoMaster tập trung vào cảm giác học dễ chịu: từ vựng rõ ràng, kanji dễ tra,
                  flashcard dễ ôn và lộ trình JLPT đủ trực quan để bạn không bị ngợp.
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
                    {user ? 'Mở trang học của mình' : 'Bắt đầu học ngay'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <a
                    href="#how-it-feels"
                    className="inline-flex items-center justify-center gap-2 rounded-full soft-pill px-7 py-4 font-semibold"
                  >
                    Xem trải nghiệm học
                  </a>
                </motion.div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {starterWords.map((item) => (
                    <div key={item.ja} className="soft-pill rounded-full px-4 py-2">
                      <span className="font-semibold">{item.ja}</span>
                      <span className="text-soft ml-2">{item.vi}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="surface-card rounded-[34px] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-soft">Hôm nay</p>
                      <p className="mt-2 font-serif text-3xl">Gợi ý lộ trình học nhẹ nhàng</p>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-[#fff1e8] flex items-center justify-center">
                      <CalendarCheck2 className="w-6 h-6 text-[var(--accent-strong)]" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      'Học 8 từ mới trong 10 phút',
                      'Ôn 1 mẫu ngữ pháp bằng ví dụ',
                      'Lật 15 flashcard trước khi nghỉ',
                    ].map((task) => (
                      <div key={task} className="rounded-[24px] bg-black/5 px-4 py-3 flex items-center gap-3">
                        <div className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
                        <p>{task}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-card rounded-[34px] p-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-[26px] bg-[#fff1e8] p-4">
                      <p className="text-3xl font-bold">{collectionStats.vocabulary}</p>
                      <p className="mt-1 text-sm text-soft">từ vựng</p>
                    </div>
                    <div className="rounded-[26px] bg-[#f0ebff] p-4">
                      <p className="text-3xl font-bold">{collectionStats.grammar}</p>
                      <p className="mt-1 text-sm text-soft">ngữ pháp</p>
                    </div>
                    <div className="rounded-[26px] bg-[#e8f6ef] p-4">
                      <p className="text-3xl font-bold">{collectionStats.kanji}</p>
                      <p className="mt-1 text-sm text-soft">kanji</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[28px] bg-black text-white p-5">
                    <div className="flex items-center gap-2 text-white/70">
                      <Star className="w-4 h-4" />
                      Roadmap JLPT
                    </div>
                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {dashboardRoadmap.map((item) => (
                        <div key={item.level} className="rounded-2xl bg-white/8 px-2 py-3 text-center">
                          <p className="font-semibold">{item.level}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-feels" className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-soft">Trải nghiệm học</p>
            <h2 className="mt-3 font-serif text-4xl">Thân thiện hơn với người học mỗi ngày</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Từ vựng nhìn là hiểu',
                description: 'Hiển thị chữ, kana, romaji và nghĩa theo bố cục dễ quét mắt, hợp cho cả người mới.',
                tone: 'bg-[#fff1e8] text-[var(--accent-strong)]',
              },
              {
                icon: BrainCircuit,
                title: 'Ôn tập ít áp lực hơn',
                description: 'Dashboard và flashcard được tổ chức để bạn tập trung vào bước tiếp theo thay vì bị nhiều nút làm rối.',
                tone: 'bg-[#f0ebff] text-[var(--violet)]',
              },
              {
                icon: GraduationCap,
                title: 'Kanji có ngữ cảnh',
                description: 'Học chữ Hán theo mục tiêu JLPT, nhưng vẫn luôn gắn với ví dụ và nhịp học hàng ngày.',
                tone: 'bg-[#e8f6ef] text-[var(--success)]',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="surface-card rounded-[34px] p-7"
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${feature.tone}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-4 text-soft leading-7">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
