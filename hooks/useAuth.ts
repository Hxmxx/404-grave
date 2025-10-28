'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useRef } from 'react'
import type { User, Session } from '@supabase/supabase-js'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
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
                setLoading(false)
            } catch (error) {
                console.error('Error getting user:', error)
                setUser(null)
                setLoading(false)
            }
        }

        getUser()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: any, session: Session | null) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        user,
        isLoggedIn: !!user,
        loading,
    }
}
