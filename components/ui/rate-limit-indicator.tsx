'use client'

import { AlertCircle, Clock, Zap } from 'lucide-react'

interface RateLimitInfo {
  remaining: number | null
  reset: number | null
  limit: number | null
}

interface RateLimitIndicatorProps {
  rateLimit: RateLimitInfo
}

export default function RateLimitIndicator({ rateLimit }: RateLimitIndicatorProps) {
  if (!rateLimit.remaining || !rateLimit.limit) {
    return null
  }

  const percentage = (rateLimit.remaining / rateLimit.limit) * 100
  const resetTime = rateLimit.reset ? new Date(rateLimit.reset * 1000) : null

  const getStatusColor = () => {
    if (percentage > 50) return 'text-green-600'
    if (percentage > 20) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = () => {
    if (percentage > 50) return <Zap className="h-4 w-4" />
    if (percentage > 20) return <Clock className="h-4 w-4" />
    return <AlertCircle className="h-4 w-4" />
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-2">
        {getStatusIcon()}
        <span className="text-sm font-medium">GitHub API 상태</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>남은 요청</span>
          <span className={getStatusColor()}>
            {rateLimit.remaining} / {rateLimit.limit}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              percentage > 50 ? 'bg-green-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {resetTime && (
          <div className="text-xs text-gray-500 text-center">
            {rateLimit.remaining === 0 ? '재설정 시간' : '다음 재설정'}: {resetTime.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}
