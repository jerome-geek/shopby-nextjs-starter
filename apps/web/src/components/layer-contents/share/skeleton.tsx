import * as styles from '@/components/layer-contents/share/index.css';
import Skeleton from '@/shared/ui/skeleton';

const ShareSkeleton = () => {
    return (
        <ul className={styles.list}>
            {Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className={styles.listButton}>
                    <Skeleton circle width={70} height={70} />
                    <Skeleton width={40} height={14} />
                </li>
            ))}
        </ul>
    );
};

export default ShareSkeleton;
