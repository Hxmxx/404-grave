'use client'

import { Button } from '../ui/button'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-start">
                    {/* Left Section - Brand */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-gray-900">404 Grave</h3>
                        <p className="text-xs text-gray-600 max-w-md">
                            모든 실패한 프로젝트에는 이야기가 있습니다.
                            <br />
                            당신의 실패를 기록하고, 다른 사람의 경험에서 배우세요.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            © 2025 404 Grave. All rights reserved.
                        </p>
                    </div>

                    {/* Middle Section - Legal Links */}
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-semibold text-gray-900 mb-1">법적 고지</h4>
                            <Link
                                href="/terms"
                                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                이용약관
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                개인정보처리방침
                            </Link>
                            <Link
                                href="/contact"
                                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                문의
                            </Link>
                        </div>
                    </div>

                    {/* Right Section - Social Links */}
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-semibold text-gray-900 mb-2">연결하기</h4>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() =>
                                    window.open('mailto:haminni.dev@gmail.com', '_blank')
                                }
                            >
                                <Mail className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() => window.open('https://github.com/Hxmxx', '_blank')}
                            >
                                <Github className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() =>
                                    window.open(
                                        'https://www.linkedin.com/in/%ED%95%98%EB%AF%BC-%EC%A1%B0-01a7b32b8/',
                                        '_blank',
                                    )
                                }
                            >
                                <Linkedin className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() =>
                                    window.open('https://www.instagram.com/h._m1n_/', '_blank')
                                }
                            >
                                <Instagram className="h-4 w-4 text-gray-600" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
