import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { profile } from '@/api/member';
import WithMemberJoinConfig from '@/features/member/member-join-config-field';
import * as styles from '@/components/signup/form/index.css';
import { useMall } from '@/hooks/query/admin/mall';
import { useToast } from '@/hooks/ui';
import { ErrorMessage } from '@/shared/components/form';
import { Button } from '@/shared/ui/button';
import { InputField, InputFieldContainer } from '@/shared/ui/input';

const SignupFormNickname = ({
    isDefaultDuplicated = true,
}: {
    isDefaultDuplicated?: boolean;
}) => {
    const { t } = useTranslation();

    const { register, getValues, setError, setValue, clearErrors, setFocus } =
        useFormContext();

    const { errors } = useFormState({
        name: ['nickname', 'isDuplicateNickname'],
    });

    const [isDuplicated, setIsDuplicated] = useState(isDefaultDuplicated);

    const { data: mallData } = useMall();

    const isNicknameNotUsed =
        mallData?.memberJoinConfig.nickname === 'NOT_USED';

    useEffect(() => {
        if (!mallData) {
            return;
        }

        if (isNicknameNotUsed) {
            return;
        }

        if (isDuplicated) {
            setValue('isDuplicateNickname', true);
        }
    }, [isDuplicated, isNicknameNotUsed, mallData, setValue]);

    const checkDuplicateNicknameMutate = useMutation({
        mutationFn: async (nickname: string) =>
            await profile.checkDuplicateNickname({ nickname }),
    });

    const { addToast } = useToast();

    const checkDuplicateNickname = async () => {
        const nickname = getValues('nickname');

        if (!nickname) {
            return;
        }

        const { data: checkDuplicateNicknameData } =
            await checkDuplicateNicknameMutate.mutateAsync(nickname);

        if (checkDuplicateNicknameData.exist) {
            setError('nickname', {
                message: t('이미 사용중인 닉네임입니다.'),
            });
            setFocus('nickname');
            setValue('isDuplicateNickname', true, { shouldValidate: true });
            setIsDuplicated(true);
            return;
        }

        addToast({
            message: t('사용 가능한 닉네임입니다.'),
            variant: 'success',
        });
        setValue('isDuplicateNickname', false, { shouldValidate: true });
        clearErrors('nickname');
        setIsDuplicated(false);
    };

    return (
        <WithMemberJoinConfig name='nickname' label={t('닉네임')}>
            <InputFieldContainer gridRatio={[3, 1]}>
                <InputField
                    {...register('nickname', {
                        onChange: () => {
                            setIsDuplicated(true);
                        },
                    })}
                    type='text'
                    autoComplete='off'
                    placeholder={t('닉네임을 입력해 주세요')}
                    data-error={
                        !!errors.nickname || !!errors.isDuplicateNickname
                    }
                />
                <Button
                    frame='solid'
                    variant='apple'
                    className={styles.button}
                    onClick={checkDuplicateNickname}
                    disabled={checkDuplicateNicknameMutate.isPending}
                >
                    {t('중복확인')}
                </Button>
            </InputFieldContainer>
            <ErrorMessage name='nickname' />
            <ErrorMessage name='isDuplicateNickname' />
        </WithMemberJoinConfig>
    );
};

export default SignupFormNickname;
