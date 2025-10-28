import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({
    className,
    type,
    rightIcon,
    ...props
}: React.ComponentProps<'input'> & { rightIcon?: React.ReactNode }) {
    return (
        <div className="relative">
            <input
                type={type}
                data-slot="input"
                className={cn(
                    'w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm',
                    'focus:border-[var(--grave-sage)] focus:outline-none focus:ring-1 focus:ring-[var(--grave-sage)]/20',
                    'transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                {...props}
            />
            {rightIcon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {rightIcon}
                </div>
            )}
        </div>
    )
}

export { Input }
