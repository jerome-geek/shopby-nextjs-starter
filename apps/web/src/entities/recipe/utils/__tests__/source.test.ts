import { describe, expect, it } from 'vitest';

import { resolveRecipeMediaVariant } from '../source';

describe('resolveRecipeMediaVariant', () => {
    it('YOUTUBE + sourceId 있으면 youtube 반환', () => {
        expect(
            resolveRecipeMediaVariant('YOUTUBE', 'abc123', 'https://youtu.be/abc123'),
        ).toBe('youtube');
    });

    it('YOUTUBE이지만 sourceId 없으면 external 반환', () => {
        expect(
            resolveRecipeMediaVariant('YOUTUBE', null, 'https://youtu.be/abc123'),
        ).toBe('external');
    });

    it('INSTAGRAM + sourceUrl 있으면 external 반환', () => {
        expect(
            resolveRecipeMediaVariant(
                'INSTAGRAM',
                null,
                'https://www.instagram.com/reel/abc',
            ),
        ).toBe('external');
    });

    it('MANUAL + sourceUrl 없으면 image 반환', () => {
        expect(resolveRecipeMediaVariant('MANUAL', null, null)).toBe('image');
    });

    it('MANUAL + sourceUrl 있으면 external 반환', () => {
        expect(
            resolveRecipeMediaVariant('MANUAL', null, 'https://example.com/recipe'),
        ).toBe('external');
    });

    it('sourceId 빈 문자열이면 youtube로 처리하지 않음', () => {
        expect(
            resolveRecipeMediaVariant('YOUTUBE', '', 'https://youtu.be/abc123'),
        ).toBe('external');
    });
});
