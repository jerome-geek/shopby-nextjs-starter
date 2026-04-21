import * as styles from './quick-menu-swiper.css';

export const QuickMenuSkeleton = () => {
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', gap: '12px', padding: '0 20px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={styles.slide}>
                        <div
                            className={styles.iconCircle}
                            style={{ backgroundColor: '#f5f5f5' }}
                        />
                        <div
                            style={{
                                width: '40px',
                                height: '16px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px',
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
