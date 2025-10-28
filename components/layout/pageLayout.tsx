import Header from './header'
import Footer from './footer'
import { Container } from './container'

interface PageLayoutProps {
    children: React.ReactNode
    title?: string
    description?: string
    showFooter?: boolean
    containerSize?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function PageLayout({
    children,
    showFooter = true,
    containerSize = 'lg',
}: PageLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Container size={containerSize}>{children}</Container>
            </main>
            {showFooter && <Footer />}
        </div>
    )
}
