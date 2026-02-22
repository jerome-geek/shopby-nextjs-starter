import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const scrollToTopButton = style({
    position: 'fixed',
    bottom: '80px', // 네비게이션 무언가 있을지 모르니 여유 있게 설정
    right: '20px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#8FA489', // 스크린샷과 유사한 그린(올리브) 컬러
    color: vars.color.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    zIndex: 999,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});
