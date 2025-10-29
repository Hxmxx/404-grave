import { createClient } from '@/lib/supabase/server'
import { registerSchema } from '@/types/auth'
import { NextResponse } from 'next/server'
import { ZodError, ZodIssue } from 'zod'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()
        const validatedData = registerSchema.parse({ email, password })
        const supabase = await createClient()

        const { data, error } = await supabase.auth.signUp({
            email: validatedData.email,
            password: validatedData.password,
        })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: error.status })
        }

        return NextResponse.json({ data }, { status: 200 })
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues.map((err: ZodIssue) => err.message).join(', ') },
                { status: 400 },
            )
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
    }
}
