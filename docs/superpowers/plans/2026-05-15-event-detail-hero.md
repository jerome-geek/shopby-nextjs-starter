# EventDetailHero 컴포넌트 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기획전 상세 페이지 상단을 `EventDetailHero` 컴포넌트로 교체 — 좌측 배너 Swiper + 우측 제목/설명, 하단 썸네일(max-width 80%, 가운데)

**Architecture:** `EventDetailHero`가 `useQuery(bannerListOptions)` 로 배너를 클라이언트 사이드에서 독립적으로 조회한다. 배너 로딩이 페이지를 블로킹하지 않으며, 배너 0건이면 제목/설명이 전체폭을 차지한다. `EventDetailView`는 `topSection + EventTop` 블록을 제거하고 `EventDetailHero`를 `.orders.map()` 위에 배치한다.

**Tech Stack:** React, Vanilla Extract (`.css.ts`), `@tanstack/react-query` `useQuery`, `swiper/react`, `@suspensive/react-query`

---

### Task 1: `EventDetailHero` CSS 작성

**Files:**
- Create: `apps/web/src/features/event/detail/components/event-detail-hero/index.css.ts`

- [ ] **Step 1: 파일 생성**

`apps/web/src/features/event/detail/components/event-detail-hero/index.css.ts`:

```ts
import { style } from '@vanilla-extract/css';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

const PC = 'screen and (min-width: 768px)';

export const container = style({
    width: '100%',
    marginBottom: '48px',
});

export const topRow = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media': {
        [PC]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '48px',
        },
    },
});

export const bannerWrapper = style({
    width: '100%',
    aspectRatio: '1 / 1',
    flexShrink: 0,
    '@media': {
        [PC]: {
            width: '40%',
            maxWidth: '486px',
        },
    },
});

export const bannerImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const textContent = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '0 20px',
    '@media': {
        [PC]: {
            padding: '32px 0 0',
        },
    },
});

export const title = style([
    textStyles.display1Semibold,
    {
        color: vars.color.black,
        '@media': {
            [media.mobile]: {
                fontSize: '2.2rem',
                lineHeight: '1.32',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const description = style([
    textStyles.headingMedium,
    {
        color: vars.color.gray[80],
        '@media': {
            [media.mobile]: {
                fontSize: '1.4rem',
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '-2%',
            },
        },
    },
]);

export const thumbnailSection = style({
    marginTop: '32px',
    width: '100%',
});

export const thumbnailPc = style({
    display: 'none',
    maxWidth: '80%',
    margin: '0 auto',
    '@media': {
        [PC]: {
            display: 'block',
            borderRadius: '16px',
        },
    },
});

export const thumbnailMobile = style({
    display: 'block',
    maxWidth: '80%',
    margin: '0 auto',
    '@media': {
        [PC]: {
            display: 'none',
        },
    },
});
```

- [ ] **Step 2: 커밋**

```bash
git add apps/web/src/features/event/detail/components/event-detail-hero/index.css.ts
git commit -m "style: EventDetailHero CSS 추가"
```

---

### Task 2: `EventDetailHero` 컴포넌트 작성

**Files:**
- Create: `apps/web/src/features/event/detail/components/event-detail-hero/index.tsx`

- [ ] **Step 1: 파일 생성**

`apps/web/src/features/event/detail/components/event-detail-hero/index.tsx`:

```tsx
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { bannerListOptions } from '@/entities/banner/queries';
import {
    extractBannerContentsByAccountIndex,
    normalizeImageUrl,
} from '@/shared/utils/shopby';
import * as styles from '@/features/event/detail/components/event-detail-hero/index.css';

import 'swiper/css';
import 'swiper/css/navigation';

interface EventDetailHeroProps {
    eventKey: string | number;
    label: string;
    promotionText?: string;
    pcImageUrl: string;
    mobileImageUrl: string;
}

export const EventDetailHero = ({
    eventKey,
    label,
    promotionText,
    pcImageUrl,
    mobileImageUrl,
}: EventDetailHeroProps) => {
    const { data: bannerData } = useQuery(
        bannerListOptions({ type: 'id', banners: [eventKey.toString()] }),
    );

    const banners = useMemo(
        () =>
            bannerData
                ? extractBannerContentsByAccountIndex(bannerData, 0)
                : [],
        [bannerData],
    );

    const hasThumbnail = pcImageUrl || mobileImageUrl;

    return (
        <div className={styles.container}>
            <div className={styles.topRow}>
                {banners.length > 0 && (
                    <div className={styles.bannerWrapper}>
                        <Swiper
                            modules={[Navigation]}
                            navigation
                            grabCursor
                            loop={banners.length > 1}
                            slidesPerView={1}
                            style={
                                {
                                    width: '100%',
                                    height: '100%',
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-navigation-size': '24px',
                                } as React.CSSProperties
                            }
                        >
                            {banners.map((banner, index) => (
                                <SwiperSlide key={banner.bannerNo || index}>
                                    <img
                                        src={
                                            normalizeImageUrl(
                                                banner.imageUrl || '',
                                            ) || ''
                                        }
                                        alt={banner.name || '배너 이미지'}
                                        className={styles.bannerImage}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

                <div className={styles.textContent}>
                    <h1 className={styles.title}>{label}</h1>
                    {promotionText && (
                        <p className={styles.description}>{promotionText}</p>
                    )}
                </div>
            </div>

            {hasThumbnail && (
                <div className={styles.thumbnailSection}>
                    {pcImageUrl && (
                        <img
                            src={pcImageUrl}
                            alt={label}
                            className={styles.thumbnailPc}
                        />
                    )}
                    {mobileImageUrl && (
                        <img
                            src={mobileImageUrl}
                            alt={label}
                            className={styles.thumbnailMobile}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
```

- [ ] **Step 2: 커밋**

```bash
git add apps/web/src/features/event/detail/components/event-detail-hero/index.tsx
git commit -m "feat: EventDetailHero 컴포넌트 추가"
```

---

### Task 3: `EventDetailView` 에서 `EventTop` → `EventDetailHero` 교체

**Files:**
- Modify: `apps/web/src/pages/events/[eventNoOrId]/index.tsx`

현재 `EventDetailView` 상단 블록:
```tsx
{/* 상단 이미지 + 제목 영역 */}
<div className={styles.topSection}>
    <div className={styles.contentWrapper}>
        <EventTop
            label={eventData.label}
            imgUrlInfo={{
                pc: eventData.pcImageUrl,
                mobile: eventData.mobileimageUrl,
            }}
            promotionText={eventData.promotionText}
        />
    </div>
</div>
```

- [ ] **Step 1: import 교체**

파일 상단 import 블록에서:
```tsx
import EventTop from '@/features/event/detail/components/event-top';
```
를 삭제하고 아래를 추가:
```tsx
import { EventDetailHero } from '@/features/event/detail/components/event-detail-hero';
```

- [ ] **Step 2: topSection 블록 교체**

`EventDetailView` return 내부에서 `topSection` div 전체를 제거하고 `EventDetailHero`로 교체:

```tsx
return (
    <div className={styles.pageContainer}>
        <EventDetailHero
            eventKey={eventKey}
            label={eventData.label}
            promotionText={eventData.promotionText}
            pcImageUrl={eventData.pcImageUrl}
            mobileImageUrl={eventData.mobileimageUrl}
        />

        {eventData.orders.map((order, index) => {
            // ... 기존 코드 그대로 유지
        })}
    </div>
);
```

- [ ] **Step 3: 타입 체크**

```bash
cd apps/web && pnpm tsc --noEmit
```

Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add "apps/web/src/pages/events/[eventNoOrId]/index.tsx"
git commit -m "refactor: 기획전 상세 상단을 EventDetailHero로 교체"
```

---

### Task 4: 브라우저 검증

- [ ] **Step 1: 개발 서버 실행 (이미 실행 중이 아니라면)**

```bash
cd apps/web && pnpm dev
```

- [ ] **Step 2: 기획전 상세 페이지 접속 및 확인**

확인 항목:
1. **배너 있는 경우**: 좌측 Swiper, 우측 제목+설명, 하단 썸네일(80% 너비, 가운데)
2. **배너 없는 경우**: 제목+설명 전체폭, 하단 썸네일
3. **모바일 뷰 (DevTools 375px)**: 배너 전체폭, 제목+설명, 썸네일 80% 가운데
4. **썸네일 없는 경우**: thumbnailSection 미렌더 확인
5. **기존 `.orders.map()` 영역** (TOP 콘텐츠, SECTIONS 탭 등) 정상 렌더 확인
