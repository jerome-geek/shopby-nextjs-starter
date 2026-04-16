import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';

import { CertificationCheckProvider } from '@/context/certificationCheck';
import { useSilentRefresh } from '@/hooks/auth/useSilentRefresh';
import useAxiosInterceptor from '@/hooks/useAxiosInterceptor';
import useGeekInterceptor from '@/hooks/useGeekInterceptor';

function InterceptorSetup({ children }: { children: ReactNode }) {
    useGeekInterceptor();
    const { isReady: isAxiosReady } = useAxiosInterceptor();

    useSilentRefresh();

    if (!isAxiosReady) {
        return null;
    }

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
