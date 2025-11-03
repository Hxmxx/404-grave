'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProjectCard } from '@/components/ui/projectCard'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/emptyState'
import { ProjectWithOwner } from '@/types/project'
import { Search, User, Folder } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResults {
    projects: ProjectWithOwner[]
    users: Array<{
        id: string
        username: string
        full_name: string | null
        avatar_url: string | null
        bio: string | null
    }>
}

function SearchContent() {
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const [results, setResults] = useState<SearchResults>({ projects: [], users: [] })
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'users'>('all')

    useEffect(() => {
        if (query) {
            fetchSearchResults(query)
        } else {
            setIsLoading(false)
        }
    }, [query])

    const fetchSearchResults = async (searchQuery: string) => {
        setIsLoading(true)
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
            const data = await response.json()

            if (response.ok) {
                setResults(data)
            }
        } catch (error) {
            console.error('Search error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const totalResults = results.projects.length + results.users.length

    const filteredProjects = activeTab === 'users' ? [] : results.projects
    const filteredUsers = activeTab === 'projects' ? [] : results.users

    if (isLoading) {
        return (
            <>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">검색 중...</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <Skeleton className="h-[150px] w-full" />
                            <div className="p-4 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    if (!query) {
        return (
            <>
                <EmptyState
                    icon={Search}
                    title="검색어를 입력하세요"
                    description="프로젝트나 사용자를 검색해보세요."
                />
            </>
        )
    }

    if (totalResults === 0) {
        return (
            <>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        &quot;{query}&quot; 검색 결과
                    </h1>
                </div>
                <EmptyState
                    icon={Search}
                    title="검색 결과가 없습니다"
                    description="다른 키워드로 검색해보세요."
                    useTombstone
                />
            </>
        )
    }

    return (
        <>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    &quot;{query}&quot; 검색 결과
                </h1>
                <p className="text-gray-600">
                    총 {totalResults}개의 결과 (프로젝트 {results.projects.length}개, 사용자{' '}
                    {results.users.length}명)
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                        activeTab === 'all'
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                >
                    전체 ({totalResults})
                </button>
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                        activeTab === 'projects'
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <Folder className="w-4 h-4 inline mr-1" />
                    프로젝트 ({results.projects.length})
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                        activeTab === 'users'
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <User className="w-4 h-4 inline mr-1" />
                    사용자 ({results.users.length})
                </button>
            </div>

            {/* Results */}
            <div className="space-y-8">
                {/* Projects */}
                {filteredProjects.length > 0 && (
                    <section>
                        {activeTab === 'all' && (
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Folder className="w-5 h-5" />
                                프로젝트 ({results.projects.length})
                            </h2>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map(project => (
                                <Link key={project.id} href={`/projects/${project.id}`}>
                                    <ProjectCard
                                        id={project.id}
                                        title={project.title}
                                        description={project.description}
                                        githubUrl={project.github_url || ''}
                                        demoUrl={project.demo_url || ''}
                                        startDate={project.start_date}
                                        deathDate={project.death_date}
                                        deathReasons={project.death_reasons || []}
                                        deathReasonOther={project.death_reason_other || ''}
                                        techStack={project.tech_stack || []}
                                        whatAchieved={project.what_achieved || ''}
                                        whatFailed={project.what_failed || ''}
                                        lessonsLearned={project.lessons_learned || []}
                                        detailedStory={project.detailed_story || ''}
                                        screenshots={project.screenshots || []}
                                        isAnonymous={project.is_anonymous}
                                        allowAdoption={project.allow_adoption}
                                        status={project.status}
                                        createdAt={project.created_at}
                                        updatedAt={project.updated_at}
                                        viewCount={project.view_count}
                                        likeCount={project.like_count}
                                        owner={{
                                            id: project.profiles?.id || '',
                                            userName: project.profiles?.username || '익명',
                                            avatarUrl:
                                                project.profiles?.avatar_url ||
                                                '/placeholder-avatar.png',
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Users */}
                {filteredUsers.length > 0 && (
                    <section>
                        {activeTab === 'all' && (
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                사용자 ({results.users.length})
                            </h2>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredUsers.map(user => (
                                <Link
                                    key={user.id}
                                    href={`/profile/${user.username}`}
                                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-3">
                                        {user.avatar_url ? (
                                            <Image
                                                src={user.avatar_url}
                                                alt={user.username}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                <User className="w-6 h-6 text-gray-500" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">
                                                {user.full_name || user.username}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate">
                                                @{user.username}
                                            </p>
                                            {user.bio && (
                                                <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                                                    {user.bio}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <div className="space-y-4">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-12 w-full" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <Skeleton className="h-[150px] w-full" />
                                <div className="p-4 space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        >
            <SearchContent />
        </Suspense>
    )
}
