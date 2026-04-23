import { PATHS } from '@/const/paths';

export const PATH_TITLE: { pathname: string; title: string }[] = [
    {
        pathname: PATHS.TIME_SALE.MAIN,
        title: '타임특가',
    },
    {
        pathname: PATHS.PRODUCTS.BEST,
        title: '베스트 랭킹',
    },
    {
        pathname: PATHS.EVENTS.DETAIL,
        title: '기획전',
    },
    {
        pathname: PATHS.CART,
        title: '장바구니',
    },
    {
        pathname: PATHS.ORDER.SHEET,
        title: '주문하기',
    },
    {
        pathname: PATHS.ORDER.COMPLETE,
        title: '주문완료',
    },
    {
        pathname: PATHS.RECIPES.WRITE,
        title: '레시피 만들기',
    },
    {
        pathname: PATHS.RECIPES.DETAIL,
        title: '레시피',
    },
    {
        pathname: PATHS.RECIPES.SCRAP,
        title: '스크랩북',
    },
    {
        pathname: PATHS.RECIPES.COLLECTIONS,
        title: '컬렉션',
    },
    {
        pathname: PATHS.MYPAGE.MAIN,
        title: '마이페이지',
    },
    {
        pathname: PATHS.MYPAGE.ORDERS.MAIN,
        title: '주문/배송 내역',
    },
    {
        pathname: PATHS.MYPAGE.CLAIMS.MAIN,
        title: '취소/교환/반품 내역',
    },
    {
        pathname: PATHS.MYPAGE.PREVIOUS_ORDERS.MAIN,
        title: '이전주문 내역',
    },
    {
        pathname: PATHS.MYPAGE.COUPONS,
        title: '쿠폰',
    },
    {
        pathname: PATHS.MYPAGE.ACCUMULATIONS,
        title: '적립금',
    },
    {
        pathname: PATHS.MYPAGE.WISH,
        title: '찜한 상품',
    },
    {
        pathname: PATHS.MYPAGE.RECENT_PRODUCTS,
        title: '최근 본 상품',
    },
    {
        pathname: PATHS.MYPAGE.REVIEWS.MAIN,
        title: '나의 상품후기',
    },
    {
        pathname: PATHS.MYPAGE.EDIT,
        title: '회원정보 변경',
    },
    {
        pathname: PATHS.MYPAGE.ADDRESSES.MAIN,
        title: '배송지 관리',
    },
    {
        pathname: PATHS.MYPAGE.INQUIRIES.MAIN,
        title: '1:1 문의',
    },
    {
        pathname: PATHS.MYPAGE.PRODUCT_INQUIRIES.MAIN,
        title: '상품문의 내역',
    },
];
