import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/site', '/api/uploadthing']);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return; // allow unauthenticated access
//   auth().protect();               // protect everything else
});

export const config = {
  matcher: [
    // Matches all routes except static files and Next.js internals
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
