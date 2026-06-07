import { NextResponse } from 'next/server';

const baseUrl = process.env.SITE_URL ?? 'https://www.versatilewebworks.com';

export function GET() {
  const rules = `User-agent: *
Allow: /
Disallow: /api/private
Disallow: /admin
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(rules, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
