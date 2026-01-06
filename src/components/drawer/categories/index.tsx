'use client';

import { head, isEmpty } from '@fxts/core';
import { AnimatePresence } from 'motion/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';

import Dimmed from '@/components/common/Dimmed';
import DeskTopCategories from '@/components/drawer/categories/DeskTop';
import MobileCategories from '@/components/drawer/categories/Mobile';
import useCategoriesByCode from '@/hooks/query/display/category/useCategoriesByCode';
import useCategory from '@/hooks/query/display/category/useCategory';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MultiLevelCategory } from '@/models/display';
import findCategory from '@/utils/category';

interface CategoriesDrawerProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

export interface CategoriesProps {
    oneDepthCategoryList: MultiLevelCategory[];
    twoDepthCategoryList: MultiLevelCategory[];
    selectCategoryNo: number;
    setSelectCategoryNo: (categoryNo: number) => void;
}

const Categories = ({ isOpen, close, unmount }: CategoriesDrawerProps) => {
    const { t } = useTranslation();

    const params = useParams();
    const categoryNo = (params.categoryNo ?? '') as string;

    const mediaQueryResult = useMediaQuery('(max-width: 767px)');
    const isMobile = mediaQueryResult === true;
    const isMediaQueryReady = mediaQueryResult !== null;

    const { data: categoriesByCodeData } = useCategoriesByCode({
        data: {
            codes: ['MAIN'],
        },
    });

    const mainCategoryNo = categoriesByCodeData?.[0]?.displayCategoryNo ?? '';

    const { data: categoryData } = useCategory({
        categoryNo: mainCategoryNo.toString(),
    });

    const findCategoryData = findCategory(
        categoryData?.flatCategories ?? [],
        categoryNo,
    );

    const oneDepthCategoryNo = findCategoryData?.depth2CategoryNo;

    const oneDepthCategoryList = useMemo(() => {
        if (!categoryData || isEmpty(categoryData?.multiLevelCategories)) {
            return [];
        }

        return categoryData.multiLevelCategories?.[0]?.children;
    }, [categoryData]);

    const [selectCategoryNo, setSelectCategoryNo] = useState(() => {
        const headCategoryNo = head(oneDepthCategoryList)?.categoryNo ?? 0;

        return oneDepthCategoryNo || headCategoryNo;
    });

    const twoDepthCategoryList = useMemo(() => {
        if (!oneDepthCategoryList || isEmpty(oneDepthCategoryList)) {
            return [];
        }

        return (
            oneDepthCategoryList.find(
                (category) => category.categoryNo === selectCategoryNo,
            )?.children ?? []
        );
    }, [selectCategoryNo, oneDepthCategoryList]);

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <>
                    <Dimmed
                        onClick={close}
                        style={{
                            zIndex: isMobile ? 50 : 21,
                        }}
                    />
                    {isMobile ? (
                        <MobileCategories
                            oneDepthCategoryList={oneDepthCategoryList}
                            twoDepthCategoryList={twoDepthCategoryList}
                            selectCategoryNo={selectCategoryNo}
                            setSelectCategoryNo={setSelectCategoryNo}
                        />
                    ) : (
                        <DeskTopCategories
                            oneDepthCategoryList={oneDepthCategoryList}
                            twoDepthCategoryList={twoDepthCategoryList}
                            selectCategoryNo={selectCategoryNo}
                            setSelectCategoryNo={setSelectCategoryNo}
                        />
                    )}
                </>
            )}
        </AnimatePresence>
    );
};

export default Categories;
