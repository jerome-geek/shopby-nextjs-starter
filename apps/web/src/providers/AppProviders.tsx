import { NuqsAdapter } from 'nuqs/adapters/next/pages';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';

import { CertificationCheckProvider } from '@/context/certificationCheck';
import { useAxiosInterceptor } from '@/hooks/auth/useAxiosInterceptor';
import { useGeekInterceptor } from '@/hooks/auth/useGeekInterceptor';
import { useSilentRefresh } from '@/hooks/auth/useSilentRefresh';

function InterceptorSetup({ children }: { children: ReactNode }) {
    useGeekInterceptor();
    useAxiosInterceptor();

    useSilentRefresh();

    return children;
}

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <NuqsAdapter>
            <OverlayProvider>
                <InterceptorSetup>
                    <CertificationCheckProvider>
                        <TooltipProvider>{children}</TooltipProvider>
                    </CertificationCheckProvider>
                </InterceptorSetup>
            </OverlayProvider>
        </NuqsAdapter>
    );
}
