import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const viewAllLink = recipe({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative',
        transition: 'color 0.2s, font-weight 0.2s',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        textDecoration: 'none',
        '::after': {
            content: '""',
            position: 'absolute',
            right: '0',
            top: '50%',
            width: '5px',
            height: '5px',
            borderTop: '1.2px solid currentColor',
            borderRight: '1.2px solid currentColor',
            transform: 'translateY(-50%) rotate(45deg)',
            marginTop: '0.5px', // 시각적 중앙 보정
            transition: 'transform 0.2s',
        },
    },
});
