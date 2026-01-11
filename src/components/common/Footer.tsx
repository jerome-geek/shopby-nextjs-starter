import Link from 'next/link';

import { mall } from '@/api/admin';
import { getCachedCategoryData } from '@/api/display/category.server';
import MobileBottomNavigation from '@/components/common/MobileBottomNavigation';
import { InstagramIcon, YoutubeIcon } from '@/components/icons/footer';
import { PATHS } from '@/const/paths';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { center, vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';

export default async function Footer() {
    const { t } = await getTranslation();

    try {
        const mallData = await mall.getMall().json();

        const categoryData = await getCachedCategoryData();

        const {
            serviceBasicInfo: {
                companyName,
                representativeName,
                address,
                representPhoneNo,
                businessRegistrationNo,
                onlineMarketingBusinessDeclarationNo,
                privacyManagerName,
            },
        } = mallData;

        const menuGroups = [
            [
                { label: t('WannaMake 소개'), href: PATHS.COMPANY },
                { label: t('이용약관'), href: `${PATHS.AUTH.TERMS.MAIN}/USE` },
                {
                    label: t('개인정보처리방침'),
                    href: `${PATHS.AUTH.TERMS.MAIN}/PI_PROCESS`,
                },
            ],
            [
                { label: t('공지사항'), href: PATHS.SUPPORT.NOTICE.LIST },
                { label: t('FAQ'), href: PATHS.SUPPORT.FAQ },
                { label: t('1:1문의'), href: PATHS.MYPAGE.INQUIRIES.MAIN },
                { label: t('입점/제휴 문의'), href: '/partnership' },
            ],
        ];

        // const socialMedia = {
        //     instagram: mallData.serviceBasicInfo.instagramUrl,
        //     youtube: mallData.serviceBasicInfo.youtubeUrl,
        // };
        const socialMediaList = [
            { id: 'instagram', url: '/', icon: <InstagramIcon /> },
            { id: 'youtube', url: '/', icon: <YoutubeIcon /> },
        ];

        const copyright = {
            disclaimer:
                '일부 상품의 경우 (주)제니지니앤로이드는 통신판매의 당사자가 아닌 통신판매중개자로서 상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.',
            copyrightText:
                'COPYRIGHT ⓒ (주)제니지니앤로이드 ALL RIGHTS RESERVED.',
        };

        return (
            <>
                <footer
                    className={css({
                        width: '100%',
                        backgroundColor: token('colors.gray20'),
                        paddingY: { base: '32px', lg: '48px' },
                        paddingBottom: { base: '80px', md: '48px' }, // 모바일 하단 네비게이션 공간 확보
                        marginTop: 'auto',
                    })}
                >
                    <div
                        className={css({
                            maxWidth: { base: '100%', lg: '1200px' },
                            marginX: 'auto',
                            paddingX: '16px',
                            display: 'flex',
                            flexDirection: { base: 'column', lg: 'row' },
                            gap: { base: '32px', lg: '80px' },
                        })}
                    >
                        {/* 왼쪽: 회사 정보 */}
                        <div
                            className={css({
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: { base: '20px', md: '55px' },
                            })}
                        >
                            <h3
                                className={css({
                                    textStyle: 'body1.bold',
                                    color: token('colors.gray80'),
                                    // marginBottom: '32px',
                                })}
                            >
                                {`${companyName} 사업자 정보`}
                            </h3>
                            {/* 웹: 회사 상세 정보 */}
                            <dl
                                className={css({
                                    display: { base: 'none', lg: 'flex' },
                                    flexDirection: 'column',
                                    gap: '8px',
                                })}
                            >
                                <div
                                    className={css({
                                        display: 'flex',
                                        gap: '12px',
                                    })}
                                >
                                    <dt
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray60'),
                                            whiteSpace: 'nowrap',
                                        })}
                                    >
                                        {t('대표자명')}
                                    </dt>
                                    <dd
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray80'),
                                        })}
                                    >
                                        {representativeName}
                                    </dd>
                                </div>
                                <div
                                    className={css({
                                        display: 'flex',
                                        gap: '12px',
                                    })}
                                >
                                    <dt
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray60'),
                                            whiteSpace: 'nowrap',
                                        })}
                                    >
                                        {t('주소')}
                                    </dt>
                                    <dd
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray80'),
                                        })}
                                    >
                                        {address}
                                    </dd>
                                </div>
                                <div
                                    className={css({
                                        display: 'flex',
                                        gap: '12px',
                                    })}
                                >
                                    <dt
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray60'),
                                            whiteSpace: 'nowrap',
                                        })}
                                    >
                                        {t('대표 전화')}
                                    </dt>
                                    <dd
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray80'),
                                        })}
                                    >
                                        {representPhoneNo}
                                    </dd>
                                </div>
                                <div
                                    className={css({
                                        display: 'flex',
                                        gap: '12px',
                                    })}
                                >
                                    <dt
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray60'),
                                            whiteSpace: 'nowrap',
                                        })}
                                    >
                                        {t('사업자등록번호')}
                                    </dt>
                                    <dd
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray80'),
                                        })}
                                    >
                                        {businessRegistrationNo}
                                    </dd>
                                </div>
                                <div
                                    className={css({
                                        display: 'flex',
                                        gap: '12px',
                                    })}
                                >
                                    <dt
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray60'),
                                            whiteSpace: 'nowrap',
                                        })}
                                    >
                                        {t('통신판매업신고번호')}
                                    </dt>
                                    <dd
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray80'),
                                            display: 'flex',
                                            gap: '8px',
                                        })}
                                    >
                                        {onlineMarketingBusinessDeclarationNo}
                                        <Link
                                            href={`https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${businessRegistrationNo?.replace(/-/g, '') || ''}`}
                                            className={css({
                                                color: token('colors.gray60'),
                                                textDecoration: 'underline',
                                            })}
                                        >
                                            사업자정보확인
                                        </Link>
                                    </dd>
                                </div>
                                <div
                                    className={css({
                                        display: 'flex',
                                        gap: '12px',
                                    })}
                                >
                                    <dt
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray60'),
                                            whiteSpace: 'nowrap',
                                        })}
                                    >
                                        {t('개인정보보호책임자')}
                                    </dt>
                                    <dd
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray80'),
                                        })}
                                    >
                                        {privacyManagerName}
                                    </dd>
                                </div>
                                <div
                                    className={css({
                                        display: 'flex',
                                        gap: '12px',
                                    })}
                                >
                                    <dt
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray60'),
                                            whiteSpace: 'nowrap',
                                        })}
                                    >
                                        {t('호스팅 서비스')}
                                    </dt>
                                    <dd
                                        className={css({
                                            textStyle: 'body1.regular',
                                            color: token('colors.gray80'),
                                        })}
                                    >
                                        {t('엔에이치엔커머스(주)')}
                                    </dd>
                                </div>
                            </dl>
                            {/* 모바일: 저작권 정보 */}
                            <div
                                className={css({
                                    display: { base: 'flex', lg: 'none' },
                                    flexDirection: 'column',
                                    gap: '6px',
                                    fontSize: '12px',
                                    color: '#666666',
                                    lineHeight: '1.6',
                                })}
                            >
                                <p>{copyright.disclaimer}</p>
                                <p>{copyright.copyrightText}</p>
                            </div>
                        </div>

                        {/* 오른쪽: 네비게이션, 소셜 미디어, 저작권 */}
                        <div
                            className={css({
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '88px',
                            })}
                        >
                            <div
                                className={vstack({
                                    gap: '20px',
                                    alignItems: 'stretch',
                                })}
                            >
                                {/* 네비게이션 링크 */}
                                <nav
                                    className={css({
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    })}
                                >
                                    {menuGroups.map((group, groupIdx) => (
                                        <ul
                                            key={groupIdx}
                                            className={css({
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                alignItems: 'center',
                                                columnGap: '12px',
                                                rowGap: '8px',
                                            })}
                                        >
                                            {group.map(
                                                ({ label, href }, itemIdx) => (
                                                    <li
                                                        key={href}
                                                        className={css({
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            _after:
                                                                itemIdx <
                                                                group.length - 1
                                                                    ? {
                                                                          content:
                                                                              '"·"',
                                                                          marginLeft:
                                                                              '12px',
                                                                          color: token(
                                                                              'colors.gray50',
                                                                          ),
                                                                          fontSize:
                                                                              '14px',
                                                                          fontWeight:
                                                                              'bold',
                                                                      }
                                                                    : {},
                                                        })}
                                                    >
                                                        <Link
                                                            href={href}
                                                            prefetch={false}
                                                            className={css({
                                                                textStyle:
                                                                    label ===
                                                                    '개인정보처리방침'
                                                                        ? 'headline2.semibold'
                                                                        : 'headline2.medium',
                                                                color: token(
                                                                    'colors.gray80',
                                                                ),
                                                                transition:
                                                                    'color 0.2s',
                                                                _hover: {
                                                                    color: token(
                                                                        'colors.gray90',
                                                                    ),
                                                                },
                                                            })}
                                                        >
                                                            {label}
                                                        </Link>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    ))}
                                </nav>

                                {/* 소셜 미디어 아이콘 */}
                                <ul
                                    className={css({
                                        display: 'flex',
                                        gap: { base: '10px', md: '8px' },
                                    })}
                                >
                                    {socialMediaList.map(
                                        ({ id, url, icon }) => {
                                            return (
                                                <li key={id}>
                                                    <Link
                                                        href={url}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className={center({
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            background:
                                                                token(
                                                                    'colors.white',
                                                                ),
                                                            _hover: {
                                                                color: '{colors.foreground}',
                                                                borderColor:
                                                                    '{colors.foreground}',
                                                            },
                                                        })}
                                                    >
                                                        {icon}
                                                    </Link>
                                                </li>
                                            );
                                        },
                                    )}
                                </ul>
                            </div>

                            {/* 저작권 정보 (데스크톱만 표시) */}
                            <div
                                className={css({
                                    display: { base: 'none', lg: 'flex' },
                                    flexDirection: 'column',
                                })}
                            >
                                <p
                                    className={css({
                                        textStyle: 'caption.regular',
                                        color: token('colors.gray60'),
                                    })}
                                >
                                    {copyright.disclaimer}
                                </p>
                                <p
                                    className={css({
                                        textStyle: 'caption.semibold',
                                        color: token('colors.gray60'),
                                    })}
                                >{`COPYRIGHT ⓒ ${mallData.serviceBasicInfo.companyName} ALL RIGHTS RESERVED.`}</p>
                            </div>
                        </div>
                    </div>
                </footer>

                <MobileBottomNavigation categoryData={categoryData} />
            </>
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}
