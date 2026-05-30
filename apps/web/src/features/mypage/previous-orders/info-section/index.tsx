import React from 'react';

import * as styles from '@/features/mypage/previous-orders/info-section/index.css';

interface InfoSectionProps {
    title: string;
    infoList: { label: string; content: string | React.ReactNode }[];
}

export const InfoSection = ({ title, infoList }: InfoSectionProps) => {
    return (
        <section className={styles.infoSection}>
            <h3 className={styles.infoTitle}>{title}</h3>
            <div className={styles.infoList}>
                {infoList.map((info, idx) => (
                    <div key={idx} className={styles.infoRow}>
                        <div className={styles.infoLabel}>{info.label}</div>
                        <div className={styles.infoContent}>
                            {info.content || '-'}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
