import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/site', '/api/uploadthing']);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const pathWithSearchParams = `${url.pathname}${searchParams ? `?${searchParams}` : ''}`;

  const host = req.headers.get('host') || '';
  const customSubDomain = host.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)?.[0]?.replace(/\.$/, '');

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Handle subdomain rewrites
  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  // Redirect auth pages to /agency
if ((url.pathname === '/sign-in' || url.pathname === '/sign-up') && !req.headers.get('sec-fetch-dest')?.includes('iframe')) {
  return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
}

  // Rewrite home or root /site
  if (
    url.pathname === '/' ||
    (url.pathname === '/site' && host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL('/site', req.url));
  }

  // Rewrite agency/subaccount routes as-is
  if (
    url.pathname.startsWith('/agency') ||
    url.pathname.startsWith('/subaccount')
  ) {
    return NextResponse.rewrite(new URL(pathWithSearchParams, req.url));
  }

  // All other routes are protected (do nothing)
  // Clerk will protect them automatically.
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
