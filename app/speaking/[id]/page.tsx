'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Mic,
  Play,
  RefreshCw,
  Square,
  Volume2,
} from 'lucide-react';
import { marugotoLessons, marugotoLevels } from '../../../lib/marugotoData';

export default function SpeakingLessonPage() {
  const params = useParams();
  const lessonId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const lesson = marugotoLessons.find((item) => item.id === lessonId);
  const level = marugotoLevels.find((item) => item.id === lesson?.levelId);
  const levelLessons = lesson ? marugotoLessons.filter((item) => item.levelId === lesson.levelId) : [];
  const currentIndex = lesson ? levelLessons.findIndex((item) => item.id === lesson.id) : -1;
  const previousLesson = currentIndex > 0 ? levelLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < levelLessons.length - 1 ? levelLessons[currentIndex + 1] : null;

  const [isRecording, setIsRecording] = useState(false);
  const [activeSentence, setActiveSentence] = useState<number | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<Record<number, string>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordedAudioRef = useRef<Record<number, string>>({});

  useEffect(() => {
    return () => {
      Object.values(recordedAudioRef.current).forEach((url) => URL.revokeObjectURL(url));
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const playTTS = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn chưa hỗ trợ đọc tiếng Nhật.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  };

  const startRecording = async (sentenceIndex: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      streamRef.current = stream;
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        setRecordedAudio((previous) => {
          if (previous[sentenceIndex]) {
            URL.revokeObjectURL(previous[sentenceIndex]);
          }

          const nextAudio = {
            ...previous,
            [sentenceIndex]: audioUrl,
          };

          recordedAudioRef.current = nextAudio;
          return nextAudio;
        });

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      recorder.start();
      setIsRecording(true);
      setActiveSentence(sentenceIndex);
    } catch (error) {
      console.error('Microphone error', error);
      alert('Không thể truy cập micro. Hãy kiểm tra quyền truy cập rồi thử lại.');
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) {
      return;
    }

    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setActiveSentence(null);
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((error) => console.error('Audio playback error', error));
  };

  if (!lesson || !level) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="surface-card rounded-[34px] p-8 text-center">
          <p className="font-serif text-3xl font-bold">Không tìm thấy bài Marugoto này</p>
          <p className="mt-3 text-soft">Bài có thể đã bị đổi id hoặc chưa được tạo trong curriculum hiện tại.</p>
          <Link
            href="/speaking"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--accent-ink)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại lộ trình Marugoto
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/speaking" className="inline-flex items-center gap-2 rounded-full soft-pill px-4 py-2 text-sm font-medium text-soft">
          <ArrowLeft className="h-4 w-4" />
          Quay lại lộ trình Marugoto
        </Link>

        <div className="flex flex-wrap gap-2">
          {previousLesson && (
            <Link href={`/speaking/${previousLesson.id}`} className="inline-flex items-center gap-2 rounded-full soft-pill px-4 py-2 text-sm font-medium text-soft">
              <ArrowLeft className="h-4 w-4" />
              {previousLesson.lesson}
            </Link>
          )}
          {nextLesson && (
            <Link href={`/speaking/${nextLesson.id}`} className="inline-flex items-center gap-2 rounded-full soft-pill px-4 py-2 text-sm font-medium text-soft">
              {nextLesson.lesson}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      <section className={`mt-5 overflow-hidden rounded-[40px] border border-white/70 bg-gradient-to-br ${level.gradientClass} p-6 shadow-sm sm:p-8 lg:p-10`}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${level.badgeClass}`}>{level.label}</span>
              <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">{lesson.lesson}</span>
              <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">{lesson.duration}</span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">{lesson.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{lesson.canDo}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] bg-white/75 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Focus</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{lesson.focus}</p>
              </div>
              <div className="rounded-[26px] bg-white/75 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Culture Note</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{lesson.cultureNote}</p>
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[30px] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">Mở bài nhanh</p>
            <p className="mt-3 font-serif text-3xl">{lesson.sentences[0].ja}</p>
            <p className="mt-2 text-sm font-medium text-emerald-700">{lesson.sentences[0].romaji}</p>
            <p className="mt-2 text-sm leading-6 text-soft">{lesson.sentences[0].vi}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => playTTS(lesson.sentences[0].ja)}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-ink)]"
              >
                <Volume2 className="h-4 w-4" />
                Nghe câu mẫu
              </button>
              <button
                onClick={() => playTTS(lesson.sentences.map((item) => item.ja).join(' '))}
                className="inline-flex items-center gap-2 rounded-full soft-pill px-4 py-2.5 text-sm font-medium text-soft"
              >
                <RefreshCw className="h-4 w-4" />
                Nghe liên tục
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {lesson.topics.map((topic) => (
                <span key={topic} className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium text-soft">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-5">
          <div className="surface-panel rounded-[34px] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-soft">Hội thoại mẫu</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">Nghe, nhại lại, rồi tự ghi âm</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                <Mic className="h-4 w-4" />
                {lesson.sentences.length} câu luyện nói
              </div>
            </div>
          </div>

          {lesson.sentences.map((item, index) => (
            <article key={`${lesson.id}-${index}`} className="surface-card rounded-[30px] p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-sm font-semibold">{item.speaker}</span>
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-soft">Câu {index + 1}</span>
                  </div>

                  <p className="mt-4 font-serif text-3xl leading-tight">{item.ja}</p>
                  <p className="mt-3 text-sm font-medium text-emerald-700">{item.romaji}</p>
                  <p className="mt-3 text-sm leading-7 text-soft">{item.vi}</p>
                </div>

                <div className="grid w-full gap-3 sm:max-w-[240px]">
                  <button
                    onClick={() => playTTS(item.ja)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--accent-ink)]"
                  >
                    <Volume2 className="h-4 w-4" />
                    Nghe mẫu
                  </button>

                  {isRecording && activeSentence === index ? (
                    <button
                      onClick={stopRecording}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700"
                    >
                      <Square className="h-4 w-4" />
                      Dừng ghi âm
                    </button>
                  ) : (
                    <button
                      onClick={() => startRecording(index)}
                      disabled={isRecording}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold ${
                        isRecording ? 'bg-black/5 text-soft' : 'soft-pill text-soft'
                      }`}
                    >
                      <Mic className="h-4 w-4" />
                      Ghi âm thử
                    </button>
                  )}

                  {recordedAudio[index] && (
                    <button
                      onClick={() => playAudio(recordedAudio[index])}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
                    >
                      <Play className="h-4 w-4" />
                      Nghe lại bản ghi
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="space-y-5">
          <section className="surface-card rounded-[30px] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-soft">
              <BookOpen className="h-4 w-4" />
              Từ vựng lõi
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {lesson.vocabulary.map((item) => (
                <span key={item} className="rounded-full bg-black/5 px-3 py-1.5 text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-[30px] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-soft">Mẫu ngữ pháp gợi ý</p>
            <div className="mt-4 space-y-3">
              {lesson.grammar.map((item) => (
                <div key={item} className="rounded-[20px] bg-black/5 px-4 py-3 text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-[30px] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-soft">Bài luyện nói nhỏ</p>
            <div className="mt-4 space-y-4">
              {lesson.prompts.map((item) => (
                <div key={item.title} className="rounded-[22px] bg-[var(--surface-muted)]/80 p-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-soft">{item.instruction}</p>
                  <p className="mt-2 text-sm font-medium text-emerald-700">{item.support}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-[30px] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-soft">Checklist sau khi học</p>
            <div className="mt-4 space-y-3">
              {lesson.reviewChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[20px] bg-black/5 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <p className="text-sm leading-6">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
