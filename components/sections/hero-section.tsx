import { Button } from '@/components/ui/button'
import { TombstoneIcon, GhostIcon, MoonIcon } from '@/components/ui/grave-icons'
import { User, ArrowDown } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="text-center mb-12 grave-fade-in">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="relative">
          <TombstoneIcon className="h-16 w-16 text-primary grave-pulse" />
          <GhostIcon className="h-6 w-6 text-accent absolute -top-2 -right-2" />
          <MoonIcon className="h-4 w-4 text-muted-foreground absolute -bottom-1 -left-1" />
        </div>
        <h1 className="text-6xl font-bold grave-text-gradient">
          404 Grave
        </h1>
      </div>
      <p className="text-xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
        모든 무덤에는 이야기가 있다.<br />
        <span className="text-accent font-medium">당신의 실패한 프로젝트 이야기</span>를 기록하고 공유하세요.<br />
        <span className="text-sm text-muted-foreground/70">실패는 끝이 아니라 새로운 시작의 무덤입니다.</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="gap-2 grave-glow" size="lg">
          <Link href="/login">
            <User className="h-5 w-5" />
            지금 시작하기
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2" size="lg">
          <a href="#features" className="flex items-center">
            <ArrowDown className="h-5 w-5" />
            더 알아보기
          </a>
        </Button>
      </div>
    </div>
  )
}
