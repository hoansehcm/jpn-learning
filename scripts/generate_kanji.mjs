import fs from 'fs';
import path from 'path';

// Danh sách một số Kanji cơ bản N5, N4, N3, N2, N1 làm mẫu khởi đầu thực tế.
// Script này sẽ tự động sinh và mở rộng dữ liệu để có hàng ngàn chữ.
// Trong thực tế, bạn sẽ lấy từ một nguồn như kanjiapi.dev hoặc KANJIDIC.

const generateKanjiDatabase = async () => {
    console.log("Đang tạo cơ sở dữ liệu Jōyō Kanji...");

    try {
        // Lấy danh sách Jōyō Kanji (thường dùng) từ API kanjiapi.dev
        const res = await fetch('https://kanjiapi.dev/v1/kanji/joyo');
        const kanjis = await res.json();
        
        let database = [];
        let count = 0;
        const total = Math.min(kanjis.length, 5000); // Lấy khoảng up to 2136 chữ Joyo, giả lập 5000
        
        console.log(`Bắt đầu tải chi tiết ${total} Kanji. Có thể mất một chút thời gian...`);

        // Để tránh limit của API công khai, ta sẽ lấy mẫu 200 chữ Joyo, còn lại gen tự động cho đủ 5000
        // Trong môi trường thực tế, quá trình tải toàn bộ dictionary offline từ kanjidic2 là tốt nhất.
        // Ở đây, ta lấy ~200 chữ thật từ API, các chữ còn lại thêm ngẫu nhiên để demo hiệu năng rendering của bạn
        
        const REAL_PULL_COUNT = 150;
        
        for (let i = 0; i < REAL_PULL_COUNT; i++) {
            const char = kanjis[i];
            const detailRes = await fetch(`https://kanjiapi.dev/v1/kanji/${char}`);
            const data = await detailRes.json();
            
            // Xếp cấp độ giả định (JLPT N5-N1) dựa trên grade
            let level = "N5";
            if (data.grade > 8) level = "N1";
            else if (data.grade > 6) level = "N2";
            else if (data.grade > 4) level = "N3";
            else if (data.grade > 2) level = "N4";

            database.push({
                id: `K_${char}`,
                kanji: char,
                onyomi: data.on_readings.join(', ') || '—',
                kunyomi: data.kun_readings.join(', ') || '—',
                meaning: data.meanings.slice(0, 3).join(', ') || 'Không rõ',
                level: level,
                strokeCount: data.stroke_count,
                examples: [
                    { ja: `${char} (ví dụ giả định)`, vi: `Nghĩa ví dụ liên quan đến ${data.meanings[0]}` }
                ]
            });
            count++;
            if (count % 25 === 0) console.log(`Đã tải ${count}/${REAL_PULL_COUNT} kanji...`);
        }
        
        // Sinh thêm Kanji giả định cho đến khi chạm mốc 5000 để test UI rendering pagination
        console.log("Đang sinh thêm dữ liệu giả lập cho đủ 5000 Kanji (Test Load)...");
        for (let i = REAL_PULL_COUNT; i < 5000; i++) {
            const fakeChar = String.fromCharCode(19968 + i); // Các chữ cái Kanji từ U+4E00 trở đi
            const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
            database.push({
                id: `KF_${i}`,
                kanji: fakeChar,
                onyomi: 'オン',
                kunyomi: 'くん',
                meaning: `Nghĩa của chữ ${i}`,
                level: levels[i % 5],
                strokeCount: (i % 20) + 1,
                examples: [
                    { ja: `${fakeChar}のテスト`, vi: "Đây là ví dụ test load" },
                    { ja: `毎日${fakeChar}`, vi: "Từ ngữ thêm vào" }
                ]
            });
        }

        const outPath = path.join(process.cwd(), 'public', 'data', 'kanji_data.json');
        fs.writeFileSync(outPath, JSON.stringify(database, null, 2), 'utf-8');
        console.log(`ĐÃ TẠO THÀNH CÔNG: ${database.length} Kanji tại ${outPath}`);

    } catch (e) {
        console.error("Lỗi:", e);
    }
};

generateKanjiDatabase();
