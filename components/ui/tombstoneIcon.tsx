import { LucideProps } from 'lucide-react'

export function TombstoneIcon({ className, ...props }: LucideProps) {
    return (
        <svg
            viewBox="0 0 100 120"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            aria-label="tombstone with moss and a small butterfly"
            {...props}
        >
            {/* Ground */}
            <rect x="0" y="105" width="100" height="8" fill="#e5e7eb" />
            {/* Grass tufts on ground */}
            <g fill="#16a34a">
                <path d="M8 105 l2 -5 l2 5 Z" />
                <path d="M16 105 l2 -6 l2 6 Z" />
                <path d="M26 105 l2 -5 l2 5 Z" />
                <path d="M36 105 l2 -6 l2 6 Z" />
                <path d="M46 105 l2 -5 l2 5 Z" />
                <path d="M56 105 l2 -6 l2 6 Z" />
                <path d="M66 105 l2 -5 l2 5 Z" />
                <path d="M76 105 l2 -6 l2 6 Z" />
                <path d="M86 105 l2 -5 l2 5 Z" />
                <path d="M96 105 l2 -6 l2 6 Z" />
                {/* extra small tufts */}
                <path d="M12 105 l1.5 -4 l1.5 4 Z" />
                <path d="M22 105 l1.5 -4.5 l1.5 4.5 Z" />
                <path d="M32 105 l1.5 -4 l1.5 4 Z" />
                <path d="M42 105 l1.5 -4.5 l1.5 4.5 Z" />
                <path d="M52 105 l1.5 -4 l1.5 4 Z" />
                <path d="M62 105 l1.5 -4.5 l1.5 4.5 Z" />
                <path d="M72 105 l1.5 -4 l1.5 4 Z" />
                <path d="M82 105 l1.5 -4.5 l1.5 4.5 Z" />
            </g>
            {/* lighter grass accents */}
            <g fill="#22c55e" opacity="0.8">
                <path d="M5 106 q2 -3 4 0" />
                <path d="M18 106 q2 -3.5 4 0" />
                <path d="M28 106 q2 -3 4 0" />
                <path d="M38 106 q2 -3.5 4 0" />
                <path d="M48 106 q2 -3 4 0" />
                <path d="M58 106 q2 -3.5 4 0" />
                <path d="M68 106 q2 -3 4 0" />
                <path d="M78 106 q2 -3.5 4 0" />
                <path d="M88 106 q2 -3 4 0" />
            </g>

            {/* Stone body */}
            <path
                d="M16 18 Q16 10, 24 10 L76 10 Q84 10, 84 18 L84 105 Q84 110, 79 110 L21 110 Q16 110, 16 105 Z"
                fill="currentColor"
            />

            {/* Cracks on stone */}
            <g stroke="#111827" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" fill="none">
                <path d="M36 42 l-4 6 l5 4" />
                <path d="M64 44 l4 5 l-6 4" />
                <path d="M50 30 l-2 4 l3 3" />
            </g>

            {/* Inner inset */}
            <path
                d="M24 26 Q24 18, 30 18 L70 18 Q76 18, 76 26 L76 98 Q76 102, 73 102 L27 102 Q24 102, 24 98 Z"
                fill="rgba(255,255,255,0.12)"
            />

            {/* Moss (soft green blobs hugging the stone edges) */}
            <g fill="#16a34a">
                {/* large base moss blobs */}
                <path d="M25 95 C25 88, 35 84, 42 86 C48 88, 50 93, 50 98 L25 98 Z" opacity="0.9" />
                <path d="M75 95 C75 88, 65 84, 58 86 C52 88, 50 93, 50 98 L75 98 Z" opacity="0.9" />
                {/* side/top touches */}
                <path
                    d="M70 32 C74 30, 79 31, 81 34 C82 37, 79 39, 76 39 C72 39, 69 37, 70 32 Z"
                    opacity="0.7"
                />
                <path
                    d="M28 50 C30 47, 35 46, 38 48 C40 51, 37 54, 33 54 C30 54, 27 52, 28 50 Z"
                    opacity="0.6"
                />
            </g>

            {/* Epitaph slots */}
            <g fill="#111827">
                <rect x="32" y="42" width="36" height="4" rx="2" opacity="0.22" />
                <rect x="32" y="52" width="30" height="4" rx="2" opacity="0.18" />
                <rect x="32" y="62" width="24" height="4" rx="2" opacity="0.14" />
            </g>

            {/* Small butterflies */}
            <g
                transform="translate(18,18) rotate(-12) scale(1.3)"
                stroke="#60a5fa"
                strokeWidth="1.2"
                fill="#93c5fd"
            >
                {/* body */}
                <rect x="-0.9" y="-1.7" width="1.8" height="3.6" rx="0.9" />
                {/* wings */}
                <path d="M-1.3 -1.1 C-3.8 -2.7, -5.3 -0.7, -3.2 0.45 C-2.3 1.0, -1.5 0.65, -1.15 -0.2 Z" />
                <path d="M1.3 -1.1 C3.8 -2.7, 5.3 -0.7, 3.2 0.45 C2.3 1.0, 1.5 0.65, 1.15 -0.2 Z" />
                {/* tiny motion trail */}
                <path
                    d="M-6.5 2.2 Q-4.3 3.2, -2.1 2.1"
                    fill="none"
                    stroke="#bfdbfe"
                    strokeWidth="1"
                    strokeLinecap="round"
                />
            </g>
            <g
                transform="translate(80,28) rotate(8) scale(1.1)"
                stroke="#60a5fa"
                strokeWidth="1.2"
                fill="#93c5fd"
            >
                <rect x="-0.8" y="-1.5" width="1.6" height="3.2" rx="0.8" />
                <path d="M-1.1 -0.9 C-3.0 -2.2, -4.2 -0.5, -2.6 0.35 C-1.8 0.8, -1.2 0.6, -0.95 -0.1 Z" />
                <path d="M1.1 -0.9 C3.0 -2.2, 4.2 -0.5, 2.6 0.35 C1.8 0.8, 1.2 0.6, 0.95 -0.1 Z" />
            </g>
        </svg>
    )
}
