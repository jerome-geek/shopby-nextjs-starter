import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type IconBannerSkeletonProps = {
    type?: 'main' | 'sub';
};

const IconBannerSkeleton = ({ type = 'main' }: IconBannerSkeletonProps) => {
    const isMain = type === 'main';

    return (
            isMain ? (
                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: token('spacing.2'),
                    })}
                >
                    {/* 모바일 */}
                    <div
                        className={css({
                            display: { base: 'flex', md: 'none' },
                            gap: token('spacing.2'),
                            paddingX: token('spacing.5'),
                            overflow: 'hidden',
                        })}
                    >
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                width={100}
                                height={40}
                                borderRadius={4}
                            />
                        ))}
                    </div>
                    <div
                        className={css({
                            display: { base: 'flex', md: 'none' },
                            gap: token('spacing.2'),
                            paddingX: token('spacing.5'),
                            overflow: 'hidden',
                        })}
                    >
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                width={100}
                                height={40}
                                borderRadius={4}
                            />
                        ))}
                    </div>
                    {/* 데스크탑 */}
                    <ul
                        className={css({
                            display: { base: 'none', md: 'flex' },
                            justifyContent: 'center',
                            gap: token('spacing.2'),
                            flexWrap: 'nowrap',
                        })}
                    >
                        {Array.from({ length: 5 }).map((_, index) => (
                            <li key={index} className={css({ flexShrink: 0 })}>
                                <Skeleton
                                    width={100}
                                    height={48}
                                    borderRadius={8}
                                />
                            </li>
                        ))}
                    </ul>
                    <ul
                        className={css({
                            display: { base: 'none', md: 'flex' },
                            justifyContent: 'center',
                            gap: token('spacing.2'),
                            flexWrap: 'nowrap',
                        })}
                    >
                        {Array.from({ length: 4 }).map((_, index) => (
                            <li key={index} className={css({ flexShrink: 0 })}>
                                <Skeleton
                                    width={100}
                                    height={48}
                                    borderRadius={8}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    {/* 모바일 8개 이하: Grid */}
                    <ul
                        className={css({
                            display: { base: 'grid', md: 'none' },
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: `${token('spacing.3')} ${token('spacing.4')}`,
                            paddingX: token('spacing.5'),
                        })}
                    >
                        {Array.from({ length: 8 }).map((_, index) => (
                            <li
                                key={index}
                                className={css({
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: { base: '2px', md: token('spacing.1') },
                                })}
                            >
                                <Skeleton
                                    width={70}
                                    height={70}
                                    borderRadius={35}
                                />
                                <Skeleton width={48} height={12} />
                            </li>
                        ))}
                    </ul>
                    {/* 데스크탑: Flex wrap */}
                    <ul
                        className={css({
                            display: { base: 'none', md: 'flex' },
                            justifyContent: 'center',
                            gap: `${token('spacing.3')} ${token('spacing.10')}`,
                            flexWrap: 'wrap',
                        })}
                    >
                        {Array.from({ length: 8 }).map((_, index) => (
                            <li
                                key={index}
                                className={css({
                                    flexShrink: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: token('spacing.1'),
                                })}
                            >
                                <Skeleton
                                    width={92}
                                    height={92}
                                    borderRadius={46}
                                />
                                <Skeleton width={48} height={14} />
                            </li>
                        ))}
                    </ul>
                </div>
            )
    );
};

export default IconBannerSkeleton;
