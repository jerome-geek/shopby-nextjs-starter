import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

export const inputFieldStyle = css({
    width: '100%',
    height: { base: '44px', md: '50px' },
    paddingX: '12px',
    paddingY: '16px',
    borderRadius: '8px',
    background: token('colors.white'),
    border: `1px solid ${token('colors.gray50')}`,
    fontSize: 'sm',
    fontWeight: 'medium',
    color: token('colors.black'),
    _placeholder: {
        color: token('colors.gray50'),
    },
    _readOnly: {
        backgroundColor: token('colors.gray20'),
        pointerEvents: 'none',
    },
});
