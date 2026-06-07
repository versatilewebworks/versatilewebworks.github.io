"use client";
import React, { useEffect, useRef, useState } from 'react';
import { BlogPost } from '../types/blog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  posts: BlogPost[];
  intervalMs?: number;
};

export default function BlogCarousel({ posts, intervalMs = 5000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }

    timerRef.current = window.setInterval(() => {
      setIndex(i => (i + 1) % posts.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [paused, posts.length, intervalMs]);

  function goNext() {
    setIndex(i => (i + 1) % posts.length);
  }

  function goPrev() {
    setIndex(i => (i - 1 + posts.length) % posts.length);
  }

  if (!posts || posts.length === 0) return null;

  // derive locale prefix from current pathname when available (client)
  const pathname = usePathname?.() ?? '';
  const firstSegment = pathname.split('/')[1];
  const SUPPORTED = ['en', 'es', 'ur'];
  const localePrefix = SUPPORTED.includes(firstSegment) ? `/${firstSegment}` : '';

  return (
    <section
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative overflow-hidden h-64 md:h-80 rounded-lg">
        {posts.map((post, i) => (
          <article
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="h-full w-full bg-gray-50 flex flex-col md:flex-row items-stretch">
              <div className="md:w-1/2 p-6 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  <Link href={`${localePrefix}/${post.slug}`} className="hover:underline">
                    <span className="notranslate">{post.title}</span>
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(t => (
                    <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 notranslate">{t}</span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
              </div>

              {post.coverImage && (
                <div className="md:w-1/2 hidden md:block">
                  <img src={post.coverImage} alt={post.title} className="object-cover h-full w-full rounded-r-lg" />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
      >
        <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        aria-label="Next"
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
      >
        <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {posts.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full transition-all ${i === index ? 'bg-gray-800 w-8' : 'bg-gray-300 w-4'}`}
          />
        ))}
      </div>
    </section>
  );
}
