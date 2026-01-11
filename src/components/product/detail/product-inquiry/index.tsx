import dayjs from 'dayjs';

import { productInquiry } from '@/api/display';
import ViewAllLink from '@/components/ui/view-all-link';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { hstack, vstack } from '@/styled-system/patterns';
import RegisterButton from '@/components/product/detail/product-inquiry/RegisterButton';
import { token } from '@/styled-system/tokens';
import { mall } from '@/api/admin';
import { pipe, prop } from '@fxts/core';

export default async function ProductInquiry({
    productNo,
}: {
    productNo: number;
}) {
    const { t } = await getTranslation();

    const mallData = await mall.getMall().json();
    console.log('🚀 ~ ProductInquiry ~ mallData:', mallData);

    const data = await productInquiry.getProductInquiries(productNo, {
        pageNumber: 1,
        pageSize: 10,
        startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
    });
    console.log('🚀 ~ ProductInquiry ~ data:', data);
    // const inquiryTypeList = mallData ? (
    //     pipe(mallData,
    //         prop('productInquiryType'),

    // )

    // ) : []

    //     const inquiryTypeList = useMemo(() => {
    //     if (!mallData) {
    //         return [];
    //     }

    //     return pipe(
    //         mallData.productInquiryType,
    //         filter((item) => PRODUCT_INQUIRY_TYPE.includes(item.value)),
    //         map((item) => ({
    //             ...item,
    //             label: t(item.label),
    //         })),
    //         toArray,
    //     );
    // }, [mallData, t]);

    return (
        <div
            className={vstack({
                gap: '24px',
                alignItems: 'stretch',
            })}
        >
            <div className={hstack({ justifyContent: 'space-between' })}>
                <h3 className={css({ textStyle: 'title2.semibold' })}>
                    {t('문의')}
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
