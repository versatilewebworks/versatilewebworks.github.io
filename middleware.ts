import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'es', 'ur'];
const DEFAULT_LOCALE = 'en';

function parseAcceptLanguage(header: string | null) {
  if (!header) return DEFAULT_LOCALE;
  const parts = header.split(',').map(p => p.trim().split(';')[0]);
  for (const part of parts) {
    const code = part.split('-')[0];
    if (SUPPORTED_LOCALES.includes(code)) return code;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip public files, _next, api, and next-intl internal routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('/static/')) {
    return;
  }

  // If the path already contains a supported locale prefix, continue
  const firstSegment = pathname.split('/')[1];
  if (SUPPORTED_LOCALES.includes(firstSegment)) {
    return;
  }

  // Determine preferred locale from Accept-Language header
  const acceptLanguage = req.headers.get('accept-language');
  const locale = parseAcceptLanguage(acceptLanguage);

  // Redirect to the locale-prefixed path (preserving path + query)
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Apply to all paths except api, _next and static assets
  matcher: '/((?!api|_next|static).*)',
};
