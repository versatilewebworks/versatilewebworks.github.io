import type { Metadata } from 'next';
import ContactForm from '../../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact & Support | Versatile WebWorks',
  description: 'Get in touch with Versatile WebWorks for support, feedback, or privacy inquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
          <span className="text-xs uppercase tracking-[0.32em] text-sky-700">Contact & Support</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Speak with the Versatile WebWorks team</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Need support, have a legal question, or want to share product feedback? Use the form below to compose your message and find the right contact channel for professional inquiries.
          </p>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr]">
          <div>
            <ContactForm />
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
            <h2 className="text-2xl font-semibold text-slate-900">Support channels</h2>
            <p className="mt-4 text-slate-600 leading-8">
              Our platform is serverless for utility processing, so the highest-quality support comes through these direct contact channels.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">General support</p>
                <p className="mt-2 font-semibold text-slate-900">support@versatilewebworks.com</p>
                <p className="mt-2 text-slate-600">Questions about tools, site behavior, or platform access.</p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Privacy and legal</p>
                <p className="mt-2 font-semibold text-slate-900">privacy@versatilewebworks.com</p>
                <p className="mt-2 text-slate-600">Data protection, privacy rights, and terms inquiries.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
