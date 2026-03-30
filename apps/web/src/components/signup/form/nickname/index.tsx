import { useMutation } from '@tanstack/react-query';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { profile } from '@/api/member';
import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/form';
import InputField from '@/components/ui/input/field';
import FieldContainer from '@/components/ui/input/FieldContainer';
import { useMall } from '@/hooks/query/admin/mall';
import { useToast } from '@/hooks/ui';

const SignupFormNickname = () => {
    const { t } = useTranslation();

    const { register, getValues, setError, setValue, clearErrors, setFocus } =
        useFormContext();

    const { errors } = useFormState({
        name: ['nickname', 'isDuplicateNickname'],
    });

    const [isDuplicated, setIsDuplicated] = useState(false);

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

        if (!isDuplicated) {
            setValue('isDuplicateNickname', true, { shouldValidate: true });
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
                message: t('이미 사용중인 닉네입니다.'),
            });
            setFocus('nickname');
            setValue('isDuplicateNickname', true, { shouldValidate: true });
            setIsDuplicated(false);
            return;
        }

        addToast({
            message: t('사용 가능한 닉네입니다.'),
        });
        setValue('isDuplicateNickname', false, { shouldValidate: true });
        clearErrors('nickname');
        setIsDuplicated(true);
    };

    return (
        <WithMemberJoinConfig name='nickname' label={t('닉네임')}>
            <FieldContainer gridRatio={[3, 1]}>
                <InputField
                    {...register('nickname', {
                        onChange: () => {
                            setIsDuplicated(false);
                        },
                    })}
                    type='text'
                    autoComplete='off'
                    placeholder={t('닉네임을 입력해 주세요')}
                    isError={!!errors.nickname || !!errors.isDuplicateNickname}
                />
                <Button
                    frame='solid'
                    variant='apple'
                    style={{
                        height: '100%',
                    }}
                    onClick={checkDuplicateNickname}
                    disabled={checkDuplicateNicknameMutate.isPending}
                >
                    {t('중복확인')}
                </Button>
            </FieldContainer>
            <ErrorMessage name='nickname' />
            <ErrorMessage name='isDuplicateNickname' />
        </WithMemberJoinConfig>
    );
};

export default SignupFormNickname;
