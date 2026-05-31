import { memo } from 'react';

import * as styles from '@/features/product/components/product-tabs/seller-info/index.css';
import { Partner } from '@/models/product/product';
import { CustomAccordion } from '@/shared/ui/accordion';

const ACCORDION_VALUE = 'seller-info';

const SellerInfo = ({ partnerInfo }: { partnerInfo?: Partner | null }) => {
    if (!partnerInfo) {
        return null;
    }

    const hasData =
        partnerInfo.companyName ||
        partnerInfo.partnerName ||
        partnerInfo.ownerName;
    if (!hasData) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <CustomAccordion
                className={styles.accordionRoot}
                itemClassName={styles.accordionItem}
                headerClassName={styles.trigger}
                items={[
                    {
                        value: ACCORDION_VALUE,
                        header: (
                            <span className={styles.title}>판매자 정보</span>
                        ),
                        content: (
                            <div className={styles.content}>
                                <dl className={styles.sellerDl}>
                                    {partnerInfo.companyName ||
                                    partnerInfo.partnerName ? (
                                        <div className={styles.sellerRow}>
                                            <dt className={styles.sellerDt}>
                                                상호명 / 판매자명
                                            </dt>
                                            <dd className={styles.sellerDd}>
                                                {partnerInfo.companyName ||
                                                    partnerInfo.partnerName}
                                            </dd>
                                        </div>
                                    ) : null}

                                    {partnerInfo.ownerName ? (
                                        <div className={styles.sellerRow}>
                                            <dt className={styles.sellerDt}>
                                                대표자명
                                            </dt>
                                            <dd className={styles.sellerDd}>
                                                {partnerInfo.ownerName}
                                            </dd>
                                        </div>
                                    ) : null}

                                    {partnerInfo.businessRegistrationNo ? (
                                        <div className={styles.sellerRow}>
                                            <dt className={styles.sellerDt}>
                                                사업자번호
                                            </dt>
                                            <dd className={styles.sellerDd}>
                                                {
                                                    partnerInfo.businessRegistrationNo
                                                }
                                            </dd>
                                        </div>
                                    ) : null}

                                    {partnerInfo.onlineMarketingBusinessDeclarationNo ? (
                                        <div className={styles.sellerRow}>
                                            <dt className={styles.sellerDt}>
                                                통신판매신고번호
                                            </dt>
                                            <dd className={styles.sellerDd}>
                                                {
                                                    partnerInfo.onlineMarketingBusinessDeclarationNo
                                                }
                                            </dd>
                                        </div>
                                    ) : null}

                                    {partnerInfo.phoneNo ? (
                                        <div className={styles.sellerRow}>
                                            <dt className={styles.sellerDt}>
                                                대표번호
                                            </dt>
                                            <dd className={styles.sellerDd}>
                                                {partnerInfo.phoneNo}
                                            </dd>
                                        </div>
                                    ) : null}

                                    {partnerInfo.email ? (
                                        <div className={styles.sellerRow}>
                                            <dt className={styles.sellerDt}>
                                                이메일
                                            </dt>
                                            <dd className={styles.sellerDd}>
                                                {partnerInfo.email}
                                            </dd>
                                        </div>
                                    ) : null}

                                    {partnerInfo.officeAddressLabel ? (
                                        <div className={styles.sellerRow}>
                                            <dt className={styles.sellerDt}>
                                                사업장 주소
                                            </dt>
                                            <dd
                                                className={styles.sellerDd}
                                                dangerouslySetInnerHTML={{
                                                    __html: partnerInfo.officeAddressLabel,
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                </dl>
                            </div>
                        ),
                    },
                ]}
                type='single'
            />
        </div>
    );
};

export default memo(SellerInfo);
