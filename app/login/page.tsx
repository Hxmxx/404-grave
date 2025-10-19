import LoginForm from '@/components/auth/login-form'
import { AlertCircle } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border max-w-md w-full mx-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold">404 Grave</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
