import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-slate-900 font-semibold">Versatile WebWorks</p>
          <p>Client-side utility tools and thoughtful productivity content.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy-policy" className="text-slate-600 transition hover:text-slate-900">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-slate-600 transition hover:text-slate-900">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-slate-600 transition hover:text-slate-900">
            Contact & Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
