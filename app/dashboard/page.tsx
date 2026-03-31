'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Flame,
  GraduationCap,
  PlayCircle,
  Sparkles,
  Target,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { collectionStats, dashboardRoadmap, sampleGrammar, sampleKanji, sampleVocabulary } from '../../lib/sampleData';

const weeklyData = [
  { name: 'T2', words: 18, grammar: 4, kanji: 7 },
  { name: 'T3', words: 24, grammar: 6, kanji: 12 },
  { name: 'T4', words: 16, grammar: 5, kanji: 8 },
  { name: 'T5', words: 28, grammar: 7, kanji: 13 },
  { name: 'T6', words: 22, grammar: 4, kanji: 10 },
  { name: 'T7', words: 31, grammar: 8, kanji: 15 },
  { name: 'CN', words: 14, grammar: 3, kanji: 6 },
];

export default function Dashboard() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, router, user]);

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-black/10 border-t-[var(--accent)] animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      label: 'Từ vựng',
      count: sampleVocabulary.filter((item) => item.level === userProfile.targetLevel).length,
      total: collectionStats.vocabulary,
      icon: BookOpen,
      tone: 'bg-[#fff1e8] text-[var(--accent-strong)]',
    },
    {
      label: 'Ngữ pháp',
      count: sampleGrammar.filter((item) => item.level === userProfile.targetLevel).length,
      total: collectionStats.grammar,
      icon: BrainCircuit,
      tone: 'bg-[#f0ebff] text-[var(--violet)]',
    },
    {
      label: 'Kanji',
      count: sampleKanji.filter((item) => item.level === userProfile.targetLevel).length,
      total: collectionStats.kanji,
      icon: GraduationCap,
      tone: 'bg-[#e8f6ef] text-[var(--success)]',
    },
  ];

  const missionList = [
    'Học 10 từ mới theo level hiện tại',
    'Ôn 1 mẫu ngữ pháp bằng ví dụ',
    'Lật ít nhất 15 flashcard',
  ];

  const nextLessons = [
    { href: '/vocabulary', title: `Từ vựng ${userProfile.targetLevel}`, note: 'Bắt đầu bằng các mục dễ nhớ để lấy lại nhịp học.' },
    { href: '/grammar', title: `Ngữ pháp ${userProfile.targetLevel}`, note: 'Ôn những mẫu thường gặp trước khi làm quiz.' },
    { href: '/kanji', title: `Kanji ${userProfile.targetLevel}`, note: 'Tra nhanh các chữ cần nhớ trong tuần này.' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="surface-panel rounded-[42px] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute -top-10 right-4 h-40 w-40 rounded-full bg-[rgba(233,119,75,0.14)] blur-3xl" />
          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-6 relative z-10">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-soft">Trang học của bạn</p>
              <h1 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight">
                Chào {userProfile.displayName}, hôm nay mình học tiếp {userProfile.targetLevel} nhé.
              </h1>
              <p className="mt-5 max-w-2xl text-soft leading-7">
                App đã gom lại những việc quan trọng nhất để bạn không phải nghĩ quá nhiều trước khi bắt đầu.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/flashcards"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--accent-ink)] accent-ring"
                >
                  <PlayCircle className="w-5 h-5" />
                  Bắt đầu ôn tập
                </Link>
                <Link
                  href="/quizzes"
                  className="inline-flex items-center justify-center gap-2 rounded-full soft-pill px-6 py-3.5 font-semibold"
                >
                  Làm mini quiz
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="surface-card rounded-[28px] p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-black text-white flex items-center justify-center">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-soft">Chuỗi học</p>
                      <p className="text-2xl font-bold">{userProfile.streak} ngày</p>
                    </div>
                  </div>
                </div>

                <div className="surface-card rounded-[28px] p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-[#fff1e8] text-[var(--accent-strong)] flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-soft">Mục tiêu hôm nay</p>
                      <p className="text-2xl font-bold">0/{userProfile.dailyGoal}</p>
                    </div>
                  </div>
                </div>

                <div className="surface-card rounded-[28px] p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-[#f0ebff] text-[var(--violet)] flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-soft">Level hiện tại</p>
                      <p className="text-2xl font-bold">{userProfile.targetLevel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="surface-card rounded-[34px] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-11 w-11 rounded-2xl bg-[#e8f6ef] text-[var(--success)] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Nhiệm vụ hôm nay</p>
                    <p className="text-sm text-soft">Chỉ cần hoàn thành từng bước nhỏ</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {missionList.map((mission) => (
                    <div key={mission} className="rounded-[24px] bg-black/5 px-4 py-3 flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
                      <p>{mission}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card rounded-[34px] p-6">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-[#fff1e8] text-[var(--accent-strong)] flex items-center justify-center">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Lộ trình đang theo</p>
                    <p className="text-sm text-soft">JLPT {userProfile.targetLevel}</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {dashboardRoadmap
                    .filter((item) => item.level === userProfile.targetLevel)
                    .map((item) => (
                      <div key={item.level} className="rounded-[24px] bg-black/5 px-4 py-3">
                        <p className="font-medium">{item.focus}</p>
                        <p className="text-sm text-soft mt-1">{item.target}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="surface-card rounded-[38px] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-soft">Kho nội dung đang có</p>
                <h2 className="mt-2 font-serif text-3xl">Tài nguyên cho {userProfile.targetLevel}</h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] bg-black/5 p-5">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${stat.tone}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="mt-6 text-sm uppercase tracking-[0.15em] text-soft">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.count}</p>
                  <p className="text-sm text-soft mt-1">trên tổng {stat.total} mục</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-[30px] bg-[#fffaf4] p-5 border border-[var(--border-color)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-2xl bg-black text-white flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Nhịp học 7 ngày gần đây</p>
                  <p className="text-sm text-soft">Nhìn nhanh để giữ tiến độ đều hơn</p>
                </div>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 12, right: 8, left: -26, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(53,42,34,0.12)" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6b5f56', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b5f56', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                      contentStyle={{
                        borderRadius: '18px',
                        border: '1px solid rgba(53,42,34,0.08)',
                        boxShadow: '0 18px 40px rgba(49,34,17,0.12)',
                      }}
                    />
                    <Bar dataKey="words" stackId="a" fill="#e9774b" radius={[0, 0, 10, 10]} />
                    <Bar dataKey="grammar" stackId="a" fill="#8b6be8" />
                    <Bar dataKey="kanji" stackId="a" fill="#3fa57c" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-card rounded-[38px] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-soft">Bắt đầu từ đâu</p>
              <h2 className="mt-2 font-serif text-3xl">Gợi ý bài tiếp theo</h2>
              <div className="mt-6 space-y-3">
                {nextLessons.map((lesson) => (
                  <Link key={lesson.href} href={lesson.href} className="block rounded-[26px] bg-black/5 px-5 py-4 hover:bg-black/7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{lesson.title}</p>
                        <p className="text-sm text-soft mt-2 leading-6">{lesson.note}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 mt-1 text-soft" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-[38px] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-soft">Lộ trình tổng thể</p>
              <div className="mt-5 space-y-3">
                {dashboardRoadmap.map((item) => (
                  <div
                    key={item.level}
                    className={`rounded-[24px] px-4 py-3 ${
                      item.level === userProfile.targetLevel ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'bg-black/5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold">{item.level}</p>
                      <p className="text-sm">{item.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
