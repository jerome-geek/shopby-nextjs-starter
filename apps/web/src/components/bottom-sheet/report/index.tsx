import { ErrorMessage } from '@hookform/error-message';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
    BottomSheetLayout,
    DefaultModalLayoutProps,
} from '@/components/layout';
import { REPORT_REASON_OPTIONS } from '@/components/modal/report';
import * as styles from '@/components/modal/report/index.css';
import { Button } from '@/components/ui/button';
import {
    InputContainer,
    InputLabel,
    Select,
    TextArea,
} from '@/components/ui/input';
import useBoardMutation from '@/hooks/mutations/useBoardMutation';
import { useDialog } from '@/hooks/utils';
import { ReportArticleData } from '@/models/manage/board';

interface ReportBottomSheetProps extends DefaultModalLayoutProps {
    boardNo: string;
    articleNo: number;
}

export const ReportBottomSheet = ({
    isOpen,
    close,
    unmount,
    boardNo,
    articleNo,
}: ReportBottomSheetProps) => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const { report: reportMutate } = useBoardMutation();

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ReportArticleData>({
        defaultValues: {
            reportReasonType: undefined,
            content: '',
        },
    });

    const content = watch('content');
    const contentLength = content?.length || 0;
    const maxLength = 1000;

    const onSubmit = handleSubmit((data) => {
        if (!boardNo || !articleNo) {
            openDialog({
                message: t('신고할 게시글 정보를 찾을 수 없습니다.'),
            });
            return;
        }

        reportMutate.mutate(
            { boardNo, articleNo, data },
            {
                onSuccess: () => {
                    close();
                    openDialog({ message: t('신고가 접수되었습니다.') });
                },
                onError: () => {
                    openDialog({ message: t('신고 처리에 실패했습니다.') });
                },
            },
        );
    });

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('신고하기')}
            footerButtonList={[
                <Button
                    key='report-cancel-button'
                    frame='outlined'
                    variant='primary'
                    type='button'
                    onClick={close}
                >
                    {t('취소')}
                </Button>,
                <Button
                    key='report-submit-button'
                    frame='solid'
                    variant='primary'
                    type='submit'
                    form='report-form'
                >
                    {t('등록')}
                </Button>,
            ]}
        >
            <form
                id='report-form'
                className={styles.form}
                onSubmit={onSubmit}
                data-lenis-prevent
            >
                <p className={styles.guideText}>
                    {t('신고 사유를 선택해주세요.')}
                    <br />
                    {t('신고 내용은 이용약관 및 정책에 의하여 처리됩니다.')}
                </p>

                <InputContainer>
                    <InputLabel isRequired>{t('신고 사유')}</InputLabel>
                    <Controller
                        name='reportReasonType'
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
                    <ErrorMessage name='reportReasonType' errors={errors} />
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
                        />
                        <span className={styles.characterCount}>
                            {contentLength} / {maxLength}
                        </span>
                    </div>
                    <ErrorMessage name='content' errors={errors} />
                </InputContainer>

                <p className={styles.warningText}>
                    {t(
                        '※ 허위 신고일 경우, 신고자의 서비스 활동이 제한될 수 있으니 유의하시어 신중하게 신고해주세요.',
                    )}
                </p>
            </form>
        </BottomSheetLayout>
    );
};
