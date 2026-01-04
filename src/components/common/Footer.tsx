import Link from 'next/link';

import { css } from '@/styled-system/css';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { YouTubeIcon } from '@/components/icons/YouTubeIcon';
import { mall } from '@/api/admin';

export default async function Footer() {
    try {
        const data11 = await mall.getMall().json();

        const navigation = {
            links: [
                { label: '이용약관', href: '/terms/USE' },
                { label: '개인정보처리방침', href: '/terms/PI_PROCESS' },
                // TODO: 이용안내의 경우 게시판 사용할 것
                { label: '이용안내', href: '/guide' },
            ],
        };

        // const socialMedia = {
        //     instagram: data11.serviceBasicInfo.instagramUrl,
        //     youtube: data11.serviceBasicInfo.youtubeUrl,
        // };

        const copyright = {
            disclaimer:
                '본 쇼핑몰은 판매자가 등록한 상품정보에 대해 책임을 지지 않습니다.',
            copyrightText: `© ${new Date().getFullYear()} ${data11.serviceBasicInfo.companyName}. All rights reserved.`,
        };

        return (
            <footer
                className={css({
                    width: '100%',
                    backgroundColor: '#F5F5F5',
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
                        })}
                    >
                        <h2
                            className={css({
                                fontSize: { base: '14px', lg: '16px' },
                                fontWeight: 'bold',
                                color: '{colors.foreground}',
                                marginBottom: { base: '12px', lg: '16px' },
                            })}
                        >
                            {data11.serviceBasicInfo.companyName} 사업자 정보
                        </h2>
                        {/* 웹: 회사 상세 정보 */}
                        <div
                            className={css({
                                display: { base: 'none', lg: 'flex' },
                                flexDirection: 'column',
                                gap: '8px',
                                fontSize: '14px',
                                color: '#666666',
                                lineHeight: '1.6',
                            })}
                        >
                            <p>
                                {`대표자명: ${data11.serviceBasicInfo.representativeName}`}
                            </p>
                            <p>{`주소 : ${data11.serviceBasicInfo.address}`}</p>
                            <p>
                                {`대표전화 : ${data11.serviceBasicInfo.representPhoneNo}`}
                            </p>
                            <p>
                                {`사업자등록번호 : ${data11.serviceBasicInfo.businessRegistrationNo}`}
                            </p>
                            <p>
                                {`통신판매업신고번호: ${data11.serviceBasicInfo.onlineMarketingBusinessDeclarationNo}`}
                                <Link
                                    // href={companyInfo.businessInfoUrl}
                                    href={`https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${data11.serviceBasicInfo.businessRegistrationNo?.replace(/-/g, '') || ''}`}
                                    className={css({
                                        color: '{colors.foreground}',
                                        textDecoration: 'underline',
                                    })}
                                >
                                    사업자정보확인
                                </Link>
                            </p>
                            <p>
                                {`개인정보보호책임자: ${data11.serviceBasicInfo.privacyManagerName}`}
                            </p>
                            <p>호스팅 서비스 : 엔에이치엔커머스(주)</p>
                        </div>
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
                            gap: '24px',
                        })}
                    >
                        {/* 네비게이션 링크 */}
                        <div
                            className={css({
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px',
                                fontSize: { base: '12px', lg: '14px' },
                                color: '#666666',
                            })}
                        >
                            {navigation.links.map((link, index) => (
                                <span key={link.href}>
                                    {index > 0 && (
                                        <span
                                            className={css({
                                                color: '#CCCCCC',
                                            })}
                                        >
                                            {' '}
                                            ·{' '}
                                        </span>
                                    )}
                                    <Link
                                        href={link.href}
                                        className={css({
                                            color: '#666666',
                                            textDecoration: 'none',
                                            _hover: {
                                                color: '{colors.foreground}',
                                            },
                                        })}
                                    >
                                        {link.label}
                                    </Link>
                                </span>
                            ))}
                        </div>

                        {/* 소셜 미디어 아이콘 */}
                        <div
                            className={css({
                                display: 'flex',
                                gap: { base: '8px', lg: '12px' },
                            })}
                        >
                            <a
                                href={'/'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: { base: '36px', lg: '40px' },
                                    height: { base: '36px', lg: '40px' },
                                    border: '1px solid #CCCCCC',
                                    borderRadius: '8px',
                                    color: '#666666',
                                    _hover: {
                                        color: '{colors.foreground}',
                                        borderColor: '{colors.foreground}',
                                    },
                                })}
                            >
                                <InstagramIcon
                                    className={css({
                                        width: '20px',
                                        height: '20px',
                                    })}
                                />
                            </a>
                            <a
                                href={'/'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: { base: '36px', lg: '40px' },
                                    height: { base: '36px', lg: '40px' },
                                    border: '1px solid #CCCCCC',
                                    borderRadius: '8px',
                                    color: '#666666',
                                    _hover: {
                                        color: '{colors.foreground}',
                                        borderColor: '{colors.foreground}',
                                    },
                                })}
                            >
                                <YouTubeIcon
                                    className={css({
                                        width: '20px',
                                        height: '20px',
                                    })}
                                />
                            </a>
                        </div>

                        {/* 저작권 정보 (데스크톱만 표시) */}
                        <div
                            className={css({
                                display: { base: 'none', lg: 'flex' },
                                flexDirection: 'column',
                                gap: '8px',
                                fontSize: '12px',
                                color: '#666666',
                                lineHeight: '1.6',
                            })}
                        >
                            <p>{copyright.disclaimer}</p>
                            <p>{`COPYRIGHT ⓒ ${data11.serviceBasicInfo.companyName} ALL RIGHTS RESERVED.`}</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}
