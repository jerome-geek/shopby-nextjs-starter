# 🎬 페이지 전환 애니메이션 (Page Transitions) 설계

서비스 전반의 부드러운 사용자 경험을 위해 `framer-motion`과 `AnimatePresence`를 활용한 페이지 전환 시스템을 운영합니다.

## 1. 전역 페이지 전환 설정 (`_app.tsx`)

모든 페이지 이동 시 기본적인 Fade & Slide 효과를 적용합니다.

### 🛠️ 구현 방식

```tsx
// src/pages/_app.tsx
<AnimatePresence mode="wait">
    <motion.div
        key={router.asPath} // 핵심: route가 아닌 asPath 사용
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
    >
        <Component {...pageProps} />
    </motion.div>
</AnimatePresence>
```

---

## 2. 주요 고려 사항: `router.route` vs `router.asPath`

### ❌ `router.route` 사용 시 문제점 (Catch-all Routes)

- **증상**: `/shop`, `/shop/life`, `/shop/kids` 간 이동 시 애니메이션이 동작하지 않음.
- **원인**: 위 경로들은 모두 동일한 물리 파일(`pages/shop/[[...slug]].tsx`)을 공유하므로 `router.route` 값이 동일하게 유지됨. `framer-motion`은 키값이 바뀌지 않으면 애니메이션을 실행하지 않음.

### ✅ `router.asPath` 사용 시 장점

- **해결**: 실제 브라우저 주소창의 경로가 키값이 되므로, 동일한 파일을 공유하는 다이내믹 라우트 간 전환 시에도 애니메이션이 정상 작동함.

---

## 3. 세부 리스트/탭 전환 최적화 (`scroll={false}`)

쇼핑몰 메인 탭 전환과 같이 **'페이지는 바뀌지만 시각적으로는 같은 레이아웃 내의 탭 전환'**처럼 느껴져야 하는 경우 다음과 같은 설정을 권장합니다.

### 1) Link 태그 스크롤 고정

페이지 전환 시 화면이 최상단으로 튀는 현상을 방지하여 탭 전환 같은 부드러움을 유지합니다.

```tsx
<Link href="/shop/life" scroll={false}>
    라이프
</Link>
```

### 2) 내부 컴포넌트 전용 애니메이션 (고급)

전역 애니메이션(`_app.tsx`) 외에 특정 섹션만 부드럽게 갈아끼우고 싶을 경우, 해당 페이지 내부에서 `AnimatePresence`를 한 번 더 사용하고 고유한 `key`(예: `type`, `category`)를 부여합니다.

---

## 4. 트러블슈팅 및 가이드라인

- **깜빡임 현상**: `AnimatePresence`의 `mode="wait"` 속성은 이전 컴포넌트가 완전히 사라진 후 새 컴포넌트를 그리므로 겹침 현상을 방지합니다.
- **성능**: 페이지 전환 애니메이션은 LCP(Largest Contentful Paint) 수치에 영향을 줄 수 있으므로 `duration`은 `0.2s ~ 0.3s` 사이를 권장합니다.
- **쿼리 파라미터 대응**: `asPath` 사용 시 `?page=1` 같은 쿼리 변경에도 애니메이션이 발생할 수 있습니다. 이를 방지하려면 `router.asPath.split('?')[0]`과 같은 전처리가 필요할 수 있습니다.
