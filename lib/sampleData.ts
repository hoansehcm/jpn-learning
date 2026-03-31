export const sampleVocabulary = [
  {
    id: 'v1',
    word: '食べる',
    kana: 'たべる',
    romaji: 'taberu',
    meaning: 'Ăn',
    level: 'N5',
    type: 'Động từ nhóm 2',
    examples: [
      { ja: '私はりんごを食べる。', vi: 'Tôi ăn táo.' },
      { ja: '朝ごはんを食べましたか。', vi: 'Bạn đã ăn sáng chưa?' }
    ]
  },
  {
    id: 'v2',
    word: '飲む',
    kana: 'のむ',
    romaji: 'nomu',
    meaning: 'Uống',
    level: 'N5',
    type: 'Động từ nhóm 1',
    examples: [
      { ja: '水を飲む。', vi: 'Uống nước.' }
    ]
  },
  {
    id: 'v3',
    word: '学校',
    kana: 'がっこう',
    romaji: 'gakkou',
    meaning: 'Trường học',
    level: 'N5',
    type: 'Danh từ',
    examples: [
      { ja: '学校へ行く。', vi: 'Đi đến trường.' }
    ]
  },
  {
    id: 'v4',
    word: '先生',
    kana: 'せんせい',
    romaji: 'sensei',
    meaning: 'Giáo viên',
    level: 'N5',
    type: 'Danh từ',
    examples: [
      { ja: 'あの人は先生です。', vi: 'Người kia là giáo viên.' }
    ]
  },
  {
    id: 'v5',
    word: '勉強',
    kana: 'べんきょう',
    romaji: 'benkyou',
    meaning: 'Học tập',
    level: 'N5',
    type: 'Danh từ / Động từ nhóm 3',
    examples: [
      { ja: '日本語を勉強する。', vi: 'Học tiếng Nhật.' }
    ]
  }
];

export const sampleGrammar = [
  {
    id: 'g1',
    pattern: '〜は〜です',
    meaning: '... là ...',
    explanation: 'Dùng để giới thiệu, khẳng định một sự vật, sự việc.',
    level: 'N5',
    examples: [
      { ja: '私は学生です。', vi: 'Tôi là học sinh.' },
      { ja: 'これは本です。', vi: 'Đây là quyển sách.' }
    ]
  },
  {
    id: 'g2',
    pattern: '〜を〜ます',
    meaning: 'Làm hành động V tác động lên tân ngữ O',
    explanation: 'Trợ từ を chỉ đối tượng tác động của hành động.',
    level: 'N5',
    examples: [
      { ja: 'ご飯を食べます。', vi: 'Ăn cơm.' }
    ]
  }
];

export const sampleKanji = [
  {
    id: 'k1',
    kanji: '日',
    onyomi: 'ニチ、ジツ',
    kunyomi: 'ひ、-び、-か',
    meaning: 'Ngày, Mặt trời',
    level: 'N5',
    strokeCount: 4,
    examples: [
      { ja: '日本 (にほん)', vi: 'Nhật Bản' },
      { ja: '日曜日 (にちようび)', vi: 'Chủ nhật' }
    ]
  },
  {
    id: 'k2',
    kanji: '月',
    onyomi: 'ゲツ、ガツ',
    kunyomi: 'つき',
    meaning: 'Tháng, Mặt trăng',
    level: 'N5',
    strokeCount: 4,
    examples: [
      { ja: '月曜日 (げつようび)', vi: 'Thứ hai' },
      { ja: '一月 (いちがつ)', vi: 'Tháng một' }
    ]
  }
];
