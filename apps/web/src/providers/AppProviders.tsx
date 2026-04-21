import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';

import { CertificationCheckProvider } from '@/context/certificationCheck';
import { useAxiosInterceptor } from '@/hooks/auth/useAxiosInterceptor';
import { useGeekInterceptor } from '@/hooks/auth/useGeekInterceptor';
import { useSilentRefresh } from '@/hooks/auth/useSilentRefresh';

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
