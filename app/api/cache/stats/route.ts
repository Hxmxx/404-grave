import { NextResponse } from 'next/server'
import { githubCache } from '@/lib/cache/github-cache'

export async function GET() {
  try {
    const stats = githubCache.getStats()
    const timeUntilReset = githubCache.getTimeUntilReset()
    
    return NextResponse.json({
      cache: stats,
      rateLimit: {
        timeUntilReset,
        shouldMakeApiCall: githubCache.shouldMakeApiCall()
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Cache stats error:', error)
    return NextResponse.json(
      { error: 'Failed to get cache stats' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    githubCache.clear()
    return NextResponse.json({ message: 'Cache cleared successfully' })
  } catch (error) {
    console.error('Cache clear error:', error)
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}
