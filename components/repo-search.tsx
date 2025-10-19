'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github, Search, Loader2 } from 'lucide-react'
import { TombstoneIcon, SkullIcon } from '@/components/ui/grave-icons'
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
    <div className="grave-card rounded-xl p-8 w-full max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <TombstoneIcon className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold text-primary">묘지 탐색</h3>
      </div>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Owner (예: vercel)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="flex-1 bg-card/50 border-border/50"
            disabled={loading}
          />
          <Input
            type="text"
            placeholder="Repository (예: next.js)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="flex-1 bg-card/50 border-border/50"
            disabled={loading}
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full gap-2 grave-glow"
          size="lg"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          {loading ? '무덤을 파헤치는 중...' : '레포지토리 검색'}
        </Button>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
            <SkullIcon className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  )
}
