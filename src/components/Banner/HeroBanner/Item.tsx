import { css } from '@/styled-system/css';
import Image from 'next/image';
import Link from 'next/link';

import BannerTextOverlay from '@/components/Banner/HeroBanner/TextOverlay';
import { Banner } from '@/models/display/banner';
import { toBannerLinkAttributes } from '@/utils/banners';

interface HeroBannerItemProps {
    banner: Banner;
    index: number;
    borderRadius: string;
};

const HeroBannerItem = ({
    banner,
    index,
    borderRadius,
}: HeroBannerItemProps) => {
    const linkProps = toBannerLinkAttributes(banner);

    return (
        <div
            className={css({
                aspectRatio: '4/5',
                overflow: 'hidden',
                borderRadius,
            })}
        >
            <Link
                {...linkProps}
                aria-label={banner.name || `배너 ${index + 1}로 이동`}
                className={css({
                    position: 'relative',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                })}
            >
                <Image
                    src={`https:${banner.imageUrl}`}
                    alt={banner.name || `메인 배너 ${index + 1}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding='async'
                    width={388}
                    height={485}
                    className={css({
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    })}
                    objectPosition='center'
                />
                <BannerTextOverlay
                    title={banner.name}
                    description={banner.description}
                    titleColor={banner.nameColor}
                    descriptionColor={banner.descriptionColor}
                />
            </Link>
        </div>
    );
};

export default HeroBannerItem;
