'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import RateLimitIndicator from '@/components/ui/rate-limit-indicator'
import { RepoData } from '@/types/repo'
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Calendar, 
  Code, 
  Users
} from 'lucide-react'
import { TombstoneIcon, CoffinIcon, PhoenixIcon, SkullIcon } from '@/components/ui/grave-icons'

interface RepoDisplayProps {
  repoData: RepoData
}

export default function RepoDisplay({ repoData }: RepoDisplayProps) {
  // 레포지토리 상태에 따른 아이콘 결정
  const getStatusIcon = () => {
    if (repoData.archived) return <CoffinIcon className="h-6 w-6 text-gray-500" />
    if (repoData.disabled) return <SkullIcon className="h-6 w-6 text-red-500" />
    if (repoData.stargazers_count > 1000) return <PhoenixIcon className="h-6 w-6 text-green-500" />
    return <TombstoneIcon className="h-6 w-6 text-primary" />
  }

  const getStatusText = () => {
    if (repoData.archived) return '보관됨 (관에 안치됨)'
    if (repoData.disabled) return '비활성화됨 (사망)'
    if (repoData.stargazers_count > 1000) return '인기 프로젝트 (부활)'
    return '일반 프로젝트'
  }

  return (
    <div className="grave-card rounded-xl p-8 max-w-3xl w-full grave-fade-in">
      <div className="flex flex-col items-center">
        {/* 상태 표시 */}
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <AvatarImage 
              src={repoData.owner.avatar_url} 
              alt={repoData.owner.login} 
            />
            <AvatarFallback>
              <Github className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-4xl font-bold grave-text-gradient mb-2">{repoData.name}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              {repoData.description || '설명이 없는 무덤입니다.'}
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-6 w-6 text-yellow-500" />
              <span className="text-3xl font-bold text-yellow-500">{repoData.stargazers_count}</span>
            </div>
            <p className="text-sm text-muted-foreground">별점</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <GitFork className="h-6 w-6 text-blue-500" />
              <span className="text-3xl font-bold text-blue-500">{repoData.forks_count}</span>
            </div>
            <p className="text-sm text-muted-foreground">포크</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Code className="h-6 w-6 text-green-500" />
              <span className="text-3xl font-bold text-green-500">{repoData.open_issues_count}</span>
            </div>
            <p className="text-sm text-muted-foreground">이슈</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="h-6 w-6 text-purple-500" />
              <span className="text-3xl font-bold text-purple-500">{repoData.language || 'N/A'}</span>
            </div>
            <p className="text-sm text-muted-foreground">언어</p>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>생성: {new Date(repoData.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>수정: {new Date(repoData.updated_at).toLocaleDateString()}</span>
          </div>
        </div>

        <Button 
          className="gap-3 grave-glow" 
          asChild
          size="lg"
        >
          <a href={repoData.html_url} target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
            GitHub에서 보기
            <ExternalLink className="h-5 w-5" />
          </a>
        </Button>
      </div>
      
      {/* Rate Limit 표시기 */}
      {repoData.rateLimit && (
        <div className="mt-8">
          <RateLimitIndicator rateLimit={repoData.rateLimit} />
        </div>
      )}
    </div>
  )
}
