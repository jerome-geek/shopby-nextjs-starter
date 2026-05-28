import { type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

import { PeriodRangePicker } from '@/components/layer-contents/period-range-picker';
import { ModalLayout, type DefaultModalLayoutProps } from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';

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

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('기간 선택')}
            size='small'
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
        </ModalLayout>
    );
};
