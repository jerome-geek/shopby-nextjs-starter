import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

const SectionSkeleton = () => {
    return (
        <div
            className={css({
                padding: token('spacing.5'),
                marginBottom: token('spacing.6'),
            })}
        >
            <div
                className={css({
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: token('spacing.4'),
                })}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className={css({
                            height: '220px',
                            backgroundColor: token('colors.gray20'),
                            borderRadius: token('spacing.3'),
                            animation: 'pulse 1.5s ease-in-out infinite',
                        })}
                    />
                ))}
            </div>
        </div>
    );
};

export default SectionSkeleton;
