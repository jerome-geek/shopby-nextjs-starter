import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';
import { media } from '@/styles/media';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',

    '@media': {
        [media.desktop]: {
            gap: '40px',
        },
    },
});

export const title = style([
    textStyles.headlineBold,
    {
        fontSize: '28px',
        lineHeight: '36px',
        textAlign: 'center',
        '@media': {
            [media.desktop]: {
                fontSize: '40px',
                lineHeight: '48px',
            },
        },
    },
]);

export const titleContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
});

export const contentsContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
});

export const allAgreeLabel = style([
    textStyles.headlineBold,
    {
        color: vars.color.gray['90'],
    },
]);

export const allAgreeSeparator = style({
    height: '1px',
    backgroundColor: vars.color.gray['30'],
    margin: '8px 0',
});

export const allAgreeContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const label = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
});

export const termList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '0 4px',
});

export const termListItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const termLabel = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray['70'],
    },
]);

export const detailButton = style([
    textStyles.body1Regular,
    {
        backgroundColor: 'transparent',
        border: 'none',
        color: vars.color.gray['40'],
        textDecoration: 'underline',
        cursor: 'pointer',
        padding: '0',
    },
]);

export const nextButton = style([
    textStyles.headlineBold,
    {
        width: '100%',
        height: '56px',
        marginTop: '20px',
    },
]);

export const description = style([
    textStyles.body2Regular,
    {
        color: vars.color.gray['60'],
        marginLeft: '32px', // checkbox width + gap
    },
]);
