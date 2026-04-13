import { useNavigate } from 'react-router';
import type { ErrorBoundaryFallbackProps } from '@suspensive/react';
import { isAxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@/components/ui/button/Button';
import { PATHS } from '@/const/paths';

export const AppErrorFallback = ({
    error,
    reset,
}: ErrorBoundaryFallbackProps) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const axiosMessage = isAxiosError(error)
        ? (() => {
              const data = error.response?.data;
              if (
                  data &&
                  typeof data === 'object' &&
                  'message' in data &&
                  typeof (data as { message?: unknown }).message === 'string'
              ) {
                  return (data as { message: string }).message;
              }
              return error.message;
          })()
        : null;

    return (
        <div className='rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900'>
            <div className='flex flex-col gap-3'>
                <h2 className='text-base font-semibold text-gray-800 dark:text-white/90'>
                    화면을 불러오는 중 문제가 발생했습니다.
                </h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {axiosMessage || '잠시 후 다시 시도해주세요.'}
                </p>

                {import.meta.env.DEV && (
                    <pre className='mt-2 max-h-48 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200'>
                        {error?.stack || String(error)}
                    </pre>
                )}

                <div className='mt-4 flex flex-wrap gap-2 ml-auto'>
                    <Button
                        variant='primary'
                        onClick={() => {
                            reset();
                            queryClient.resetQueries();
                        }}
                    >
                        다시 시도
                    </Button>
                    <Button
                        variant='outline'
                        onClick={() => {
                            reset();
                            navigate(PATHS.DASHBOARD, { replace: true });
                        }}
                    >
                        홈으로
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AppErrorFallback;
