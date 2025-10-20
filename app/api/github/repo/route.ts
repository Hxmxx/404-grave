import { NextResponse } from 'next/server'
import { RepoData } from '@/types/repo'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')

    if (!owner || !repo) {
        return NextResponse.json({ error: '소유자와 저장소 이름을 입력해주세요.' }, { status: 400 })
    }

    try {
        const githubUrl = `https://api.github.com/repos/${owner}/${repo}`
        const response = await fetch(githubUrl, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
            },
            next: { revalidate: 60 },
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return NextResponse.json(
                { error: errorData.message || 'GitHub API 호출 실패' },
                { status: response.status },
            )
        }

        const data = await response.json()

        const repoData: RepoData = {
            name: data.name,
            full_name: data.full_name,
            description: data.description,
            html_url: data.html_url,
            language: data.language,
            stargazers_count: data.stargazers_count,
            forks_count: data.forks_count,
            open_issues_count: data.open_issues_count,
            created_at: data.created_at,
            updated_at: data.updated_at,
            owner: {
                login: data.owner.login,
                avatar_url: data.owner.avatar_url,
                html_url: data.owner.html_url,
            },
            rateLimit: {
                remaining: Number(response.headers.get('X-RateLimit-Remaining') ?? null),
                reset: Number(response.headers.get('X-RateLimit-Reset') ?? null),
                limit: Number(response.headers.get('X-RateLimit-Limit') ?? null),
            },
        }

        return NextResponse.json(repoData)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
