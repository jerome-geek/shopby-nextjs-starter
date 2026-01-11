'use client';

import DialogLayout, { DefaultDialogProps } from '@/components/layout/dialog';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/form';
import Select from '@/components/ui/Select';
import { GetMallResponse } from '@/models/admin/mall';
import { css } from '@/styled-system/css';
import { vstack } from '@/styled-system/patterns';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ProductInquiryDialogProps extends DefaultDialogProps {
    title?: string;
    contents?: string;
    inquiryTypeList: GetMallResponse['productInquiryType'];
}

export default function ProductInquiryDialog({
    title,
    contents,
    inquiryTypeList,
    ...props
}: ProductInquiryDialogProps) {
    const { t } = useTranslation();

    const methods = useForm({
        // defaultValues: {
        //     secreted: false,
        // },
    });

    const {
        control,
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = methods;

    return (
        <DialogLayout {...props}>
            <FormProvider {...methods}>
                <div className={vstack({ gap: '12px' })}>
                    <p>문의유형</p>
                    <Controller
                        control={control}
                        name='type'
                        rules={{
                            required: t('상품 문의 유형을 선택해 주세요.'),
                        }}
                        render={({ field: { onChange, value, ...rest } }) => (
                            <Select
                                {...rest}
                                name='type'
                                placeholder={t('유형을 선택해 주세요.')}
                                options={inquiryTypeList}
                                value={inquiryTypeList.find(
                                    (a) => a.value === value,
                                )}
                                onChange={(selectedOption) => {
                                    if (selectedOption) {
                                        onChange(selectedOption.value);
                                    }
                                }}
                            />
                        )}
                    />
                    <ErrorMessage name='type' errors={errors} />
                </div>

                <Button frame='solid' variant='primary'>
                    문의하기
                </Button>
            </FormProvider>
        </DialogLayout>
    );
}
