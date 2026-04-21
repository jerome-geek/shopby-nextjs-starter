import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bookmark, EllipsisVertical, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/ui/vertical-more-menu/index.css';
import { useResponsive } from '@/hooks/utils';
import { useDropdownStore } from '@/store/useDropdownStore';

interface VerticalMoreMenuProps {
    /** 드롭다운 식별을 위한 유니크 ID */
    id: string;
    iconSize?: number;
    onEdit: () => void;
    onEditText?: string;
    onDelete: () => void;
    onDeleteText?: string;
}

/**
 * 아이템 수정/삭제를 위한 공통 드롭다운 메뉴 컴포넌트 (Vertical Ellipsis)
 */
export const VerticalMoreMenu = ({
    id,
    iconSize,
    onEdit,
    onEditText,
    onDelete,
    onDeleteText,
}: VerticalMoreMenuProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const { activeId, setActiveId } = useDropdownStore();
    const isOpen = activeId === id;

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            setActiveId(id);
        } else if (activeId === id) {
            setActiveId('');
        }
    };

    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={handleOpenChange}>
            <DropdownMenu.Trigger asChild>
                <button
                    className={styles.moreButton}
                    aria-label={t('더보기')}
                >
                    <EllipsisVertical size={iconSize ?? (isMobile ? 16 : 20)} />
                </button>
            </DropdownMenu.Trigger>

            <AnimatePresence>
                {isOpen && (
                    <DropdownMenu.Portal forceMount>
                        <DropdownMenu.Content
                            className={styles.dropdownContent}
                            sideOffset={5}
                            align='end'
                            asChild
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{
                                    type: 'spring',
                                    damping: 20,
                                    stiffness: 300,
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <DropdownMenu.Item
                                    className={styles.dropdownItem}
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleOpenChange(false);
                                        onEdit();
                                    }}
                                >
                                    <Heart size={16} />
                                    <span>{onEditText ?? t('수정')}</span>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                    className={styles.dropdownItem}
                                    data-variant='danger'
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleOpenChange(false);
                                        onDelete();
                                    }}
                                >
                                    <Bookmark size={16} />
                                    <span>{onDeleteText ?? t('삭제')}</span>
                                </DropdownMenu.Item>
                            </motion.div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                )}
            </AnimatePresence>
        </DropdownMenu.Root>
    );
};
