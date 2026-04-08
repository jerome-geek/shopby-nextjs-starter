import * as React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { ModalLayout, DefaultModalLayoutProps, BottomSheetLayout } from '@/components/layout';
import { useResponsive } from '@/hooks/utils';
import { collection } from '@/api/shop';
import { vars } from '@/styles/theme.css';
import * as styles from './index.css';

export const RecipeCollectionCreateModal = ({
    isOpen,
    close,
    unmount,
}: DefaultModalLayoutProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const [newCollection, setNewCollection] = React.useState({
        title: '',
        desc: '',
        link: '',
    });

    const isSubmitActive = newCollection.title.trim().length > 0;

    const handleCreate = async () => {
        try {
            const description = newCollection.link
                ? `${newCollection.desc}\n\nLink: ${newCollection.link}`.trim()
                : newCollection.desc;

            await collection.create({
                title: newCollection.title,
                description,
            });

            console.log('Collection created successfully');
            close();
            setNewCollection({ title: '', desc: '', link: '' });
            // TODO: Refresh the collection list on the scrap page if needed
        } catch (error) {
            console.error('Failed to create collection:', error);
            // TODO: Error toast/message
        }
    };

    const FormContent = (
        <div className={styles.modalForm}>
            <div className={styles.formItem}>
                <div className={styles.labelArea}>
                    <label className={styles.label}>{t('컬렉션 이름')}</label>
                    <span className={styles.required}>*</span>
                </div>
                <input
                    className={styles.input}
                    placeholder={t('컬렉션 이름을 입력하세요')}
                    value={newCollection.title}
                    onChange={(e) =>
                        setNewCollection({ ...newCollection, title: e.target.value })
                    }
                />
            </div>

            <div className={styles.formItem}>
                <label className={styles.label}>{t('컬렉션 소개')}</label>
                <textarea
                    className={styles.textarea}
                    placeholder={t('이 컬렉션에 대해 간단히 소개해 주세요')}
                    value={newCollection.desc}
                    onChange={(e) =>
                        setNewCollection({ ...newCollection, desc: e.target.value })
                    }
                />
            </div>

            <div className={styles.formItem}>
                <div className={styles.labelArea}>
                    <label className={styles.label}>{t('링크')}</label>
                    <Tooltip.Provider delayDuration={200}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <button className={styles.tooltipTrigger} type="button">
                                    <Info size={16} />
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
                                    {t('이 컬렉션에 공유하고 싶은 링크를 넣어 주세요')}
                                    <Tooltip.Arrow fill={vars.color.gray['80']} />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </div>
                <input
                    className={styles.input}
                    placeholder="https://example.com"
                    value={newCollection.link}
                    onChange={(e) =>
                        setNewCollection({ ...newCollection, link: e.target.value })
                    }
                />
            </div>

            <button
                className={styles.submitButton}
                data-active={isSubmitActive}
                disabled={!isSubmitActive}
                type="button"
                onClick={handleCreate}
            >
                {t('컬렉션 만들기')}
            </button>
        </div>
    );

    if (isMobile) {
        return (
            <BottomSheetLayout
                isOpen={isOpen}
                close={close}
                unmount={unmount}
                title={t('새 컬렉션 만들기')}
            >
                {FormContent}
            </BottomSheetLayout>
        );
    }

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('새 컬렉션 만들기')}
            size="small"
        >
            {FormContent}
        </ModalLayout>
    );
};
