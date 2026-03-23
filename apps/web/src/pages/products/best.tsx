import Link from 'next/link';
import * as styles from '../../styles/products.css';
import Skeleton from '../../components/ui/Skeleton/Skeleton';
import { motion } from 'motion/react';

export default function BestProducts() {
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
                &larr; Back to Home
            </Link>
            <h1 className={styles.title}>Best Sellers</h1>
            <p>Our top rated products!</p>
            <br />
            <div className={styles.grid}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.card}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15 }}
                    >
                        <div
                            style={{
                                padding: '10px',
                                background: '#f0f0f0',
                                borderRadius: '4px',
                            }}
                        >
                            <Skeleton height={250} />
                        </div>
                        <Skeleton width="90%" height={28} />
                        <Skeleton width="60%" height={24} />
                        <Skeleton count={2} width="100%" height={16} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
