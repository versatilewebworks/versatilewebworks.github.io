import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const baseUrl = process.env.SITE_URL ?? 'https://www.versatilewebworks.online';

async function getBlogSlugs(): Promise<string[]> {
  const blogPath = path.join(process.cwd(), 'app', 'blog');

  try {
    const entries = await fs.readdir(blogPath, { withFileTypes: true });
    return entries.reduce<string[]>((slugs, entry) => {
      if (entry.isDirectory()) {
        return [...slugs, entry.name];
      }

      if (entry.isFile() && entry.name !== 'page.tsx' && entry.name !== 'page.jsx') {
        const slug = entry.name.replace(/\.(mdx?|tsx?)$/, '');
        return [...slugs, slug];
      }

      return slugs;
    }, []);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getBlogSlugs();

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changefreq: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/stenotypist`,
      lastModified: new Date(),
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.6,
    },
  ];

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
