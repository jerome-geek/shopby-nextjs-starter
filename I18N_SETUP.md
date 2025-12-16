# next-intl 설정 가이드 (최종)

## 설치

```bash
npm install next-intl
# intlayer 제거 (선택사항)
npm uninstall intlayer next-intlayer
```

## 설정 완료된 파일들

1. ✅ `src/i18n.ts` - next-intl 설정 파일 (환경변수 기반)
2. ✅ `next.config.ts` - next-intl 플러그인 추가
3. ✅ `src/i18n/ko.json`, `src/i18n/en.json` - 번역 파일 (키는 한국어로 관리)

## 환경변수 설정

도메인별로 배포할 때 환경변수로 locale 설정:

```bash
# 한국어 도메인
NEXT_PUBLIC_LOCALE=ko

# 영어 도메인
NEXT_PUBLIC_LOCALE=en
```

## 사용 방법

### 1. 클라이언트 컴포넌트에서 번역 사용

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
    const t = useTranslations();
    
    return <button>{t('로그인')}</button>;
}
```

### 2. 서버 컴포넌트에서 번역 사용 (권장)

```tsx
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
    const t = await getTranslations();
    
    return <h1>{t('환영합니다')}</h1>;
}
```

### 3. 현재 locale 가져오기

```tsx
import { useLocale } from 'next-intl';

export default function Component() {
    const locale = useLocale(); // 'ko' or 'en'
    return <div>Current locale: {locale}</div>;
}
```

## Message 파일 구조

키는 한국어로 관리하며, 값만 언어별로 다릅니다:

```json
// src/i18n/ko.json
{
    "로그인": "로그인",
    "로그아웃": "로그아웃",
    "제목": "제목",
    "설명": "설명"
}

// src/i18n/en.json
{
    "로그인": "Login",
    "로그아웃": "Logout",
    "제목": "Welcome to Next.js!",
    "설명": "Get started by editing src/app/page.tsx"
}
```

## 특징

- ✅ **라우팅 없음**: URL에 locale이 포함되지 않음
- ✅ **도메인별 배포**: 환경변수로 locale 결정
- ✅ **한국어 키**: message 파일의 키는 한국어로 관리
- ✅ **서버 컴포넌트 완벽 지원**: `getTranslations`로 서버 컴포넌트에서 사용 가능
- ✅ **작은 번들 크기**: ~5KB (gzipped)
- ✅ **타입 안전성**: TypeScript로 번역 키 타입 체크
- ✅ **안정성**: 검증된 라이브러리, 큰 커뮤니티
- ✅ **장기 유지보수**: 지속적인 업데이트와 지원

## 구글 스프레드시트 연동 (추후 구현)

구글 스프레드시트에서 번역을 관리하려면:

1. Google Sheets API 사용
2. 스프레드시트 → JSON 변환 스크립트 작성
3. CI/CD 파이프라인에 통합

예시 스크립트:
```typescript
// scripts/sync-translations.ts
// 구글 스프레드시트 → src/i18n/*.json 변환
```

## 문제 해결

### 타입 에러 발생 시
```bash
npm install next-intl
```

### 번역이 적용되지 않을 때
1. 환경변수 `NEXT_PUBLIC_LOCALE` 확인
2. `src/i18n.ts` 파일 경로 확인
3. JSON 파일 형식 확인
