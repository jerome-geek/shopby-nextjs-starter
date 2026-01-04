import { myOrder } from '@/api/order';
import { GetOrderListParams } from '@/models/order/myOrder';
import { pipe, map, range, toArray, toAsync } from '@fxts/core';

interface MypageOrdersPageProps {
    searchParams: Promise<GetOrderListParams>;
}

export default async function MypageOrdersPage(props: MypageOrdersPageProps) {
    const searchParams = await props.searchParams;

    const pageNumber = Number(searchParams.pageNumber) || 1;
    const pageSize = Number(searchParams.pageSize) || 2;

    const orderListSearchParams: GetOrderListParams = {
        pageNumber,
        pageSize,
    };

    // TODO: 신상품 페이지 보고 만들기
    // TODO: 비동기 함수 에러처리 필요

    const response = await pipe(
        range(1, pageNumber + 1),
        toAsync,
        map((a) => {
            return myOrder
                .getOrderList({ ...orderListSearchParams, pageNumber: a })
                .json();
        }),
        toArray
    );

    const initialData = response.map((data, index) => ({
        data,
        pageNumber: index + 1,
    }));

    // try {
    //     const orders = await myOrder.getOrderList(orderListSearchParams).json();
    //     console.log('🚀 ~ MypageOrdersPage ~ orders:', orders);
    //     items = orders.items;
    // } catch (error) {}

    return (
        <section>
            <div>주문상태 및 날짜입력 탭</div>

            <div>주문리스트</div>
        </section>
    );
}
