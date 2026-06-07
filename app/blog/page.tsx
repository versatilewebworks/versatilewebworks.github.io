import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Coming Soon | Versatile WebWorks',
  description: 'The Versatile WebWorks blog is coming soon. Stay tuned for articles on productivity, tooling, and web development.',
};

export default function BlogComingSoon() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-soft">
        <h1 className="text-4xl font-semibold text-slate-900">Blog coming soon</h1>
        <p className="mt-4 text-lg text-slate-600">
          We’re preparing thoughtful articles and tutorials about web utilities, productivity workflows, and developer tooling. Check back soon.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
