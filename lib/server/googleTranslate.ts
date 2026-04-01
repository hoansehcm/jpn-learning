const GOOGLE_TRANSLATE_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

export class GoogleTranslateConfigError extends Error {}

interface GoogleTranslateResponse {
  data?: {
    translations?: Array<{
      translatedText?: string;
    }>;
  };
  error?: {
    message?: string;
  };
}

const decodeHtmlEntities = (input: string) =>
  input
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

export async function translateTextsToVietnamese(texts: string[], source = 'en') {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  if (!apiKey) {
    throw new GoogleTranslateConfigError('Missing GOOGLE_TRANSLATE_API_KEY');
  }

  const sanitizedTexts = texts.map((text) => text.trim()).filter(Boolean);

  if (sanitizedTexts.length === 0) {
    return [];
  }

  const body = new URLSearchParams();
  body.set('target', 'vi');
  body.set('source', source);
  body.set('format', 'text');

  for (const text of sanitizedTexts) {
    body.append('q', text);
  }

  const response = await fetch(`${GOOGLE_TRANSLATE_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: body.toString(),
    cache: 'no-store',
  });

  const payload = (await response.json()) as GoogleTranslateResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message || 'Google Translate request failed');
  }

  return (payload.data?.translations || []).map((item) => decodeHtmlEntities(item.translatedText || ''));
}
