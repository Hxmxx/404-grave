'use client'

import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { EmptyState } from '@/components/ui/emptyState'
import { FolderX } from 'lucide-react'

export default function ProjectsPage() {
    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">프로젝트</h1>
                <EmptyState
                    icon={FolderX}
                    title="프로젝트가 없습니다"
                    description="사라진 오픈소스 프로젝트를 발견하면 등록해주세요."
                />
            </Container>
        </PageLayout>
    )
}

