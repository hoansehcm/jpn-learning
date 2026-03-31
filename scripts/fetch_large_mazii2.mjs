import fs from 'fs';
import path from 'path';

async function fetchLargeKanjiDataset() {
  console.log('Bat dau quy trinh lay data Kanji sieu lon...');
  try {
    console.log('1. Fetch danh sach Joyo Kanji...');
    const listRes = await fetch('https://kanjiapi.dev/v1/kanji/joyo');
    const joyoList = await listRes.json();
    
    const kanjisToFetch = joyoList.slice(0, 500); 
    console.log('Da chon ' + kanjisToFetch.length + ' chu. Bat dau lay nghia tu Mazii...');

    const database = [];

    const fetchMazii = async (char) => {
      try {
        const res = await fetch('https://mazii.net/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dict: 'javi', type: 'kanji', query: char, limit: 1, page: 1 })
        });
        const data = await res.json();
        
        if (data && data.results && data.results.length > 0) {
          return data.results[0];
        }
      } catch (err) {}
      return null;
    };

    const batchSize = 10;
    for (let i = 0; i < kanjisToFetch.length; i += batchSize) {
      const batch = kanjisToFetch.slice(i, i + batchSize);
      
      const results = await Promise.all(batch.map(async (k) => {
        const item = await fetchMazii(k);
        if (item) {
          const on = item.onyomi || '—';
          const kun = item.kunyomi || '—';
          const hanViet = item.mean || 'KHONG RO';
          let mean = 'Khong giai nghia';
          if (item.detail && typeof item.detail === 'string') {
              mean = item.detail.split(',')[0];
          }
          
          return {
            id: 'K_' + k,
            kanji: item.kanji || k,
            onyomi: on,
            kunyomi: kun,
            meaning: hanViet.toUpperCase() + ' (' + mean + ')',
            level: item.level || 'N4',
            strokeCount: item.stroke_count || 1,
            examples: item.examples 
                ? item.examples.slice(0, 2).map((ex) => ({ ja: ex.w, vi: ex.m })) 
                : []
          };
        }
        return null;
      }));

      results.forEach(res => {
          if (res) database.push(res);
      });
      
      console.log('Da tai xong ' + (i + batchSize) + ' / ' + kanjisToFetch.length + ' chu...');
    }

    const outPath = path.join(process.cwd(), 'public', 'data', 'kanji_data.json');
    fs.writeFileSync(outPath, JSON.stringify(database, null, 2), 'utf-8');
    console.log('Hoan tat. Da luu ' + database.length + ' chu!');
    
  } catch (error) {
    console.error('Loi:', error);
  }
}

fetchLargeKanjiDataset();
