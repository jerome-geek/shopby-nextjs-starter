'use client';

import { z } from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

export default function SignupFormPage() {
    const methods = useForm();

    const searchParams = useSearchParams();
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const provider = searchParams.get('provider');
    const expiry = Number(searchParams.get('expiry')) || 0;

    const isSocialLogin = !!provider;

    const {
        register,
        reset,
        setError,
        setFocus,
        watch,
        getValues,
        control,
        formState: { isSubmitting },
        handleSubmit,
    } = methods;

    console.log('watch');
    console.log(watch());

    useEffect(() => {
        const stored = sessionStorage.getItem('signupTerms');
        if (stored) {
            const { checkedTermList, checkedOptInList } = JSON.parse(stored);
        }
    }, []);

    const onSubmit = handleSubmit((data) => {});

    return <form onSubmit={onSubmit}>SignupFormPage</form>;
}
