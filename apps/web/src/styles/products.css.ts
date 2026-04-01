import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
});

export const title = style({
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: vars.color.gray['10'],
});

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
});

export const card = style({
    border: `1px solid ${vars.color.gray['20']}`,
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: vars.color.white,
});

export const backLink = style({
    display: 'inline-block',
    marginBottom: '20px',
    color: vars.color.primary, // Using primary pink/red for links
    textDecoration: 'none',
    ':hover': {
        textDecoration: 'underline',
    },
});
