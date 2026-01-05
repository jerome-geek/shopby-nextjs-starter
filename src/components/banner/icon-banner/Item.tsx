import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Banner } from '@/models/display/banner';
import { toBannerLinkAttributes } from '@/utils/banners';

type IconBannerItemProps = {
    banner: Banner;
    type: 'main' | 'sub';
    index?: number;
};

const IconBannerItem = ({ banner, type, index = 0 }: IconBannerItemProps) => {
    const { t } = useTranslation();

    const linkProps = toBannerLinkAttributes(banner);

    if (type === 'main') {
        return (
            <Link {...linkProps} className={css({ display: 'block' })}>
                <img
                    src={banner.imageUrl}
                    alt={t(`${banner.name}`) || ''}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className={css({
                        height: { base: '40px', md: '44px' },
                        objectFit: 'contain',
                        display: 'block',
                    })}
                />
            </Link>
        );
    }

    return (
        <Link
            {...linkProps}
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { base: '2px', md: token('spacing.1') },
            })}
        >
            <div
                className={css({
                    width: { base: '70px', md: '92px' },
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    flexShrink: 0,
                })}
            >
                <img
                    src={banner.imageUrl}
                    alt={t(`${banner.name}`) || ''}
                    className={css({
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    })}
                />
            </div>
            {banner.name && (
                <span
                    className={css({
                        fontSize: { base: token('fontSizes.xs'), md: token('fontSizes.sm') },
                        fontWeight: '500',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                    })}
                >
                    {t(`${banner.name}`)}
                </span>
            )}
        </Link>
    );
};

export default IconBannerItem;
