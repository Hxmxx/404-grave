import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'

const Home = () => {
    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404 Grave</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        모든 실패한 프로젝트에는 이야기가 있습니다. 당신의 실패를 기록하고,
                        다른 사람의 경험에서 배우세요.
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Container 예제</h2>
                        <p className="text-gray-600">
                            이 내용은 Container 컴포넌트로 감싸져 있어 자동으로 중앙 정렬되고
                            적절한 너비를 유지합니다.
                        </p>
                    </div>
                </div>
            </Container>
        </PageLayout>
    )
}

export default Home
