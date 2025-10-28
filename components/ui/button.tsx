import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    {
        variants: {
            variant: {
                default:
                    'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-500/20',
                destructive:
                    'bg-white text-red-600 border border-red-300 hover:bg-red-50 focus-visible:ring-red-500/20',
                outline:
                    'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500/20',
                secondary:
                    'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 focus-visible:ring-gray-500/20',
                ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500/20',
                link: 'text-gray-600 underline-offset-4 hover:underline hover:text-gray-900',
                success:
                    'bg-white text-green-600 border border-green-300 hover:bg-green-50 focus-visible:ring-green-500/20',
                warning:
                    'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50 focus-visible:ring-amber-500/20',
            },
            size: {
                default: 'h-11 px-6 py-3 has-[>svg]:px-4',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
                lg: 'h-12 rounded-md px-8 py-4 has-[>svg]:px-5 text-base',
                icon: 'size-9',
                'icon-sm': 'size-8',
                'icon-lg': 'size-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : 'button'

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
