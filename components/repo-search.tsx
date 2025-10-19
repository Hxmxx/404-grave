'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github, Search, Loader2, AlertCircle } from 'lucide-react'
import { RepoData } from '@/types/repo'

interface RepoSearchProps {
  onRepoFound: (repoData: RepoData) => void
}

export default function RepoSearch({ onRepoFound }: RepoSearchProps) {
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!owner.trim() || !repo.trim()) {
      setError('Owner와 Repository 이름을 모두 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/github/repo?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`)
      
      if (!response.ok) {
        throw new Error('레포지토리를 찾을 수 없습니다.')
      }

      const data = await response.json()
      onRepoFound(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Owner (예: vercel)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="flex-1"
          />
          <Input
            type="text"
            placeholder="Repository (예: next.js)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="flex-1"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          {loading ? '검색 중...' : '레포지토리 검색'}
        </Button>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  )
}
