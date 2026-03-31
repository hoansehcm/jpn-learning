'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, BookOpen, Mic, Search, Sparkles, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { marugotoLessons, marugotoLevels, marugotoStats } from '../../lib/marugotoData';

export default function SpeakingPage() {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const filteredLessons = marugotoLessons.filter((lesson) => {
    const matchesLevel = selectedLevel === 'all' || lesson.levelId === selectedLevel;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [lesson.title, lesson.canDo, lesson.focus, lesson.topics.join(' '), lesson.vocabulary.join(' '), lesson.grammar.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

    return matchesLevel && matchesQuery;
  });

  const playTTS = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn chưa hỗ trợ đọc tiếng Nhật.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="surface-panel friendly-grid overflow-hidden rounded-[40px] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="soft-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-soft">
              <Mic className="h-4 w-4 text-[var(--accent)]" />
              Lộ trình giao tiếp Marugoto
            </div>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Học đủ 6 level Marugoto theo kiểu dễ theo dõi, dễ luyện nói và có trang chi tiết từng bài.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-soft sm:text-lg">
              Bộ dữ liệu này mô phỏng đầy đủ toàn bộ series Marugoto từ <strong>Starter (A1)</strong> đến <strong>Intermediate 2 (B1)</strong>,
              đi theo hướng học giao tiếp thân thiện: có mục tiêu can-do, câu mẫu, chủ đề, gợi ý luyện nói và điểm ôn lại sau mỗi bài.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="surface-card rounded-[24px] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-soft">Levels</p>
                <p className="mt-2 text-2xl font-bold">{marugotoStats.totalLevels}</p>
              </div>
              <div className="surface-card rounded-[24px] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-soft">Lessons</p>
                <p className="mt-2 text-2xl font-bold">{marugotoStats.totalLessons}</p>
              </div>
              <div className="surface-card rounded-[24px] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-soft">Sample Lines</p>
                <p className="mt-2 text-2xl font-bold">{marugotoStats.totalSentences}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {marugotoLevels.map((level) => {
              const lessonCount = marugotoLessons.filter((lesson) => lesson.levelId === level.id).length;
              return (
                <div key={level.id} className={`rounded-[30px] border border-white/60 bg-gradient-to-br ${level.gradientClass} p-5 shadow-sm`}>
                  <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${level.badgeClass}`}>{level.label}</div>
                  <p className="mt-4 text-lg font-semibold text-slate-900">{level.officialFocus}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{level.studyTone}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-700">
                    <span>{lessonCount} bài nói</span>
                    <span>{level.cefr}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-8 surface-panel rounded-[34px] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-soft">Bộ lọc học nhanh</p>
            <h2 className="mt-2 font-serif text-2xl font-bold">Tìm bài Marugoto phù hợp với mục tiêu hiện tại</h2>
          </div>

          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-soft" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo chủ đề, mẫu ngữ pháp, từ khóa..."
              className="h-12 w-full rounded-full border border-[var(--border-color)] bg-white/70 pl-12 pr-4 text-sm outline-none ring-0 placeholder:text-soft focus:border-[var(--accent)] dark:bg-black/10"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium ${selectedLevel === 'all' ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'soft-pill text-soft'}`}
          >
            Tất cả level
          </button>
          {marugotoLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${selectedLevel === level.id ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'soft-pill text-soft'}`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-8 space-y-8">
        {marugotoLevels.map((level) => {
          const levelLessons = filteredLessons.filter((lesson) => lesson.levelId === level.id);

          if (levelLessons.length === 0) {
            return null;
          }

          return (
            <section key={level.id} className="space-y-4">
              <div className={`rounded-[34px] border border-white/70 bg-gradient-to-r ${level.gradientClass} p-6 shadow-sm`}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${level.badgeClass}`}>{level.label}</div>
                    <h3 className="mt-3 font-serif text-3xl font-bold text-slate-900">{level.series}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">{level.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                    {level.themes.map((theme) => (
                      <span key={theme} className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {levelLessons.map((lesson, index) => (
                  <motion.article
                    key={lesson.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="surface-card rounded-[32px] p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${level.badgeClass}`}>{lesson.lesson}</span>
                        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-soft">{lesson.duration}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <Sparkles className="h-3.5 w-3.5" />
                        {lesson.levelLabel}
                      </span>
                    </div>

                    <h4 className="mt-4 font-serif text-2xl font-bold">{lesson.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-soft">{lesson.canDo}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {lesson.topics.map((topic) => (
                        <span key={topic} className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium text-soft">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 rounded-[26px] bg-[var(--surface-muted)]/80 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">Câu mẫu mở đầu</p>
                          <p className="mt-2 font-serif text-2xl">{lesson.sentences[0].ja}</p>
                          <p className="mt-2 text-sm font-medium text-emerald-700">{lesson.sentences[0].romaji}</p>
                          <p className="mt-2 text-sm leading-6 text-soft">{lesson.sentences[0].vi}</p>
                        </div>
                        <button
                          onClick={() => playTTS(lesson.sentences[0].ja)}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--accent)] shadow-sm"
                          title="Nghe mẫu"
                        >
                          <Volume2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[22px] bg-black/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-soft">Ngữ pháp gợi ý</p>
                        <p className="mt-2 text-sm leading-6">{lesson.grammar.join(' • ')}</p>
                      </div>
                      <div className="rounded-[22px] bg-black/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-soft">Từ vựng lõi</p>
                        <p className="mt-2 text-sm leading-6">{lesson.vocabulary.join(' • ')}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 text-sm text-soft">
                        <BookOpen className="h-4 w-4" />
                        {lesson.selfStudyTasks.length} khối tự học
                      </div>
                      <div className="text-sm text-soft">
                        {lesson.grammarNotes.length} ngữ pháp • {lesson.vocabulary.length} từ khóa
                      </div>
                      <Link
                        href={`/speaking/${lesson.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-ink)]"
                      >
                        Xem chi tiết
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <section className="mt-8 surface-card rounded-[32px] p-10 text-center">
          <p className="font-serif text-2xl font-bold">Không tìm thấy bài nào phù hợp</p>
          <p className="mt-3 text-soft">Bạn thử đổi level hoặc gõ từ khóa khác như “du lịch”, “sức khỏe”, “メール”, “ために”.</p>
        </section>
      )}
    </div>
  );
}
