'use client'

import { cn } from '@/lib/utils'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className={cn(
                    'w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 focus:ring-2',
                    className,
                )}
                {...props}
            />
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    )
}
