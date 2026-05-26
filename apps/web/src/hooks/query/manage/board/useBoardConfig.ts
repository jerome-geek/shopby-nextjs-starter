import { useQuery } from '@tanstack/react-query';

import {
    boardConfigOptions,
    type UseBoardConfigParams,
} from '@/entities/manage/board/queries';
import type { GetBoardConfigResponse } from '@/models/manage/board';

const useBoardConfig = <T = GetBoardConfigResponse>(
    params: UseBoardConfigParams<T> = {},
) => useQuery(boardConfigOptions(params));

export default useBoardConfig;
