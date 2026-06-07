"use client";
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ur', label: 'اردو' },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';
  const router = useRouter();

  const current = LOCALES.find(l => pathname.split('/')[1] === l.code) || LOCALES[0];

  function changeLocale(code: string) {
    const segments = pathname.split('/');
    // If first segment is a locale, replace it; otherwise prefix
    if (LOCALES.some(l => l.code === segments[1])) {
      segments[1] = code;
    } else {
      segments.unshift('', code);
    }
    const nextPath = segments.join('/') || '/';
    setOpen(false);
    router.push(nextPath);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex justify-center w-full rounded-md border border-gray-200 px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="notranslate">{current.label}</span>
        <svg className="-mr-1 ml-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {LOCALES.map(loc => (
              <button
                key={loc.code}
                onClick={() => changeLocale(loc.code)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="notranslate">{loc.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
