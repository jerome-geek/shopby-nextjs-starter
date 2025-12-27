import { Suspense } from '@suspensive/react';
import { ReactNode } from 'react';

export default function SignupLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
