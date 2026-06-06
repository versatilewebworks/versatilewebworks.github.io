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
      
      let content = '';
      
      // Extract multiple items/entries to build ~500 character text
      const itemMatches = txt.match(/<item[\s\S]*?<\/item>/gi) || [];
      
      for (let i = 0; i < itemMatches.length && content.length < 500; i++) {
        const item = itemMatches[i];
        
        // Try title
        const titleMatch = item.match(/<title>([\s\S]*?)<\/(title)>/i);
        if (titleMatch && titleMatch[1]) {
          const title = titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
          if (title && title.length > 10) {
            content += (content ? ' ' : '') + title;
          }
        }
        
        // Try description
        if (content.length < 500) {
          const descMatch = item.match(/<description>([\s\S]*?)<\/(description)>/i);
          if (descMatch && descMatch[1]) {
            const desc = descMatch[1]
              .replace(/<[^>]+>/g, '')
              .replace(/\s+/g, ' ')
              .replace(/&[a-z]+;/g, ' ')
              .trim();
            if (desc && desc.length > 20) {
              content += (content ? ' ' : '') + desc;
            }
          }
        }
      }
      
      if (content.length < 200) {
        // Fallback: try Atom format
        const entryMatches = txt.match(/<entry[\s\S]*?<\/entry>/gi) || [];
        
        for (let i = 0; i < entryMatches.length && content.length < 500; i++) {
          const entry = entryMatches[i];
          
          // Try title
          const titleMatch = entry.match(/<title>([\s\S]*?)<\/(title)>/i);
          if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            if (title && title.length > 10) {
              content += (content ? ' ' : '') + title;
            }
          }
          
          // Try summary or content
          if (content.length < 500) {
            const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/(summary)>/i);
            if (summaryMatch && summaryMatch[1]) {
              const summary = summaryMatch[1]
                .replace(/<[^>]+>/g, '')
                .replace(/\s+/g, ' ')
                .replace(/&[a-z]+;/g, ' ')
                .trim();
              if (summary && summary.length > 20) {
                content += (content ? ' ' : '') + summary;
              }
            }
          }
        }
      }
      
      return content.length > 50 ? content : null;
    } catch (e) {
      return null;
    }
  }

  for (const f of list) {
    const snippet = await fetchFirstSnippet(f);
    if (snippet && snippet.length >= 100) {
      const truncated = snippet.slice(0, 500);
      return new Response(JSON.stringify({ text: truncated }), { headers: { 'Content-Type': 'application/json' } });
    }
  }

  // final fallback - longer static samples for practice
  const fallbacks = [
    'Practice makes progress. Type steadily and focus on accuracy before increasing speed. Stenotypists develop muscle memory through consistent daily practice. Each keystroke reinforces neural pathways. Start slowly, maintain rhythm, and gradually increase velocity. Monitor your accuracy rate and work to minimize mistakes. With dedication and regular practice sessions, your speed will naturally improve over time.',
    'Touch typing is a skill that develops through repetition and focused practice. Begin by learning correct finger placement on the keyboard. Never look at your hands while typing. Keep your eyes on the source material or screen. Gradually increase your typing speed while maintaining high accuracy levels. Professional stenographers type at speeds exceeding 200 words per minute. This mastery comes from years of dedicated daily practice sessions.',
    'Effective typing practice requires maintaining proper posture and hand position. Sit with your back straight and your feet flat on the floor. Rest your wrists lightly on the desk surface. Keep your fingers curved and ready over the keyboard. Focus on the rhythm and flow of your typing. Smooth, consistent typing patterns lead to better speed and accuracy. Regular practice sessions help build the muscle memory needed for professional stenotyping.',
  ];
  
  const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  return new Response(JSON.stringify({ text: fallback.slice(0, 500) }), { headers: { 'Content-Type': 'application/json' } });
}
