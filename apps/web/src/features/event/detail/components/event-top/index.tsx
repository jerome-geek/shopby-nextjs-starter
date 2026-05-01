import * as styles from '@/features/event/detail/components/event-top/index.css';

interface EventTopProps {
    label: string;
    imgUrlInfo: {
        pc: string;
        mobile: string;
    };
    promotionText?: string;
}

const EventTop = ({ label, imgUrlInfo, promotionText }: EventTopProps) => {
    return (
        <div className={styles.topContainer}>
            <div className={styles.topInner}>
                <div className={styles.imageWrapper}>
                    {/* PC Content */}
                    <div className={styles.contentWrapper}>
                        <img
                            src={imgUrlInfo.pc}
                            alt={label}
                            className={styles.htmlContent}
                        />
                    </div>

                    {/* Mobile Content */}
                    <div className={styles.mobileContentWrapper}>
                        <img
                            src={imgUrlInfo.mobile}
                            alt={label}
                            className={styles.htmlContent}
                        />
                    </div>
                </div>

                <div className={styles.topContent}>
                    <h1 className={styles.topTitle}>{label}</h1>
                    {promotionText && (
                        <p className={styles.topDescription}>{promotionText}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventTop;
