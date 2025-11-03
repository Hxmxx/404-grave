'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
    const { isLoggedIn, loading } = useAuth()
    const router = useRouter()
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            setIsRedirecting(true)
            router.push('/auth/login')
        }
    }, [loading, isLoggedIn, router])

    if (loading || isRedirecting) {
        return (
            <>
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                </div>
            </>
        )
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>
        </>
    )
}
