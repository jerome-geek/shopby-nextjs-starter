# 기획전 상세 페이지 — EventDetailHero 컴포넌트 설계

## 목표

기획전 상세 페이지 상단 영역을 재구성한다.
- 기존 `EventTop` (썸네일 좌 + 제목 우)을 `EventDetailHero`로 교체
- 상단: 배너 Swiper (좌) + 제목/설명 (우) — 배너 없으면 제목/설명만
- 하단: 썸네일 (max-width 80%, 가운데 정렬)
- `EventTop` 파일 및 `getStaticProps`는 수정하지 않음

---

## 새 컴포넌트: `EventDetailHero`

**경로:** `apps/web/src/features/event/detail/components/event-detail-hero/`  
**파일:** `index.tsx`, `index.css.ts`

### Props

```ts
interface EventDetailHeroProps {
    eventKey: string | number;
    label: string;
    promotionText?: string;
    pcImageUrl: string;
    mobileImageUrl: string;
}
```

### 데이터 페칭

컴포넌트 내부에서 `useQuery(bannerListOptions({ type: 'id', banners: [eventKey.toString()] }))` 호출.
- 배너는 비동기 로딩, 페이지 렌더를 블로킹하지 않음
- `data` 없거나 배너 0건이면 배너 영역 렌더 생략

배너 콘텐츠 추출: `extractBannerContentsByAccountIndex(bannerData, 0)`

### 레이아웃

**PC (`min-width: 768px`):**
```
┌──────────────────────────────────────────────┐
│  [배너 Swiper ~40%]  │  [제목 + 설명]         │
├──────────────────────────────────────────────┤
│       [썸네일 - max-width: 80%, 가운데]       │
└──────────────────────────────────────────────┘
```

- 상단 row: EventTop과 동일한 좌/우 분할 (배너 영역 `flex-shrink: 0`, `width: 40%`, `max-width: 486px`)
- 배너 없을 때: 배너 영역 미렌더, 제목/설명이 전체폭 차지
- 하단 썸네일: `max-width: 80%`, `margin: 0 auto`, `display: block`

**모바일:**
```
┌──────────────────────────────────────┐
│      [배너 Swiper - 전체폭]           │
│      [제목 + 설명]                    │
│      [썸네일 - max-width: 80%]        │
└──────────────────────────────────────┘
```

- 상단 row → 세로 스택
- 배너: 전체폭 (`width: 100%`)
- 썸네일: `max-width: 80%`, `margin: 0 auto`

### 배너 Swiper 스펙

EventCard와 동일한 설정:
- `modules={[Navigation]}`, `navigation`, `grabCursor`
- `loop={banners.length > 1}`, `slidesPerView={1}`
- 이미지: `normalizeImageUrl(banner.imageUrl)` 처리
- 배너 클릭 시 링크 없음 (상세 페이지 내부이므로)

### 썸네일 표시

- PC: `pcImageUrl` 사용 (`display: block` on PC, `display: none` on mobile)
- 모바일: `mobileImageUrl` 사용 (`display: none` on PC, `display: block` on mobile)
- 둘 다 없으면 썸네일 영역 미렌더 (`:empty` 처리)

---

## `EventDetailView` 변경

**경로:** `apps/web/src/pages/events/[eventNoOrId]/index.tsx`

### 변경 전
```tsx
const EventDetailView = ({ eventKey, searchParams }) => {
    const { data: eventData } = useEvent({ eventKey, searchParams });
    return (
        <div className={styles.pageContainer}>
            <div className={styles.topSection}>
                <div className={styles.contentWrapper}>
                    <EventTop label={...} imgUrlInfo={...} promotionText={...} />
                </div>
            </div>
            {eventData.orders.map(...)}
        </div>
    );
};
```

### 변경 후
```tsx
const EventDetailView = ({ eventKey, searchParams }) => {
    const { data: eventData } = useEvent({ eventKey, searchParams });
    return (
        <div className={styles.pageContainer}>
            <EventDetailHero
                eventKey={eventKey}
                label={eventData.label}
                promotionText={eventData.promotionText}
                pcImageUrl={eventData.pcImageUrl}
                mobileImageUrl={eventData.mobileimageUrl}
            />
            {eventData.orders.map(...)}
        </div>
    );
};
```

- `topSection` div 및 `EventTop` import 제거
- `useEvent` hook 유지
- `orders.map()` 블록 수정 없음

---

## 수정하지 않는 것

| 항목 | 이유 |
|---|---|
| `EventTop` 컴포넌트 | 다른 곳에서 사용 가능성, 요구사항 외 |
| `getStaticProps` | 배너는 클라이언트 사이드 로딩으로 충분 |
| `orders.map()` 렌더링 | 변경 범위 외 |
| `index.css.ts` (page) | `topSection` 스타일은 남겨두되 사용 안 함 |

---

## 파일 변경 요약

| 파일 | 변경 유형 |
|---|---|
| `features/event/detail/components/event-detail-hero/index.tsx` | 신규 생성 |
| `features/event/detail/components/event-detail-hero/index.css.ts` | 신규 생성 |
| `pages/events/[eventNoOrId]/index.tsx` | `EventTop` → `EventDetailHero` 교체 |
