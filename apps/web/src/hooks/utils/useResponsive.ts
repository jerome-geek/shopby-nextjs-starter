import { useMediaQuery } from 'usehooks-ts';

/**
 * 💡 Vanilla-Extract 방식:
 * Styled-Components처럼 숫자를(px) 조합하는 것이 아니라,
 * .css.ts 파일의 '@media' 키값으로 그대로(import) 던져넣을 수 있게
 * 미디어 쿼리 문자열 전체를 상수로 뽑아두는 것이 정석입니다.
 */
export const mediaQuery = {
    miniMobile: 'screen and (max-width: 375px)',
    mobile: 'screen and (max-width: 768px)',
    tablet: 'screen and (max-width: 1024px)',
    desktop: 'screen and (min-width: 1025px)',
} as const;

export const useResponsive = () => {
    // 정의된 mediaQuery 상수를 훅에서도 재활용
    const isMiniMobile = useMediaQuery(mediaQuery.miniMobile, {
        initializeWithValue: false,
    });
    const isMobile = useMediaQuery(mediaQuery.mobile, {
        initializeWithValue: false,
    });
    const isTablet = useMediaQuery(mediaQuery.tablet, {
        initializeWithValue: false,
    });
    const isDesktop = useMediaQuery(mediaQuery.desktop, {
        initializeWithValue: false,
    });

    return { isMiniMobile, isMobile, isTablet, isDesktop };
};

export default useResponsive;
