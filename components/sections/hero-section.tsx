import { Button } from '@/components/ui/button'
import { AlertCircle, User } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-gray-800 bg-clip-text text-transparent">
          404 Grave
        </h1>
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mb-6">
        모든 무덤에는 이야기가 있다.<br />
        당신의 실패한 프로젝트 이야기를 기록하고 공유하세요.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="gap-2">
          <Link href="/login">
            <User className="h-4 w-4" />
            지금 시작하기
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <a href="#features">
            <AlertCircle className="h-4 w-4" />
            더 알아보기
          </a>
        </Button>
      </div>
    </div>
  )
}
