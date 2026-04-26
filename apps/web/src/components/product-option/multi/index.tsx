import { compact, join, map, pipe } from '@fxts/core';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Props, SingleValue } from 'react-select';

import { Select } from '@/components/ui/input';
import * as bottomSheetStyles from '@/components/bottom-sheet/option-select/index.css';
import useProductOption from '@/hooks/product/useProductOption';
import { useResponsive } from '@/hooks/utils';
import type { MultiLevelOption } from '@/models/product/productOption';

interface MultiProductOptionProps {
    productNo: number;
    onChange: (option: SingleValue<MultiLevelOption>) => void;
    checkOptionDisabled?: (option: MultiLevelOption) => boolean;
    classNames?: Props<MultiLevelOption>['classNames'];
}

export const MultiProductOption = ({
    productNo,
    onChange,
    checkOptionDisabled,
    classNames,
}: MultiProductOptionProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const {
        productOptionListData,
        getMultiLevelOptionLabel,
        isOptionDisabled,
    } = useProductOption({ productNo });

    // 선택된 값들을 관리하는 유일한 state
    const [selectedValueList, setSelectedValueList] = useState<
        Nullable<MultiLevelOption>[]
    >([null, null, null, null, null]);

    // 선택된 값을 기반으로 각 단계의 옵션 리스트를 계산 (Derived State)
    const optionLists = useMemo(() => {
        if (!productOptionListData) return [];

        const lists: MultiLevelOption[][] = [
            productOptionListData.multiLevelOptions,
        ];

        // 현재 선택된 값들의 자식(children)들을 다음 단계 리스트로 주입
        selectedValueList.forEach((selected, idx) => {
            if (selected && 'children' in selected && selected.children) {
                lists[idx + 1] = selected.children as MultiLevelOption[];
            }
        });

        return lists;
    }, [productOptionListData, selectedValueList]);

    const onOptionChange = (v: MultiLevelOption, index: number) => {
        if (!v) return;

        // 1. 새로운 선택 상태 계산 (현재 인덱스 이후는 모두 초기화)
        const nextValueList = selectedValueList.map((prev, i) => {
            if (i < index) {
                return prev;
            }
            if (i === index) {
                return v;
            }
            return null;
        });

        setSelectedValueList(nextValueList);

        // 2. 부모에게 변경 알림 (레이블 조합)
        onChange({
            ...v,
            label: `${t('옵션')} : ${pipe(
                nextValueList,
                compact,
                map((a) => t(a?.value || '')),
                join('|'),
            )}`,
        });
    };

    if (!productOptionListData) {
        return null;
    }

    return (
        <div
            role='group'
            aria-label={t('분리형 옵션')}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
            {productOptionListData.labels.map((label, index) => (
                <div key={`${label}-${index}`}>
                    <p className={bottomSheetStyles.optionLabel}>
                        {label} <span className={bottomSheetStyles.required}>*</span>
                    </p>
                    <Select
                        placeholder={t('옵션을 선택하세요')}
                        options={optionLists[index] || []}
                        value={selectedValueList[index]}
                        getOptionLabel={getMultiLevelOptionLabel}
                        getOptionValue={(option) =>
                            (option as MultiLevelOption).value
                        }
                        onChange={(v) =>
                            onOptionChange(v as MultiLevelOption, index)
                        }
                        isOptionDisabled={
                            // 마지막 단계만 외부 disabled 체크 적용, 나머지는 항상 활성
                            index === productOptionListData.labels.length - 1
                                ? (checkOptionDisabled ?? isOptionDisabled)
                                : () => false
                        }
                        noOptionsMessage={() => (
                            <span>
                                {index > 0
                                    ? t('{{label}}을(를) 먼저 선택해 주세요.', {
                                          label: productOptionListData.labels[
                                              index - 1
                                          ],
                                      })
                                    : t('옵션 정보가 없습니다.')}
                            </span>
                        )}
                        menuPlacement={isMobile ? 'bottom' : 'auto'}
                        maxMenuHeight={200}
                        classNames={classNames}
                    />
                </div>
            ))}
        </div>
    );
};
