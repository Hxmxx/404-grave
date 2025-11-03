import Image from 'next/image'
import { User, Calendar, Briefcase, Heart } from 'lucide-react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    const supabase = await createClient()

    // 프로필 정보 가져오기
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

    if (profileError || !profile) {
        return notFound()
    }

    // 프로젝트 통계 가져오기
    const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id)

    const { count: adoptedCount } = await supabase
        .from('adoptions')
        .select('*', { count: 'exact', head: true })
        .eq('adopter_id', profile.id)

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-12">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            {profile.avatar_url ? (
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.username}
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
                                {profile.full_name || profile.username}
                            </h1>
                            <p className="text-gray-600 mb-1">@{profile.username}</p>
                            {profile.bio && <p className="text-gray-700 mt-2">{profile.bio}</p>}
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">가입일</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {new Date(profile.created_at).toLocaleDateString('ko-KR')}
                                </p>
                            </div>
                        </div>
                        {profile.github_username && (
                            <div className="flex items-center gap-3">
                                <Briefcase className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">GitHub</p>
                                    <a
                                        href={`https://github.com/${profile.github_username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        @{profile.github_username}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{projectsCount || 0}</p>
                            <p className="text-sm text-gray-600">프로젝트</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{adoptedCount || 0}</p>
                            <p className="text-sm text-gray-600">입양</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                                {profile.badges?.length || 0}
                            </p>
                            <p className="text-sm text-gray-600">뱃지</p>
                        </div>
                    </div>

                    {/* Badges */}
                    {profile.badges && profile.badges.length > 0 && (
                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                획득한 뱃지
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.badges.map((badge: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
