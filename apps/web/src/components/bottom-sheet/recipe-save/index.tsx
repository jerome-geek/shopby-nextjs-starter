import { Plus } from 'lucide-react';

import { RecipeSaveContent } from '@/components/layer-contents/recipe-save';
import * as styles from '@/components/layer-contents/recipe-save/index.css';
import { BottomSheetLayout } from '@/components/layout';
import { useResponsive } from '@/hooks/utils';

interface RecipeSaveSheetProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    recipeSno?: number;
    onAddCollection?: () => void;
}

export const RecipeSaveSheet = ({
    isOpen,
    close,
    unmount,
    recipeSno,
    onAddCollection,
}: RecipeSaveSheetProps) => {
    const { isMobile } = useResponsive();

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={'레시피 저장'}
            isUnmountCondition={false}
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
        </BottomSheetLayout>
    );
};
