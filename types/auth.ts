import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string()
    .min(8)
    .regex(/[A-Z]/, "대문자를 1개 이상 포함해야 합니다.")
    .regex(/[a-z]/, "소문자를 1개 이상 포함해야 합니다.")
    .regex(/[0-9]/, "숫자를 1개 이상 포함해야 합니다.")
    .regex(/[!@#$%^&*()]/, "특수문자를 1개 이상 포함해야 합니다."),
})