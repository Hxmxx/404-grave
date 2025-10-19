import Link from 'next/link'
import { TombstoneIcon, MoonIcon, GhostIcon } from '@/components/ui/grave-icons'
import { Github, Heart, Coffee } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <TombstoneIcon className="h-8 w-8 text-primary" />
                <MoonIcon className="h-4 w-4 text-accent absolute -top-1 -right-1" />
              </div>
              <h3 className="text-xl font-bold grave-text-gradient">404 Grave</h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              모든 무덤에는 이야기가 있다. 당신의 실패한 프로젝트 이야기를 기록하고 공유하세요.
              <span className="text-accent font-medium"> 실패는 끝이 아니라 새로운 시작의 무덤입니다.</span>
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GhostIcon className="h-4 w-4" />
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>and</span>
              <Coffee className="h-4 w-4 text-yellow-500" />
              <span>for developers</span>
            </div>
          </div>

          {/* 링크 섹션 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">묘지 탐색</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-accent transition-colors">
                  프로젝트 목록
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-accent transition-colors">
                  카테고리
                </Link>
              </li>
              <li>
                <Link href="/memorial" className="hover:text-accent transition-colors">
                  명예의 전당
                </Link>
              </li>
            </ul>
          </div>

          {/* 커뮤니티 섹션 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">커뮤니티</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-accent transition-colors">
                  기여하기
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/Hxmxx/404-grave" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  문의
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-border/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} 404 Grave. 모든 권리 보유.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                이용약관
              </Link>
              <Link href="/cookies" className="hover:text-accent transition-colors">
                쿠키 정책
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
