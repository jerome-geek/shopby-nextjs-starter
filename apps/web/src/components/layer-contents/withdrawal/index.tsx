import {
    append,
    compact,
    filter,
    isEmpty,
    pipe,
    takeRight,
    toArray,
    uniq,
} from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import * as styles from '@/components/layer-contents/withdrawal/index.css';
import { type DefaultModalLayoutProps } from '@/components/layout';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import { InputContainer, InputLabel, TextArea } from '@/components/ui/input';
import Select from '@/components/ui/select';
import { WITHDRAWAL_REASON_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import useProfileMutation from '@/hooks/mutations/useProfileMutation';
import { useMyApp } from '@/hooks/myapp';
import useAccumulationSummary from '@/hooks/query/manage/accumulation/useAccumulationSummary';
import useApiError from '@/hooks/useApiError';
import { useDialog } from '@/hooks/utils';
import { memberCookie } from '@/utils/cookie';
import { CURRENCY } from '@/utils/currency';

const ETC = 'ETC' as const;

const schema = z.object({
    reason: z.string().min(1, '탈퇴 사유를 입력해 주세요.'),
});

type FormValues = z.infer<typeof schema>;

export const Withdrawal = (props: DefaultModalLayoutProps) => {
    const router = useRouter();

    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { handleErrorDialog } = useApiError();

    const { isMyApp, handleSendLogout } = useMyApp();
    const { openAsyncDialog } = useDialog();

    const { data: accumulationSummaryData } = useAccumulationSummary();

    const optionList = useMemo(() => {
        return Object.keys(WITHDRAWAL_REASON_MAP).map((reason) => ({
            label: t(
                WITHDRAWAL_REASON_MAP[
                    reason as keyof typeof WITHDRAWAL_REASON_MAP
                ],
            ),
            value: reason,
        }));
    }, [t]);

    const [selectOptionList, setSelectOptionList] = useState<string[]>([]);

    const isEtcSelect = selectOptionList.includes(ETC);

    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            reason: '',
        },
    });

    const { register, handleSubmit, setValue, formState } = methods;

    const { delete: withdrawal } = useProfileMutation();

    const onSubmit = handleSubmit(async (data) => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: t('회원탈퇴를 진행하시겠습니까?'),
            onCloseReturnValue: false,
            onConfirmReturnValue: true,
        });

        if (!isAgree) {
            return;
        }

        withdrawal.mutate(
            {
                data: {
                    reason: data.reason,
                },
            },
            {
                onSuccess: async () => {
                    await openAsyncDialog({
                        message: t('회원탈퇴가 완료되었습니다.'),
                        onCloseReturnValue: true,
                        onConfirmReturnValue: true,
                    });

                    if (isMyApp) {
                        handleSendLogout({
                            option: {
                                returnUrl: window.location.origin,
                            },
                        });
                        return;
                    }

                    props.close();
                    memberCookie.clearAll();
                    queryClient.removeQueries();

                    router.replace(PATHS.MAIN);
                },
                onError: (error) => {
                    handleErrorDialog(error);
                },
            },
        );
    });

    return (
        <div className={styles.container}>
            <FormProvider {...methods}>
                <form
                    id='withdrawal-form'
                    onSubmit={onSubmit}
                    className={styles.form}
                >
                    <div className={styles.accumulationContainer}>
                        <p className={styles.accumulationText}>
                            {t('이용해주셔서 감사합니다.')}
                            <br />
                            {t('아울러 회원 탈퇴 시의 사항을 안내드립니다.')}
                        </p>
                        <p className={styles.accumulationText}>
                            {t(
                                '∙ 회원 탈퇴 시 회원님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에 의거한 고객정보 보호정책에 따라 관리됩니다.',
                            )}
                        </p>
                        <p className={styles.accumulationText}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t(
                                        '∙ 탈퇴 시 보유중인 적립금 <b>{{accumulation}}</b> 이 삭제됩니다.',
                                        {
                                            accumulation: CURRENCY(
                                                accumulationSummaryData?.totalAvailableAmt ??
                                                    0,
                                            ).format(),
                                        },
                                    ),
                                }}
                            />
                        </p>
                    </div>

                    <div className={styles.contentContainer}>
                        <InputContainer>
                            <InputLabel isRequired>
                                {t('탈퇴 사유')} <b>({t('최대 3가지')})</b>
                            </InputLabel>

                            <Select
                                options={optionList}
                                placeholder={t('탈퇴 사유를 선택해주세요.')}
                                value={null}
                                menuPortalTarget={document.body}
                                onChange={(opt) => {
                                    if (!opt) {
                                        return;
                                    }

                                    setSelectOptionList((prev) => {
                                        const nextValue = String(opt.value);

                                        if (prev.includes(nextValue)) {
                                            const next = prev.filter(
                                                (v) => v !== nextValue,
                                            );
                                            if (isEmpty(next)) {
                                                setValue('reason', '', {
                                                    shouldValidate: true,
                                                });
                                            }
                                            return next;
                                        }

                                        if (nextValue === ETC) {
                                            setValue('reason', '', {
                                                shouldValidate: true,
                                            });
                                            return [ETC];
                                        }

                                        const selectedReasonList = pipe(
                                            prev,
                                            filter((v) => v !== ETC),
                                            append(nextValue),
                                            compact,
                                            uniq,
                                            takeRight(3),
                                            toArray,
                                        );

                                        setValue(
                                            'reason',
                                            selectedReasonList
                                                .map(
                                                    (reason) =>
                                                        WITHDRAWAL_REASON_MAP[
                                                            reason as keyof typeof WITHDRAWAL_REASON_MAP
                                                        ],
                                                )
                                                .join(', '),
                                            {
                                                shouldValidate: true,
                                            },
                                        );

                                        return selectedReasonList;
                                    });
                                }}
                            />

                            <div className={styles.reasonMessageContainer}>
                                {!isEmpty(selectOptionList) &&
                                    selectOptionList.map((reason) => (
                                        <p
                                            key={reason}
                                            className={styles.reasonMessage}
                                        >
                                            [
                                            {t(
                                                WITHDRAWAL_REASON_MAP[
                                                    reason as keyof typeof WITHDRAWAL_REASON_MAP
                                                ],
                                            )}
                                            ]
                                        </p>
                                    ))}
                            </div>
                        </InputContainer>

                        {isEtcSelect ? (
                            <InputContainer>
                                <InputLabel isRequired>
                                    {t('상세 사유')}
                                </InputLabel>
                                <TextArea
                                    placeholder={t('상세 사유를 입력해주세요.')}
                                    rows={5}
                                    {...register('reason')}
                                    data-error={!!formState.errors.reason}
                                />
                                <ErrorMessage name='reason' />
                            </InputContainer>
                        ) : null}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
