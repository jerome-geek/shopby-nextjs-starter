import { useRouter } from 'next/router';
import { motion } from 'motion/react';

import * as styles from '../../../styles/products.css';

// 목업 데이터 생성 함수
const getMockProducts = (categoryNo: string) => {
    return Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        name: `상품 ${i + 1} (카테고리 ${categoryNo})`,
        price: (i + 1) * 10000,
        imageUrl: `https://via.placeholder.com/300x300?text=Product+${i + 1}`,
    }));
};

export default function CategoryPage() {
    const router = useRouter();
    const { categoryNo } = router.query;

    // categoryNo가 없을 때 (초기 렌더링 등) 처리
    if (!categoryNo) {
        return <div className={styles.container}>Loading...</div>;
    }

    const products = getMockProducts(categoryNo as string);

    return (
        <div className={styles.container}>
            <div style={{ marginBottom: '24px' }}>
                <h1 className={styles.title}>
                    카테고리 {categoryNo} 상품 목록
                </h1>
                <p style={{ color: '#666', marginTop: '8px' }}>
                    총 {products.length}개의 상품이 있습니다.
                </p>
            </div>

            <div className={styles.grid}>
                {products.map((product, i) => (
                    <motion.div
                        key={product.id}
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '1/1',
                                marginBottom: '16px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                overflow: 'hidden',
                            }}
                        >
                            {/* 실제 이미지가 없을 경우를 대비한 스타일 */}
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#999',
                                    fontSize: '14px',
                                }}
                            >
                                이미지 영역
                            </div>
                        </div>

                        <h3
                            style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '8px',
                                color: '#111',
                            }}
                        >
                            {product.name}
                        </h3>

                        <p
                            style={{
                                fontSize: '15px',
                                fontWeight: '700',
                                color: '#333',
                            }}
                        >
                            {product.price.toLocaleString()}원
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
