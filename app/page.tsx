import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { ProjectCard } from '@/components/ui/projectCard'
import { TombstoneIcon } from '@/components/ui/tombstoneIcon'
import { EmptyState } from '@/components/ui/emptyState'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, Search, AlertCircle } from 'lucide-react'

const Home = () => {
    // 예제 프로젝트 데이터
    const exampleProjects = [
        {
            id: '1',
            title: 'React Native E-commerce App',
            description:
                '모바일 쇼핑몰 앱 개발 프로젝트. 결제 시스템 통합 중 예산 부족으로 중단되었습니다.',
            status: 'dead' as const,
            createdAt: '2023-01-15',
            owner: {
                id: 'user1',
                username: 'dev_kim',
                avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
            },
            thumbnail: 'https://avatars.githubusercontent.com/u/2?v=4',
        },
        {
            id: '2',
            title: 'Node.js Chat Server',
            description: '실시간 채팅 서버 구축 프로젝트. WebSocket을 활용한 멀티룸 채팅 시스템.',
            status: 'alive' as const,
            createdAt: '2023-03-20',
            owner: {
                id: 'user2',
                username: 'backend_lee',
                avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
            },
        },
        {
            id: '3',
            title: 'Vue.js Admin Dashboard',
            description: '관리자 대시보드 프로젝트. 차트와 테이블을 활용한 데이터 시각화.',
            status: 'dead' as const,
            createdAt: '2023-02-10',
            owner: {
                id: 'user3',
                username: 'frontend_park',
                avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
            },
        },
    ]

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

                {/* TombstoneIcon 예제 */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">TombstoneIcon 예제</h2>
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <div className="flex items-center justify-center gap-8 flex-wrap">
                            <div className="text-center">
                                <TombstoneIcon className="w-16 h-16 text-red-600 mb-2" />
                                <p className="text-sm text-gray-600">빨간색</p>
                            </div>
                            <div className="text-center">
                                <TombstoneIcon className="w-16 h-16 text-gray-600 mb-2" />
                                <p className="text-sm text-gray-600">회색</p>
                            </div>
                            <div className="text-center">
                                <TombstoneIcon className="w-16 h-16 text-blue-600 mb-2" />
                                <p className="text-sm text-gray-600">파란색</p>
                            </div>
                            <div className="text-center">
                                <TombstoneIcon className="w-16 h-16 text-purple-600 mb-2" />
                                <p className="text-sm text-gray-600">보라색</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EmptyState 예제 */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">EmptyState 예제</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <EmptyState
                                icon={Search}
                                title="검색 결과 없음"
                                description="검색어에 맞는 프로젝트를 찾을 수 없습니다."
                            />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <EmptyState
                                icon={FileText}
                                title="프로젝트 없음"
                                description="등록된 프로젝트가 없습니다."
                            />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <EmptyState
                                useTombstone={true}
                                title="죽은 프로젝트"
                                description="이 프로젝트는 더 이상 존재하지 않습니다."
                            />
                        </div>
                    </div>
                </div>

                {/* Skeleton UI 예제 */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Skeleton UI 예제</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <Skeleton className="h-48 w-full" />
                                <div className="p-4 space-y-3">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <div className="flex gap-2 mt-4">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 프로젝트 카드 예제 */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">ProjectCard 예제</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exampleProjects.map(project => (
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                title={project.title}
                                description={project.description}
                                status={project.status}
                                createdAt={project.createdAt}
                                owner={project.owner}
                                thumbnail={project.thumbnail}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </PageLayout>
    )
}

export default Home
