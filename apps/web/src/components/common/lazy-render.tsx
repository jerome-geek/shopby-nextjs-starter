'use client';

import { useInView, UseInViewOptions } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface LazyRenderProps {
    children: ReactNode;
    /** Layout Shift 방지를 위한 최소 높이 (단위: px 또는 string) */
    minHeight?: string | number;
    /** 화면에 보이기 전 미리 로딩할 여백 (기본: 200px) */
    margin?: UseInViewOptions['margin'];
    /** 한 번 보인 이후에도 계속 렌더링 상태를 유지할지 여부 (기본: true) */
    once?: UseInViewOptions['once'];
}

/**
 * 컴포넌트가 뷰포트(화면)에 들어올 때 비로소 렌더링을 시작하는 유틸리티 컴포넌트입니다.
 * motion/react의 useInView를 사용하여 성능 최적화가 되어 있습니다.
 */
function LazyRender({
    children,
    minHeight = 1,
    margin = '200px 0px 200px 0px',
    once = true,
}: LazyRenderProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        margin,
    });

    return (
        <div
            ref={ref}
            style={{
                minHeight: isInView ? 'auto' : minHeight,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {isInView ? children : null}
        </div>
    );
}

export default LazyRender;
