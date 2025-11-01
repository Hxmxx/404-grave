'use client'

import { cn } from '@/lib/utils'

export interface StepIndicatorProps {
    steps: string[]
    currentStep: number // 0-based index
    onStepClick?: (index: number) => void
    className?: string
}

export function StepIndicator({ steps, currentStep, onStepClick, className }: StepIndicatorProps) {
    return (
        <ol className={cn('flex items-center gap-4', className)}>
            {steps.map((label, index) => {
                const isActive = index === currentStep
                const isCompleted = index < currentStep

                return (
                    <li key={label} className="flex items-center gap-2">
                        <button
                            type="button"
                            aria-current={isActive ? 'step' : undefined}
                            onClick={() => onStepClick?.(index)}
                            className={cn(
                                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                                isCompleted && 'bg-gray-900 text-white',
                                isActive && !isCompleted && 'bg-gray-800 text-white',
                                !isCompleted && !isActive && 'bg-gray-100 text-gray-600',
                            )}
                        >
                            {index + 1}
                        </button>
                        <span
                            className={cn(
                                'text-sm',
                                isCompleted || isActive ? 'text-gray-900' : 'text-gray-500',
                            )}
                        >
                            {label}
                        </span>
                        {index !== steps.length - 1 && (
                            <span className="mx-2 h-px w-8 bg-gray-200" aria-hidden="true" />
                        )}
                    </li>
                )
            })}
        </ol>
    )
}
