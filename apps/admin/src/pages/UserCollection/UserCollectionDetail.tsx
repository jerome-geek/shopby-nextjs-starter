import { Link, useParams } from 'react-router';
import dayjs from 'dayjs';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';
import { useCollectionDetail } from '@/hooks/suspenseQuery/collection';

import { ReactComponent as YoutubeIcon } from '@/icons/youtube.svg?react';
import { ReactComponent as InstagramIcon } from '@/icons/instagram.svg?react';
import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';
import { ReactComponent as ChevronRightSmallIcon } from '@/icons/chevron-right-small.svg?react';
import { ReactComponent as BookmarkIcon } from '@/icons/bookmark.svg?react';
import { ReactComponent as HeartIcon } from '@/icons/heart.svg?react';

const UserCollectionDetail = () => {
    const { sno } = useParams<{ sno: string }>();

    const { data: collection } = useCollectionDetail({
        sno: Number(sno) || 0,
    });

    const PlatformIcon = ({ sourceType }: { sourceType: string }) => {
        if (sourceType === 'YOUTUBE') {
            return <YoutubeIcon className='h-5 w-5' />;
        }
        if (sourceType === 'INSTAGRAM') {
            return <InstagramIcon className='h-5 w-5' />;
        }
        return null;
    };

    const heroImageUrl = collection.recipes[0]?.thumbnailUrl;
    const pageDescription = `레시피 ${collection.recipes.length}개 · 공유 코드 ${collection.shareCode}`;

    return (
        <>
            <PageMeta
                title={`${collection.title} | 사용자 컬렉션 상세`}
                description={pageDescription}
            />

            <div className='flex flex-1 flex-col gap-6 px-6 pb-10 pt-6'>
                <div className='flex flex-col gap-3'>
                    <Link
                        to={PATHS.APP.USER_COLLECTION.LIST}
                        className='inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#0a0a0a] transition-colors hover:text-[#ff6900]'
                    >
                        <ChevronLeftSmallIcon className='h-4 w-4' />
                        목록으로
                    </Link>
                    <h1 className='text-2xl font-bold tracking-tight text-[#101828]'>
                        사용자 컬렉션 상세
                    </h1>
                </div>

                <div className='overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                    <div className='relative aspect-[21/9] w-full overflow-hidden bg-[#f3f4f6]'>
                        {heroImageUrl ? (
                            <img
                                src={heroImageUrl}
                                alt={collection.title}
                                className='h-full w-full object-cover'
                            />
                        ) : (
                            <div className='h-full w-full bg-[#f3f4f6]' />
                        )}
                    </div>

                    <div className='flex flex-col gap-6 p-8'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center gap-2'>
                                <h2 className='text-[26px] font-bold text-[#101828]'>
                                    {collection.title}
                                </h2>
                            </div>
                            <div className='flex flex-wrap items-center gap-2 text-[14px] text-[#6a7282]'>
                                <span>
                                    사용자: {collection.memberName} (회원{' '}
                                    {collection.memberNo})
                                </span>
                                <span className='h-[3px] w-[3px] rounded-full bg-[#d1d5db]' />
                                <span>공유 코드: {collection.shareCode}</span>
                            </div>
                        </div>

                        <div className='flex flex-wrap items-center gap-5 border-y border-[#f3f4f6] py-4'>
                            <div className='flex items-center gap-1.5 text-[14px] font-medium text-[#6a7282]'>
                                <BookmarkIcon
                                    className='h-4 w-4 text-[#6a7282]'
                                    strokeWidth='1.5'
                                />
                                북마크{' '}
                                {collection.bookmarkCount.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <h3 className='px-2 text-[18px] font-bold text-[#101828]'>
                        포함된 레시피 ({collection.recipes.length})
                    </h3>

                    <div className='overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                        {collection.recipes.length === 0 ? (
                            <p className='px-6 py-14 text-center text-[15px] text-[#6a7282]'>
                                레시피가 없습니다
                            </p>
                        ) : (
                            collection.recipes.map((recipe, idx) => (
                                <Link
                                    key={recipe.sno}
                                    to={PATHS.APP.USER_RECIPE.DETAIL.replace(
                                        ':sno',
                                        recipe.sno.toString(),
                                    )}
                                    className={`relative flex items-center gap-6 p-6 transition-colors hover:bg-[#fafafa] ${
                                        idx !== collection.recipes.length - 1
                                            ? 'border-b border-[#f3f4f6]'
                                            : ''
                                    }`}
                                >
                                    <div className='flex h-[80px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] shadow-sm'>
                                        {recipe.thumbnailUrl ? (
                                            <img
                                                src={recipe.thumbnailUrl}
                                                alt={recipe.title}
                                                className='h-full w-full object-cover'
                                            />
                                        ) : (
                                            <div className='h-full w-full bg-[#f3f4f6]' />
                                        )}
                                    </div>

                                    <div className='flex min-w-0 flex-1 flex-col gap-1.5 pr-10'>
                                        <h4 className='truncate text-[16px] font-bold text-[#101828]'>
                                            {recipe.title}
                                        </h4>
                                        <p className='text-[13px] font-normal text-[#6a7282]'>
                                            {recipe.authorName}
                                        </p>
                                        <div className='mt-1 flex flex-wrap items-center gap-3'>
                                            <span className='text-[12px] text-[#6a7282]'>
                                                등록일:{' '}
                                                {recipe.regDt
                                                    ? dayjs(
                                                          recipe.regDt,
                                                      ).format('YYYY.MM.DD')
                                                    : '-'}
                                            </span>
                                            <div className='flex items-center gap-1.5 text-[12px] text-[#6a7282]'>
                                                <HeartIcon className='h-3.5 w-3.5 text-[#6a7282]' />
                                                {recipe.likeCount.toLocaleString()}
                                            </div>
                                            <div className='flex items-center gap-1.5 text-[12px] text-[#6a7282]'>
                                                <BookmarkIcon
                                                    className='h-3.5 w-3.5 text-[#6a7282]'
                                                    strokeWidth='1.5'
                                                />
                                                {recipe.bookmarkCount.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='absolute right-6 top-6 flex items-center gap-2'>
                                        <PlatformIcon
                                            sourceType={recipe.sourceType}
                                        />
                                        <ChevronRightSmallIcon
                                            className='h-4 w-4 shrink-0 text-[#99a1af]'
                                            strokeWidth={2}
                                        />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCollectionDetail;
