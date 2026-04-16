import { EventTopInfo } from '@/models/display';
import * as styles from '@/components/event/detail/event-top/index.css';

interface EventTopProps {
    label: string;
    top: EventTopInfo;
    promotionText?: string;
}

// NOTE: id="thumbnail" 요소를 제거하는 함수
const stripThumbnailElement = (html: string) => {
    if (!html) {
        return html;
    }

    const voidTagRemoved = html.replace(
        /<([a-zA-Z][\w:-]*)\b[^>]*\bid\s*=\s*["']thumbnail["'][^>]*>/gi,
        '',
    );

    return voidTagRemoved.replace(
        /<([a-zA-Z][\w:-]*)\b[^>]*\bid\s*=\s*["']thumbnail["'][^>]*>[\s\S]*?<\/\1>/gi,
        '',
    );
};

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
                                dangerouslySetInnerHTML={{
                                    __html: stripThumbnailElement(top.pc.url),
                                }}
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
                                    __html: stripThumbnailElement(
                                        top.mobile.url,
                                    ),
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
