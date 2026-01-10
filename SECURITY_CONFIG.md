# Next.js 보안 설정 가이드

## 개요

이 문서는 Next.js 프로젝트의 보안 설정과 보안 헤더에 대한 상세한 설명을 제공합니다.

## 목차

1. [보안 설정](#보안-설정)
2. [보안 헤더](#보안-헤더)
3. [왜 매번 설정해야 하나?](#왜-매번-설정해야-하나)
4. [권장 설정](#권장-설정)

---

## 보안 설정

### 1. `productionBrowserSourceMaps: false`

**의미:**
- 프로덕션 빌드에서 소스맵(.map) 파일을 생성하지 않도록 설정

**왜 필요한가:**
- 소스맵 파일이 있으면 원본 코드 구조가 노출됨
- 공격자가 코드를 역공학하기 쉬워짐
- 난독화된 코드만 배포하여 보안 강화

**현재 설정:**
```typescript
productionBrowserSourceMaps: process.env.NODE_ENV !== 'production'
```

### 2. `poweredByHeader: false`

**의미:**
- `X-Powered-By: Next.js` 헤더를 제거

**왜 필요한가:**
- 프레임워크 정보 노출로 공격 벡터 제공 가능
- 공격자가 특정 프레임워크의 알려진 취약점을 악용할 수 있음

**현재 설정:**
```typescript
poweredByHeader: false
```

### 3. `reactStrictMode: true`

**의미:**
- React의 엄격 모드(Strict Mode) 활성화

**왜 필요한가:**
- 개발 중 잠재적 문제를 조기에 발견
- 안전하지 않은 생명주기 사용 경고
- 레거시 API 사용 경고

**현재 설정:**
```typescript
reactStrictMode: true
```

### 4. `compiler.removeConsole`

**의미:**
- 프로덕션 빌드에서 `console.*` 메서드 제거

**왜 필요한가:**
- 디버깅 정보 노출 방지
- 번들 크기 감소
- 성능 최적화

**현재 설정:**
```typescript
compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
        ? {
              exclude: ['error', 'warn'], // error, warn은 유지
          }
        : false,
}
```

**옵션:**
- `true`: 모든 console 제거
- `{ exclude: ['error', 'warn'] }`: error, warn만 유지 (권장)
- `false`: 제거하지 않음

---

## 보안 헤더

보안 헤더는 웹 서버가 클라이언트(브라우저)에게 전달하는 HTTP 응답 헤더로, 브라우저의 동작을 제어하여 보안 수준을 높입니다.

### 1. `Strict-Transport-Security` (HSTS)

**의미:**
- 브라우저에 HTTPS만 사용하도록 강제하는 헤더

**보호 대상:**
- 중간자 공격(MITM)
- SSL 스트리핑 공격

**설정 예시:**
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**파라미터 설명:**
- `max-age=63072000`: 약 2년간 적용 (초 단위)
- `includeSubDomains`: 모든 서브도메인에 적용
- `preload`: 브라우저 HSTS 프리로드 리스트에 포함 (선택사항)

**주의사항:**
- HTTPS가 완전히 설정된 후에만 활성화해야 함
- 잘못 설정하면 사이트 접근 불가 가능

### 2. `X-Frame-Options`

**의미:**
- 페이지를 iframe에 삽입할 수 있는 출처를 제한

**보호 대상:**
- 클릭재킹(Clickjacking) 공격

**옵션:**
- `DENY`: 모든 iframe 삽입 차단
- `SAMEORIGIN`: 같은 도메인만 허용 (권장)
- `ALLOW-FROM`: 특정 도메인만 허용 (구식, 지원 제한적)

**설정 예시:**
```
X-Frame-Options: SAMEORIGIN
```

**사용 사례:**
- 로그인 페이지: `DENY` 권장
- 일반 페이지: `SAMEORIGIN` 권장

### 3. `X-Content-Type-Options`

**의미:**
- 브라우저가 MIME 타입을 추측하지 못하게 함

**보호 대상:**
- MIME 스니핑(MIME Sniffing) 공격

**설정 예시:**
```
X-Content-Type-Options: nosniff
```

**공격 시나리오:**
- `.txt` 파일을 `.js`로 실행하는 것 방지
- 이미지 파일을 HTML로 실행하는 것 방지

### 4. `X-XSS-Protection`

**의미:**
- 브라우저 내장 XSS 필터 활성화

**보호 대상:**
- 기본적인 XSS(Cross-Site Scripting) 공격

**설정 예시:**
```
X-XSS-Protection: 1; mode=block
```

**옵션:**
- `0`: 필터 비활성화
- `1`: 필터 활성화
- `1; mode=block`: 필터 활성화 및 차단 (권장)

**참고:**
- 최신 브라우저는 CSP(Content-Security-Policy)를 우선시
- 구형 브라우저 지원을 위해 유지 권장

### 5. `Referrer-Policy`

**의미:**
- 리퍼러(Referrer) 정보 전송 정책 설정

**보호 대상:**
- 민감한 URL 정보 유출 방지

**옵션:**
- `no-referrer`: 리퍼러 전송 안 함
- `origin`: 도메인만 전송
- `origin-when-cross-origin`: 같은 도메인은 전체, 다른 도메인은 origin만 (권장)
- `strict-origin-when-cross-origin`: 더 엄격한 정책
- `unsafe-url`: 항상 전체 URL 전송 (보안 위험)

**설정 예시:**
```
Referrer-Policy: origin-when-cross-origin
```

**사용 사례:**
- 일반적인 웹사이트: `origin-when-cross-origin` 권장
- 민감한 정보 처리: `no-referrer` 또는 `strict-origin-when-cross-origin` 권장

### 6. `X-DNS-Prefetch-Control`

**의미:**
- DNS 프리페치 활성화

**효과:**
- 성능 최적화 (보안보다 성능)
- 외부 리소스 로딩 속도 향상

**설정 예시:**
```
X-DNS-Prefetch-Control: on
```

### 7. `Content-Security-Policy` (CSP) - 선택사항

**의미:**
- 스크립트 인젝션 공격(XSS)을 방지하기 위해 리소스 로딩을 제한

**보호 대상:**
- XSS 공격
- 데이터 인젝션 공격

**설정 예시:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

**주의사항:**
- 프로젝트 요구사항에 맞게 세밀하게 설정 필요
- 너무 엄격하면 정상적인 기능이 작동하지 않을 수 있음
- 단계적으로 적용 권장

---

## 왜 매번 설정해야 하나?

### 1. 프로젝트별 요구사항이 다름

**CSP 예시:**
- 허용할 도메인/스크립트가 프로젝트마다 다름
- 외부 라이브러리, CDN, 분석 도구 등에 따라 설정이 달라짐

**X-Frame-Options 예시:**
- 일부 페이지는 iframe 허용이 필요할 수 있음
- 예: 위젯, 임베드 콘텐츠

### 2. 기본값의 부작용 가능

**문제점:**
- 엄격한 기본값이 개발/통합을 방해할 수 있음
- 예: CSP가 너무 엄격하면 개발 중 외부 리소스 로딩 실패

**해결책:**
- 개발 환경과 프로덕션 환경을 구분하여 설정
- 단계적으로 적용

### 3. 유연성 확보

**장점:**
- 경로별로 다른 보안 정책 적용 가능
- 환경별 설정 가능 (개발/스테이징/프로덕션)
- 점진적 적용 가능

**예시:**
```typescript
async headers() {
    return [
        {
            source: '/admin/:path*',
            headers: [
                { key: 'X-Frame-Options', value: 'DENY' },
            ],
        },
        {
            source: '/:path*',
            headers: [
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            ],
        },
    ];
}
```

### 4. 프레임워크의 역할

**Next.js의 접근:**
- 보안 기능을 제공하되, 정책 결정은 개발자에게 위임
- 보안은 선택사항이 아니라 필수이지만, 프로젝트에 맞게 설정해야 함

**비유:**
- 자동차에 안전벨트는 기본 제공되지만, 안전 운전은 운전자의 책임

---

## 권장 설정

### 완전한 설정 예시

```typescript
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shopby-images.cdn-nhncommerce.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    
    // 컴파일러 설정
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production'
            ? {
                  exclude: ['error', 'warn'], // error, warn은 유지
              }
            : false,
    },
    
    // 프로덕션 빌드 최적화
    productionBrowserSourceMaps: false, // 소스맵 비활성화 (보안 및 난독화 강화)
    
    // 보안 설정
    poweredByHeader: false, // X-Powered-By 헤더 제거 (보안)
    
    // React 설정
    reactStrictMode: true, // 개발 시 경고 표시 및 성능 최적화
    
    // 압축 설정
    compress: true, // gzip 압축 (기본값이지만 명시)
    
    // 보안 헤더 설정
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    // CSP는 프로젝트 요구사항에 맞게 추가 설정 필요
                    // {
                    //     key: 'Content-Security-Policy',
                    //     value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
                    // },
                ],
            },
        ];
    },
};

export default nextConfig;
```

### 단계별 적용 가이드

#### 1단계: 기본 보안 설정
```typescript
productionBrowserSourceMaps: false,
poweredByHeader: false,
reactStrictMode: true,
```

#### 2단계: 필수 보안 헤더 추가
```typescript
async headers() {
    return [
        {
            source: '/:path*',
            headers: [
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'X-XSS-Protection', value: '1; mode=block' },
            ],
        },
    ];
}
```

#### 3단계: HTTPS 강제 (HTTPS 설정 완료 후)
```typescript
{
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
}
```

#### 4단계: CSP 추가 (프로젝트 요구사항에 맞게)
```typescript
{
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self'; style-src 'self';",
}
```

---

## 보안 점검 체크리스트

- [ ] `productionBrowserSourceMaps: false` 설정 확인
- [ ] `poweredByHeader: false` 설정 확인
- [ ] `reactStrictMode: true` 설정 확인
- [ ] `removeConsole` 설정 확인
- [ ] `Strict-Transport-Security` 헤더 설정 (HTTPS 완료 후)
- [ ] `X-Frame-Options` 헤더 설정
- [ ] `X-Content-Type-Options` 헤더 설정
- [ ] `X-XSS-Protection` 헤더 설정
- [ ] `Referrer-Policy` 헤더 설정
- [ ] `Content-Security-Policy` 헤더 검토 (선택사항)

---

## 참고 자료

- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [HSTS Preload List](https://hstspreload.org/)

---

## 업데이트 이력

- 2024-XX-XX: 초기 문서 작성

