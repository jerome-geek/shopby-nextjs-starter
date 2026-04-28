import { createContext } from 'react';

import type { MypageMenuList } from '@/components/mypage/side-navigation';

const MypageMenuContext = createContext<MypageMenuList | null>(null);

export default MypageMenuContext;
