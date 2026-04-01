import { type ReactNode } from 'react';
import { OverlayProvider } from 'overlay-kit';

import { CertificationCheckProvider } from '@/context/certificationCheck';
import useAxiosInterceptor from '@/hooks/useAxiosInterceptor';
import useGeekInterceptor from '@/hooks/useGeekInterceptor';

function InterceptorSetup({ children }: { children: ReactNode }) {
    useAxiosInterceptor();
    useGeekInterceptor();
    return children;
}

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <OverlayProvider>
            <InterceptorSetup>
                <CertificationCheckProvider>
                    {children}
                </CertificationCheckProvider>
            </InterceptorSetup>
        </OverlayProvider>
    );
}
