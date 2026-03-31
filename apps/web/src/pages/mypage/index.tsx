import { MypageLayout } from '@/components/layout/mypage';

export default function MypageMain() {
    return (
        <div>
            <h1>마이페이지</h1>
            <p>로그인한 사용자만 볼 수 있는 페이지입니다.</p>
        </div>
    );
}

MypageMain.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
