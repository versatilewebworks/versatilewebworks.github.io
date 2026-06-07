'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirebaseAuth, googleProvider } from '../lib/firebase';

export default function AuthHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setMenuOpen(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleSignIn = async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      console.error('Firebase is not configured. Please add your Firebase settings to .env.local.');
      return;
    }

    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error(err?.message ?? 'Unable to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      return;
    }

    setLoading(true);

    try {
      await signOut(auth);
    } catch (err: any) {
      console.error(err?.message ?? 'Unable to sign out.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-sm shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700 transition hover:text-slate-900">
          Versatile WebWorks
        </Link>

        <div className="relative flex flex-wrap items-center gap-3">
          <Link href="/blog" className="text-sm text-slate-600 transition hover:text-slate-900">
            Blog
          </Link>

          {user ? (
            <span className="hidden text-sm text-slate-600 sm:block">Signed in as {user.displayName ?? user.email}</span>
          ) : null}

          {user ? (
            <button
              type="button"
              onClick={handleSignOut}
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Sign Out
            </button>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Sign In
              </button>

              {menuOpen ? (
                <div className="absolute right-4 left-4 mt-3 z-50 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:right-0 sm:left-auto sm:w-80">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close sign-in"
                    className="absolute right-3 top-3 rounded-md p-1 text-slate-500 hover:bg-slate-100 sm:hidden"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <p className="text-sm font-semibold text-slate-900">Sign in or sign up</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sign in to access personalized session data.
                  </p>
                  <button
                    type="button"
                    onClick={handleSignIn}
                    disabled={loading}
                    className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    Continue with Gmail
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-3 text-slate-500">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-[#1877F2] text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white" aria-hidden="true">
                        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.334C0 23.403.597 24 1.325 24H12.82v-9.294H9.692V11.08h3.128V8.41c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.626h-3.12V24h6.116C23.403 24 24 23.403 24 22.667V1.333C24 .597 23.403 0 22.675 0z" />
                      </svg>
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-[#26A5E4] text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white" aria-hidden="true">
                        <path d="M21.639 3.353a1.5 1.5 0 0 0-1.618-.28L3 10.5l5.5 1.833L13 9l8.639-5.647a1.5 1.5 0 0 0-.001-0zM13 12l-4.5 3L3 10.5 13 12z" />
                      </svg>
                    </span>
                    <span className="text-xs text-slate-500">Facebook and Telegram login coming soon</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
