'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { EmptyState } from '@/components/ui/emptyState'
import { ProjectCard } from '@/components/ui/projectCard'
import { ProjectCardSkeleton } from '@/components/ui/projectCardSkeleton'
import { ProjectWithOwner } from '@/types/project'
import { FolderX, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectWithOwner[]>([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
    })

    // 초기 데이터 로드
    useEffect(() => {
        fetchProjects(0)
    }, [])

    // 무한 스크롤
    useEffect(() => {
        if (inView && hasMore && !isLoading && !isLoadingMore) {
            fetchProjects(page + 1)
        }
    }, [inView, hasMore, isLoading, isLoadingMore, page])

    const fetchProjects = async (pageNum: number) => {
        try {
            if (pageNum === 0) {
                setIsLoading(true)
            } else {
                setIsLoadingMore(true)
            }

            const response = await fetch(`/api/projects?page=${pageNum}`)
            const data = await response.json()

            if (response.ok) {
                if (pageNum === 0) {
                    setProjects(data.projects)
                } else {
                    setProjects(prev => [...prev, ...data.projects])
                }
                setHasMore(data.hasMore)
                setPage(pageNum)
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error)
        } finally {
            setIsLoading(false)
            setIsLoadingMore(false)
        }
    }

    if (isLoading) {
        return (
            <PageLayout>
                <Container size="lg" className="py-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">프로젝트 무덤</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProjectCardSkeleton key={i} />
                        ))}
                    </div>
                </Container>
            </PageLayout>
        )
    }

    if (projects.length === 0) {
        return (
            <PageLayout>
                <Container size="lg" className="py-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">프로젝트 무덤</h1>
                    <EmptyState
                        icon={FolderX}
                        title="프로젝트가 없습니다"
                        description="사라진 오픈소스 프로젝트를 발견하면 등록해주세요."
                    />
                </Container>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">프로젝트 무덤</h1>
                        <p className="text-sm text-gray-500">총 {projects.length}개의 프로젝트</p>
                    </div>
                    <Link href="/projects/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            프로젝트 등록
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map(project => (
                        <Link key={project.id} href={`/projects/${project.id}`}>
                            <ProjectCard
                                id={project.id}
                                title={project.title}
                                description={project.description}
                                githubUrl={project.github_url || ''}
                                demoUrl={project.demo_url || ''}
                                startDate={project.start_date}
                                deathDate={project.death_date}
                                deathReasons={project.death_reasons}
                                deathReasonOther={project.death_reason_other || ''}
                                techStack={project.tech_stack}
                                whatAchieved={project.what_achieved || ''}
                                whatFailed={project.what_failed || ''}
                                lessonsLearned={project.lessons_learned}
                                detailedStory={project.detailed_story || ''}
                                screenshots={project.screenshots}
                                isAnonymous={project.is_anonymous}
                                allowAdoption={project.allow_adoption}
                                status={project.status}
                                createdAt={project.created_at}
                                updatedAt={project.updated_at}
                                viewCount={project.view_count}
                                likeCount={project.like_count}
                                owner={{
                                    id: project.profiles.id,
                                    userName: project.profiles.username,
                                    avatarUrl:
                                        project.profiles.avatar_url || '/placeholder-avatar.png',
                                }}
                            />
                        </Link>
                    ))}
                </div>

                {/* 무한 스크롤 트리거 */}
                {hasMore && (
                    <div ref={ref} className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {isLoadingMore &&
                                Array.from({ length: 4 }).map((_, i) => (
                                    <ProjectCardSkeleton key={i} />
                                ))}
                        </div>
                    </div>
                )}

                {!hasMore && projects.length > 0 && (
                    <div className="mt-12 text-center text-gray-500">
                        <p>모든 프로젝트를 확인했습니다.</p>
                    </div>
                )}
            </Container>
        </PageLayout>
    )
}
