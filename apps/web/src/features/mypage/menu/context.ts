import { createContext } from 'react';

import type { MypageMenuList } from '@/features/mypage/side-navigation';

const MypageMenuContext = createContext<MypageMenuList | null>(null);

export default MypageMenuContext;
