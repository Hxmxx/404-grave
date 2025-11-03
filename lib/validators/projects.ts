import { z } from 'zod'

export const projectFormSchema = z.object({
    title: z
        .string()
        .min(3, '제목은 최소 3글자 이상이어야 합니다.')
        .max(200, '제목은 최대 200글자 이하여야 합니다.'),
    description: z
        .string()
        .min(10, '설명은 최소 10글자 이상이어야 합니다.')
        .max(1000, '설명은 최대 1000글자 이하여야 합니다.'),
    github_url: z.string().url('유효한 GitHub URL을 입력해주세요.').optional().or(z.literal('')),
    demo_url: z.string().url('유효한 데모 URL을 입력해주세요.').optional().or(z.literal('')),
    start_date: z.string().min(1, '시작일을 선택해주세요.'),
    death_date: z.string().min(1, '사망일을 선택해주세요.'),
    death_reasons: z.array(z.string()).min(1, '최소 하나의 사망 원인을 선택해주세요.'),
    death_reason_other: z.string().optional(),
    tech_stack: z.array(z.string()).min(1, '최소 하나의 기술 스택을 선택해주세요.'),
    what_achieved: z.string().optional(),
    what_failed: z.string().optional(),
    lessons_learned: z.array(z.string()).max(5, '교훈은 최대 5개까지 입력 가능합니다.'),
    detailed_story: z.string().optional(),
    screenshots: z.array(z.string()).optional(),
    is_anonymous: z.boolean(),
    allow_adoption: z.boolean(),
    status: z.enum(['active', 'adopted', 'archived']),
    view_count: z.number(),
    like_count: z.number(),
    comment_count: z.number(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
})
