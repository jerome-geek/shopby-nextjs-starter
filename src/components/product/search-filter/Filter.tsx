'use client';

import CustomAccordion from '@/components/common/CustomAccordion';
import useFilter from '@/hooks/useFilter';
import { css } from '@/styled-system/css';
import { vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import Input from 'node_modules/react-select/dist/declarations/src/components/Input';
import { useTranslation } from 'react-i18next';
import InputCheckbox from '@/components/ui/input/Checkbox';

interface FilterProps {
    categoryNo: number;
    childCategoryNo: number;
    filterCategoryNo: number;
    itemInfoCategoryNo: number;
    mainCategoryNo: number;
}

export default function Filter({
    categoryNo,
    childCategoryNo,
    filterCategoryNo,
    itemInfoCategoryNo,
    mainCategoryNo,
}: FilterProps) {
    const { t } = useTranslation();

    const {
        initialValues,
        filterCategoryList,
        itemInfoCategoryList,
        toggleFilterProduct,
    } = useFilter({
        pageSize: 10,
        categoryNo: childCategoryNo || categoryNo,
        mainCategoryNo,
        filterCategoryNo,
        itemInfoCategoryNo,
    });

    console.log(itemInfoCategoryList);

    const isCategoryFilterChecked = (categoryNo: number) => {
        return !!initialValues.categoryNos?.includes(categoryNo);
    };

    return (
        <div>
            <ul
                className={css({
                    '& > li': {
                        borderBottom: `1px solid ${token('colors.gray20')}`,
                    },
                })}
            >
                <li>
                    <CustomAccordion
                        type='single'
                        defaultValue={'productInformation'}
                        items={[
                            {
                                value: 'productInformation',
                                header: (
                                    <div
                                        className={css({
                                            padding: '24px 0',
                                            width: '100%',
                                        })}
                                    >
                                        <p
                                            className={css({
                                                textStyle: 'heading.semibold',
                                            })}
                                        >
                                            {t('아이템 정보')}
                                        </p>
                                    </div>
                                ),
                                content: (
                                    <ul
                                        className={vstack({
                                            padding: '0 0 24px',
                                            width: '100%',
                                            alignItems: 'start',
                                        })}
                                    >
                                        {itemInfoCategoryList?.childCategories?.map(
                                            (childCategory) => (
                                                <li
                                                    key={
                                                        childCategory.categoryNo
                                                    }
                                                >
                                                    <label
                                                        className={css({
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: '12px',
                                                            textStyle:
                                                                'body1.regular',
                                                            color: 'gray80',
                                                        })}
                                                    >
                                                        <InputCheckbox
                                                            checked={isCategoryFilterChecked(
                                                                childCategory.categoryNo,
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleFilterProduct(
                                                                    childCategory.categoryNo,
                                                                )
                                                            }
                                                        />
                                                        {childCategory.label}
                                                    </label>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                ),
                            },
                        ]}
                    />
                </li>

                {filterCategoryList?.childCategories?.map((category) => (
                    <li key={category.categoryNo}>
                        <CustomAccordion
                            type='single'
                            defaultValue={'productInformation'}
                            items={[
                                {
                                    value: 'productInformation',
                                    header: (
                                        <div
                                            className={css({
                                                padding: '24px 0',
                                                width: '100%',
                                            })}
                                        >
                                            <p
                                                className={css({
                                                    textStyle:
                                                        'heading.semibold',
                                                })}
                                            >
                                                {category.label}
                                            </p>
                                        </div>
                                    ),
                                    content: (
                                        <ul
                                            className={vstack({
                                                padding: '0 0 24px',
                                                width: '100%',
                                                alignItems: 'start',
                                            })}
                                        >
                                            {category.childCategories?.map(
                                                (childCategory) => (
                                                    <li
                                                        key={
                                                            childCategory.categoryNo
                                                        }
                                                    >
                                                        <label
                                                            className={css({
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: '12px',
                                                                textStyle:
                                                                    'body1.regular',
                                                                color: 'gray80',
                                                            })}
                                                        >
                                                            <InputCheckbox
                                                                checked={isCategoryFilterChecked(
                                                                    childCategory.categoryNo,
                                                                )}
                                                                onCheckedChange={() =>
                                                                    toggleFilterProduct(
                                                                        childCategory.categoryNo,
                                                                    )
                                                                }
                                                            />
                                                            {
                                                                childCategory.label
                                                            }
                                                        </label>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    ),
                                },
                            ]}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
