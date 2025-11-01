import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { createClient } from '@/lib/supabase/server'

export default async function DiagnosisPage() {
    const supabase = await createClient()
    const { data: projects, error } = await supabase
        .from('projects')
        .select('id, title, description, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                    사망진단서 작성
                </h1>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        최근 무덤 데이터 (샘플 5개)
                    </h2>
                    {error && (
                        <div className="text-sm text-red-600">
                            데이터 로드 실패: {error.message}
                        </div>
                    )}
                    {!error && (
                        <ul className="space-y-3">
                            {(projects ?? []).map(p => (
                                <li
                                    key={p.id}
                                    className="rounded-md border border-gray-200 p-4 bg-white"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">{p.title}</span>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                            {p.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {p.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Container>
        </PageLayout>
    )
}
