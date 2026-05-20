import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { flatMap, filter, pipe, toArray } from '@fxts/core';

import { useMypageMenu } from '@/context/mypageMenu';
import * as styles from '@/features/mypage/mypage-shortcuts/index.css';

export const MypageShortcuts = () => {
    const menuList = useMypageMenu();

    const { t } = useTranslation();

    if (!menuList) {
        return null;
    }

    const parseMenuList = pipe(
        menuList,
        flatMap((g) => g.children),
        filter((c) => !!c.url),
        toArray,
    );

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>{t('바로가기')}</h2>
            <ul className={styles.list}>
                {parseMenuList.map((item) => (
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
