import { cn } from '@/lib/utils'

interface ContainerProps {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
    noPadding?: boolean
    className?: string
}

const sizeMap = {
    sm: 'max-w-[80vw]', // 화면 너비의 80%
    md: 'max-w-[80vw]', // 화면 너비의 80%
    lg: 'max-w-[80vw]', // 화면 너비의 80%
    xl: 'max-w-[80vw]', // 화면 너비의 80%
}

export function Container({ children, size = 'lg', noPadding = false, className }: ContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto w-full',
                sizeMap[size],
                !noPadding && 'px-4 sm:px-6 lg:px-8',
                className,
            )}
        >
            {children}
        </div>
    )
}
