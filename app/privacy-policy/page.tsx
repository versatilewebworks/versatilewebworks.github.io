import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Versatile WebWorks',
  description: 'Read how Versatile WebWorks protects your privacy, processes utility data locally, and manages analytics and cookies.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
          <span className="text-xs uppercase tracking-[0.32em] text-sky-700">Privacy Policy</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Privacy and Data Handling</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Versatile WebWorks is committed to privacy and transparent data handling. Our utility tools are designed to process user input locally in the browser, without storing, logging, or viewing that tool data on our servers.
          </p>
        </section>

        <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">1. Information collection and processing</h2>
            <p className="text-slate-600 leading-8">
              Versatile WebWorks does not collect or retain the content you enter into our client-side utility tools. Inputs are processed entirely in your browser or in-memory during the active tool session. We do not store, log, send, or otherwise access your tool inputs on our servers.
            </p>
            <p className="text-slate-600 leading-8">
              If you use a feature that explicitly requires server-side processing, we will disclose that behavior clearly. At this time, all utilities on this site are client-side by design, and no user-entered tool data is transmitted to our infrastructure.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">2. What data may be collected</h2>
            <ul className="space-y-3 text-slate-600 leading-8 list-disc list-inside">
              <li>
                <strong>Technical site data:</strong> anonymous analytics data, browser metadata, platform usage statistics, and performance metrics collected through hosting and analytics services.
              </li>
              <li>
                <strong>Cookies and session storage:</strong> small browser tokens used to support page rendering, session behavior, and analytics. We do not use cookies to track personal identities.
              </li>
              <li>
                <strong>Support and contact requests:</strong> if you email us directly, those messages are managed through your email provider and our mailbox, not stored by the utility platform itself.
              </li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">3. Third-party services and analytics</h2>
            <p className="text-slate-600 leading-8">
              We use third-party services to host and serve the site, monitor availability, and understand usage patterns. These services may collect anonymous metadata and cookies as part of standard hosting and analytics operations.
            </p>
            <p className="text-slate-600 leading-8">
              Typical third parties include:
            </p>
            <ul className="space-y-3 text-slate-600 leading-8 list-disc list-inside">
              <li>Vercel for hosting, deployment, and performance monitoring.</li>
              <li>Browser-based cookies for UI behavior, responsive layout support, and anonymous traffic analysis.</li>
              <li>Standard web platform services used to deliver fonts, assets, and static content.</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">4. Data protection and rights</h2>
            <p className="text-slate-600 leading-8">
              We take reasonable steps to protect any information that is processed for site operation. Because tool input is not retained, our exposure to user data is extremely limited.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-900">GDPR rights</h3>
                <p className="mt-3 text-slate-600 leading-7">
                  If you are in the European Economic Area, you may request access, correction, restriction, or deletion of your personal information. Since the site does not store tool data, most requests concern analytics or support communications only.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-900">CCPA rights</h3>
                <p className="mt-3 text-slate-600 leading-7">
                  California residents may request information about personal data collection, deletion, and opt out of the sale of personal information. We do not sell personal data and do not retain user-entered tool content.
                </p>
              </div>
            </div>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">5. Contact information</h2>
            <p className="text-slate-600 leading-8">
              For privacy questions, requests, or concerns, please contact us at:
            </p>
            <div className="space-y-2 rounded-3xl bg-slate-50 p-6 text-slate-700">
              <p className="font-semibold text-slate-900">Email:</p>
              <p>support@versatilewebworks.com</p>
              <p>privacy@versatilewebworks.com</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
