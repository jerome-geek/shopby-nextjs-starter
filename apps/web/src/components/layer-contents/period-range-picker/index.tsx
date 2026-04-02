import { pipe, when } from '@fxts/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import { useTranslation } from 'react-i18next';

import { type DefaultModalLayoutProps } from '@/components/layout/modal';
import * as styles from '@/components/layer-contents/period-range-picker/index.css';
import useResponsive from '@/hooks/utils/useResponsive';
import { vars } from '@/styles/theme.css';

interface PeriodRangePickerProps extends DefaultModalLayoutProps {
    initialRange?: DateRange;
    onApply: (range: DateRange) => void;
}

export const PeriodRangePicker = ({
    close,
    initialRange,
    onApply,
}: PeriodRangePickerProps) => {
    const { t } = useTranslation();
    useResponsive();

    const [range, setRange] = useState<DateRange | undefined>(initialRange);
    const today = dayjs().toDate();

    const onClickApply = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        pipe(
            range,
            when(
                (selectedDateRange) =>
                    !!selectedDateRange?.from && !!selectedDateRange?.to,
                (selectedDateRange) => {
                    onApply(selectedDateRange as DateRange);
                    close();
                },
            ),
        );
    };

    useEffect(() => {
        const submitButton = document.getElementById(
            'period-range-picker-submit-button',
        ) as HTMLButtonElement;

        if (!submitButton) {
            return;
        }

        submitButton.textContent =
            range?.from && range?.to
                ? `${range?.from?.toLocaleDateString()} - ${range?.to?.toLocaleDateString()}`
                : t('기간 선택');
        submitButton.disabled = !range?.from || !range?.to;
    }, [range]);

    return (
        <div className={styles.container} data-lenis-prevent>
            <p className={styles.description}>
                {t('시작일과 종료일을 선택해주세요.')}
            </p>

            <div className={styles.calendarWrapper}>
                <DayPicker
                    mode='range'
                    selected={range}
                    onSelect={setRange}
                    hideNavigation
                    locale={ko}
                    captionLayout='dropdown'
                    startMonth={dayjs()
                        .subtract(10, 'year')
                        .startOf('year')
                        .toDate()}
                    endMonth={today}
                    disabled={{ after: today }}
                    defaultMonth={range?.to ?? today}
                    styles={{
                        button_next: { color: vars.color.black },
                        button_previous: { color: vars.color.black },
                        day_button: {
                            borderRadius: '999px',
                        },
                    }}
                    modifiersStyles={{
                        selected: {
                            backgroundColor: vars.color.black,
                            color: vars.color.white,
                        },
                        range_start: {
                            backgroundColor: vars.color.black,
                            color: vars.color.white,
                            borderRadius: '4px 0 0 4px',
                        },
                        range_end: {
                            backgroundColor: vars.color.black,
                            color: vars.color.white,
                            borderRadius: '0 4px 4px 0',
                        },
                        range_middle: {
                            backgroundColor: vars.color.gray['20'],
                            color: vars.color.black,
                        },
                        today: {
                            outlineOffset: '-2px',
                        },
                    }}
                />
            </div>

            <form id='period-range-picker-form' onSubmit={onClickApply}></form>
        </div>
    );
};
