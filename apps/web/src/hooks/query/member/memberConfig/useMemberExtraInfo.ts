import { useQuery } from '@tanstack/react-query';

import {
    memberExtraInfoOptions,
    type UseMemberExtraInfoParams,
} from '@/entities/member/memberConfig/queries';
import type { GetMemberExtraInfoResponse } from '@/models/member/memberConfig';

const useMemberExtraInfo = <T = GetMemberExtraInfoResponse>(
    params: UseMemberExtraInfoParams<T> = {},
) => useQuery(memberExtraInfoOptions(params));

export default useMemberExtraInfo;
