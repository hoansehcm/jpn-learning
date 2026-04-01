export interface KanjiUsageExample {
  ja: string;
  vi: string;
}

export interface KanjiVocabularyExample {
  word: string;
  reading: string;
  meaning: string;
  meaningEn?: string;
  priorities: string[];
}

export interface KanjiReadings {
  onyomi: string[];
  kunyomi: string[];
  nanori: string[];
}

export interface KanjiMeta {
  strokeCount: number;
  grade: number | null;
  jlpt: number | null;
  frequency: number | null;
  unicode: string;
}

export interface RawKanjiItem {
  id: string;
  kanji: string;
  onyomi?: string | string[];
  kunyomi?: string | string[];
  meaning?: string;
  meaningEn?: string;
  meaningVi?: string;
  meanings?: string[];
  meaningsEn?: string[];
  meaningsVi?: string[];
  level?: string | string[];
  strokeCount?: number | string;
  examples?: KanjiUsageExample[];
  exampleVocabulary?: KanjiVocabularyExample[];
  readings?: Partial<KanjiReadings>;
  meta?: Partial<KanjiMeta>;
  searchableText?: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  meaning: string;
  meaningEn: string;
  meanings: string[];
  meaningsEn: string[];
  level: string;
  onyomi: string;
  kunyomi: string;
  readings: KanjiReadings;
  meta: KanjiMeta;
  examples: KanjiUsageExample[];
  exampleVocabulary: KanjiVocabularyExample[];
  searchableText: string;
}

const EMPTY_MARKERS = new Set(['', '-', '\u2014', 'N/A', 'n/a', 'null', 'undefined']);

const splitReadingString = (value: string) =>
  value
    .split(/[\u3001,;/]/)
    .map((item) => item.trim())
    .filter((item) => !EMPTY_MARKERS.has(item));

export const toStringArray = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => splitReadingString(String(item)))
      .filter((item, index, list) => list.indexOf(item) === index);
  }

  if (typeof value === 'string') {
    return splitReadingString(value).filter((item, index, list) => list.indexOf(item) === index);
  }

  return [];
};

export const joinJapaneseList = (items: string[]) => (items.length > 0 ? items.join('\u3001') : '\u2014');

export const normalizeKanjiLevel = (value?: string | string[]) => {
  const raw = Array.isArray(value) ? value[0] : value;

  if (!raw) return 'N5';

  if (/^N[1-5]$/i.test(raw)) {
    return raw.toUpperCase();
  }

  if (/^[1-5]$/.test(raw)) {
    return `N${raw}`;
  }

  return raw;
};

const normalizeUsageExamples = (examples?: KanjiUsageExample[]) =>
  Array.isArray(examples)
    ? examples
        .filter((example) => example && (example.ja || example.vi))
        .map((example) => ({
          ja: example.ja?.trim() || '',
          vi: example.vi?.trim() || '',
        }))
    : [];

const normalizeVocabularyExamples = (examples?: KanjiVocabularyExample[]) =>
  Array.isArray(examples)
    ? examples
        .filter((example) => example && example.word)
        .map((example) => ({
          word: example.word.trim(),
          reading: example.reading?.trim() || '',
          meaning: example.meaning?.trim() || '',
          meaningEn: example.meaningEn?.trim() || '',
          priorities: Array.isArray(example.priorities) ? example.priorities.filter(Boolean) : [],
        }))
    : [];

export const buildKanjiSearchText = (item: {
  kanji: string;
  meaning: string;
  meaningEn: string;
  meanings: string[];
  meaningsEn: string[];
  readings: KanjiReadings;
  exampleVocabulary: KanjiVocabularyExample[];
}) =>
  [
    item.kanji,
    item.meaning,
    item.meaningEn,
    ...item.meanings,
    ...item.meaningsEn,
    ...item.readings.onyomi,
    ...item.readings.kunyomi,
    ...item.readings.nanori,
    ...item.exampleVocabulary.flatMap((example) => [example.word, example.reading, example.meaning, example.meaningEn || '']),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

export const normalizeKanjiItem = (item: RawKanjiItem): KanjiItem => {
  const readings: KanjiReadings = {
    onyomi: item.readings?.onyomi?.length ? item.readings.onyomi : toStringArray(item.onyomi),
    kunyomi: item.readings?.kunyomi?.length ? item.readings.kunyomi : toStringArray(item.kunyomi),
    nanori: item.readings?.nanori?.length ? item.readings.nanori : [],
  };

  const meaningVi = item.meaningVi?.trim() || item.meaning?.trim() || 'Ch\u01b0a c\u00f3 ngh\u0129a';
  const meaningEn = item.meaningEn?.trim() || (Array.isArray(item.meaningsEn) ? item.meaningsEn[0] : '') || '';
  const meaningsVi =
    Array.isArray(item.meaningsVi) && item.meaningsVi.length > 0
      ? item.meaningsVi.map((entry) => entry.trim()).filter(Boolean)
      : [meaningVi];
  const meaningsEn =
    Array.isArray(item.meaningsEn) && item.meaningsEn.length > 0
      ? item.meaningsEn.map((entry) => entry.trim()).filter(Boolean)
      : Array.isArray(item.meanings)
        ? item.meanings.map((entry) => entry.trim()).filter(Boolean)
        : meaningEn
          ? [meaningEn]
          : [];

  const exampleVocabulary = normalizeVocabularyExamples(item.exampleVocabulary);

  const normalized: KanjiItem = {
    id: item.id,
    kanji: item.kanji,
    meaning: meaningVi,
    meaningEn,
    meanings: meaningsVi,
    meaningsEn,
    level: normalizeKanjiLevel(item.level),
    onyomi: joinJapaneseList(readings.onyomi),
    kunyomi: joinJapaneseList(readings.kunyomi),
    readings,
    meta: {
      strokeCount: Number(item.meta?.strokeCount ?? item.strokeCount ?? 0),
      grade: item.meta?.grade ?? null,
      jlpt:
        item.meta?.jlpt ?? (normalizeKanjiLevel(item.level).startsWith('N') ? Number(normalizeKanjiLevel(item.level).slice(1)) : null),
      frequency: item.meta?.frequency ?? null,
      unicode: item.meta?.unicode ?? item.kanji.codePointAt(0)?.toString(16).toUpperCase() ?? '',
    },
    examples: normalizeUsageExamples(item.examples),
    exampleVocabulary,
    searchableText:
      item.searchableText ||
      buildKanjiSearchText({
        kanji: item.kanji,
        meaning: meaningVi,
        meaningEn,
        meanings: meaningsVi,
        meaningsEn,
        readings,
        exampleVocabulary,
      }),
  };

  return normalized;
};
