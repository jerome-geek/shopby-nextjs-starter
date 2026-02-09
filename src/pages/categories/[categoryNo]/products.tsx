import Link from 'next/link';
import { useRouter } from 'next/router';
import * as productStyles from '../../../styles/products.css';
import Skeleton from '../../../components/ui/Skeleton/Skeleton';
import { motion } from 'motion/react';

export default function CategoryProducts() {
    const router = useRouter();
    const { categoryNo } = router.query;

    return (
        <div className={productStyles.container}>
            <Link href="/" className={productStyles.backLink}>
                &larr; Back to Home
            </Link>
            <h1 className={productStyles.title}>
                Category {categoryNo} Products
            </h1>
            <p>Browsing products for category #{categoryNo}</p>
            <br />
            <div className={productStyles.grid}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={productStyles.card}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: 'spring',
                            damping: 20,
                            stiffness: 100,
                            delay: i * 0.05,
                        }}
                    >
                        <div
                            style={{
                                padding: '20px',
                                background: '#f9fafb',
                                borderRadius: '4px',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Skeleton height={150} />
                        </div>
                        <Skeleton width="90%" height={24} />
                        <Skeleton width="70%" height={20} />
                        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                            <Skeleton width="40%" height={28} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
