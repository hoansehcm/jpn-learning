'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { sampleVocabulary } from '../../lib/sampleData';
import { BrainCircuit, CheckCircle2, RotateCcw, Frown, Meh, Smile, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Flashcards() {
  const { user } = useAuth();
  const [cards, setCards] = useState(sampleVocabulary);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    // In a real app, calculate next review date based on rating using SRS algorithm
    // and save to Firebase.
    
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Hoàn thành xuất sắc!</h2>
          <p className="text-slate-600 mb-8 text-lg">
            Bạn đã ôn tập xong {cards.length} thẻ ghi nhớ hôm nay. Hãy giữ vững phong độ nhé!
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => {
                setCurrentIndex(0);
                setIsFinished(false);
                setIsFlipped(false);
              }}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              <RotateCcw className="w-5 h-5" /> Ôn tập lại
            </button>
            <Link 
              href="/dashboard"
              className="w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center"
            >
              Về bảng điều khiển
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Ôn tập hàng ngày</h1>
            <p className="text-slate-500 font-medium">Thẻ {currentIndex + 1} / {cards.length}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Flashcard Container */}
      <div className="w-full max-w-2xl perspective-1000 relative h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-flipped' : '-front')}
            initial={{ rotateX: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {!isFlipped ? (
              // Front of card
              <div 
                onClick={handleFlip}
                className="w-full h-full bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center p-12 cursor-pointer hover:shadow-2xl transition-shadow group relative overflow-hidden"
              >
                <div className="absolute top-6 left-6 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold">
                  {currentCard.level}
                </div>
                <div className="absolute top-6 right-6 text-slate-400 text-sm font-medium">
                  Chạm để lật
                </div>
                
                <h2 className="text-7xl font-black text-slate-900 mb-6 group-hover:scale-105 transition-transform duration-300">
                  {currentCard.word}
                </h2>
                
                <p className="text-slate-400 font-medium text-lg mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  Nhấn phím Space hoặc click để xem đáp án
                </p>
              </div>
            ) : (
              // Back of card
              <div className="w-full h-full bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <div className="flex-1 flex flex-col justify-center relative z-10">
                  <div className="text-center mb-8">
                    <h2 className="text-5xl font-black text-slate-900 mb-4">{currentCard.word}</h2>
                    <div className="text-2xl text-indigo-600 font-medium mb-2">【{currentCard.kana}】</div>
                    <div className="text-lg text-slate-500 mb-6">{currentCard.romaji}</div>
                    <p className="text-3xl font-bold text-slate-800">{currentCard.meaning}</p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-lg font-bold text-slate-900 mb-1">{currentCard.examples[0].ja}</p>
                    <p className="text-slate-600">{currentCard.examples[0].vi}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rating Buttons */}
      <div className={`w-full max-w-2xl mt-8 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="grid grid-cols-4 gap-4">
          <button 
            onClick={() => handleRate('again')}
            className="flex flex-col items-center justify-center gap-2 py-4 bg-white border-2 border-rose-100 hover:border-rose-500 hover:bg-rose-50 rounded-2xl transition-all group"
          >
            <Frown className="w-8 h-8 text-rose-400 group-hover:text-rose-600" />
            <span className="font-bold text-rose-600">Lại (1p)</span>
          </button>
          <button 
            onClick={() => handleRate('hard')}
            className="flex flex-col items-center justify-center gap-2 py-4 bg-white border-2 border-amber-100 hover:border-amber-500 hover:bg-amber-50 rounded-2xl transition-all group"
          >
            <Meh className="w-8 h-8 text-amber-400 group-hover:text-amber-600" />
            <span className="font-bold text-amber-600">Khó (10p)</span>
          </button>
          <button 
            onClick={() => handleRate('good')}
            className="flex flex-col items-center justify-center gap-2 py-4 bg-white border-2 border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50 rounded-2xl transition-all group"
          >
            <Smile className="w-8 h-8 text-emerald-400 group-hover:text-emerald-600" />
            <span className="font-bold text-emerald-600">Tốt (1n)</span>
          </button>
          <button 
            onClick={() => handleRate('easy')}
            className="flex flex-col items-center justify-center gap-2 py-4 bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 rounded-2xl transition-all group"
          >
            <Sparkles className="w-8 h-8 text-blue-400 group-hover:text-blue-600" />
            <span className="font-bold text-blue-600">Dễ (4n)</span>
          </button>
        </div>
      </div>

    </div>
  );
}
