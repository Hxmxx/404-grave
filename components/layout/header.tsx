import { Button } from '@/components/ui/button'
import { TombstoneIcon, MoonIcon } from '@/components/ui/grave-icons'
import { User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm shadow-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <TombstoneIcon className="h-8 w-8 text-primary" />
              <MoonIcon className="h-4 w-4 text-accent absolute -top-1 -right-1" />
            </div>
            <h1 className="text-xl font-bold grave-text-gradient">404 Grave</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="grave-glow">
              <Link href="/login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                로그인
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
