import { HeroBanner } from '@/components/hero-banner';
import * as styles from '@/styles/Home.css';
export default function ShopMain() {
    return (
        <div className={styles.main}>
            {/* Full-width HeroBanner */}
            <HeroBanner />
        </div>
    );
}
