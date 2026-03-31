'use client';

import React, { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Mic, Play, Square, ArrowLeft, Volume2, CheckCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const lessonData = {
  id: 'l1',
  title: 'Bài 1: Chào hỏi và Giới thiệu bản thân',
  level: 'A1 (N5)',
  canDo: 'Có thể chào hỏi cơ bản và giới thiệu tên, quốc tịch, nghề nghiệp.',
  dialogues: [
    {
      id: 1,
      speaker: 'Tanaka',
      text: 'はじめまして。田中です。',
      romaji: 'Hajimemashite. Tanaka desu.',
      translation: 'Rất vui được gặp bạn. Tôi là Tanaka.',
      audioUrl: '#', // Placeholder
    },
    {
      id: 2,
      speaker: 'Maria',
      text: 'はじめまして。マリアです。フィリピンから来ました。',
      romaji: 'Hajimemashite. Maria desu. Firipin kara kimashita.',
      translation: 'Rất vui được gặp bạn. Tôi là Maria. Tôi đến từ Philippines.',
      audioUrl: '#',
    },
    {
      id: 3,
      speaker: 'Tanaka',
      text: 'どうぞよろしくお願いします。',
      romaji: 'Douzo yoroshiku onegaishimasu.',
      translation: 'Rất mong được giúp đỡ.',
      audioUrl: '#',
    },
    {
      id: 4,
      speaker: 'Maria',
      text: 'よろしくお願いします。',
      romaji: 'Yoroshiku onegaishimasu.',
      translation: 'Rất mong được giúp đỡ.',
      audioUrl: '#',
    }
  ]
};

export default function SpeakingLessonPage() {
  const params = useParams();
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [activeDialogue, setActiveDialogue] = useState<number | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<Record<number, string>>({});
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async (dialogueId: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(prev => ({ ...prev, [dialogueId]: audioUrl }));
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setActiveDialogue(dialogueId);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setActiveDialogue(null);
    }
  };

  const playAudio = (url: string) => {
    if (url === '#') {
      alert('Audio mẫu chưa có sẵn.');
      return;
    }
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/speaking" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-sans font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại danh sách bài học
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full font-mono">
            {lessonData.level}
          </span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#2c2c2c] mb-4">
          {lessonData.title}
        </h1>
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
          <p className="text-sm text-indigo-800 font-sans font-medium mb-1">Mục tiêu Can-do:</p>
          <p className="text-lg text-indigo-900 italic font-serif">
            &quot;{lessonData.canDo}&quot;
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#2c2c2c] mb-4 flex items-center">
          <Volume2 className="mr-2 h-6 w-6 text-indigo-600" />
          Hội thoại mẫu
        </h2>
        
        {lessonData.dialogues.map((dialogue) => (
          <div key={dialogue.id} className="paper-card relative">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <span className="font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm mr-3">
                    {dialogue.speaker}
                  </span>
                  <button 
                    onClick={() => playAudio(dialogue.audioUrl)}
                    className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                    title="Nghe mẫu"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-2xl font-medium text-[#2c2c2c] mb-2 leading-relaxed">
                  {dialogue.text}
                </p>
                <p className="text-gray-500 font-mono text-sm mb-2">
                  {dialogue.romaji}
                </p>
                <p className="text-gray-600 font-sans italic border-l-2 border-gray-300 pl-3">
                  {dialogue.translation}
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center min-w-[120px] border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6 border-dashed">
                {isRecording && activeDialogue === dialogue.id ? (
                  <button 
                    onClick={stopRecording}
                    className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors animate-pulse"
                  >
                    <Square className="h-6 w-6 mb-1" fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Dừng</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => startRecording(dialogue.id)}
                    disabled={isRecording}
                    className={`flex flex-col items-center justify-center w-16 h-16 rounded-full transition-colors ${
                      isRecording ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                    }`}
                  >
                    <Mic className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Ghi âm</span>
                  </button>
                )}
                
                {recordedAudio[dialogue.id] && (
                  <div className="mt-4 flex flex-col items-center w-full">
                    <button 
                      onClick={() => playAudio(recordedAudio[dialogue.id])}
                      className="flex items-center justify-center w-full py-2 px-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium mb-2"
                    >
                      <Play className="h-4 w-4 mr-1" fill="currentColor" />
                      Nghe lại
                    </button>
                    <div className="flex items-center text-green-600 text-xs font-medium">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Đã ghi âm
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-200">
          Hoàn thành bài học
        </button>
      </div>
    </div>
  );
}
