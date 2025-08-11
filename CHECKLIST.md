# 🗂 Next.js 초기 세팅 체크리스트

## 1. 환경 세팅
- [x] Next.js 최신 버전 설치 (`npx create-next-app@latest`)
- [ ] ESLint + Prettier 설정
- [ ] `.env` 파일 구조 설계 (`.env.local`, `.env.development`, `.env.production`)
- [ ] TypeScript 사용 여부 결정 (민님은 JSX로 가니까 pass 가능)
- [ ] 절대 경로 설정 (`jsconfig.json` or `tsconfig.json`)

## 2. UI & 스타일
- [ ] UI 라이브러리 선택 (Tailwind, styled-components, emotion 등)
- [x] 공통 컴포넌트 디렉토리 구조 설계 (`/components/common`)
- [ ] 디자인 시스템 / 테마 세팅 (색상, 폰트, spacing)
- [ ] 반응형 breakpoint 정의

## 3. 공통 기능
- [x] API Helper (`fetcher`, `axios` 설정)
- [x] Validation 스키마 (Yup, Zod 등)
- [ ] 로딩 스피너 / 에러 메시지 공통 컴포넌트
- [ ] 날짜/숫자 포맷 유틸

## 4. 상태 관리
- [ ] 상태 관리 툴 결정 (React Query + Context, Zustand, Redux 등)
- [ ] 로그인 상태 / 사용자 정보 저장 구조 설계
- [ ] 다크모드, UI 설정 전역 상태

## 5. 라우팅 & 레이아웃
- [ ] `app` 라우터 구조 설계
- [ ] 공통 레이아웃 (`layout.js`) 구성
- [ ] 페이지별 메타 정보 (SEO) 설정
- [ ] 인증/권한 라우팅 가드

## 6. 인증(Auth)
- [ ] 로그인/로그아웃 API 연동
- [ ] JWT 토큰 저장/갱신 로직
- [ ] 권한(Role)별 접근 제한

## 7. 테스트
- [ ] Jest / Vitest 세팅
- [ ] Cypress / Playwright로 E2E 테스트
- [ ] 핵심 UI/기능 단위 테스트 작성

## 8. 성능 최적화
- [ ] `next/image`로 이미지 최적화
- [ ] 코드 스플리팅 (dynamic import)
- [ ] Prefetch / Preload 적용
- [ ] Lighthouse로 성능 측정

## 9. 배포 & 운영
- [ ] Vercel / Docker / 서버 배포 방식 결정
- [ ] 환경 변수 관리 전략
- [ ] 모니터링 / 에러 로깅 (Sentry 등)
