import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Public routes accessible without forced redirect
const isPublicRoute = createRouteMatcher([
  '/',
  '/courses(.*)',
  '/explore(.*)',
  '/pricing(.*)',
  '/subscriptions(.*)',
  '/student(.*)',
  '/learn(.*)',
  '/video(.*)',
  '/onboarding(.*)',
  '/sign-in(.*)',
  '/login(.*)',
  '/sign-up(.*)',
  '/register(.*)',
  '/sso-callback(.*)',
  '/my-learning(.*)',
  '/my-courses(.*)',
  '/progress(.*)',
  '/certificates(.*)',
  '/profile(.*)',
  '/notifications(.*)',
  '/forgot-password(.*)',
  '/settings(.*)',
  '/payment-success(.*)',
  '/checkout(.*)',
  '/api/auth(.*)',
  '/api/webhooks(.*)',
  '/api/banners(.*)',
  '/api/categories(.*)',
  '/api/courses(.*)',
  '/api/branches(.*)',
  '/api/payments(.*)',
  '/api/profile(.*)',
  '/api/progress(.*)',
  '/api/video(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
