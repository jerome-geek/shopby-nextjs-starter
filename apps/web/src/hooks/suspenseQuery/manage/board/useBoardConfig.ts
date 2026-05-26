import { useSuspenseQuery } from '@tanstack/react-query';

import {
    boardConfigSuspenseOptions,
    type UseBoardConfigSuspenseParams,
} from '@/entities/manage/board/queries';
import type { GetBoardConfigResponse } from '@/models/manage/board';

const useBoardConfig = <T = GetBoardConfigResponse>(
    params: UseBoardConfigSuspenseParams<T> = {},
) => useSuspenseQuery(boardConfigSuspenseOptions(params));

export default useBoardConfig;
