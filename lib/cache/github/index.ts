import { useQuery } from '@tanstack/react-query'
import { RepoData } from '@/types/repo'

export const useGithubRepo = (owner: string, repo: string) => {
    return useQuery<RepoData>({
        queryKey: ['github', 'repo', owner, repo],
        queryFn: () => fetch(`/api/github/repo?owner=${owner}&repo=${repo}`).then(res => res.json()) as Promise<RepoData>,
        enabled: false,
        staleTime: 1000 * 60 * 10, // 10 minutes
    })
}