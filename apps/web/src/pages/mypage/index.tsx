import { GetServerSideProps } from 'next';
import { isLoggedIn } from '@/utils/auth';
import { PATHS } from '@/const/paths';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const loggedIn = isLoggedIn(ctx);
    console.log('🚀 ~ getServerSideProps ~ isLoggedIn:', loggedIn);
    if (!loggedIn) {
        return {
            redirect: {
                destination: PATHS.AUTH.LOGIN,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default function MypageMain() {
    return (
        <div>
            <h1>마이페이지</h1>
            <p>로그인한 사용자만 볼 수 있는 페이지입니다.</p>
        </div>
    );
}
