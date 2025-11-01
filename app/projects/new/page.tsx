'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/pageLayout'
import { Container } from '@/components/layout/container'
import { FormWizard } from '@/components/ui/formWizard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { MultiSelect } from '@/components/ui/multiSelect'
import { failureReasons } from '@/data/failureReasons'
import { techStacks } from '@/data/techStacks'
import { toast } from 'sonner'

interface ProjectFormData {
    // Step 1: 기본 정보
    title: string
    description: string
    githubUrl: string
    demoUrl: string
    techStack: string[]

    // Step 2: 사망 진단서
    startDate: string
    deathDate: string
    deathReasons: string[]
    deathReasonOther: string

    // Step 3: 성과 및 교훈
    whatAchieved: string
    whatFailed: string
    lessonsLearned: string[]

    // Step 4: 상세 및 설정
    detailedStory: string
    screenshots: string[]
    isAnonymous: boolean
    allowAdoption: boolean
}

export default function NewProjectPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState<ProjectFormData>({
        title: '',
        description: '',
        githubUrl: '',
        demoUrl: '',
        techStack: [],
        startDate: '',
        deathDate: '',
        deathReasons: [],
        deathReasonOther: '',
        whatAchieved: '',
        whatFailed: '',
        lessonsLearned: ['', '', ''],
        detailedStory: '',
        screenshots: [],
        isAnonymous: false,
        allowAdoption: true,
    })

    const updateFormData = <K extends keyof ProjectFormData>(
        field: K,
        value: ProjectFormData[K],
    ) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const canGoNext = (stepIndex: number): boolean => {
        switch (stepIndex) {
            case 0: // Step 1: 기본 정보
                return formData.title.trim().length >= 3 && formData.description.trim().length >= 10
            case 1: // Step 2: 사망 진단서
                return (
                    formData.startDate !== '' &&
                    formData.deathDate !== '' &&
                    formData.deathReasons.length > 0 &&
                    (!formData.deathReasons.includes('기타') ||
                        formData.deathReasonOther.trim() !== '')
                )
            case 2: // Step 3: 성과 및 교훈
                return true // Optional fields
            case 3: // Step 4: 상세 및 설정
                return true
            default:
                return true
        }
    }

    const handleFinish = async () => {
        setIsSubmitting(true)

        try {
            // 교훈에서 빈 값 제거
            const filteredLessons = formData.lessonsLearned.filter(l => l.trim() !== '')

            const payload = {
                ...formData,
                lessonsLearned: filteredLessons,
                // 빈 URL 필드는 null로 변경
                githubUrl: formData.githubUrl.trim() || null,
                demoUrl: formData.demoUrl.trim() || null,
            }

            const response = await fetch('/api/projects/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || '프로젝트 생성에 실패했습니다')
            }

            toast.success('프로젝트가 성공적으로 등록되었습니다!')
            router.push(`/projects/${data.projectId}`)
        } catch (error) {
            const message = error instanceof Error ? error.message : '오류가 발생했습니다'
            toast.error(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderStep = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return <Step1BasicInfo formData={formData} updateFormData={updateFormData} />
            case 1:
                return <Step2DeathCertificate formData={formData} updateFormData={updateFormData} />
            case 2:
                return (
                    <Step3AchievementsLessons formData={formData} updateFormData={updateFormData} />
                )
            case 3:
                return <Step4DetailsSettings formData={formData} updateFormData={updateFormData} />
            default:
                return null
        }
    }

    return (
        <PageLayout>
            <Container size="lg" className="py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">프로젝트 등록</h1>
                    <p className="text-gray-600">
                        실패한 프로젝트의 이야기를 공유하고, 다른 개발자들에게 교훈을 전달하세요.
                    </p>
                </div>

                <FormWizard
                    steps={['기본 정보', '사망 진단서', '성과 및 교훈', '상세 및 설정']}
                    renderStep={renderStep}
                    canGoNext={canGoNext}
                    onFinish={handleFinish}
                />

                {isSubmitting && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6">
                            <p className="text-gray-900">프로젝트를 등록하는 중...</p>
                        </div>
                    </div>
                )}
            </Container>
        </PageLayout>
    )
}

// Step 1: 기본 정보
function Step1BasicInfo({
    formData,
    updateFormData,
}: {
    formData: ProjectFormData
    updateFormData: <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => void
}) {
    const [isAutofilling, setIsAutofilling] = useState(false)

    const handleAutofill = async () => {
        if (!formData.githubUrl) {
            toast.error('GitHub URL을 입력해주세요')
            return
        }

        setIsAutofilling(true)
        try {
            const response = await fetch('/api/github/repo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: formData.githubUrl }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || '레포지토리 정보를 가져오는데 실패했습니다')
            }

            // 자동 완성
            updateFormData('title', data.name || formData.title)
            updateFormData('description', data.description || formData.description)

            toast.success('레포지토리 정보를 가져왔습니다!')
        } catch (error) {
            const message = error instanceof Error ? error.message : '오류가 발생했습니다'
            toast.error(message)
        } finally {
            setIsAutofilling(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="githubUrl">GitHub URL (선택사항)</Label>
                <div className="flex gap-2 mt-1">
                    <Input
                        id="githubUrl"
                        type="url"
                        placeholder="https://github.com/username/repo"
                        value={formData.githubUrl}
                        onChange={e => updateFormData('githubUrl', e.target.value)}
                    />
                    <Button
                        type="button"
                        onClick={handleAutofill}
                        disabled={isAutofilling || !formData.githubUrl}
                    >
                        {isAutofilling ? '불러오는 중...' : '자동 완성'}
                    </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    GitHub URL을 입력하면 레포지토리 정보를 자동으로 가져옵니다.
                </p>
            </div>

            <div>
                <Label htmlFor="title">프로젝트 이름 *</Label>
                <Input
                    id="title"
                    placeholder="예: 심플 투두 앱"
                    value={formData.title}
                    onChange={e => updateFormData('title', e.target.value)}
                    required
                    minLength={3}
                    maxLength={200}
                />
                <p className="text-sm text-gray-500 mt-1">최소 3자, 최대 200자</p>
            </div>

            <div>
                <Label htmlFor="description">프로젝트 설명 *</Label>
                <Textarea
                    id="description"
                    placeholder="프로젝트에 대한 간단한 설명을 작성해주세요."
                    value={formData.description}
                    onChange={e => updateFormData('description', e.target.value)}
                    required
                    minLength={10}
                    rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">최소 10자</p>
            </div>

            <div>
                <Label htmlFor="demoUrl">데모 URL (선택사항)</Label>
                <Input
                    id="demoUrl"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.demoUrl}
                    onChange={e => updateFormData('demoUrl', e.target.value)}
                />
            </div>

            <div>
                <Label htmlFor="techStack">기술 스택</Label>
                <MultiSelect
                    options={techStacks}
                    value={formData.techStack}
                    onChange={value => updateFormData('techStack', value)}
                    placeholder="기술 스택을 검색하고 선택하세요..."
                />
                <p className="text-sm text-gray-500 mt-1">사용한 주요 기술들을 선택해주세요.</p>
            </div>
        </div>
    )
}

// Step 2: 사망 진단서
function Step2DeathCertificate({
    formData,
    updateFormData,
}: {
    formData: ProjectFormData
    updateFormData: <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => void
}) {
    const toggleReason = (reason: string) => {
        const current = formData.deathReasons
        if (current.includes(reason)) {
            updateFormData(
                'deathReasons',
                current.filter(r => r !== reason),
            )
        } else {
            updateFormData('deathReasons', [...current, reason])
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="startDate">시작일 *</Label>
                    <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={e => updateFormData('startDate', e.target.value)}
                        required
                        max={formData.deathDate || undefined}
                    />
                </div>

                <div>
                    <Label htmlFor="deathDate">사망일 *</Label>
                    <Input
                        id="deathDate"
                        type="date"
                        value={formData.deathDate}
                        onChange={e => updateFormData('deathDate', e.target.value)}
                        required
                        min={formData.startDate || undefined}
                    />
                </div>
            </div>

            <div>
                <Label>사망 원인 * (복수 선택 가능)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    {failureReasons.map(reason => (
                        <Checkbox
                            key={reason}
                            label={reason}
                            checked={formData.deathReasons.includes(reason)}
                            onChange={() => toggleReason(reason)}
                        />
                    ))}
                </div>
            </div>

            {formData.deathReasons.includes('기타') && (
                <div>
                    <Label htmlFor="deathReasonOther">기타 사유 *</Label>
                    <Textarea
                        id="deathReasonOther"
                        placeholder="구체적인 사망 원인을 작성해주세요."
                        value={formData.deathReasonOther}
                        onChange={e => updateFormData('deathReasonOther', e.target.value)}
                        required
                        rows={3}
                    />
                </div>
            )}
        </div>
    )
}

// Step 3: 성과 및 교훈
function Step3AchievementsLessons({
    formData,
    updateFormData,
}: {
    formData: ProjectFormData
    updateFormData: <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => void
}) {
    const updateLesson = (index: number, value: string) => {
        const newLessons = [...formData.lessonsLearned]
        newLessons[index] = value
        updateFormData('lessonsLearned', newLessons)
    }

    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="whatAchieved">달성한 것</Label>
                <Textarea
                    id="whatAchieved"
                    placeholder="프로젝트를 통해 달성한 것이나 성공적이었던 부분을 작성해주세요."
                    value={formData.whatAchieved}
                    onChange={e => updateFormData('whatAchieved', e.target.value)}
                    rows={4}
                />
            </div>

            <div>
                <Label htmlFor="whatFailed">달성하지 못한 것</Label>
                <Textarea
                    id="whatFailed"
                    placeholder="완성하지 못한 기능이나 아쉬웠던 부분을 작성해주세요."
                    value={formData.whatFailed}
                    onChange={e => updateFormData('whatFailed', e.target.value)}
                    rows={4}
                />
            </div>

            <div>
                <Label>배운 교훈 (최대 3개)</Label>
                <div className="space-y-3 mt-2">
                    {[0, 1, 2].map(index => (
                        <Input
                            key={index}
                            placeholder={`교훈 ${index + 1}`}
                            value={formData.lessonsLearned[index]}
                            onChange={e => updateLesson(index, e.target.value)}
                            maxLength={200}
                        />
                    ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    프로젝트를 통해 배운 점이나 다음에 시도할 때 기억할 것들을 작성해주세요.
                </p>
            </div>
        </div>
    )
}

// Step 4: 상세 및 설정
function Step4DetailsSettings({
    formData,
    updateFormData,
}: {
    formData: ProjectFormData
    updateFormData: <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => void
}) {
    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="detailedStory">상세 스토리 (마크다운 지원)</Label>
                <Textarea
                    id="detailedStory"
                    placeholder="프로젝트의 상세한 이야기를 마크다운으로 작성해주세요.&#10;&#10;# 제목&#10;## 소제목&#10;- 목록&#10;**굵게**&#10;*기울임*"
                    value={formData.detailedStory}
                    onChange={e => updateFormData('detailedStory', e.target.value)}
                    rows={10}
                    className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-1">
                    프로젝트의 배경, 개발 과정, 어려웠던 점 등을 자유롭게 작성해주세요.
                </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">설정</h3>

                <div className="space-y-4">
                    <Checkbox
                        label="익명으로 등록하기"
                        checked={formData.isAnonymous}
                        onChange={e => updateFormData('isAnonymous', e.target.checked)}
                    />
                    <p className="text-sm text-gray-500 ml-6">
                        익명으로 등록하면 작성자 정보가 표시되지 않습니다.
                    </p>

                    <Checkbox
                        label="입양 허용"
                        checked={formData.allowAdoption}
                        onChange={e => updateFormData('allowAdoption', e.target.checked)}
                    />
                    <p className="text-sm text-gray-500 ml-6">
                        다른 개발자가 프로젝트를 이어받을 수 있도록 허용합니다.
                    </p>
                </div>
            </div>
        </div>
    )
}
