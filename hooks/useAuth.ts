'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useRef } from 'react'
import type { User, Session } from '@supabase/supabase-js'

interface Profile {
    id: string
    username: string
    full_name: string | null
    avatar_url: string | null
    bio: string | null
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const supabaseRef = useRef(createClient())

    useEffect(() => {
        const supabase = supabaseRef.current

        const getUser = async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser()
                setUser(user)

                // 프로필 정보 가져오기
                if (user) {
                    const { data: profileData } = await supabase
                        .from('profiles')
                        .select('id, username, full_name, avatar_url, bio')
                        .eq('id', user.id)
                        .single()

                    setProfile(profileData)
                }

                setLoading(false)
            } catch (error) {
                console.error('Error getting user:', error)
                setUser(null)
                setProfile(null)
                setLoading(false)
            }
        }

        getUser()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event: any, session: Session | null) => {
            setUser(session?.user ?? null)

            // 프로필 정보 가져오기
            if (session?.user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('id, username, full_name, avatar_url, bio')
                    .eq('id', session.user.id)
                    .single()

                setProfile(profileData)
            } else {
                setProfile(null)
            }

            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        user,
        profile,
        isLoggedIn: !!user,
        loading,
    }
}
