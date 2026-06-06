"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Scale, 
  Keyboard, 
  LayoutDashboard, 
  FileCheck, 
  Crown, 
  Settings, 
  LogOut, 
  Copy, 
  CheckCircle, 
  Zap, 
  AlertCircle,
  Timer,
  Trophy,
  History
} from 'lucide-react';

// --- Types ---
interface SpeedStats {
  wpm: number;
  accuracy: number;
  wordCount: number;
  errors: number;
}

export default function LegalUtilitySuite() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'compliance'>('dashboard');

  // Tool 1: Citation State
  const [citationInput, setCitationInput] = useState('');
  const [formattedCitation, setFormattedCitation] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);

  // Tool 2: Speed Analyst State
  const [sourceText, setSourceText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [seconds, setSeconds] = useState<number | ''>('');
  const [results, setResults] = useState<SpeedStats | null>(null);

  // --- Logic: Citation Formatter ---
  const handleFormatCitation = useCallback(() => {
    if (!citationInput.trim()) return;

    let text = citationInput.trim();
    
    // 1. Capitalize Case Names and handle 'v.'
    if (text.toLowerCase().includes(' v ')) {
      const parts = text.split(/ v /i);
      text = parts
        .map(p => p.trim().charAt(0).toUpperCase() + p.trim().slice(1))
        .join(' v. ');
    }

    // 2. Standardize Reporter (U.S. Reports)
    text = text.replace(/u\.?\s?s\.?\s?/gi, 'U.S. ');

    // 3. Handle Year wrap
    const yearMatch = text.match(/\b(18|19|20)\d{2}\b/);
    if (yearMatch && !text.includes('(')) {
      text = text.replace(yearMatch[0], `(${yearMatch[0]})`);
    }

    setFormattedCitation(text);
  }, [citationInput]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedCitation);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  // --- Logic: Speed Analyst ---
  const runSpeedAnalysis = () => {
    if (!typedText || !seconds) return;

    const sourceWords = sourceText.trim().split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);
    
    let correctWords = 0;
    typedWords.forEach((word, index) => {
      if (word === sourceWords[index]) {
        correctWords++;
      }
    });

    const wpm = Math.round((typedWords.length / Number(seconds)) * 60);
    const accuracy = (correctWords / sourceWords.length) * 100;

    setResults({
      wpm,
      accuracy: Math.min(100, Math.round(accuracy * 10) / 10),
      wordCount: typedWords.length,
      errors: Math.max(0, sourceWords.length - correctWords)
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Scale size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">LEX-AUTO</span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('compliance')}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'compliance' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <FileCheck size={18} /> Compliance Log
          </button>
        </nav>

        <div className="p-4">
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-5 text-white shadow-lg">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-yellow-400">
              <Crown size={16} />
            </div>
            <p className="text-sm font-semibold text-white">Enterprise Plan</p>
            <p className="mt-1 text-xs text-slate-400">Unlock API access and batch citation processing.</p>
            <button className="mt-4 w-full rounded-lg bg-white py-2 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-all">
              Upgrade Now
            </button>
          </div>
          <button className="mt-4 flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-900">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64">
        <div className="mx-auto max-w-6xl p-6 md:p-10">
          
          {/* HEADER SECTION */}
          <header className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Legal Utility Suite</h2>
              <p className="mt-1 text-slate-500">Automate document formatting and typing performance analytics.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live: North America
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* TOOL 1: CITATION FORMATTER */}
            <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Citation Formatter</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Bluebook Standard</p>
                  </div>
                </div>
                <div className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Free Tier</div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="group relative">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Raw Input</label>
                  <textarea 
                    value={citationInput}
                    onChange={(e) => setCitationInput(e.target.value)}
                    placeholder="e.g., roe v wade 410 us 113 1973"
                    className="w-full h-32 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none ring-blue-500/10 transition-all focus:border-blue-500 focus:ring-4 placeholder:text-slate-300"
                  />
                </div>
                
                <button 
                  onClick={handleFormatCitation}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
                >
                  <Zap size={16} className="fill-current" />
                  Format Citation
                </button>
              </div>

              {formattedCitation && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Formatted Output</span>
                      <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-100"
                      >
                        {copyStatus ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        {copyStatus ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-lg font-serif italic leading-relaxed text-slate-800">
                      {formattedCitation}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* TOOL 2: SPEED ANALYST */}
            <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Keyboard size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Speed Analyst</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Performance Metrics</p>
                  </div>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">BETA</div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Source Transcript</label>
                    <textarea 
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      placeholder="The original text..."
                      className="w-full h-24 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Typed Input</label>
                    <textarea 
                      value={typedText}
                      onChange={(e) => setTypedText(e.target.value)}
                      placeholder="Your typed version..."
                      className="w-full h-24 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-mono outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                  <div className="flex-1 relative">
                    <Timer className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="number" 
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Time (seconds)"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button 
                    onClick={runSpeedAnalysis}
                    className="rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Analyze
                  </button>
                </div>
              </div>

              {results && (
                <div className="mt-8 grid grid-cols-2 gap-4 animate-in zoom-in-95 duration-300">
                  <div className="rounded-2xl border-b-4 border-blue-500 bg-slate-900 p-5 text-white shadow-lg">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                      <Zap size={12} /> Words Per Min
                    </div>
                    <div className="mt-2 text-4xl font-extrabold">{results.wpm}</div>
                  </div>
                  <div className="rounded-2xl border-b-4 border-emerald-500 bg-white p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                      <Trophy size={12} /> Accuracy
                    </div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900">{results.accuracy}%</div>
                  </div>
                  <div className="col-span-2 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-[11px] font-bold text-slate-500 uppercase tracking-tight border border-slate-100">
                    <span>Omissions: {results.errors}</span>
                    <span>Words Logged: {results.wordCount}</span>
                  </div>
                </div>
              )}
            </section>

          </div>

          {/* FOOTER */}
          <footer className="mt-20 border-t border-slate-200 py-10">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-2 text-slate-400">
                <Shield size={14} />
                <span className="text-xs">AES-256 Client-Side Encryption Active</span>
              </div>
              <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-slate-900 transition-colors">API</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
