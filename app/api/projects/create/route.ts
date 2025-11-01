import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema
const projectSchema = z.object({
    title: z
        .string()
        .min(3, '제목은 최소 3자 이상이어야 합니다')
        .max(200, '제목은 최대 200자까지 가능합니다'),
    description: z.string().min(10, '설명은 최소 10자 이상이어야 합니다'),
    githubUrl: z
        .string()
        .url('유효한 URL을 입력해주세요')
        .nullable()
        .or(z.literal(''))
        .transform(val => val || null),
    demoUrl: z
        .string()
        .url('유효한 URL을 입력해주세요')
        .nullable()
        .or(z.literal(''))
        .transform(val => val || null),
    techStack: z.array(z.string()),
    startDate: z.string().min(1, '시작일을 선택해주세요'),
    deathDate: z.string().min(1, '사망일을 선택해주세요'),
    deathReasons: z.array(z.string()).min(1, '최소 하나의 사망 원인을 선택해주세요'),
    deathReasonOther: z.string().optional(),
    whatAchieved: z.string().optional(),
    whatFailed: z.string().optional(),
    lessonsLearned: z.array(z.string()).max(5, '교훈은 최대 5개까지 입력 가능합니다'),
    detailedStory: z.string().optional(),
    screenshots: z.array(z.string()),
    isAnonymous: z.boolean(),
    allowAdoption: z.boolean(),
})

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()

        // 현재 로그인한 사용자 확인
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 })
        }

        // Request body 파싱
        const body = await request.json()

        // Validation
        const validatedData = projectSchema.parse(body)

        // 날짜 검증
        const startDate = new Date(validatedData.startDate)
        const deathDate = new Date(validatedData.deathDate)

        if (deathDate < startDate) {
            return NextResponse.json({ error: '사망일은 시작일 이후여야 합니다' }, { status: 400 })
        }

        // "기타" 선택 시 상세 사유 필수
        if (
            validatedData.deathReasons.includes('기타') &&
            !validatedData.deathReasonOther?.trim()
        ) {
            return NextResponse.json({ error: '기타 사유를 입력해주세요' }, { status: 400 })
        }

        // Supabase에 프로젝트 저장
        const { data: project, error: insertError } = await supabase
            .from('projects')
            .insert({
                user_id: user.id,
                title: validatedData.title,
                description: validatedData.description,
                github_url: validatedData.githubUrl,
                demo_url: validatedData.demoUrl,
                tech_stack: validatedData.techStack,
                start_date: validatedData.startDate,
                death_date: validatedData.deathDate,
                death_reasons: validatedData.deathReasons,
                death_reason_other: validatedData.deathReasonOther || null,
                what_achieved: validatedData.whatAchieved || null,
                what_failed: validatedData.whatFailed || null,
                lessons_learned: validatedData.lessonsLearned.filter(l => l.trim() !== ''),
                detailed_story: validatedData.detailedStory || null,
                screenshots: validatedData.screenshots,
                is_anonymous: validatedData.isAnonymous,
                allow_adoption: validatedData.allowAdoption,
                status: 'active',
            })
            .select('id')
            .single()

        if (insertError) {
            console.error('Supabase insert error:', insertError)
            return NextResponse.json(
                { error: '프로젝트 생성에 실패했습니다', details: insertError.message },
                { status: 500 },
            )
        }

        return NextResponse.json({
            success: true,
            projectId: project.id,
            message: '프로젝트가 성공적으로 등록되었습니다',
        })
    } catch (error) {
        console.error('Project creation error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: '입력값이 올바르지 않습니다', details: error.issues },
                { status: 400 },
            )
        }

        return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
    }
}
