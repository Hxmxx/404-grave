import { LucideIcon } from 'lucide-react'
import { TombstoneIcon } from './tombstoneIcon'

interface EmptyStateProps {
    icon?: LucideIcon
    title?: string
    description?: string
    useTombstone?: boolean
}

export function EmptyState({
    icon: Icon,
    title = '데이터가 없습니다',
    description,
    useTombstone = false,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-gray-400 mb-4">
                {useTombstone ? (
                    <TombstoneIcon className="w-24 h-24" />
                ) : Icon ? (
                    <Icon className="w-16 h-16" />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200" />
                )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-600 max-w-sm text-center">{description}</p>
            )}
        </div>
    )
}
