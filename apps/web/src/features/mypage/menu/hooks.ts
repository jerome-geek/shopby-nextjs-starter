import { useContext } from 'react';

import MypageMenuContext from '@/features/mypage/menu/context';

const useMypageMenu = () => {
    return useContext(MypageMenuContext);
};

export default useMypageMenu;
