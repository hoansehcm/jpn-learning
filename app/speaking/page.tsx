import React from 'react';
import Link from 'next/link';
import { Mic, Play, CheckCircle, BookOpen } from 'lucide-react';

const speakingLessons = [
  {
    id: 'l1',
    title: 'Bài 1: Chào hỏi và Giới thiệu bản thân',
    level: 'A1 (N5)',
    canDo: 'Có thể chào hỏi cơ bản và giới thiệu tên, quốc tịch, nghề nghiệp.',
    topics: ['Chào hỏi', 'Giới thiệu bản thân', 'Quốc gia'],
    completed: true,
  },
  {
    id: 'l2',
    title: 'Bài 2: Mua sắm',
    level: 'A1 (N5)',
    canDo: 'Có thể hỏi giá tiền và mua đồ tại cửa hàng.',
    topics: ['Số đếm', 'Tiền tệ', 'Mua sắm'],
    completed: false,
  },
  {
    id: 'l3',
    title: 'Bài 3: Sở thích và Cuối tuần',
    level: 'A2 (N4)',
    canDo: 'Có thể nói về sở thích và những việc thường làm vào cuối tuần.',
    topics: ['Sở thích', 'Thời gian rảnh', 'Tần suất'],
    completed: false,
  },
];

export default function SpeakingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-[#2c2c2c] mb-2 flex items-center">
          <Mic className="mr-3 h-8 w-8 text-indigo-600" />
          Luyện Nói (Speaking)
        </h1>
        <p className="text-gray-600 font-sans text-lg">
          Luyện tập giao tiếp theo lộ trình Marugoto. Tập trung vào các mục tiêu &quot;Can-do&quot; thực tế.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakingLessons.map((lesson) => (
          <Link href={`/speaking/${lesson.id}`} key={lesson.id}>
            <div className="paper-card h-full flex flex-col hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full font-mono">
                  {lesson.level}
                </span>
                {lesson.completed && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
              
              <h3 className="text-xl font-bold text-[#2c2c2c] mb-3 font-serif line-clamp-2">
                {lesson.title}
              </h3>
              
              <div className="mb-4 flex-grow">
                <p className="text-sm text-gray-600 font-sans mb-2 font-medium">Mục tiêu Can-do:</p>
                <p className="text-sm text-gray-700 italic border-l-2 border-indigo-300 pl-3">
                  &quot;{lesson.canDo}&quot;
                </p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-200 border-dashed">
                <div className="flex flex-wrap gap-2">
                  {lesson.topics.map((topic, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
