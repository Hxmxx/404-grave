import { githubCache } from './github-cache'

// Popular repositories to pre-cache
const POPULAR_REPOS = [
  { owner: 'vercel', repo: 'next.js' },
  { owner: 'facebook', repo: 'react' },
  { owner: 'microsoft', repo: 'vscode' },
  { owner: 'nodejs', repo: 'node' },
  { owner: 'microsoft', repo: 'TypeScript' },
  { owner: 'vuejs', repo: 'vue' },
  { owner: 'angular', repo: 'angular' },
  { owner: 'sveltejs', repo: 'svelte' },
  { owner: 'remix-run', repo: 'remix' },
  { owner: 'nuxt', repo: 'nuxt' }
]

export class CacheWarmer {
  private isWarming = false
  private lastWarmTime = 0
  private warmInterval = 30 * 60 * 1000 // 30 minutes

  async warmCache(): Promise<void> {
    if (this.isWarming) {
      console.log('Cache warming already in progress')
      return
    }

    this.isWarming = true
    console.log('Starting cache warming...')

    try {
      await githubCache.warmCache(POPULAR_REPOS)
      this.lastWarmTime = Date.now()
      console.log('Cache warming completed')
    } catch (error) {
      console.error('Cache warming failed:', error)
    } finally {
      this.isWarming = false
    }
  }

  async refreshStaleItems(): Promise<void> {
    try {
      await githubCache.refreshStaleItems()
      console.log('Stale items refreshed')
    } catch (error) {
      console.error('Failed to refresh stale items:', error)
    }
  }

  startPeriodicWarming(): void {
    // Initial warm
    this.warmCache()

    // Periodic warming
    setInterval(() => {
      const now = Date.now()
      if (now - this.lastWarmTime > this.warmInterval) {
        this.warmCache()
      }
    }, 5 * 60 * 1000) // Check every 5 minutes

    // Refresh stale items every 10 minutes
    setInterval(() => {
      this.refreshStaleItems()
    }, 10 * 60 * 1000)
  }

  getStatus() {
    return {
      isWarming: this.isWarming,
      lastWarmTime: this.lastWarmTime,
      nextWarmTime: this.lastWarmTime + this.warmInterval
    }
  }
}

export const cacheWarmer = new CacheWarmer()

// Start periodic warming in server environment
if (typeof window === 'undefined') {
  cacheWarmer.startPeriodicWarming()
}
