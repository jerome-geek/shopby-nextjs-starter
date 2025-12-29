import { css } from '@/styled-system/css';
import Link from 'next/link';

import { Banner } from '@/models/display/banner';
import { toBannerLinkAttributes } from '@/utils/banners';

type IconBannerItemProps = {
    banner: Banner;
    type: 'main' | 'sub';
    index?: number;
};

const IconBannerItem = ({ banner, type, index = 0 }: IconBannerItemProps) => {
    const linkProps = toBannerLinkAttributes(banner);

    if (type === 'main') {
        return (
            <Link {...linkProps} className={css({ display: 'block' })}>
                <img
                    src={banner.imageUrl}
                    alt={banner.name || ''}
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
                gap: { base: '2px', md: '4px' },
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
                    alt={banner.name || ''}
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
                        fontSize: { base: '12px', md: '14px' },
                        fontWeight: '500',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                    })}
                >
                    {banner.name}
                </span>
            )}
        </Link>
    );
};

export default IconBannerItem;
