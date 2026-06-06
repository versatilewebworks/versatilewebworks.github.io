"use client";

import dynamic from 'next/dynamic';
import React, { useState, useCallback } from 'react';
import { 
  Scale, Keyboard, LayoutDashboard, FileCheck, Crown, 
  LogOut, Copy, CheckCircle, Zap, Timer, Trophy, Shield 
} from 'lucide-react';

// Create the component
const LegalSuiteComponent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [citationInput, setCitationInput] = useState('');
  const [formattedCitation, setFormattedCitation] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [seconds, setSeconds] = useState<number | ''>('');
  const [results, setResults] = useState<{wpm: number, accuracy: number} | null>(null);

  const handleFormat = () => {
    let t = citationInput.trim();
    t = t.replace(/u\.?\s?s\.?\s?/gi, 'U.S. ');
    if (t.toLowerCase().includes(' v ')) {
      t = t.split(/ v /i).map(p => p.trim().charAt(0).toUpperCase() + p.trim().slice(1)).join(' v. ');
    }
    const year = t.match(/\b(18|19|20)\d{2}\b/);
    if (year && !t.includes('(')) t = t.replace(year[0], `(${year[0]})`);
    setFormattedCitation(t);
  };

  const runAnalysis = () => {
    const s = sourceText.trim().split(/\s+/);
    const t = typedText.trim().split(/\s+/);
    let correct = 0;
    t.forEach((w, i) => { if (w === s[i]) correct++; });
    const wpm = Math.round((t.length / Number(seconds)) * 60);
    const acc = Math.round((correct / s.length) * 100);
    setResults({ wpm, accuracy: acc });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      {/* Sidebar */}
      <aside className="fixed hidden h-full w-64 border-r bg-white md:flex flex-col">
        <div className="p-8 flex items-center gap-3 text-slate-900 font-bold text-xl">
          <div className="bg-slate-900 p-2 rounded-lg text-white"><Scale size={20}/></div>
          LEX-AUTO
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button className="flex w-full items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">
            <LayoutDashboard size={18}/> Dashboard
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all">
            <Shield size={18}/> Compliance
          </button>
        </nav>
        <div className="p-4">
          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <Crown size={18} className="text-yellow-400 mb-2"/>
            <p className="text-xs font-bold">PRO ACCOUNT</p>
            <p className="text-[10px] text-slate-400 mt-1">Unlimited Citations & Export</p>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 md:ml-64 p-6 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Legal Utility Suite</h1>
            <p className="text-slate-500 mt-2 font-medium text-lg">Automated legal documentation & speed analytics.</p>
          </header>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tool 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><FileCheck size={24}/></div>
                <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-widest">Public Tool</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Citation Formatter</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Paste raw case names and volumes to auto-format to standard Bluebook style.</p>
              
              <textarea 
                className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 mb-4"
                placeholder="e.g. roe v wade 410 us 113 1973"
                onChange={(e) => setCitationInput(e.target.value)}
              />
              <button onClick={handleFormat} className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold text-sm hover:shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Zap size={16} className="fill-white"/> Format Case Law
              </button>

              {formattedCitation && (
                <div className="mt-6 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 relative group">
                  <button 
                    onClick={() => {navigator.clipboard.writeText(formattedCitation); setCopyStatus(true); setTimeout(()=>setCopyStatus(false), 2000)}}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {copyStatus ? <CheckCircle size={18} className="text-green-500"/> : <Copy size={18}/>}
                  </button>
                  <p className="font-serif italic text-lg text-slate-800 pr-8">{formattedCitation}</p>
                </div>
              )}
            </div>

            {/* Tool 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center"><Keyboard size={24}/></div>
                <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-widest">Beta Access</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Speed Analyst</h3>
              <div className="grid gap-4 mb-4 mt-6">
                <textarea onChange={(e)=>setSourceText(e.target.value)} placeholder="Paste Source Text" className="w-full h-20 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs outline-none focus:border-indigo-500"/>
                <textarea onChange={(e)=>setTypedText(e.target.value)} placeholder="Paste Typed Text" className="w-full h-20 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-mono outline-none focus:border-indigo-500"/>
              </div>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Timer className="absolute left-3 top-3.5 text-slate-300" size={16}/>
                  <input type="number" placeholder="Seconds" onChange={(e)=>setSeconds(e.target.value as any)} className="w-full py-3.5 pl-10 pr-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"/>
                </div>
                <button onClick={runAnalysis} className="px-8 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800">Analyze</button>
              </div>

              {results && (
                <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95">
                  <div className="bg-slate-900 rounded-2xl p-6 text-white border-b-4 border-blue-500">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Words Per Minute</p>
                    <p className="text-4xl font-black">{results.wpm}</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 border-b-4 border-green-500">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy Score</p>
                    <p className="text-4xl font-black text-slate-900">{results.accuracy}%</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// This is the Magic Trick: Disable Server-Side Rendering for the page
export default dynamic(() => Promise.resolve(LegalSuiteComponent), {
  ssr: false,
});
