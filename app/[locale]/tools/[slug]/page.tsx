import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '../../../../lib/posts';
import { createTranslator, loadMessages } from '../../../../lib/i18n';

type Props = { params: { locale: string; slug: string } };

export async function generateStaticParams() {
  const locales = ['en', 'es', 'ur'];
  return posts.flatMap((post) => locales.map((locale) => ({ locale, slug: post.slug })));
}

export default async function ToolPage({ params }: Props) {
  const messages = await loadMessages(params.locale);
  const t = createTranslator({ locale: params.locale, messages });

  const tool = posts.find((post) => post.slug === params.slug);
  if (!tool) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <Link href={`/${params.locale}/tools`} className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back to tools
        </Link>
        <div className="mt-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{tool.title}</h1>
          <p className="text-sm text-slate-500">{new Date(tool.date).toLocaleDateString()}</p>
        </div>
      </header>

      {tool.coverImage && (
        <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <img src={tool.coverImage} alt={tool.title} className="w-full object-cover" />
        </div>
      )}

      <section className="prose max-w-none text-slate-700">
        <p>{tool.description}</p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        {tool.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 notranslate">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-slate-50 border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">{t('tools.related')}</h2>
        <p className="text-slate-600">Explore more developer tools and utility content in your selected language.</p>
      </div>
    </main>
  );
}
