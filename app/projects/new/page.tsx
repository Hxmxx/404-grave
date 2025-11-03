'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectFormSchema } from '@/lib/validators/projects'
import { Skeleton } from '@/components/ui/skeleton'
import { z } from 'zod'

type ProjectFormValues = z.infer<typeof projectFormSchema>

export default function NewProjectPage() {
    const { isLoggedIn, loading } = useAuth()
    const router = useRouter()
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            setIsRedirecting(true)
            router.push('/auth/login')
        }
    }, [loading, isLoggedIn, router])

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            title: '',
            description: '',
            github_url: '',
            demo_url: '',
            start_date: '',
            death_date: '',
            death_reasons: [],
            death_reason_other: '',
            tech_stack: [],
            what_achieved: '',
            what_failed: '',
            lessons_learned: [],
            detailed_story: '',
            screenshots: [],
            is_anonymous: false,
            allow_adoption: false,
            status: 'active',
            view_count: 0,
            like_count: 0,
            comment_count: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    })

    const onSubmit: SubmitHandler<ProjectFormValues> = data => {
        console.log(data)
    }

    // 로딩 중이거나 리다이렉트 중일 때
    if (loading || isRedirecting || !isLoggedIn) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        )
    }

    return (
        <>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">사망진단서</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>제목</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>
    )
}
