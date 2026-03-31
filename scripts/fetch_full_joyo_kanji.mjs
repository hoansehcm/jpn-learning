import fs from 'fs';
import path from 'path';

// Kéo toàn bộ danh sách Joyo Kanji (~2136 chữ) từ kanjiapi và Mazii
async function fetchFullKanjiDataset() {
    console.log('Bắt đầu quy trình lấy data toàn bộ 2136+ Kanji Joyo...');

    try {
        console.log('1. Fetch danh sách Jōyō Kanji (~2136 chữ)...');
        const listRes = await fetch('https://kanjiapi.dev/v1/kanji/joyo');      
        const joyoList = await listRes.json();

        // Lấy tất cả chữ
        const kanjisToFetch = joyoList;
        console.log(`Đã kéo danh sách ${kanjisToFetch.length} chữ. Bắt đầu lấy nghĩa tiếng Việt từ Mazii...`);

        // Đọc data cũ nếu có để không bị ghi đè các chữ đã crawl thành công
        const outPath = path.join(process.cwd(), 'public', 'data', 'kanji_data.json');
        let database = [];
        if (fs.existsSync(outPath)) {
            try {
                database = JSON.parse(fs.readFileSync(outPath, 'utf8'));
                console.log(`Tiếp tục với ${database.length} chữ đã crawl...`);
            } catch(e) {}
        }
        
        // Mảng các từ cần fetch (bỏ qua từ đã có)
        const existingKanjis = new Set(database.map(k => k.kanji));
        const missingKanjis = kanjisToFetch.filter(k => !existingKanjis.has(k));
        
        console.log(`Cần tải thêm: ${missingKanjis.length} chữ.`);

        // Hàm gọi API Mazii
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
                // Ignore
            }
            return null;
        };

        // Chạy song song từng batch nhỏ (5 chữ một lúc, delay 500ms để chống chặn IP)
        const batchSize = 10;
        let newlyAdded = 0;
        
        for (let i = 0; i < missingKanjis.length; i += batchSize) {
            const batch = missingKanjis.slice(i, i + batchSize);

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
                } else {
                    // Fallback nếu không có trên Mazii
                    return {
                        id: 'K_' + k,
                        kanji: k,
                        onyomi: '—',
                        kunyomi: '—',
                        meaning: 'CHƯA RÕ (Ngôn ngữ đang mượn Hán Tự)',
                        level: 'N3',
                        strokeCount: 0,
                        examples: []
                    };
                }
            }));

            results.forEach(res => {
                if (res) {
                    database.push(res);
                    newlyAdded++;
                }
            });

            if (i % 50 === 0 && i !== 0) {
                console.log(`Đã tải thêm ${i} / ${missingKanjis.length} chữ...`);
                // Ghi đệm liên tục để không mất dữ liệu nếu lỗi
                fs.writeFileSync(outPath, JSON.stringify(database, null, 2), 'utf-8');
            }
            
            // Nghỉ một tí để không làm sập Mazii
            await new Promise(r => setTimeout(r, 600));
        }

        fs.writeFileSync(outPath, JSON.stringify(database, null, 2), 'utf-8');      
        console.log(`\n==============================`);
        console.log(` HOÀN TẤT THÀNH CÔNG !  `);
        console.log(` Đã bổ sung thêm: ${newlyAdded} chữ.`);
        console.log(` Tổng số Kanban cập nhật: ${database.length} chữ.`);
        console.log(` File: ${outPath}`);
        console.log(`==============================\n`);

    } catch (error) {
        console.error('Lỗi tổng quát:', error);
    }
}

fetchFullKanjiDataset();