import BlogCarousel from '../../components/BlogCarousel';
import { posts } from '../../lib/posts';
import { createTranslator, loadMessages } from '../../lib/i18n';
import Link from 'next/link';

type Props = { params: { locale: string } };

export default async function Page({ params }: Props) {
  const messages = await loadMessages(params.locale);
  const t = createTranslator({ locale: params.locale, messages });

  // Featured posts for carousel
  const featured = posts.slice(0, 3);

  return (
    <main>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-sky-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 mb-4">{t('homepage.title')}</h1>
            <p className="text-lg text-slate-600 mb-6">A collection of fast, serverless utilities and developer tools to speed up your workflow.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools/json-formatter" className="rounded-md bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-700">
                <span className="notranslate">Get Started</span>
              </Link>
              <Link href="/blog" className="rounded-md border border-slate-200 px-5 py-3 text-slate-700 font-medium hover:bg-slate-50">
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Full width banner */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="w-full h-36 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 text-white flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-semibold">Full-Width Announcement Banner</h3>
              <p className="text-sm opacity-90">Promote a new tool, newsletter, or important update here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-semibold mb-6">{t('homepage.featured')}</h2>
          <BlogCarousel posts={featured} />
        </div>
      </section>

      {/* Two equal-width banners */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-40 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <div className="text-center">
                <h4 className="font-semibold">Banner One</h4>
                <p className="text-sm text-slate-600">Short promo or link.</p>
              </div>
            </div>

            <div className="h-40 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <div className="text-center">
                <h4 className="font-semibold">Banner Two</h4>
                <p className="text-sm text-slate-600">Another promotion or CTA.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
