import { EventTopInfo } from '@/models/display';
import * as styles from './index.css';

interface EventTopProps {
    label: string;
    top: EventTopInfo;
    promotionText?: string;
}

const EventTop = ({ label, top, promotionText }: EventTopProps) => {
    return (
        <div className={styles.topContainer}>
            <div className={styles.topInner}>
                <div className={styles.imageWrapper}>
                    {/* PC Content */}
                    <div className={styles.contentWrapper}>
                        {top.pc.type === 'FILE' && top.pc.url && (
                            <img
                                src={top.pc.url}
                                alt={label}
                                className={styles.htmlContent}
                            />
                        )}
                        {top.pc.type === 'HTML' && (
                            <div
                                className={styles.htmlContent}
                                dangerouslySetInnerHTML={{ __html: top.pc.url }}
                            />
                        )}
                    </div>

                    {/* Mobile Content */}
                    <div className={styles.mobileContentWrapper}>
                        {top.mobile.type === 'FILE' && top.mobile.url && (
                            <img
                                src={top.mobile.url}
                                alt={label}
                                className={styles.htmlContent}
                            />
                        )}
                        {top.mobile.type === 'HTML' && (
                            <div
                                className={styles.htmlContent}
                                dangerouslySetInnerHTML={{
                                    __html: top.mobile.url,
                                }}
                            />
                        )}
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
