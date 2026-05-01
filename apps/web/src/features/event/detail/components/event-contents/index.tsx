import * as styles from '@/features/event/detail/components/event-contents/index.css';
import type { EventTopInfo } from '@/models/display';

interface EventContentsProps {
    top: EventTopInfo;
}

const EventContents = ({ top }: EventContentsProps) => {
    const pcUrl =
        top.pc.type === 'FILE' ? top.pc.url : stripThumbnailElement(top.pc.url);
    const mobileUrl =
        top.mobile.type === 'FILE'
            ? top.mobile.url
            : stripThumbnailElement(top.mobile.url);

    if (!pcUrl && !mobileUrl) {
        return null;
    }

    return (
        <>
            {/* PC Content */}
            {pcUrl && (
                <div className={styles.contentWrapper}>
                    {top.pc.type === 'FILE' ? (
                        <img
                            src={pcUrl}
                            alt={'기획전 컨텐츠 이미지'}
                            className={styles.image}
                        />
                    ) : (
                        <div
                            className={styles.htmlContent}
                            dangerouslySetInnerHTML={{
                                __html: pcUrl,
                            }}
                        />
                    )}
                </div>
            )}

            {/* Mobile Content */}
            {mobileUrl && (
                <div className={styles.mobileContentWrapper}>
                    {top.mobile.type === 'FILE' ? (
                        <img
                            src={mobileUrl}
                            alt={'기획전 컨텐츠 이미지'}
                            className={styles.image}
                        />
                    ) : (
                        <div
                            className={styles.htmlContent}
                            dangerouslySetInnerHTML={{
                                __html: mobileUrl,
                            }}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default EventContents;

// NOTE: id="thumbnail" 요소가 포함된 엘리먼트를를 제거하는 함수
const stripThumbnailElement = (html: string) => {
    if (!html) {
        return html;
    }

    const THUMBNAIL_MARKER = '<!--__THUMBNAIL_REMOVED__-->';

    let replaced = html
        .replace(
            /<([a-zA-Z][\w:-]*)\b[^>]*\bid\s*=\s*["']thumbnail["'][^>]*>/gi,
            THUMBNAIL_MARKER,
        )
        .replace(
            /<([a-zA-Z][\w:-]*)\b[^>]*\bid\s*=\s*["']thumbnail["'][^>]*>[\s\S]*?<\/\1>/gi,
            THUMBNAIL_MARKER,
        );

    const BR_OR_SPACE = '(?:\\s|&nbsp;|<br\\s*/?>)*';
    const WRAPPER_ONLY_MARKER = new RegExp(
        `<([a-zA-Z][\\w:-]*)\\b[^>]*>${BR_OR_SPACE}${THUMBNAIL_MARKER}${BR_OR_SPACE}<\\/\\1>`,
        'gi',
    );

    const removeEmptyWrapperChain = (input: string): string => {
        const next = input.replace(WRAPPER_ONLY_MARKER, THUMBNAIL_MARKER);
        return next === input ? input : removeEmptyWrapperChain(next);
    };

    replaced = removeEmptyWrapperChain(replaced);

    return replaced.replaceAll(THUMBNAIL_MARKER, '');
};
