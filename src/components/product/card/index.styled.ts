import { css } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { token } from '@/styled-system/tokens';

export const ProductPrice = css({
    fontSize: { base: '1.7rem' },
    fontWeight: '700',
    lineHeight: '1.5',
    letterSpacing: '-1.3%',
    color: token('colors.black'),
});

export const Price = styled('span', {
    base: {
        fontSize: { base: '1.7rem' },
        fontWeight: '700',
        lineHeight: '1.5',
        letterSpacing: '-1.3%',
        color: token('colors.red'),
    },
});
