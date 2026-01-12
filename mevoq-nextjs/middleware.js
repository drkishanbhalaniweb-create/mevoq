import { NextResponse } from 'next/server';

export function middleware(request) {
    const response = NextResponse.next();

    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.jsdelivr.net https://unpkg.com https://us.i.posthog.com https://d2adkz2s9zrlge.cloudfront.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://vjllbclvywghrhlcpapa.supabase.co https://placehold.co;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://vjllbclvywghrhlcpapa.supabase.co https://us.i.posthog.com;
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim();

    response.headers.set('Content-Security-Policy', cspHeader);

    // Basic rate limiting indicator (don't block, just log for monitoring)
    const userAgent = request.headers.get('user-agent') || '';

    // Allow all major search engines and AI crawlers explicitly
    const allowedBots = [
        'Googlebot', 'Bingbot', 'DuckDuckBot', 'Slurp', 'Baiduspider',
        'GPTBot', 'ChatGPT-User', 'Claude-Web', 'anthropic-ai',
        'PerplexityBot', 'CCBot'
    ];

    const isAllowedBot = allowedBots.some(bot =>
        userAgent.toLowerCase().includes(bot.toLowerCase())
    );

    // Only block if completely empty user agent (sign of basic scrapers)
    if (!isAllowedBot && userAgent === '') {
        return new NextResponse('Forbidden', { status: 403 });
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)'],
};
