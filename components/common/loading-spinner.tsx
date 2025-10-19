import { cn } from '@/lib/utils'
import { TombstoneIcon, GhostIcon, MoonIcon } from '@/components/ui/grave-icons'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'grave' | 'ghost' | 'moon'
  text?: string
  className?: string
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
}

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  text,
  className = ''
}: LoadingSpinnerProps) {
  const renderIcon = () => {
    switch (variant) {
      case 'grave':
        return <TombstoneIcon className={cn('animate-pulse', sizeClasses[size])} />
      case 'ghost':
        return <GhostIcon className={cn('animate-bounce', sizeClasses[size])} />
      case 'moon':
        return <MoonIcon className={cn('animate-spin', sizeClasses[size])} />
      default:
        return (
          <div className={cn(
            'animate-spin rounded-full border-2 border-primary border-t-transparent',
            sizeClasses[size]
          )} />
        )
    }
  }

  return (
    <div className={cn(
      'flex flex-col items-center justify-center gap-3',
      className
    )}>
      <div className="text-primary">
        {renderIcon()}
      </div>
      {text && (
        <p className={cn(
          'text-muted-foreground font-medium',
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  )
}

// 전체 화면 로딩 컴포넌트
export function FullScreenLoading({ text = '무덤을 파헤치는 중...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="grave-card rounded-xl p-8 text-center">
        <LoadingSpinner size="xl" variant="grave" text={text} />
      </div>
    </div>
  )
}

// 인라인 로딩 컴포넌트
export function InlineLoading({ text, className }: { text?: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <LoadingSpinner size="sm" />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}

// 버튼 내부 로딩 컴포넌트
export function ButtonLoading({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <LoadingSpinner size={size} variant="default" />
}
