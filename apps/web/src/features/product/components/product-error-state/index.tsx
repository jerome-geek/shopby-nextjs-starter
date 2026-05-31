import { motion, type Variants } from 'motion/react';
import { CircleAlert } from 'lucide-react';
import { useRouter } from 'next/router';

import { Button } from '@/shared/ui/button';
import * as styles from '@/features/product/components/product-error-state/index.css';

interface ProductErrorStateProps {
    errorStatusCode?: number;
    errorMessage?: string;
}

const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: 'easeOut',
        },
    }),
};

export const ProductErrorState = ({
    errorStatusCode,
    errorMessage,
}: ProductErrorStateProps) => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <motion.div
                custom={0}
                initial='hidden'
                animate='visible'
                variants={variants}
                className={styles.iconWrapper}
            >
                <CircleAlert size={40} strokeWidth={1.5} />
            </motion.div>

            <motion.h1
                custom={1}
                initial='hidden'
                animate='visible'
                variants={variants}
                className={styles.title}
            >
                {errorStatusCode === 404
                    ? '찾으시는 상품이 없습니다'
                    : '안내드립니다'}
            </motion.h1>

            <motion.p
                custom={2}
                initial='hidden'
                animate='visible'
                variants={variants}
                className={styles.description}
            >
                {errorMessage || '상품 정보를 불러오는 중 문제가 발생했습니다.'}
            </motion.p>

            <motion.div
                custom={3}
                initial='hidden'
                animate='visible'
                variants={variants}
                className={styles.buttonGroup}
            >
                <Button
                    frame='outlined'
                    onClick={() => router.back()}
                    className={styles.actionButton}
                >
                    이전으로
                </Button>
                <Button
                    frame='solid'
                    variant='primary'
                    onClick={() => router.push('/')}
                    className={styles.actionButton}
                >
                    홈으로 가기
                </Button>
            </motion.div>
        </div>
    );
};
