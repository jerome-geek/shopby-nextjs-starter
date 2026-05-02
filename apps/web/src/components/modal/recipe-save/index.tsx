import { Plus } from 'lucide-react';

import * as styles from '@/components/layer-contents/recipe-save/index.css';
import { ModalLayout } from '@/components/layout';
import { RecipeSaveContent } from '@/components/layer-contents/recipe-save';
import { useResponsive } from '@/hooks/utils';

interface RecipeSaveModalProps {
    isOpen: boolean;
    close: () => void;
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
            close={close}
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
