import { overlay } from 'overlay-kit';
import { useEffect } from 'react';

import { OVERLAY_ID } from '@/const/overlay';

const ORDER_CANCEL_CODE = '1';

const useOrderPostMessage = () => {
    useEffect(() => {
        const postMessageHandler = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data) as {
                    code: string;
                };

                if (data?.code === ORDER_CANCEL_CODE) {
                    overlay.close(OVERLAY_ID.LOADING);
                }
            } catch {}
        };

        window.addEventListener('message', postMessageHandler);

        return () => {
            window.removeEventListener('message', postMessageHandler);
        };
    }, []);
};

export default useOrderPostMessage;
