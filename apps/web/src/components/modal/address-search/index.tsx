import { useTranslation } from 'react-i18next';

import {
    AddressRegister,
    AddressSearch,
} from '@/components/layer-contents/address-search';
import { ModalLayout } from '@/components/layout';

interface AddressSearchModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    onSelect: (address: AddressRegister) => void;
}

export const AddressSearchModal = (props: AddressSearchModalProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            isOpen={props.isOpen}
            close={props.close}
            unmount={props.unmount}
            title={t('주소 검색')}
            size='medium'
        >
            <AddressSearch {...props} />
        </ModalLayout>
    );
};
