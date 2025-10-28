import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/types/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()
        const validatedData = loginSchema.parse({ email, password })
        const supabase = await createClient()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: validatedData.email,
            password: validatedData.password,
        })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: '로그인 실패' }, { status: 500 })
    }
}
