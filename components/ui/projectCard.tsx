import Link from 'next/link'
import Image from 'next/image'
import { TombstoneIcon } from './tombstoneIcon'
import { Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
    id: string
    title: string
    description?: string
    status: 'dead' | 'alive'
    createdAt?: string
    owner?: {
        id: string
        username: string
        avatar?: string
    }
    thumbnail?: string
    className?: string
}

export function ProjectCard({ 
    id, 
    title, 
    description, 
    status, 
    createdAt,
    owner,
    thumbnail,
    className 
}: ProjectCardProps) {
    return (
        <Link href={`/projects/${id}`}>
            <div className={cn(
                "group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg",
                status === 'dead' && "hover:border-red-200",
                status === 'alive' && "hover:border-green-200",
                className
            )}>
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <TombstoneIcon className="w-20 h-20 text-gray-300" />
                        </div>
                    )}
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            status === 'dead' && "bg-red-100 text-red-800",
                            status === 'alive' && "bg-green-100 text-green-800"
                        )}>
                            {status === 'dead' ? '사망' : '부활'}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {description}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{owner?.username || 'Unknown'}</span>
                        </div>
                        {createdAt && (
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(createdAt).toLocaleDateString('ko-KR')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

