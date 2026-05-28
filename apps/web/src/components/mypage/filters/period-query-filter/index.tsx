import dayjs from 'dayjs';
import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { DateRange } from 'react-day-picker';
import { overlay } from 'overlay-kit';
import { useQueryStates } from 'nuqs';

import { Select } from '@/shared/ui/input';
import { PeriodRangePickerModal } from '@/components/modal/period-range-picker';
import * as styles from '@/components/mypage/filters/period-query-filter/index.css';
import { useResponsive } from '@/hooks/utils';
import { PeriodRangePickerBottomSheet } from '@/components/bottom-sheet/period-range-picker';
import { parseAsPositiveInt, parseAsYmd } from '@/entities/mypage/utils/parsers';

export type PeriodPreset = '7d' | '3m' | '6m' | '1y' | 'custom';
export type PeriodPresetOption = { value: PeriodPreset; label: string };

interface PeriodQueryFilterProps {
    startKey?: string;
    endKey?: string;
    pageKey?: string;
    className?: string;
}

const formatYmd = (date: Date) => dayjs(date).format('YYYY-MM-DD');

const getActivePreset = (startYmd: string, endYmd: string): PeriodPreset => {
    if (startYmd && endYmd) {
        const diff =
            startYmd && endYmd
                ? dayjs(endYmd).diff(dayjs(startYmd), 'day')
                : null;

        switch (true) {
            case diff === 7: {
                return '7d';
            }
            case diff !== null && diff >= 89 && diff <= 92: {
                return '3m';
            }
            case diff !== null && diff >= 179 && diff <= 184: {
                return '6m';
            }
            case diff !== null && diff >= 364 && diff <= 366: {
                return '1y';
            }
            default: {
                return 'custom';
            }
        }
    }

    return '3m';
};

const getPresetRange = (preset: Exclude<PeriodPreset, 'custom'>) => {
    const endDate = dayjs();
    const startDate =
        preset === '7d'
            ? endDate.subtract(7, 'day')
            : preset === '3m'
              ? endDate.subtract(3, 'month')
              : preset === '6m'
                ? endDate.subtract(6, 'month')
                : endDate.subtract(1, 'year');

    return { startDate, endDate };
};

export const PeriodQueryFilter = ({
    startKey = 'startYmd',
    endKey = 'endYmd',
    pageKey = 'pageNumber',
    className,
}: PeriodQueryFilterProps) => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const [query, setQueryStates] = useQueryStates(
        {
            [startKey]: parseAsYmd,
            [endKey]: parseAsYmd,
            ...(pageKey ? { [pageKey]: parseAsPositiveInt } : {}),
        } as const,
        { shallow: true, history: 'push' },
    );

    const startYmd = String((query as Record<string, string | number | null>)[startKey] ?? '');
    const endYmd = String((query as Record<string, string | number | null>)[endKey] ?? '');

    const activePreset = useMemo(
        () => getActivePreset(startYmd, endYmd),
        [startYmd, endYmd],
    );

    const periodOptions: PeriodPresetOption[] = useMemo(
        () => [
            { value: '7d', label: t('7일') },
            { value: '3m', label: t('3개월') },
            { value: '6m', label: t('6개월') },
            { value: '1y', label: t('1년') },
            { value: 'custom', label: t('직접입력') },
        ],
        [t],
    );

    const setQuery = (next: Record<string, string | number | undefined>) => {
        const pageReset = pageKey ? { [pageKey]: 1 } : {};
        setQueryStates({ ...(next as object), ...(pageReset as object) } as never);
    };

    const openCustomPicker = () => {
        const startDate = startYmd ? dayjs(startYmd).toDate() : undefined;
        const endDate = endYmd ? dayjs(endYmd).toDate() : undefined;

        const initialRange: DateRange =
            startDate || endDate
                ? { from: startDate, to: endDate }
                : {
                      from: dayjs().subtract(3, 'month').toDate(),
                      to: new Date(),
                  };

        overlay.open((props) =>
            isMobile ? (
                <PeriodRangePickerBottomSheet
                    {...props}
                    initialRange={initialRange}
                    onApply={(range) => {
                        const start = range.from;
                        const end = range.to;
                        if (!start || !end) {
                            return;
                        }

                        setQuery({
                            [startKey]: formatYmd(start),
                            [endKey]: formatYmd(end),
                        });
                    }}
                />
            ) : (
                <PeriodRangePickerModal
                    {...props}
                    initialRange={initialRange}
                    onApply={(range) => {
                        const start = range.from;
                        const end = range.to;
                        if (!start || !end) {
                            return;
                        }

                        setQuery({
                            [startKey]: formatYmd(start),
                            [endKey]: formatYmd(end),
                        });
                    }}
                />
            ),
        );
    };

    const onChangePreset = (preset: PeriodPreset) => {
        if (preset === 'custom') {
            openCustomPicker();
            return;
        }

        const { startDate, endDate } = getPresetRange(preset);
        setQuery({
            [startKey]: startDate.format('YYYY-MM-DD'),
            [endKey]: endDate.format('YYYY-MM-DD'),
        });
    };

    const selectedOption =
        periodOptions.find(
            (periodOption) => periodOption.value === activePreset,
        ) ?? periodOptions[periodOptions.length - 1];

    return (
        <div className={clsx(styles.row, className)}>
            <Select
                className={styles.select}
                value={selectedOption}
                options={periodOptions}
                onChange={(nextOption) => {
                    const nextPreset = nextOption?.value ?? 'custom';
                    onChangePreset(nextPreset);
                }}
            />
        </div>
    );
};
