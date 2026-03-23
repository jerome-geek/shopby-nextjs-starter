# i18n Implementation Summary

## 완료된 작업

### 1. react-i18next 설치
- `react-i18next` 및 `i18next` 패키지 설치 완료

### 2. i18n 설정 파일 생성
- **파일**: `/src/i18n/config.ts`
- 한국어(ko)와 영어(en) 지원
- 기본 언어: 한국어

### 3. 번역 파일 생성
- **한국어**: `/src/i18n/locales/ko.json`
- **영어**: `/src/i18n/locales/en.json`
- 로그인 페이지의 모든 텍스트 번역 포함

### 4. Next.js 앱에 i18n 통합
- `_app.tsx`에 i18n 설정 import 추가
- 앱 전체에서 i18n 사용 가능

### 5. 로그인 페이지 업데이트
- **파일**: `/src/pages/login/index.tsx`
- PandaCSS → vanilla-extract로 스타일 변환
- 모든 하드코딩된 텍스트를 `t()` 함수로 변환
- 번역 키:
  - 로그인
  - 아이디
  - 아이디를 입력해 주세요
  - 비밀번호
  - 비밀번호를 입력해 주세요
  - 아이디 저장
  - 로그인 중...
  - 회원가입
  - 아이디 찾기
  - 비밀번호 찾기
  - 비회원 배송조회

### 6. 언어 전환 컴포넌트 생성
- **파일**: `/src/components/LanguageSwitcher.tsx`
- 한국어/영어 전환 버튼 제공
- vanilla-extract 스타일 사용

### 7. TypeScript 타입 정의
- **파일**: `/src/types/i18next.d.ts`
- i18next의 타입 안전성 강화
- 자동완성 지원

### 8. vanilla-extract 스타일 파일 생성
- **로그인 페이지**: `/src/pages/login/index.css.ts`
- **언어 전환기**: `/src/components/LanguageSwitcher.css.ts`
- PandaCSS에서 vanilla-extract로 완전 마이그레이션

## 사용 방법

### 컴포넌트에서 번역 사용하기
\`\`\`tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
    const { t } = useTranslation();
    
    return <h1>{t('로그인')}</h1>;
}
\`\`\`

### 언어 전환하기
\`\`\`tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

function MyPage() {
    return (
        <div>
            <LanguageSwitcher />
            {/* 나머지 컨텐츠 */}
        </div>
    );
}
\`\`\`

### 프로그래밍 방식으로 언어 변경
\`\`\`tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
    const { i18n } = useTranslation();
    
    const changeToEnglish = () => {
        i18n.changeLanguage('en');
    };
    
    return <button onClick={changeToEnglish}>Change to English</button>;
}
\`\`\`

## 다음 단계

1. **번역 추가**: 다른 페이지의 텍스트를 번역 파일에 추가
2. **언어 전환기 배치**: 헤더나 푸터에 LanguageSwitcher 컴포넌트 추가
3. **로컬 스토리지**: 사용자의 언어 선택을 localStorage에 저장하여 유지
4. **더 많은 언어**: 필요시 일본어, 중국어 등 추가 언어 지원

## 파일 구조
\`\`\`
src/
├── i18n/
│   ├── config.ts          # i18n 설정
│   └── locales/
│       ├── ko.json        # 한국어 번역
│       └── en.json        # 영어 번역
├── types/
│   └── i18next.d.ts       # TypeScript 타입 정의
├── components/
│   ├── LanguageSwitcher.tsx
│   └── LanguageSwitcher.css.ts
└── pages/
    ├── _app.tsx           # i18n 초기화
    └── login/
        ├── index.tsx      # 번역 적용된 로그인 페이지
        └── index.css.ts   # vanilla-extract 스타일
\`\`\`
