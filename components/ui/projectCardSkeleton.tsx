import { Skeleton } from './skeleton'

export const ProjectCardSkeleton = () => {
    return (
        <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Image skeleton */}
            <Skeleton className="w-full h-[150px]" />

            {/* Content section */}
            <div className="p-4 flex flex-col gap-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Stats section */}
            <div className="p-4 flex flex-row justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
            </div>

            {/* Footer section */}
            <div className="p-4">
                <hr className="border-gray-200 mb-3" />
                <div className="flex flex-row items-center gap-1 justify-between w-full">
                    <div className="flex flex-row items-center gap-2">
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        </div>
    )
}
