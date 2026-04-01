import Link from 'next/link';

import { useMypageMenu } from '@/components/layout/mypage';

import * as styles from '@/components/mypage/main/mobile-paths/index.css';

const MyPageMainMobilePaths = () => {
    const menuList = useMypageMenu();

    if (!menuList) {
        return null;
    }

    const flat = menuList.flatMap((g) => g.children).filter((c) => !!c.url);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>바로가기</h2>
            <ul className={styles.list}>
                {flat.map((item) => (
                    <li key={item.url} className={styles.item}>
                        <Link href={item.url!} className={styles.link}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MyPageMainMobilePaths;

