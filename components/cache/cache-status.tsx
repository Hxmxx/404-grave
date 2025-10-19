'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, Database, Clock, Zap } from 'lucide-react'

interface CacheStats {
  repo: {
    hits: number
    misses: number
    size: number
    hitRate: number
  }
  rateLimit: {
    hits: number
    misses: number
    size: number
    hitRate: number
  }
}

interface CacheStatusProps {
  className?: string
}

export default function CacheStatus({ className = '' }: CacheStatusProps) {
  const [stats, setStats] = useState<CacheStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [timeUntilReset, setTimeUntilReset] = useState(0)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/cache/stats')
      const data = await response.json()
      setStats(data.cache)
      setTimeUntilReset(data.rateLimit.timeUntilReset)
    } catch (error) {
      console.error('Failed to fetch cache stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearCache = async () => {
    setLoading(true)
    try {
      await fetch('/api/cache/stats', { method: 'DELETE' })
      await fetchStats()
    } catch (error) {
      console.error('Failed to clear cache:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (!stats) {
    return (
      <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 border ${className}`}>
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span className="text-sm">캐시 상태 로딩 중...</span>
        </div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) return `${hours}시간 ${minutes}분`
    if (minutes > 0) return `${minutes}분 ${secs}초`
    return `${secs}초`
  }

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 border ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span className="text-sm font-medium">캐시 상태</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={fetchStats}
            disabled={loading}
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={clearCache}
            disabled={loading}
          >
            초기화
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Repository Cache Stats */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>레포지토리 캐시</span>
            <span className="text-gray-500">{stats.repo.size}개 항목</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Hit Rate: {(stats.repo.hitRate * 100).toFixed(1)}%</span>
            <span>•</span>
            <span>Hits: {stats.repo.hits}</span>
            <span>•</span>
            <span>Misses: {stats.repo.misses}</span>
          </div>
        </div>

        {/* Rate Limit Status */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>API 제한</span>
            <div className="flex items-center gap-1">
              {timeUntilReset > 0 ? (
                <>
                  <Clock className="h-3 w-3" />
                  <span className="text-xs text-gray-500">
                    {formatTime(timeUntilReset)} 후 재설정
                  </span>
                </>
              ) : (
                <>
                  <Zap className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">사용 가능</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
