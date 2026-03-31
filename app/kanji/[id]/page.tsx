'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, GraduationCap, Loader2 } from 'lucide-react';

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
    return Array.isArray(value) ? value[0] : value;
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="text-soft">Đang tải chi tiết kanji...</p>
      </div>
    );
  }

  if (!kanji) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-2xl font-semibold">Không tìm thấy kanji</p>
        <button onClick={() => router.back()} className="mt-4 text-emerald-700">
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-soft hover:text-[var(--text-color)]">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </button>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface-panel rounded-[40px] overflow-hidden">
          <div className="p-8 sm:p-10 bg-[linear-gradient(135deg,#0f9f6e,#065f46)] text-white">
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
              <div className="rounded-[36px] bg-white text-emerald-700 h-[220px] flex items-center justify-center font-serif text-[120px] shadow-xl">
                {kanji.kanji}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">{kanji.level}</span>
                  <span className="text-white/80">{kanji.strokeCount} nét</span>
                </div>
                <h1 className="mt-5 text-4xl font-bold">{kanji.meaning}</h1>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
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
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="font-semibold">Từ vựng chứa chữ này</p>
            </div>

            {kanji.examples.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {kanji.examples.map((example, index) => (
                  <div key={`${kanji.id}-${index}`} className="rounded-[28px] bg-black/5 p-5">
                    <p className="text-2xl font-semibold">{example.ja}</p>
                    <p className="text-soft mt-3">{example.vi}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] bg-black/5 p-5 text-soft">
                Chưa có ví dụ cho chữ này.
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
