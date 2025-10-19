export interface RepoData {
  name: string
  full_name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  rateLimit?: {
    remaining: number | null
    reset: number | null
    limit: number | null
  }
}
