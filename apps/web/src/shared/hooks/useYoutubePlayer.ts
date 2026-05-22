import { useCallback, useRef } from 'react';

const YOUTUBE_ORIGIN = 'https://www.youtube.com';

export const useYoutubePlayer = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const seekAndPause = useCallback((seconds: number) => {
        const contentWindow = iframeRef.current?.contentWindow;
        if (!contentWindow) return;

        contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'seekTo', args: [seconds, true] }),
            YOUTUBE_ORIGIN,
        );

        // seekTo는 buffering → playing 전환 후 재생을 시작하므로
        // 전환이 완료된 뒤 pauseVideo가 처리되도록 딜레이를 둠
        setTimeout(() => {
            contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                YOUTUBE_ORIGIN,
            );
        }, 500);
    }, []);

    return { iframeRef, seekAndPause };
};
