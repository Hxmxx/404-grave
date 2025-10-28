import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const origin = requestUrl.origin

    if (!code) {
        return NextResponse.redirect(`${origin}/auth/login?error=No code provided`)
    }

    const supabase = await createClient()

    try {
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('Error exchanging code for session:', error)
            return NextResponse.redirect(
                `${origin}/auth/login?error=${encodeURIComponent(error.message)}`,
            )
        }

        // Redirect to home page - cookies will be set by the middleware
        return NextResponse.redirect(origin)
    } catch (error) {
        console.error('Callback error:', error)
        return NextResponse.redirect(
            `${origin}/auth/login?error=${encodeURIComponent('Authentication failed')}`,
        )
    }
}

