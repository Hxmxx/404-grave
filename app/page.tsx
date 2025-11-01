import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { ProjectCard } from '@/components/ui/projectCard'
import { createClient } from '@/lib/supabase/server'
import { ProjectWithOwner } from '@/types/project'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

const Home = async () => {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
        .from('projects')
        .select(
            `
            *,
            profiles!projects_user_id_fkey (
                id,
                username,
                avatar_url,
                full_name
            )
        `,
        )
        .order('created_at', { ascending: false })
        .limit(3)

    if (error) {
        console.error('Supabase error:', error)
    }

    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <div className="max-w-2xl mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404 Grave</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        모든 실패한 프로젝트에는 이야기가 있습니다. 당신의 실패를 기록하고, 다른
                        사람의 경험에서 배우세요.
                    </p>
                </div>

                {/* 최근 프로젝트 */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">최근 등록된 프로젝트</h2>
                        <Link
                            href="/projects"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            모두 보기 →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects && projects.length > 0
                            ? projects.map((project: ProjectWithOwner) => (
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
                              ))
                            : // 스켈레톤 로딩 상태
                              Array.from({ length: 3 }).map((_, i) => (
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
            </Container>
        </PageLayout>
    )
}

export default Home
