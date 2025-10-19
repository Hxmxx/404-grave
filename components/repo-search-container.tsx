'use client'

import { useState } from 'react'
import RepoSearch from './repo-search'
import RepoDisplay from './repo-display'
import { RepoData } from '@/types/repo'
import { TombstoneIcon } from '@/components/ui/grave-icons'

interface RepoSearchContainerProps {
  defaultRepoData: RepoData
}

export default function RepoSearchContainer({ defaultRepoData }: RepoSearchContainerProps) {
  const [currentRepo, setCurrentRepo] = useState<RepoData>(defaultRepoData)

  const handleRepoFound = (repoData: RepoData) => {
    setCurrentRepo(repoData)
  }

  return (
    <>
      {/* 레포지토리 검색 섹션 */}
      <div className="mb-12 w-full max-w-4xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <TombstoneIcon className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-center grave-text-gradient">GitHub 레포지토리 검색</h2>
        </div>
        <RepoSearch onRepoFound={handleRepoFound} />
      </div>

      {/* 현재 레포지토리 표시 */}
      <RepoDisplay repoData={currentRepo} />
    </>
  )
}
