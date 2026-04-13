import LoadingWrapper from '@/components/common/loading-wrapper';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * 라우터 전환 시 오버레이 표시
 */
export const RouteChangeOverlay = () => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const routeChangeOn = (
            url: string,
            { shallow }: { shallow: boolean },
        ) => {
            // 🎯 shallow 이동(쿼리 파라미터 변경 등)일 때는 오버레이를 띄우지 않습니다.
            if (shallow) return;
            setIsOpen(true);
        };

        const routeChangeOff = () => {
            setIsOpen(false);
        };

        window.addEventListener('popstate', routeChangeOff);
        router.events.on('routeChangeStart', routeChangeOn);
        router.events.on('routeChangeComplete', routeChangeOff);
        router.events.on('routeChangeError', routeChangeOff);

        return () => {
            window.removeEventListener('popstate', routeChangeOff);
            router.events.off('routeChangeStart', routeChangeOn);
            router.events.off('routeChangeComplete', routeChangeOff);
            router.events.off('routeChangeError', routeChangeOff);
        };
    }, [router.events]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LoadingWrapper
                        isLoading
                        containerStyle={{
                            height: '30px',
                        }}
                    >
                        <span />
                    </LoadingWrapper>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
