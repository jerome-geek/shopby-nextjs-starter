'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { GetCategoryResponse } from '@/models/display/category';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

interface CategoryListTabProps {
    href: string;
    categoryData: GetCategoryResponse;
}

export default function CategoryListTab({
    href,
    categoryData,
}: CategoryListTabProps) {
    const { t } = useTranslation();

    const searchParams = useSearchParams();
    const currentCategoryNo = searchParams.get('categoryNo');

    const isAllSelected = !currentCategoryNo;

    return (
        <div>
            <ul
                role="tablist"
                className={css({
                    paddingX: '22px',
                    display: 'flex',
                    gap: '14px',
                    borderBottom: `1px solid ${token('colors.gray20')}`,
                })}
            >
                <li
                    role="tab"
                    aria-selected={isAllSelected}
                    className={css({
                        paddingY: '12px',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: isAllSelected
                            ? token('colors.black')
                            : token('colors.gray70'),
                        position: 'relative',
                        _after: isAllSelected
                            ? {
                                  content: '""',
                                  position: 'absolute',
                                  bottom: '-1px',
                                  left: 0,
                                  right: 0,
                                  height: '2px',
                                  backgroundColor: token('colors.black'),
                              }
                            : {},
                    })}
                >
                    <Link
                        href={href}
                        aria-current={isAllSelected ? 'page' : undefined}
                    >
                        <span>{t('전체')}</span>
                    </Link>
                </li>
                {categoryData.multiLevelCategories[0].children.map((child) => {
                    const isSelected =
                        currentCategoryNo === String(child.categoryNo);
                    return (
                        <li
                            key={child.categoryNo}
                            role="tab"
                            aria-selected={isSelected}
                            className={css({
                                paddingY: '12px',
                                fontSize: '15px',
                                fontWeight: 500,
                                color: isSelected
                                    ? token('colors.black')
                                    : token('colors.gray70'),
                                position: 'relative',
                                cursor: 'pointer',
                                _after: isSelected
                                    ? {
                                          content: '""',
                                          position: 'absolute',
                                          bottom: '-1px',
                                          left: 0,
                                          right: 0,
                                          height: '2px',
                                          backgroundColor:
                                              token('colors.black'),
                                      }
                                    : {},
                            })}
                        >
                            <Link
                                href={`${href}?categoryNo=${child.categoryNo}`}
                                aria-current={isSelected ? 'page' : undefined}
                            >
                                <span>{child.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
