import fs from 'fs';
import path from 'path';

const API_BASE = 'https://kanjiapi.dev/v1';
const GOOGLE_TRANSLATE_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'data', 'kanji_data.json');
const EXISTING_PATH = OUTPUT_PATH;
const DEFAULT_LIMIT = 500;
const BATCH_SIZE = 12;
const JAPANESE_COMMA = '\u3001';
const EM_DASH = '\u2014';

const normalizeLevel = (value, fallback = 'N5') => {
  const raw = Array.isArray(value) ? value[0] : value;

  if (!raw) return fallback;
  if (/^N[1-5]$/i.test(raw)) return raw.toUpperCase();
  if (/^[1-5]$/.test(String(raw))) return `N${raw}`;

  return fallback;
};

const toListString = (items) => (items.length > 0 ? items.join(JAPANESE_COMMA) : EM_DASH);

const scoreGloss = (glosses) => {
  const combined = glosses.join(' ').toLowerCase();
  let score = 0;

  if (!combined.includes('(abbr)')) score += 2;
  if (!combined.includes('(former)')) score += 2;
  if (!combined.includes('(place)')) score += 1;
  if (!combined.includes('(organization)')) score += 1;

  return score;
};

const scoreVocabulary = (variant, kanji, glosses) => {
  let score = 0;
  const priorities = Array.isArray(variant.priorities) ? variant.priorities : [];
  const word = variant.written || '';

  score += priorities.length * 40;
  if (priorities.some((item) => item.startsWith('news1') || item.startsWith('ichi1'))) score += 25;
  if (priorities.some((item) => item.startsWith('nf'))) score += 10;
  if (word.includes(kanji)) score += 20;
  if (word === kanji) score -= 20;
  score += Math.max(0, 12 - Math.abs(word.length - 2) * 3);
  score += scoreGloss(glosses);

  if (/^[0-9A-Za-z]/.test(word)) score -= 20;

  return score;
};

const dedupe = (items, getKey) => {
  const seen = new Set();
  const results = [];

  for (const item of items) {
    const key = getKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    results.push(item);
  }

  return results;
};

const decodeHtmlEntities = (input) =>
  input
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const translateCache = new Map();

const translateTextsToVietnamese = async (texts) => {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  const sanitizedTexts = texts.map((text) => text.trim()).filter(Boolean);

  if (!apiKey || sanitizedTexts.length === 0) {
    return [];
  }

  const results = new Array(sanitizedTexts.length);
  const uncachedTexts = [];
  const uncachedIndexes = [];

  sanitizedTexts.forEach((text, index) => {
    const cacheKey = `en::vi::${text}`;
    if (translateCache.has(cacheKey)) {
      results[index] = translateCache.get(cacheKey);
      return;
    }

    uncachedTexts.push(text);
    uncachedIndexes.push(index);
  });

  if (uncachedTexts.length > 0) {
    const body = new URLSearchParams();
    body.set('target', 'vi');
    body.set('source', 'en');
    body.set('format', 'text');

    for (const text of uncachedTexts) {
      body.append('q', text);
    }

    const response = await fetch(`${GOOGLE_TRANSLATE_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: body.toString(),
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.error?.message || 'Google Translate request failed');
    }

    const translated = (payload?.data?.translations || []).map((item) => decodeHtmlEntities(item?.translatedText || ''));

    translated.forEach((text, position) => {
      const original = uncachedTexts[position];
      const resultIndex = uncachedIndexes[position];
      const cacheKey = `en::vi::${original}`;
      translateCache.set(cacheKey, text);
      results[resultIndex] = text;
    });
  }

  return results.map((item, index) => item || sanitizedTexts[index]);
};

const selectExampleVocabulary = (kanji, wordsPayload, legacyExamples = []) => {
  const candidates = [];

  for (const entry of Array.isArray(wordsPayload) ? wordsPayload : []) {
    const glosses = (entry.meanings || []).flatMap((meaning) => meaning.glosses || []).filter(Boolean);
    const compactMeaningEn = glosses.slice(0, 2).join('; ');

    for (const variant of entry.variants || []) {
      if (!variant?.written || !variant.written.includes(kanji)) continue;

      candidates.push({
        word: variant.written,
        reading: variant.pronounced || '',
        meaningEn: compactMeaningEn,
        priorities: Array.isArray(variant.priorities) ? variant.priorities : [],
        score: scoreVocabulary(variant, kanji, glosses),
      });
    }
  }

  const ranked = dedupe(
    candidates.sort((left, right) => right.score - left.score),
    (item) => `${item.word}::${item.reading}`,
  )
    .slice(0, 4)
    .map(({ score, ...item }) => item);

  if (ranked.length > 0) {
    return ranked;
  }

  return dedupe(
    legacyExamples
      .filter((example) => example?.ja)
      .map((example) => ({
        word: example.ja,
        reading: '',
        meaningEn: '',
        meaning: example.vi || '',
        priorities: [],
      })),
    (item) => item.word,
  ).slice(0, 4);
};

const readExistingDataset = () => {
  if (!fs.existsSync(EXISTING_PATH)) return [];

  try {
    return JSON.parse(fs.readFileSync(EXISTING_PATH, 'utf8'));
  } catch {
    console.warn('Khong doc duoc dataset cu, se build moi tu dau.');
    return [];
  }
};

const parseLimit = () => {
  const arg = process.argv.find((item) => item.startsWith('--limit='));
  if (!arg) return null;

  const value = Number(arg.split('=')[1]);
  return Number.isFinite(value) && value > 0 ? value : null;
};

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${url}`);
  }

  return response.json();
};

const enrichVocabularyTranslations = async (exampleVocabulary) => {
  const meaningsToTranslate = exampleVocabulary.map((item) => item.meaningEn || '').filter(Boolean);
  const translated = await translateTextsToVietnamese(meaningsToTranslate);
  let translatedIndex = 0;

  return exampleVocabulary.map((item) => {
    if (!item.meaningEn) {
      return {
        ...item,
        meaning: item.meaning || '',
      };
    }

    const meaning = translated[translatedIndex] || item.meaning || item.meaningEn;
    translatedIndex += 1;

    return {
      ...item,
      meaning,
    };
  });
};

const buildKanjiItem = async (baseItem) => {
  const [detail, words] = await Promise.all([
    fetchJson(`${API_BASE}/kanji/${encodeURIComponent(baseItem.kanji)}`),
    fetchJson(`${API_BASE}/words/${encodeURIComponent(baseItem.kanji)}`),
  ]);

  const readings = {
    onyomi: Array.isArray(detail.on_readings) ? detail.on_readings : [],
    kunyomi: Array.isArray(detail.kun_readings) ? detail.kun_readings : [],
    nanori: Array.isArray(detail.name_readings) ? detail.name_readings : [],
  };

  const meaningsEn = Array.isArray(detail.meanings) && detail.meanings.length > 0 ? detail.meanings : [];
  const meaningsVi = await translateTextsToVietnamese(meaningsEn);
  const level = detail.jlpt ? `N${detail.jlpt}` : normalizeLevel(baseItem.level, 'N5');
  const exampleVocabularyRaw = selectExampleVocabulary(baseItem.kanji, words, baseItem.examples || []);
  const exampleVocabulary = await enrichVocabularyTranslations(exampleVocabularyRaw);
  const meaningEn = meaningsEn[0] || baseItem.meaningEn || '';
  const meaningVi = baseItem.meaningVi || meaningsVi[0] || baseItem.meaning || meaningEn || 'Chua co nghia';

  return {
    id: baseItem.id || `K_${baseItem.kanji}`,
    kanji: baseItem.kanji,
    meaning: meaningVi,
    meaningVi,
    meaningEn,
    meanings: meaningsEn,
    meaningsEn,
    meaningsVi,
    level,
    onyomi: toListString(readings.onyomi),
    kunyomi: toListString(readings.kunyomi),
    readings,
    meta: {
      strokeCount: detail.stroke_count || Number(baseItem.strokeCount || 0),
      grade: detail.grade ?? null,
      jlpt: detail.jlpt ?? null,
      frequency: detail.freq_mainichi_shinbun ?? null,
      unicode: detail.unicode || '',
    },
    strokeCount: detail.stroke_count || Number(baseItem.strokeCount || 0),
    examples: Array.isArray(baseItem.examples) ? baseItem.examples : [],
    exampleVocabulary,
    searchableText: [
      baseItem.kanji,
      meaningVi,
      meaningEn,
      ...meaningsEn,
      ...(meaningsVi.length > 0 ? meaningsVi : [meaningVi]),
      ...readings.onyomi,
      ...readings.kunyomi,
      ...readings.nanori,
      ...exampleVocabulary.flatMap((example) => [example.word, example.reading, example.meaning, example.meaningEn || '']),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
};

async function rebuildKanjiDataset() {
  const existing = readExistingDataset();
  const requestedLimit = parseLimit();

  let seedItems = existing;

  if (seedItems.length === 0) {
    const joyoList = await fetchJson(`${API_BASE}/kanji/joyo`);
    const limitedList = joyoList.slice(0, requestedLimit || DEFAULT_LIMIT);
    seedItems = limitedList.map((kanji) => ({
      id: `K_${kanji}`,
      kanji,
      meaning: '',
      meaningVi: '',
      meaningEn: '',
      level: 'N5',
      strokeCount: 0,
      examples: [],
    }));
  } else if (requestedLimit) {
    seedItems = seedItems.slice(0, requestedLimit);
  }

  console.log(`Dang rebuild ${seedItems.length} kanji vao ${OUTPUT_PATH}`);

  if (process.env.GOOGLE_TRANSLATE_API_KEY) {
    console.log('Google Translate: ON');
  } else {
    console.log('Google Translate: OFF (missing GOOGLE_TRANSLATE_API_KEY)');
  }

  const results = [];

  for (let index = 0; index < seedItems.length; index += BATCH_SIZE) {
    const batch = seedItems.slice(index, index + BATCH_SIZE);
    const batchResults = await Promise.allSettled(batch.map((item) => buildKanjiItem(item)));

    batchResults.forEach((result, offset) => {
      const seed = batch[offset];

      if (result.status === 'fulfilled') {
        results.push(result.value);
        return;
      }

      console.warn(`Bo qua ${seed.kanji}: ${result.reason?.message || result.reason}`);
      results.push({
        id: seed.id || `K_${seed.kanji}`,
        kanji: seed.kanji,
        meaning: seed.meaningVi || seed.meaning || 'Chua co nghia',
        meaningVi: seed.meaningVi || seed.meaning || 'Chua co nghia',
        meaningEn: seed.meaningEn || '',
        meanings: Array.isArray(seed.meaningsEn) ? seed.meaningsEn : [],
        meaningsEn: Array.isArray(seed.meaningsEn) ? seed.meaningsEn : [],
        meaningsVi: Array.isArray(seed.meaningsVi) ? seed.meaningsVi : [],
        level: normalizeLevel(seed.level, 'N5'),
        onyomi: seed.onyomi || EM_DASH,
        kunyomi: seed.kunyomi || EM_DASH,
        readings: {
          onyomi: [],
          kunyomi: [],
          nanori: [],
        },
        meta: {
          strokeCount: Number(seed.strokeCount || 0),
          grade: null,
          jlpt: null,
          frequency: null,
          unicode: seed.kanji.codePointAt(0)?.toString(16).toUpperCase() || '',
        },
        strokeCount: Number(seed.strokeCount || 0),
        examples: Array.isArray(seed.examples) ? seed.examples : [],
        exampleVocabulary: Array.isArray(seed.exampleVocabulary) ? seed.exampleVocabulary : [],
        searchableText: `${seed.kanji} ${seed.meaningVi || seed.meaning || ''} ${seed.meaningEn || ''}`.trim().toLowerCase(),
      });
    });

    console.log(`Da xong ${Math.min(index + BATCH_SIZE, seedItems.length)} / ${seedItems.length}`);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Hoan tat. Da ghi ${results.length} kanji.`);
}

rebuildKanjiDataset().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
