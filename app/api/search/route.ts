import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get('q')

        if (!query || query.trim() === '') {
            return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
        }

        const supabase = await createClient()
        const searchTerm = `%${query.trim()}%`

        // 프로젝트 검색 (제목, 설명, 기술 스택)
        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select(
                `
                id,
                title,
                description,
                github_url,
                demo_url,
                start_date,
                death_date,
                death_reasons,
                death_reason_other,
                tech_stack,
                what_achieved,
                what_failed,
                lessons_learned,
                detailed_story,
                screenshots,
                is_anonymous,
                allow_adoption,
                status,
                created_at,
                updated_at,
                view_count,
                like_count,
                user_id,
                profiles (
                    id,
                    username,
                    avatar_url,
                    full_name
                )
            `,
            )
            .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
            .order('created_at', { ascending: false })
            .limit(20)

        if (projectsError) {
            console.error('Projects search error:', projectsError)
        }

        // 사용자 검색 (사용자명, 풀네임, 바이오)
        const { data: users, error: usersError } = await supabase
            .from('profiles')
            .select('id, username, full_name, avatar_url, bio')
            .or(
                `username.ilike.${searchTerm},full_name.ilike.${searchTerm},bio.ilike.${searchTerm}`,
            )
            .order('created_at', { ascending: false })
            .limit(10)

        if (usersError) {
            console.error('Users search error:', usersError)
        }

        return NextResponse.json({
            projects: projects || [],
            users: users || [],
        })
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
