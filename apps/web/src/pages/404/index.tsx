import Link from 'next/link';
import { motion } from 'motion/react';
import * as styles from '@/styles/404.css';
import Seo from '@/components/common/seo';

export default function Custom404Page() {
    return (
        <>
            <Seo title="404 - Page Not Found" noindex={true} />
            <main className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h1 className={styles.title}>404</h1>
                    <p className={styles.description}>
                        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.{'\n'}
                        존재하지 않는 주소를 입력하셨거나,{'\n'}
                        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수
                        없습니다.
                    </p>
                    <Link href="/" className={styles.button}>
                        홈으로 돌아가기
                    </Link>
                </motion.div>
            </main>
        </>
    );
}
