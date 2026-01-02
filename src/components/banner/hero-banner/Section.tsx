import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

import banner from '@/api/display/banner';
import HeroBanner from '@/components/banner/hero-banner';
import { BANNER_CODES } from '@/const/banner/bannerCodes';
import { getBannerContentList, sortAccounts } from '@/utils/banners';

type HeroBannerSectionProps = {
    /** 배너 섹션 코드 목록 */
    bannerCodes?: string[];
    /** 사용할 섹션 인덱스 */
    sectionIndex?: number;
    /** 사용할 Account 인덱스 */
    accountIndex?: number;
};

const HeroBannerSection = async ({
    bannerCodes = [BANNER_CODES.MAIN],
    sectionIndex = 0,
    accountIndex = 0,
}: HeroBannerSectionProps = {}) => {
const {t} = await getTranslation();

    try {
        const bannerResponse = await banner.getBanners(bannerCodes).json();

        const targetSection = bannerResponse?.[sectionIndex];

        if (!targetSection) {
            return null;
        }

        const sortedAccounts = sortAccounts(targetSection.accounts);
        const targetAccount = sortedAccounts[accountIndex];

        if (!targetAccount) {
            return null;
        }

        const bannerList = getBannerContentList(targetAccount);

        const bannerItems = bannerList.filter((banner) => banner.imageUrl);

        if (bannerItems.length === 0) {
            return null;
        }

        return (
            <section
                className={css({
                    paddingY: { base: token('spacing.3'), md: token('spacing.6') },
                    overflow: 'hidden',
                })}
                aria-label={t('메인 배너 섹션')}
            >
                <HeroBanner banners={bannerItems} />
            </section>
        );
    } catch (error) {
        console.error(t('메인 배너 섹션 오류 발생'), error);
        return null;
    }
};

export default HeroBannerSection;

