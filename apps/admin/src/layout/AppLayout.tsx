import { Outlet } from 'react-router';
import { ErrorBoundary, Suspense } from '@suspensive/react';

import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import AppErrorFallback from '@/components/common/AppErrorFallback';
import AppHeader from '@/layout/AppHeader';
import Backdrop from '@/layout/Backdrop';
import AppSidebar from '@/layout/AppSidebar';
import WithAuth from '@/components/hoc/WithAuth';
import LoadingWrapper from '@/components/ui/loading-wrapper';

const LayoutContent = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className='min-h-screen xl:flex'>
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
                } ${isMobileOpen ? 'ml-0' : ''}`}
            >
                <AppHeader />
                <div className='p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6'>
                    <Suspense
                        fallback={
                            <LoadingWrapper isLoading>
                                <span />
                            </LoadingWrapper>
                        }
                    >
                        <ErrorBoundary fallback={AppErrorFallback}>
                            <Outlet />
                        </ErrorBoundary>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

const AppLayout = WithAuth(() => {
    return (
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
    );
});

export default AppLayout;
