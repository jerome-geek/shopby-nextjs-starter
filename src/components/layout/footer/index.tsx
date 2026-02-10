import Link from 'next/link';

import { PATHS } from '@/const/paths';
import * as styles from './Footer.css';

// 소셜 아이콘
const InstagramIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const YoutubeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
);

const BlogIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
);

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                {/* 상단 링크 섹션 */}
                <div className={styles.footerTop}>
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>쇼핑하기</h4>
                        <Link
                            href={PATHS.PRODUCTS.NEW}
                            className={styles.footerLink}
                        >
                            신상품
                        </Link>
                        <Link
                            href={PATHS.PRODUCTS.BEST}
                            className={styles.footerLink}
                        >
                            베스트
                        </Link>
                        <Link
                            href={'/'}
                            className={styles.footerLink}
                        >
                            카테고리
                        </Link>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>고객센터</h4>
                        <Link href="/faq" className={styles.footerLink}>
                            자주 묻는 질문
                        </Link>
                        <Link href="/contact" className={styles.footerLink}>
                            1:1 문의
                        </Link>
                        <Link href="/notice" className={styles.footerLink}>
                            공지사항
                        </Link>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>회사 정보</h4>
                        <Link href="/about" className={styles.footerLink}>
                            회사 소개
                        </Link>
                        <Link href="/terms" className={styles.footerLink}>
                            이용약관
                        </Link>
                        <Link href="/privacy" className={styles.footerLink}>
                            개인정보처리방침
                        </Link>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>연락처</h4>
                        <span className={styles.footerLink}>1588-0000</span>
                        <span className={styles.footerLink}>
                            평일 10:00 - 18:00
                        </span>
                        <span className={styles.footerLink}>
                            점심 12:00 - 13:00
                        </span>
                    </div>
                </div>

                {/* 하단 저작권 & 소셜 */}
                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} WannaMake. All rights
                        reserved.
                    </p>
                    <div className={styles.socialLinks}>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="Instagram"
                        >
                            <InstagramIcon />
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="YouTube"
                        >
                            <YoutubeIcon />
                        </a>
                        <a
                            href="https://blog.naver.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label="Blog"
                        >
                            <BlogIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
