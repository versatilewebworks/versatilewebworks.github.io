'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const slides = [
  {
    title: 'Practice faster with focused workflows',
    subtitle: 'Browser-first utilities designed to help modern professionals train, refine, and complete tasks without distraction.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Streamline your productivity from the browser',
    subtitle: 'Polished tools that feel fast, reliable, and easy to use on desktop or mobile.',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Client-side utility power for secure workflows',
    subtitle: 'Your input stays local, private, and responsive while the site remains lightweight and intuitive.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Beautifully designed tools for every task',
    subtitle: 'A refined utility suite that blends clean UI, fast performance, and clear navigation.',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Build momentum with polished utility experiences',
    subtitle: 'Start with the Stenotypist Practice Studio and explore future tools built for focus and flow.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-soft">
          <div className="absolute inset-0">
            <img
              src={slides[activeIndex].image}
              alt={slides[activeIndex].title}
              className="h-full w-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/30 to-slate-950/80" />
          </div>

          <div className="relative px-6 py-16 sm:px-10 lg:px-14">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-[0.32em] text-sky-300">Versatile WebWorks</span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Digital utility tools crafted for modern teams.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200 sm:text-xl">
                {slides[activeIndex].subtitle}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/stenotypist"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
                >
                  Go to Stenotypist Practice Studio
                </Link>
                <Link
                  href="#tools"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  View all tools
                </Link>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? 'w-14 bg-sky-400' : 'w-8 bg-white/40'
                  }`}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="tools" className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Featured utility</p>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                Ready now
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-slate-900">Stenotypist Practice Studio</h2>
            <p className="mt-4 text-slate-600">
              A polished typing training experience built with Next.js and Tailwind. Generate focused practice text, type with live metrics, and listen while you train.
            </p>
            <div className="mt-6">
              <Link
                href="/stenotypist"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Open practice studio
              </Link>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Coming soon</p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                Utilities
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-slate-900">Utility suite expansion</h2>
            <p className="mt-4 text-slate-600">
              Additional productivity tools will be rolled out soon, including custom text utilities, workflow helpers, and professional training modules.
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                Stay tuned
              </span>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
