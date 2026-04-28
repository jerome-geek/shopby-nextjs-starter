import { useContext } from 'react';

import MypageMenuContext from '@/context/mypageMenu/context';

const useMypageMenu = () => {
    return useContext(MypageMenuContext);
};

export default useMypageMenu;
