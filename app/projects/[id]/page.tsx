'use client'

import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { use } from 'react'
import { EmptyState } from '@/components/ui/emptyState'
import { FileText } from 'lucide-react'

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">프로젝트 상세</h1>
                <EmptyState
                    icon={FileText}
                    title="프로젝트를 찾을 수 없습니다"
                    description={`ID: ${id}에 해당하는 프로젝트가 존재하지 않습니다.`}
                />
            </Container>
        </PageLayout>
    )
}
