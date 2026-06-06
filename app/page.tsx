"use client";
import React, { useState, useEffect } from 'react';
import { Scale, Keyboard, ClipboardCheck, Timer, FileText, Download } from 'lucide-react';

export default function LegalSuite() {
  // --- Tool 1: Citation State ---
  const [rawCitation, setRawCitation] = useState('');
  const [formattedCitation, setFormattedCitation] = useState('');

  // --- Tool 2: Steno State ---
  const [sourceText, setSourceText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [seconds, setSeconds] = useState<number | string>('');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, errorCount: 0 });

  // Citation Logic
  const handleFormat = () => {
    let text = rawCitation.trim();
    // basic regex for US Case Law formatting
    text = text.replace(/u\.?\s?s\.?\s?/gi, 'U.S. ');
    const yearMatch = text.match(/\b(18|19|20)\d{2}\b/);
    if (yearMatch && !text.includes('(')) {
      text = text.replace(yearMatch[0], `(${yearMatch[0]})`);
    }
    if (text.toLowerCase().includes(' v ')) {
      const parts = text.split(/ v /i);
      text = parts.map(p => p.trim().charAt(0).toUpperCase() + p.trim().slice(1)).join(' v. ');
    }
    setFormattedCitation(text);
  };

  // Steno Logic
  const calculateSteno = () => {
    const words = typedText.trim().split(/\s+/).filter(x => x.length > 0).length;
    const mins = Number(seconds) / 60;
    const wpm = mins > 0 ? Math.round(words / mins) : 0;

    const sourceWords = sourceText.trim().split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);
    let errors = 0;
    
    typedWords.forEach((word, i) => {
      if (word !== sourceWords[i]) errors++;
    });

    const accuracy = sourceWords.length > 0 
      ? Math.max(0, ((sourceWords.length - errors) / sourceWords.length) * 100).toFixed(1)
      : 0;

    setStats({ wpm, accuracy: Number(accuracy), errorCount: errors });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-[#0f172a] text-white py-8 px-6 shadow-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight flex items-center gap-3">
              <Scale className="text-blue-400" /> LEGAL UTILITY SUITE
            </h1>
            <p className="text-slate-400 mt-2 italic">Professional Grade Document & Performance Tools</p>
          </div>
          <div className="hidden md:block text-right text-xs text-slate-500 font-mono">
            v1.0.0 // SERVERLESS_READY
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6 grid gap-12">
        
        {/* TOOL 1: CITATION FORMATTER */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2 font-bold text-slate-700">
            <FileText size={18} className="text-blue-600" /> 1. LEGAL CITATION FORMATTER
          </div>
          <div className="p-6">
            <label className="block text-sm font-semibold text-slate-600 mb-2">Input Raw Case Info</label>
            <textarea 
              className="w-full h-24 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all mb-4"
              placeholder="e.g. roe v wade 410 us 113 1973"
              value={rawCitation}
              onChange={(e) => setRawCitation(e.target.value)}
            />
            <button 
              onClick={handleFormat}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <ClipboardCheck size={18} /> Format to Bluebook
            </button>

            {formattedCitation && (
              <div className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                <span className="text-[10px] uppercase font-black text-blue-800 tracking-widest">Formatted Output</span>
                <p className="text-xl italic font-serif mt-1 text-slate-800 selection:bg-blue-200">
                  {formattedCitation}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* TOOL 2: STENO CALCULATOR */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2 font-bold text-slate-700">
            <Keyboard size={18} className="text-blue-600" /> 2. STENOGRAPHY / DICTATION ANALYST
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Original Audio Transcript</label>
                <textarea 
                  className="w-full h-40 p-3 border border-slate-300 rounded-lg text-sm"
                  placeholder="Paste the source text here..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Your Typed Shorthand</label>
                <textarea 
                  className="w-full h-40 p-3 border border-slate-300 rounded-lg text-sm font-mono"
                  placeholder="Paste your typed text here..."
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4 border-t pt-6">
              <div className="w-40">
                <label className="block text-sm font-semibold text-slate-600 mb-2">Time (Seconds)</label>
                <div className="relative">
                  <Timer className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input 
                    type="number" 
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                  />
                </div>
              </div>
              <button 
                onClick={calculateSteno}
                className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-2.5 rounded-lg font-semibold transition-colors"
              >
                Calculate Performance
              </button>
            </div>

            {stats.wpm > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 text-white p-6 rounded-xl text-center shadow-lg">
                  <div className="text-slate-400 text-xs uppercase font-bold tracking-tighter">Speed</div>
                  <div className="text-4xl font-serif font-bold">{stats.wpm}</div>
                  <div className="text-xs text-blue-400">Words Per Min</div>
                </div>
                <div className="bg-white border-2 border-green-600 p-6 rounded-xl text-center">
                  <div className="text-slate-500 text-xs uppercase font-bold tracking-tighter">Accuracy</div>
                  <div className="text-4xl font-serif font-bold text-green-700">{stats.accuracy}%</div>
                  <div className="text-xs text-slate-400">{stats.errorCount} mismatches found</div>
                </div>
                <div className="bg-white border-2 border-slate-200 p-6 rounded-xl text-center">
                  <div className="text-slate-500 text-xs uppercase font-bold tracking-tighter">Net Speed</div>
                  <div className="text-4xl font-serif font-bold text-slate-800">
                    {Math.round(stats.wpm * (stats.accuracy / 100))}
                  </div>
                  <div className="text-xs text-slate-400">Adjusted WPM</div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto py-12 px-6 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm font-serif italic italic">
          Designed for high-accuracy legal environments. All processing is done client-side for privacy.
        </p>
      </footer>
    </div>
  );
}
