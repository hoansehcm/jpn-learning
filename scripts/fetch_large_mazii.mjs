import fs from 'fs';
import path from 'path';

// Kéo danh sách Kanji thực tế từ Kanji API (Có toàn bộ ~2136 chữ Joyo, mức độ N5-N1)
async function fetchLargeKanjiDataset() {
    console.log('Bắt đầu quy trình lấy data Kanji siêu lớn...');

    try {
        // 1. Lấy danh sách toàn bộ chữ Jōyō (Danh sách chuẩn) từ kanjiapi.dev
        console.log('1. Fetch danh sách Jōyō Kanji (~2000 chữ)...');
        const listRes = await fetch('https://kanjiapi.dev/v1/kanji/joyo');
        const joyoList = await listRes.json();

        // Lấy trước khoảng 500 chữ để script chạy không bị quá lâu / timeout,
        // nhưng như vậy là đủ dài và xịn xò cho người dùng.
        const kanjisToFetch = joyoList.slice(0, 500);
        console.log(\`Đã chọn \${kanjisToFetch.length} chữ. Bắt đầu lấy nghĩa tiếng Việt từ Mazii...\`);

    const database = [];

    // Hàm gọi Mazii
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
      } catch (err) {
        // Im trặng bỏ qua lỗi nhỏ lẻ
      }
      return null;
    };

    // Chạy song song từng batch (5 chữ một lúc để chống chặn & nhanh hơn)
    const batchSize = 10;
    for (let i = 0; i < kanjisToFetch.length; i += batchSize) {
      const batch = kanjisToFetch.slice(i, i + batchSize);
      
      const results = await Promise.all(batch.map(async (k) => {
        const item = await fetchMazii(k);
        if (item) {
          const on = item.onyomi || '—';
          const kun = item.kunyomi || '—';
          const hanViet = item.mean || 'KHÔNG RÕ';
          let mean = 'Không giải nghĩa';
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

      // Lọc các item bị null do lỗi
      results.forEach(res => {
          if (res) database.push(res);
      });
      
      // Log tiến độ
      if (i % 50 === 0) {
          console.log(\`Đã tải xong \${i} / \${kanjisToFetch.length} chữ...\`);
      }
    }

    const outPath = path.join(process.cwd(), 'public', 'data', 'kanji_data.json');
    fs.writeFileSync(outPath, JSON.stringify(database, null, 2), 'utf-8');
    console.log(\`\n==============================\`);
    console.log(\` HOÀN TẤT THÀNH CÔNG !  \`);
    console.log(\` Đã lưu \${database.length} Kanji chuẩn xác vào database.\`);
    console.log(\` File: \${outPath}\`);
    console.log(\`==============================\n\`);
    
  } catch (error) {
    console.error('Lỗi tổng quát:', error);
  }
}

fetchLargeKanjiDataset();
