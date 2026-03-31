import fs from 'fs';
import path from 'path';

// Danh sách ~80 Kanji cơ bản thường được tra cứu (JLPT N5)
const kanjiList = [
    "日", "一", "国", "人", "年", "大", "十", "二", "本", "中", "長", "出", "三", "時", "行", "見", "月", "後",
    "前", "生", "五", "間", "上", "東", "四", "今", "金", "九", "入", "学", "高", "円", "子", "外", "八", "六",
    "下", "来", "気", "小", "七", "山", "話", "女", "北", "午", "百", "書", "先", "名", "川", "千", "水", "半",
    "男", "西", "電", "校", "語", "土", "木", "聞", "食", "車", "何", "南", "万", "毎", "白", "天", "母", "火",
    "右", "読", "友", "左", "休", "父", "雨"
];

async function fetchKanjiDict() {
    console.log('Bắt đầu tải dữ liệu chuẩn xác từ từ điển cho', kanjiList.length, 'chữ Kanji...');

    const database = [];

    for (let i = 0; i < kanjiList.length; i++) {
        const k = kanjiList[i];
        try {
            const res = await fetch('https://mazii.net/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                },
                body: JSON.stringify({
                    dict: "javi",
                    type: "kanji",
                    query: k,
                    limit: 1,
                    page: 1
                })
            });

            const data = await res.json();

            if (data && data.results && data.results.length > 0) {
                const item = data.results[0];

                // Chuẩn hóa Onyomi, Kunyomi
                const on = item.onyomi ? item.onyomi.split(',').map(x => x.trim()).join(', ') : '—';
                const kun = item.kunyomi ? item.kunyomi.split(',').map(x => x.trim()).join(', ') : '—';

                // Nghĩa tiếng việt thường nằm ở item.mean, kèm Hán Việt ở item.kanji
                // Đôi lúc Hán Việt nằm ở mean. Nên tách ra:
                let hanViet = item.mean || "KHÔNG RÕ";
                let mean = item.detail ? item.detail.split(',')[0] : "Không có giải nghĩa ngắn";

                // Tạo chuỗi Meaning gọn gàng: "NHẬT (mặt trời)"
                const meaningText = \`\${hanViet.toUpperCase()} (\${mean})\`;

        database.push({
          id: \`K_\${i}\`,
          kanji: item.kanji || k,
          onyomi: on,
          kunyomi: kun,
          meaning: meaningText,
          level: item.level || 'N5',
          strokeCount: item.stroke_count || 1,
          examples: item.examples 
             ? item.examples.slice(0, 2).map((ex) => ({
                 ja: ex.w,
                 vi: ex.m
               }))
             : [{ja: \`\${k}の言葉\`, vi: "Chưa có dữ liệu ví dụ"}]
        });
      }
      
      // Delay chút để tránh limit
      await new Promise(r => setTimeout(r, 200));

      if ((i + 1) % 10 === 0) {
        console.log(\`Đã tải \${i + 1} / \${kanjiList.length} chữ...\`);
      }
    } catch (err) {
      console.log('Lỗi khi tải chữ:', k, err.message);
    }
  }

  const outPath = path.join(process.cwd(), 'public', 'data', 'kanji_data.json');
  fs.writeFileSync(outPath, JSON.stringify(database, null, 2), 'utf-8');
  console.log(\`Đã tạo xong và ghi vào \${outPath} thành công! Khôn còn dữ liệu giả.\`);
}

fetchKanjiDict();
