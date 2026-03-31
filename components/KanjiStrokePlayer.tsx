'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, RotateCcw, WandSparkles } from 'lucide-react';

interface KanjiStrokePlayerProps {
  kanji: string;
}

interface StrokeSvgData {
  paths: string[];
  viewBox: string;
}

const DEFAULT_VIEWBOX = '0 0 109 109';

const getKanjiSvgUrl = (kanji: string) => {
  const codePoint = kanji.codePointAt(0);
  if (!codePoint) return null;
  const hex = codePoint.toString(16).padStart(5, '0');
  return `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg/kanji/${hex}.svg`;
};

const parseStrokeSvg = (svgText: string): StrokeSvgData => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  const allPaths = Array.from(doc.querySelectorAll('path'));
  const strokePaths = allPaths
    .filter((path) => (path.getAttribute('id') || '').includes('-s'))
    .map((path) => path.getAttribute('d'))
    .filter((value): value is string => Boolean(value));

  return {
    paths: strokePaths,
    viewBox: svg?.getAttribute('viewBox') || DEFAULT_VIEWBOX,
  };
};

export default function KanjiStrokePlayer({ kanji }: KanjiStrokePlayerProps) {
  const [svgData, setSvgData] = useState<StrokeSvgData | null>(null);
  const [loading, setLoading] = useState(Boolean(kanji));
  const [error, setError] = useState<string | null>(null);
  const [replayTick, setReplayTick] = useState(0);

  const svgUrl = useMemo(() => getKanjiSvgUrl(kanji), [kanji]);

  useEffect(() => {
    if (!svgUrl) {
      return;
    }

    let mounted = true;
    const controller = new AbortController();

    fetch(svgUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Không tải được stroke SVG (${res.status})`);
        }
        return res.text();
      })
      .then((text) => {
        if (!mounted) return;
        const parsed = parseStrokeSvg(text);
        if (parsed.paths.length === 0) {
          throw new Error('Không có dữ liệu nét vẽ cho chữ này.');
        }
        setSvgData(parsed);
        setLoading(false);
      })
      .catch((fetchError) => {
        if (!mounted || controller.signal.aborted) return;
        console.error('Lỗi tải stroke order:', fetchError);
        setError('Chưa tải được animation nét vẽ cho chữ này.');
        setLoading(false);
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [svgUrl]);

  return (
    <div className="rounded-[30px] bg-[#f7fcf8] border border-emerald-100 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <WandSparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Animation nét viết</p>
            <p className="text-sm text-soft">Mô phỏng thứ tự viết từng nét của kanji</p>
          </div>
        </div>

        {!loading && svgData && (
          <button
            onClick={() => setReplayTick((value) => value + 1)}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <RotateCcw className="w-4 h-4" />
            Phát lại
          </button>
        )}
      </div>

      {loading && (
        <div className="h-[280px] rounded-[26px] bg-white flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-soft">Đang tải stroke order...</p>
        </div>
      )}

      {!loading && error && (
        <div className="h-[280px] rounded-[26px] bg-white flex items-center justify-center text-center px-6 text-soft">
          {error}
        </div>
      )}

      {!loading && svgData && (
        <div className="rounded-[26px] bg-white p-4 sm:p-6">
          <svg
            key={`${kanji}-${replayTick}`}
            viewBox={svgData.viewBox}
            className="w-full h-[240px] sm:h-[300px]"
            fill="none"
            aria-label={`Stroke order for ${kanji}`}
          >
            {svgData.paths.map((path, index) => (
              <g key={`${index}-${path.slice(0, 16)}`}>
                <path
                  d={path}
                  stroke="rgba(15, 23, 42, 0.08)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path
                  d={path}
                  stroke="#0f9f6e"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.48,
                    delay: index * 0.34,
                    ease: 'easeInOut',
                  }}
                />
              </g>
            ))}
          </svg>

          <div className="mt-4 rounded-[22px] bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Nét sẽ chạy theo thứ tự chuẩn từ nguồn KanjiVG. Bạn có thể phát lại để quan sát kỹ hơn.
          </div>
        </div>
      )}
    </div>
  );
}
