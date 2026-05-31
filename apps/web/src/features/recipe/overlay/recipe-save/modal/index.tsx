import { Plus } from 'lucide-react';

import { RecipeSaveContent } from '@/features/recipe/overlay/recipe-save/content';
import * as styles from '@/features/recipe/overlay/recipe-save/content/index.css';
import { ModalLayout } from '@/shared/components/layout';
import { useResponsive } from '@/hooks/utils';

interface RecipeSaveModalProps {
    isOpen: boolean;
    close: (isSaved?: boolean) => void;
    unmount: () => void;
    recipeSno?: number;
    onAddCollection?: () => void;
}

export const RecipeSaveModal = ({
    isOpen,
    close,
    unmount,
    recipeSno,
    onAddCollection,
}: RecipeSaveModalProps) => {
    const { isMobile } = useResponsive();

    return (
        <ModalLayout
            isOpen={isOpen}
            close={() => close(false)}
            unmount={unmount}
            title={'레시피 저장'}
            size='small'
            width='540px'
            footerButtonList={[
                <button
                    key='create-collection'
                    type='button'
                    className={styles.createButton}
                    onClick={onAddCollection}
                >
                    <Plus size={isMobile ? 16 : 20} />
                    <span>새 컬렉션 만들기</span>
                </button>,
            ]}
        >
            <RecipeSaveContent
                close={close}
                recipeSno={recipeSno}
                onAddCollection={onAddCollection}
            />
        </ModalLayout>
    );
};
