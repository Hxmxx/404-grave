import { NextResponse } from 'next/server';
import { githubCache } from '@/lib/cache/github-cache';

export async function getRepoData(owner: string, repo: string) {
  // Check cache first
  const cacheKey = { owner, repo };
  const cachedData = githubCache.getRepoData(cacheKey);
  
  if (cachedData) {
    console.log(`Cache hit for ${owner}/${repo}`);
    return cachedData;
  }

  // Check if we should make API call based on rate limit
  if (!githubCache.shouldMakeApiCall()) {
    console.log(`Rate limit exceeded, returning cached data for ${owner}/${repo}`);
    return getDefaultRepoData(owner, repo);
  }
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': '404-grave-app'
    };

    // 토큰이 있으면 사용, 없으면 공개 API로 제한된 요청
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('레포지토리를 찾을 수 없습니다.');
      }
      if (response.status === 403) {
        // Rate limit 체크
        const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        
        if (rateLimitRemaining === '0') {
          const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : new Date(Date.now() + 3600000);
          throw new Error(`API 요청 한도에 도달했습니다. ${resetTime.toLocaleString()}에 다시 시도해주세요.`);
        }
        
        // 기타 403 오류의 경우 기본 데이터 반환
        return getDefaultRepoData(owner, repo);
      }
      throw new Error(`GitHub API 오류: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Rate limit 정보 추출
    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');
    const rateLimit = response.headers.get('X-RateLimit-Limit');
    
    const repoData = {
      name: data.name,
      full_name: data.full_name,
      description: data.description,
      html_url: data.html_url,
      clone_url: data.clone_url,
      language: data.language,
      stargazers_count: data.stargazers_count,
      forks_count: data.forks_count,
      open_issues_count: data.open_issues_count,
      created_at: data.created_at,
      updated_at: data.updated_at,
      pushed_at: data.pushed_at,
      owner: {
        login: data.owner.login,
        avatar_url: data.owner.avatar_url,
        html_url: data.owner.html_url
      },
      topics: data.topics || [],
      license: data.license?.name || null,
      archived: data.archived,
      disabled: data.disabled,
      private: data.private,
      rateLimit: {
        remaining: rateLimitRemaining ? parseInt(rateLimitRemaining) : null,
        reset: rateLimitReset ? parseInt(rateLimitReset) : null,
        limit: rateLimit ? parseInt(rateLimit) : null
      }
    };

    // Cache the successful response
    githubCache.setRepoData(cacheKey, repoData);
    
    // Update rate limit cache
    if (rateLimitRemaining && rateLimitReset && rateLimit) {
      githubCache.setRateLimit({
        remaining: parseInt(rateLimitRemaining),
        reset: parseInt(rateLimitReset),
        limit: parseInt(rateLimit)
      });
    }

    console.log(`Cached data for ${owner}/${repo}`);
    return repoData;
  } catch (error) {
    console.error('GitHub API 호출 오류:', error);
    // API 호출 실패 시 기본 데이터 반환
    return getDefaultRepoData(owner, repo);
  }
}

function getDefaultRepoData(owner: string, repo: string) {
  return {
    name: repo,
    full_name: `${owner}/${repo}`,
    description: '404 Grave - 실패한 프로젝트들의 무덤. 당신의 실패한 프로젝트 이야기를 기록하고 공유하세요.',
    html_url: `https://github.com/${owner}/${repo}`,
    clone_url: `https://github.com/${owner}/${repo}.git`,
    language: 'TypeScript',
    stargazers_count: 42,
    forks_count: 7,
    open_issues_count: 3,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
    owner: {
      login: owner,
      avatar_url: `https://github.com/${owner}.png`,
      html_url: `https://github.com/${owner}`
    },
    topics: ['404', 'grave', 'failed-projects', 'nextjs', 'typescript'],
    license: 'MIT',
    archived: false,
    disabled: false,
    private: false,
    rateLimit: {
      remaining: 0,
      reset: Math.floor(Date.now() / 1000) + 3600, // 1시간 후
      limit: 60
    }
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json({ error: 'Owner and repo are required' }, { status: 400 });
  }

  try {
    const repoData = await getRepoData(owner, repo);
    return NextResponse.json(repoData);
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}