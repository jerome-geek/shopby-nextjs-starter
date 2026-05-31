import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

const fadeIn = keyframes({
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    padding: vars.spacing.xl,
    textAlign: 'center',
    background: `linear-gradient(180deg, ${vars.color.white} 0%, ${vars.color.gray['10']} 100%)`,
});

export const iconWrapper = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '96px',
    height: '96px',
    borderRadius: '32px', // Squircle style
    backgroundColor: vars.color.white,
    color: vars.color.pink['80'],
    marginBottom: vars.spacing.xl,
    boxShadow: '0 20px 40px -10px rgba(236, 178, 187, 0.3)',
    transform: 'rotate(-5deg)',
});

export const title = style({
    fontSize: vars.typography.fontSize['display-2'],
    fontWeight: vars.typography.fontWeight.bold,
    color: vars.color.gray['90'],
    marginBottom: vars.spacing.md,
    letterSpacing: '-0.03em',
});

export const description = style({
    fontSize: vars.typography.fontSize['body-1'],
    lineHeight: '1.6',
    color: vars.color.gray['60'],
    marginBottom: '48px',
    maxWidth: '320px',
    wordBreak: 'keep-all',
});

export const buttonGroup = style({
    display: 'flex',
    gap: vars.spacing.md,
    width: '100%',
    maxWidth: '360px',
});

export const actionButton = style({
    flex: 1,
    whiteSpace: 'nowrap',
});
