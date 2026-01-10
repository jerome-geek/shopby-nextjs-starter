'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useBannerList } from '@/hooks/suspenseQuery/display/banner';
import useSnsLogin from '@/hooks/useSnsLogin';
import { BannerService } from '@/services';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

export default function SignupRegisterMethodPage() {
    const { t } = useTranslation();

    const { data } = useBannerList({ banners: ['SIGNUP'] });

    const banner = new BannerService(data, 0, 0);

    const title = banner.getBannerContentList()[0].name;
    const description = banner.getBannerContentList()[0].description;

    const banner2 = new BannerService(data, 0, 1);

    const bannerList = banner2.getBannerContentList();

    const { socialLoginList } = useSnsLogin();
    const availableSocialLoginList = socialLoginList.filter(
        ({ isAvailable }) => isAvailable
    );

    const router = useRouter();
    const onSignupButtonClick = () => {
        router.push(PATHS.SIGNUP.TERMS);
    };

    return (
        <div
            className={css({
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { base: '24px', md: '40px' },
                })}
            >
                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    })}
                >
                    <h2
                        className={css({
                            fontSize: '4rem',
                            lineHeight: '5rem',
                            fontWeight: 'bold',
                            letterSpacing: '-2%',
                            color: token('colors.black'),
                        })}
                        dangerouslySetInnerHTML={{
                            __html: t(title),
                        }}
                    />

                    <p
                        className={css({
                            fontSize: '1.6rem',
                            lineHeight: '2.6rem',
                            letterSpacing: '-2%',
                            color: token('colors.gray70'),
                        })}
                        dangerouslySetInnerHTML={{
                            __html: t(description),
                        }}
                    />
                </div>

                {bannerList.length > 0 && (
                    <ul
                        className={css({
                            display: { base: 'grid', md: 'flex' },
                            gridTemplateRows: {
                                base: 'repeat(2, 1fr)',
                                md: 'unset',
                            },
                            gridTemplateColumns: {
                                base: 'repeat(2, 1fr)',
                                md: 'unset',
                            },
                            flexDirection: { md: 'row' },
                            gap: { md: '33px' },
                        })}
                    >
                        {bannerList.map(
                            ({ bannerNo, imageUrl, nameColor, name }) => {
                                return (
                                    <li
                                        key={bannerNo}
                                        className={css({
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            flex: '1 1 0%',
                                            minWidth: '0px',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            gap: '7px',
                                            position: 'relative',
                                            padding: '18px 10px',

                                            // Mobile Dividers (2x2 grid)
                                            '&:nth-child(1)::after': {
                                                content: "''",
                                                position: 'absolute',
                                                top: '5%',
                                                right: 0,
                                                display: 'block',
                                                width: '1px',
                                                height: '85%',
                                                backgroundColor:
                                                    token('colors.gray20'),
                                            },
                                            '&:nth-child(3)::after': {
                                                content: "''",
                                                position: 'absolute',
                                                bottom: '5%',
                                                right: 0,
                                                display: 'block',
                                                width: '1px',
                                                height: '85%',
                                                backgroundColor:
                                                    token('colors.gray20'),
                                            },
                                            '&:nth-child(1)::before': {
                                                content: "''",
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                display: 'block',
                                                width: '90%',
                                                height: '1px',
                                                backgroundColor:
                                                    token('colors.gray20'),
                                            },
                                            '&:nth-child(2)::before': {
                                                content: "''",
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                display: 'block',
                                                width: '90%',
                                                height: '1px',
                                                backgroundColor:
                                                    token('colors.gray20'),
                                            },

                                            // Desktop Dividers (Row)
                                            md: {
                                                gap: '10px',
                                                padding: 0,
                                                '&:nth-child(1)::before, &:nth-child(2)::before':
                                                    {
                                                        display: 'none',
                                                    },
                                                '&:nth-child(1)::after, &:nth-child(3)::after':
                                                    {
                                                        display: 'none',
                                                    },
                                                '&:not(:last-child)::after': {
                                                    content: "''",
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: '-16.5px',
                                                    display: 'block',
                                                    width: '1px',
                                                    height: '100%',
                                                    backgroundColor:
                                                        token('colors.gray20'),
                                                },
                                            },
                                        })}
                                    >
                                        <Image
                                            src={`https://${imageUrl}`}
                                            alt={name}
                                            width={72}
                                            height={72}
                                            className={css({
                                                opacity: 0, // 처음엔 투명
                                                transition: 'opacity 0.3s',
                                            })}
                                            // 로드되자마자 브라우저가 직접 스타일을 바꾸게 함 (React State 사용 안함)
                                            onLoad={(e) => {
                                                (
                                                    e.target as HTMLImageElement
                                                ).style.opacity = '1';
                                            }}
                                        />
                                        <div>
                                            <span
                                                className={css({
                                                    fontSize: {
                                                        base: '14px',
                                                        md: '15px',
                                                    },
                                                    lineHeight: {
                                                        base: '16px',
                                                        md: '25px',
                                                    },
                                                    fontWeight: '700',
                                                })}
                                                style={{
                                                    color: nameColor,
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: name,
                                                }}
                                            />
                                        </div>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                )}

                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    })}
                >
                    <Button
                        frame="solid"
                        variant="primary"
                        onClick={onSignupButtonClick}
                    >
                        <span>{t('회원가입')}</span>
                    </Button>
                    {availableSocialLoginList.map(
                        ({ label, provider, onClick, Icon }) => {
                            return (
                                <Button
                                    key={`social-login-${provider}`}
                                    type="button"
                                    frame="solid"
                                    variant={provider}
                                    onClick={() => onClick({ returnUrl: '' })}
                                >
                                    {Icon && <Icon />}
                                    <span>{label}</span>
                                </Button>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
}
