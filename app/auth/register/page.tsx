'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Github } from 'lucide-react'

const RegisterPage = () => {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            if (response.ok) {
                toast.success('회원가입 성공')
                router.push('/')
            } else {
                const data = await response.json()
                toast.error(data.error || '회원가입 실패')
            }
        } catch {
            toast.error('회원가입 실패')
        }
    }

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        try {
            const response = await fetch(`/api/auth/login/${provider}`)
            if (response.ok) {
                const { url } = await response.json()
                window.location.href = url
            }
        } catch {
            toast.error(`${provider} 로그인 실패`)
        }
    }

    return (
        <PageLayout>
            <Container size="sm" className="py-12">
                <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">회원가입</h1>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">이메일</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="이메일을 입력하세요"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="비밀번호를 입력하세요 (최소 8자)"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="비밀번호를 다시 입력하세요"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                회원가입
                            </Button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">또는</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleSocialLogin('google')}
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google로 가입
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleSocialLogin('github')}
                                >
                                    <Github className="w-5 h-5 mr-2" />
                                    GitHub로 가입
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                이미 계정이 있으신가요?{' '}
                                <Link
                                    href="/auth/login"
                                    className="font-medium text-gray-900 hover:underline"
                                >
                                    로그인
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </PageLayout>
    )
}

export default RegisterPage
