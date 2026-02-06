import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getDestinationByRole } from '@/lib/auth/redirect'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const errorParam = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Handle OAuth errors from Supabase
  if (errorParam) {
    console.error('[Auth Callback] OAuth error from provider:', errorParam, errorDescription)
    return NextResponse.redirect(
      `${origin}/login?error=auth&message=${encodeURIComponent(errorDescription || errorParam)}`
    )
  }

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('[Auth Callback] Missing Supabase environment variables')
      return NextResponse.redirect(
        `${origin}/login?error=auth&message=${encodeURIComponent('Server configuration error')}`
      )
    }

    const cookieStore = await cookies()

    // Determine the redirect URL
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocalEnv = process.env.NODE_ENV === 'development'

    let redirectUrl: string
    if (isLocalEnv) {
      redirectUrl = `${origin}${next}`
    } else if (forwardedHost) {
      redirectUrl = `https://${forwardedHost}${next}`
    } else {
      redirectUrl = `${origin}${next}`
    }

    // KEY FIX: Create the response FIRST so we can set cookies on it
    const response = NextResponse.redirect(redirectUrl)

    try {
      // Create Supabase client that sets cookies on the response object
      const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              // Set cookies directly on the response
              cookiesToSet.forEach(({ name, value, options }) => {
                response.cookies.set(name, value, options)
              })
            },
          },
        }
      )

      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('[Auth Callback] Error exchanging code for session:', error.message)
        return NextResponse.redirect(
          `${origin}/login?error=auth&message=${encodeURIComponent(error.message)}`
        )
      }

      // Determine role-based destination (with onboarding check)
      const { data: { user } } = await supabase.auth.getUser()
      const destination = getDestinationByRole(
        user?.user_metadata?.role,
        user?.user_metadata?.onboarding_completed
      )

      let roleRedirectUrl: string
      if (isLocalEnv) {
        roleRedirectUrl = `${origin}${destination}`
      } else if (forwardedHost) {
        roleRedirectUrl = `https://${forwardedHost}${destination}`
      } else {
        roleRedirectUrl = `${origin}${destination}`
      }

      // Create new redirect with correct destination, preserving auth cookies
      const roleResponse = NextResponse.redirect(roleRedirectUrl)
      response.cookies.getAll().forEach(cookie => {
        roleResponse.cookies.set(cookie.name, cookie.value)
      })

      return roleResponse

    } catch (error) {
      console.error('[Auth Callback] Unexpected error during session exchange:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      return NextResponse.redirect(
        `${origin}/login?error=auth&message=${encodeURIComponent(errorMessage)}`
      )
    }
  }

  // No code provided - redirect to login
  console.error('[Auth Callback] No authorization code provided')
  return NextResponse.redirect(
    `${origin}/login?error=auth&message=${encodeURIComponent('No authorization code provided')}`
  )
}
