'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Github, Mail, Loader2 } from 'lucide-react'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const supabase = createClient()

  const handleGitHubLogin = async () => {
    try {
      setLoading(true)
      setLoadingProvider('github')
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('GitHub 로그인 오류:', error)
      alert('GitHub 로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
      setLoadingProvider(null)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setLoadingProvider('google')
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Google 로그인 오류:', error)
      alert('Google 로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
      setLoadingProvider(null)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">로그인</h2>
        <p className="text-gray-600">계정에 로그인하여 계속하세요</p>
      </div>
      
      <Button
        onClick={handleGitHubLogin}
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
      >
        {loadingProvider === 'github' ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        GitHub로 로그인
      </Button>
      
      <Button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loadingProvider === 'google' ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Mail className="mr-2 h-4 w-4" />
        )}
        Google로 로그인
      </Button>
    </div>
  )
}
