'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, GraduationCap, Loader2 } from 'lucide-react';
import KanjiStrokePlayer from '../../../components/KanjiStrokePlayer';

interface RawKanjiItem {
  id: string;
  kanji: string;
  onyomi?: string;
  kunyomi?: string;
  meaning?: string;
  level?: string | string[];
  strokeCount?: number | string;
  examples?: Array<{ ja: string; vi: string }>;
}

interface KanjiDetailItem {
  id: string;
  kanji: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  level: string;
  strokeCount: string;
  examples: Array<{ ja: string; vi: string }>;
}

const normalizeKanjiItem = (item: RawKanjiItem): KanjiDetailItem => ({
  id: item.id,
  kanji: item.kanji,
  onyomi: item.onyomi || '—',
  kunyomi: item.kunyomi || '—',
  meaning: item.meaning || 'Chưa có nghĩa',
  level: Array.isArray(item.level) ? item.level[0] || 'N5' : item.level || 'N5',
  strokeCount: String(item.strokeCount ?? '0'),
  examples: Array.isArray(item.examples) ? item.examples : [],
});

export default function KanjiDetail() {
  const params = useParams();
  const router = useRouter();
  const [kanjiList, setKanjiList] = useState<KanjiDetailItem[]>([]);
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
        console.error('Lỗi khi tải chi tiết Kanji:', error);
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
        <p className="text-soft">Đang tải chi tiết kanji...</p>
      </div>
    );
  }

  if (!kanji) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <p className="text-2xl font-semibold">Không tìm thấy kanji</p>
        <button onClick={() => router.back()} className="mt-4 text-emerald-700">
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-soft hover:text-[var(--text-color)]">
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </button>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface-panel overflow-hidden rounded-[40px]">
          <div className="bg-[linear-gradient(135deg,#0f9f6e,#065f46)] p-8 text-white sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
              <div className="flex h-[220px] items-center justify-center rounded-[36px] bg-white font-serif text-[120px] text-emerald-700 shadow-xl">
                {kanji.kanji}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">{kanji.level}</span>
                  <span className="text-white/80">{kanji.strokeCount} nét</span>
                </div>
                <h1 className="mt-5 text-4xl font-bold">{kanji.meaning}</h1>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-white/10 p-4">
                    <p className="text-sm text-white/70">Âm On</p>
                    <p className="mt-2 text-xl font-semibold">{kanji.onyomi}</p>
                  </div>
                  <div className="rounded-[24px] bg-white/10 p-4">
                    <p className="text-sm text-white/70">Âm Kun</p>
                    <p className="mt-2 text-xl font-semibold">{kanji.kunyomi}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <KanjiStrokePlayer kanji={kanji.kanji} />

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <GraduationCap className="h-5 w-5" />
              </div>
              <p className="font-semibold">Từ vựng chứa chữ này</p>
            </div>

            {kanji.examples.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {kanji.examples.map((example, index) => (
                  <div key={`${kanji.id}-${index}`} className="rounded-[28px] bg-black/5 p-5">
                    <p className="text-2xl font-semibold">{example.ja}</p>
                    <p className="mt-3 text-soft">{example.vi}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-[28px] bg-black/5 p-5 text-soft">Chưa có ví dụ cho chữ này.</div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
