export interface Project {
    id: string
    user_id: string
    title: string
    description: string
    github_url: string | null
    demo_url: string | null
    start_date: string
    death_date: string
    death_reasons: string[]
    death_reason_other: string | null
    tech_stack: string[]
    what_achieved: string | null
    what_failed: string | null
    lessons_learned: string[]
    detailed_story: string | null
    screenshots: string[]
    is_anonymous: boolean
    allow_adoption: boolean
    status: 'active' | 'adopted' | 'archived'
    view_count: number
    like_count: number
    comment_count: number
    created_at: string
    updated_at: string
}

export interface ProjectWithOwner extends Project {
    profiles: {
        id: string
        username: string
        avatar_url: string | null
        full_name: string | null
    }
}
