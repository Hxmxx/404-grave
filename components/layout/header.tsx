import { Button } from '../ui/button'
import Link from 'next/link'
import { User, Bell } from 'lucide-react'

const Header = () => {
    return (
        <header className="bg-white/60 backdrop-blur-sm shadow-sm border-b flex flex-row justify-between items-center px-16 py-2">
            <h1 className="text-xl font-bold">404 Grave</h1>
            <div className="flex flex-row gap-2">
                <Button variant="ghost" asChild>
                    <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" asChild>
                    <Link href="/login" className="flex items-center gap-2">
                        로그인
                    </Link>
                </Button>
            </div>
        </header>
    )
}

export default Header
