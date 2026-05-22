# useYoutubePlayer 훅 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `postMessage` 방식의 YouTube seek 로직을 YT.Player API 기반 커스텀 훅으로 교체하여, 타임스탬프 이동 후 영상이 자동 일시정지되도록 수정한다.

**Architecture:** `useYoutubePlayer` 훅이 YouTube IFrame API 스크립트 로딩·플레이어 초기화·seekAndPause를 캡슐화한다. 페이지 컴포넌트는 기존 `<iframe>` JSX를 유지하되 ref와 seek 함수만 훅으로 교체한다. YT.Player가 기존 iframe 엘리먼트를 래핑하는 방식을 사용한다.

**Tech Stack:** React (useRef, useEffect), YouTube IFrame Player API (`window.YT`), `@types/youtube`, Vitest + @testing-library/react (jsdom)

---

## 파일 구조

| 구분 | 경로 |
|------|------|
| 신규 생성 | `apps/web/src/shared/hooks/useYoutubePlayer.ts` |
| 신규 생성 | `apps/web/src/shared/hooks/__tests__/useYoutubePlayer.test.ts` |
| 수정 | `apps/web/src/pages/recipes/[sno]/index.tsx` |
| 수정 | `apps/web/package.json` (devDeps) |

---

## Task 1: `@types/youtube` 설치

**Files:**
- Modify: `apps/web/package.json`

- [ ] **Step 1: devDependency 설치**

```bash
cd apps/web && pnpm add -D @types/youtube
```

Expected: `package.json`의 `devDependencies`에 `"@types/youtube"` 항목 추가됨.

- [ ] **Step 2: 타입 로드 확인**

```bash
cd apps/web && npx tsc --noEmit 2>&1 | grep -i youtube | head -5
```

Expected: youtube 관련 타입 에러 없음 (출력 없음).

- [ ] **Step 3: 커밋**

```bash
git add apps/web/package.json apps/web/pnpm-lock.yaml
git commit -m "chore: @types/youtube devDependency 추가"
```

---

## Task 2: `useYoutubePlayer` 훅 구현 (TDD)

**Files:**
- Create: `apps/web/src/shared/hooks/__tests__/useYoutubePlayer.test.ts`
- Create: `apps/web/src/shared/hooks/useYoutubePlayer.ts`

### Step 1: 실패하는 테스트 작성

- [ ] `apps/web/src/shared/hooks/__tests__/useYoutubePlayer.test.ts` 생성

```ts
import { act, render, screen } from '@testing-library/react';
import { useEffect, useRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useYoutubePlayer } from '@/shared/hooks/useYoutubePlayer';

const mockSeekTo = vi.fn();
const mockPauseVideo = vi.fn();
const mockDestroy = vi.fn();
const MockPlayer = vi.fn(() => ({
    seekTo: mockSeekTo,
    pauseVideo: mockPauseVideo,
    destroy: mockDestroy,
}));

// 훅을 실제 iframe과 함께 렌더링하는 테스트용 컴포넌트
const TestComponent = ({
    enabled,
    onReady,
}: {
    enabled: boolean;
    onReady?: (seekAndPause: (s: number) => void) => void;
}) => {
    const { iframeRef, seekAndPause } = useYoutubePlayer({ enabled });

    useEffect(() => {
        onReady?.(seekAndPause);
    }, [onReady, seekAndPause]);

    return enabled ? (
        <iframe ref={iframeRef} data-testid='yt-iframe' />
    ) : (
        <div />
    );
};

describe('useYoutubePlayer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, 'YT', {
            value: { Player: MockPlayer },
            writable: true,
            configurable: true,
        });
    });

    it('enabled=false이면 YT.Player를 초기화하지 않는다', () => {
        render(<TestComponent enabled={false} />);
        expect(MockPlayer).not.toHaveBeenCalled();
    });

    it('enabled=true이고 iframe이 마운트되면 YT.Player를 초기화한다', () => {
        render(<TestComponent enabled={true} />);
        const iframe = screen.getByTestId('yt-iframe');
        expect(MockPlayer).toHaveBeenCalledWith(iframe);
    });

    it('seekAndPause는 seekTo(seconds, true)와 pauseVideo를 순서대로 호출한다', () => {
        let capturedSeekAndPause: ((s: number) => void) | undefined;
        render(
            <TestComponent
                enabled={true}
                onReady={(fn) => {
                    capturedSeekAndPause = fn;
                }}
            />,
        );

        act(() => {
            capturedSeekAndPause?.(30);
        });

        expect(mockSeekTo).toHaveBeenCalledWith(30, true);
        expect(mockPauseVideo).toHaveBeenCalled();
        expect(mockSeekTo.mock.invocationCallOrder[0]).toBeLessThan(
            mockPauseVideo.mock.invocationCallOrder[0],
        );
    });

    it('언마운트 시 player.destroy()를 호출한다', () => {
        const { unmount } = render(<TestComponent enabled={true} />);
        unmount();
        expect(mockDestroy).toHaveBeenCalled();
    });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
cd apps/web && pnpm test:run src/shared/hooks/__tests__/useYoutubePlayer.test.ts
```

Expected: FAIL — `Cannot find module '@/shared/hooks/useYoutubePlayer'`

### Step 3: 훅 구현

- [ ] `apps/web/src/shared/hooks/useYoutubePlayer.ts` 생성

```ts
import { useEffect, useRef } from 'react';

interface UseYoutubePlayerOptions {
    enabled: boolean;
}

export const useYoutubePlayer = ({ enabled }: UseYoutubePlayerOptions) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const playerRef = useRef<YT.Player | null>(null);

    useEffect(() => {
        if (!enabled || !iframeRef.current) return;

        const iframe = iframeRef.current;

        const initPlayer = () => {
            playerRef.current = new window.YT.Player(iframe);
        };

        if (window.YT?.Player) {
            initPlayer();
        } else {
            const prevCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                prevCallback?.();
                initPlayer();
            };

            if (
                !document.querySelector(
                    'script[src="https://www.youtube.com/iframe_api"]',
                )
            ) {
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                document.head.appendChild(script);
            }
        }

        return () => {
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, [enabled]);

    const seekAndPause = (seconds: number) => {
        if (!playerRef.current) return;
        playerRef.current.seekTo(seconds, true);
        playerRef.current.pauseVideo();
    };

    return { iframeRef, seekAndPause };
};
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
cd apps/web && pnpm test:run src/shared/hooks/__tests__/useYoutubePlayer.test.ts
```

Expected: PASS (4 tests)

- [ ] **Step 5: 커밋**

```bash
git add apps/web/src/shared/hooks/useYoutubePlayer.ts apps/web/src/shared/hooks/__tests__/useYoutubePlayer.test.ts
git commit -m "feat: useYoutubePlayer 훅 추가 (YT.Player API 기반 seek+pause)"
```

---

## Task 3: 레시피 상세 페이지 교체

**Files:**
- Modify: `apps/web/src/pages/recipes/[sno]/index.tsx`

- [ ] **Step 1: 기존 코드 제거 및 훅 교체**

`apps/web/src/pages/recipes/[sno]/index.tsx`에서 아래 내용을 수정한다.

**제거할 import:**
```ts
import { useRef } from 'react';
```
→ `useRef`를 더 이상 직접 사용하지 않으므로 제거. (다른 곳에서 사용하지 않는지 확인 후)

**추가할 import:**
```ts
import { useYoutubePlayer } from '@/shared/hooks/useYoutubePlayer';
```

**제거할 선언 (RecipeDetailContent 내부):**
```ts
const youtubeIframeRef = useRef<HTMLIFrameElement | null>(null);
```
```ts
const seekYoutubeTo = (seconds: number) => {
    const contentWindow = youtubeIframeRef.current?.contentWindow;

    if (!contentWindow) {
        return;
    }

    contentWindow.postMessage(
        JSON.stringify({
            event: 'command',
            func: 'seekTo',
            args: [seconds, true],
        }),
        'https://www.youtube.com',
    );

    // contentWindow.postMessage(
    //     JSON.stringify({
    //         event: 'command',
    //         func: 'pauseVideo',
    //         args: [],
    //     }),
    //     'https://www.youtube.com',
    // );
};
```

**추가할 선언 (RecipeDetailContent 내부, 기존 변수 선언부 근처):**
```ts
const { iframeRef, seekAndPause } = useYoutubePlayer({ enabled: isYoutube });
```

**수정할 JSX — iframe ref 교체:**
```tsx
// 변경 전
<iframe
    ref={youtubeIframeRef}
    ...
/>

// 변경 후
<iframe
    ref={iframeRef}
    ...
/>
```

**수정할 JSX — seek 호출 교체:**
```tsx
// 변경 전
onClick={() => seekYoutubeTo(step.timestampSeconds ?? 0)}

// 변경 후
onClick={() => seekAndPause(step.timestampSeconds ?? 0)}
```

- [ ] **Step 2: 타입 에러 확인**

```bash
cd apps/web && npx tsc --noEmit 2>&1 | grep "recipes/\[sno\]"
```

Expected: 출력 없음 (에러 없음)

- [ ] **Step 3: 전체 테스트 통과 확인**

```bash
cd apps/web && pnpm test:run
```

Expected: All tests PASS

- [ ] **Step 4: 커밋**

```bash
git add apps/web/src/pages/recipes/\[sno\]/index.tsx
git commit -m "refactor: YouTube seek 로직을 useYoutubePlayer 훅으로 교체"
```
