import { css } from '@/styled-system/css';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import BannerTextOverlay from '@/components/banner/hero-banner/TextOverlay';
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
    const { t } = useTranslation();

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
                aria-label={t(`${banner.name}`) || t(`배너 ${index + 1}로 이동`)}
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
                    alt={t(`${banner.name}`) || t(`메인 배너 ${index + 1}`)}
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
                    title={t(`${banner.name}`)}
                    description={t(`${banner.description}`)}    
                    titleColor={banner.nameColor}
                    descriptionColor={banner.descriptionColor}
                />
            </Link>
        </div>
    );
};

export default HeroBannerItem;
