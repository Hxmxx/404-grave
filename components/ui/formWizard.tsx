'use client'

import { ReactNode, useMemo, useState } from 'react'
import { StepIndicator } from './stepIndicator'
import { cn } from '@/lib/utils'

export interface FormWizardProps {
    steps: string[]
    initialStep?: number
    onFinish?: () => void
    className?: string
    // Provide content for each step
    renderStep: (index: number) => ReactNode
    // Optional validation before going next
    canGoNext?: (index: number) => boolean
}

export function FormWizard({
    steps,
    initialStep = 0,
    onFinish,
    className,
    renderStep,
    canGoNext,
}: FormWizardProps) {
    const [currentStep, setCurrentStep] = useState(initialStep)
    const isLast = useMemo(() => currentStep === steps.length - 1, [currentStep, steps.length])

    const goTo = (index: number) => {
        if (index < 0 || index >= steps.length) return
        setCurrentStep(index)
    }

    const handleNext = () => {
        if (canGoNext && !canGoNext(currentStep)) return
        if (isLast) {
            onFinish?.()
            return
        }
        goTo(currentStep + 1)
    }

    const handlePrev = () => {
        goTo(currentStep - 1)
    }

    return (
        <div className={cn('w-full', className)}>
            <StepIndicator
                steps={steps}
                currentStep={currentStep}
                onStepClick={goTo}
                className="mb-6"
            />

            <div className="rounded-lg border border-gray-200 bg-white p-4">
                {renderStep(currentStep)}
            </div>

            <div className="mt-4 flex items-center justify-between">
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={cn(
                        'px-4 py-2 rounded-md text-sm font-medium border',
                        currentStep === 0
                            ? 'cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
                            : 'bg-white text-gray-900 hover:bg-gray-50 border-gray-300',
                    )}
                >
                    이전
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    className={cn(
                        'px-4 py-2 rounded-md text-sm font-medium text-white',
                        isLast ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-800 hover:bg-gray-700',
                    )}
                >
                    {isLast ? '완료' : '다음'}
                </button>
            </div>
        </div>
    )
}
