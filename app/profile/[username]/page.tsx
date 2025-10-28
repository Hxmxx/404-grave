'use client'

import { use } from 'react'
import { useAuth } from '@/hooks/useAuth'
import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import Image from 'next/image'
import { User, Calendar, MapPin } from 'lucide-react'

const ProfilePage = ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = use(params)
    const { user } = useAuth()

    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-12">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                {user?.user_metadata?.avatar_url ? (
                                    <Image
                                        src={user.user_metadata.avatar_url}
                                        alt="Profile"
                                        width={120}
                                        height={120}
                                        className="rounded-full border-4 border-white shadow-lg"
                                    />
                                ) : (
                                    <div className="w-[120px] h-[120px] rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center">
                                        <User className="w-16 h-16 text-gray-500" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {user?.user_metadata?.full_name || user?.user_metadata?.name || username}
                                </h1>
                                <p className="text-gray-600 mb-1">@{username}</p>
                                {user?.user_metadata?.bio && (
                                    <p className="text-gray-700 mt-2">{user.user_metadata.bio}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">가입일</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {user?.created_at ? new Date(user.created_at).toLocaleDateString('ko-KR') : '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">위치</p>
                                    <p className="text-sm font-medium text-gray-900">-</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">0</p>
                                <p className="text-sm text-gray-600">프로젝트</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">0</p>
                                <p className="text-sm text-gray-600">입양</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">0</p>
                                <p className="text-sm text-gray-600">부활</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </PageLayout>
    )
}

export default ProfilePage
