# 404 Grave 🪦

사라진 오픈소스 프로젝트를 추모하고 부활시키는 플랫폼

![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.75-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## 📖 프로젝트 소개

**404 Grave**는 GitHub에서 사라진(404 Not Found) 오픈소스 프로젝트를 수집하고, 커뮤니티의 도움으로 다시 살려내는 플랫폼입니다. 프로젝트가 "사망"한 이유와 배경을 기록하고, 다른 개발자들이 이를 "부활"시킬 수 있도록 돕습니다.

### 주요 기능

- 🪦 **프로젝트 수집**: 사라진 오픈소스 프로젝트를 발견하고 등록
- 📝 **사망 진단**: 프로젝트가 사라진 이유와 배경 기록
- 💡 **부활 지원**: 커뮤니티의 도움으로 프로젝트를 다시 살려내기
- 👤 **사용자 프로필**: 자신의 활동과 기여를 추적
- 📊 **대시보드**: 프로젝트 통계 및 관리

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- Bun (권장) 또는 npm/yarn
- Supabase 계정

### 설치 및 실행

1. **저장소 클론**

```bash
git clone https://github.com/yourusername/404-grave.git
cd 404-grave
```

2. **의존성 설치**

```bash
bun install
# 또는
npm install
```

3. **환경 변수 설정**

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# GitHub OAuth (선택사항)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth (선택사항)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. **개발 서버 실행**

```bash
bun dev
# 또는
npm run dev
```

5. **브라우저에서 열기**

```
http://localhost:3000
```

## 🏗️ 프로젝트 구조

```
404-grave/
├── app/                      # Next.js App Router
│   ├── api/                  # API 라우트
│   │   ├── auth/             # 인증 API
│   │   └── github/           # GitHub 연동 API
│   ├── auth/                 # 인증 페이지
│   ├── dashboard/            # 대시보드
│   ├── profile/               # 사용자 프로필
│   ├── projects/              # 프로젝트 페이지
│   └── page.tsx              # 홈 페이지
├── components/
│   ├── layout/                # 레이아웃 컴포넌트
│   │   ├── header.tsx        # 헤더
│   │   ├── footer.tsx        # 푸터
│   │   └── pageLayout.tsx    # 페이지 레이아웃
│   └── ui/                    # UI 컴포넌트
│       ├── button.tsx        # 버튼
│       ├── projectCard.tsx   # 프로젝트 카드
│       ├── tombstoneIcon.tsx # 묘비 아이콘
│       ├── emptyState.tsx   # 빈 상태
│       └── skeleton.tsx      # 로딩 스켈레톤
├── hooks/
│   └── useAuth.ts            # 인증 훅
├── lib/
│   ├── supabase/             # Supabase 설정
│   │   ├── client.ts         # 클라이언트 설정
│   │   ├── server.ts         # 서버 설정
│   │   └── middleware.ts     # 미들웨어
│   └── utils.ts              # 유틸리티 함수
└── types/                     # TypeScript 타입 정의
```

## 🛠️ 기술 스택

### Frontend

- **Next.js 15.5** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS 4.0** - 스타일링
- **Lucide React** - 아이콘
- **Framer Motion** - 애니메이션
- **Sonner** - 토스트 알림

### Backend & Database

- **Supabase** - 백엔드 및 데이터베이스
- **Supabase Auth** - 인증 시스템
- **PostgreSQL** - 데이터베이스

### 개발 도구

- **Bun** - 패키지 매니저
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅

## 🔐 인증

404 Grave는 다음과 같은 인증 방식을 지원합니다:

- **Email/Password** - 전통적인 이메일 비밀번호 인증
- **GitHub OAuth** - GitHub 계정으로 로그인
- **Google OAuth** - Google 계정으로 로그인

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🤝 기여하기

기여를 환영합니다! 프로젝트를 개선하기 위해:

1. 이 저장소를 포크하세요
2. 새로운 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📞 문의

문제가 있거나 제안사항이 있다면 [Issues](https://github.com/yourusername/404-grave/issues)에 등록해주세요.

## 🙏 감사의 말

이 프로젝트는 사라진 오픈소스 프로젝트에 대한 관심과 존경을 바탕으로 만들어졌습니다. 모든 오픈소스 기여자들에게 감사드립니다.

---

Made with 💀 by the 404 Grave team
