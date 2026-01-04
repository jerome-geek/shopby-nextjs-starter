import Link from 'next/link';

import productProfile from '@/api/product/profile';
import ViewAllLink from '@/components/ui/view-all-link';
import { PATHS } from '@/const/paths';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';

export default async function RecentWishlist() {
    const { t } = await getTranslation();

    let items = [];

    try {
        const response = await productProfile.getLikeProducts().json();
        if (response.items.length > 0) {
            items = response.items;
        }
    } catch (error) {
        console.error(error);
    }

    const hasItems = items.length > 0;

    return (
        <section className={css({ marginTop: { base: '40px', md: '60px' } })}>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '15px',
                    borderBottom: '2px solid #000',
                    paddingBottom: '15px',
                })}
            >
                <h3
                    className={css({
                        fontSize: { base: '18px', md: '20px' },
                        fontWeight: 'bold',
                    })}
                >
                    {t('나의 관심')}
                </h3>
                <ViewAllLink href={PATHS.MYPAGE.WISH}>
                    {t('전체보기')}
                </ViewAllLink>
            </div>

            <div
                className={css({
                    backgroundColor: '#fff',
                })}
            >
                {hasItems ? (
                    <ul
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: {
                                base: 'repeat(2, 1fr)',
                                sm: 'repeat(3, 1fr)',
                                md: 'repeat(5, 1fr)',
                            },
                            gap: '20px',
                            border: '1px solid #eee',
                            backgroundColor: '#fbfbfb',
                        })}
                    >
                        <li
                            className={css({
                                gridColumn: '1 / -1',
                                padding: '100px 0',
                                textAlign: 'center',
                                color: '#999',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                            })}
                        >
                            <p>{t('구현 예정')}</p>
                        </li>
                    </ul>
                ) : (
                    <div
                        className={css({
                            padding: '100px 0',
                            textAlign: 'center',
                            color: '#999',
                            fontSize: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            border: '1px solid #eee',
                        })}
                    >
                        <p>{t('관심 상품 내역이 없습니다.')}</p>
                    </div>
                )}
            </div>
        </section>
    );
}
