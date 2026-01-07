// import { getTranslation } from '@/i18n/server';
// import { css } from '@/styled-system/css';

// import banner from '@/api/display/banner';
// import MainIconBanner from '@/components/banner/icon-banner/Main';
// import SubIconBanner from '@/components/banner/icon-banner/Sub';
// import { BANNER_CODES } from '@/const/banner/bannerCodes';
// import { getBannerContentList, sortAccounts } from '@/utils/banners';

// interface IconBannerSectionProps {
//     /** 배너 섹션 코드 목록 */
//     bannerCodes?: string[];
//     /** 사용할 섹션 인덱스 */
//     sectionIndex?: number;
//     /** 사용할 Account 인덱스 */
//     accountIndex?: number;
//     /** 레이아웃 타입: 'main' | 'sub' */
//     type?: 'main' | 'sub';
// }

// const IconBannerSection = async ({
//     bannerCodes = [BANNER_CODES.MAIN_ICON],
//     sectionIndex = 0,
//     accountIndex = 0,
//     type = 'main',
// }: IconBannerSectionProps = {}) => {
//     const { t } = await getTranslation();

//     try {
//         const bannerResponse = await banner.getBanners(bannerCodes).json();

//         const targetSection = bannerResponse?.[sectionIndex];

//         if (!targetSection) {
//             return null;
//         }

//         const sortedAccounts = sortAccounts(targetSection.accounts);
//         const targetAccount = sortedAccounts[accountIndex] || null;

//         if (!targetAccount) {
//             return null;
//         }

//         const bannerList = getBannerContentList(targetAccount);

//         const bannerItems = bannerList.filter((banner) => banner.imageUrl);

//         if (bannerItems.length === 0) {
//             return null;
//         }

//         return (
//             <section
//                 className={css({
//                     margin: {
//                         base: type === 'main' ? '20px 0 0 0' : '0',
//                         md: type === 'main' ? '0 0 0 12px' : '0',
//                     },
//                 })}
//                 aria-label={t('메인 아이콘 배너 섹션')}
//             >
//                 {type === 'main' ? (
//                     <MainIconBanner banners={bannerItems} />
//                 ) : (
//                     <SubIconBanner banners={bannerItems} />
//                 )}
//             </section>
//         );
//     } catch (error) {
//         console.error(t('메인 아이콘 배너 섹션 오류 발생'), error);
//         return null;
//     }
// };

// export default IconBannerSection;

import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { filter, map, pipe, toArray } from '@fxts/core';

import banner from '@/api/display/banner';
import MainIconBanner from '@/components/banner/icon-banner/Main';
import SubIconBanner from '@/components/banner/icon-banner/Sub';
import { BANNER_CODES } from '@/const/banner/bannerCodes';
import { getBannerContentList, sortAccounts } from '@/utils/banners';

interface IconBannerSectionProps {
    /** 배너 섹션 코드 목록 */
    bannerCodes?: string[];
    /** 사용할 섹션 인덱스 */
    sectionIndex?: number;
    /** 사용할 Account 인덱스 */
    accountIndex?: number;
}

const IconBannerSection = async ({
    bannerCodes = [BANNER_CODES.MAIN_ICON],
    sectionIndex = 0,
    accountIndex = 0,
}: IconBannerSectionProps = {}) => {
    const { t } = await getTranslation();

    try {
        const bannerResponse = await banner.getBanners(bannerCodes).json();

        const targetSection = bannerResponse?.[sectionIndex];

        if (!targetSection) {
            return null;
        }

        const sortedAccounts = sortAccounts(targetSection.accounts);
        const targetAccount = sortedAccounts[accountIndex] || null;

        if (!targetAccount) {
            return null;
        }

        const bannerList = getBannerContentList(targetAccount);
        const bannerItems = bannerList.filter((banner) => banner.imageUrl);

        if (bannerItems.length === 0) {
            return null;
        }

        const subAccounts = sortedAccounts.slice(accountIndex + 1);
        const subBannerItemsList = pipe(
            subAccounts,
            map((account) => getBannerContentList(account)),
            map((subBannerList) =>
                subBannerList.filter((banner) => banner.imageUrl),
            ),
            filter((subBannerItems) => subBannerItems.length > 0),
            toArray,
        );

        return (
            <>
                <section
                    className={css({
                        margin: {
                            base: '20px 0 0 0',
                            md: '0 0 0 12px',
                        },
                    })}
                    aria-label={t('메인 아이콘 배너 섹션')}
                >
                    <MainIconBanner banners={bannerItems} />
                </section>

                {subBannerItemsList.map((subBannerItems, index) => (
                    <section
                        key={`sub-icon-banner-${index}`}
                        aria-label={t(`${index + 1}번째 아이콘 배너 섹션`)}
                    >
                        <SubIconBanner banners={subBannerItems} />
                    </section>
                ))}
            </>
        );
    } catch (error) {
        console.error(t('메인 아이콘 배너 섹션 오류 발생'), error);
        return null;
    }
};

export default IconBannerSection;
