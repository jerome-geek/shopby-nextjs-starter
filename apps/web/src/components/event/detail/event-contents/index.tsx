import * as styles from '@/components/event/detail/event-contents/index.css';
import type { EventTopInfo } from '@/models/display';

interface EventContentsProps {
    top: EventTopInfo;
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

const EventContents = ({ top }: EventContentsProps) => {
    if (!top.pc.url && !top.mobile.url) {
        return null;
    }

    return (
        <>
            {/* PC Content */}
            {top.pc.url && (
                <div className={styles.contentWrapper}>
                    {top.pc.type === 'FILE' ? (
                        <img
                            src={top.pc.url}
                            alt={'기획전 컨텐츠 이미지'}
                            className={styles.htmlContent}
                        />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: stripThumbnailElement(top.pc.url),
                            }}
                        />
                    )}
                </div>
            )}

            {/* Mobile Content */}
            {top.mobile.url && (
                <div className={styles.mobileContentWrapper}>
                    {top.mobile.type === 'FILE' ? (
                        <img
                            src={top.mobile.url}
                            alt={'기획전 컨텐츠 이미지'}
                            className={styles.htmlContent}
                        />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: stripThumbnailElement(top.mobile.url),
                            }}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default EventContents;
