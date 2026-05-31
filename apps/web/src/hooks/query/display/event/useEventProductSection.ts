import { useQuery } from '@tanstack/react-query';

import {
    eventProductSectionOptions,
    type EventProductSectionParams,
} from '@/entities/event/queries';
import type { GetEventProductDisplaySectionResponse } from '@/entities/display/model/event';

const useEventProductSection = <T = GetEventProductDisplaySectionResponse>(
    params: EventProductSectionParams<T>,
) => {
    return useQuery(eventProductSectionOptions(params));
};

export default useEventProductSection;
