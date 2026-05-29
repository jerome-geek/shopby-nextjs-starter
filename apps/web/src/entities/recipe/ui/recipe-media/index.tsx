import { useEffect, useRef } from 'react';

import type { RecipeSourceType } from '@/models/shop';
import { useYoutubePlayer } from '@/shared/hooks/useYoutubePlayer';

import { resolveRecipeMediaVariant } from '@/entities/recipe/utils/source';
import * as styles from './index.css';

interface RecipeMediaProps {
    sourceType: RecipeSourceType;
    sourceUrl: string;
    sourceId?: string | null;
    thumbnailUrl?: string | null;
    title: string;
    onPlayerReady?: (seekAndPause: (seconds: number) => void) => void;
}

export const RecipeMedia = ({
    sourceType,
    sourceUrl,
    sourceId,
    thumbnailUrl,
    title,
    onPlayerReady,
}: RecipeMediaProps) => {
    const { iframeRef, seekAndPause } = useYoutubePlayer();
    const variant = resolveRecipeMediaVariant(sourceType, sourceId, sourceUrl);
    const isYoutubeLongForm =
        variant === 'youtube' && !sourceUrl.includes('/shorts/');

    const onPlayerReadyRef = useRef(onPlayerReady);
    onPlayerReadyRef.current = onPlayerReady;

    useEffect(() => {
        if (variant === 'youtube') {
            onPlayerReadyRef.current?.(seekAndPause);
        }
    }, [variant, seekAndPause]);

    return (
        <div
            className={styles.imageCarouselContainer({
                sticky: isYoutubeLongForm,
            })}
        >
            <div
                className={styles.imageCarousel({
                    ratio: isYoutubeLongForm ? 'wide' : 'square',
                })}
            >
                {variant === 'youtube' ? (
                    <iframe
                        ref={iframeRef}
                        src={`https://www.youtube.com/embed/${sourceId}?enablejsapi=1&rel=0&playsinline=1`}
                        title={title}
                        className={styles.carouselVideo}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                    />
                ) : variant === 'external' && thumbnailUrl ? (
                    <a
                        href={sourceUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.carouselExternalLink}
                    >
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className={styles.carouselImage}
                        />
                    </a>
                ) : (
                    thumbnailUrl && (
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className={styles.carouselImage}
                        />
                    )
                )}
            </div>
        </div>
    );
};
