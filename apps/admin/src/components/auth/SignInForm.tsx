import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { accessTokenManager } from '@/api/core/token';
import ErrorMessage from '@/components/form/ErrorMessage';
import { Input, InputContainer, Label } from '@/components/form/input';
import Button from '@/components/ui/button/Button';
import { PATHS } from '@/const/paths';
import { useAuthMutation } from '@/hooks/mutations';
import useApiError from '@/hooks/useApiError';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import { loginFormSchema, LoginFormSchemaType } from '@/schema';

export default function SignInForm() {
    const navigate = useNavigate();

    const methods = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            id: '',
            pwd: '',
        },
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { isSubmitting },
    } = methods;

    const { login } = useAuthMutation();

    const { handleErrorToast } = useApiError();

    const onSubmit = handleSubmit(async ({ id, pwd }) => {
        try {
            const data = await login.mutateAsync({ id, pwd });

            accessTokenManager.setToken(data.data.accessToken);

            navigate(PATHS.DASHBOARD);
        } catch (error) {
            handleErrorToast(error);
        }
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='flex flex-col flex-1'>
            <div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
                <div>
                    <div className='mb-5 sm:mb-8'>
                        <h1 className='mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md'>
                            Sign In
                        </h1>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Enter your email and password to sign in!
                        </p>
                    </div>
                    <div>
                        <form onSubmit={onSubmit}>
                            <div className='space-y-6'>
                                <InputContainer>
                                    <Label isRequired>아이디</Label>
                                    <Input
                                        placeholder='아이디를 입력해 주세요.'
                                        {...register('id')}
                                    />
                                    <ErrorMessage name='id' control={control} />
                                </InputContainer>
                                <InputContainer>
                                    <Label isRequired>패스워드</Label>

                                    <div className='relative'>
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder='비밀번호를 입력해 주세요.'
                                            {...register('pwd')}
                                        />

                                        <span
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className='absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2'
                                        >
                                            {showPassword ? (
                                                <EyeIcon className='fill-gray-500 dark:fill-gray-400 size-5' />
                                            ) : (
                                                <EyeCloseIcon className='fill-gray-500 dark:fill-gray-400 size-5' />
                                            )}
                                        </span>
                                    </div>

                                    <ErrorMessage
                                        name='pwd'
                                        control={control}
                                    />
                                </InputContainer>

                                <div>
                                    <Button
                                        className='w-full'
                                        size='sm'
                                        type='submit'
                                        disabled={isSubmitting}
                                    >
                                        로그인
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
