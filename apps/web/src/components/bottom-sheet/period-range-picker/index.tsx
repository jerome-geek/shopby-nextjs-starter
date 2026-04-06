import { type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

import { PeriodRangePicker } from '@/components/layer-contents/period-range-picker';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/components/layout';
import { Button } from '@/components/ui/button';

interface PeriodRangePickerBottomSheetProps extends DefaultBottomSheetProps {
    initialRange?: DateRange;
    onApply: (range: DateRange) => void;
}

export const PeriodRangePickerBottomSheet = ({
    isOpen,
    close,
    unmount,
    initialRange,
    onApply,
}: PeriodRangePickerBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('기간 선택')}
            footerButtonList={[
                <Button
                    key='period-range-picker-submit-button'
                    frame='solid'
                    variant='primary'
                    type='submit'
                    form='period-range-picker-form'
                    id='period-range-picker-submit-button'
                ></Button>,
            ]}
        >
            <PeriodRangePicker
                initialRange={initialRange}
                onApply={onApply}
                close={close}
                unmount={unmount}
                isOpen={isOpen}
            />
        </BottomSheetLayout>
    );
};
