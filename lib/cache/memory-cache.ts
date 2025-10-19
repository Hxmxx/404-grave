import { CacheConfig, CacheItem, CacheStats, RepoCacheKey } from './types'

export class MemoryCache<T> {
  private cache = new Map<string, CacheItem<T>>()
  private stats = { hits: 0, misses: 0 }
  private config: CacheConfig

  constructor(config: CacheConfig) {
    this.config = config
  }

  private generateKey(key: RepoCacheKey | string): string {
    if (typeof key === 'string') return key
    return `${key.owner}:${key.repo}`
  }

  private isExpired(item: CacheItem<T>): boolean {
    return Date.now() - item.timestamp > item.ttl * 1000
  }

  private needsRefresh(item: CacheItem<T>): boolean {
    const remainingTtl = item.ttl - (Date.now() - item.timestamp) / 1000
    return remainingTtl < this.config.refreshThreshold
  }

  get(key: RepoCacheKey | string): T | null {
    const cacheKey = this.generateKey(key)
    const item = this.cache.get(cacheKey)

    if (!item) {
      this.stats.misses++
      return null
    }

    if (this.isExpired(item)) {
      this.cache.delete(cacheKey)
      this.stats.misses++
      return null
    }

    // Update hit count
    item.hits++
    this.stats.hits++
    return item.data
  }

  set(key: RepoCacheKey | string, data: T, customTtl?: number): void {
    const cacheKey = this.generateKey(key)
    const ttl = customTtl || this.config.ttl

    // Remove oldest items if cache is full
    if (this.cache.size >= this.config.maxSize) {
      this.evictOldest()
    }

    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl,
      hits: 0
    })
  }

  private evictOldest(): void {
    let oldestKey = ''
    let oldestTime = Date.now()

    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  delete(key: RepoCacheKey | string): boolean {
    const cacheKey = this.generateKey(key)
    return this.cache.delete(cacheKey)
  }

  clear(): void {
    this.cache.clear()
    this.stats = { hits: 0, misses: 0 }
  }

  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses
    return {
      ...this.stats,
      size: this.cache.size,
      hitRate: total > 0 ? this.stats.hits / total : 0
    }
  }

  // Get items that need refresh (for background refresh)
  getItemsNeedingRefresh(): Array<{ key: string; item: CacheItem<T> }> {
    const items: Array<{ key: string; item: CacheItem<T> }> = []
    
    for (const [key, item] of this.cache.entries()) {
      if (!this.isExpired(item) && this.needsRefresh(item)) {
        items.push({ key, item })
      }
    }
    
    return items
  }

  // Clean up expired items
  cleanup(): number {
    let cleaned = 0
    const now = Date.now()
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl * 1000) {
        this.cache.delete(key)
        cleaned++
      }
    }
    
    return cleaned
  }
}
