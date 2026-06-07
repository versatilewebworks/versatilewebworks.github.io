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
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 text-slate-950">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M17.525 9.25h-2.44c-.187 0-.447.112-.447.562v1.338h2.887l-.375 2.872h-2.512V24H12.87v-9.978H10.7V11.01h2.17V8.936c0-2.148 1.308-3.32 3.213-3.32.93 0 1.73.07 1.962.1v2.277z" />
                      </svg>
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 text-slate-950">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M21.176 3.356a1.17 1.17 0 0 0-1.306-.114L3.78 9.513a.57.57 0 0 0 .04 1.06l3.714 1.612 1.57 4.706a.57.57 0 0 0 .942.246l1.96-1.905 3.359 2.475a.57.57 0 0 0 .93-.37l1.107-9.21a1.17 1.17 0 0 0-.416-.967zM9.748 13.22l-.874-2.62 7.007-4.2-5.354 6.82z" />
                      </svg>
                    </span>
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
