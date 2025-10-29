'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function CallbackContent() {
    const searchParams = useSearchParams()

    useEffect(() => {
        const code = searchParams.get('code')

        if (code) {
            // Redirect to API route to exchange code for session
            const currentUrl = new URL(window.location.href)
            currentUrl.pathname = '/api/auth/callback'
            window.location.href = currentUrl.toString()
        } else {
            window.location.href = '/auth/login'
        }
    }, [searchParams])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">로그인 처리 중...</p>
            </div>
        </div>
    )
}

export default function Callback() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-600">로딩 중...</p>
                    </div>
                </div>
            }
        >
            <CallbackContent />
        </Suspense>
    )
}
