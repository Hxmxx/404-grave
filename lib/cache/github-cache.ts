import { MemoryCache } from './memory-cache'
import { CACHE_CONFIGS, RepoCacheKey } from './types'
import { RepoData } from '@/types/repo'

export class GitHubCacheService {
  private repoCache: MemoryCache<RepoData>
  private rateLimitCache: MemoryCache<{ remaining: number; reset: number; limit: number }>

  constructor() {
    this.repoCache = new MemoryCache<RepoData>(CACHE_CONFIGS.REPO_DATA)
    this.rateLimitCache = new MemoryCache<{ remaining: number; reset: number; limit: number }>(CACHE_CONFIGS.RATE_LIMIT)
  }

  // Repository data caching
  getRepoData(key: RepoCacheKey): RepoData | null {
    return this.repoCache.get(key)
  }

  setRepoData(key: RepoCacheKey, data: RepoData): void {
    this.repoCache.set(key, data)
  }

  // Rate limit caching
  getRateLimit(): { remaining: number; reset: number; limit: number } | null {
    return this.rateLimitCache.get('rate_limit')
  }

  setRateLimit(rateLimit: { remaining: number; reset: number; limit: number }): void {
    this.rateLimitCache.set('rate_limit', rateLimit)
  }

  // Check if we should make API call based on rate limit
  shouldMakeApiCall(): boolean {
    const rateLimit = this.getRateLimit()
    if (!rateLimit) return true

    const now = Math.floor(Date.now() / 1000)
    const resetTime = rateLimit.reset

    // If rate limit is reset, we can make calls
    if (now >= resetTime) {
      return true
    }

    // If we have remaining calls, we can make them
    return rateLimit.remaining > 0
  }

  // Get time until rate limit resets
  getTimeUntilReset(): number {
    const rateLimit = this.getRateLimit()
    if (!rateLimit) return 0

    const now = Math.floor(Date.now() / 1000)
    return Math.max(0, rateLimit.reset - now)
  }

  // Cache warming - preload popular repositories
  async warmCache(popularRepos: RepoCacheKey[]): Promise<void> {
    const promises = popularRepos.map(async (repo) => {
      if (!this.repoCache.get(repo)) {
        try {
          const response = await fetch(`/api/github/repo?owner=${repo.owner}&repo=${repo.repo}`)
          if (response.ok) {
            const data = await response.json()
            this.setRepoData(repo, data)
          }
        } catch (error) {
          console.warn(`Failed to warm cache for ${repo.owner}/${repo.repo}:`, error)
        }
      }
    })

    await Promise.allSettled(promises)
  }

  // Background refresh for items that need refresh
  async refreshStaleItems(): Promise<void> {
    const staleItems = this.repoCache.getItemsNeedingRefresh()
    
    const promises = staleItems.map(async ({ key }) => {
      const [owner, repo] = key.split(':')
      try {
        const response = await fetch(`/api/github/repo?owner=${owner}&repo=${repo}`)
        if (response.ok) {
          const data = await response.json()
          this.setRepoData({ owner, repo }, data)
        }
      } catch (error) {
        console.warn(`Failed to refresh cache for ${key}:`, error)
      }
    })

    await Promise.allSettled(promises)
  }

  // Cleanup expired items
  cleanup(): { repoCleaned: number; rateLimitCleaned: number } {
    return {
      repoCleaned: this.repoCache.cleanup(),
      rateLimitCleaned: this.rateLimitCache.cleanup()
    }
  }

  // Get cache statistics
  getStats() {
    return {
      repo: this.repoCache.getStats(),
      rateLimit: this.rateLimitCache.getStats()
    }
  }

  // Clear all caches
  clear(): void {
    this.repoCache.clear()
    this.rateLimitCache.clear()
  }
}

// Singleton instance
export const githubCache = new GitHubCacheService()

// Background cleanup every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    githubCache.cleanup()
  }, 5 * 60 * 1000)
}
