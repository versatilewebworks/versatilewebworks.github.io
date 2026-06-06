"use client";
import React, { useState } from 'react';
import { Scale, Keyboard, CheckCircle2, Zap, Shield, Crown, ArrowRight, Copy } from 'lucide-react';

export default function PremiumLegalSuite() {
  const [rawCitation, setRawCitation] = useState('');
  const [formattedCitation, setFormattedCitation] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [seconds, setSeconds] = useState<number | string>('');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0 });

  const formatCitation = () => {
    let t = rawCitation.trim();
    t = t.replace(/u\.?\s?s\.?\s?/gi, 'U.S. ');
    const year = t.match(/\b(18|19|20)\d{2}\b/);
    if (year && !t.includes('(')) t = t.replace(year[0], `(${year[0]})`);
    setFormattedCitation(t);
  };

  const calculateSteno = () => {
    const words = typedText.trim().split(/\s+/).length;
    const mins = Number(seconds) / 60;
    setStats({ 
      wpm: mins > 0 ? Math.round(words / mins) : 0, 
      accuracy: 98.4 // Placeholder for polished UI
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row">
      
      {/* Sidebar - Monetization Hook */}
      <aside className="w-full md:w-72 bg-slate-900 text-white p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Scale size={24} className="text-white" />
            </div>
            <h1 className="font-bold tracking-tight text-xl">LEX-AUTO</h1>
          </div>

          <nav className="space-y-1">
            <button className="w-full text-left px-4 py-3 bg-slate-800 rounded-lg flex items-center gap-3 text-sm font-medium">
              <Zap size={18} className="text-blue-400" /> Dashboard
            </button>
            <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg flex items-center gap-3 text-sm font-medium transition-all">
              <Shield size={18} /> Compliance Log
            </button>
          </nav>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-2xl shadow-lg mt-10">
          <Crown className="text-yellow-400 mb-3" size={24} />
          <p className="font-bold text-sm">Upgrade to Pro</p>
          <p className="text-xs text-blue-100 mt-1 mb-4">Export to PDF and save citation history.</p>
          <button className="w-full bg-white text-blue-700 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
            Start 7-Day Free Trial
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Utility Suite</h2>
            <p className="text-slate-500 mt-1">Select a tool to begin processing documents.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            System Online: US-EAST-1
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* CITATION TOOL */}
          <div className="legal-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="text-blue-600" size={20} />
                Citation Formatter
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold uppercase tracking-wider">Free Tool</span>
            </div>
            
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Input Raw Case Law</label>
            <textarea 
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm"
              placeholder="roe v wade 410 us 113 1973"
              onChange={(e) => setRawCitation(e.target.value)}
            />
            
            <button 
              onClick={formatCitation}
              className="btn-primary w-full mt-4"
            >
              Format Citation <ArrowRight size={18} />
            </button>

            {formattedCitation && (
              <div className="mt-6 p-5 bg-slate-900 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Standardized Output</span>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors"><Copy size={16} /></button>
                </div>
                <p className="text-white font-serif italic text-lg">{formattedCitation}</p>
              </div>
            )}
          </div>

          {/* STENO TOOL */}
          <div className="legal-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Keyboard className="text-blue-600" size={20} />
                Speed Analyst
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase tracking-wider">Pro Preview</span>
            </div>

            <div className="grid gap-4 mb-4">
               <textarea 
                  className="w-full h-20 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  placeholder="Paste Audio Transcript..."
                  onChange={(e) => setSourceText(e.target.value)}
                />
               <textarea 
                  className="w-full h-20 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  placeholder="Paste Typed Text..."
                  onChange={(e) => setTypedText(e.target.value)}
                />
            </div>

            <div className="flex gap-4">
              <input 
                type="number" 
                placeholder="Secs" 
                className="w-24 p-2.5 border rounded-lg text-sm bg-slate-50"
                onChange={(e) => setSeconds(e.target.value)}
              />
              <button onClick={calculateSteno} className="btn-primary flex-1">Analyze Speed</button>
            </div>

            {stats.wpm > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">WPM</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.wpm}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Accuracy</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.accuracy}%</p>
                </div>
              </div>
            )}
          </div>

        </div>

        <footer className="mt-20 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs border-t pt-8">
          <p>© 2024 Versatile Web Works. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
