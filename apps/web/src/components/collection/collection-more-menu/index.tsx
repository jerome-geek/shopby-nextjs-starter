import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bookmark, EllipsisVertical, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/collection/collection-more-menu/index.css';

interface CollectionMoreMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

/**
 * 컬렉션 수정/삭제를 위한 공통 드롭다운 메뉴 컴포넌트
 */
export const CollectionMoreMenu = ({
    onEdit,
    onDelete,
}: CollectionMoreMenuProps) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
                <button className={styles.moreButton} aria-label={t('더보기')}>
                    <EllipsisVertical size={20} />
                </button>
            </DropdownMenu.Trigger>

            <AnimatePresence>
                {open && (
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
                            >
                                <DropdownMenu.Item
                                    className={styles.dropdownItem}
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        setOpen(false);
                                        onEdit();
                                    }}
                                >
                                    <Heart size={16} /> {t('컬렉션 수정')}
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                    className={styles.dropdownItem}
                                    data-variant='danger'
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        setOpen(false);
                                        onDelete();
                                    }}
                                >
                                    <Bookmark size={16} /> {t('컬렉션 삭제')}
                                </DropdownMenu.Item>
                            </motion.div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                )}
            </AnimatePresence>
        </DropdownMenu.Root>
    );
};
