import { style } from '@vanilla-extract/css';
import type { StyleRule } from '@vanilla-extract/css';

/**
 * 반응형 @media 쿼리 내부에서 스프레드할 수 있는 순수 스타일 토큰 객체.
 * textStyles는 이미 컴파일된 클래스명이라 @media에서 직접 쓸 수 없으므로
 * 이 객체를 통해 스타일을 재사용하세요.
 *
 * @example
 * export const myStyle = style([
 *   textStyles.body1Semibold, // 기본값
 *   {
 *     '@media': {
 *       [media.desktop]: { ...textStyleTokens.headlineSemibold },
 *     },
 *   },
 * ]);
 */
export const textStyleTokens = {
    display1Semibold: { fontSize: '3.6rem', fontWeight: 700, lineHeight: '1.32', letterSpacing: '-2%' },
    display2Bold: { fontSize: '3rem', fontWeight: 700, lineHeight: '1.32', letterSpacing: '-2%' },
    display2Semibold: { fontSize: '3rem', fontWeight: 600, lineHeight: '1.32', letterSpacing: '-2%' },
    title1Bold: { fontSize: '2.2rem', fontWeight: 700, lineHeight: '1.32', letterSpacing: '-2%' },
    title1Semibold: { fontSize: '2.2rem', fontWeight: 600, lineHeight: '1.32', letterSpacing: '-2%' },
    title2Semibold: { fontSize: '2rem', fontWeight: 600, lineHeight: '1.4', letterSpacing: '-0.5%' },
    headingBold: { fontSize: '1.8rem', fontWeight: 700, lineHeight: '1.5', letterSpacing: '-1.3%' },
    headingSemibold: { fontSize: '1.8rem', fontWeight: 600, lineHeight: '1.5', letterSpacing: '-1.3%' },
    headingMedium: { fontSize: '1.8rem', fontWeight: 500, lineHeight: '1.5', letterSpacing: '-1.3%' },
    headlineBold: { fontSize: '1.5rem', fontWeight: 700, lineHeight: '1.4', letterSpacing: '-0.2%' },
    headlineSemibold: { fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.4', letterSpacing: '-0.2%' },
    headlineMedium: { fontSize: '1.5rem', fontWeight: 500, lineHeight: '1.4', letterSpacing: '-0.2%' },
    headlineRegular: { fontSize: '1.5rem', fontWeight: 400, lineHeight: '1.4', letterSpacing: '-0.2%' },
    body1Bold: { fontSize: '1.4rem', fontWeight: 700, lineHeight: '1.4', letterSpacing: '-1.3%' },
    body1Semibold: { fontSize: '1.4rem', fontWeight: 600, lineHeight: '1.4', letterSpacing: '-1.3%' },
    body1Medium: { fontSize: '1.4rem', fontWeight: 500, lineHeight: '1.4', letterSpacing: '-2%' },
    body1Regular: { fontSize: '1.4rem', fontWeight: 400, lineHeight: '1.4', letterSpacing: '-2%' },
    body2Semibold: { fontSize: '1.3rem', fontWeight: 600, lineHeight: '1.3', letterSpacing: '-1.3%' },
    body2Medium: { fontSize: '1.3rem', fontWeight: 500, lineHeight: '1.3', letterSpacing: '-1.3%' },
    body2Regular: { fontSize: '1.3rem', fontWeight: 400, lineHeight: '1.3', letterSpacing: '-1.3%' },
    caption1Semibold: { fontSize: '1.2rem', fontWeight: 600, lineHeight: '1.4', letterSpacing: '-2%' },
    caption1Regular: { fontSize: '1.2rem', fontWeight: 400, lineHeight: '1.4', letterSpacing: '-2%' },
    caption2Semibold: { fontSize: '1rem', fontWeight: 600, lineHeight: '1.4', letterSpacing: '-0.2%' },
    caption2Regular: { fontSize: '1rem', fontWeight: 400, lineHeight: '1.4', letterSpacing: '-0.2%' },
} satisfies Record<string, StyleRule>;

/** 기존 코드와 100% 호환되는 컴파일된 클래스명 모음 */
export const textStyles = (Object.keys(textStyleTokens) as Array<keyof typeof textStyleTokens>).reduce(
    (acc, key) => {
        acc[key] = style(textStyleTokens[key]);
        return acc;
    },
    {} as Record<keyof typeof textStyleTokens, string>,
);
