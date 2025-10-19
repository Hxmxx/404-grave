import { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'
import CacheStatus from '@/components/cache/cache-status'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen grave-gradient flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center py-12 px-4 flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Cache Status - Fixed position */}
      <div className="fixed bottom-4 right-4 z-50">
        <CacheStatus />
      </div>
    </div>
  )
}
