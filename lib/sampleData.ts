export interface ExampleItem {
  ja: string;
  vi: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  kana: string;
  romaji: string;
  meaning: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  type: string;
  examples: ExampleItem[];
}

export interface GrammarItem {
  id: string;
  pattern: string;
  meaning: string;
  explanation: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  examples: ExampleItem[];
}

export interface KanjiItem {
  id: string;
  kanji: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  strokeCount: number;
  examples: ExampleItem[];
}

export const jlptLevels = ['N5', 'N4', 'N3', 'N2', 'N1'] as const;

export const sampleVocabulary: VocabularyItem[] = [
  {
    id: 'v1',
    word: '食べる',
    kana: 'たべる',
    romaji: 'taberu',
    meaning: 'ăn',
    level: 'N5',
    type: 'Động từ nhóm 2',
    examples: [
      { ja: '毎朝パンを食べます。', vi: 'Mỗi sáng tôi ăn bánh mì.' },
      { ja: '野菜をもっと食べたほうがいいです。', vi: 'Bạn nên ăn nhiều rau hơn.' },
    ],
  },
  {
    id: 'v2',
    word: '飲む',
    kana: 'のむ',
    romaji: 'nomu',
    meaning: 'uống',
    level: 'N5',
    type: 'Động từ nhóm 1',
    examples: [
      { ja: '水をたくさん飲んでください。', vi: 'Hãy uống nhiều nước.' },
      { ja: '仕事のあとでコーヒーを飲みます。', vi: 'Sau giờ làm tôi uống cà phê.' },
    ],
  },
  {
    id: 'v3',
    word: '学校',
    kana: 'がっこう',
    romaji: 'gakkou',
    meaning: 'trường học',
    level: 'N5',
    type: 'Danh từ',
    examples: [
      { ja: '弟は学校へ行きました。', vi: 'Em trai tôi đã đến trường.' },
      { ja: '学校の図書館は静かです。', vi: 'Thư viện của trường rất yên tĩnh.' },
    ],
  },
  {
    id: 'v4',
    word: '先生',
    kana: 'せんせい',
    romaji: 'sensei',
    meaning: 'giáo viên',
    level: 'N5',
    type: 'Danh từ',
    examples: [
      { ja: '田中先生はとても親切です。', vi: 'Cô Tanaka rất tốt bụng.' },
      { ja: '先生に質問をしました。', vi: 'Tôi đã hỏi giáo viên.' },
    ],
  },
  {
    id: 'v5',
    word: '勉強する',
    kana: 'べんきょうする',
    romaji: 'benkyou suru',
    meaning: 'học tập',
    level: 'N5',
    type: 'Danh từ / Động từ nhóm 3',
    examples: [
      { ja: '毎日日本語を勉強しています。', vi: 'Mỗi ngày tôi đang học tiếng Nhật.' },
      { ja: '図書館で勉強するのが好きです。', vi: 'Tôi thích học ở thư viện.' },
    ],
  },
  {
    id: 'v6',
    word: '行く',
    kana: 'いく',
    romaji: 'iku',
    meaning: 'đi',
    level: 'N5',
    type: 'Động từ nhóm 1',
    examples: [
      { ja: '週末に友だちと映画を見に行きます。', vi: 'Cuối tuần tôi đi xem phim với bạn.' },
      { ja: '来年日本へ行きたいです。', vi: 'Năm sau tôi muốn đi Nhật.' },
    ],
  },
  {
    id: 'v7',
    word: '見る',
    kana: 'みる',
    romaji: 'miru',
    meaning: 'xem, nhìn',
    level: 'N5',
    type: 'Động từ nhóm 2',
    examples: [
      { ja: '昨日アニメを見ました。', vi: 'Hôm qua tôi đã xem anime.' },
      { ja: '窓から海が見えます。', vi: 'Có thể nhìn thấy biển từ cửa sổ.' },
    ],
  },
  {
    id: 'v8',
    word: '大きい',
    kana: 'おおきい',
    romaji: 'ookii',
    meaning: 'to, lớn',
    level: 'N5',
    type: 'Tính từ đuôi い',
    examples: [
      { ja: 'あの建物はとても大きいです。', vi: 'Tòa nhà kia rất lớn.' },
      { ja: '大きい声で読んでください。', vi: 'Hãy đọc với giọng lớn.' },
    ],
  },
  {
    id: 'v9',
    word: '本',
    kana: 'ほん',
    romaji: 'hon',
    meaning: 'sách',
    level: 'N5',
    type: 'Danh từ',
    examples: [
      { ja: 'この本はやさしいです。', vi: 'Quyển sách này dễ.' },
      { ja: '駅で本を買いました。', vi: 'Tôi đã mua sách ở ga.' },
    ],
  },
  {
    id: 'v10',
    word: '車',
    kana: 'くるま',
    romaji: 'kuruma',
    meaning: 'ô tô',
    level: 'N5',
    type: 'Danh từ',
    examples: [
      { ja: '父は新しい車を買いました。', vi: 'Bố tôi đã mua ô tô mới.' },
      { ja: '車で会社まで行きます。', vi: 'Tôi đi đến công ty bằng ô tô.' },
    ],
  },
  {
    id: 'v11',
    word: '仕事',
    kana: 'しごと',
    romaji: 'shigoto',
    meaning: 'công việc',
    level: 'N4',
    type: 'Danh từ',
    examples: [
      { ja: '今日は仕事が忙しいです。', vi: 'Hôm nay công việc bận.' },
      { ja: '仕事のあとで日本語学校に通っています。', vi: 'Sau giờ làm tôi đi học tiếng Nhật.' },
    ],
  },
  {
    id: 'v12',
    word: '必要',
    kana: 'ひつよう',
    romaji: 'hitsuyou',
    meaning: 'cần thiết',
    level: 'N4',
    type: 'Tính từ đuôi な',
    examples: [
      { ja: 'パスポートが必要です。', vi: 'Hộ chiếu là cần thiết.' },
      { ja: '今は少し休みが必要ですね。', vi: 'Lúc này bạn cần nghỉ một chút.' },
    ],
  },
  {
    id: 'v13',
    word: '続ける',
    kana: 'つづける',
    romaji: 'tsudzukeru',
    meaning: 'tiếp tục',
    level: 'N4',
    type: 'Động từ nhóm 2',
    examples: [
      { ja: '毎日続ければ上達します。', vi: 'Nếu duy trì mỗi ngày thì sẽ tiến bộ.' },
      { ja: 'その話を続けてください。', vi: 'Hãy tiếp tục câu chuyện đó.' },
    ],
  },
  {
    id: 'v14',
    word: '準備',
    kana: 'じゅんび',
    romaji: 'junbi',
    meaning: 'chuẩn bị',
    level: 'N4',
    type: 'Danh từ / Động từ nhóm 3',
    examples: [
      { ja: '旅行の準備は終わりましたか。', vi: 'Bạn đã chuẩn bị xong cho chuyến đi chưa?' },
      { ja: '会議の前に資料を準備します。', vi: 'Tôi chuẩn bị tài liệu trước cuộc họp.' },
    ],
  },
  {
    id: 'v15',
    word: '経験',
    kana: 'けいけん',
    romaji: 'keiken',
    meaning: 'kinh nghiệm',
    level: 'N3',
    type: 'Danh từ / Động từ nhóm 3',
    examples: [
      { ja: '海外で働いた経験があります。', vi: 'Tôi có kinh nghiệm làm việc ở nước ngoài.' },
      { ja: '失敗も大切な経験です。', vi: 'Thất bại cũng là kinh nghiệm quý.' },
    ],
  },
  {
    id: 'v16',
    word: '増える',
    kana: 'ふえる',
    romaji: 'fueru',
    meaning: 'tăng lên',
    level: 'N3',
    type: 'Động từ nhóm 2',
    examples: [
      { ja: '最近外国人の観光客が増えています。', vi: 'Gần đây khách du lịch nước ngoài đang tăng.' },
      { ja: '練習すると語彙が自然に増えます。', vi: 'Nếu luyện tập thì vốn từ sẽ tự nhiên tăng lên.' },
    ],
  },
  {
    id: 'v17',
    word: '提案',
    kana: 'ていあん',
    romaji: 'teian',
    meaning: 'đề xuất',
    level: 'N3',
    type: 'Danh từ / Động từ nhóm 3',
    examples: [
      { ja: '新しい勉強法を提案します。', vi: 'Tôi đề xuất phương pháp học mới.' },
      { ja: 'その提案はとても現実的です。', vi: 'Đề xuất đó rất thực tế.' },
    ],
  },
  {
    id: 'v18',
    word: '目立つ',
    kana: 'めだつ',
    romaji: 'medatsu',
    meaning: 'nổi bật, dễ thấy',
    level: 'N3',
    type: 'Động từ nhóm 1',
    examples: [
      { ja: '駅前に赤い看板が目立ちます。', vi: 'Biển hiệu đỏ trước ga rất nổi bật.' },
      { ja: '人前で目立つのが苦手です。', vi: 'Tôi không giỏi khi phải nổi bật trước đám đông.' },
    ],
  },
  {
    id: 'v19',
    word: '改善',
    kana: 'かいぜん',
    romaji: 'kaizen',
    meaning: 'cải thiện',
    level: 'N2',
    type: 'Danh từ / Động từ nhóm 3',
    examples: [
      { ja: '学習計画を改善する必要があります。', vi: 'Cần cải thiện kế hoạch học tập.' },
      { ja: 'サービス品質が大きく改善されました。', vi: 'Chất lượng dịch vụ đã được cải thiện đáng kể.' },
    ],
  },
  {
    id: 'v20',
    word: '把握する',
    kana: 'はあくする',
    romaji: 'haaku suru',
    meaning: 'nắm bắt, hiểu rõ',
    level: 'N2',
    type: 'Động từ nhóm 3',
    examples: [
      { ja: 'まず全体の流れを把握しましょう。', vi: 'Trước tiên hãy nắm toàn bộ luồng.' },
      { ja: '問題点はすでに把握しています。', vi: 'Tôi đã nắm rõ vấn đề rồi.' },
    ],
  },
  {
    id: 'v21',
    word: '柔軟',
    kana: 'じゅうなん',
    romaji: 'juunan',
    meaning: 'linh hoạt',
    level: 'N2',
    type: 'Tính từ đuôi な',
    examples: [
      { ja: '柔軟な考え方が求められます。', vi: 'Cần có cách suy nghĩ linh hoạt.' },
      { ja: '予定は柔軟に変更できます。', vi: 'Kế hoạch có thể thay đổi linh hoạt.' },
    ],
  },
  {
    id: 'v22',
    word: '遂げる',
    kana: 'とげる',
    romaji: 'togeru',
    meaning: 'đạt được, hoàn thành',
    level: 'N1',
    type: 'Động từ nhóm 2',
    examples: [
      { ja: '彼は大きな成長を遂げました。', vi: 'Anh ấy đã đạt được sự trưởng thành lớn.' },
      { ja: '長年の努力の末に目標を遂げた。', vi: 'Sau nhiều năm nỗ lực, tôi đã hoàn thành mục tiêu.' },
    ],
  },
  {
    id: 'v23',
    word: '顕著',
    kana: 'けんちょ',
    romaji: 'kencho',
    meaning: 'rõ rệt, nổi bật',
    level: 'N1',
    type: 'Tính từ đuôi な',
    examples: [
      { ja: '今年は学習成果の差が顕著に表れた。', vi: 'Năm nay sự chênh lệch kết quả học tập thể hiện rất rõ.' },
      { ja: 'その傾向は都市部で顕著です。', vi: 'Xu hướng đó rõ rệt ở khu đô thị.' },
    ],
  },
  {
    id: 'v24',
    word: '模索する',
    kana: 'もさくする',
    romaji: 'mosaku suru',
    meaning: 'mò mẫm tìm kiếm, tìm hướng',
    level: 'N1',
    type: 'Động từ nhóm 3',
    examples: [
      { ja: '最適な解決策を模索しています。', vi: 'Tôi đang tìm kiếm giải pháp tối ưu.' },
      { ja: '企業は新しい市場を模索している。', vi: 'Doanh nghiệp đang tìm kiếm thị trường mới.' },
    ],
  },
];

export const sampleGrammar: GrammarItem[] = [
  {
    id: 'g1',
    pattern: 'A は B です',
    meaning: 'A là B',
    explanation: 'Mẫu câu khẳng định cơ bản để giới thiệu người, vật hoặc định nghĩa một đối tượng.',
    level: 'N5',
    examples: [
      { ja: '私は学生です。', vi: 'Tôi là học sinh/sinh viên.' },
      { ja: 'こちらは日本語の本です。', vi: 'Đây là sách tiếng Nhật.' },
    ],
  },
  {
    id: 'g2',
    pattern: 'N を Vます',
    meaning: 'làm hành động lên tân ngữ',
    explanation: 'Trợ từ を đánh dấu đối tượng trực tiếp chịu tác động của động từ.',
    level: 'N5',
    examples: [
      { ja: '朝ごはんを食べます。', vi: 'Tôi ăn sáng.' },
      { ja: '毎晩ニュースを見ます。', vi: 'Tối nào tôi cũng xem tin tức.' },
    ],
  },
  {
    id: 'g3',
    pattern: 'N も',
    meaning: 'cũng',
    explanation: 'Trợ từ も thay thế cho は, が, を để nhấn mạnh ý “cũng như vậy”.',
    level: 'N5',
    examples: [
      { ja: '私も行きます。', vi: 'Tôi cũng đi.' },
      { ja: '妹も日本語を勉強しています。', vi: 'Em gái tôi cũng đang học tiếng Nhật.' },
    ],
  },
  {
    id: 'g4',
    pattern: 'N に / へ 行きます',
    meaning: 'đi đến',
    explanation: 'に và へ dùng để chỉ đích đến hoặc phương hướng của sự di chuyển.',
    level: 'N5',
    examples: [
      { ja: '学校に行きます。', vi: 'Tôi đi đến trường.' },
      { ja: '来月東京へ行く予定です。', vi: 'Tháng sau tôi dự định đi Tokyo.' },
    ],
  },
  {
    id: 'g5',
    pattern: 'N ではありません / じゃありません',
    meaning: 'không phải là',
    explanation: 'Thể phủ định lịch sự của です, dùng trong văn nói và văn viết thông dụng.',
    level: 'N5',
    examples: [
      { ja: '私は先生ではありません。', vi: 'Tôi không phải giáo viên.' },
      { ja: 'これは私の傘じゃありません。', vi: 'Đây không phải ô của tôi.' },
    ],
  },
  {
    id: 'g6',
    pattern: 'N の N',
    meaning: 'N của N / N thuộc về N',
    explanation: 'Trợ từ の nối hai danh từ để biểu thị sở hữu, thuộc tính hoặc phân loại.',
    level: 'N5',
    examples: [
      { ja: '山田さんの車です。', vi: 'Đó là xe của anh Yamada.' },
      { ja: '日本語の先生です。', vi: 'Là giáo viên tiếng Nhật.' },
    ],
  },
  {
    id: 'g7',
    pattern: 'Vて ください',
    meaning: 'hãy làm...',
    explanation: 'Mẫu câu dùng để đưa ra yêu cầu hoặc chỉ dẫn lịch sự.',
    level: 'N4',
    examples: [
      { ja: 'ここに名前を書いてください。', vi: 'Hãy viết tên vào đây.' },
      { ja: '少し待ってください。', vi: 'Xin hãy đợi một chút.' },
    ],
  },
  {
    id: 'g8',
    pattern: 'Vても いいです',
    meaning: 'được phép làm',
    explanation: 'Dùng để xin phép hoặc diễn đạt rằng một hành động là chấp nhận được.',
    level: 'N4',
    examples: [
      { ja: 'この席に座ってもいいですか。', vi: 'Tôi ngồi chỗ này được không?' },
      { ja: '今日は早く帰ってもいいです。', vi: 'Hôm nay bạn có thể về sớm.' },
    ],
  },
  {
    id: 'g9',
    pattern: 'Vながら',
    meaning: 'vừa... vừa...',
    explanation: 'Diễn tả hai hành động đồng thời, trong đó hành động sau thường là chính.',
    level: 'N4',
    examples: [
      { ja: '音楽を聞きながら勉強します。', vi: 'Tôi vừa nghe nhạc vừa học.' },
      { ja: '歩きながら話しましょう。', vi: 'Vừa đi vừa nói nhé.' },
    ],
  },
  {
    id: 'g10',
    pattern: 'Vたことがある',
    meaning: 'đã từng',
    explanation: 'Dùng để diễn tả kinh nghiệm từng trải qua một lần hoặc nhiều lần trong quá khứ.',
    level: 'N4',
    examples: [
      { ja: '富士山に登ったことがあります。', vi: 'Tôi từng leo núi Phú Sĩ.' },
      { ja: 'その映画を見たことがありません。', vi: 'Tôi chưa từng xem bộ phim đó.' },
    ],
  },
  {
    id: 'g11',
    pattern: 'Vように する',
    meaning: 'cố gắng để / tạo thói quen',
    explanation: 'Diễn tả nỗ lực biến một hành động thành thói quen hoặc mục tiêu thực hiện thường xuyên.',
    level: 'N3',
    examples: [
      { ja: '毎日復習するようにしています。', vi: 'Tôi cố duy trì thói quen ôn tập mỗi ngày.' },
      { ja: '忘れないようにメモしてください。', vi: 'Hãy ghi chú để không quên.' },
    ],
  },
  {
    id: 'g12',
    pattern: 'N に対して',
    meaning: 'đối với',
    explanation: 'Dùng khi nói về thái độ, hành động hoặc phản ứng hướng đến một đối tượng nào đó.',
    level: 'N3',
    examples: [
      { ja: '先生は学生に対して厳しいです。', vi: 'Giáo viên nghiêm khắc với học sinh.' },
      { ja: 'その質問に対して丁寧に答えた。', vi: 'Tôi đã trả lời cẩn thận với câu hỏi đó.' },
    ],
  },
  {
    id: 'g13',
    pattern: 'Vば ほど',
    meaning: 'càng... càng...',
    explanation: 'Diễn tả mối quan hệ tỉ lệ thuận giữa hai vế, mức độ tăng theo nhau.',
    level: 'N3',
    examples: [
      { ja: '練習すればするほど上手になります。', vi: 'Càng luyện tập càng giỏi.' },
      { ja: 'この本は読めば読むほど面白い。', vi: 'Quyển sách này càng đọc càng thú vị.' },
    ],
  },
  {
    id: 'g14',
    pattern: 'Vる まい',
    meaning: 'sẽ không..., chắc không...',
    explanation: 'Mẫu ngữ pháp mang sắc thái văn viết, diễn tả phủ định mạnh về ý chí hoặc suy đoán.',
    level: 'N2',
    examples: [
      { ja: 'もう二度と同じ失敗はするまい。', vi: 'Tôi sẽ không phạm lại sai lầm đó nữa.' },
      { ja: '彼はその事実を知るまい。', vi: 'Chắc anh ấy không biết sự thật đó.' },
    ],
  },
  {
    id: 'g15',
    pattern: 'N にほかならない',
    meaning: 'không gì khác ngoài',
    explanation: 'Dùng để khẳng định bản chất hoặc nguyên nhân cốt lõi của sự việc.',
    level: 'N2',
    examples: [
      { ja: '成功の理由は努力にほかならない。', vi: 'Lý do thành công không gì khác ngoài nỗ lực.' },
      { ja: 'その結果は準備不足の表れにほかならない。', vi: 'Kết quả đó chẳng qua chỉ là biểu hiện của việc chuẩn bị thiếu.' },
    ],
  },
  {
    id: 'g16',
    pattern: 'Vずにはいられない',
    meaning: 'không thể không...',
    explanation: 'Diễn tả cảm xúc hoặc phản ứng mạnh đến mức không thể kìm lại hành động.',
    level: 'N2',
    examples: [
      { ja: 'その話を聞いて笑わずにはいられなかった。', vi: 'Nghe câu chuyện đó tôi không thể không cười.' },
      { ja: '彼の努力を見ると応援せずにはいられない。', vi: 'Nhìn nỗ lực của anh ấy khiến tôi không thể không ủng hộ.' },
    ],
  },
  {
    id: 'g17',
    pattern: 'N を皮切りに',
    meaning: 'mở đầu bằng..., bắt đầu từ...',
    explanation: 'Mẫu văn viết dùng khi một sự kiện mở màn cho chuỗi hoạt động tiếp theo.',
    level: 'N1',
    examples: [
      { ja: '東京公演を皮切りに全国ツアーが始まる。', vi: 'Bắt đầu từ buổi diễn ở Tokyo, tour toàn quốc sẽ khởi động.' },
      { ja: '四月を皮切りに新制度が導入された。', vi: 'Bắt đầu từ tháng tư, chế độ mới đã được áp dụng.' },
    ],
  },
  {
    id: 'g18',
    pattern: 'Vないではすまない',
    meaning: 'không thể để yên mà không...',
    explanation: 'Diễn tả tình huống bắt buộc phải xin lỗi, bồi thường hoặc chịu trách nhiệm.',
    level: 'N1',
    examples: [
      { ja: 'こんな重大なミスは謝らないではすまない。', vi: 'Sai lầm nghiêm trọng thế này thì không thể không xin lỗi.' },
      { ja: '法律を破れば処罰されないではすまない。', vi: 'Nếu vi phạm pháp luật thì khó tránh khỏi bị xử phạt.' },
    ],
  },
];

export const sampleKanji: KanjiItem[] = [
  {
    id: 'k1',
    kanji: '日',
    onyomi: 'ニチ、ジツ',
    kunyomi: 'ひ、-び、-か',
    meaning: 'ngày, mặt trời',
    level: 'N5',
    strokeCount: 4,
    examples: [
      { ja: '日本（にほん）', vi: 'Nhật Bản' },
      { ja: '日曜日（にちようび）', vi: 'chủ nhật' },
    ],
  },
  {
    id: 'k2',
    kanji: '月',
    onyomi: 'ゲツ、ガツ',
    kunyomi: 'つき',
    meaning: 'tháng, mặt trăng',
    level: 'N5',
    strokeCount: 4,
    examples: [
      { ja: '一月（いちがつ）', vi: 'tháng một' },
      { ja: '月曜日（げつようび）', vi: 'thứ hai' },
    ],
  },
  {
    id: 'k3',
    kanji: '人',
    onyomi: 'ジン、ニン',
    kunyomi: 'ひと',
    meaning: 'người',
    level: 'N5',
    strokeCount: 2,
    examples: [
      { ja: '日本人（にほんじん）', vi: 'người Nhật' },
      { ja: '人気（にんき）', vi: 'phổ biến' },
    ],
  },
  {
    id: 'k4',
    kanji: '学',
    onyomi: 'ガク',
    kunyomi: 'まなぶ',
    meaning: 'học',
    level: 'N5',
    strokeCount: 8,
    examples: [
      { ja: '学生（がくせい）', vi: 'học sinh, sinh viên' },
      { ja: '学ぶ（まなぶ）', vi: 'học hỏi' },
    ],
  },
  {
    id: 'k5',
    kanji: '時',
    onyomi: 'ジ',
    kunyomi: 'とき',
    meaning: 'thời gian, giờ',
    level: 'N4',
    strokeCount: 10,
    examples: [
      { ja: '時間（じかん）', vi: 'thời gian' },
      { ja: '時々（ときどき）', vi: 'thỉnh thoảng' },
    ],
  },
  {
    id: 'k6',
    kanji: '場',
    onyomi: 'ジョウ',
    kunyomi: 'ば',
    meaning: 'địa điểm, nơi chốn',
    level: 'N4',
    strokeCount: 12,
    examples: [
      { ja: '工場（こうじょう）', vi: 'nhà máy' },
      { ja: '場所（ばしょ）', vi: 'địa điểm' },
    ],
  },
  {
    id: 'k7',
    kanji: '意',
    onyomi: 'イ',
    kunyomi: '',
    meaning: 'ý, ý chí',
    level: 'N3',
    strokeCount: 13,
    examples: [
      { ja: '意味（いみ）', vi: 'ý nghĩa' },
      { ja: '意見（いけん）', vi: 'ý kiến' },
    ],
  },
  {
    id: 'k8',
    kanji: '験',
    onyomi: 'ケン',
    kunyomi: '',
    meaning: 'kinh nghiệm, kiểm chứng',
    level: 'N3',
    strokeCount: 18,
    examples: [
      { ja: '経験（けいけん）', vi: 'kinh nghiệm' },
      { ja: '試験（しけん）', vi: 'kỳ thi' },
    ],
  },
  {
    id: 'k9',
    kanji: '提',
    onyomi: 'テイ',
    kunyomi: 'さげる',
    meaning: 'đề ra, đưa ra',
    level: 'N3',
    strokeCount: 12,
    examples: [
      { ja: '提案（ていあん）', vi: 'đề xuất' },
      { ja: '問題提起（もんだいていき）', vi: 'nêu vấn đề' },
    ],
  },
  {
    id: 'k10',
    kanji: '改',
    onyomi: 'カイ',
    kunyomi: 'あらためる、あらたまる',
    meaning: 'sửa đổi, cải tiến',
    level: 'N2',
    strokeCount: 7,
    examples: [
      { ja: '改善（かいぜん）', vi: 'cải thiện' },
      { ja: '改正（かいせい）', vi: 'sửa đổi' },
    ],
  },
  {
    id: 'k11',
    kanji: '握',
    onyomi: 'アク',
    kunyomi: 'にぎる',
    meaning: 'nắm, cầm',
    level: 'N2',
    strokeCount: 12,
    examples: [
      { ja: '把握（はあく）', vi: 'nắm bắt' },
      { ja: '握手（あくしゅ）', vi: 'bắt tay' },
    ],
  },
  {
    id: 'k12',
    kanji: '柔',
    onyomi: 'ジュウ、ニュウ',
    kunyomi: 'やわらか、やわらかい',
    meaning: 'mềm, linh hoạt',
    level: 'N2',
    strokeCount: 9,
    examples: [
      { ja: '柔軟（じゅうなん）', vi: 'linh hoạt' },
      { ja: '柔道（じゅうどう）', vi: 'judo' },
    ],
  },
  {
    id: 'k13',
    kanji: '遂',
    onyomi: 'スイ',
    kunyomi: 'とげる',
    meaning: 'hoàn thành, đạt tới',
    level: 'N1',
    strokeCount: 12,
    examples: [
      { ja: '遂行（すいこう）', vi: 'thực hiện' },
      { ja: '成し遂げる（なしとげる）', vi: 'hoàn thành' },
    ],
  },
  {
    id: 'k14',
    kanji: '顕',
    onyomi: 'ケン',
    kunyomi: 'あきらか',
    meaning: 'rõ ràng, hiển hiện',
    level: 'N1',
    strokeCount: 18,
    examples: [
      { ja: '顕著（けんちょ）', vi: 'rõ rệt' },
      { ja: '顕在化（けんざいか）', vi: 'bộc lộ rõ' },
    ],
  },
  {
    id: 'k15',
    kanji: '索',
    onyomi: 'サク',
    kunyomi: '',
    meaning: 'tìm kiếm, dò tìm',
    level: 'N1',
    strokeCount: 10,
    examples: [
      { ja: '模索（もさく）', vi: 'mò mẫm tìm kiếm' },
      { ja: '検索（けんさく）', vi: 'tìm kiếm' },
    ],
  },
  {
    id: 'k16',
    kanji: '責',
    onyomi: 'セキ',
    kunyomi: 'せめる',
    meaning: 'trách nhiệm, trách cứ',
    level: 'N1',
    strokeCount: 11,
    examples: [
      { ja: '責任（せきにん）', vi: 'trách nhiệm' },
      { ja: '説明責任（せつめいせきにん）', vi: 'trách nhiệm giải trình' },
    ],
  },
];

export const dashboardRoadmap = [
  { level: 'N5', focus: 'nền tảng giao tiếp', target: '350 từ, 80 kanji, 45 mẫu ngữ pháp' },
  { level: 'N4', focus: 'mở rộng ngữ cảnh', target: '700 từ, 170 kanji, 70 mẫu ngữ pháp' },
  { level: 'N3', focus: 'đọc hiểu trung cấp', target: '1.500 từ, 320 kanji, 120 mẫu ngữ pháp' },
  { level: 'N2', focus: 'học thuật và công việc', target: '3.000 từ, 700 kanji, 180 mẫu ngữ pháp' },
  { level: 'N1', focus: 'sắc thái nâng cao', target: '6.000+ từ, 1.000+ kanji, 250+ mẫu ngữ pháp' },
];

export const collectionStats = {
  vocabulary: sampleVocabulary.length,
  grammar: sampleGrammar.length,
  kanji: sampleKanji.length,
};

export const globalSearchResults = [
  ...sampleVocabulary.map((item) => ({
    id: item.id,
    type: 'vocabulary' as const,
    title: item.word,
    subtitle: `${item.kana} • ${item.meaning}`,
    level: item.level,
    keywords: [item.word, item.kana, item.romaji, item.meaning, item.type].join(' '),
  })),
  ...sampleGrammar.map((item) => ({
    id: item.id,
    type: 'grammar' as const,
    title: item.pattern,
    subtitle: item.meaning,
    level: item.level,
    keywords: [item.pattern, item.meaning, item.explanation].join(' '),
  })),
  ...sampleKanji.map((item) => ({
    id: item.id,
    type: 'kanji' as const,
    title: item.kanji,
    subtitle: `${item.meaning} • ${item.onyomi}`,
    level: item.level,
    keywords: [item.kanji, item.meaning, item.onyomi, item.kunyomi].join(' '),
  })),
];
