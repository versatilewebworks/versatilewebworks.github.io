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
          <div className="max-w-3xl mb-6">
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 mb-4">{t('homepage.title')}</h1>
            <p className="text-lg text-slate-600 mb-6">A collection of fast, serverless utilities and developer tools to speed up your workflow.</p>
          </div>

          {/* Tools showcase - up to 5 utilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {posts.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                href={`/${params.locale}/tools/${p.slug}`}
                className="group block rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                {p.coverImage ? (
                  <div className="h-36 w-full overflow-hidden bg-gray-100">
                    <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                ) : (
                  <div className="h-36 w-full bg-gray-100 flex items-center justify-center text-slate-500">No image</div>
                )}

                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1 notranslate">{p.title}</h3>
                  <p className="text-xs text-gray-500">{p.tags.join(' • ')}</p>
                </div>
              </Link>
            ))}

            {/* Stenotypist quick access card */}
            <Link
              href={`/${params.locale}/stenotypist`}
              className="group block rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="h-36 w-full overflow-hidden bg-gradient-to-r from-indigo-600 to-sky-500 flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Stenotypist</h3>
                  <p className="text-xs opacity-90">Practice Studio</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-700">Type training and real-time metrics</p>
              </div>
            </Link>
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
