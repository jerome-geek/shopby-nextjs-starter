import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import { getDutyInfo } from '@/utils/product';

export default async function DutyInfo({ dutyInfo }: { dutyInfo: string }) {
    const { t } = await getTranslation();

    const dutyInfoData = getDutyInfo(dutyInfo);
    console.log('🚀 ~ DutyInfo ~ dutyInfoData:', dutyInfoData);

    if (!dutyInfoData || dutyInfoData.length === 0) {
        return null;
    }

    return (
        <section
            className={vstack({
                gap: '8px',
                alignItems: 'flex-start',
            })}
        >
            <h3
                className={css({
                    textStyle: 'headline2.semibold',
                    padding: '12px 0',
                })}
            >
                {t('상품 상세정보')}
            </h3>

            <div
                className={css({
                    display: 'grid',
                    gridTemplateColumns: {
                        base: 'minmax(100px, auto) 1fr',
                        md: 'minmax(160px, auto) 1fr',
                    },
                    columnGap: '8px',
                    rowGap: '4px',
                    width: '100%',
                    paddingBottom: '12px',
                })}
            >
                {dutyInfoData.map((info) => (
                    <dl key={info.key} className={css({ display: 'contents' })}>
                        <dt
                            className={css({
                                textStyle: 'body1.medium',
                                color: token('colors.gray60'),
                                whiteSpace: 'nowrap',
                                maxWidth: '50vw',
                                flexShrink: 0,
                                fontWeight: '500',
                            })}
                        >
                            {info.key}
                        </dt>
                        <dd
                            className={css({
                                textStyle: 'body1.regular',
                                color: token('colors.gray80'),
                                wordBreak: 'break-all',
                            })}
                        >
                            {info.value}
                        </dd>
                    </dl>
                ))}
            </div>
        </section>
    );
}
