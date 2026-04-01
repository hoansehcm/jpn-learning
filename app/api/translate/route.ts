import { NextRequest, NextResponse } from 'next/server';
import { GoogleTranslateConfigError, translateTextsToVietnamese } from '../../../lib/server/googleTranslate';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const texts = Array.isArray(body?.texts) ? body.texts.filter((item: unknown) => typeof item === 'string') : [];
    const source = typeof body?.source === 'string' ? body.source : 'en';

    if (texts.length === 0) {
      return NextResponse.json({ error: 'texts is required' }, { status: 400 });
    }

    const translations = await translateTextsToVietnamese(texts, source);
    return NextResponse.json({ translations });
  } catch (error) {
    if (error instanceof GoogleTranslateConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation request failed' },
      { status: 500 },
    );
  }
}
