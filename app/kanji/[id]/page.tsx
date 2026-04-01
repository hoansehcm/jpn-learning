'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpenText, GraduationCap, Loader2 } from 'lucide-react';
import KanjiStrokePlayer from '../../../components/KanjiStrokePlayer';
import { KanjiItem, RawKanjiItem, normalizeKanjiItem } from '../../../lib/kanjiData';

const ReadingBlock = ({ label, values }: { label: string; values: string[] }) => (
  <div className="rounded-[24px] bg-black/20 p-5 backdrop-blur-sm">
    <p className="text-sm font-medium text-white/70">{label}</p>
    {values.length > 0 ? (
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={`${label}-${value}`} className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white">
            {value}
          </span>
        ))}
      </div>
    ) : (
      <p className="mt-2 text-2xl font-bold tracking-wide">—</p>
    )}
  </div>
);

export default function KanjiDetail() {
  const params = useParams();
  const router = useRouter();
  const [kanjiList, setKanjiList] = useState<KanjiItem[]>([]);
  const [loading, setLoading] = useState(true);

  const id = useMemo(() => {
    const value = params?.id;
    const rawId = Array.isArray(value) ? value[0] : value;
    return rawId ? decodeURIComponent(rawId) : '';
  }, [params]);

  useEffect(() => {
    let mounted = true;

    fetch('/data/kanji_data.json')
      .then((res) => res.json())
      .then((data: RawKanjiItem[]) => {
        if (!mounted) return;
        setKanjiList((data || []).map(normalizeKanjiItem));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Loi khi tai chi tiet Kanji:', error);
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const kanji = kanjiList.find((item) => item.id === id || item.kanji === id);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <p className="text-soft">Dang tai chi tiet Kanji...</p>
      </div>
    );
  }

  if (!kanji) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <p className="text-2xl font-semibold">Khong tim thay Kanji</p>
        <button onClick={() => router.back()} className="mt-4 text-emerald-700">
          Quay lai
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 pb-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lai danh sach
        </button>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[40px] border border-border bg-card shadow-sm"
        >
          <div className="border-b border-border bg-[linear-gradient(135deg,#0f9f6e,#065f46)] p-8 text-white sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
              <div className="flex h-[220px] items-center justify-center rounded-[36px] bg-white font-serif text-[120px] text-emerald-700 shadow-xl dark:bg-emerald-950 dark:text-emerald-400">
                {kanji.kanji}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white">
                    {kanji.level}
                  </span>
                  <span className="font-medium text-white/80">{kanji.meta.strokeCount} net</span>
                  {kanji.meta.grade && <span className="font-medium text-white/80">Grade {kanji.meta.grade}</span>}
                  {kanji.meta.jlpt && <span className="font-medium text-white/80">JLPT N{kanji.meta.jlpt}</span>}
                </div>
                <h1 className="mt-5 text-4xl font-bold">{kanji.meaning}</h1>
                <p className="mt-3 text-white/80">{kanji.meanings.slice(0, 4).join(' • ')}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <ReadingBlock label="Am On" values={kanji.readings.onyomi} />
                  <ReadingBlock label="Am Kun" values={kanji.readings.kunyomi} />
                  <ReadingBlock label="Nanori" values={kanji.readings.nanori} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10 p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <KanjiStrokePlayer kanji={kanji.kanji} />

              <div className="rounded-[30px] border border-border/60 bg-secondary/40 p-6">
                <h2 className="text-xl font-bold text-foreground">Thong tin nhanh</h2>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                    <span className="text-muted-foreground">Unicode</span>
                    <span className="font-medium text-foreground">{kanji.meta.unicode}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                    <span className="text-muted-foreground">Tan suat</span>
                    <span className="font-medium text-foreground">
                      {kanji.meta.frequency ? `#${kanji.meta.frequency}` : 'Chua co'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Tu vi du</span>
                    <span className="font-medium text-foreground">{kanji.exampleVocabulary.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Tu vung vi du</h2>
                  <p className="text-sm text-muted-foreground">Tu duoc chon uu tien theo do pho bien va kha nang hoc thuc te.</p>
                </div>
              </div>

              {kanji.exampleVocabulary.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {kanji.exampleVocabulary.map((example, index) => (
                    <div
                      key={`${kanji.id}-vocab-${example.word}-${index}`}
                      className="rounded-[28px] border border-border/50 bg-secondary/50 p-6 transition-colors hover:bg-secondary"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-2xl font-bold text-foreground">{example.word}</p>
                          {example.reading && <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">{example.reading}</p>}
                        </div>
                        {example.priorities.length > 0 && (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                            {example.priorities[0]}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-base text-muted-foreground">{example.meaning || 'Chua co nghia bo sung.'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[28px] border border-border/50 bg-secondary/50 p-8 text-center">
                  <p className="text-lg text-muted-foreground">Chua co tu vi du cho chu nay.</p>
                </div>
              )}
            </section>

            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400">
                  <BookOpenText className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Vi du bo sung</h2>
                  <p className="text-sm text-muted-foreground">Giu lai cac vi du cu de khong mat ngu canh hoc tap.</p>
                </div>
              </div>

              {kanji.examples.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {kanji.examples.map((example, index) => (
                    <div
                      key={`${kanji.id}-example-${index}`}
                      className="flex flex-col rounded-[28px] border border-border/50 bg-secondary/50 p-6"
                    >
                      <p className="text-2xl font-bold text-foreground">{example.ja}</p>
                      <p className="mt-3 text-base text-muted-foreground">{example.vi}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[28px] border border-border/50 bg-secondary/50 p-8 text-center">
                  <p className="text-lg text-muted-foreground">Chua co vi du bo sung cho chu nay.</p>
                </div>
              )}
            </section>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
