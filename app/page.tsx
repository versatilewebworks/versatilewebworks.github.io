import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
          <span className="text-xs uppercase tracking-[0.32em] text-sky-700">Versatile WebWorks</span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Digital utility tools crafted for modern teams.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            Discover polished productivity utilities designed to help professionals train faster, work smarter, and stay focused.
            Start with our Stenotypist Practice Studio or explore future tools from a growing utility suite.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/stenotypist"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Go to Stenotypist Practice Studio
            </Link>
            <Link
              href="#tools"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              View all tools
            </Link>
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
