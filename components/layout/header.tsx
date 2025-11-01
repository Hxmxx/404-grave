'use client'

import { Button } from '../ui/button'
import Link from 'next/link'
import { Bell, Search, ChevronDown, User, Menu, FileText } from 'lucide-react'
import { Input } from '../ui/input'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { TombstoneIcon } from '@/components/ui/tombstoneIcon'
import { useRouter } from 'next/navigation'

const Header = () => {
    const { user, isLoggedIn, loading } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const router = useRouter()
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = async () => {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        await supabase.auth.signOut()
        setIsOpen(false)
        window.location.href = '/'
    }

    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false)
            }
        }

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSearchOpen])

    return (
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="mx-auto px-8 sm:px-6 lg:px-8" style={{ maxWidth: '1600px' }}>
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Left Section - Logo */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-1">
                            <TombstoneIcon className="w-12 h-12" />
                            <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap tracking-tight">
                                404 Grave
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/projects"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            프로젝트
                        </Link>
                        <Link
                            href="/adoption"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            부활
                        </Link>
                        {isLoggedIn && (
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                            >
                                대시보드
                            </Link>
                        )}
                    </nav>

                    {/* Center Section - Search */}
                    {isSearchOpen && (
                        <div
                            ref={searchRef}
                            className="absolute left-0 right-0 top-16 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8"
                        >
                            <div className="mx-auto max-w-7xl">
                                <Input
                                    type="text"
                                    placeholder="프로젝트 또는 사용자 검색"
                                    rightIcon={<Search className="text-gray-500 h-5 w-5" />}
                                    className="w-full h-10 text-sm"
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <Bell className="h-5 w-5" />
                        </Button>

                        {isLoggedIn && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden sm:flex rounded-full text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => router.push('/projects/new')}
                            >
                                <FileText className="h-6 w-6" />
                                프로젝트 등록
                            </Button>
                        )}

                        {/* User Menu */}
                        {!isLoggedIn && !loading ? (
                            <Button variant="ghost" className="cursor-pointer" asChild>
                                <Link href="/auth/login">로그인</Link>
                            </Button>
                        ) : (
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    className="cursor-pointer h-auto p-0"
                                    asChild
                                >
                                    <Link
                                        href={`/profile/${user?.user_metadata?.user_name || user?.id}`}
                                    >
                                        {user?.user_metadata?.avatar_url ? (
                                            <Image
                                                src={user.user_metadata.avatar_url}
                                                alt="Profile"
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <User className="h-5 w-5 text-gray-500" />
                                            </div>
                                        )}
                                    </Link>
                                </Button>
                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="cursor-pointer"
                                        onClick={handleOpen}
                                    >
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform duration-200 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </Button>
                                    {isOpen && (
                                        <div className="absolute right-0 top-11 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                                            <Link
                                                href={`/profile/${user?.user_metadata?.user_name || user?.id}`}
                                            >
                                                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">
                                                    프로필
                                                </button>
                                            </Link>
                                            <Link href="/settings">
                                                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">
                                                    설정
                                                </button>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-red-600"
                                            >
                                                로그아웃
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-2">
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/projects"
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                프로젝트
                            </Link>
                            <Link
                                href="/adoption"
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                입양
                            </Link>
                            {isLoggedIn && (
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    대시보드
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
