# useYoutubePlayer 훅 설계

**날짜**: 2026-05-22  
**대상 파일**: `apps/web/src/pages/recipes/[sno]/index.tsx`

## 배경

레시피 상세 페이지에서 YouTube 영상의 특정 타임스탬프로 이동하는 `seekYoutubeTo` 함수가 `postMessage` 방식으로 구현되어 있다. `seekTo` 이후 영상이 계속 재생되는 문제가 있어, 탐색 후 자동 일시정지가 필요하다.

`postMessage`로 `seekTo` + `pauseVideo`를 동시에 전송하면 `pauseVideo`가 탐색 완료 전에 처리되어 효과가 없다. YouTube IFrame Player API의 공식 메서드를 사용하면 이 문제를 해결할 수 있다.

## 목표

- `seekTo` 후 영상이 자동으로 일시정지되도록 수정
- YT.Player API를 `useYoutubePlayer` 커스텀 훅으로 캡슐화

## 설계

### 훅: `src/shared/hooks/useYoutubePlayer.ts`

```ts
interface UseYoutubePlayerOptions {
    enabled: boolean; // youtube 영상일 때만 초기화
}

interface UseYoutubePlayerReturn {
    iframeRef: React.RefObject<HTMLIFrameElement>;
    seekAndPause: (seconds: number) => void;
}
```

### 내부 동작

1. `enabled && iframeRef.current` 확인
2. `window.YT` 존재 여부로 스크립트 중복 로드 방지
3. `https://www.youtube.com/iframe_api` 스크립트 동적 inject
4. `window.onYouTubeIframeAPIReady` 콜백에서 `new YT.Player(iframeRef.current)` 초기화
5. `playerRef`에 인스턴스 저장

### seekAndPause

```ts
const seekAndPause = (seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    playerRef.current?.pauseVideo();
};
```

YT.Player API는 내부적으로 메시지 큐를 처리하므로 두 메서드 연속 호출이 올바르게 동작한다.

### 기존 콜백 충돌 방지

```ts
const prevCallback = window.onYouTubeIframeAPIReady;
window.onYouTubeIframeAPIReady = () => {
    prevCallback?.();
    initPlayer();
};
```

### 언마운트 정리

```ts
return () => {
    playerRef.current?.destroy();
};
```

## 변경 범위

| 파일 | 변경 내용 |
|------|----------|
| `shared/hooks/useYoutubePlayer.ts` | 신규 생성 |
| `pages/recipes/[sno]/index.tsx` | `youtubeIframeRef` / `seekYoutubeTo` 제거 → 훅으로 교체 |
| `package.json` (devDeps) | `@types/youtube` 추가 |

## 비변경 범위

- `<iframe>` JSX 및 CSS 스타일 유지 (기존 iframe을 YT.Player가 래핑)
- `youtubeEmbedUrl` 생성 로직 유지 (`enablejsapi=1` 이미 포함)
