import { Button } from '@/components/ui/button'
import { AlertCircle, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h1 className="text-xl font-bold">404 Grave</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
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
