export interface CacheConfig {
  ttl: number // Time to live in seconds
  maxSize: number // Maximum number of items in cache
  refreshThreshold: number // Refresh when remaining TTL is below this threshold
}

export interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
  hits: number
}

export interface CacheStats {
  hits: number
  misses: number
  size: number
  hitRate: number
}

export interface RepoCacheKey {
  owner: string
  repo: string
}

export const CACHE_CONFIGS = {
  REPO_DATA: {
    ttl: 3600, // 1 hour
    maxSize: 1000,
    refreshThreshold: 300 // 5 minutes
  },
  RATE_LIMIT: {
    ttl: 3600, // 1 hour
    maxSize: 100,
    refreshThreshold: 60 // 1 minute
  },
  USER_PROFILE: {
    ttl: 1800, // 30 minutes
    maxSize: 500,
    refreshThreshold: 300 // 5 minutes
  }
} as const
