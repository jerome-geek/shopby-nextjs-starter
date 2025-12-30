import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorMessage from '@/components/ui/form/ErrorMessage';
import Select from '@/components/ui/Select';
import { DAY_LIST, MONTH_LIST, YEAR_LIST } from '@/const/date';
import { css } from '@/styled-system/css';

export default function Birthday() {
    const { t } = useTranslation();
    const { control } = useFormContext();

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    gap: '8px',
                    '& > *': { flex: 1, minWidth: 0 },
                })}
            >
                <Controller
                    control={control}
                    name="birthday"
                    render={({ field: { value = '', onChange } }) => {
                        // 1. Normalize: 값이 없거나 짧으면 '_'로 채워 8자리 확보
                        // 예: "1990" -> "1990____", "" -> "________"
                        const normalizedValue = value.padEnd(8, '_');

                        // 2. Extract: 고정된 위치에서 값 추출 (언더바는 제거)
                        const year = normalizedValue
                            .substring(0, 4)
                            .replace(/_/g, '');
                        const month = normalizedValue
                            .substring(4, 6)
                            .replace(/_/g, '');
                        const day = normalizedValue
                            .substring(6, 8)
                            .replace(/_/g, '');

                        // Helper: 자리수 고정을 유지하며 값 업데이트 (설정 기반)
                        const updateDate = (
                            type: 'year' | 'month' | 'day',
                            newVal: string
                        ) => {
                            const config = {
                                year: { start: 0, end: 4 },
                                month: { start: 4, end: 6 },
                                day: { start: 6, end: 8 },
                            };

                            const { start, end } = config[type];
                            const nextValue =
                                normalizedValue.substring(0, start) +
                                newVal +
                                normalizedValue.substring(end);

                            onChange(nextValue);
                        };

                        return (
                            <>
                                <Select
                                    placeholder={t('년')}
                                    options={YEAR_LIST}
                                    value={
                                        YEAR_LIST.find(
                                            (opt) => opt.value === year
                                        ) || null
                                    }
                                    onChange={(option) =>
                                        updateDate(
                                            'year',
                                            option?.value || '____'
                                        )
                                    }
                                />
                                <Select
                                    placeholder={t('월')}
                                    options={MONTH_LIST}
                                    value={
                                        MONTH_LIST.find(
                                            (opt) => opt.value === month
                                        ) || null
                                    }
                                    onChange={(option) =>
                                        updateDate(
                                            'month',
                                            option?.value || '__'
                                        )
                                    }
                                />
                                <Select
                                    placeholder={t('일')}
                                    options={DAY_LIST}
                                    value={
                                        DAY_LIST.find(
                                            (opt) => opt.value === day
                                        ) || null
                                    }
                                    onChange={(option) =>
                                        updateDate('day', option?.value || '__')
                                    }
                                />
                            </>
                        );
                    }}
                />
            </div>
            <ErrorMessage name="birthday" />
        </div>
    );
}
