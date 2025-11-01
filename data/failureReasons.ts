export const failureReasons = [
    '시간 부족',
    '동기 부족',
    '흥미 상실',
    '비용 문제',
    '기술적 어려움',
    '비슷한 서비스 발견',
    '팀 해체',
    '개인 사정',
    '방향성 상실',
    '완벽주의',
    '기타',
] as const

export type FailureReason = (typeof failureReasons)[number]
