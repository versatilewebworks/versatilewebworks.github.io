// Minimal server-side translator helper to avoid external peer dependency issues
export function createTranslator({ locale, messages }: { locale: string; messages: Record<string, any> }) {
  function t(path: string, fallback?: string) {
    const parts = path.split('.');
    let cur: any = messages;
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) {
        cur = cur[p];
      } else {
        return fallback ?? path;
      }
    }
    return typeof cur === 'string' ? cur : fallback ?? String(cur);
  }

  return t;
}

export async function loadMessages(locale: string) {
  try {
    // dynamic import of JSON messages
    const msgs = (await import(`../messages/${locale}.json`)).default;
    return msgs as Record<string, any>;
  } catch (err) {
    // fallback to English
    const msgs = (await import(`../messages/en.json`)).default;
    return msgs as Record<string, any>;
  }
}
