import { useTranslation } from 'react-i18next';

import * as styles from '@/shared/overlay/sort/bottom-sheet/index.css';
import {
    BottomSheetLayout,
    type DefaultModalLayoutProps,
} from '@/shared/components/layout';

export type SortBottomSheetOption = {
    id: string;
    name: string;
};

export interface SortBottomSheetProps extends DefaultModalLayoutProps {
    queryOptions: readonly SortBottomSheetOption[];
    selectedQueryOption?: SortBottomSheetOption;
    onQueryChange: (option: SortBottomSheetOption) => void;
}

export const SortBottomSheet = ({
    isOpen,
    close,
    unmount,
    queryOptions,
    selectedQueryOption,
    onQueryChange,
}: SortBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout isOpen={isOpen} close={close} unmount={unmount}>
            <ul className={styles.queryList} data-lenis-prevent>
                {queryOptions.map((option) => (
                    <li key={option.id} className={styles.queryListItem}>
                        <button
                            type='button'
                            className={styles.optionButton({
                                isSelected:
                                    selectedQueryOption?.id === option.id,
                            })}
                            onClick={() => {
                                onQueryChange(option);
                                close();
                            }}
                        >
                            {t(option.name)}
                        </button>
                    </li>
                ))}
            </ul>
        </BottomSheetLayout>
    );
};
