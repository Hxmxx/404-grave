import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { EmptyState } from '@/components/ui/emptyState'
import { UserX } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <EmptyState
                    icon={UserX}
                    title="사용자를 찾을 수 없습니다"
                    description="요청하신 사용자가 존재하지 않습니다."
                    useTombstone
                />
                <div className="flex justify-center mt-6">
                    <Link href="/">
                        <Button>홈으로 돌아가기</Button>
                    </Link>
                </div>
            </Container>
        </PageLayout>
    )
}
