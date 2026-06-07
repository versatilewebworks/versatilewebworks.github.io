'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirebaseAuth, getGoogleProvider, hasFirebaseConfig } from '../lib/firebase';

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
    if (!hasFirebaseConfig) {
      const msg = 'Firebase is not configured. Please add your Firebase settings to .env.local.';
      console.error(msg);
      alert(msg);
      return;
    }

    const auth = getFirebaseAuth();
    const googleProvider = getGoogleProvider();
    
    if (!auth || !googleProvider) {
      const msg = 'Unable to initialize authentication. Please refresh the page.';
      console.error(msg);
      alert(msg);
      return;
    }

    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      const errorMsg = err?.message ?? 'Unable to sign in with Google.';
      console.error('Sign-in error:', errorMsg);
      alert(`Sign-in failed: ${errorMsg}`);
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
                  <div className="mt-4 flex items-center justify-center gap-6">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-slate-600 transition hover:text-[#1877F2]" fill="currentColor" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-slate-600 transition hover:text-[#26A5E4]" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.82-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.39 0-.32-.145-.451-.462l-2.109-6.94c-.13-.43.066-.646.438-.646l.991-.045 7.761-6.285c.33-.3.638-.143.4.261l-6.273 8.826-.026.405 3.86 3.514c.145.145.27.266.27.266l3.068-9.478c.13-.43.066-.646-.437-.646l-.995-.044z" />
                    </svg>
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
