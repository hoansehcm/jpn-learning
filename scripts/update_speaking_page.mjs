import fs from 'fs';
import path from 'path';

const speakingPageContent = `'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Play, CheckCircle, Volume2, Loader2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function SpeakingPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch('/data/marugoto_speaking.json')
      .then(res => res.json())
      .then(data => {
        setLessons(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi tải dữ liệu Marugoto:', err);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Trình duyệt của bạn không hỗ trợ tính năng đọc văn bản.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="mb-10 text-center sm:text-left bg-emerald-50 dark:bg-emerald-950/20 p-8 rounded-[40px] border border-emerald-100 dark:border-emerald-900/30">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4 flex items-center justify-center sm:justify-start gap-4">
          <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-2xl">
            <Mic className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          Giao tiếp thực tế Marugoto
        </h1>
        <p className="text-muted-foreground font-sans text-lg max-w-3xl">
          Luyện tập nghe và lặp lại theo giáo trình Marugoto. Nhấn vào biểu tượng loa để nghe phát âm, sau đó luyện tập nói theo.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 flex-col gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-muted-foreground font-medium">Đang tải dữ liệu mẫu câu giao tiếp...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lessons.map((lesson, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={lesson.id} 
              className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header Card */}
              <div 
                className="p-6 cursor-pointer flex flex-col gap-4 relative"
                onClick={() => toggleExpand(lesson.id)}
              >
                <div className="flex justify-between items-start">
                  <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full tracking-wider">
                    {lesson.lesson}
                  </span>
                  {expandedId === lesson.id ? (
                     <div className="bg-secondary rounded-full px-3 py-1 text-xs text-muted-foreground">Thu gọn</div>
                  ) : (
                     <div className="bg-emerald-600 text-white rounded-full px-3 py-1 text-xs font-medium">Mở rộng</div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-foreground font-serif">
                  {lesson.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-2">
                  {lesson.topics.map((topic, idx) => (
                    <span key={idx} className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-xl">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sentences List */}
              <AnimatePresence>
                {expandedId === lesson.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border bg-secondary/30"
                  >
                    <div className="p-6 space-y-4">
                      {lesson.sentences.map((sentence, idx) => (
                        <div key={idx} className="bg-background border border-border rounded-2xl p-4 flex gap-4 items-start shadow-sm">
                          <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                playTTS(sentence.ja);
                            }}
                            className="h-12 w-12 flex-shrink-0 bg-emerald-100 hover:bg-emerald-600 dark:bg-emerald-900/40 text-emerald-600 hover:text-white dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white rounded-full flex items-center justify-center transition-colors active:scale-95"
                            title="Nghe câu này"
                          >
                            <Volume2 className="w-6 h-6" />
                          </button>
                          <div className="flex-1">
                            <p className="text-xl font-medium text-foreground mb-1 font-serif">{sentence.ja}</p>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2">{sentence.romaji}</p>
                            <p className="text-[15px] text-muted-foreground">{sentence.vi}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), 'app', 'speaking', 'page.tsx'), speakingPageContent, 'utf-8');
console.log('Update app/speaking/page.tsx success');
