import { useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { pipe, when } from '@fxts/core';

import {
    ModalLayout,
    type DefaultModalLayoutProps,
} from '@/components/layout/modal';
import { Button } from '@/components/ui/button';
import useResponsive from '@/hooks/utils/useResponsive';
import * as styles from '@/components/modal/period-range-picker/index.css';

interface PeriodRangePickerModalProps extends DefaultModalLayoutProps {
    initialRange?: DateRange;
    onApply: (range: DateRange) => void;
}

export const PeriodRangePickerModal = ({
    isOpen,
    close,
    unmount,
    initialRange,
    onApply,
}: PeriodRangePickerModalProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const [range, setRange] = useState<DateRange | undefined>(initialRange);

    const onClickApply = () => {
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

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('기간 선택')}
            size='medium'
        >
            <div className={styles.container} data-lenis-prevent>
                <p className={styles.description}>
                    {t('시작일과 종료일을 선택해주세요.')}
                </p>

                <div className={styles.calendarWrapper}>
                    <DayPicker
                        mode='range'
                        selected={range}
                        onSelect={setRange}
                        numberOfMonths={isMobile ? 1 : 2}
                        defaultMonth={range?.to ?? new Date()}
                    />
                </div>

                <div className={styles.footer}>
                    <Button
                        type='button'
                        frame='outlined'
                        variant='secondary'
                        className={styles.footerButton}
                        onClick={close}
                    >
                        {t('취소')}
                    </Button>
                    <Button
                        type='button'
                        frame='solid'
                        variant='primary'
                        className={styles.footerButton}
                        onClick={onClickApply}
                        disabled={!range?.from || !range?.to}
                    >
                        {t('적용')}
                    </Button>
                </div>
            </div>
        </ModalLayout>
    );
};
