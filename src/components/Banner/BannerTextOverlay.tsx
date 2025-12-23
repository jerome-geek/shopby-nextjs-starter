'use client';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

type BannerTextOverlayProps = {
    /** 배너 타이틀 */
    title?: string;
    /** 배너 설명 */
    description?: string;
    /** 타이틀 색상 */
    titleColor?: string;
    /** 설명 색상 */
    descriptionColor?: string;
};

const BannerTextOverlay = ({
    title,
    description,
    titleColor,
    descriptionColor,
}: BannerTextOverlayProps) => {
    if (!title && !description) {
        return null;
    }

    return (
        <div
            className={css({
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '50%',
                background:
                    'linear-gradient(to bottom, rgba(77,77,77,0), rgba(34, 34, 34, .6))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                paddingX: { base: '16px', md: '30px' },
                paddingY: { base: '24px', md: '48px' },
                gap: { base: '6px', md: '8px' },
            })}
        >
            {title && (
                <h2
                    className={css({
                        fontSize: '30px',
                        fontWeight: '700',
                        lineHeight: '132%',
                        color: titleColor || token('colors.white'),
                    })}
                    dangerouslySetInnerHTML={{
                        __html: title,
                    }}
                />
            )}

            {description && (
                <p
                    className={css({
                        fontSize: '15px',
                        fontWeight: '400',
                        lineHeight: '140%',
                        color: descriptionColor || token('colors.white'),
                    })}
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                />
            )}
        </div>
    );
};

export default BannerTextOverlay;
