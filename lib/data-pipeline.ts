/**
 * Data Pipeline Adapters
 * 
 * This file contains the structure for importing and processing data from
 * standard Japanese dictionary sources: JMdict, KANJIDIC2, and Tatoeba.
 * 
 * In a production environment, these functions would be run in a Node.js
 * backend environment (e.g., Firebase Cloud Functions or a separate worker)
 * to parse the large XML/CSV files and populate the Firestore database.
 */

import { db } from './firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';

// --- JMdict (Vocabulary) ---
export interface JMdictEntry {
  id: string;
  kanji: string[];
  reading: string[];
  meanings: {
    pos: string[]; // Part of speech
    glosses: string[]; // Meanings
    info?: string;
  }[];
  jlpt?: string; // N5-N1
}

export const importJMdict = async (entries: JMdictEntry[]) => {
  // In reality, this would read an XML file, parse it, and batch write to Firestore.
  console.log(`Importing ${entries.length} JMdict entries...`);
  
  const batch = writeBatch(db);
  const vocabRef = collection(db, 'vocabulary');

  entries.forEach(entry => {
    const docRef = doc(vocabRef, entry.id);
    batch.set(docRef, {
      kanji: entry.kanji,
      reading: entry.reading,
      meanings: entry.meanings,
      jlpt: entry.jlpt || 'Unknown',
      source: 'JMdict',
      updatedAt: new Date().toISOString()
    });
  });

  await batch.commit();
  console.log('JMdict import complete.');
};


// --- KANJIDIC2 (Kanji) ---
export interface KanjidicEntry {
  kanji: string;
  grade: number;
  strokeCount: number;
  meanings: string[];
  onyomi: string[];
  kunyomi: string[];
  jlpt?: string;
}

export const importKanjidic = async (entries: KanjidicEntry[]) => {
  console.log(`Importing ${entries.length} KANJIDIC2 entries...`);
  
  const batch = writeBatch(db);
  const kanjiRef = collection(db, 'kanji');

  entries.forEach(entry => {
    const docRef = doc(kanjiRef, entry.kanji); // Use kanji character as ID
    batch.set(docRef, {
      kanji: entry.kanji,
      grade: entry.grade,
      strokeCount: entry.strokeCount,
      meanings: entry.meanings,
      onyomi: entry.onyomi,
      kunyomi: entry.kunyomi,
      jlpt: entry.jlpt || 'Unknown',
      source: 'KANJIDIC2',
      updatedAt: new Date().toISOString()
    });
  });

  await batch.commit();
  console.log('KANJIDIC2 import complete.');
};


// --- Tatoeba (Example Sentences) ---
export interface TatoebaSentence {
  id: string;
  japanese: string;
  translation: string; // Vietnamese or English
  language: 'vie' | 'eng';
  tags?: string[];
}

export const importTatoeba = async (sentences: TatoebaSentence[]) => {
  console.log(`Importing ${sentences.length} Tatoeba sentences...`);
  
  const batch = writeBatch(db);
  const sentencesRef = collection(db, 'sentences');

  sentences.forEach(sentence => {
    const docRef = doc(sentencesRef, sentence.id);
    batch.set(docRef, {
      japanese: sentence.japanese,
      translation: sentence.translation,
      language: sentence.language,
      tags: sentence.tags || [],
      source: 'Tatoeba',
      updatedAt: new Date().toISOString()
    });
  });

  await batch.commit();
  console.log('Tatoeba import complete.');
};

/**
 * Helper function to search Jisho.org API (which uses JMdict)
 * This can be used client-side for real-time lookups if a word isn't in our DB.
 */
export const searchJisho = async (keyword: string) => {
  try {
    // Note: Jisho API doesn't support CORS directly from browser in all cases,
    // so in production this might need to go through a proxy API route.
    const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.data; // Array of Jisho results
  } catch (error) {
    console.error('Error fetching from Jisho API:', error);
    return null;
  }
};
