import { SuspenseQuery } from '@suspensive/react-query';
import { map, pipe, toArray } from '@fxts/core';

import { CloseIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Skeleton from '@/components/ui/skeleton';
import * as styles from '@/components/mypage/product-inquiries/register-form/index.css';
import { productDetailOptions } from '@/entities/product/queries';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

export interface SelectedProductInfo {
    productNo: number;
    productName: string;
    imageUrl: string;
}

interface SelectedProductCardProps {
    productName: string;
    imageUrl: string;
    isMobile: boolean;
    onReset?: () => void;
}

interface SelectedProductFieldProps {
    isModify: boolean;
    productNo: number;
    productInfo: SelectedProductInfo | null | undefined;
    inquiryProductName?: string;
    inquiryImageUrl?: string;
    isMobile: boolean;
    selectButtonLabel: string;
    onOpenSelect: () => void;
    onReset: () => void;
}

const SelectedProductCard = ({
    productName,
    imageUrl,
    isMobile,
    onReset,
}: SelectedProductCardProps) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.productThumb}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt=''
                        className={styles.productThumbImg}
                    />
                ) : null}
            </div>

            <div className={styles.productMeta}>
                <div className={styles.productName}>{productName}</div>

                {onReset ? (
                    <button
                        type='button'
                        className={styles.productCloseButton}
                        onClick={onReset}
                    >
                        <CloseIcon
                            width={isMobile ? 12 : 16}
                            height={isMobile ? 12 : 16}
                        />
                    </button>
                ) : null}
            </div>
        </div>
    );
};

const SelectedProductCardSkeleton = () => {
    return (
        <div className={styles.productCard}>
            <div className={styles.productThumb}>
                <Skeleton width='100%' height='100%' />
            </div>

            <div
                className={styles.productMeta}
                style={{ width: '100%', gap: '8px' }}
            >
                <Skeleton width='72%' height={18} />
                <Skeleton width='48%' height={14} />
            </div>
        </div>
    );
};

const AsyncSelectedProductCard = ({
    productNo,
    isMobile,
    onReset,
}: Pick<SelectedProductFieldProps, 'productNo' | 'isMobile' | 'onReset'>) => {
    return (
        <ShopbyAsyncBoundary fallback={<SelectedProductCardSkeleton />}>
            <SuspenseQuery {...productDetailOptions({ productNo })}>
                {({ data }) => {
                    const { baseInfo } = data;
                    const selectedProduct = {
                        productNo: baseInfo.productNo,
                        productName: baseInfo.productName,
                        imageUrl:
                            baseInfo.imageUrls?.[0] ??
                            pipe(
                                baseInfo.imageUrlInfo,
                                map((item) => item.url),
                                toArray,
                            )[0] ??
                            '',
                    };

                    return (
                        <SelectedProductCard
                            productName={selectedProduct.productName}
                            imageUrl={selectedProduct.imageUrl}
                            isMobile={isMobile}
                            onReset={onReset}
                        />
                    );
                }}
            </SuspenseQuery>
        </ShopbyAsyncBoundary>
    );
};

export const SelectedProductField = ({
    isModify,
    productNo,
    productInfo,
    inquiryProductName,
    inquiryImageUrl,
    isMobile,
    selectButtonLabel,
    onOpenSelect,
    onReset,
}: SelectedProductFieldProps) => {
    if (isModify) {
        return (
            <SelectedProductCard
                productName={inquiryProductName ?? ''}
                imageUrl={inquiryImageUrl ?? ''}
                isMobile={isMobile}
            />
        );
    }

    if (productInfo) {
        return (
            <SelectedProductCard
                productName={productInfo.productName}
                imageUrl={productInfo.imageUrl}
                isMobile={isMobile}
                onReset={onReset}
            />
        );
    }

    if (productInfo === undefined && productNo > 0) {
        return (
            <AsyncSelectedProductCard
                productNo={productNo}
                isMobile={isMobile}
                onReset={onReset}
            />
        );
    }

    return (
        <Button
            type='button'
            frame='solid'
            variant='apple'
            className={styles.selectButton}
            onClick={onOpenSelect}
        >
            {selectButtonLabel}
        </Button>
    );
};
