# Day 8-12 작업 완료 보고서 ✅

**날짜**: 2025년 11월 1일 (토요일)  
**작업**: 프로젝트 등록 UI 및 API 구현

---

## 📦 완성된 기능

### 1. 프로젝트 등록 페이지 (`/projects/new`)

4단계 Form Wizard로 구성된 프로젝트 등록 시스템:

#### **Step 1: 기본 정보**

- ✅ GitHub URL 입력 필드
- ✅ "자동 완성" 버튼 (GitHub API 연동)
- ✅ 프로젝트 이름 (필수, 3-200자)
- ✅ 프로젝트 설명 (필수, 최소 10자)
- ✅ 데모 URL (선택사항)
- ✅ 기술 스택 Multi-select

#### **Step 2: 사망 진단서**

- ✅ 시작일 선택 (date picker)
- ✅ 사망일 선택 (date picker, 시작일 이후만 가능)
- ✅ 사망 원인 체크박스 (복수 선택)
    - 시간 부족, 동기 부족, 흥미 상실, 비용 문제
    - 기술적 어려움, 비슷한 서비스 발견, 팀 해체
    - 개인 사정, 방향성 상실, 완벽주의, 기타
- ✅ "기타" 선택 시 텍스트 입력 필드 표시

#### **Step 3: 성과 및 교훈**

- ✅ 달성한 것 (Textarea)
- ✅ 달성하지 못한 것 (Textarea)
- ✅ 배운 교훈 3개 (동적 입력 필드, 최대 3개)

#### **Step 4: 상세 및 설정**

- ✅ 상세 스토리 (Markdown 지원 Textarea)
- ✅ 익명 모드 토글
- ✅ 입양 허용 체크박스

---

## 🔧 구현된 API

### 1. GitHub API 통합 (`/api/github/repo`)

#### POST 메서드 (신규)

```typescript
POST /api/github/repo
Body: { url: string }
Response: { name, description, language, ... }
```

**기능:**

- GitHub URL 파싱 (owner/repo 추출)
- `.git` 확장자 제거
- GitHub API 호출
- 레포지토리 정보 반환

**에러 처리:**

- 404: 레포지토리 없음
- 403: Private 레포
- 유효하지 않은 URL 형식

#### GET 메서드 (기존, 리팩토링)

```typescript
GET /api/github/repo?owner=xxx&repo=yyy
```

### 2. 프로젝트 생성 API (`/api/projects/create`)

```typescript
POST / api / projects / create
Body: ProjectFormData
Response: {
    ;(success, projectId, message)
}
```

**기능:**

- ✅ 사용자 인증 확인
- ✅ Zod를 사용한 Validation
    - 제목: 3-200자
    - 설명: 최소 10자
    - URL 형식 검증
    - 배열 길이 제한
    - 날짜 유효성 검증
- ✅ Supabase Insert
- ✅ 트랜잭션 처리
- ✅ 에러 핸들링

**Validation 규칙:**

- 시작일 < 사망일
- "기타" 선택 시 상세 사유 필수
- 교훈 최대 5개
- URL 형식 검증

---

## 🎨 새로운 UI 컴포넌트

### 1. `Checkbox` 컴포넌트

```tsx
<Checkbox label="익명으로 등록하기" />
```

- label 옵션
- 커스터마이징 가능한 스타일
- 접근성 고려

### 2. `MultiSelect` 컴포넌트

```tsx
<MultiSelect options={techStacks} value={selected} onChange={setSelected} />
```

- 검색 기능
- 선택된 항목 뱃지 표시
- X 버튼으로 제거
- 드롭다운 자동 닫기
- 키보드 네비게이션

### 3. Form Wizard (기존 활용)

- 4단계 스텝 인디케이터
- 이전/다음 버튼
- 단계별 유효성 검사
- 완료 버튼

---

## 📊 데이터 구조

### 1. 기술 스택 데이터 (`data/techStacks.ts`)

60+ 기술 스택 정의:

- Frontend: React, Next.js, Vue.js, Angular, Svelte...
- Backend: Node.js, Python, Java, Go, Rust...
- Mobile: React Native, Flutter, Swift, Kotlin...
- Database: PostgreSQL, MongoDB, Redis, Supabase...
- Cloud: AWS, Google Cloud, Azure, Vercel...
- AI/ML: OpenAI API, TensorFlow, PyTorch...

### 2. 사망 원인 데이터 (`data/failureReasons.ts`)

11가지 사망 원인:

- 시간 부족, 동기 부족, 흥미 상실
- 비용 문제, 기술적 어려움
- 비슷한 서비스 발견, 팀 해체
- 개인 사정, 방향성 상실
- 완벽주의, 기타

---

## 🔄 업데이트된 기능

### 1. Header 컴포넌트

- "사망진단서 작성" → "프로젝트 등록"으로 변경
- `/diagnosis` → `/projects/new`로 라우팅
- 로그인한 사용자만 표시

### 2. 프로젝트 목록 페이지

- "프로젝트 등록" 버튼 추가 (우측 상단)
- Plus 아이콘 포함
- `/projects/new`로 연결

---

## 📁 생성/수정된 파일

### 신규 파일

```
├── app/
│   ├── projects/
│   │   └── new/
│   │       └── page.tsx                    # 프로젝트 등록 페이지 (4단계 폼)
│   └── api/
│       └── projects/
│           └── create/
│               └── route.ts                # 프로젝트 생성 API
├── components/
│   └── ui/
│       ├── checkbox.tsx                    # 체크박스 컴포넌트
│       └── multiSelect.tsx                 # 멀티 셀렉트 컴포넌트
├── data/
│   └── techStacks.ts                       # 기술 스택 데이터
└── DAY8-12-SUMMARY.md                      # 이 문서
```

### 수정된 파일

```
├── app/
│   ├── api/
│   │   └── github/
│   │       └── repo/
│   │           └── route.ts                # POST 메서드 추가
│   └── projects/
│       └── page.tsx                        # 등록 버튼 추가
├── components/
│   └── layout/
│       └── header.tsx                      # 버튼 텍스트 및 라우팅 변경
└── data/
    └── failureReasons.ts                   # 데이터 구조 변경
```

---

## 🚀 사용 방법

### 1. 프로젝트 등록하기

1. **헤더의 "프로젝트 등록" 버튼 클릭**
    - 또는 프로젝트 목록 페이지의 "프로젝트 등록" 버튼

2. **Step 1: 기본 정보 입력**
    - (선택) GitHub URL 입력 후 "자동 완성" 클릭
    - 프로젝트 이름과 설명 입력
    - 기술 스택 선택

3. **Step 2: 사망 진단서 작성**
    - 프로젝트 시작일과 사망일 선택
    - 사망 원인 선택 (복수 선택 가능)

4. **Step 3: 성과 및 교훈 작성**
    - 달성한 것과 못한 것 작성
    - 배운 교훈 입력 (최대 3개)

5. **Step 4: 상세 및 설정**
    - 상세 스토리 작성 (마크다운 지원)
    - 익명 모드 및 입양 허용 설정

6. **"완료" 버튼 클릭**
    - 프로젝트 생성 후 상세 페이지로 리다이렉트

---

## ✨ 주요 기능

### 1. GitHub 자동 완성

- GitHub URL을 입력하면 레포지토리 정보를 자동으로 가져옵니다
- 프로젝트 이름과 설명이 자동으로 채워집니다

### 2. 단계별 유효성 검사

- 각 단계에서 필수 항목이 입력되어야 다음 단계로 이동 가능
- Step 1: 제목(3자+), 설명(10자+) 필수
- Step 2: 날짜, 사망 원인 필수

### 3. 실시간 피드백

- Toast 알림으로 성공/실패 메시지 표시
- 로딩 중 오버레이 표시
- 에러 발생 시 사용자 친화적인 메시지

### 4. 마크다운 지원

- 상세 스토리에서 마크다운 문법 사용 가능
- 코드 블록, 제목, 리스트 등 지원

---

## 📊 폼 데이터 구조

```typescript
interface ProjectFormData {
    // Step 1: 기본 정보
    title: string // 3-200자
    description: string // 최소 10자
    githubUrl: string // URL 형식
    demoUrl: string // URL 형식
    techStack: string[] // 선택된 기술 스택

    // Step 2: 사망 진단서
    startDate: string // YYYY-MM-DD
    deathDate: string // YYYY-MM-DD (startDate 이후)
    deathReasons: string[] // 최소 1개
    deathReasonOther: string // "기타" 선택 시 필수

    // Step 3: 성과 및 교훈
    whatAchieved: string // 선택사항
    whatFailed: string // 선택사항
    lessonsLearned: string[] // 최대 3개

    // Step 4: 상세 및 설정
    detailedStory: string // 마크다운
    screenshots: string[] // 이미지 URL 배열
    isAnonymous: boolean // 익명 모드
    allowAdoption: boolean // 입양 허용
}
```

---

## 🎯 Sprint 1 완료 조건 체크

- ✅ **프로젝트 목록 페이지에 표시됨** (Day 13 완료)
- ✅ **수동으로 프로젝트 등록 가능** ← **오늘 완료!**
- ✅ **GitHub URL 붙여넣으면 자동 완성** ← **오늘 완료!**
- ⏳ 이미지 업로드 동작 (향후 추가)

---

## 🐛 알려진 제한사항

### 현재 제한

1. **이미지 업로드**: 아직 구현되지 않음
    - screenshots 필드는 있지만 UI 없음
    - Supabase Storage 통합 필요

2. **마크다운 미리보기**: 없음
    - 입력만 가능, 미리보기 기능 없음

3. **프로젝트 상세 페이지**: EmptyState
    - 등록 후 상세 페이지로 이동하지만 아직 구현 안됨

### 향후 개선 사항

- [ ] 이미지 업로드 기능
- [ ] 마크다운 미리보기
- [ ] 프로젝트 상세 페이지 구현
- [ ] 드래프트 저장 기능
- [ ] 입력 자동 저장 (LocalStorage)

---

## 💡 기술적 하이라이트

### 1. Form Wizard 패턴

- 복잡한 폼을 4단계로 분리
- 각 단계별 컨텍스트 제공
- 사용자 친화적인 UX

### 2. Zod Validation

```typescript
const projectSchema = z.object({
    title: z.string().min(3).max(200),
    description: z.string().min(10),
    // ...
})
```

- 타입 안전성
- 상세한 에러 메시지
- 런타임 검증

### 3. GitHub API 통합

- URL 파싱
- Rate Limit 처리
- 에러 핸들링

### 4. Multi-Select 컴포넌트

- 검색 기능
- 접근성
- 반응형 디자인

---

## 🎉 완료!

**Day 8-12** 작업이 성공적으로 완료되었습니다! 🎊

이제 사용자가:

1. ✅ 프로젝트를 등록할 수 있습니다
2. ✅ GitHub URL로 자동 완성할 수 있습니다
3. ✅ 상세한 프로젝트 정보를 입력할 수 있습니다
4. ✅ 익명 모드로 등록할 수 있습니다

### 다음 단계 (Day 14)

- 테스트 데이터 생성 (본인 프로젝트 5개 등록)
- 프로젝트 상세 페이지 구현
- 버그 수정 및 리팩토링
- Sprint 1 회고 작성
