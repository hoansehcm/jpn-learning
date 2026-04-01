'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, GraduationCap, Loader2, Search } from 'lucide-react';
import Link from 'next/link';
import { jlptLevels } from '../../lib/sampleData';
import { KanjiItem, RawKanjiItem, normalizeKanjiItem } from '../../lib/kanjiData';

const getPreviewText = (item: KanjiItem) => {
  const vocab = item.exampleVocabulary[0];

  if (vocab) {
    return {
      title: vocab.word,
      subtitle: [vocab.reading, vocab.meaning].filter(Boolean).join(' • '),
    };
  }

  const example = item.examples[0];

  if (example) {
    return {
      title: example.ja,
      subtitle: example.vi,
    };
  }

  return null;
};

export default function KanjiList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [kanjis, setKanjis] = useState<KanjiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(40);

  const deferredSearchTerm = useDeferredValue(searchTerm);
  const levels = ['All', ...jlptLevels];

  useEffect(() => {
    fetch('/data/kanji_data.json')
      .then((res) => res.json())
      .then((data: RawKanjiItem[]) => {
        setKanjis((data || []).map(normalizeKanjiItem));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Loi khi tai du lieu Kanji:', err);
        setLoading(false);
      });
  }, []);

  const kanjiList = useMemo(() => {
    const query = deferredSearchTerm.trim().toLowerCase();

    return kanjis.filter((item) => {
      const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
      const matchesSearch =
        query.length === 0 ||
        item.kanji.includes(query) ||
        item.searchableText.includes(query) ||
        item.meaning.toLowerCase().includes(query);

      return matchesLevel && matchesSearch;
    });
  }, [deferredSearchTerm, kanjis, selectedLevel]);

  return (
    <div className="min-h-screen bg-background px-4 pb-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[40px] border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8 lg:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Kanji Reference</p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Thu vien Kanji chi tiet</h1>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            Du lieu moi tach ro am On, am Kun, nghia, thong tin co ban va tu vung vi du cho tung chu. Ban co
            the tim theo kanji, am doc, nghia hoac tu vi du.
          </p>
        </section>

        <section className="rounded-[32px] border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tim: 学, がく, hoc, 日本, 学校..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setVisibleCount(40);
                }}
                className="w-full rounded-[22px] border border-border bg-background py-3.5 pl-12 pr-4 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setSelectedLevel(level);
                    setVisibleCount(40);
                  }}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    selectedLevel === level
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {level === 'All' ? 'Tat ca' : level}
                </button>
              ))}
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="font-medium text-muted-foreground">Dang tai thu vien Kanji...</p>
          </div>
        ) : (
          <>
            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {kanjiList.slice(0, visibleCount).map((item, index) => {
                const preview = getPreviewText(item);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 40) * 0.02 }}
                    className="flex flex-col rounded-[32px] border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400">
                        {item.level}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.meta.strokeCount} net</span>
                    </div>

                    <div className="mt-6 rounded-[28px] border border-border/50 bg-secondary/50 py-8 text-center">
                      <p className="font-serif text-7xl leading-none text-foreground">{item.kanji}</p>
                    </div>

                    <p className="mt-5 flex-grow text-xl font-bold text-foreground">{item.meaning}</p>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-start justify-between gap-3 border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">On</span>
                        <span className="text-right font-medium text-foreground">{item.onyomi}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3 pt-1">
                        <span className="text-muted-foreground">Kun</span>
                        <span className="text-right font-medium text-foreground">{item.kunyomi}</span>
                      </div>
                    </div>

                    {preview && (
                      <div className="mt-5 rounded-[22px] bg-secondary p-4">
                        <p className="font-medium text-foreground">{preview.title}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{preview.subtitle}</p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.exampleVocabulary.length} tu vi du</span>
                      <span>{item.readings.nanori.length} nanori</span>
                    </div>

                    <Link
                      href={`/kanji/${item.id}`}
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-500"
                    >
                      Xem chi tiet
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                );
              })}

              {kanjiList.length === 0 && (
                <div className="rounded-[30px] border border-border bg-card p-10 text-center sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  <GraduationCap className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-xl font-semibold text-foreground">Khong tim thay Kanji phu hop</p>
                  <p className="mt-2 text-muted-foreground">Thu tim theo am doc, nghia hoac tu vung vi du.</p>
                </div>
              )}
            </section>

            {visibleCount < kanjiList.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount((value) => value + 40)}
                  className="rounded-full bg-emerald-600 px-8 py-3.5 font-medium text-white shadow-md transition-all hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20 active:scale-95"
                >
                  Tai them ({visibleCount} / {kanjiList.length})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
