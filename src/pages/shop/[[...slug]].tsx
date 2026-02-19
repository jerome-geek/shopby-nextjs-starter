import { GetServerSideProps } from 'next';
import React from 'react';
import Link from 'next/link';

const SHOP_TYPES = {
    DISCOVERY: 'discovery',
    LIFE: 'life',
    KIDS: 'kids',
} as const;

type ShopType = (typeof SHOP_TYPES)[keyof typeof SHOP_TYPES];

interface ShopMainPageProps {
    type: ShopType;
}

export default function ShopMainPage({ type }: ShopMainPageProps) {
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>쇼핑몰 메인 - {type.toUpperCase()}</h1>
            <p>
                현재 페이지 타입: <strong>{type}</strong>
            </p>
            <nav
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                }}
            >
                <Link
                    href="/shop"
                    style={{
                        color: type === 'discovery' ? 'blue' : 'black',
                        fontWeight: type === 'discovery' ? 'bold' : 'normal',
                        textDecoration: 'none'
                    }}
                >
                    발견
                </Link>
                <Link
                    href="/shop/life"
                    style={{
                        color: type === 'life' ? 'blue' : 'black',
                        fontWeight: type === 'life' ? 'bold' : 'normal',
                    }}
                >
                    라이프
                </Link>
                <Link
                    href="/shop/kids"
                    style={{
                        color: type === 'kids' ? 'blue' : 'black',
                        fontWeight: type === 'kids' ? 'bold' : 'normal',
                    }}
                >
                    키즈
                </Link>
            </nav>
            <div
                style={{
                    marginTop: '50px',
                    border: '1px dashed #ccc',
                    padding: '100px',
                }}
            >
                {type === 'discovery' && (
                    <div>✨ 발견 탭 전용 콘텐츠 (기획전, 추천 상품 등)</div>
                )}
                {type === 'life' && (
                    <div>🌿 라이프 탭 전용 콘텐츠 (인테리어, 주방용품 등)</div>
                )}
                {type === 'kids' && (
                    <div>👶 키즈 탭 전용 콘텐츠 (장난감, 육아용품 등)</div>
                )}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string[] | undefined;
    const path = slug?.[0];

    // 허용된 경로 목록
    const validPaths = [undefined, 'life', 'kids'];

    // 3가지 외 다른 경로로 들어왔을 경우 /shop으로 리다이렉트
    if (path && !validPaths.includes(path)) {
        return {
            redirect: {
                destination: '/shop',
                permanent: false,
            },
        };
    }

    const type =
        path === 'life'
            ? SHOP_TYPES.LIFE
            : path === 'kids'
              ? SHOP_TYPES.KIDS
              : SHOP_TYPES.DISCOVERY;

    return {
        props: {
            type,
        },
    };
};
