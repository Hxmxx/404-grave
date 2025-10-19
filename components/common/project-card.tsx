import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  TombstoneIcon, 
  CoffinIcon, 
  PhoenixIcon, 
  SkullIcon, 
  GhostIcon,
  StarIcon 
} from '@/components/ui/grave-icons'
import { 
  Github, 
  Star, 
  GitFork, 
  Calendar, 
  ExternalLink,
  Eye,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ProjectData {
  id: string
  name: string
  description: string
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
  archived: boolean
  disabled: boolean
  private: boolean
  topics: string[]
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  failure_reason?: string
  category?: string
  views?: number
  likes?: number
}

interface ProjectCardProps {
  project: ProjectData
  variant?: 'default' | 'compact' | 'featured'
  showActions?: boolean
  className?: string
}

export default function ProjectCard({ 
  project, 
  variant = 'default',
  showActions = true,
  className = ''
}: ProjectCardProps) {
  const getStatusIcon = () => {
    if (project.archived) return <CoffinIcon className="h-5 w-5 text-gray-500" />
    if (project.disabled) return <SkullIcon className="h-5 w-5 text-red-500" />
    if (project.stargazers_count > 1000) return <PhoenixIcon className="h-5 w-5 text-green-500" />
    if (project.stargazers_count > 100) return <StarIcon className="h-5 w-5 text-yellow-500" />
    return <TombstoneIcon className="h-5 w-5 text-primary" />
  }

  const getStatusText = () => {
    if (project.archived) return '보관됨'
    if (project.disabled) return '비활성화'
    if (project.stargazers_count > 1000) return '인기 프로젝트'
    if (project.stargazers_count > 100) return '주목받는 프로젝트'
    return '일반 프로젝트'
  }

  const getStatusColor = () => {
    if (project.archived) return 'bg-gray-500/20 text-gray-500'
    if (project.disabled) return 'bg-red-500/20 text-red-500'
    if (project.stargazers_count > 1000) return 'bg-green-500/20 text-green-500'
    if (project.stargazers_count > 100) return 'bg-yellow-500/20 text-yellow-500'
    return 'bg-primary/20 text-primary'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (variant === 'compact') {
    return (
      <div className={cn(
        'grave-card rounded-lg p-4 hover:grave-glow transition-all duration-300',
        className
      )}>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={project.owner.avatar_url} alt={project.owner.login} />
            <AvatarFallback>
              <Github className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{project.name}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {project.description || '설명이 없는 무덤입니다.'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="h-3 w-3" />
            <span>{project.stargazers_count}</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className={cn(
        'grave-card rounded-xl p-6 hover:grave-glow transition-all duration-300 border-2 border-primary/20',
        className
      )}>
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={project.owner.avatar_url} alt={project.owner.login} />
            <AvatarFallback>
              <Github className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <Badge className={cn('text-xs', getStatusColor())}>
                {getStatusIcon()}
                <span className="ml-1">{getStatusText()}</span>
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              {project.description || '설명이 없는 무덤입니다.'}
            </p>
            {project.failure_reason && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-3">
                <p className="text-destructive text-sm font-medium">사망 원인:</p>
                <p className="text-destructive text-sm">{project.failure_reason}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-lg font-bold text-yellow-500">{project.stargazers_count}</span>
            </div>
            <p className="text-xs text-muted-foreground">별점</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <GitFork className="h-4 w-4 text-blue-500" />
              <span className="text-lg font-bold text-blue-500">{project.forks_count}</span>
            </div>
            <p className="text-xs text-muted-foreground">포크</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span className="text-lg font-bold text-purple-500">
                {formatDate(project.created_at)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">생성일</p>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2">
            <Button asChild className="flex-1 gap-2" size="sm">
              <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub 보기
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Heart className="h-4 w-4" />
              {project.likes || 0}
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn(
      'grave-card rounded-lg p-6 hover:grave-glow transition-all duration-300',
      className
    )}>
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={project.owner.avatar_url} alt={project.owner.login} />
          <AvatarFallback>
            <Github className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <Badge className={cn('text-xs', getStatusColor())}>
              {getStatusIcon()}
              <span className="ml-1">{getStatusText()}</span>
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-3">
            {project.description || '설명이 없는 무덤입니다.'}
          </p>
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {project.topics.slice(0, 3).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {project.topics.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.topics.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-500">{project.stargazers_count}</span>
          </div>
          <p className="text-xs text-muted-foreground">별점</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <GitFork className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-bold text-blue-500">{project.forks_count}</span>
          </div>
          <p className="text-xs text-muted-foreground">포크</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Calendar className="h-4 w-4 text-green-500" />
            <span className="text-sm font-bold text-green-500">
              {formatDate(project.created_at)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">생성일</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Eye className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-bold text-purple-500">{project.views || 0}</span>
          </div>
          <p className="text-xs text-muted-foreground">조회수</p>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2">
          <Button asChild className="flex-1 gap-2" size="sm">
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              GitHub 보기
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Heart className="h-4 w-4" />
            {project.likes || 0}
          </Button>
        </div>
      )}
    </div>
  )
}
