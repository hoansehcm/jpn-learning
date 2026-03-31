'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BrainCircuit, CheckCircle2, Frown, Meh, RotateCcw, Smile, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { sampleVocabulary } from '../../lib/sampleData';

export default function Flashcards() {
  const { user } = useAuth();
  const [cards] = useState(sampleVocabulary);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = cards[currentIndex];

  const handleRate = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="surface-card max-w-xl mx-auto rounded-[38px] p-10 text-center">
          <div className="h-24 w-24 rounded-full bg-[#e8f6ef] text-[var(--success)] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="mt-6 font-serif text-4xl">Hoàn thành phiên ôn tập</h2>
          <p className="mt-4 text-soft leading-7">
            Bạn đã đi hết {cards.length} thẻ hôm nay. Một phiên học gọn như vậy là đủ tốt để giữ nhịp.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsFinished(false);
                setIsFlipped(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-4 font-semibold text-[var(--accent-ink)]"
            >
              <RotateCcw className="w-5 h-5" />
              Ôn lại từ đầu
            </button>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full soft-pill px-6 py-4 font-semibold">
              Về trang học
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="surface-panel rounded-[40px] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-[20px] bg-[#f0ebff] text-[var(--violet)] flex items-center justify-center">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-soft">Phiên ôn tập</p>
                <h1 className="font-serif text-3xl mt-1">Flashcard hằng ngày</h1>
                <p className="text-soft mt-2">Thẻ {currentIndex + 1} / {cards.length}</p>
              </div>
            </div>

            <div className="rounded-full soft-pill px-4 py-2 text-sm">
              {user ? 'Tiếp tục nhịp học của bạn' : 'Chế độ xem thử'}
            </div>
          </div>

          <div className="mt-6 h-3 rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--violet))] transition-all duration-500"
              style={{ width: `${(currentIndex / cards.length) * 100}%` }}
            />
          </div>
        </section>

        <div className="relative h-[430px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIndex}-${isFlipped ? 'back' : 'front'}`}
              initial={{ opacity: 0, y: 18, rotateY: isFlipped ? -10 : 10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -18, rotateY: isFlipped ? 10 : -10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {!isFlipped ? (
                <button
                  onClick={() => setIsFlipped(true)}
                  className="surface-card w-full h-full rounded-[40px] p-8 sm:p-12 text-left relative overflow-hidden"
                >
                  <div className="absolute -top-8 right-8 h-36 w-36 rounded-full bg-[rgba(233,119,75,0.14)] blur-3xl" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-[#fff1e8] px-3 py-1 text-sm font-semibold text-[var(--accent-strong)]">
                        {currentCard.level}
                      </span>
                      <span className="text-sm text-soft">Chạm để lật thẻ</span>
                    </div>

                    <div className="text-center">
                      <p className="font-serif text-7xl sm:text-8xl leading-none">{currentCard.word}</p>
                      <p className="mt-6 text-lg text-soft">Nhìn chữ trước, đoán cách đọc và nghĩa.</p>
                    </div>

                    <div className="rounded-[26px] bg-black/5 px-5 py-4">
                      <p className="text-sm text-soft">Mẹo học</p>
                      <p className="mt-2 font-medium">Đừng cố nhớ hoàn hảo. Chỉ cần đoán, lật, rồi lặp lại.</p>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="surface-card w-full h-full rounded-[40px] p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[rgba(139,107,232,0.12)] blur-3xl" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="text-center">
                      <p className="text-5xl sm:text-6xl font-bold">{currentCard.word}</p>
                      <p className="mt-3 text-2xl text-[var(--accent-strong)]">{currentCard.kana}</p>
                      <p className="mt-2 text-sm font-mono text-soft">{currentCard.romaji}</p>
                      <p className="mt-6 text-3xl font-semibold">{currentCard.meaning}</p>
                    </div>

                    <div className="rounded-[28px] bg-black/5 p-5">
                      <p className="font-medium">{currentCard.examples[0].ja}</p>
                      <p className="text-soft mt-2">{currentCard.examples[0].vi}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={`transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Frown, label: 'Lại', sub: '1 phút', tone: 'text-rose-600 bg-rose-50 border-rose-100' },
              { icon: Meh, label: 'Khó', sub: '10 phút', tone: 'text-amber-600 bg-amber-50 border-amber-100' },
              { icon: Smile, label: 'Tốt', sub: '1 ngày', tone: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
              { icon: Sparkles, label: 'Dễ', sub: '4 ngày', tone: 'text-sky-600 bg-sky-50 border-sky-100' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={handleRate}
                className={`rounded-[28px] border p-4 flex flex-col items-center justify-center gap-2 ${item.tone}`}
              >
                <item.icon className="w-7 h-7" />
                <span className="font-semibold">{item.label}</span>
                <span className="text-sm opacity-80">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
