'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const practiceTexts: Record<string, string[]> = {
  'en-US': [
    'The quick brown fox jumps over the lazy dog and practices word flow with confident rhythm.',
    'Every new line helps the stenotypist improve speed, accuracy, and consistent focus.',
    'Practice typing while listening to the passage so the fingers learn the cadence and pace.',
  ],
  'es-ES': [
    'El rápido zorro marrón salta sobre el perro perezoso y practica el ritmo de escritura.',
    'Cada línea nueva ayuda al taquígrafo a mejorar la velocidad y la precisión diariamente.',
    'Practica mecanografiar mientras escuchas el texto para aprender la cadencia y el enfoque.',
  ],
  'fr-FR': [
    'Le rapide renard brun saute par-dessus le chien paresseux et affine son rythme d’écriture.',
    'Chaque nouvelle phrase aide le sténographe à renforcer la vitesse et la précision.',
    'Pratiquez la dactylographie en écoutant le texte pour apprendre la cadence du discours.',
  ],
  'de-DE': [
    'Der schnelle braune Fuchs springt über den faulen Hund und übt den Schreibfluss.',
    'Jede neue Zeile hilft dem Stenotypisten, Geschwindigkeit und Genauigkeit zu verbessern.',
    'Übe das Tippen, während du den Text hörst, um den Rhythmus und die Konzentration zu verbessern.',
  ],
};

function getRandomText(language: string) {
  const items = practiceTexts[language] ?? practiceTexts['en-US'];
  return items[Math.floor(Math.random() * items.length)];
}

function formatTime(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const rest = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${rest}`;
}

export default function Home() {
  const [language, setLanguage] = useState('en-US');
  const [sourceText, setSourceText] = useState('');
  const [typingText, setTypingText] = useState('');
  const [listenWhileTyping, setListenWhileTyping] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const voiceLockedRef = useRef(false);

  const isSpeechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const sourceLines = useMemo(
    () => sourceText.trim().split('\n').filter(Boolean),
    [sourceText]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (completed && timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [completed]);

  useEffect(() => {
    if (!typingText || !sourceText) {
      setAccuracy(100);
      setWpm(0);
      setMistakes(0);
      return;
    }

    const correctChars = [...typingText].reduce((count, char, index) => {
      return count + (char === sourceText[index] ? 1 : 0);
    }, 0);

    const totalTyped = typingText.length;
    const newAccuracy = totalTyped === 0 ? 100 : Math.max(0, Math.round((correctChars / totalTyped) * 100));
    setAccuracy(newAccuracy);
    setMistakes(totalTyped - correctChars);

    if (startTimeRef.current) {
      const elapsedSeconds = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
      const words = Math.max(0, Math.round((correctChars / 5) * (60 / elapsedSeconds)));
      setWpm(words);
      setSeconds(elapsedSeconds);
    }

    if (typingText === sourceText && sourceText.length > 0) {
      setCompleted(true);
    }
  }, [typingText, sourceText]);

  const handleGenerate = () => {
    setSourceText(getRandomText(language));
    setTypingText('');
    setCompleted(false);
    setMistakes(0);
    setAccuracy(100);
    setWpm(0);
    setSeconds(0);
    startTimeRef.current = null;
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleReset = () => {
    setSourceText('');
    setTypingText('');
    setCompleted(false);
    setMistakes(0);
    setAccuracy(100);
    setWpm(0);
    setSeconds(0);
    startTimeRef.current = null;
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const speak = (text: string, lang: string) => {
    if (!isSpeechSupported || !text.trim()) {
      return;
    }

    if (window.speechSynthesis.speaking) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleTypingChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (!startTimeRef.current && value.length > 0) {
      startTimeRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          setSeconds(Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000)));
        }
      }, 500);
    }

    setTypingText(value);

    if (listenWhileTyping && !voiceLockedRef.current) {
      voiceLockedRef.current = true;
      speak(sourceText, language);
      window.setTimeout(() => {
        voiceLockedRef.current = false;
      }, 2500);
    }
  };

  const handlePlay = () => {
    if (!sourceText.trim()) {
      return;
    }
    speak(sourceText, language);
  };

  const handlePasteBlock = (event: React.ClipboardEvent) => {
    event.preventDefault();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-sm sm:p-8">
          <span className="text-xs uppercase tracking-[0.32em] text-sky-700">Versatile WebWorks</span>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Stenotypist Practice Studio</h1>
          <p className="mt-3 max-w-2xl text-slate-600 sm:text-lg">
            A serverless typing practice app built with Next.js, Tailwind CSS, and TypeScript. Select a language, generate practice text, then type and listen as you improve.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Practice Setup</p>
                <h2 className="mt-2 text-2xl font-semibold">Language & Text</h2>
              </div>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Mobile-first</span>
            </div>

            <div className="space-y-5">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Language
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                >
                  <option value="en-US">English</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                  <option value="de-DE">German</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Practice text
                <textarea
                  value={sourceText}
                  onChange={(event) => setSourceText(event.target.value)}
                  onPaste={handlePasteBlock}
                  rows={6}
                  className="min-h-[10rem] rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="Type or generate text to practice. Paste is disabled for honest training."
                />
                <p className="text-xs text-slate-500">Paste is blocked so your practice remains intentional.</p>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Generate practice text
                </button>
                <button
                  type="button"
                  onClick={handlePlay}
                  className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Listen to text
                </button>
              </div>

              <label className="flex items-center gap-3 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={listenWhileTyping}
                  onChange={(event) => setListenWhileTyping(event.target.checked)}
                  className="h-5 w-5 rounded-lg border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                Practice while listening automatically
              </label>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Typing Trainer</p>
                <h2 className="mt-2 text-2xl font-semibold">Real-time metrics</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Live</span>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Start typing here
              <textarea
                value={typingText}
                onChange={handleTypingChange}
                onPaste={handlePasteBlock}
                rows={6}
                className="min-h-[10rem] rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                placeholder="Begin typing the practice text in this box."
              />
              <p className="text-xs text-slate-500">Paste is disabled here too to keep the challenge real.</p>
            </label>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5 text-center">
                <p className="text-3xl font-semibold text-slate-900">{wpm}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">WPM</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 text-center">
                <p className="text-3xl font-semibold text-slate-900">{accuracy}%</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">Accuracy</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 text-center">
                <p className="text-3xl font-semibold text-slate-900">{formatTime(seconds)}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">Elapsed</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 text-center">
                <p className="text-3xl font-semibold text-slate-900">{mistakes}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">Mistakes</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-6 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Reset session
            </button>
          </section>
        </div>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>1. Choose a language and generate practice text.</li>
            <li>2. Type inside the trainer box, with paste disabled for honest repetition.</li>
            <li>3. Enable automatic listening to hear the passage as you type.</li>
            <li>4. Track speed, accuracy, elapsed time, and mistakes live.</li>
          </ul>
          <p className="mt-5 text-sm text-slate-500">Deploy this app to Vercel and point your domain to the project for serverless hosting.</p>
        </section>
      </div>
    </main>
  );
}
