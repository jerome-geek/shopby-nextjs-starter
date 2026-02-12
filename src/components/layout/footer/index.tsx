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
    const [isExpanded, setIsExpanded] = useState(false);

    const menuGroups = useMemo(
        () => [
            [
                {
                    label: t('WannaMake 소개'),
                    href: `${PATHS.AUTH.TERMS.MAIN}/MALL_INTRODUCTION`,
                },
                {
                    label: t('이용약관'),
                    href: `${PATHS.AUTH.TERMS.MAIN}/USE`,
                },
                {
                    label: t('개인정보처리방침'),
                    href: `${PATHS.AUTH.TERMS.MAIN}/PI_PROCESS`,
                },
            ],
            [
                {
                    label: t('공지사항'),
                    href: '/boards/notice',
                },
                {
                    label: t('FAQ'),
                    href: '/boards/faq',
                },
                {
                    label: t('1:1 문의'),
                    href: PATHS.MYPAGE.INQUIRIES.MAIN,
                },
                {
                    label: t('입점/제휴 문의'),
                    href: '/partnership',
                },
            ],
        ],
        [t],
    );

    // 소셜 미디어 링크
    const socialMediaList = useMemo(
        () => [
            { id: 'instagram', url: '/', icon: <InstagramIcon /> },
            { id: 'youtube', url: '/', icon: <YoutubeIcon /> },
        ],
        [],
    );

    // 저작권 및 면책 정보
    const copyright = useMemo(
        () => ({
            disclaimer: t(
                '일부 상품의 경우 (주)제니지니앤로이드는 통신판매의 당사자가 아닌 통신판매중개자로서 상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.',
            ),
            copyrightText: t(
                'COPYRIGHT ⓒ {{companyName}} ALL RIGHTS RESERVED.',
                {
                    companyName:
                        mallData?.serviceBasicInfo.companyName ||
                        '(주)제니지니앤로이드',
                },
            ),
        }),
        [mallData?.serviceBasicInfo.companyName, t],
    );

    // 회사 정보
    const companyInfo = useMemo(
        () => ({
            companyName: mallData?.serviceBasicInfo.companyName ?? '',
            representativeName:
                mallData?.serviceBasicInfo.representativeName ?? '',
            address: mallData?.serviceBasicInfo.address ?? '',
            representPhoneNo: mallData?.serviceBasicInfo.representPhoneNo ?? '',
            businessRegistrationNo:
                mallData?.serviceBasicInfo.businessRegistrationNo ?? '',
            onlineMarketingBusinessDeclarationNo:
                mallData?.serviceBasicInfo
                    .onlineMarketingBusinessDeclarationNo ?? '',
            privacyManagerName:
                mallData?.serviceBasicInfo.privacyManagerName ?? '',
        }),
        [mallData?.serviceBasicInfo],
    );

    return (
        <footer className={styles.footerContainer} id="footer">
            <div className={styles.footerInnerContainer}>
                {/* 왼쪽: 회사 정보 */}
                <div className={styles.companyInfoSection}>
                    <h3
                        className={styles.companyTitle}
                        onClick={() => setIsExpanded(!isExpanded)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setIsExpanded(!isExpanded);
                            }
                        }}
                    >
                        {t('{{companyName}} 사업자 정보', {
                            companyName: companyInfo.companyName,
                        })}
                        <SmallCaretIcon
                            className={styles.companyTitleIcon}
                            data-expanded={isExpanded}
                        />
                    </h3>

                    {/* 모바일: 저작권 정보 */}
                    <div
                        className={styles.mobileCopyrightSection}
                        data-expanded={isExpanded}
                    >
                        <p>{copyright.disclaimer}</p>
                        <p>{copyright.copyrightText}</p>
                    </div>

                    {/* 웹(데스크톱): 상세 회사 정보 */}
                    <dl
                        className={styles.companyDetailsList}
                        data-expanded={isExpanded}
                    >
                        <div className={styles.companyDetailsItem}>
                            <dt>{t('대표자명')}</dt>
                            <dd>{companyInfo.representativeName}</dd>
                        </div>
                        <div className={styles.companyDetailsItem}>
                            <dt>{t('주소')}</dt>
                            <dd>{companyInfo.address}</dd>
                        </div>
                        <div className={styles.companyDetailsItem}>
                            <dt>{t('대표 전화')}</dt>
                            <dd>{companyInfo.representPhoneNo}</dd>
                        </div>
                        <div className={styles.companyDetailsItem}>
                            <dt>{t('사업자등록번호')}</dt>
                            <dd>{companyInfo.businessRegistrationNo}</dd>
                        </div>
                        <div className={styles.companyDetailsItem}>
                            <dt>{t('통신판매업신고번호')}</dt>
                            <dd>
                                {
                                    companyInfo.onlineMarketingBusinessDeclarationNo
                                }
                                <Link
                                    href={`https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${
                                        companyInfo.businessRegistrationNo?.replace(
                                            /-/g,
                                            '',
                                        ) || ''
                                    }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('사업자정보확인')}
                                </Link>
                            </dd>
                        </div>
                        <div className={styles.companyDetailsItem}>
                            <dt>{t('개인정보보호책임자')}</dt>
                            <dd>{companyInfo.privacyManagerName}</dd>
                        </div>
                        <div className={styles.companyDetailsItem}>
                            <dt>{t('호스팅 서비스')}</dt>
                            <dd>{t('엔에이치엔커머스(주)')}</dd>
                        </div>
                    </dl>
                </div>

                {/* 오른쪽: 네비게이션, 소셜 미디어, 저작권 */}
                <div className={styles.linksSection}>
                    {/* 네비게이션 링크 */}
                    <div className={styles.navigationWrapper}>
                        <nav className={styles.navigationContainer}>
                            {menuGroups.map((group, groupIdx) => (
                                <ul
                                    className={styles.menuGroupList}
                                    key={groupIdx}
                                >
                                    {group.map(({ label, href }) => (
                                        <li
                                            className={styles.menuGroupItem}
                                            key={href}
                                        >
                                            <Link
                                                href={href}
                                                className={styles.menuGroupLink}
                                            >
                                                {label ===
                                                t('개인정보처리방침') ? (
                                                    <strong>{label}</strong>
                                                ) : (
                                                    <span>{label}</span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </nav>

                        {/* 소셜 미디어 아이콘 */}
                        <ul className={styles.socialMediaList}>
                            {socialMediaList.map(({ id, url, icon }) => (
                                <li className={styles.socialMediaItem} key={id}>
                                    <Link
                                        href={url}
                                        className={styles.socialMediaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {icon}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 저작권 정보 (데스크톱만) */}
                    <div className={styles.desktopCopyrightSection}>
                        <p>{copyright.disclaimer}</p>
                        <p>{copyright.copyrightText}</p>
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
