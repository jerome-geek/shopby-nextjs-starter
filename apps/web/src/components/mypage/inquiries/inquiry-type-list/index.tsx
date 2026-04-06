import { find } from '@fxts/core';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Select from '@/components/ui/select';
import { useInquiryTypeList } from '@/hooks/query/manage/inquiry';
import type { RegisterInquirySchemaType } from '@/schema/inquiry.schema';
import * as styles from '@/components/mypage/inquiries/inquiry-type-list/index.css';

interface InquiryTypeListProps {
    disabled?: boolean;
    onTypeDescriptionChange: (description: string) => void;
}

export const InquiryTypeList = ({
    disabled,
    onTypeDescriptionChange,
}: InquiryTypeListProps) => {
    const { t } = useTranslation();
    const { control } = useFormContext<RegisterInquirySchemaType>();

    const { data: inquiryTypeListData, isPending: isInquiryTypeListPending } =
        useInquiryTypeList();

    const inquiryTypeNo = useWatch({
        control,
        name: 'inquiryTypeNo',
        defaultValue: 0,
    });

    const options =
        inquiryTypeListData?.map((item) => ({
            value: String(item.inquiryTypeNo),
            label: item.inquiryTypeName,
            description: item.inquiryTypeDescription,
        })) ?? [];

    useEffect(() => {
        if (!inquiryTypeListData?.length || !inquiryTypeNo) {
            onTypeDescriptionChange('');
            return;
        }

        const item = inquiryTypeListData.find(
            (row) => row.inquiryTypeNo === inquiryTypeNo,
        );
        onTypeDescriptionChange(item?.inquiryTypeDescription ?? '');
    }, [inquiryTypeNo, inquiryTypeListData, onTypeDescriptionChange]);

    return (
        <Controller
            name='inquiryTypeNo'
            control={control}
            render={({ field: { onChange, value } }) => {
                const selected = find(
                    (o) => o.value === String(value),
                    options,
                );

                if (isInquiryTypeListPending) {
                    return <div className={styles.skeleton} aria-hidden />;
                }

                return (
                    <div className={styles.selectWrap}>
                        <Select
                            isDisabled={disabled}
                            placeholder={t('문의 유형을 선택해 주세요.')}
                            options={options}
                            value={selected}
                            onChange={(opt) => {
                                if (!opt) {
                                    return;
                                }

                                onChange(Number(opt.value));
                            }}
                        />
                    </div>
                );
            }}
        />
    );
};
