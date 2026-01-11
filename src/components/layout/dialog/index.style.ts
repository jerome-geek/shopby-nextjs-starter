import { css } from '@/styled-system/css';

export const dialogDimmedStyle = css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 1000,
});

export const dialogContainerStyle = css({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    zIndex: 1001,
    minWidth: '432px',
    borderRadius: '24px',
    overflow: 'hidden',
    padding: '48px 24px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
});
