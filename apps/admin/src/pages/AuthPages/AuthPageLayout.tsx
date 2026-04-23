import { Outlet } from 'react-router';

import GridShape from '@/components/common/GridShape';
import ThemeTogglerTwo from '@/components/common/ThemeTogglerTwo';
import { WithoutAuth } from '@/components/hoc';

const AuthLayout = WithoutAuth(() => {
    return (
        <div className='relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950'>
            {/* Background */}
            <div className='pointer-events-none absolute inset-0' aria-hidden>
                <div className='absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/15' />
                <div className='absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15' />
                <div className='absolute inset-0 opacity-[0.15] dark:opacity-[0.08]'>
                    <GridShape />
                </div>
            </div>

            <div className='absolute right-6 top-6 z-50 hidden sm:block'>
                <ThemeTogglerTwo />
            </div>

            <div className='relative mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-10 sm:px-10'>
                <header className='mb-6 text-center'>
                    <h1 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        JollyPot Admin
                    </h1>
                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        계정 정보를 입력해 로그인하세요.
                    </p>
                </header>

                <main className='rounded-2xl border border-gray-200/80 bg-white/90 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur dark:border-white/10 dark:bg-gray-900/70 sm:p-8'>
                    <Outlet />
                </main>

                <footer className='mt-6 text-center text-xs text-gray-500 dark:text-gray-500'>
                    © {new Date().getFullYear()} Admin
                </footer>
            </div>
        </div>
    );
});

export default AuthLayout;
