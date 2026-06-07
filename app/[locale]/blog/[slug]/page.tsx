import { posts } from '../../../../lib/posts';
import { createTranslator, loadMessages } from '../../../../lib/i18n';
import { notFound } from 'next/navigation';

type Props = { params: { locale: string; slug: string } };

export async function generateStaticParams() {
  const locales = ['en', 'es', 'ur'];
  return posts.flatMap((p) => locales.map((locale) => ({ locale, slug: p.slug })));
}

export default async function BlogPostPage({ params }: Props) {
  const messages = await loadMessages(params.locale);
  const t = createTranslator({ locale: params.locale, messages });

  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <article>
        <header className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
        </header>

        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="w-full rounded-lg mb-6 object-cover" />
        )}

        <section className="prose max-w-none">
          <p>{post.description}</p>
        </section>

        <footer className="mt-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 notranslate">{tag}</span>
            ))}
          </div>
        </footer>
      </article>
    </main>
  );
}
