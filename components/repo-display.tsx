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

interface RepoDisplayProps {
  repoData: RepoData
}

export default function RepoDisplay({ repoData }: RepoDisplayProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-2xl w-full border">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage 
              src={repoData.owner.avatar_url} 
              alt={repoData.owner.login} 
            />
            <AvatarFallback>
              <Github className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-3xl font-bold">{repoData.name}</h2>
            <p className="text-gray-600">{repoData.description}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{repoData.stargazers_count}</span>
            </div>
            <p className="text-sm text-gray-500">Stars</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <GitFork className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{repoData.forks_count}</span>
            </div>
            <p className="text-sm text-gray-500">Forks</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Code className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{repoData.open_issues_count}</span>
            </div>
            <p className="text-sm text-gray-500">Issues</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-2xl font-bold">{repoData.language || 'N/A'}</span>
            </div>
            <p className="text-sm text-gray-500">Language</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created: {new Date(repoData.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Updated: {new Date(repoData.updated_at).toLocaleDateString()}</span>
          </div>
        </div>

        <Button 
          className="mt-6 gap-2" 
          asChild
        >
          <a href={repoData.html_url} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            GitHub에서 보기
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
      
      {/* Rate Limit 표시기 */}
      {repoData.rateLimit && (
        <div className="mt-6">
          <RateLimitIndicator rateLimit={repoData.rateLimit} />
        </div>
      )}
    </div>
  )
}
