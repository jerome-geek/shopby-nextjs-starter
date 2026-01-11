import { entries, filter, map, pipe, toArray } from '@fxts/core';

import { getTranslation } from '@/i18n/server';
import { Partner } from '@/models/product/product';
import { css } from '@/styled-system/css';
import { vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';

export default async function PartnerInfo({ partner }: { partner: Partner }) {
    const { t } = await getTranslation();
    console.log('🚀 ~ PartnerInfo ~ partner:', partner);

    const partnerInfoKeyMap = {
        partnerNo: t('판매자번호'),
        partnerName: t('판매자명'),
        businessRegistrationNo: t('사업자등록번호'),
        companyName: t('회사명'),
        onlineMarketingBusinessDeclarationNo: t('온라인마케팅사업신고번호'),
        ownerName: t('대표자명'),
        officeAddressLabel: t('사무소주소'),
        phoneNo: t('연락처'),
        faxNo: t('팩스번호'),
        email: t('이메일'),
    };

    const partnerInfo = pipe(
        partner,
        entries,
        filter(([, v]) => !!v),
        map(([key, value]) => ({ key: partnerInfoKeyMap[key], value })),
        toArray,
    );

    if (!partnerInfo || partnerInfo.length === 0) {
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
                {t('판매자 정보')}
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
                {partnerInfo.map((info) => (
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
                            dangerouslySetInnerHTML={{ __html: info.value }}
                        />
                    </dl>
                ))}
            </div>
        </section>
    );
}
