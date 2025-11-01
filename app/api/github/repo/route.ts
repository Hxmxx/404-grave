import { NextResponse, NextRequest } from 'next/server'
import { RepoData } from '@/types/repo'

// GitHub URL에서 owner와 repo 추출
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
    try {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/i)
        if (!match) return null

        const owner = match[1]
        let repo = match[2]

        // .git 확장자 제거
        repo = repo.replace(/\.git$/, '')

        return { owner, repo }
    } catch {
        return null
    }
}

async function fetchGitHubRepo(owner: string, repo: string) {
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}`
    const response = await fetch(githubUrl, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
        next: { revalidate: 60 },
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return {
            error: errorData.message || 'GitHub API 호출 실패',
            status: response.status,
        }
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

    return { data: repoData }
}

// POST: GitHub URL로 레포 정보 가져오기
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { url } = body

        if (!url) {
            return NextResponse.json({ error: 'GitHub URL을 입력해주세요.' }, { status: 400 })
        }

        const parsed = parseGitHubUrl(url)

        if (!parsed) {
            return NextResponse.json({ error: '유효한 GitHub URL이 아닙니다.' }, { status: 400 })
        }

        const result = await fetchGitHubRepo(parsed.owner, parsed.repo)

        if ('error' in result) {
            return NextResponse.json({ error: result.error }, { status: result.status })
        }

        return NextResponse.json(result.data)
    } catch (error) {
        console.error('GitHub API error:', error)
        return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
    }
}

// GET: owner와 repo로 레포 정보 가져오기
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')

    if (!owner || !repo) {
        return NextResponse.json({ error: '소유자와 저장소 이름을 입력해주세요.' }, { status: 400 })
    }

    try {
        const result = await fetchGitHubRepo(owner, repo)

        if ('error' in result) {
            return NextResponse.json({ error: result.error }, { status: result.status })
        }

        return NextResponse.json(result.data)
    } catch (error) {
        console.error('GitHub API error:', error)
        return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
    }
}
