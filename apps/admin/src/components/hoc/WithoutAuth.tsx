import { ComponentType } from 'react';
import { Navigate } from 'react-router';

import { PATHS } from '@/const/paths';
import { checkLogin } from '@/utils/users';

const WithoutAuth = (Component: ComponentType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (props: any) => {
        const isLogin = checkLogin();

        if (!isLogin) {
            return <Component {...props} />;
        } else {
            return (
                <Navigate
                    to={{
                        pathname: PATHS.DASHBOARD,
                    }}
                    replace
                />
            );
        }
    };
};

export default WithoutAuth;
