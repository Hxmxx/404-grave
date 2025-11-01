import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const PAGE_SIZE = 20

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const page = parseInt(searchParams.get('page') || '0')
        const offset = page * PAGE_SIZE

        const supabase = await createClient()

        const {
            data: projects,
            error,
            count,
        } = await supabase
            .from('projects')
            .select(
                `
                *,
                profiles!projects_user_id_fkey (
                    id,
                    username,
                    avatar_url,
                    full_name
                )
            `,
                { count: 'exact' },
            )
            .order('created_at', { ascending: false })
            .range(offset, offset + PAGE_SIZE - 1)

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({
            projects: projects || [],
            hasMore: (count || 0) > offset + PAGE_SIZE,
            total: count || 0,
        })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
