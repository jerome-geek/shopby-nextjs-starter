import { css } from '@/styled-system/css';

import banner from '@/api/display/banner';
import HeroBanner from '@/components/Banner/HeroBanner';
import { BANNER_CODES } from '@/const/banner/bannerCodes';
import { BANNER_STYLES } from '@/const/banner/bannerStyles';
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
                className={css(BANNER_STYLES.MAIN.SECTION)}
                aria-label='메인 배너 섹션'
            >
                <HeroBanner banners={bannerItems} />
            </section>
        );
    } catch (error) {
        console.error('HeroBannerSection 오류 발생', error);
        return null;
    }
};

export default HeroBannerSection;
