import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { profile } from '@/api/member';
import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import * as styles from '@/components/signup/form/index.css';
import { Button } from '@/shared/ui/button';
import { InputField, InputFieldContainer } from '@/shared/ui/input';
import { useToast } from '@/hooks/ui';
import { signupDuplicateCheckMemberIdSchema } from '@/schema';
import { ErrorMessage } from '@/shared/components/form';

const SignupFormId = () => {
    const { t } = useTranslation();

    const { register, getValues, setError, setValue, clearErrors, setFocus } =
        useFormContext();

    const {
        errors: {
            memberId: memberIdError,
            isDuplicateMemberId: isDuplicateMemberIdError,
        },
    } = useFormState({
        name: ['memberId', 'isDuplicateMemberId'],
    });

    const [isDuplicated, setIsDuplicated] = useState(true);

    useEffect(() => {
        if (isDuplicated) {
            setValue('isDuplicateMemberId', true);
        }
    }, [isDuplicated, setValue]);

    const checkDuplicateMemberIdMutate = useMutation({
        mutationFn: async (memberId: string) =>
            await profile.checkDuplicateId({ memberId }),
    });

    const { addToast } = useToast();

    const checkDuplicateMemberId = async () => {
        const memberId = getValues('memberId');

        try {
            signupDuplicateCheckMemberIdSchema.parse(memberId);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError('memberId', { message: error.issues[0].message });
            }
            return;
        }

        const { data: checkDuplicateMemberIdData } =
            await checkDuplicateMemberIdMutate.mutateAsync(memberId);

        if (checkDuplicateMemberIdData.exist) {
            setError('memberId', {
                message: t('이미 사용중인 아이디입니다.'),
            });
            setFocus('memberId');
            setValue('isDuplicateMemberId', true, { shouldValidate: true });
            setIsDuplicated(true);
            return;
        }

        addToast({
            message: t('사용 가능한 아이디입니다.'),
            variant: 'success',
        });
        setValue('isDuplicateMemberId', false, { shouldValidate: true });
        clearErrors('memberId');
        setIsDuplicated(false);
    };

    return (
        <WithMemberJoinConfig name='memberId' label={t('아이디')}>
            <InputFieldContainer gridRatio={[3, 1]}>
                <InputField
                    {...register('memberId', {
                        onChange: () => {
                            setIsDuplicated(true);
                        },
                    })}
                    type='text'
                    autoComplete='off'
                    placeholder={t(
                        '아이디를 입력해 주세요. (5자 이상의 영문, 숫자)',
                    )}
                    data-error={!!memberIdError || !!isDuplicateMemberIdError}
                />

                <Button
                    frame='solid'
                    variant='apple'
                    className={styles.button}
                    onClick={checkDuplicateMemberId}
                    disabled={checkDuplicateMemberIdMutate.isPending}
                >
                    {t('중복확인')}
                </Button>
            </InputFieldContainer>
            <ErrorMessage name='memberId' />
            <ErrorMessage name='isDuplicateMemberId' />
        </WithMemberJoinConfig>
    );
};

export default SignupFormId;
