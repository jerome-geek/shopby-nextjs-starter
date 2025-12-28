'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { signupFormSchema, SignupFormType } from '@/schema';

export function SignupFormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const methods = useForm<SignupFormType>({
        resolver: zodResolver(signupFormSchema),
        mode: 'onTouched',
        defaultValues: {
            isRegistrationNoChecked: false,
            type: 'personal',
            joinTermsAgreements: [],
            smsAgreed: false,
            directMailAgreed: false,
        },
    });

    console.log('==============');
    console.log(methods.watch());

    return <FormProvider {...methods}>{children}</FormProvider>;
}
