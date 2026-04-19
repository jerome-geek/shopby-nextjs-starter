import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DefaultModalLayoutProps } from '@/components/layout';
import * as styles from '@/components/modal/report/index.css';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import {
    InputContainer,
    InputLabel,
    Select,
    TextArea,
} from '@/components/ui/input';
import { useReviewMutation } from '@/hooks/mutations';
import { useToast } from '@/hooks/ui/useToast';
import { ReportProductReviewData } from '@/models/display/review';

interface ReviewReportProps extends DefaultModalLayoutProps {
    productNo: number;
    reviewNo: number;
}

export const REPORT_REASON_OPTIONS = [
    { value: 'COPYRIGHT', label: '저작권 침해' },
    { value: 'SLANDER', label: '비방' },
];

export const ReviewReport = ({
    productNo,
    reviewNo,
    ...props
}: ReviewReportProps) => {
    const { t } = useTranslation();

    const { addToast } = useToast();

    const { report: reportMutate } = useReviewMutation({ productNo });

    const methods = useForm<ReportProductReviewData>({
        defaultValues: {
            reportReasonCd: 'COPYRIGHT',
            content: '',
        },
    });

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = methods;

    const content = watch('content');
    const contentLength = content?.length || 0;
    const maxLength = 1000;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await reportMutate.mutateAsync({ reviewNo, data });

            addToast({
                message: t('신고가 접수되었습니다.'),
                variant: 'success',
            });
            props.close();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider {...methods}>
            <form
                id='review-report-form'
                className={styles.form}
                onSubmit={onSubmit}
            >
                <p className={styles.guideText}>
                    {t('신고 사유를 선택해주세요.')}
                    <br />
                    {t('신고 내용은 이용약관 및 정책에 의하여 처리됩니다.')}
                </p>

                <InputContainer>
                    <InputLabel isRequired>{t('신고 사유')}</InputLabel>
                    <Controller
                        name='reportReasonCd'
                        control={control}
                        rules={{
                            required: t('신고 사유를 선택해 주세요.'),
                        }}
                        render={({ field: { onChange, value, ...rest } }) => (
                            <Select
                                {...rest}
                                placeholder={t('사유를 선택해 주세요.')}
                                options={REPORT_REASON_OPTIONS}
                                value={
                                    REPORT_REASON_OPTIONS.find(
                                        (option) => option.value === value,
                                    ) ?? null
                                }
                                onChange={(selectedOption) => {
                                    if (selectedOption) {
                                        onChange(selectedOption.value);
                                    }
                                }}
                            />
                        )}
                    />
                    <ErrorMessage name='reportReasonCd' />
                </InputContainer>

                <InputContainer>
                    <InputLabel isRequired>{t('상세 사유')}</InputLabel>
                    <div className={styles.textAreaContainer}>
                        <TextArea
                            placeholder={t('상세 사유를 입력해 주세요.')}
                            {...register('content', {
                                required: t('상세 사유를 입력해 주세요.'),
                            })}
                            maxLength={maxLength}
                            style={{ height: '120px', paddingBottom: '30px' }}
                            data-error={!!errors.content}
                        />
                        <span className={styles.characterCount}>
                            {contentLength} / {maxLength}
                        </span>
                    </div>
                    <ErrorMessage name='content' />
                </InputContainer>

                <p className={styles.warningText}>
                    {t(
                        '※ 허위 신고일 경우, 신고자의 서비스 활동이 제한될 수 있으니 유의하시어 신중하게 신고해주세요.',
                    )}
                </p>
            </form>
        </FormProvider>
    );
};
