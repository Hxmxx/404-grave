'use client'

import { useState } from 'react'
import RepoSearch from './repo-search'
import RepoDisplay from './repo-display'
import { RepoData } from '@/types/repo'

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
        <h2 className="text-2xl font-bold text-center mb-6">GitHub 레포지토리 검색</h2>
        <RepoSearch onRepoFound={handleRepoFound} />
      </div>

      {/* 현재 레포지토리 표시 */}
      <RepoDisplay repoData={currentRepo} />
    </>
  )
}
