export type MainPageLayoutType = 'home';
// | 'kit'
// | 'object'
// | 'tools'
// | 'christmas';
export interface Section {
    id: string;
    sectionId: string;
}

// 메인 페이지 레이아웃 구조
export interface MainPageLayout {
    desktop: {
        sections: Section[];
    };
    mobile: {
        sections: Section[];
    };
}

// 레이아웃 설정
const layouts: Record<MainPageLayoutType, MainPageLayout> = {
    home: {
        desktop: {
            sections: [
                {
                    id: 'main-01',
                    sectionId: 'MAIN_01',
                },
                {
                    id: 'main-best',
                    sectionId: 'MAIN_BEST',
                },
                {
                    id: 'main-new',
                    sectionId: 'MAIN_NEW',
                },
                {
                    id: 'main-02',
                    sectionId: 'MAIN_02',
                },
                {
                    id: 'main-03',
                    sectionId: 'MAIN_03',
                },
                {
                    id: 'main-sale',
                    sectionId: 'MAIN_SALE',
                },
            ],
        },
        mobile: {
            sections: [
                {
                    id: 'main-01',
                    sectionId: 'MAIN_01',
                },
                {
                    id: 'main-best',
                    sectionId: 'MAIN_BEST',
                },
                {
                    id: 'main-new',
                    sectionId: 'MAIN_NEW',
                },
                // TODO: 테스트 - 데스크탑/모바일 다른 레이아웃 테스트를 위해 임시 주석처리
                // {
                //     id: 'main-02',
                //     sectionId: 'MAIN_02',
                // },
                // {
                //     id: 'main-03',
                //     sectionId: 'MAIN_03',
                // },
                {
                    id: 'main-sale',
                    sectionId: 'MAIN_SALE',
                },
            ],
        },
    },
    // kit: {
    //     desktop: {
    //         sections: [
    //             {
    //                 id: 'main-01',
    //                 sectionId: 'MAIN_01',
    //             },
    //             {
    //                 id: 'main-best',
    //                 sectionId: 'MAIN_BEST',
    //             },
    //             {
    //                 id: 'main-new',
    //                 sectionId: 'MAIN_NEW',
    //             },
    //             {
    //                 id: 'main-02',
    //                 sectionId: 'MAIN_02',
    //             },
    //             {
    //                 id: 'main-03',
    //                 sectionId: 'MAIN_03',
    //             },
    //             {
    //                 id: 'main-sale',
    //                 sectionId: 'MAIN_SALE',
    //             },
    //         ],        },
    //     mobile: {
    //         sections: [
    //             {
    //                 id: 'main-01',
    //                 sectionId: 'MAIN_01',
    //             },
    //             {
    //                 id: 'main-best',
    //                 sectionId: 'MAIN_BEST',
    //             },
    //             {
    //                 id: 'main-new',
    //                 sectionId: 'MAIN_NEW',
    //             },
    //             {
    //                 id: 'main-02',
    //                 sectionId: 'MAIN_02',
    //             },
    //             {
    //                 id: 'main-03',
    //                 sectionId: 'MAIN_03',
    //             },
    //             {
    //                 id: 'main-sale',
    //                 sectionId: 'MAIN_SALE',
    //             },
    //         ],        },
    // },
    // object: {
    //     desktop: {
    //         sections: [
    //             {
    //                 id: 'main-01',
    //                 sectionId: 'MAIN_01',
    //             },
    //             {
    //                 id: 'main-best',
    //                 sectionId: 'MAIN_BEST',
    //             },
    //             {
    //                 id: 'main-new',
    //                 sectionId: 'MAIN_NEW',
    //             },
    //             {
    //                 id: 'main-02',
    //                 sectionId: 'MAIN_02',
    //             },
    //             {
    //                 id: 'main-03',
    //                 sectionId: 'MAIN_03',
    //             },
    //             {
    //                 id: 'main-sale',
    //                 sectionId: 'MAIN_SALE',
    //             },
    //         ],        },
    //     mobile: {
    //         sections: [
    //             {
    //                 id: 'main-01',
    //                 sectionId: 'MAIN_01',
    //             },
    //             {
    //                 id: 'main-best',
    //                 sectionId: 'MAIN_BEST',
    //             },
    //             {
    //                 id: 'main-new',
    //                 sectionId: 'MAIN_NEW',
    //             },
    //             {
    //                 id: 'main-02',
    //                 sectionId: 'MAIN_02',
    //             },
    //             {
    //                 id: 'main-03',
    //                 sectionId: 'MAIN_03',
    //             },
    //             {
    //                 id: 'main-sale',
    //                 sectionId: 'MAIN_SALE',
    //             },
    //         ],        },
    // },
    // tools: {
    //     desktop: {
    //         sections: [
    //             {
    //                 id: 'main-01',
    //                 sectionId: 'MAIN_01',
    //             },
    //             {
    //                 id: 'main-best',
    //                 sectionId: 'MAIN_BEST',
    //             },
    //             {
    //                 id: 'main-new',
    //                 sectionId: 'MAIN_NEW',
    //             },
    //             {
    //                 id: 'main-02',
    //                 sectionId: 'MAIN_02',
    //             },
    //             {
    //                 id: 'main-03',
    //                 sectionId: 'MAIN_03',
    //             },
    //             {
    //                 id: 'main-sale',
    //                 sectionId: 'MAIN_SALE',
    //             },
    //         ],        },
    //     mobile: {
    //         sections: [
    //             {
    //                 id: 'main-01',
    //                 sectionId: 'MAIN_01',
    //             },
    //             {
    //                 id: 'main-best',
    //                 sectionId: 'MAIN_BEST',
    //             },
    //             {
    //                 id: 'main-new',
    //                 sectionId: 'MAIN_NEW',
    //             },
    //             {
    //                 id: 'main-02',
    //                 sectionId: 'MAIN_02',
    //             },
    //             {
    //                 id: 'main-03',
    //                 sectionId: 'MAIN_03',
    //             },
    //             {
    //                 id: 'main-sale',
    //                 sectionId: 'MAIN_SALE',
    //             },
    //         ],        },
    // },
    // christmas: {
    //     desktop: {
    //         sections: [
    //             {
    //                 id: 'main-01',
    //                 sectionId: 'MAIN_01',
    //             },
    //             {
    //                 id: 'main-best',
    //                 sectionId: 'MAIN_BEST',
    //             },
    //             {
    //                 id: 'main-new',
    //                 sectionId: 'MAIN_NEW',
    //             },
    //             {
    //                 id: 'main-02',
    //                 sectionId: 'MAIN_02',
    //             },
    //             {
    //                 id: 'main-03',
    //                 sectionId: 'MAIN_03',
    //             },
    //             {
    //                 id: 'main-sale',
    //                 sectionId: 'MAIN_SALE',
    //             },
    //         ],        },
    //     mobile: {
    //         sections: [
    //             {
    //                 id: 'main-01',
    //                 sectionId: 'MAIN_01',
    //             },
    //             {
    //                 id: 'main-best',
    //                 sectionId: 'MAIN_BEST',
    //             },
    //             {
    //                 id: 'main-new',
    //                 sectionId: 'MAIN_NEW',
    //             },
    //             {
    //                 id: 'main-02',
    //                 sectionId: 'MAIN_02',
    //             },
    //             {
    //                 id: 'main-03',
    //                 sectionId: 'MAIN_03',
    //             },
    //             {
    //                 id: 'main-sale',
    //                 sectionId: 'MAIN_SALE',
    //             },
    //         ],        },
    // },
};

export const getMainPageLayout = (
    type: MainPageLayoutType = 'home',
): MainPageLayout => {
    return layouts[type] || layouts.home;
};
