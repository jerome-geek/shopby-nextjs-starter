import { Suspense } from '@suspensive/react';
import { ReactNode } from 'react';

import { SignupFormProvider } from '@/providers/SignupFormProvider';

export default function SignupLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <SignupFormProvider>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </SignupFormProvider>
    );
}
