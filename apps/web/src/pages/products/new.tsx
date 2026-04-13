import Link from 'next/link';
import * as styles from '../../styles/products.css';
import Skeleton from '../../components/ui/Skeleton/Skeleton';
import { motion } from 'motion/react';

export default function NewProducts() {
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
                &larr; Back to Home
            </Link>
            <h1 className={styles.title}>New Arrivals</h1>
            <p>Check out our latest products below!</p>
            <br />
            <div className={styles.grid}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.card}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Skeleton height={200} />
                        <Skeleton width="80%" height={24} />
                        <Skeleton width="40%" height={20} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
