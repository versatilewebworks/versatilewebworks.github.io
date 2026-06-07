"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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

export default function StenotypistTool() {
  const [language, setLanguage] = useState('en-US');
  const [sourceText, setSourceText] = useState('');
  const [typingText, setTypingText] = useState('');
  const [listenWhileTyping, setListenWhileTyping] = useState(false);
  const [allowPaste, setAllowPaste] = useState(false);
  const [category, setCategory] = useState<'business'|'technology'|'sports'>('technology');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const voiceLockedRef = useRef(false);

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
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length && !selectedVoice) setSelectedVoice(v[0].name);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      try {
        // @ts-ignore
        window.speechSynthesis.onvoiceschanged = null;
      } catch {}
    };
  }, [selectedVoice]);

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

  const handleGenerate = async () => {
    try {
      const res = await fetch(`/api/generate?category=${encodeURIComponent(category)}`);
      if (res.ok) {
        const json = await res.json();
        setSourceText((json.text || getRandomText(language)).slice(0, 500));
      } else {
        setSourceText(getRandomText(language).slice(0, 500));
      }
    } catch (e) {
      setSourceText(getRandomText(language).slice(0, 500));
    }

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
    if (!('speechSynthesis' in window) || !text.trim()) return;
    if (window.speechSynthesis.speaking) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    if (selectedVoice) {
      const v = voices.find((x) => x.name === selectedVoice || x.voiceURI === selectedVoice);
      if (v) utterance.voice = v;
    }
    window.speechSynthesis.speak(utterance);
  };

  const handleTypingChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (!startTimeRef.current && value.length > 0) {
      startTimeRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        if (startTimeRef.current) setSeconds(Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000)));
      }, 500);
    }
    setTypingText(value);
    if (listenWhileTyping && !voiceLockedRef.current) {
      voiceLockedRef.current = true;
      speak(sourceText, language);
      window.setTimeout(() => (voiceLockedRef.current = false), 2500);
    }
  };

  const handlePlay = () => {
    if (!sourceText.trim()) return;
    speak(sourceText, language);
  };

  const handleSourcePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (!allowPaste) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const paste = event.clipboardData.getData('text');
    const el = event.target as HTMLTextAreaElement;
    const start = el.selectionStart ?? sourceText.length;
    const end = el.selectionEnd ?? sourceText.length;
    const before = sourceText.slice(0, start);
    const after = sourceText.slice(end);
    const allowed = Math.max(0, 500 - (before.length + after.length));
    const insert = paste.slice(0, allowed);
    const newText = (before + insert + after).slice(0, 500);
    setSourceText(newText);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur-sm sm:p-8">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.32em] text-sky-700">Versatile WebWorks</span>
              <h1 className="text-3xl font-semibold sm:text-4xl">Stenotypist Practice Studio</h1>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <Link href={`/${''}`} className="text-sm font-semibold text-slate-700 transition hover:text-slate-900 hover:underline">
                ← Back to home
              </Link>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-slate-600 sm:text-lg">
            A professional practice studio that helps stenotypists build speed and precision with dynamic text, live metrics, and optional audio playback.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Practice Setup</p>
                <h2 className="mt-2 text-2xl font-semibold">Language & Text</h2>
              </div>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Optimized for all screens</span>
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
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Source
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  >
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="sports">Sports</option>
                  </select>
                </label>
                <div className="flex flex-col justify-end">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Practice text
                <textarea
                  value={sourceText}
                  onChange={(event) => setSourceText(event.target.value.slice(0, 500))}
                  onPaste={handleSourcePaste}
                  rows={6}
                  maxLength={500}
                  className="min-h-[10rem] rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="Type or generate text to practice (max 500 chars)."
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-500">You may paste text when "Allow paste" is enabled.</p>
                  <p className="text-xs text-slate-500">{sourceText.length}/500</p>
                </div>
              </label>
              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={handlePlay}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Listen to text
                </button>
                <select
                  value={selectedVoice ?? ''}
                  onChange={(e) => setSelectedVoice(e.target.value || null)}
                  className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none"
                >
                  <option value="">Default voice</option>
                  {voices.map((v) => (
                    <option key={v.voiceURI || v.name} value={v.name}>{v.name} {v.lang}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="w-14 text-xs font-medium text-slate-600">Speed</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-right text-xs text-slate-600">{rate.toFixed(1)}x</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-14 text-xs font-medium text-slate-600">Pitch</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-right text-xs text-slate-600">{pitch.toFixed(1)}</span>
                </div>
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
              <label className="flex items-center gap-3 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={allowPaste}
                  onChange={(event) => setAllowPaste(event.target.checked)}
                  className="h-5 w-5 rounded-lg border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                Allow paste into practice text
              </label>
            </div>
          </section>
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Typing Trainer</p>
              </div>
            </div>
            <div>Typing trainer UI goes here...</div>
          </section>
        </div>
      </div>
    </main>
  );
}
