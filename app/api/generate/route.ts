import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || 'technology').toLowerCase();

  const feeds: Record<string, string[]> = {
    business: [
      'https://www.reuters.com/business/feed',
      'https://www.ft.com/?edition=international&format=rss'
    ],
    technology: [
      'https://techcrunch.com/feed/',
      'https://www.theverge.com/rss/index.xml'
    ],
    sports: [
      'https://www.espn.com/espn/rss/news',
      'https://www.skysports.com/rss/12040'
    ]
  };

  const list = feeds[category] ?? feeds['technology'];

  async function fetchFirstSnippet(feedUrl: string) {
    try {
      const res = await fetch(feedUrl, { headers: { 'User-Agent': 'versatilewebworks/1.0' } });
      if (!res.ok) return null;
      const txt = await res.text();
      // crude parsing: look for <item> ... </item> and extract <title> or <description>
      const itemMatch = txt.match(/<item[\s\S]*?<title>([\s\S]*?)<\/(title)>/i);
      if (itemMatch && itemMatch[1]) {
        const title = itemMatch[1];
        const clean = title.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (clean) return clean;
      }

      // fallback: find first <description>
      const descMatch = txt.match(/<description>([\s\S]*?)<\/(description)>/i);
      if (descMatch && descMatch[1]) {
        const d = descMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (d) return d;
      }

      // Atom entries
      const entryMatch = txt.match(/<entry[\s\S]*?<title>([\s\S]*?)<\/(title)>/i);
      if (entryMatch && entryMatch[1]) {
        const e = entryMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (e) return e;
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  for (const f of list) {
    const snippet = await fetchFirstSnippet(f);
    if (snippet) {
      const truncated = snippet.slice(0, 500);
      return new Response(JSON.stringify({ text: truncated }), { headers: { 'Content-Type': 'application/json' } });
    }
  }

  // final fallback - static sample
  const fallback = 'Practice makes progress — type steadily, focus on accuracy, then increase speed.';
  return new Response(JSON.stringify({ text: fallback.slice(0, 500) }), { headers: { 'Content-Type': 'application/json' } });
}
