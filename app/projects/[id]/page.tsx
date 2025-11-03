import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { Calendar, Heart, Share2, Github, ExternalLink, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { differenceInDays } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: project, error } = await supabase
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
        .eq('id', id)
        .single()

    if (error || !project) {
        return notFound()
    }

    // 생존 기간 계산
    const survivalDays = differenceInDays(
        new Date(project.death_date),
        new Date(project.start_date),
    )
    let survivalText = ''
    if (survivalDays >= 365) {
        const years = Math.floor(survivalDays / 365)
        survivalText = `${years}년`
    } else if (survivalDays >= 30) {
        const months = Math.floor(survivalDays / 30)
        survivalText = `${months}개월`
    } else {
        survivalText = `${survivalDays}일`
    }

    return (
        <>
            {/* 헤더 섹션 */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Badge variant={project.status === 'adopted' ? 'default' : 'destructive'}>
                        {project.status === 'adopted'
                            ? '입양됨'
                            : project.status === 'archived'
                              ? '보관됨'
                              : '사망'}
                    </Badge>
                    {project.allow_adoption && project.status === 'active' && (
                        <Badge variant="outline">입양 가능</Badge>
                    )}
                    {project.is_anonymous && <Badge variant="outline">익명</Badge>}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{project.description}</p>

                {/* 작성자 정보 */}
                {!project.is_anonymous && project.profiles && (
                    <div className="flex items-center gap-3 mb-6">
                        <Image
                            src={project.profiles.avatar_url || '/placeholder-avatar.png'}
                            alt={project.profiles.username}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <Link
                                href={`/profile/${project.profiles.username}`}
                                className="font-medium text-gray-900 hover:underline"
                            >
                                {project.profiles.full_name || project.profiles.username}
                            </Link>
                            <p className="text-sm text-gray-500">
                                {new Date(project.created_at).toLocaleDateString('ko-KR')} 등록
                            </p>
                        </div>
                    </div>
                )}

                {/* 액션 버튼 */}
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        공감 {project.like_count}
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        공유
                    </Button>
                    {project.allow_adoption && project.status === 'active' && (
                        <Button size="sm">입양 신청</Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 메인 컨텐츠 */}
                <div className="lg:col-span-2 space-y-8">
                    {/* 기본 정보 */}
                    <section className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            프로젝트 정보
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">시작일</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(project.start_date).toLocaleDateString('ko-KR')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">사망일</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(project.death_date).toLocaleDateString('ko-KR')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">생존 기간</p>
                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {survivalText}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">조회수</p>
                                <p className="font-medium text-gray-900">{project.view_count}</p>
                            </div>
                        </div>

                        {/* 링크 */}
                        {(project.github_url || project.demo_url) && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                    {project.github_url && (
                                        <Link
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button variant="outline" size="sm">
                                                <Github className="w-4 h-4 mr-2" />
                                                GitHub
                                            </Button>
                                        </Link>
                                    )}
                                    {project.demo_url && (
                                        <Link
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button variant="outline" size="sm">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                데모
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* 사망 원인 */}
                    <section className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">사망 원인</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.death_reasons?.map((reason: string) => (
                                <Badge key={reason} variant="outline">
                                    {reason}
                                </Badge>
                            ))}
                        </div>
                        {project.death_reason_other && (
                            <p className="mt-4 text-gray-700 bg-gray-50 p-4 rounded-md">
                                {project.death_reason_other}
                            </p>
                        )}
                    </section>

                    {/* 성과 및 교훈 */}
                    {(project.what_achieved ||
                        project.what_failed ||
                        project.lessons_learned?.length > 0) && (
                        <section className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">성과 및 교훈</h2>

                            {project.what_achieved && (
                                <div className="mb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        ✅ 달성한 것
                                    </h3>
                                    <p className="text-gray-700 whitespace-pre-wrap">
                                        {project.what_achieved}
                                    </p>
                                </div>
                            )}

                            {project.what_failed && (
                                <div className="mb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        ❌ 달성하지 못한 것
                                    </h3>
                                    <p className="text-gray-700 whitespace-pre-wrap">
                                        {project.what_failed}
                                    </p>
                                </div>
                            )}

                            {project.lessons_learned && project.lessons_learned.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        💡 배운 교훈
                                    </h3>
                                    <ul className="space-y-2">
                                        {project.lessons_learned.map(
                                            (lesson: string, index: number) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-gray-400 mt-1">•</span>
                                                    <span className="text-gray-700">{lesson}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}

                    {/* 상세 스토리 */}
                    {project.detailed_story && (
                        <section className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">상세 스토리</h2>
                            <div className="prose prose-gray max-w-none">
                                <ReactMarkdown>{project.detailed_story}</ReactMarkdown>
                            </div>
                        </section>
                    )}
                </div>

                {/* 사이드바 */}
                <div className="space-y-6">
                    {/* 기술 스택 */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                        <section className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">기술 스택</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.map((tech: string) => (
                                    <Badge key={tech} variant="outline">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 스크린샷 */}
                    {project.screenshots && project.screenshots.length > 0 && (
                        <section className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">스크린샷</h3>
                            <div className="space-y-4">
                                {project.screenshots.map((screenshot: string, index: number) => (
                                    <div
                                        key={index}
                                        className="relative aspect-video rounded-lg overflow-hidden"
                                    >
                                        <Image
                                            src={screenshot}
                                            alt={`${project.title} 스크린샷 ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    )
}
