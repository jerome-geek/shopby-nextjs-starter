# 어드민 모바일 앱 관리 기능 상세 기획

> **상태**: 기획 진행중  
> **대상**: JollyPot Admin (`apps/admin`)  
> **시작 예정**: 현재 프로젝트 오픈 이후  
> **최종 수정**: 2026-04-23

이 문서는 프로젝트 오픈 이후 어드민(Admin) 페이지에 추가될 모바일 앱 관련 기능의 상세 요구사항과 기획 내용을 담고 있습니다.

---

## 1. 개요

### 1.1 배경
모바일 앱 운영에 필요한 핵심 지표(설치수, 주문현황, 푸시 성과)를 어드민 대시보드에서 즉시 파악할 수 있어야 하며, 푸시 메시지 발송 및 성과 분석을 어드민 내에서 일원화하여 운영 효율성을 극대화합니다.

### 1.2 목표
- 대시보드에 앱 운영 핵심 KPI를 실시간 노출
- 푸시 메시지 발송 → 내역 확인 → 성과 분석의 End-to-End 워크플로우 구현
- iOS / AOS 플랫폼별 세분화된 통계 제공

---

## 2. 화면 설계 및 기능 정의

### 2.1 대시보드 (Dashboard)

기존 대시보드(`Home.tsx`)의 **상단에 앱 관련 위젯 영역을 추가**합니다.

#### 2.1.1 앱 다운로드 배너
| 항목 | 설명 |
|------|------|
| 위치 | 대시보드 최상단, 기존 stat cards 위 |
| 내용 | "스토어에서 앱을 다운로드 받으세요." 텍스트 + iOS / Android 버튼 |
| 동작 | 각 버튼 클릭 시 App Store / Google Play 해당 앱 페이지로 이동 (새 탭) |

#### 2.1.2 설치현황 위젯
| 필드 | 타입 | 설명 |
|------|------|------|
| 설치수 | `number` | 통산 ~ 현재 기준 누적 설치수 |
| 기간 필터 | `string` | "통시~현재" (기본값), 향후 기간 선택 지원 |
| 새로고침 | `button` | 수동 데이터 갱신 |

#### 2.1.3 주문현황 위젯
| 필드 | 타입 | 설명 |
|------|------|------|
| 주문건수 | `number` | 최근 7일간 앱을 통한 주문건수 |
| 기간 필터 | `string` | "최근7일" (기본값) |
| 새로고침 | `button` | 수동 데이터 갱신 |

#### 2.1.4 최근 발송 앱푸시 위젯
플랫폼별(iOS / AOS) 주요 지표를 테이블 형태로 표시합니다.

| 필드 | iOS | AOS | 비고 |
|------|-----|-----|------|
| 전송건수 | ✅ | ✅ | 발송 요청된 총 건수 |
| 도달건수 | ✅ | ✅ | 기기에 성공적으로 전달된 건수 |
| 오픈건수 | ✅ | ✅ | 사용자가 푸시를 탭하여 앱 진입한 건수 |
| 미오픈수 | ✅ | ✅ | 도달 - 오픈 |
| 오픈비율(%) | ✅ | ✅ | (오픈 / 도달) × 100 |
| 주문건수 | ✅ | ✅ | 푸시 오픈 후 주문으로 이어진 건수 |
| 매출액 | ✅ | ✅ | 푸시 오픈 후 발생한 매출 총액 |

- 상단에 발송일자 표시 (e.g. `2026-04-23`)
- "더보기" 버튼 → 푸시 발송 내역 페이지로 이동

#### 2.1.5 새로운 소식 위젯
| 필드 | 타입 | 설명 |
|------|------|------|
| 카테고리 | `string` | 업데이트, 공지사항 등 |
| 제목 | `string` | 공지 제목 |
| 날짜 | `date` | 작성일 |

- "더보기" 버튼 → 공지사항 전체 목록 페이지로 이동
- 최근 5건 노출

---

### 2.2 푸시 메시지 관리 (Push Messaging)

#### 2.2.1 푸시 발송 (`AppPushSend`)

**User Flow**:
```
타겟 선택 → 메시지 작성 → 미리보기 확인 → 발송 (즉시 or 예약)
```

**발송 폼 필드 정의**:
| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| 발송 대상 | `select` | ✅ | 전체 / 특정 회원 / 특정 그룹 |
| 대상 목록 | `textarea` | 조건부 | "특정 회원" 선택 시 SNO 쉼표 구분 입력 |
| 제목 | `text` | ✅ | 푸시 알림 제목 (최대 50자) |
| 본문 | `textarea` | ✅ | 푸시 알림 내용 (최대 200자) |
| 이미지 | `url` | ❌ | Rich Push용 이미지 URL |
| 랜딩 URL | `text` | ❌ | 딥링크 또는 앱 내 경로 |
| 발송 시점 | `radio` | ✅ | 즉시 발송 / 예약 발송 |
| 예약 일시 | `datetime` | 조건부 | 예약 발송 선택 시 활성화 |

**미리보기**: 발송 전 iOS / Android 기기별 푸시 노출 형태를 시각적으로 확인 가능.

#### 2.2.2 발송 내역 (`AppPushHistory`)

**리스트 테이블 컬럼**:
| 컬럼 | 설명 |
|------|------|
| 발송 일시 | 예약/즉시 발송 시각 |
| 제목 | 푸시 메시지 타이틀 |
| 대상 | 전체 / 특정 회원 / 그룹명 |
| 상태 | `대기중` · `발송중` · `완료` · `실패` |
| 전송 / 도달 / 오픈 | 각 수치 inline 표시 |

**상세 보기 (Row 클릭 시)**:
- 발송 메시지 원문 (제목, 본문, 이미지)
- 플랫폼별 성과 테이블 (2.1.4와 동일 구조)
- 오픈율 시간대별 분포 차트 (발송 후 1h, 3h, 6h, 12h, 24h)

---

### 2.3 통계 및 분석 (Statistics)

#### 2.3.1 모바일 앱 통계 (`StatsMobileApp`)
| 차트/지표 | 유형 | 설명 |
|-----------|------|------|
| 신규 설치 추이 | Line Chart | 일별/주별/월별 신규 설치수 |
| 삭제(이탈) 추이 | Line Chart | 일별 앱 삭제수 |
| 활성 사용자 | Area Chart | DAU / MAU 추이 |
| 플랫폼 점유율 | Pie/Donut Chart | iOS vs Android 비율 |
| 기간 필터 | Date Range Picker | 최근 7일 / 30일 / 90일 / 사용자 지정 |

#### 2.3.2 앱 푸시 통계 (`StatsPush`)
| 차트/지표 | 유형 | 설명 |
|-----------|------|------|
| 발송 대비 오픈율 추이 | Line Chart | 기간별 평균 오픈율 변화 |
| 시간대별 오픈 분포 | Bar Chart | 발송 후 시간대별 오픈수 분포 → 최적 발송 시간 도출 |
| 푸시 → 주문 전환율 | Funnel Chart | 발송 → 도달 → 오픈 → 주문 퍼널 |
| 매출 기여도 | KPI Card | 푸시를 통한 매출 / 전체 매출 비율 |

---

## 3. 사이드바 메뉴 구조

현재 어드민 사이드바에 아래 메뉴 그룹을 추가합니다.

```
설정
  └ 레시피 설정

앱 관리 ← [NEW]
  ├ 푸시 발송
  └ 발송 내역

통계 ← [NEW]
  ├ 모바일 앱
  └ 앱 푸시

컬렉션 노출 관리
  └ 컬렉션 그룹 관리

레시피 노출 관리
  └ 레시피 그룹 관리

사용자 관리
  ├ 사용자 컬렉션 관리
  └ 사용자 레시피 관리
```

---

## 4. 데이터 모델 및 API 인터페이스 (예상)

### 4.1 앱 설치 통계 API
```
GET /admin/stats/app/installs
Query: { period: 'daily' | 'weekly' | 'monthly', startDate, endDate }
Response: {
  totalInstalls: number,
  data: Array<{ date: string, ios: number, aos: number }>
}
```

### 4.2 푸시 발송 API
```
POST /admin/push/send
Body: {
  target: 'all' | 'members' | 'group',
  memberSnos?: number[],
  groupId?: string,
  title: string,
  body: string,
  imageUrl?: string,
  landingUrl?: string,
  scheduleAt?: string  // ISO 8601, null이면 즉시 발송
}
Response: { pushId: string, status: 'queued' | 'sent' }
```

### 4.3 푸시 발송 내역 API
```
GET /admin/push/history
Query: { page, take, startDate?, endDate? }
Response: {
  count: number,
  data: Array<{
    pushId: string,
    title: string,
    target: string,
    status: 'pending' | 'sending' | 'completed' | 'failed',
    sentAt: string,
    stats: {
      ios: { sent: number, delivered: number, opened: number, orders: number, revenue: number },
      aos: { sent: number, delivered: number, opened: number, orders: number, revenue: number }
    }
  }>
}
```

### 4.4 푸시 통계 API
```
GET /admin/stats/push
Query: { period, startDate, endDate }
Response: {
  avgOpenRate: number,
  totalRevenue: number,
  funnel: { sent: number, delivered: number, opened: number, ordered: number },
  hourlyDistribution: Array<{ hour: number, openCount: number }>
}
```

---

## 5. 기술 사양

| 항목 | 선택 | 비고 |
|------|------|------|
| 푸시 엔진 | Firebase Cloud Messaging (FCM) | iOS APNs는 FCM을 통해 프록시 |
| 차트 라이브러리 | Recharts | React 기반, 번들 사이즈 적절 |
| 상태 관리 | React Query (TanStack Query) | 기존 프로젝트 컨벤션 유지 |
| 폼 관리 | React Hook Form + Zod | 기존 프로젝트 컨벤션 유지 |
| 날짜 선택 | 기존 DatePicker 또는 `react-day-picker` | 기간 필터 UI |

---

## 6. 구현 우선순위

| Phase | 범위 | 예상 공수 |
|-------|------|-----------|
| **Phase 1** | 대시보드 앱 위젯 (설치현황, 주문현황, 앱푸시 요약, 소식) | 3~5일 |
| **Phase 2** | 푸시 발송 폼 + 발송 내역 리스트 | 5~7일 |
| **Phase 3** | 모바일 앱 통계 (설치 추이, 플랫폼 점유율) | 3~5일 |
| **Phase 4** | 앱 푸시 통계 (오픈율 추이, 퍼널, 매출 기여도) | 3~5일 |

---

## 7. Open Questions

- [ ] 푸시 발송 백엔드: 별도 푸시 서버가 있는지, 어드민 API에서 직접 FCM 호출할지?
- [ ] 앱 설치수 데이터 소스: 자체 수집 vs Firebase Analytics vs App Store Connect API?
- [ ] 주문현황: 앱 주문만 분리 가능한 필드가 현재 백엔드에 존재하는지?
- [ ] 새로운 소식: 별도 CMS 연동인지, 어드민 내 직접 작성인지?
- [ ] 딥링크 체계: Universal Links / App Links 설정이 완료되었는지?
