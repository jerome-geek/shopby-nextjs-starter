import { useEffect } from 'react';

/**
 * 헤더의 실제 높이를 측정하여 CSS 전역 변수(--header-height)로 설정합니다.
 * 이를 통해 CSS에서 var(--header-height)를 사용하여 레이아웃을 정교하게 제어할 수 있습니다.
 */
const useHeaderHeight = () => {
    useEffect(() => {
        const header = document.querySelector('#header') as HTMLElement;
        let resizeObserver: ResizeObserver | null = null;

        if (header) {
            resizeObserver = new ResizeObserver((entries) => {
                requestAnimationFrame(() => {
                    for (const entry of entries) {
                        const height = entry.contentRect.height;
                        document.documentElement.style.setProperty(
                            '--header-height',
                            `${height}px`,
                        );
                    }
                });
            });

            resizeObserver.observe(header);
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, []);
};

export default useHeaderHeight;
