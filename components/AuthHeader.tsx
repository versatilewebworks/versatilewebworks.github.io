'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirebaseAuth, googleProvider } from '../lib/firebase';

export default function AuthHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700 transition hover:text-slate-900">
            Versatile WebWorks
          </Link>
          <Link href="/blog" className="text-sm text-slate-600 transition hover:text-slate-900">
            Blog
          </Link>
        </div>

        <div className="relative flex flex-wrap items-center gap-3">
          {user ? (
            <span className="text-sm text-slate-600">Signed in as {user.displayName ?? user.email}</span>
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
            <div className="relative">
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
                <div className="absolute right-0 z-50 mt-3 w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="text-sm font-semibold text-slate-900">Sign in or sign up</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sign in with your Google account to access personalized session data. More provider options will be added soon.
                  </p>
                  <button
                    type="button"
                    onClick={handleSignIn}
                    disabled={loading}
                    className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    Continue with Gmail
                  </button>
                  <div className="mt-4 rounded-3xl bg-slate-50 p-3 text-xs text-slate-500">
                    Google is the default sign-in provider for this stage of the site.
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
