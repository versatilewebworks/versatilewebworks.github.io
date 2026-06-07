import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Versatile WebWorks',
  description: 'Review the terms governing your use of Versatile WebWorks productivity utilities and blog content.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
          <span className="text-xs uppercase tracking-[0.32em] text-sky-700">Terms of Service</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Terms governing use of our platform</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            These terms describe your rights and responsibilities when using Versatile WebWorks. Please read them carefully before using our utilities, blog, or support resources.
          </p>
        </section>

        <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">1. Acceptable use</h2>
            <p className="text-slate-600 leading-8">
              You agree to use Versatile WebWorks responsibly and lawfully. Prohibited activities include scraping or reproducing blog content, reverse engineering the site or tools, abusing automation, or using the platform for illegal activity.
            </p>
            <ul className="space-y-3 text-slate-600 leading-8 list-disc list-inside">
              <li>Do not attempt to extract data from the site using bots, crawlers, or scripts unless explicitly authorized.</li>
              <li>Do not reverse engineer the user interface, client-side utilities, or source code for commercial redistribution.</li>
              <li>Do not leverage the platform to publish defamatory, abusive, or unlawful content.</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">2. Intellectual property</h2>
            <p className="text-slate-600 leading-8">
              All materials on this site, including code, designs, documentation, brand assets, and blog content, are owned by Versatile WebWorks or our licensors. Your access grants only a limited license to use the services for personal or internal business purposes.</p>
            <p className="text-slate-600 leading-8">
              Unauthorized copying, modification, reproduction, distribution, or public display of site content or proprietary tools is prohibited and may result in legal action.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">3. Disclaimer and limitation of liability</h2>
            <p className="text-slate-600 leading-8">
              The tools and content on Versatile WebWorks are provided “as is” and “as available.” We make no warranties that the site will be uninterrupted, secure, accurate, or free from defects.</p>
            <p className="text-slate-600 leading-8">
              We are not responsible for any damages, loss of data, lost profits, business interruption, or other harms arising from your use of the site or reliance on utility outputs. You accept that use of our services is at your own risk.</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">4. Changes, termination, and service availability</h2>
            <p className="text-slate-600 leading-8">
              Versatile WebWorks may modify, suspend, or discontinue any feature, page, or service at any time without prior notice. We may also update these terms as needed to reflect changes in the platform or legal requirements.</p>
            <p className="text-slate-600 leading-8">
              Continued use of the site after changes are posted constitutes acceptance of the updated terms.</p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">5. Governing law</h2>
            <p className="text-slate-600 leading-8">
              These terms are governed by the laws of the jurisdiction in which Versatile WebWorks operates, without regard to conflict of law principles. Any disputes will be resolved in the applicable courts of that jurisdiction.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
