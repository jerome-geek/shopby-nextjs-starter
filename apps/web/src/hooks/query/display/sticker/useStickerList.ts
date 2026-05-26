import { useQuery } from '@tanstack/react-query';

import {
    stickerListOptions,
    type StickerListOptionsParams,
} from '@/entities/display/sticker/queries';
import type { GetStickersResponse } from '@/models/display/sticker';

const useStickerList = <T = GetStickersResponse>(
    params: StickerListOptionsParams<T> = {},
) => {
    return useQuery(stickerListOptions(params));
};

export default useStickerList;
