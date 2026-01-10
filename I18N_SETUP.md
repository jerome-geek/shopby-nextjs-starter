# i18next 설정 가이드 (최종)

## 설치

```bash
npm install i18next react-i18next i18next-resources-to-backend
```

## 설정 완료된 파일들

1. ✅ `src/i18n/config.ts` - 클라이언트 사이드 i18next 설정 (react-i18next)
2. ✅ `src/i18n/server.ts` - 서버 사이드용 `getTranslation` 유틸리티
3. ✅ `src/providers/I18nProvider.tsx` - 클라이언트 컴포넌트용 Provider
4. ✅ `src/i18n/ko.json`, `src/i18n/en.json` - 번역 리소스 파일

## 환경변수 설정

도메인별/환경별로 `NEXT_PUBLIC_LOCALE`을 설정하여 언어를 결정합니다. (URL 라우팅 방식이 아님)

```bash
# 한국어 환경
NEXT_PUBLIC_LOCALE=ko

# 영어 환경
NEXT_PUBLIC_LOCALE=en
```

## 사용 방법

### 1. 클라이언트 컴포넌트에서 사용

`useTranslation` 훅을 사용합니다.

```tsx
'use client';

import { useTranslation } from 'react-i18next';

export default function ClientComponent() {
    const { t } = useTranslation();

    return <button>{t('로그인')}</button>;
}
```

### 2. 서버 컴포넌트에서 사용 (권장)

`getTranslation` 유틸리티 함수를 사용합니다 (async/await).

```tsx
import { getTranslation } from '@/i18n/server';

export default async function ServerComponent() {
    const { t } = await getTranslation();

    return <h1>{t('환영합니다')}</h1>;
}
```

### 3. 현재 locale 가져오기

```tsx
// 클라이언트
const { i18n } = useTranslation();
console.log(i18n.language);

// 서버
const locale = process.env.NEXT_PUBLIC_LOCALE || 'ko';
```

## 번역 파일 구조

키(Key)는 한국어로 관리하며, 값(Value)만 언어별로 다르게 작성합니다.

```json
// src/i18n/ko.json
{
    "로그인": "로그인",
    "로그아웃": "로그아웃"
}

// src/i18n/en.json
{
    "로그인": "Login",
    "로그아웃": "Logout"
}
```

## 특징 및 장점

-   ✅ **라우팅 독립적**: 정적 도메인 배포에 최적화 (URL에 /ko, /en이 붙지 않음)
-   ✅ **서버 컴포넌트 지원**: `i18next` 인스턴스를 직접 생성하여 RSC에서도 안정적으로 동작
-   ✅ **한국어 키 방식**: 개발 시 번역 키를 기억할 필요 없이 직관적으로 텍스트 작성 가능
-   ✅ **유연한 확장성**: `Promise.all` 등을 활용한 병렬 데이터 페칭 중에도 안전하게 번역 수행

## 스프레드시트 연동 가이드 (추후 계획)

현재는 JSON 파일을 직접 수정하지만, 추후 구글 스프레드시트 API를 연동하여 기획자/UI 디자이너가 직접 번역을 관리할 수 있도록 자동화 스크립트를 구축할 예정입니다.
