'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export default function AuthHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    if (!auth) {
      setError('Firebase is not configured. Please add your Firebase settings to .env.local.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err?.message ?? 'Unable to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!auth) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signOut(auth);
    } catch (err: any) {
      setError(err?.message ?? 'Unable to sign out.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-sm shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700 transition hover:text-slate-900">
            Versatile WebWorks
          </Link>
          {user ? (
            <span className="text-sm text-slate-600">Signed in as {user.displayName ?? user.email}</span>
          ) : (
            <span className="text-sm text-slate-600">Sign in with Google to access all utilities.</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {error ? (
            <span className="rounded-full bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
              {error}
            </span>
          ) : null}
          <button
            type="button"
            onClick={user ? handleSignOut : handleSignIn}
            disabled={loading}
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {user ? 'Sign Out' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    </header>
  );
}
