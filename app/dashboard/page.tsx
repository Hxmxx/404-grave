'use client'

import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { EmptyState } from '@/components/ui/emptyState'
import { BarChart3 } from 'lucide-react'

export default function DashboardPage() {
    const { isLoggedIn, loading } = useAuth()

    if (!loading && !isLoggedIn) {
        redirect('/auth/login')
    }

    if (loading) {
        return (
            <PageLayout>
                <Container size="lg" className="py-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </Container>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>
                <EmptyState
                    icon={BarChart3}
                    title="대시보드"
                    description="프로젝트 통계와 활동 내역이 여기에 표시됩니다."
                />
            </Container>
        </PageLayout>
    )
}

