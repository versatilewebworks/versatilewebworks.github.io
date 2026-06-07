import BlogCarousel from '../../../../components/BlogCarousel';
import { posts } from '../../../../lib/posts';
import LanguageSwitcher from '../../../../components/LanguageSwitcher';
import { createTranslator } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function ToolPage({ params }: Props) {
  const messages = (await import(`../../../../messages/${params.locale}.json`)).default;
  const t = createTranslator({ locale: params.locale, messages });

  // Filter posts by tag/category for contextual relevance
  const developerTools = posts.filter(p => p.tags.includes('developer-tools') || p.category === 'developer-tools');

  return (
    <main className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('tools.jsonFormatter')}</h1>
        <LanguageSwitcher />
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-4">{t('tools.related')}</h2>
        <BlogCarousel posts={developerTools} />
      </section>
    </main>
  );
}
