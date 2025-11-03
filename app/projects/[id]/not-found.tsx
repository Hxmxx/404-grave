import { EmptyState } from '@/components/ui/emptyState'
import { FileX } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <>
            <EmptyState
                icon={FileX}
                title="프로젝트를 찾을 수 없습니다"
                description="요청하신 프로젝트가 존재하지 않거나 삭제되었습니다."
                useTombstone
            />
            <div className="flex justify-center mt-6">
                <Link href="/projects">
                    <Button>프로젝트 목록으로 돌아가기</Button>
                </Link>
            </div>
        </>
    )
}
