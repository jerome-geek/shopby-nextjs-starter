import dayjs from 'dayjs';

import { mall } from '@/api/admin';
import { productInquiry } from '@/api/display';
import RegisterButton from '@/components/product/detail/product-inquiry/RegisterButton';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { hstack, vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';

export default async function ProductInquiry({
    productNo,
}: {
    productNo: number;
}) {
    const { t } = await getTranslation();

    const mallData = await mall.getMall().json();
    console.log('🚀 ~ ProductInquiry ~ mallData:', mallData);

    const data = await productInquiry
        .getProductInquiries(productNo, {
            pageNumber: 1,
            pageSize: 10,
            startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
            endYmd: dayjs().format('YYYY-MM-DD'),
        })
        .json();
    console.log('🚀 ~ ProductInquiry ~ data:', data);

    return (
        <div
            className={vstack({
                gap: '24px',
                alignItems: 'stretch',
            })}
        >
            <div className={hstack({ justifyContent: 'space-between' })}>
                <h3 className={css({ textStyle: 'title2.semibold' })}>
                    {t(`문의 (${data.totalCount})`)}
                </h3>

                <RegisterButton inquiryTypeList={mallData.productInquiryType} />
            </div>

            <ul>
                <li>
                    <p
                        className={css({
                            textStyle: 'body1.medium',
                            color: token('colors.gray80'),
                        })}
                    >
                        {t('등록된 상품문의가 없습니다.')}
                    </p>
                </li>
            </ul>
        </div>
    );
}
