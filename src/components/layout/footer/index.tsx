import Link from 'next/link';
import { useMemo, useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useMall } from '@/hooks/suspenseQuery/admin/mall';

import { PATHS } from '@/const/paths';

import { InstagramIcon } from '@/components/icons/footer/InstagramIcon';
import { YoutubeIcon } from '@/components/icons/footer/YoutubeIcon';
import { SmallCaretIcon } from '@/components/icons/SmallCaretIcon';

import * as styles from './Footer.css';

function FooterContent() {
    const { t } = useTranslation();
    const { data: mallData } = useMall();

    const companyInfo = useMemo(
        () => ({
            companyName:
                mallData?.serviceBasicInfo.companyName ||
                '(주)제니지니앤로이드',
            representativeName:
                mallData?.serviceBasicInfo.representativeName || '홍길동',
            address:
                mallData?.serviceBasicInfo.address ||
                '서울특별시 강남구 테헤란로 123, 4층',
            representPhoneNo:
                mallData?.serviceBasicInfo.representPhoneNo || '1588-0000',
            businessRegistrationNo:
                mallData?.serviceBasicInfo.businessRegistrationNo ||
                '123-45-67890',
            onlineMarketingBusinessDeclarationNo:
                mallData?.serviceBasicInfo
                    .onlineMarketingBusinessDeclarationNo ||
                '2024-서울강남-12345',
            email: 'help@jollypot.com', // Mall data에 이메일이 없을 경우 대비
        }),
        [mallData?.serviceBasicInfo],
    );

    const menuLinks = useMemo(
        () => [
            {
                label: t('이용약관'),
                href: `${PATHS.AUTH.TERMS.MAIN}/USE`,
            },
            {
                label: t('개인정보처리방침'),
                href: `${PATHS.AUTH.TERMS.MAIN}/PI_PROCESS`,
            },
            {
                label: t('사업자정보확인'),
                href: `https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${
                    companyInfo.businessRegistrationNo?.replace(/-/g, '') || ''
                }`,
                target: '_blank',
            },
        ],
        [t, companyInfo.businessRegistrationNo],
    );

    return (
        <footer className={styles.footerContainer} id="footer">
            <div className={styles.footerInnerContainer}>
                {/* 회사 정보 섹션 */}
                <div className={styles.companySection}>
                    <h3 className={styles.companyName}>
                        {companyInfo.companyName}
                    </h3>
                    <div className={styles.infoList}>
                        <div className={styles.infoItem}>
                            <span>{t('대표이사')}:</span>
                            <span>{companyInfo.representativeName}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span>{t('사업자등록번호')}:</span>
                            <span>{companyInfo.businessRegistrationNo}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span>{t('통신판매업신고')}:</span>
                            <span>
                                {
                                    companyInfo.onlineMarketingBusinessDeclarationNo
                                }
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span>{companyInfo.address}</span>
                        </div>
                    </div>
                </div>

                {/* 고객센터 섹션 */}
                <div className={styles.csSection}>
                    <h3 className={styles.csTitle}>{t('고객센터')}</h3>
                    <div className={styles.infoList}>
                        <div className={styles.infoItem}>
                            <span>{t('전화')}:</span>
                            <span>{companyInfo.representPhoneNo}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span>{t('이메일')}:</span>
                            <span>{companyInfo.email}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span>{t('운영시간')}:</span>
                            <span>
                                {t('평일 09:00 - 18:00 (주말 및 공휴일 휴무)')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 하단 링크 & 저작권 */}
                <div>
                    <nav className={styles.bottomLinks}>
                        {menuLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={styles.bottomLink}
                                target={link.target}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className={styles.copyrightSection}>
                        <p className={styles.copyright}>
                            © 2024 {companyInfo.companyName}. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterSkeleton() {
    return (
        <div
            style={{
                width: '100%',
                height: '400px', // 일반적인 푸터 높이
                backgroundColor: '#f5f5f5',
            }}
        />
    );
}

export function Footer() {
    return (
        <Suspense fallback={<FooterSkeleton />}>
            <FooterContent />
        </Suspense>
    );
}
