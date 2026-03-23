import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { textStyles } from '@/styles/typography.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: vars.spacing.xl,
    backgroundColor: vars.color.gray['10'], // 연한 배경색
    borderRadius: '16px',
    border: `1px solid ${vars.color.gray['30']}`,
    textAlign: 'center',
    margin: `${vars.spacing.xl} 0`,
});

export const title = style([
    textStyles.title1Bold,
    {
        color: vars.color.black,
        marginBottom: vars.spacing.md,
    },
]);

export const description = style([
    textStyles.body1Regular,
    {
        color: vars.color.gray[70],
        marginBottom: vars.spacing.xl,
        whiteSpace: 'pre-wrap',
    },
]);

export const buttonGroup = style({
    display: 'flex',
    gap: vars.spacing.md,
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px', // 버튼 그룹이 너무 넓어지지 않게
});

export const buttonWrapper = style({
    flex: 1,
});
