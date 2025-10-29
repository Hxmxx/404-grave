import { LucideProps } from 'lucide-react'

export function TombstoneIcon({ className, ...props }: LucideProps) {
    return (
        <svg viewBox="0 0 100 120" className={className} fill="currentColor" {...props}>
            <path d="M10 10 L90 10 Q95 10, 95 15 L95 110 Q95 115, 90 115 L10 115 Q5 115, 5 110 L5 15 Q5 10, 10 10 Z" />
            <path d="M25 40 L25 90 Q25 95, 30 95 L35 95 Q40 95, 40 90 L40 65 Q40 60, 35 60 L30 60 Q25 60, 25 65 Z" />
            <path d="M60 40 L60 90 Q60 95, 65 95 L70 95 Q75 95, 75 90 L75 65 Q75 60, 70 60 L65 60 Q60 60, 60 65 Z" />
        </svg>
    )
}
