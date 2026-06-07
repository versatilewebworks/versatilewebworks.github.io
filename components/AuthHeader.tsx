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
                <div className="absolute right-0 z-50 mt-3 w-80 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
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
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.334C0 23.403.597 24 1.325 24H12.82v-9.294H9.692V11.08h3.128V8.41c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.626h-3.12V24h6.116C23.403 24 24 23.403 24 22.667V1.333C24 .597 23.403 0 22.675 0z" />
                      </svg>
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.371 0 0 5.373 0 12c0 5.127 3.163 9.497 7.675 11.244.56.104.765-.243.765-.54 0-.267-.01-1.154-.016-2.087-3.123.68-3.783-1.5-3.783-1.5-.51-1.294-1.246-1.639-1.246-1.639-1.018-.697.078-.683.078-.683 1.126.08 1.72 1.157 1.72 1.157 1.001 1.715 2.626 1.22 3.266.933.103-.73.392-1.22.713-1.5-2.494-.284-5.115-1.247-5.115-5.55 0-1.225.438-2.227 1.157-3.012-.116-.286-.502-1.435.11-2.99 0 0 .944-.303 3.096 1.153A10.8 10.8 0 0 1 12 5.84c.958.004 1.923.13 2.828.38 2.149-1.456 3.09-1.153 3.09-1.153.613 1.555.227 2.704.112 2.99.72.785 1.157 1.787 1.157 3.012 0 4.314-2.625 5.262-5.126 5.54.403.347.76 1.032.76 2.081 0 1.503-.014 2.716-.014 3.088 0 .3.203.648.772.538C20.84 21.495 24 17.127 24 12c0-6.627-5.373-12-12-12z" />
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
