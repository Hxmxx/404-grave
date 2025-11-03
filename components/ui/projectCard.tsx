'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { differenceInDays } from 'date-fns'
import { Badge } from './badge'

interface ProjectCardProps {
    id: string
    title: string
    description: string
    githubUrl: string
    demoUrl: string
    startDate: string
    deathDate: string
    deathReasons: string[]
    deathReasonOther: string
    techStack: string[]
    whatAchieved: string
    whatFailed: string
    lessonsLearned: string[]
    detailedStory: string
    screenshots: string[]
    isAnonymous: boolean
    allowAdoption: boolean
    status: 'active' | 'adopted' | 'archived'
    createdAt: string
    updatedAt: string
    viewCount: number
    likeCount: number
    owner: {
        id: string
        userName: string
        avatarUrl: string
    }
}

export const ProjectCard = ({
    title,
    description,
    startDate,
    deathDate,
    isAnonymous,
    status,
    viewCount,
    likeCount,
    owner,
    screenshots = [],
}: ProjectCardProps) => {
    let survivalTime: number | string = differenceInDays(new Date(deathDate), new Date(startDate))
    const ownerName = isAnonymous ? '익명' : owner.userName
    if (survivalTime >= 30) {
        survivalTime /= 30
        survivalTime = Math.floor(survivalTime)
        if (survivalTime >= 12) {
            survivalTime /= 12
            survivalTime = Math.floor(survivalTime)
            survivalTime = `${survivalTime}년 생존`
        } else {
            survivalTime = `${survivalTime}개월 생존`
        }
    } else {
        survivalTime = `${survivalTime}일 생존`
    }

    return (
        <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer [&:hover]:scale-102 transition-all duration-200">
            <Badge
                variant={status === 'adopted' ? 'default' : 'destructive'}
                className="absolute top-2 right-2 z-10"
            >
                {status === 'adopted' ? '입양 완료' : '사망'}
            </Badge>
            {/* Thumbnail */}
            <Image
                src={
                    screenshots[0] ||
                    owner.avatarUrl ||
                    'https://i.pinimg.com/1200x/4f/c3/a4/4fc3a4db6c4f400b49f353e045f3f8c9.jpg'
                }
                alt={title}
                width={485}
                height={300}
                className="w-[485px] h-[150px] object-cover"
            />
            {/* Section */}
            <div className="p-4 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 truncate">{title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
            </div>
            <div className="p-4 flex flex-row justify-between">
                <div className="flex flex-row items-center gap-1">
                    <span className="text-sm text-gray-500">조회수 {viewCount}</span>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <Heart className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{likeCount}</span>
                </div>
            </div>
            <div className="p-4">
                <hr className="border-gray-200 mb-3" />
                <div className="flex flex-row items-center gap-1 justify-between w-full">
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src={
                                isAnonymous
                                    ? 'https://i.pravatar.cc/150?img=1'
                                    : owner.avatarUrl || 'https://i.pravatar.cc/150?img=1'
                            }
                            alt={isAnonymous ? '익명' : owner.userName}
                            width={20}
                            height={20}
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-500">
                            {isAnonymous ? '익명' : ownerName}
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">{survivalTime}</span>
                </div>
            </div>
        </div>
    )
}
