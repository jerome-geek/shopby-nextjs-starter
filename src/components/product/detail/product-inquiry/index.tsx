import dayjs from 'dayjs';

import { mall } from '@/api/admin';
import { productInquiry } from '@/api/display';
import RegisterButton from '@/components/product/detail/product-inquiry/RegisterButton';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { hstack, vstack } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';
import CustomAccordion from '@/components/common/CustomAccordion';
import { HStack, VStack } from '@/styled-system/jsx';

export default async function ProductInquiry({
    productNo,
}: {
    productNo: number;
}) {
    const { t } = await getTranslation();

    const mallData = await mall.getMall().json();

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
        <VStack alignItems='stretch' gap='24px'>
            <HStack justifyContent='space-between'>
                <h3 className={css({ textStyle: 'title2.semibold' })}>
                    {t(`문의 (${data.totalCount})`)}
                </h3>

                <RegisterButton
                    productNo={productNo}
                    inquiryTypeList={mallData.productInquiryType}
                />
            </HStack>

            <ul>
                {data.items.length === 0 ? (
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
                ) : (
                    data.items.map((item) => {
                        console.log('🚀 ~ ProductInquiry ~ item:', item);
                        return (
                            <li>
                                <CustomAccordion
                                    type='single'
                                    items={[
                                        {
                                            value: item.inquiryNo.toString(),
                                            header: item.title,
                                            content: item.content,
                                        },
                                    ]}
                                />
                            </li>
                        );
                    })
                )}
            </ul>
        </VStack>
    );
}
