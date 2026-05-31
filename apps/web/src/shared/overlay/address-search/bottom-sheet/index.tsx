import { useTranslation } from 'react-i18next';

import {
    AddressRegister,
    AddressSearch,
} from '@/shared/overlay/address-search/content';
import { BottomSheetLayout } from '@/shared/components/layout';

interface AddressSearchBottomSheetProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    onSelect: (address: AddressRegister) => void;
}

export const AddressSearchBottomSheet = (
    props: AddressSearchBottomSheetProps,
) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            isOpen={props.isOpen}
            close={props.close}
            unmount={props.unmount}
            title={t('주소 검색')}
            type='fullscreen'
        >
            <AddressSearch {...props} />
        </BottomSheetLayout>
    );
};
