import { filter, pipe, prop, sortBy } from '@fxts/core';
import dayjs from 'dayjs';

import { GetBannersResponse } from '@/models/display/banner';

class BannerService {
    constructor(
        private readonly bannerData: GetBannersResponse = [],
        /** 배너 인덱스 */
        private readonly index: number = 0,
        /** 배너 구좌 인덱스 */
        private readonly accountIndex: number = 0,
        /** 배너 콘텐츠 인덱스 */
        private readonly contentIndex: number = 0
    ) {}

    getBanner() {
        return this.bannerData[this.index] ?? null;
    }

    getBannerAccountList() {
        return this.getBanner()?.accounts || [];
    }

    getBannerAccount() {
        return this.getBannerAccountList()[this.accountIndex] ?? null;
    }

    getBannerContentList() {
        const bannerList = this.getBannerAccount();

        if (!bannerList) {
            return [];
        }

        const displayType = bannerList.displayType;

        return pipe(
            bannerList,
            prop('banners'),
            filter((a) =>
                this.isVisible(
                    a.displayPeriodType,
                    a.displayStartYmdt,
                    a.displayEndYmdt
                )
            ),
            sortBy((a) => (displayType === 'SEQUENTIAL' ? a.displayOrder : 0))
        );
    }

    getBannerContent() {
        return this.getBannerContentList()[this.contentIndex] ?? null;
    }

    isVisible(
        displayPeriodType: string,
        displayStartYmdt: Date,
        displayEndYmdt: Date
    ) {
        return displayPeriodType === 'PERIOD'
            ? dayjs().isAfter(displayStartYmdt) &&
                  dayjs().isBefore(displayEndYmdt)
            : true;
    }
}

export default BannerService;
