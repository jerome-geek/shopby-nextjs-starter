import { act, render } from '@testing-library/react';
import { useEffect } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useYoutubePlayer } from '@/shared/hooks/useYoutubePlayer';

const TestComponent = ({
    onReady,
}: {
    onReady?: (result: ReturnType<typeof useYoutubePlayer>) => void;
}) => {
    const hookResult = useYoutubePlayer();

    useEffect(() => {
        onReady?.(hookResult);
    }, [onReady, hookResult]);

    return <iframe ref={hookResult.iframeRef} data-testid='yt-iframe' />;
};

describe('useYoutubePlayer', () => {
    let mockPostMessage: ReturnType<typeof vi.fn>;
    let mockContentWindow: Window;
    let capturedResult: ReturnType<typeof useYoutubePlayer> | undefined;

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        mockPostMessage = vi.fn();
        mockContentWindow = { postMessage: mockPostMessage } as unknown as Window;

        render(<TestComponent onReady={(r) => (capturedResult = r)} />);

        Object.defineProperty(capturedResult!.iframeRef, 'current', {
            value: { contentWindow: mockContentWindow },
            writable: true,
            configurable: true,
        });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('iframeRef.current가 없으면 아무것도 하지 않는다', () => {
        Object.defineProperty(capturedResult!.iframeRef, 'current', {
            value: null,
            writable: true,
            configurable: true,
        });

        act(() => capturedResult!.seekAndPause(30));

        expect(mockPostMessage).not.toHaveBeenCalled();
    });

    it('seekAndPause 호출 시 즉시 seekTo postMessage를 전송한다', () => {
        act(() => capturedResult!.seekAndPause(45));

        expect(mockPostMessage).toHaveBeenCalledWith(
            JSON.stringify({ event: 'command', func: 'seekTo', args: [45, true] }),
            'https://www.youtube.com',
        );
    });

    it('seekTo 전송 직후에는 pauseVideo를 전송하지 않는다', () => {
        act(() => capturedResult!.seekAndPause(45));

        expect(mockPostMessage).toHaveBeenCalledTimes(1);
        expect(mockPostMessage).not.toHaveBeenCalledWith(
            expect.stringContaining('pauseVideo'),
            expect.anything(),
        );
    });

    it('500ms 후 pauseVideo postMessage를 전송한다', () => {
        act(() => capturedResult!.seekAndPause(45));
        act(() => vi.advanceTimersByTime(500));

        expect(mockPostMessage).toHaveBeenCalledWith(
            JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
            'https://www.youtube.com',
        );
    });

    it('seekTo → pauseVideo 순서로 전송된다', () => {
        act(() => capturedResult!.seekAndPause(45));
        act(() => vi.advanceTimersByTime(500));

        expect(mockPostMessage).toHaveBeenNthCalledWith(
            1,
            JSON.stringify({ event: 'command', func: 'seekTo', args: [45, true] }),
            'https://www.youtube.com',
        );
        expect(mockPostMessage).toHaveBeenNthCalledWith(
            2,
            JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
            'https://www.youtube.com',
        );
    });
});
