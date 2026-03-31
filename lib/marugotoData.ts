export interface MarugotoSentence {
  speaker: string;
  ja: string;
  romaji: string;
  vi: string;
}

export interface MarugotoPracticePrompt {
  title: string;
  instruction: string;
  support: string;
}

export interface MarugotoLesson {
  id: string;
  levelId: string;
  levelLabel: string;
  lessonNumber: number;
  lesson: string;
  title: string;
  canDo: string;
  focus: string;
  duration: string;
  topics: string[];
  vocabulary: string[];
  grammar: string[];
  sentences: MarugotoSentence[];
  prompts: MarugotoPracticePrompt[];
  cultureNote: string;
  reviewChecklist: string[];
}

export interface MarugotoLevel {
  id: string;
  series: string;
  label: string;
  cefr: string;
  description: string;
  officialFocus: string;
  studyTone: string;
  themes: string[];
  gradientClass: string;
  badgeClass: string;
}

const sentence = (speaker: string, ja: string, romaji: string, vi: string): MarugotoSentence => ({
  speaker,
  ja,
  romaji,
  vi,
});

const prompt = (title: string, instruction: string, support: string): MarugotoPracticePrompt => ({
  title,
  instruction,
  support,
});

const createLesson = (
  levelId: string,
  levelLabel: string,
  lessonNumber: number,
  title: string,
  canDo: string,
  focus: string,
  duration: string,
  topics: string[],
  vocabulary: string[],
  grammar: string[],
  sentences: MarugotoSentence[],
  prompts: MarugotoPracticePrompt[],
  cultureNote: string,
  reviewChecklist: string[]
): MarugotoLesson => ({
  id: `${levelId}-l${String(lessonNumber).padStart(2, '0')}`,
  levelId,
  levelLabel,
  lessonNumber,
  lesson: `Lesson ${lessonNumber}`,
  title,
  canDo,
  focus,
  duration,
  topics,
  vocabulary,
  grammar,
  sentences,
  prompts,
  cultureNote,
  reviewChecklist,
});

export const marugotoLevels: MarugotoLevel[] = [
  {
    id: 'starter-a1',
    series: 'Starter',
    label: 'Starter (A1)',
    cefr: 'A1',
    description: 'Làm quen tiếng Nhật qua các tình huống rất gần gũi như chào hỏi, ăn uống và sinh hoạt hằng ngày.',
    officialFocus: 'Nói được các trao đổi ngắn, đơn giản trong bối cảnh quen thuộc.',
    studyTone: 'Nhẹ nhàng, dễ bắt đầu, ưu tiên phản xạ nói thành câu ngắn.',
    themes: ['chào hỏi', 'gia đình', 'lịch sinh hoạt', 'gọi món', 'nhà ở', 'rủ rê cuối tuần'],
    gradientClass: 'from-orange-200 via-amber-100 to-rose-100',
    badgeClass: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  {
    id: 'elementary1-a2',
    series: 'Elementary 1',
    label: 'Elementary 1 (A2)',
    cefr: 'A2',
    description: 'Tăng khả năng giao tiếp về bản thân, công việc, mua sắm, thời tiết và nhu cầu thường ngày.',
    officialFocus: 'Mô tả được các chủ đề quen thuộc như gia đình, công việc và thành phố mình sống.',
    studyTone: 'Thực dụng, nhiều mẫu hỏi đáp thường gặp, dễ ứng dụng ngay.',
    themes: ['công việc', 'mua sắm', 'di chuyển', 'thành phố', 'sở thích', 'sức khỏe'],
    gradientClass: 'from-emerald-200 via-teal-100 to-cyan-100',
    badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  {
    id: 'elementary2-a2',
    series: 'Elementary 2',
    label: 'Elementary 2 (A2)',
    cefr: 'A2',
    description: 'Mở rộng sang du lịch, trải nghiệm, lễ hội và những vấn đề thực tế phát sinh khi sinh sống tại Nhật.',
    officialFocus: 'Dùng được các biểu đạt cơ bản để sắp xếp chuyến đi và miêu tả địa điểm.',
    studyTone: 'Sinh động, nhiều hội thoại theo ngữ cảnh thực tế, tăng độ dài câu nói.',
    themes: ['du lịch', 'khách sạn', 'điểm tham quan', 'lễ hội', 'trải nghiệm', 'quy tắc'],
    gradientClass: 'from-sky-200 via-blue-100 to-indigo-100',
    badgeClass: 'bg-sky-100 text-sky-700 border-sky-200',
  },
  {
    id: 'preintermediate-a2b1',
    series: 'Pre-Intermediate',
    label: 'Pre-Intermediate (A2/B1)',
    cefr: 'A2/B1',
    description: 'Bắt đầu nói dài hơn về quan điểm cá nhân, kế hoạch học tập và các vấn đề ở công việc hay cộng đồng.',
    officialFocus: 'Hoàn thành A2 và chuyển sang B1 với các cuộc trao đổi dài hơn, có lý do và cảm nhận.',
    studyTone: 'Đào sâu nội dung, luyện tổ chức ý và giữ cuộc hội thoại tự nhiên.',
    themes: ['công việc', 'quan hệ', 'email', 'mục tiêu', 'cộng đồng', 'so sánh lựa chọn'],
    gradientClass: 'from-fuchsia-200 via-pink-100 to-rose-100',
    badgeClass: 'bg-pink-100 text-pink-700 border-pink-200',
  },
  {
    id: 'intermediate1-b1',
    series: 'Intermediate 1',
    label: 'Intermediate 1 (B1)',
    cefr: 'B1',
    description: 'Rèn khả năng trình bày chi tiết hơn về sở thích, trải nghiệm lễ hội, tin tức và dự án cá nhân.',
    officialFocus: 'Trao đổi được bằng chi tiết về chủ đề quan tâm và xử lý thông tin cần thiết trên Internet.',
    studyTone: 'Tự tin hơn, thiên về kể chuyện, nêu quan điểm và phản hồi mềm mại.',
    themes: ['văn hóa', 'trải nghiệm', 'SNS', 'tin tức', 'hợp tác', 'thuyết trình'],
    gradientClass: 'from-violet-200 via-purple-100 to-indigo-100',
    badgeClass: 'bg-violet-100 text-violet-700 border-violet-200',
  },
  {
    id: 'intermediate2-b1',
    series: 'Intermediate 2',
    label: 'Intermediate 2 (B1)',
    cefr: 'B1',
    description: 'Thực hành giao tiếp phức tạp hơn như tư vấn sức khỏe, giải thích lịch sử văn hóa và thương lượng.',
    officialFocus: 'Tham gia được các tình huống giao tiếp nhiều lớp ý như tin tức, lời khuyên và giới thiệu truyền thống.',
    studyTone: 'Mạch lạc, nhiều chiều, nhấn vào thuyết phục và giải thích rõ ràng.',
    themes: ['sức khỏe', 'truyền thống', 'xã hội', 'dịch vụ', 'nghề nghiệp', 'tranh luận'],
    gradientClass: 'from-stone-200 via-zinc-100 to-slate-100',
    badgeClass: 'bg-stone-100 text-stone-700 border-stone-200',
  },
];

export const marugotoLessons: MarugotoLesson[] = [
  createLesson(
    'starter-a1',
    'Starter (A1)',
    1,
    'Chào hỏi và tự giới thiệu',
    'Tự giới thiệu tên, quê quán và nói lời chào đầu tiên một cách tự nhiên.',
    'Học cách mở đầu cuộc trò chuyện và kết thúc bằng mẫu xã giao cơ bản.',
    '15-20 phút',
    ['hajimemashite', 'quốc tịch', 'nghề nghiệp'],
    ['名前', '国', '仕事', '学生', 'よろしく'],
    ['です', 'から来ました', 'はじめまして'],
    [
      sentence('Tanaka', 'はじめまして。田中です。', 'Hajimemashite. Tanaka desu.', 'Rất vui được gặp bạn. Tôi là Tanaka.'),
      sentence('Linh', 'ベトナムから来ました。今、学生です。', 'Betonamu kara kimashita. Ima, gakusei desu.', 'Tôi đến từ Việt Nam. Hiện giờ tôi là sinh viên.'),
      sentence('Tanaka', 'どうぞよろしくお願いします。', 'Douzo yoroshiku onegaishimasu.', 'Rất mong được giúp đỡ.'),
    ],
    [
      prompt('Giới thiệu 20 giây', 'Tự nói tên, quốc tịch và nghề nghiệp của bạn trong 3 câu.', 'Mẫu gợi ý: わたしは ... です。 ... から来ました。今、... です。'),
      prompt('Bắt đầu làm quen', 'Đóng vai gặp bạn mới trong lớp và nói lời chào lịch sự.', 'Nhớ dùng hai câu: はじめまして và よろしくお願いします。'),
    ],
    'Trong môi trường học tập và công việc ở Nhật, lời chào mở đầu lịch sự giúp cuộc trò chuyện trở nên dễ chịu hơn rất nhiều.',
    ['Nói được tên và quê quán.', 'Dùng đúng mẫu です.', 'Kết thúc bằng よろしくお願いします.']
  ),
  createLesson(
    'starter-a1',
    'Starter (A1)',
    2,
    'Nói về gia đình và người thân',
    'Giới thiệu ngắn về gia đình và mô tả mối quan hệ thân thuộc.',
    'Mở rộng từ việc giới thiệu bản thân sang nói về những người xung quanh.',
    '15-20 phút',
    ['gia đình', 'anh chị em', 'miêu tả người'],
    ['家族', '父', '母', '兄弟', 'やさしい'],
    ['がいます', 'は ... です', '好きです'],
    [
      sentence('Aki', 'わたしは四人家族です。', 'Watashi wa yonin kazoku desu.', 'Gia đình tôi có bốn người.'),
      sentence('Linh', '妹が一人います。とても元気です。', 'Imouto ga hitori imasu. Totemo genki desu.', 'Tôi có một em gái. Em ấy rất năng động.'),
      sentence('Aki', '母は料理が好きです。', 'Haha wa ryouri ga suki desu.', 'Mẹ tôi thích nấu ăn.'),
    ],
    [
      prompt('Giới thiệu gia đình', 'Nói 3 câu về số người trong gia đình và một người thân bạn muốn kể.', 'Có thể dùng mẫu: ... が ... います。'),
      prompt('Miêu tả tính cách', 'Chọn một người thân và nói 2 tính từ mô tả người đó.', 'Ví dụ: やさしいです, おもしろいです.'),
    ],
    'Người Nhật thường chọn cách nói vừa đủ, thân thiện khi kể về gia đình trong lần đầu làm quen.',
    ['Nói được số người trong gia đình.', 'Dùng được がいます.', 'Mô tả được ít nhất một người thân.']
  ),
  createLesson(
    'starter-a1',
    'Starter (A1)',
    3,
    'Lịch sinh hoạt hằng ngày',
    'Nói được những hoạt động cơ bản trong một ngày và thời gian tương ứng.',
    'Luyện phản xạ với giờ giấc, động từ thường ngày và thói quen cá nhân.',
    '20 phút',
    ['thời gian', 'buổi sáng', 'đi học', 'ngủ nghỉ'],
    ['起きます', '学校', '朝', '夜', '毎日'],
    ['ます', 'に', 'から ... まで'],
    [
      sentence('Ken', '毎朝六時に起きます。', 'Maiasa rokuji ni okimasu.', 'Mỗi sáng tôi dậy lúc 6 giờ.'),
      sentence('Mai', '八時から九時まで日本語を勉強します。', 'Hachiji kara kuji made nihongo o benkyou shimasu.', 'Từ 8 giờ đến 9 giờ tôi học tiếng Nhật.'),
      sentence('Ken', '夜は十一時ごろ寝ます。', 'Yoru wa juuichiji goro nemasu.', 'Buổi tối tôi ngủ khoảng 11 giờ.'),
    ],
    [
      prompt('Một ngày của bạn', 'Hãy kể lịch sinh hoạt của bạn theo thứ tự sáng, chiều, tối.', 'Nhớ dùng ít nhất 3 động từ đuôi ます.'),
      prompt('Hỏi bạn cùng lớp', 'Đặt 2 câu hỏi về giờ dậy và giờ đi ngủ của người đối diện.', 'Có thể dùng: 何時に起きますか。'),
    ],
    'Khi nói về lịch trình, việc dùng giờ và trợ từ に rõ ràng giúp người nghe hiểu rất nhanh.',
    ['Nói được 3 hoạt động hằng ngày.', 'Dùng được mẫu giờ với に.', 'Biết nói khoảng thời gian với から ... まで.']
  ),
  createLesson(
    'starter-a1',
    'Starter (A1)',
    4,
    'Ăn uống và gọi món',
    'Gọi món đơn giản, nói món mình thích và hỏi giá một cách lịch sự.',
    'Tạo sự tự tin khi vào quán ăn hoặc trao đổi về món ăn quen thuộc.',
    '20 phút',
    ['nhà hàng', 'đồ uống', 'giá tiền'],
    ['水', 'コーヒー', 'ラーメン', 'ください', 'いくら'],
    ['をください', 'が好きです', 'いくらですか'],
    [
      sentence('Staff', 'ご注文は何ですか。', 'Gochuumon wa nan desu ka.', 'Bạn muốn gọi món gì ạ?'),
      sentence('Hoa', 'ラーメンを一つください。', 'Raamen o hitotsu kudasai.', 'Cho tôi một phần ramen.'),
      sentence('Staff', 'コーヒーは三百円です。', 'Koohii wa sanbyaku en desu.', 'Cà phê là 300 yên.'),
    ],
    [
      prompt('Gọi món', 'Đóng vai khách gọi một món ăn và một món uống.', 'Mẫu gợi ý: ... をください。'),
      prompt('Nói sở thích ăn uống', 'Nói 2 món bạn thích và 1 món bạn không thích.', 'Có thể dùng ... が好きです / あまり好きじゃないです.'),
    ],
    'Trong quán ăn, cách nói ngắn gọn nhưng lịch sự như ください rất phổ biến và dễ áp dụng.',
    ['Gọi được ít nhất 2 món.', 'Hỏi hoặc hiểu được giá.', 'Dùng được ください đúng ngữ cảnh.']
  ),
  createLesson(
    'starter-a1',
    'Starter (A1)',
    5,
    'Nói về nhà ở và khu phố',
    'Mô tả ngắn nơi mình ở, những gì có gần nhà và phương tiện đi lại.',
    'Kết nối từ vựng nhà cửa với các mẫu câu chỉ vị trí cơ bản.',
    '20 phút',
    ['nhà ở', 'gần xa', 'siêu thị', 'ga tàu'],
    ['家', '近く', 'スーパー', '駅', '便利'],
    ['にあります', 'の近く', 'があります'],
    [
      sentence('Yumi', 'わたしの家は駅の近くにあります。', 'Watashi no ie wa eki no chikaku ni arimasu.', 'Nhà tôi ở gần ga tàu.'),
      sentence('Minh', '家の近くにスーパーがあります。', 'Ie no chikaku ni suupaa ga arimasu.', 'Gần nhà tôi có siêu thị.'),
      sentence('Yumi', 'この町はとても便利です。', 'Kono machi wa totemo benri desu.', 'Khu này rất tiện lợi.'),
    ],
    [
      prompt('Giới thiệu nơi ở', 'Nói 3 câu về nơi bạn đang ở hoặc muốn ở.', 'Dùng 1 câu với 近く và 1 câu với あります.'),
      prompt('So sánh khu phố', 'So sánh khu bạn ở với một nơi khác bằng 2 tính từ.', 'Ví dụ: にぎやかです, しずかです.'),
    ],
    'Khi giới thiệu khu phố, người học thường tiến bộ nhanh nếu gắn từ mới với nơi ở thật của mình.',
    ['Nói được vị trí nhà ở.', 'Biết dùng あります cho địa điểm/vật.', 'Mô tả được khu phố bằng tính từ.']
  ),
  createLesson(
    'starter-a1',
    'Starter (A1)',
    6,
    'Rủ nhau đi chơi cuối tuần',
    'Đưa ra lời mời, nhận lời hoặc từ chối nhẹ nhàng về kế hoạch cuối tuần.',
    'Luyện nói lịch trình gần tương lai với giọng điệu thân thiện.',
    '20 phút',
    ['cuối tuần', 'lời mời', 'hẹn gặp'],
    ['週末', '行きます', 'いっしょに', 'いいですね', 'また今度'],
    ['ませんか', 'ましょう', '土曜日に'],
    [
      sentence('Taro', '土曜日にいっしょに映画を見ませんか。', 'Doyoubi ni issho ni eiga o mimasen ka.', 'Thứ bảy đi xem phim cùng mình nhé?'),
      sentence('Lan', 'いいですね。何時に会いますか。', 'Ii desu ne. Nanji ni aimasu ka.', 'Hay đấy. Mấy giờ gặp nhau?'),
      sentence('Taro', 'ごめんなさい。また今度お願いします。', 'Gomen nasai. Mata kondo onegaishimasu.', 'Xin lỗi nhé. Hẹn dịp khác nhé.'),
    ],
    [
      prompt('Mời bạn đi chơi', 'Tự tạo một lời mời đi cà phê, xem phim hoặc đi công viên.', 'Dùng mẫu ... ませんか。'),
      prompt('Nhận lời và hẹn giờ', 'Trả lời đồng ý rồi hỏi thời gian gặp.', 'Có thể dùng: いいですね。何時に会いますか。'),
    ],
    'Từ chối ở Nhật thường được nói mềm và để mở khả năng hẹn lại trong tương lai.',
    ['Mời được ai đó bằng ませんか.', 'Biết đồng ý hoặc từ chối lịch sự.', 'Hỏi được thời gian hẹn gặp.']
  ),
  createLesson(
    'elementary1-a2',
    'Elementary 1 (A2)',
    1,
    'Nói về công việc và lịch làm việc',
    'Mô tả công việc, nơi làm việc và lịch sinh hoạt trong tuần.',
    'Nâng từ hội thoại cá nhân sang bối cảnh học tập, đi làm và trách nhiệm hằng ngày.',
    '20-25 phút',
    ['công việc', 'lịch làm', 'văn phòng'],
    ['会社', '会議', '忙しい', '受付', '休み'],
    ['ています', 'とき', 'ので'],
    [
      sentence('Nana', '平日は九時から会社で働いています。', 'Heijitsu wa kuji kara kaisha de hataraite imasu.', 'Ngày thường tôi làm việc ở công ty từ 9 giờ.'),
      sentence('Phong', '会議がある日は少し忙しいです。', 'Kaigi ga aru hi wa sukoshi isogashii desu.', 'Những ngày có họp thì hơi bận.'),
      sentence('Nana', '昼休みのとき、同僚と話します。', 'Hiruyasumi no toki, douryou to hanashimasu.', 'Lúc nghỉ trưa tôi nói chuyện với đồng nghiệp.'),
    ],
    [
      prompt('Miêu tả lịch làm việc', 'Nói về một ngày học hoặc làm việc điển hình của bạn.', 'Thêm một câu diễn tả khi nào bạn bận nhất.'),
      prompt('Trao đổi với đồng nghiệp', 'Đặt 2 câu hỏi cho bạn cùng lớp về công việc hoặc ngành học của họ.', 'Có thể dùng: どんな仕事をしていますか。'),
    ],
    'Ở trình độ này, việc nối hai ý bằng とき hoặc ので làm câu nói tự nhiên hơn hẳn.',
    ['Giới thiệu được công việc/ngành học.', 'Nói được lịch làm việc theo ngày.', 'Dùng được ので để nêu lý do đơn giản.']
  ),
  createLesson(
    'elementary1-a2',
    'Elementary 1 (A2)',
    2,
    'Mua sắm và nêu sở thích',
    'Hỏi kích cỡ, màu sắc, giá cả và bày tỏ món mình muốn mua.',
    'Rèn kỹ năng trao đổi trong cửa hàng với mức chi tiết hơn cơ bản.',
    '20-25 phút',
    ['quần áo', 'màu sắc', 'giá', 'mong muốn'],
    ['サイズ', '色', '安い', '高い', 'ほしい'],
    ['がほしいです', 'より', 'どちら'],
    [
      sentence('Clerk', 'どんな色がいいですか。', 'Donna iro ga ii desu ka.', 'Bạn thích màu nào ạ?'),
      sentence('Vy', '青いシャツがほしいです。', 'Aoi shatsu ga hoshii desu.', 'Tôi muốn một chiếc áo sơ mi màu xanh.'),
      sentence('Clerk', 'こちらのほうが少し安いです。', 'Kochira no hou ga sukoshi yasui desu.', 'Cái này rẻ hơn một chút.'),
    ],
    [
      prompt('Mua quần áo', 'Tạo đoạn hội thoại ngắn khi mua một món đồ bạn cần.', 'Nên có câu hỏi về màu và giá.'),
      prompt('So sánh hai món', 'So sánh hai sản phẩm và nói cái bạn muốn hơn.', 'Dùng mẫu A より B のほうが ... です.'),
    ],
    'Khi mua sắm ở Nhật, câu hỏi về kích cỡ, màu và giá là bộ ba rất hay gặp.',
    ['Nói được món mình muốn mua.', 'So sánh được hai món đơn giản.', 'Hỏi được giá hoặc màu sắc.']
  ),
  createLesson(
    'elementary1-a2',
    'Elementary 1 (A2)',
    3,
    'Di chuyển và hỏi đường',
    'Giải thích phương tiện đi lại và hỏi cách đến một địa điểm.',
    'Giúp người học tự tin hơn khi sử dụng tàu, xe buýt hoặc đi bộ ở Nhật.',
    '20-25 phút',
    ['đi tàu', 'hỏi đường', 'bản đồ'],
    ['電車', 'バス', 'まっすぐ', '右', '左'],
    ['で行きます', 'まで', 'どうやって'],
    [
      sentence('Rika', '駅までどうやって行きますか。', 'Eki made douyatte ikimasu ka.', 'Đi đến ga bằng cách nào vậy?'),
      sentence('Huy', 'この道をまっすぐ行って、右へ曲がります。', 'Kono michi o massugu itte, migi e magarimasu.', 'Đi thẳng đường này rồi rẽ phải.'),
      sentence('Rika', 'わたしはいつも電車で行きます。', 'Watashi wa itsumo densha de ikimasu.', 'Tôi thường đi bằng tàu điện.'),
    ],
    [
      prompt('Chỉ đường', 'Hãy chỉ đường từ ga đến quán cà phê hoặc trường học.', 'Dùng ít nhất 2 chỉ dẫn như まっすぐ, 右, 左.'),
      prompt('Nói phương tiện', 'Nói bạn thường đi học hoặc đi làm bằng gì và mất bao lâu.', 'Có thể thêm câu ... まで ... 分ぐらいです.'),
    ],
    'Khả năng chỉ đường ngắn gọn khiến trải nghiệm giao tiếp hằng ngày tự nhiên và hữu ích hơn nhiều.',
    ['Hỏi được đường đi.', 'Nói được phương tiện di chuyển.', 'Dùng được tới địa điểm với まで.']
  ),
  createLesson(
    'elementary1-a2',
    'Elementary 1 (A2)',
    4,
    'Miêu tả thành phố và thời tiết',
    'Nói về nơi mình sống, khí hậu và những điểm tiện lợi trong thành phố.',
    'Mở rộng vốn mô tả địa điểm quen thuộc bằng câu dài hơn.',
    '20-25 phút',
    ['thành phố', 'thời tiết', 'mùa', 'địa điểm'],
    ['町', '暑い', '寒い', '公園', 'にぎやか'],
    ['と思います', 'し', 'ほうが'],
    [
      sentence('Kei', 'わたしの町はにぎやかで、店が多いです。', 'Watashi no machi wa nigiyaka de, mise ga ooi desu.', 'Thành phố của tôi nhộn nhịp và có nhiều cửa hàng.'),
      sentence('Tram', '夏はとても暑いと思います。', 'Natsu wa totemo atsui to omoimasu.', 'Tôi nghĩ mùa hè rất nóng.'),
      sentence('Kei', '駅の近くの公園のほうが静かです。', 'Eki no chikaku no kouen no hou ga shizuka desu.', 'Công viên gần ga thì yên tĩnh hơn.'),
    ],
    [
      prompt('Giới thiệu thành phố', 'Nói 4 câu giới thiệu nơi bạn đang sống cho một người bạn Nhật.', 'Thêm 1 câu về thời tiết theo mùa.'),
      prompt('Nêu quan điểm', 'Nói bạn thích mùa nào nhất và giải thích ngắn.', 'Dùng mẫu ... と思います.'),
    ],
    'Khi mô tả địa phương, việc kết hợp thông tin về thời tiết và tiện ích khiến câu chuyện sống động hơn.',
    ['Mô tả được thành phố.', 'Nói được cảm nhận về thời tiết.', 'Biết nêu ý kiến bằng と思います.']
  ),
  createLesson(
    'elementary1-a2',
    'Elementary 1 (A2)',
    5,
    'Sở thích và thời gian rảnh',
    'Kể về hoạt động mình thích làm, tần suất và cảm nhận khi tham gia.',
    'Tăng khả năng duy trì hội thoại tự nhiên về chủ đề rất thường gặp.',
    '20-25 phút',
    ['sở thích', 'âm nhạc', 'thể thao', 'thư giãn'],
    ['趣味', '音楽', '映画', 'たいてい', '楽しい'],
    ['たり ... たり', 'ことがあります', 'のが好きです'],
    [
      sentence('Mika', '休みの日は音楽を聞いたり、映画を見たりします。', 'Yasumi no hi wa ongaku o kiitari, eiga o mitari shimasu.', 'Ngày nghỉ tôi nghe nhạc và xem phim.'),
      sentence('Dat', '友だちとサッカーをすることがあります。', 'Tomodachi to sakkaa o suru koto ga arimasu.', 'Thỉnh thoảng tôi chơi bóng đá với bạn bè.'),
      sentence('Mika', '新しいカフェを探すのが好きです。', 'Atarashii kafe o sagasu no ga suki desu.', 'Tôi thích tìm quán cà phê mới.'),
    ],
    [
      prompt('Kể sở thích', 'Nói về 2 hoạt động bạn thường làm lúc rảnh.', 'Dùng mẫu たり ... たり nếu có thể.'),
      prompt('Rủ bạn chung sở thích', 'Mời một người bạn tham gia hoạt động bạn thích.', 'Nhớ nói vì sao hoạt động đó vui.'),
    ],
    'Chủ đề sở thích là nơi rất tốt để chuyển từ nói ngắn sang nói dài hơn một chút.',
    ['Nói được sở thích cá nhân.', 'Diễn tả tần suất cơ bản.', 'Duy trì được hội thoại qua câu hỏi đáp đơn giản.']
  ),
  createLesson(
    'elementary1-a2',
    'Elementary 1 (A2)',
    6,
    'Sức khỏe và nhu cầu hằng ngày',
    'Diễn đạt triệu chứng nhẹ, xin giúp đỡ và nói điều mình nên làm.',
    'Chuẩn bị cho các tình huống cơ bản như mệt, đau hoặc cần nghỉ ngơi.',
    '20-25 phút',
    ['sức khỏe', 'bệnh nhẹ', 'nhờ giúp đỡ'],
    ['頭', '痛い', '薬', '休みます', '大丈夫'],
    ['たいです', 'たほうがいい', 'ので'],
    [
      sentence('Aya', 'きのうから頭が痛いです。', 'Kinou kara atama ga itai desu.', 'Từ hôm qua tôi bị đau đầu.'),
      sentence('Quang', '今日は早く帰って休んだほうがいいです。', 'Kyou wa hayaku kaette yasunda hou ga ii desu.', 'Hôm nay bạn nên về sớm nghỉ ngơi.'),
      sentence('Aya', '薬を買いたいです。近くに薬局がありますか。', 'Kusuri o kaitai desu. Chikaku ni yakkyoku ga arimasu ka.', 'Tôi muốn mua thuốc. Gần đây có hiệu thuốc không?'),
    ],
    [
      prompt('Nói triệu chứng', 'Nói bạn đang mệt ở đâu và cần gì.', 'Mẫu gợi ý: ... が痛いです。 ... たいです。'),
      prompt('Cho lời khuyên', 'Đưa ra 2 lời khuyên cho một người bạn đang mệt.', 'Dùng ... たほうがいいです.'),
    ],
    'Biết nói rõ triệu chứng cơ bản giúp người học tự chủ hơn trong cuộc sống ở Nhật.',
    ['Nói được một triệu chứng.', 'Xin hỗ trợ bằng câu đơn giản.', 'Cho lời khuyên với たほうがいい.']
  ),
  createLesson(
    'elementary2-a2',
    'Elementary 2 (A2)',
    1,
    'Lập kế hoạch chuyến đi',
    'Trao đổi về điểm đến, phương tiện, lịch trình và ngân sách cơ bản.',
    'Bắt đầu nói dài hơn trong bối cảnh du lịch thực tế.',
    '25 phút',
    ['du lịch', 'điểm đến', 'ngân sách', 'kế hoạch'],
    ['旅行', '予定', '新幹線', '予約', '予算'],
    ['つもりです', 'たいんですが', 'ほうがいい'],
    [
      sentence('Sora', '来月、京都へ旅行するつもりです。', 'Raigetsu, Kyoto e ryokou suru tsumori desu.', 'Tháng sau tôi định đi Kyoto.'),
      sentence('Lien', '新幹線を予約したいんですが、どのサイトがいいですか。', 'Shinkansen o yoyaku shitain desu ga, dono saito ga ii desu ka.', 'Tôi muốn đặt shinkansen, trang nào ổn nhỉ?'),
      sentence('Sora', '週末は早めに決めたほうがいいですよ。', 'Shuumatsu wa hayame ni kimeta hou ga ii desu yo.', 'Đi cuối tuần thì nên quyết định sớm đó.'),
    ],
    [
      prompt('Lên kế hoạch du lịch', 'Nói ngắn về nơi bạn muốn đi, bằng phương tiện gì và khi nào đi.', 'Dùng mẫu ... つもりです.'),
      prompt('Xin gợi ý', 'Hỏi bạn cùng lớp lời khuyên để đặt vé hoặc chọn khách sạn.', 'Mẫu gợi ý: ... たいんですが。'),
    ],
    'Ngôn ngữ dùng khi lên kế hoạch chuyến đi rất gần với đời sống thực nên luyện nói rất hiệu quả.',
    ['Nói được kế hoạch du lịch.', 'Xin lời khuyên phù hợp.', 'Đề cập được phương tiện hoặc đặt chỗ.']
  ),
  createLesson(
    'elementary2-a2',
    'Elementary 2 (A2)',
    2,
    'Khách sạn và làm thủ tục',
    'Xác nhận đặt phòng, hỏi dịch vụ và xử lý yêu cầu khi lưu trú.',
    'Luyện hội thoại dịch vụ rõ ràng và lịch sự.',
    '25 phút',
    ['khách sạn', 'check-in', 'dịch vụ'],
    ['ホテル', '予約', '部屋', '朝食', 'フロント'],
    ['ていただけますか', 'てもいいですか', 'がついています'],
    [
      sentence('Guest', '予約しているグエンです。チェックインをお願いします。', 'Yoyaku shite iru Nguyen desu. Chekkuin o onegaishimasu.', 'Tôi là Nguyễn đã đặt phòng. Cho tôi làm thủ tục nhận phòng.'),
      sentence('Staff', '朝食は料金に入っています。', 'Choushoku wa ryoukin ni haitte imasu.', 'Bữa sáng đã bao gồm trong giá phòng.'),
      sentence('Guest', 'もう少し静かな部屋にしていただけますか。', 'Mou sukoshi shizuka na heya ni shite itadakemasu ka.', 'Có thể đổi giúp tôi sang phòng yên tĩnh hơn được không?'),
    ],
    [
      prompt('Check-in khách sạn', 'Đóng vai khách đến khách sạn và xác nhận đặt phòng.', 'Hãy thêm một câu hỏi về bữa sáng hoặc wifi.'),
      prompt('Yêu cầu hỗ trợ', 'Nêu một yêu cầu cụ thể với lễ tân.', 'Ví dụ: đổi phòng, gọi taxi, hỏi giờ check-out.'),
    ],
    'Trong dịch vụ lưu trú, cách nhờ vả mềm như していただけますか tạo cảm giác lịch sự và chuyên nghiệp.',
    ['Xác nhận được đặt phòng.', 'Hỏi được dịch vụ khách sạn.', 'Đưa ra một yêu cầu lịch sự.']
  ),
  createLesson(
    'elementary2-a2',
    'Elementary 2 (A2)',
    3,
    'Giới thiệu điểm tham quan',
    'Mô tả một nơi đáng đi, lý do nên đến và cách tận hưởng tại đó.',
    'Tăng khả năng gợi ý và chia sẻ trải nghiệm với người khác.',
    '25 phút',
    ['tham quan', 'gợi ý', 'phong cảnh'],
    ['景色', 'おすすめ', '有名', '写真', '歩く'],
    ['ほうがいいです', 'ことができます', 'ので'],
    [
      sentence('Guide', 'この寺は景色がきれいで、とても有名です。', 'Kono tera wa keshiki ga kirei de, totemo yuumei desu.', 'Ngôi chùa này phong cảnh đẹp và rất nổi tiếng.'),
      sentence('Nhi', '朝に行ったほうがすいています。', 'Asa ni itta hou ga suite imasu.', 'Đi buổi sáng thì sẽ vắng hơn.'),
      sentence('Guide', 'ここではゆっくり写真を撮ることができます。', 'Koko de wa yukkuri shashin o toru koto ga dekimasu.', 'Ở đây bạn có thể thong thả chụp ảnh.'),
    ],
    [
      prompt('Gợi ý địa điểm', 'Giới thiệu một nơi bạn muốn giới thiệu cho bạn bè.', 'Thêm lý do và thời điểm nên đi.'),
      prompt('Làm mini guide', 'Nói 4 câu như một hướng dẫn viên ngắn.', 'Có thể dùng ... ことができます.'),
    ],
    'Khi biết giới thiệu địa điểm, người học bắt đầu nói tự nhiên hơn chứ không chỉ trả lời câu hỏi ngắn.',
    ['Giới thiệu được một địa điểm.', 'Nói được lý do nên đi.', 'Khuyên được thời điểm phù hợp.']
  ),
  createLesson(
    'elementary2-a2',
    'Elementary 2 (A2)',
    4,
    'Lễ hội và sự kiện địa phương',
    'Kể về một lễ hội, những gì diễn ra và cảm nhận của bản thân.',
    'Luyện kể trải nghiệm có trình tự hơn.',
    '25 phút',
    ['lễ hội', 'sự kiện', 'không khí'],
    ['祭り', '人が多い', '屋台', '踊り', '楽しかった'],
    ['ていました', 'ので', 'ながら'],
    [
      sentence('Jun', '先週、町の祭りに行きました。', 'Senshuu, machi no matsuri ni ikimashita.', 'Tuần trước tôi đã đi lễ hội của khu phố.'),
      sentence('Ha', '屋台で食べながら、踊りを見ました。', 'Yatai de tabenagara, odori o mimashita.', 'Tôi vừa ăn ở quầy vừa xem múa.'),
      sentence('Jun', '人が多かったですが、とても楽しかったです。', 'Hito ga ookatta desu ga, totemo tanoshikatta desu.', 'Dù đông người nhưng rất vui.'),
    ],
    [
      prompt('Kể về lễ hội', 'Kể lại một lễ hội hoặc sự kiện bạn từng tham gia.', 'Nói rõ đã làm gì ở đó.'),
      prompt('Chia sẻ cảm nhận', 'Nói điều gì khiến sự kiện đó đáng nhớ.', 'Thử dùng ... ですが, ... でした.'),
    ],
    'Chủ đề lễ hội rất hợp để luyện nối sự kiện theo trình tự và thêm cảm xúc cá nhân.',
    ['Kể được một sự kiện đã tham gia.', 'Dùng được động từ quá khứ mô tả trải nghiệm.', 'Thêm được cảm nhận sau sự kiện.']
  ),
  createLesson(
    'elementary2-a2',
    'Elementary 2 (A2)',
    5,
    'Kể về trải nghiệm và thay đổi',
    'Nói về điều mới mình đã thử và những gì thay đổi sau đó.',
    'Luyện hồi tưởng và mô tả sự thay đổi bằng câu tương đối dài.',
    '25 phút',
    ['trải nghiệm mới', 'thay đổi', 'học hỏi'],
    ['初めて', '経験', '変わる', '自信', '続ける'],
    ['てから', 'ようになりました', 'ことがあります'],
    [
      sentence('Moe', '日本に来てから、自分で料理するようになりました。', 'Nihon ni kite kara, jibun de ryouri suru you ni narimashita.', 'Từ khi đến Nhật, tôi đã bắt đầu tự nấu ăn.'),
      sentence('Nam', '初めて茶道を体験したことがあります。', 'Hajimete sadou o taiken shita koto ga arimasu.', 'Tôi đã từng thử trà đạo lần đầu.'),
      sentence('Moe', '少しずつ自信がついてきました。', 'Sukoshizutsu jishin ga tsuite kimashita.', 'Tôi đang dần tự tin hơn.'),
    ],
    [
      prompt('Kể một thay đổi lớn', 'Nói về một thay đổi trong cuộc sống hoặc việc học của bạn.', 'Dùng mẫu ... ようになりました.'),
      prompt('Chia sẻ trải nghiệm mới', 'Kể về một điều bạn thử lần đầu trong năm nay.', 'Có thể mở đầu bằng 初めて ...'),
    ],
    'Mẫu ようになりました rất hữu ích để nói về tiến bộ cá nhân một cách tự nhiên.',
    ['Nói được trải nghiệm mới.', 'Mô tả được thay đổi sau một giai đoạn.', 'Kể được quá trình theo thứ tự hợp lý.']
  ),
  createLesson(
    'elementary2-a2',
    'Elementary 2 (A2)',
    6,
    'Nói về quy tắc và xử lý vấn đề',
    'Hỏi quy định, giải thích rắc rối và đề xuất cách giải quyết đơn giản.',
    'Chuẩn bị cho các tình huống sinh hoạt thực tế ở ký túc xá, trường học hoặc nơi làm việc.',
    '25 phút',
    ['quy tắc', 'vấn đề', 'giải quyết'],
    ['ルール', '困る', '注意', '使えない', '相談'],
    ['なければなりません', 'てもだめです', 'たらどうですか'],
    [
      sentence('Staff', 'ここでは大きい声で話してはいけません。', 'Koko de wa ookii koe de hanashite wa ikemasen.', 'Ở đây không được nói lớn tiếng.'),
      sentence('An', '洗濯機が使えなくて困っています。', 'Sentakuki ga tsukaenakute komatte imasu.', 'Máy giặt không dùng được nên tôi đang gặp khó khăn.'),
      sentence('Staff', '管理人に相談したらどうですか。', 'Kanrinin ni soudan shitara dou desu ka.', 'Bạn thử trao đổi với quản lý xem sao?'),
    ],
    [
      prompt('Hỏi quy định', 'Hỏi 2 câu về quy tắc ở một nơi như thư viện hoặc ký túc xá.', 'Ví dụ: ここで ... てもいいですか。'),
      prompt('Nói vấn đề', 'Mô tả một rắc rối bạn gặp và nhờ người khác gợi ý.', 'Cố gắng dùng 困っています.'),
    ],
    'Biết giải thích rắc rối bình tĩnh và rõ ràng giúp giao tiếp thực tế hiệu quả hơn nhiều.',
    ['Hiểu và nói được một quy định.', 'Mô tả được vấn đề đang gặp.', 'Đáp lại bằng một gợi ý đơn giản.']
  ),
  createLesson(
    'preintermediate-a2b1',
    'Pre-Intermediate (A2/B1)',
    1,
    'Trao đổi về khó khăn trong công việc',
    'Mô tả vấn đề ở nơi làm việc, cảm nhận cá nhân và hướng xử lý phù hợp.',
    'Bắt đầu chuyển sang mức nói dài hơn, có bối cảnh và có cân nhắc.',
    '25-30 phút',
    ['công việc', 'khó khăn', 'trao đổi', 'giải pháp'],
    ['仕事', '締め切り', '相談', '負担', '改善'],
    ['てしまう', 'ようにしています', 'かもしれません'],
    [
      sentence('Akira', '最近、締め切りが多くて少し疲れてしまいます。', 'Saikin, shimekiri ga ookute sukoshi tsukarete shimaimasu.', 'Dạo này có nhiều hạn chót nên tôi hơi bị mệt.'),
      sentence('Bao', '一人で抱えないようにしています。', 'Hitori de kakaenai you ni shite imasu.', 'Tôi cố gắng không ôm việc một mình.'),
      sentence('Akira', 'まず上司に相談したほうがいいかもしれません。', 'Mazu joushi ni soudan shita hou ga ii kamoshiremasen.', 'Có lẽ trước tiên nên trao đổi với cấp trên.'),
    ],
    [
      prompt('Nói về áp lực công việc', 'Giải thích một khó khăn bạn có thể gặp khi học hoặc làm việc.', 'Thêm cách bạn muốn xử lý nó.'),
      prompt('Đưa lời khuyên mềm', 'Góp ý cho bạn cùng lớp về một tình huống căng thẳng.', 'Thử dùng かもしれません để nói mềm hơn.'),
    ],
    'Ở mức này, người học cần không chỉ kể vấn đề mà còn trình bày cách suy nghĩ và lựa chọn của mình.',
    ['Nói được khó khăn cụ thể.', 'Đưa ra giải pháp sơ bộ.', 'Dùng được sắc thái mềm như かもしれません.']
  ),
  createLesson(
    'preintermediate-a2b1',
    'Pre-Intermediate (A2/B1)',
    2,
    'Nói về mối quan hệ và lựa chọn cuộc sống',
    'Trao đổi về điều quan trọng trong cuộc sống, kết hôn, gia đình và cân bằng cá nhân.',
    'Luyện nói về chủ đề cá nhân nhưng vẫn giữ giọng điệu tôn trọng.',
    '25-30 phút',
    ['gia đình', 'quan hệ', 'giá trị sống'],
    ['結婚', '自由', '責任', '支える', '考え方'],
    ['によって', 'とは限りません', 'と思っています'],
    [
      sentence('Rei', '幸せの形は人によって違うと思います。', 'Shiawase no katachi wa hito ni yotte chigau to omoimasu.', 'Tôi nghĩ hình thức hạnh phúc khác nhau tùy từng người.'),
      sentence('Duc', '結婚が早ければいいとは限りません。', 'Kekkon ga hayakereba ii to wa kagirimasen.', 'Không phải cứ kết hôn sớm là tốt.'),
      sentence('Rei', 'お互いに支え合うことが大切だと思っています。', 'Otagai ni sasaeau koto ga taisetsu da to omotte imasu.', 'Tôi nghĩ việc hỗ trợ lẫn nhau là rất quan trọng.'),
    ],
    [
      prompt('Quan điểm cá nhân', 'Nói ngắn về điều bạn coi trọng trong cuộc sống gia đình.', 'Nên thêm một lý do cá nhân.'),
      prompt('Thảo luận lựa chọn', 'Trao đổi với bạn cùng lớp về việc sống một mình hay sống cùng gia đình.', 'Dùng một câu thể hiện rằng không có câu trả lời duy nhất.'),
    ],
    'Khi bàn về giá trị cá nhân, cách nói không tuyệt đối giúp hội thoại sâu hơn và thoải mái hơn.',
    ['Nêu được quan điểm cá nhân.', 'Biết tránh nói quá cứng bằng とは限りません.', 'Giải thích được lý do ngắn gọn.']
  ),
  createLesson(
    'preintermediate-a2b1',
    'Pre-Intermediate (A2/B1)',
    3,
    'Email, blog và giao tiếp trực tuyến',
    'Viết và nói về thông tin cần gửi online, cách phản hồi và giữ lịch sự trên mạng.',
    'Kết nối nói chuyện đời thực với môi trường online.',
    '25-30 phút',
    ['email', 'blog', 'giao tiếp online'],
    ['連絡', '返信', '投稿', '内容', '失礼'],
    ['ようにします', 'まま', 'について'],
    [
      sentence('Sara', '返信が遅れるときは、先に一言連絡するようにしています。', 'Henshin ga okureru toki wa, saki ni hitokoto renraku suru you ni shite imasu.', 'Khi trả lời chậm, tôi cố gắng nhắn trước một câu.'),
      sentence('Hien', '内容が長いままだと、読みにくいですね。', 'Naiyou ga nagai mama da to, yominikui desu ne.', 'Nếu nội dung cứ dài như vậy thì sẽ khó đọc nhỉ.'),
      sentence('Sara', '旅行についてブログに投稿してみたいです。', 'Ryokou ni tsuite burogu ni toukou shite mitai desu.', 'Tôi muốn thử đăng blog về chuyến du lịch.'),
    ],
    [
      prompt('Phản hồi email', 'Nói bạn sẽ phản hồi một email công việc hoặc học tập như thế nào.', 'Hãy nhắc đến mức độ lịch sự.'),
      prompt('Chia sẻ online', 'Giới thiệu nội dung bạn muốn đăng lên blog hoặc SNS.', 'Dùng cấu trúc ... について.'),
    ],
    'Giao tiếp online hiệu quả không chỉ đúng nội dung mà còn cần nhịp điệu và mức lịch sự phù hợp.',
    ['Nói được cách phản hồi tin nhắn/email.', 'Trình bày được nội dung muốn đăng tải.', 'Biết nhấn vào tính lịch sự trong môi trường online.']
  ),
  createLesson(
    'preintermediate-a2b1',
    'Pre-Intermediate (A2/B1)',
    4,
    'Mục tiêu học tập và phát triển bản thân',
    'Nói về lý do học tiếng Nhật, mục tiêu gần và kế hoạch phát triển lâu hơn.',
    'Giúp người học trình bày định hướng cá nhân mạch lạc hơn.',
    '25-30 phút',
    ['mục tiêu', 'học tập', 'phát triển'],
    ['目標', '努力', '成長', '続ける', '挑戦'],
    ['ために', 'ようと思います', 'につれて'],
    [
      sentence('Noa', '将来、日本で働くために日本語を勉強しています。', 'Shourai, Nihon de hataraku tame ni nihongo o benkyou shite imasu.', 'Tôi học tiếng Nhật để sau này làm việc ở Nhật.'),
      sentence('Khoa', '今年は毎日少しずつ続けようと思います。', 'Kotoshi wa mainichi sukoshizutsu tsuzukeyou to omoimasu.', 'Năm nay tôi định duy trì mỗi ngày một chút.'),
      sentence('Noa', '話す回数が増えるにつれて、自信も出てきました。', 'Hanasu kaisuu ga fueru ni tsurete, jishin mo dete kimashita.', 'Càng nói nhiều, tôi càng thấy tự tin hơn.'),
    ],
    [
      prompt('Mục tiêu 6 tháng', 'Nói mục tiêu học tiếng Nhật của bạn trong 6 tháng tới.', 'Nên có cả lý do và hành động cụ thể.'),
      prompt('Nói về tiến bộ', 'Kể một điều bạn đã tiến bộ hơn so với trước.', 'Thử dùng ... につれて nếu phù hợp.'),
    ],
    'Các cuộc phỏng vấn và giới thiệu bản thân thường cần khả năng nói rõ mục tiêu như bài này.',
    ['Nói được mục tiêu học tập.', 'Nêu được kế hoạch hành động.', 'Liên hệ được tiến bộ với quá trình luyện tập.']
  ),
  createLesson(
    'preintermediate-a2b1',
    'Pre-Intermediate (A2/B1)',
    5,
    'Tham gia cộng đồng và hoạt động tình nguyện',
    'Giới thiệu hoạt động cộng đồng, lý do tham gia và điều mình học được.',
    'Mở rộng vốn nói sang các chủ đề xã hội gần gũi.',
    '25-30 phút',
    ['cộng đồng', 'tình nguyện', 'học hỏi'],
    ['地域', '活動', '参加', '役に立つ', '交流'],
    ['ことによって', 'ばかりでなく', 'ようになりました'],
    [
      sentence('Yuta', '地域の清掃活動に参加するようになりました。', 'Chiiki no seisou katsudou ni sanka suru you ni narimashita.', 'Tôi đã bắt đầu tham gia hoạt động dọn dẹp khu vực.'),
      sentence('Thu', '人の役に立つことによって、自分も元気になります。', 'Hito no yaku ni tatsu koto ni yotte, jibun mo genki ni narimasu.', 'Khi giúp ích cho người khác, bản thân tôi cũng thấy có năng lượng hơn.'),
      sentence('Yuta', '日本語の練習だけでなく、新しい交流も増えました。', 'Nihongo no renshuu dake de naku, atarashii kouryuu mo fuemashita.', 'Không chỉ luyện tiếng Nhật mà tôi còn có thêm nhiều mối quan hệ mới.'),
    ],
    [
      prompt('Giới thiệu hoạt động cộng đồng', 'Nói về một hoạt động bạn muốn tham gia tại nơi mình sống.', 'Thêm lý do cá nhân vì sao hoạt động đó có ý nghĩa.'),
      prompt('Nói điều nhận lại', 'Giải thích bạn học được gì từ việc giúp người khác.', 'Có thể dùng ... ことによって.'),
    ],
    'Chủ đề cộng đồng giúp người học dùng tiếng Nhật để nói về đóng góp và giá trị bản thân một cách tích cực.',
    ['Nói được hoạt động muốn tham gia.', 'Giải thích được ý nghĩa hoạt động.', 'Nêu được lợi ích cho bản thân và cộng đồng.']
  ),
  createLesson(
    'preintermediate-a2b1',
    'Pre-Intermediate (A2/B1)',
    6,
    'So sánh lựa chọn và đưa ra lý do',
    'Cân nhắc hai phương án rồi nói lựa chọn của mình với lý do rõ ràng.',
    'Luyện cấu trúc giải thích và so sánh khi phải đưa ra quyết định.',
    '25-30 phút',
    ['lựa chọn', 'so sánh', 'quyết định'],
    ['比較', '条件', '経験', '向いている', '決める'],
    ['よりも', '一方で', 'わけではありません'],
    [
      sentence('Mami', '在宅勤務のほうが自由ですが、いつも楽なわけではありません。', 'Zaitaku kinmu no hou ga jiyuu desu ga, itsumo raku na wake de wa arimasen.', 'Làm việc tại nhà tự do hơn nhưng không phải lúc nào cũng dễ.'),
      sentence('Son', '給料よりも成長できる環境を選びたいです。', 'Kyuuryou yori mo seichou dekiru kankyou o erabitai desu.', 'Tôi muốn chọn môi trường có thể phát triển hơn là chỉ lương.'),
      sentence('Mami', '一方で、通勤があると生活のリズムは作りやすいです。', 'Ippou de, tsuukin ga aru to seikatsu no rizumu wa tsukuri yasui desu.', 'Mặt khác, có đi làm trực tiếp thì dễ giữ nhịp sống hơn.'),
    ],
    [
      prompt('Chọn một phương án', 'So sánh hai lựa chọn như học online và học trực tiếp.', 'Nói rõ ưu, nhược và kết luận của bạn.'),
      prompt('Lý do cá nhân', 'Giải thích một quyết định quan trọng bạn từng đưa ra.', 'Thử dùng 一方で để cân bằng ý.'),
    ],
    'Khả năng nhìn vấn đề từ hai phía là bước chuyển rất rõ từ A2 lên B1.',
    ['So sánh được hai lựa chọn.', 'Nêu được lý do mang tính cá nhân.', 'Kết luận được phương án mình chọn.']
  ),
  createLesson(
    'intermediate1-b1',
    'Intermediate 1 (B1)',
    1,
    'Nói sâu hơn về sở thích văn hóa',
    'Giải thích vì sao mình yêu thích manga, phim, âm nhạc hay văn hóa Nhật.',
    'Tăng chiều sâu khi nói về chủ đề quan tâm cá nhân.',
    '30 phút',
    ['văn hóa', 'sở thích', 'cảm nhận'],
    ['文化', '魅力', '影響', '表現', '作品'],
    ['という点で', 'にとって', 'と感じます'],
    [
      sentence('Haru', 'この作品は日常を丁寧に描いているという点で魅力があります。', 'Kono sakuhin wa nichijou o teinei ni egaite iru to iu ten de miryoku ga arimasu.', 'Tác phẩm này hấp dẫn ở điểm khắc họa đời sống rất tinh tế.'),
      sentence('Luan', 'わたしにとって、音楽は気持ちを整える大事な時間です。', 'Watashi ni totte, ongaku wa kimochi o totonoeru daiji na jikan desu.', 'Với tôi, âm nhạc là khoảng thời gian quan trọng giúp cân bằng cảm xúc.'),
      sentence('Haru', '見れば見るほど奥が深いと感じます。', 'Mireba miru hodo oku ga fukai to kanjimasu.', 'Càng xem tôi càng cảm thấy nó có chiều sâu.'),
    ],
    [
      prompt('Giới thiệu tác phẩm yêu thích', 'Nói về một bộ phim, truyện hoặc bài hát bạn thích.', 'Thêm điều làm nó đặc biệt với bạn.'),
      prompt('Chia sẻ tác động', 'Giải thích sở thích đó ảnh hưởng thế nào đến suy nghĩ hoặc cuộc sống của bạn.', 'Có thể dùng ... にとって.'),
    ],
    'Khi nói về văn hóa, việc gắn trải nghiệm cá nhân với đặc điểm tác phẩm tạo cảm giác rất tự nhiên.',
    ['Giải thích được lý do yêu thích.', 'Mô tả được nét hấp dẫn cụ thể.', 'Liên hệ được với trải nghiệm bản thân.']
  ),
  createLesson(
    'intermediate1-b1',
    'Intermediate 1 (B1)',
    2,
    'Kể lại trải nghiệm lễ hội hoặc sự kiện',
    'Thuật lại trải nghiệm đáng nhớ với nhiều chi tiết, cảm xúc và điểm học được.',
    'Phát triển khả năng kể chuyện mạch lạc hơn.',
    '30 phút',
    ['trải nghiệm', 'lễ hội', 'kể chuyện'],
    ['印象', '参加者', '準備', '雰囲気', '思い出'],
    ['最初は ... が', 'その結果', 'おかげで'],
    [
      sentence('Shin', '最初は緊張しましたが、参加者がみんな親切でした。', 'Saisho wa kinchou shimashita ga, sankasha ga minna shinsetsu deshita.', 'Lúc đầu tôi căng thẳng nhưng mọi người tham gia đều rất thân thiện.'),
      sentence('My', '準備を手伝ったおかげで、裏側もよく分かりました。', 'Junbi o tetsudatta okage de, uragawa mo yoku wakarimashita.', 'Nhờ phụ chuẩn bị nên tôi cũng hiểu rõ phần hậu trường.'),
      sentence('Shin', 'その結果、その町にもっと親しみを感じるようになりました。', 'Sono kekka, sono machi ni motto shitashimi o kanjiru you ni narimashita.', 'Kết quả là tôi cảm thấy gắn bó với khu phố đó hơn.'),
    ],
    [
      prompt('Kể lại một trải nghiệm đáng nhớ', 'Thuật lại một sự kiện bạn từng tham gia theo thứ tự thời gian.', 'Nhớ thêm lúc đầu, diễn biến và kết quả.'),
      prompt('Chia sẻ điều học được', 'Nói trải nghiệm đó đã thay đổi góc nhìn của bạn ra sao.', 'Có thể dùng おかげで hoặc その結果.'),
    ],
    'Kể chuyện theo mạch mở đầu, diễn biến, kết quả giúp bài nói B1 rõ ràng và dễ theo dõi hơn.',
    ['Sắp xếp được trải nghiệm theo trình tự.', 'Thêm được cảm xúc cá nhân.', 'Kết nối được trải nghiệm với sự thay đổi nhận thức.']
  ),
  createLesson(
    'intermediate1-b1',
    'Intermediate 1 (B1)',
    3,
    'Chia sẻ trên SNS và phản hồi ý kiến',
    'Nói về nội dung mình đăng, phản ứng của người xem và cách phản hồi phù hợp.',
    'Luyện kỹ năng diễn đạt trước công chúng ở môi trường số.',
    '30 phút',
    ['SNS', 'phản hồi', 'cộng đồng online'],
    ['反応', '共感', 'コメント', '発信', '丁寧'],
    ['に対して', '一方で', 'こともあります'],
    [
      sentence('Kana', '旅行の写真を投稿すると、たくさんコメントをもらうことがあります。', 'Ryokou no shashin o toukou suru to, takusan komento o morau koto ga arimasu.', 'Khi đăng ảnh du lịch, đôi khi tôi nhận được rất nhiều bình luận.'),
      sentence('Giang', 'うれしい反応に対して、できるだけ丁寧に返したいです。', 'Ureshii hannou ni taishite, dekiru dake teinei ni kaeshitai desu.', 'Trước những phản hồi tích cực, tôi muốn trả lời lịch sự nhất có thể.'),
      sentence('Kana', '一方で、誤解を生まない表現も大切ですね。', 'Ippou de, gokai o umanai hyougen mo taisetsu desu ne.', 'Mặt khác, cách diễn đạt không gây hiểu lầm cũng rất quan trọng.'),
    ],
    [
      prompt('Nói về một bài đăng', 'Mô tả một nội dung bạn muốn đăng lên SNS và lý do.', 'Nhắc thêm phản hồi bạn mong đợi.'),
      prompt('Xử lý bình luận', 'Giải thích bạn sẽ phản hồi thế nào khi có người hiểu lầm ý bạn.', 'Nêu rõ cách giữ thái độ bình tĩnh và lịch sự.'),
    ],
    'Ở trình độ B1, biết nghĩ tới người nhận thông tin là bước tiến rất quan trọng.',
    ['Mô tả được mục đích đăng tải.', 'Nói được cách phản hồi bình luận.', 'Nhận thức được nguy cơ gây hiểu lầm.']
  ),
  createLesson(
    'intermediate1-b1',
    'Intermediate 1 (B1)',
    4,
    'Trao đổi về tin tức và vấn đề hiện tại',
    'Tóm tắt một tin tức gần đây và chia sẻ suy nghĩ cá nhân có cân nhắc.',
    'Rèn khả năng nói về thông tin ngoài phạm vi đời sống trực tiếp.',
    '30 phút',
    ['tin tức', 'xã hội', 'ý kiến'],
    ['記事', '話題', '影響', '課題', '情報源'],
    ['によると', 'その一方で', 'と言われています'],
    [
      sentence('Ryo', 'ニュースによると、観光客がまた増えているそうです。', 'Nyuusu ni yoru to, kankoukyaku ga mata fuete iru sou desu.', 'Theo tin tức, khách du lịch lại đang tăng lên.'),
      sentence('Tuan', '地域にとってよい面もありますが、課題も出てきます。', 'Chiiki ni totte yoi men mo arimasu ga, kadai mo dete kimasu.', 'Điều đó có mặt tốt với địa phương nhưng cũng nảy sinh thách thức.'),
      sentence('Ryo', 'その一方で、情報の受け取り方も考える必要があります。', 'Sono ippou de, jouhou no uketori kata mo kangaeru hitsuyou ga arimasu.', 'Mặt khác, cách tiếp nhận thông tin cũng cần được cân nhắc.'),
    ],
    [
      prompt('Tóm tắt tin tức', 'Chọn một chủ đề xã hội bạn từng nghe và tóm tắt trong 3-4 câu.', 'Nêu nguồn hoặc nơi bạn biết tin đó.'),
      prompt('Nêu hai mặt', 'Giải thích một điểm tốt và một điều cần chú ý của vấn đề đó.', 'Dùng ... が, ... その一方で.'),
    ],
    'Bài nói về tin tức không cần quá hàn lâm, nhưng cần biết giữ quan điểm cân bằng và có cơ sở.',
    ['Tóm tắt được một tin tức ngắn.', 'Nêu được ý kiến cá nhân có lý do.', 'Biết nói vấn đề theo hai mặt.']
  ),
  createLesson(
    'intermediate1-b1',
    'Intermediate 1 (B1)',
    5,
    'Làm việc nhóm và giải quyết vấn đề',
    'Trao đổi khi làm dự án, phân công vai trò và xử lý bất đồng trong nhóm.',
    'Luyện ngôn ngữ hợp tác, điều chỉnh và phản hồi mang tính xây dựng.',
    '30 phút',
    ['dự án', 'nhóm', 'hợp tác'],
    ['役割', '進め方', '共有', '意見', '調整'],
    ['ながら', 'ようにしたい', 'てもらえると助かります'],
    [
      sentence('Emi', '全体の流れを見ながら、資料をまとめます。', 'Zentai no nagare o minagara, shiryou o matomemasu.', 'Tôi sẽ tổng hợp tài liệu trong khi theo dõi toàn bộ tiến độ.'),
      sentence('Long', 'この部分はもう少し具体的にしてもらえると助かります。', 'Kono bubun wa mou sukoshi gutaiteki ni shite moraeru to tasukarimasu.', 'Nếu phần này được làm cụ thể hơn chút thì sẽ rất hữu ích.'),
      sentence('Emi', 'みんなが話しやすいようにしたいですね。', 'Minna ga hanashiyasui you ni shitai desu ne.', 'Mình muốn tạo không khí để mọi người dễ trao đổi hơn.'),
    ],
    [
      prompt('Phân công dự án', 'Đóng vai trưởng nhóm phân chia việc cho các thành viên.', 'Nói rõ ai làm gì và khi nào cần hoàn thành.'),
      prompt('Phản hồi tích cực', 'Góp ý cho một phần chưa ổn mà vẫn giữ thái độ hợp tác.', 'Thử dùng ... てもらえると助かります.'),
    ],
    'Trong môi trường nhóm, cách nói mềm nhưng rõ ràng thường hiệu quả hơn câu mệnh lệnh trực diện.',
    ['Phân công được vai trò.', 'Đưa được góp ý mang tính xây dựng.', 'Giữ được giọng điệu hợp tác khi bất đồng.']
  ),
  createLesson(
    'intermediate1-b1',
    'Intermediate 1 (B1)',
    6,
    'Thuyết trình ngắn và nhận phản hồi',
    'Giới thiệu một dự án hoặc ý tưởng, sau đó phản hồi câu hỏi từ người nghe.',
    'Tăng khả năng trình bày mạch lạc trước nhóm nhỏ.',
    '30 phút',
    ['thuyết trình', 'ý tưởng', 'phản hồi'],
    ['発表', '目的', '工夫', '改善', '質問'],
    ['まず', '次に', '最後に'],
    [
      sentence('Nao', 'まず、この企画の目的を説明します。', 'Mazu, kono kikaku no mokuteki o setsumei shimasu.', 'Trước hết tôi xin giải thích mục tiêu của kế hoạch này.'),
      sentence('Kiet', '次に、実際に行った工夫について話します。', 'Tsugi ni, jissai ni okonatta kufuu ni tsuite hanashimasu.', 'Tiếp theo tôi sẽ nói về những điều chỉnh mà chúng tôi đã thực hiện.'),
      sentence('Nao', 'ご質問をもとに、さらに改善したいと思います。', 'Goshitsumon o moto ni, sara ni kaizen shitai to omoimasu.', 'Dựa trên câu hỏi của mọi người, tôi muốn cải thiện thêm nữa.'),
    ],
    [
      prompt('Mini presentation', 'Chuẩn bị bài nói 1 phút về một ý tưởng học tập hoặc dự án nhỏ.', 'Nói theo cấu trúc mở đầu, nội dung, kết luận.'),
      prompt('Nhận câu hỏi', 'Trả lời một câu hỏi giả định về bài trình bày của bạn.', 'Giữ giọng bình tĩnh, rõ ràng và cởi mở.'),
    ],
    'Một bài thuyết trình tốt ở mức B1 cần logic rõ ràng hơn là từ vựng quá khó.',
    ['Trình bày được mục tiêu của ý tưởng.', 'Sắp xếp ý theo trình tự.', 'Phản hồi được câu hỏi ngắn sau phần nói.']
  ),
  createLesson(
    'intermediate2-b1',
    'Intermediate 2 (B1)',
    1,
    'Tư vấn sức khỏe và lối sống',
    'Mô tả tình trạng sức khỏe, hỏi lời khuyên và đưa ra gợi ý có căn cứ.',
    'Đẩy khả năng giao tiếp lên mức tinh tế hơn trong tình huống cần quan tâm người khác.',
    '30 phút',
    ['sức khỏe', 'lối sống', 'lời khuyên'],
    ['体調', '睡眠', '運動', '習慣', '改善'],
    ['ほうがよさそうです', 'ようです', 'ためには'],
    [
      sentence('Doctor', '最近、睡眠の質が下がっているようですね。', 'Saikin, suimin no shitsu ga sagatte iru you desu ne.', 'Có vẻ gần đây chất lượng giấc ngủ của bạn đang giảm.'),
      sentence('Mai', '体調を改善するためには、少し運動したほうがよさそうです。', 'Taichou o kaizen suru tame ni wa, sukoshi undou shita hou ga yosasou desu.', 'Để cải thiện sức khỏe, có lẽ tôi nên vận động một chút.'),
      sentence('Doctor', '無理を続けないことも大切です。', 'Muri o tsuzukenai koto mo taisetsu desu.', 'Việc không cố quá sức cũng rất quan trọng.'),
    ],
    [
      prompt('Hỏi lời khuyên sức khỏe', 'Nói về một thói quen chưa tốt của bạn và xin lời khuyên.', 'Nhắc đến nguyên nhân bạn nghĩ có liên quan.'),
      prompt('Đưa lời khuyên', 'Đóng vai người tư vấn cho bạn bè về giấc ngủ hoặc vận động.', 'Hãy dùng giọng điệu mềm, không áp đặt.'),
    ],
    'Khả năng đưa lời khuyên mềm mại thể hiện độ trưởng thành rất rõ trong giao tiếp B1.',
    ['Nói được tình trạng sức khỏe.', 'Xin hoặc cho lời khuyên hợp lý.', 'Giữ được sắc thái quan tâm, không quá mạnh.']
  ),
  createLesson(
    'intermediate2-b1',
    'Intermediate 2 (B1)',
    2,
    'Giới thiệu truyền thống và lịch sử quê hương',
    'Trình bày cho người Nhật hiểu về nét văn hóa, lịch sử hoặc nghệ thuật của quê hương mình.',
    'Rèn năng lực giải thích những điều quen thuộc bằng tiếng Nhật.',
    '30 phút',
    ['truyền thống', 'lịch sử', 'văn hóa quê hương'],
    ['伝統', '歴史', '職人', '価値', '受け継ぐ'],
    ['といわれています', 'に加えて', 'につながっています'],
    [
      sentence('Anzu', 'この芸能は何百年も前から受け継がれてきたといわれています。', 'Kono geinou wa nanbyakunen mo mae kara uketsugarete kita to iwarete imasu.', 'Người ta nói loại hình nghệ thuật này đã được truyền lại từ hàng trăm năm trước.'),
      sentence('Hoang', '美しさに加えて、地域の誇りにもつながっています。', 'Utsukushisa ni kuwaete, chiiki no hokori ni mo tsunagatte imasu.', 'Ngoài vẻ đẹp, nó còn gắn với niềm tự hào của địa phương.'),
      sentence('Anzu', '初めて見る人にも分かりやすく伝えたいです。', 'Hajimete miru hito ni mo wakari yasuku tsutaetai desu.', 'Tôi muốn truyền đạt sao cho cả người xem lần đầu cũng dễ hiểu.'),
    ],
    [
      prompt('Giới thiệu một truyền thống', 'Nói về một lễ hội, nghề thủ công hoặc loại hình nghệ thuật ở quê bạn.', 'Nêu nguồn gốc ngắn và ý nghĩa hiện nay.'),
      prompt('Giải thích cho người mới', 'Tập nói lại nội dung trên sao cho người chưa biết gì cũng hiểu.', 'Tránh dùng từ quá khó, ưu tiên ví dụ cụ thể.'),
    ],
    'Đây là kiểu giao tiếp rất thực tế khi người học muốn giới thiệu đất nước mình bằng tiếng Nhật.',
    ['Giới thiệu được một yếu tố văn hóa quê hương.', 'Nêu được ý nghĩa của nó.', 'Giải thích được theo cách dễ hiểu cho người nghe.']
  ),
  createLesson(
    'intermediate2-b1',
    'Intermediate 2 (B1)',
    3,
    'Nói về vấn đề xã hội và góc nhìn cá nhân',
    'Bàn luận nhẹ về một vấn đề xã hội và giải thích quan điểm của mình có cân nhắc.',
    'Tiến gần hơn tới hội thoại học thuật nhẹ nhưng vẫn bám đời sống.',
    '30 phút',
    ['xã hội', 'góc nhìn', 'thảo luận'],
    ['社会', '少子化', '支援', '環境', '視点'],
    ['だけでなく', 'というより', '必要がある'],
    [
      sentence('Mika', 'この問題は若い人だけでなく、社会全体に関わっています。', 'Kono mondai wa wakai hito dake de naku, shakai zentai ni kakawatte imasu.', 'Vấn đề này không chỉ liên quan đến người trẻ mà còn tới toàn xã hội.'),
      sentence('Binh', '責任を問うというより、支援の形を考える必要があると思います。', 'Sekinin o tou to iu yori, shien no katachi o kangaeru hitsuyou ga aru to omoimasu.', 'Tôi nghĩ thay vì chỉ hỏi trách nhiệm, cần nghĩ tới hình thức hỗ trợ.'),
      sentence('Mika', '一つの視点だけでは見えないことも多いですね。', 'Hitotsu no shiten dake de wa mienai koto mo ooi desu ne.', 'Chỉ nhìn từ một góc thì có nhiều điều sẽ không thấy được.'),
    ],
    [
      prompt('Nêu vấn đề xã hội', 'Chọn một vấn đề xã hội bạn quan tâm và nói vì sao nó đáng chú ý.', 'Đừng quên nói ai bị ảnh hưởng.'),
      prompt('Bày tỏ góc nhìn mềm', 'Nói quan điểm của bạn nhưng vẫn để mở khả năng nhìn nhận khác.', 'Thử dùng ... というより ...'),
    ],
    'Điểm quan trọng không phải là nói thật phức tạp mà là cho thấy bạn biết cân nhắc nhiều phía.',
    ['Nêu được một vấn đề xã hội.', 'Giải thích được góc nhìn của bản thân.', 'Dùng được cấu trúc thể hiện sắc thái tinh tế hơn.']
  ),
  createLesson(
    'intermediate2-b1',
    'Intermediate 2 (B1)',
    4,
    'Chăm sóc khách hàng và thương lượng',
    'Giải thích yêu cầu, phản hồi khiếu nại và đề xuất giải pháp hợp lý.',
    'Luyện giao tiếp dịch vụ ở mức lịch sự và xử lý tình huống.',
    '30 phút',
    ['dịch vụ', 'khiếu nại', 'thương lượng'],
    ['対応', '交換', '返金', '事情', '納得'],
    ['申し訳ありませんが', 'ことになっています', 'できる限り'],
    [
      sentence('Staff', '申し訳ありませんが、この商品は本日中の交換となっています。', 'Moushiwake arimasen ga, kono shouhin wa honjitsujuu no koukan to natte imasu.', 'Rất xin lỗi, sản phẩm này được quy định đổi trong ngày hôm nay.'),
      sentence('Customer', '事情を説明していただければ、納得しやすいです。', 'Jijou o setsumei shite itadakereba, nattoku shiyasui desu.', 'Nếu anh/chị giải thích tình hình thì tôi sẽ dễ thông cảm hơn.'),
      sentence('Staff', 'できる限り対応いたしますので、少々お待ちください。', 'Dekiru kagiri taiou itashimasu node, shoushou omachi kudasai.', 'Chúng tôi sẽ cố gắng hỗ trợ tối đa, xin vui lòng chờ một chút.'),
    ],
    [
      prompt('Xử lý khiếu nại', 'Đóng vai nhân viên tiếp nhận một phàn nàn của khách.', 'Nói rõ chính sách nhưng vẫn giữ thái độ mềm mại.'),
      prompt('Thương lượng giải pháp', 'Đề xuất một phương án trung gian cho khách hàng.', 'Hãy cho thấy bạn đang cố gắng hỗ trợ.'),
    ],
    'Dịch vụ tốt không chỉ nằm ở nội dung giải quyết mà còn ở nhịp điệu và thái độ khi nói.',
    ['Tiếp nhận được yêu cầu phàn nàn.', 'Giải thích được quy định.', 'Đưa ra được phương án hỗ trợ hợp lý.']
  ),
  createLesson(
    'intermediate2-b1',
    'Intermediate 2 (B1)',
    5,
    'Kế hoạch nghề nghiệp và tầm nhìn tương lai',
    'Trình bày định hướng nghề nghiệp, kỹ năng muốn phát triển và lý do chọn con đường đó.',
    'Củng cố năng lực nói trong bối cảnh nghề nghiệp và phỏng vấn.',
    '30 phút',
    ['nghề nghiệp', 'tương lai', 'định hướng'],
    ['進路', '強み', '経験', '貢献', '専門性'],
    ['を通して', 'に向けて', 'ようにしたい'],
    [
      sentence('Keita', 'これまでの経験を通して、人を支える仕事に興味を持つようになりました。', 'Kore made no keiken o tooshite, hito o sasaeru shigoto ni kyoumi o motsu you ni narimashita.', 'Thông qua những trải nghiệm đến nay, tôi bắt đầu quan tâm đến công việc hỗ trợ con người.'),
      sentence('Nga', '将来は教育の分野に向けて、専門性を高めたいです。', 'Shourai wa kyouiku no bunya ni mukete, senmonsei o takametai desu.', 'Trong tương lai tôi muốn nâng cao chuyên môn theo hướng giáo dục.'),
      sentence('Keita', '自分の強みをもっと具体的に伝えられるようにしたいです。', 'Jibun no tsuyomi o motto gutaiteki ni tsutaerareru you ni shitai desu.', 'Tôi muốn có thể diễn đạt điểm mạnh của mình cụ thể hơn.'),
    ],
    [
      prompt('Giới thiệu định hướng nghề nghiệp', 'Nói về công việc bạn muốn làm trong tương lai và vì sao.', 'Nhắc đến ít nhất một kỹ năng bạn muốn phát triển.'),
      prompt('Phản xạ phỏng vấn', 'Trả lời câu hỏi: Điểm mạnh của bạn là gì?', 'Hãy gắn điểm mạnh với một trải nghiệm cụ thể.'),
    ],
    'Những chủ đề nghề nghiệp cần tính cụ thể: lý do, kỹ năng, trải nghiệm và hướng phát triển.',
    ['Trình bày được hướng đi nghề nghiệp.', 'Nói được điểm mạnh hoặc kỹ năng cần phát triển.', 'Liên kết được mục tiêu với trải nghiệm cá nhân.']
  ),
  createLesson(
    'intermediate2-b1',
    'Intermediate 2 (B1)',
    6,
    'Tranh luận nhẹ và thuyết phục',
    'Đưa ra lập luận, phản biện mềm và thuyết phục người nghe mà không gây căng thẳng.',
    'Kết thúc lộ trình bằng năng lực giao tiếp giàu lý do và có chiến lược diễn đạt.',
    '30 phút',
    ['tranh luận', 'lập luận', 'thuyết phục'],
    ['主張', '根拠', '納得', '柔軟', '提案'],
    ['とはいえ', 'だからこそ', 'べきだと思います'],
    [
      sentence('Rin', '時間はかかります。とはいえ、長い目で見れば必要な準備です。', 'Jikan wa kakarimasu. To wa ie, nagai me de mireba hitsuyou na junbi desu.', 'Dù mất thời gian, nhìn dài hạn thì đây vẫn là phần chuẩn bị cần thiết.'),
      sentence('Phuc', '問題があるからこそ、今のうちに話し合うべきだと思います。', 'Mondai ga aru kara koso, ima no uchi ni hanashiau beki da to omoimasu.', 'Chính vì có vấn đề nên tôi nghĩ chúng ta cần bàn ngay từ bây giờ.'),
      sentence('Rin', '相手の立場を考えながら提案すると、納得してもらいやすいです。', 'Aite no tachiba o kangaenagara teian suru to, nattoku shite morai yasui desu.', 'Nếu đề xuất trong khi nghĩ tới lập trường của đối phương thì sẽ dễ được đồng thuận hơn.'),
    ],
    [
      prompt('Thuyết phục bạn cùng nhóm', 'Chọn một ý tưởng và thuyết phục người khác đồng ý với bạn.', 'Nói rõ vấn đề, lý do và lợi ích.'),
      prompt('Phản biện mềm', 'Phản hồi lại một ý kiến khác mà vẫn giữ tinh thần hợp tác.', 'Dùng một câu thể hiện bạn hiểu góc nhìn của người kia trước.'),
    ],
    'Thuyết phục tốt không phải là nói mạnh hơn, mà là biết xây lập luận phù hợp với người nghe.',
    ['Trình bày được một lập luận có lý do.', 'Phản biện được mà không quá đối đầu.', 'Thể hiện được sự linh hoạt khi thuyết phục.']
  ),
];

export const marugotoStats = {
  totalLevels: marugotoLevels.length,
  totalLessons: marugotoLessons.length,
  totalSentences: marugotoLessons.reduce((count, lesson) => count + lesson.sentences.length, 0),
};
