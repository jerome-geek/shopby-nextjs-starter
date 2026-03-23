import { BANNER_ID } from '@/const/banner';
import { useBannerList } from '@/hooks/suspenseQuery/display/banner';
import {
    getBannerContentList,
    sortAccounts,
    splitBannersIntoTwoRows,
} from '@/hooks/utils/banners';
import { useMemo } from 'react';

import * as S from '@/components/banner/icon/index.css';

export default function IconBanner() {
    const { data: bannerListData } = useBannerList({
        banners: [BANNER_ID.MAIN_ICON],
    });

    const { mainBanners, subBannersList } = useMemo(() => {
        if (!bannerListData || bannerListData.length === 0) {
            return { mainBanners: [], subBannersList: [] };
        }

        const targetSection = bannerListData[0];
        if (!targetSection || !targetSection.accounts) {
            return { mainBanners: [], subBannersList: [] };
        }

        const sortedAccounts = sortAccounts(targetSection.accounts);

        // 첫 번째 구좌 또는 구좌명이 'home'인 구좌 찾기
        // 두 가지 조건 모두 체크하도록 구현 (하나는 주석 처리 가능)
        const mainAccountIndex = sortedAccounts.findIndex(
            (account, index) => account.accountName === 'home' || index === 0,
        );

        const mainAccount =
            mainAccountIndex >= 0 ? sortedAccounts[mainAccountIndex] : null;

        const mainBanners = mainAccount
            ? getBannerContentList(mainAccount).filter(
                  (banner) => banner.imageUrl,
              )
            : [];

        // 나머지 구좌들
        const subAccounts = sortedAccounts.filter(
            (_, index) => index !== mainAccountIndex,
        );

        const subBannersList = subAccounts
            .map((account) => getBannerContentList(account))
            .map((bannerList) => bannerList.filter((banner) => banner.imageUrl))
            .filter((bannerList) => bannerList.length > 0);

        return { mainBanners, subBannersList };
    }, [bannerListData]);
    console.log('🚀 ~ IconBanner ~ bannerListData:', bannerListData);

    const { firstRow, secondRow } = splitBannersIntoTwoRows(mainBanners);

    const rows = [firstRow, secondRow].filter((row) => row.length > 0);

    return (
        <>
            {mainBanners.length > 0 && (
                <section
                    aria-label="메인 아이콘 배너 섹션"
                    className={S.iconSection}
                >
                    {/* <MainIconBanner banners={mainBanners} /> */}
                </section>
            )}
            {/* TODO: 메인 기준으로 임시 주석처리 - 하단 아이콘 배너 섹션 */}
            {subBannersList.map((subBanners, index) => (
                <section
                    key={`sub-icon-banner-${index}`}
                    aria-label={`${index + 1}번째 아이콘 배너 섹션`}
                    className={S.iconSection}
                >
                    {/* <SubIconBanner banners={subBanners} /> */}
                </section>
            ))}

            {mainBanners.length > 0 && (
                <section
                    aria-label="메인 아이콘 배너 섹션"
                    className={S.iconSection}
                >
                    <ul className={S.bannerList}>
                        {mainBanners.map((banner) => (
                            <li key={banner.bannerNo} className={S.bannerItem}>
                                {/* <BannerLink banner={banner} /> */}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {subBannersList.map((subBanners, index) => (
                <section
                    key={`sub-icon-banner-${index}`}
                    className={S.iconSection}
                    aria-label={`${index + 1}번째 아이콘 배너 섹션`}
                >
                    <ul className={S.bannerList}>
                        {subBanners.map((banner) => (
                            <li key={banner.bannerNo} className={S.bannerItem}>
                                {/* <BannerLink banner={banner} /> */}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </>
    );
}
