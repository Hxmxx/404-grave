import Header from './header'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {children}
        </div>
    )
}

export default PageLayout
