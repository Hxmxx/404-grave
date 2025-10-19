import { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'
import Container from './container'

interface PageLayoutProps {
  children: ReactNode
  showFooter?: boolean
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export default function PageLayout({ 
  children, 
  showFooter = true,
  containerSize = 'lg',
  className = ''
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen grave-gradient ${className}`}>
      <Header />
      
      <main className="flex-1">
        <Container size={containerSize}>
          {children}
        </Container>
      </main>
      
      {showFooter && <Footer />}
    </div>
  )
}
