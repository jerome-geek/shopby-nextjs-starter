'use client';

import { css } from '@/styled-system/css';
import { text } from '@/styled-system/recipes';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { PATHS } from '@/const/paths';
import useMediaQuery from '@/hooks/useMediaQuery';
import { GetEventResponse } from '@/models/display/event';

interface ArticleSectionItemProps {
    events: GetEventResponse;
}

const ArticleSectionItem = ({ events }: ArticleSectionItemProps) => {
    const mediaQueryResult = useMediaQuery('(max-width: 767px)');
    const isMobile = mediaQueryResult === true;

    const eventDetailPath = PATHS.EVENTS.DETAIL.replace(
        ':eventKey',
        String(events.eventNo),
    );

    const imageUrl =
        isMobile && events.mobileimageUrl
            ? events.mobileimageUrl
            : events.pcImageUrl || events.mobileimageUrl;

    const formatDate = (date: string) => {
        // dayjs로 2026-01-06 00:00:00 의 형식을 26.01.06으로 변환하기
        return dayjs(date).format('YY.MM.DD');
    };

    return (
        <section
            className={css({
                width: '100%',
            })}
            aria-label='기획전 아티클 섹션'
        >
            <Link
                key={events.id}
                href={eventDetailPath}
                aria-label={`${events.label} 아티클 바로가기`}
                className={css({
                    display: 'flex',
                    flexDirection: { base: 'column', md: 'row' },
                })}
                tabIndex={0}
            >
                <div
                    className={css({
                        flex: 1,
                        width: '100%',
                        aspectRatio: '1 / 1',
                        overflow: 'hidden',
                    })}
                >
                    <Image
                        src={`https:${imageUrl}`}
                        alt={`${events.label} 대표 이미지`}
                        width={750}
                        height={750}
                        className={css({
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        })}
                        sizes='(max-width: 767px) 100vw, 50vw'
                        priority
                    />
                </div>

                <div
                    className={css({
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: { base: '16px 20px', md: '8px 20px' },
                    })}
                >
                    <h2
                        className={css({
                            fontSize: {
                                base: '2.2rem',
                                md: '3rem',
                            },
                            fontWeight: { base: 'semibold', md: 'bold' },
                            lineHeight: '1.32',
                            color: 'black',
                        })}
                    >
                        {events.label}
                    </h2>
                    {events.promotionText && (
                        <p
                            className={text({
                                size: 'headline1',
                                color: 'gray90',
                                weight: 'regular',
                            })}
                        >
                            {events.promotionText}
                        </p>
                    )}
                    {!isMobile && (
                        <p
                            className={css({
                                marginTop: 'auto',
                                fontSize: '1.4rem',
                                fontWeight: 'regular',
                                color: 'gray60',
                            })}
                        >
                            by WannaMake / {formatDate(events.startYmdt)}
                        </p>
                    )}
                </div>
            </Link>
        </section>
    );
};

export default ArticleSectionItem;
