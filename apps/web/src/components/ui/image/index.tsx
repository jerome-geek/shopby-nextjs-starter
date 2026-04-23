import { useCallback, useState } from 'react';

import * as styles from '@/components/ui/image/index.css';
import Skeleton from '@/components/ui/skeleton';

type ImageStatus = 'loading' | 'loaded' | 'error';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    loading?: 'eager' | 'lazy';
}

/**
 * img 태그를 래핑해 로딩/에러(재시도) 상태를 표준화한 컴포넌트입니다.
 *
 * - 부모 컴포넌트의 width/height를 100% 따라갑니다.
 * - 폴드 위(LCP) 대표 이미지는 상황에 따라 `loading='eager'`가 더 적합할 수 있습니다. (기본값: 'lazy')
 * - 일반 img태그 보다 더 많은 리소스를 사용하기 때문에 필요한 컴포넌트에만 사용하는 것을 권장합니다.
 */
const ImageWrapper = ({
    src,
    alt,
    className,
    objectFit,
    loading = 'lazy',
}: ImageProps) => {
    const [prevSrc, setPrevSrc] = useState(src);
    const [status, setStatus] = useState<ImageStatus>('loading');
    const [retryKey, setRetryKey] = useState(0);

    // NOTE : src가 바뀌면 렌더 중에 바로 loading으로 리셋 (React 파생 상태 패턴)
    if (src !== prevSrc) {
        setPrevSrc(src);
        setStatus('loading');
    }

    const imgCallbackRef = useCallback(
        (node: HTMLImageElement | null) => {
            if (!node || !node.complete) {
                return;
            }

            setStatus(node.naturalWidth > 0 ? 'loaded' : 'error');
        },
        [src],
    );

    const handleRetry = () => {
        setStatus('loading');
        setRetryKey((prev) => prev + 1);
    };

    return (
        <div className={`${styles.wrapper}${className ? ` ${className}` : ''}`}>
            <div className={styles.skeletonContainer} data-status={status}>
                <Skeleton />
            </div>

            {status === 'error' && (
                <div className={styles.errorOverlay}>
                    <span className={styles.errorText}>
                        이미지를 불러올 수 없습니다.
                    </span>
                    <button
                        type='button'
                        className={styles.retryButton}
                        onClick={handleRetry}
                    >
                        다시 시도
                    </button>
                </div>
            )}

            <img
                key={retryKey}
                ref={imgCallbackRef}
                src={src}
                alt={alt}
                loading={loading}
                className={styles.image}
                data-status={status}
                style={objectFit ? { objectFit } : undefined}
                onLoad={() => setStatus('loaded')}
                onError={() => setStatus('error')}
            />
        </div>
    );
};

export default ImageWrapper;
