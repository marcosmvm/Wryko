import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // If Supabase is not configured, allow all routes
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.next()
    }

    // If a Supabase auth code lands on a non-callback route, forward it
    // to /auth/callback so the code can be exchanged for a session
    const code = request.nextUrl.searchParams.get('code')
    if (code && !request.nextUrl.pathname.startsWith('/auth/callback')) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/callback'
      return NextResponse.redirect(url)
    }

    // Dynamically import Supabase only when configured
    const { createServerClient } = await import('@supabase/ssr')

    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refresh session if expired
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protected routes - redirect to login if not authenticated
    if (
      request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.startsWith('/onboarding')
    ) {
      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('redirectedFrom', request.nextUrl.pathname)
        return NextResponse.redirect(url)
      }

      const userRole = user.user_metadata?.role || 'client'
      const onboardingCompleted = user.user_metadata?.onboarding_completed === true

      // Admin routes require admin role
      if (request.nextUrl.pathname.startsWith('/admin')) {
        if (userRole !== 'admin') {
          const url = request.nextUrl.clone()
          url.pathname = '/dashboard'
          return NextResponse.redirect(url)
        }
      }

      // Redirect admins away from client dashboard to admin portal
      if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (userRole === 'admin') {
          const url = request.nextUrl.clone()
          url.pathname = '/admin'
          return NextResponse.redirect(url)
        }
      }

      // Onboarding gating for client users
      if (userRole === 'client') {
        // Client trying to access dashboard but hasn't completed onboarding
        if (request.nextUrl.pathname.startsWith('/dashboard') && !onboardingCompleted) {
          const url = request.nextUrl.clone()
          url.pathname = '/onboarding'
          return NextResponse.redirect(url)
        }

        // Client already completed onboarding, redirect away from onboarding page
        if (request.nextUrl.pathname.startsWith('/onboarding') && onboardingCompleted) {
          const url = request.nextUrl.clone()
          url.pathname = '/dashboard'
          return NextResponse.redirect(url)
        }
      }

      // Admins shouldn't see client onboarding
      if (request.nextUrl.pathname.startsWith('/onboarding') && userRole === 'admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }
    }

    // Redirect logged-in users away from auth pages
    if (user) {
      const userRole = user.user_metadata?.role || 'client'
      const onboardingCompleted = user.user_metadata?.onboarding_completed === true

      // Determine correct destination based on role and onboarding status
      let destination: string
      if (userRole === 'admin') {
        destination = '/admin'
      } else if (!onboardingCompleted) {
        destination = '/onboarding'
      } else {
        destination = '/dashboard'
      }

      if (
        request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/register'
      ) {
        const url = request.nextUrl.clone()
        url.pathname = destination
        return NextResponse.redirect(url)
      }

      // Redirect authenticated users from homepage
      if (request.nextUrl.pathname === '/') {
        const url = request.nextUrl.clone()
        url.pathname = destination
        return NextResponse.redirect(url)
      }
    }

    return supabaseResponse
  } catch (error) {
    // If middleware fails, allow the request to continue
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
