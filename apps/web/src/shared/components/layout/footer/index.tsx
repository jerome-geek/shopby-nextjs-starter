import clsx from 'clsx';
import Link from 'next/link';
import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import { useMall } from '@/hooks/suspenseQuery/admin/mall';
import * as styles from '@/shared/components/layout/footer/index.css';
import { visuallyHidden } from '@/styles/global.css';

function FooterContent() {
    const { t } = useTranslation();
    const { data: mallData } = useMall();

    const companyInfo = useMemo(
        () => ({
            companyName:
                mallData.serviceBasicInfo.companyName ||
                '(주)레몬트리커뮤니케이션',
            representativeName:
                mallData.serviceBasicInfo.representativeName || '조영훈',
            address:
                `${mallData.serviceBasicInfo.address}, ${mallData.serviceBasicInfo.addressDetail}` ||
                '서울특별시 마포구 양화로 120(서교동), 2층',
            representPhoneNo:
                mallData.serviceBasicInfo.representPhoneNo || '1588-0000',
            businessRegistrationNo:
                mallData.serviceBasicInfo.businessRegistrationNo ||
                '123-45-67890',
            onlineMarketingBusinessDeclarationNo:
                mallData.serviceBasicInfo
                    .onlineMarketingBusinessDeclarationNo ||
                '2024-서울강남-12345',
            email: mallData.mall.serviceCenter.email,
        }),
        [mallData.serviceBasicInfo],
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
                isHighlight: true,
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
        <footer className={styles.footerContainer} id='footer'>
            <div className={styles.footerInner}>
                <div className={styles.footerSection}>
                    <h3 className={styles.footerSectionTitle}>
                        {companyInfo.companyName}
                    </h3>

                    <dl className={styles.infoList}>
                        <div className={styles.infoItem}>
                            <dt>{t('대표이사')}:</dt>
                            <dd>{companyInfo.representativeName}</dd>
                        </div>
                        <div className={styles.infoItem}>
                            <dt>{t('사업자등록번호')}:</dt>
                            <dd>{companyInfo.businessRegistrationNo}</dd>
                        </div>
                        <div className={styles.infoItem}>
                            <dt>{t('통신판매업신고')}:</dt>
                            <dd>
                                {
                                    companyInfo.onlineMarketingBusinessDeclarationNo
                                }
                            </dd>
                        </div>
                        <div className={styles.infoItem}>
                            <dt className={visuallyHidden}>{t('주소')}:</dt>
                            <dd>{companyInfo.address}</dd>
                        </div>
                    </dl>
                </div>

                <div className={styles.rightGroup}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerSectionTitle}>
                            {t('고객센터')}
                        </h3>

                        <dl className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <dt>{t('전화')}:</dt>
                                <dd>
                                    <a
                                        href={`tel:${companyInfo.representPhoneNo}`}
                                    >
                                        {companyInfo.representPhoneNo}
                                    </a>
                                </dd>
                            </div>
                            <div className={styles.infoItem}>
                                <dt>{t('이메일')}:</dt>
                                <dd>
                                    <a href={`mailto:${companyInfo.email}`}>
                                        {companyInfo.email}
                                    </a>
                                </dd>
                            </div>
                            <div className={styles.infoItem}>
                                <dt>{t('운영시간')}:</dt>
                                <dd>
                                    {t(
                                        '평일 10:00 - 17:00 (주말 및 공휴일 휴무)',
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <nav className={styles.bottomLinks}>
                        {menuLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={
                                    clsx(
                                        styles.bottomLink,
                                        link.isHighlight &&
                                            styles.bottomLinkHighlight,
                                    ) || undefined
                                }
                                target={link.target}
                                prefetch={false}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className={styles.copyrightSection}>
                    <p className={styles.copyright}>
                        © 2024 Jollypot Inc. All rights reserved.
                    </p>
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
