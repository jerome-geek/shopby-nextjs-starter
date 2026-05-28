import * as styles from '@/components/layer-contents/collection-form/index.css';
import Skeleton from '@/shared/ui/skeleton';

export const CollectionFormSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.fieldGroup}>
                <Skeleton width={80} height={16} />
                <Skeleton width='100%' height={44} />
            </div>
            <div className={styles.fieldGroup}>
                <Skeleton width={80} height={16} />
                <Skeleton width='100%' height={88} />
            </div>
        </div>
    );
};
