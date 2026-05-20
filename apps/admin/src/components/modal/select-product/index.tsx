import { useMemo, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import { revalidatePath } from '@/api/revalidate';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import { useServerApiByPass } from '@/hooks/query/shopby';
import useApiError from '@/hooks/useApiError';
import { useToast } from '@/hooks/utils';
import { CloseLineIcon } from '@/icons';
import { DefaultModalLayoutProps, ModalLayout } from '@/layout/modal';

interface ProductItem {
    /** 몰상품번호 */
    mallProductNo: number;
    /** 상품명 */
    productName: string;
    /** 리스트 이미지 URL */
    listImageUrls: string[];
}

interface ProductSearchResponse {
    /** 페이지 수 */
    pageCount: number;
    /** 검색 기준 값 */
    lastId: string;
    /** 재고 노출 여부 (false:재고 미노출 / true:재고 노출) */
    displayableStock: boolean;
    /** 전체 상품 수 */
    totalCount: number;
    items: ProductItem[];
}

const SelectProductModal = ({ ...props }: DefaultModalLayoutProps) => {
    const { addToast } = useToast();
    const { handleErrorToast } = useApiError();

    const [keywordInput, setKeywordInput] = useState('');
    const [debouncedKeyword] = useDebounceValue(keywordInput.trim(), 300);
    const [selectedProducts, setSelectedProducts] = useState<
        Map<number, ProductItem>
    >(new Map());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const searchParam = useMemo(
        () => ({
            filter: { keywords: debouncedKeyword },
            pageSize: 30,
            pageNumber: 1,
        }),
        [debouncedKeyword],
    );

    const { data, isLoading } = useServerApiByPass<ProductSearchResponse>({
        url: '/products/search/engine/',
        param: searchParam,
        version: '2.0',
        options: { staleTime: 30_000 },
    });

    const products = data?.items ?? [];
    const selectedNos = new Set(selectedProducts.keys());

    const toggleAll = () => {
        if (products.every((p) => selectedNos.has(p.mallProductNo))) {
            setSelectedProducts((prev) => {
                const next = new Map(prev);
                products.forEach((p) => next.delete(p.mallProductNo));
                return next;
            });
        } else {
            setSelectedProducts((prev) => {
                const next = new Map(prev);
                products.forEach((p) => next.set(p.mallProductNo, p));
                return next;
            });
        }
    };

    const toggle = (product: ProductItem) => {
        setSelectedProducts((prev) => {
            const next = new Map(prev);
            next.has(product.mallProductNo)
                ? next.delete(product.mallProductNo)
                : next.set(product.mallProductNo, product);
            return next;
        });
    };

    const remove = (productNo: number) => {
        setSelectedProducts((prev) => {
            const next = new Map(prev);
            next.delete(productNo);
            return next;
        });
    };

    const handleConfirm = async () => {
        if (selectedNos.size === 0) return;
        setIsSubmitting(true);

        const results = await Promise.allSettled(
            Array.from(selectedNos).map((no) =>
                revalidatePath(`/products/${no}`),
            ),
        );

        const failCount = results.filter((r) => r.status === 'rejected').length;
        const successCount = results.length - failCount;

        if (failCount > 0) {
            handleErrorToast(
                new Error(
                    `갱신 완료: ${successCount}개 성공, ${failCount}개 실패`,
                ),
            );
        } else {
            addToast({
                variant: 'success',
                message: `${successCount}개 상품 상세 페이지 캐시를 갱신했습니다.`,
            });
        }

        setIsSubmitting(false);
        props.close();
    };

    const isAllSelected =
        products.length > 0 &&
        products.every((p) => selectedNos.has(p.mallProductNo));

    const selectedList = Array.from(selectedProducts.values());

    return (
        <ModalLayout
            {...props}
            title='상품 상세 페이지 선택'
            subtitle='캐시를 갱신할 상품을 선택하세요.'
            footer={
                <>
                    <button
                        type='button'
                        onClick={props.close}
                        className='h-9 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#364153] transition-colors hover:bg-gray-50'
                    >
                        취소
                    </button>
                    <button
                        type='button'
                        onClick={handleConfirm}
                        disabled={isSubmitting || selectedNos.size === 0}
                        className='h-9 rounded-lg bg-[#ff6900] px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        캐시 갱신 ({selectedNos.size})
                    </button>
                </>
            }
        >
            <div className='flex flex-col gap-3'>
                <input
                    type='text'
                    placeholder='상품명으로 검색...'
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    className='h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none focus:border-[#ff6900]'
                />

                {selectedList.length > 0 && (
                    <div className='flex flex-wrap gap-2 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3'>
                        {selectedList.map((product) => (
                            <div
                                key={product.mallProductNo}
                                className='flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white py-1 pl-1.5 pr-2 text-xs text-[#364153]'
                            >
                                {product.listImageUrls[0] && (
                                    <img
                                        src={product.listImageUrls[0]}
                                        alt={product.productName}
                                        className='size-5 rounded-full object-cover'
                                    />
                                )}
                                <span className='max-w-[120px] truncate'>
                                    {product.productName}
                                </span>
                                <button
                                    type='button'
                                    onClick={() =>
                                        remove(product.mallProductNo)
                                    }
                                    className='flex items-center text-[#9ca3af] hover:text-[#364153]'
                                >
                                    <CloseLineIcon className='size-3' />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <LoadingWrapper isLoading={isLoading}>
                    <div className='max-h-[280px] overflow-y-auto rounded-lg border border-[#e5e7eb]'>
                        {products.length === 0 ? (
                            <div className='flex h-20 items-center justify-center text-sm text-[#6a7282]'>
                                {debouncedKeyword
                                    ? '검색 결과가 없습니다.'
                                    : '상품이 없습니다.'}
                            </div>
                        ) : (
                            <>
                                <label className='flex cursor-pointer items-center gap-3 border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm font-medium text-[#364153]'>
                                    <input
                                        type='checkbox'
                                        checked={isAllSelected}
                                        onChange={toggleAll}
                                        className='size-4 accent-[#ff6900]'
                                    />
                                    전체 선택 ({products.length})
                                </label>
                                <ul>
                                    {products.map((product) => (
                                        <li
                                            key={product.mallProductNo}
                                            className='border-b border-[#e5e7eb] last:border-0'
                                        >
                                            <label className='flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#f9fafb]'>
                                                <input
                                                    type='checkbox'
                                                    checked={selectedNos.has(
                                                        product.mallProductNo,
                                                    )}
                                                    onChange={() =>
                                                        toggle(product)
                                                    }
                                                    className='size-4 accent-[#ff6900]'
                                                />
                                                <img
                                                    src={product.listImageUrls[0]}
                                                    alt={product.productName}
                                                    className='size-10 shrink-0 rounded-md border border-[#e5e7eb] object-cover'
                                                />
                                                <div className='min-w-0'>
                                                    <div className='truncate text-sm text-[#101828]'>
                                                        {product.productName}
                                                    </div>
                                                    <div className='text-xs text-[#6a7282]'>
                                                        No.{' '}
                                                        {product.mallProductNo}
                                                    </div>
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </LoadingWrapper>
            </div>
        </ModalLayout>
    );
};

export default SelectProductModal;
