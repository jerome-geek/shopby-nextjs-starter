import { Link, useParams } from 'react-router';
import dayjs from 'dayjs';

import PageMeta from '@/components/common/PageMeta';
import { PATHS } from '@/const/paths';
import { useRecipeDetail } from '@/hooks/suspenseQuery/recipe';

import { ReactComponent as YoutubeIcon } from '@/icons/youtube.svg?react';
import { ReactComponent as InstagramIcon } from '@/icons/instagram.svg?react';
import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';
import { ReactComponent as ChevronRightSmallIcon } from '@/icons/chevron-right-small.svg?react';
import { ReactComponent as HeartIcon } from '@/icons/heart.svg?react';
import { ReactComponent as BookmarkIcon } from '@/icons/bookmark.svg?react';
import { ReactComponent as TimeIcon } from '@/icons/time-simple.svg?react';
import { ReactComponent as UsersIcon } from '@/icons/users.svg?react';

const UserRecipeDetail = () => {
    const { sno } = useParams<{ sno: string }>();

    const { data: recipeDetailData } = useRecipeDetail({
        sno: Number(sno) || 0,
    });

    const formatDuration = (seconds: number) => {
        if (!Number.isFinite(seconds) || seconds <= 0) {
            return '-';
        }

        const mins = Math.floor(seconds / 60);

        if (mins <= 0) {
            return `${seconds}초`;
        }
        return `${mins}분`;
    };

    const PlatformIcon = ({ sourceType }: { sourceType: string }) => {
        if (sourceType === 'YOUTUBE') {
            return <YoutubeIcon className='w-5 h-5' />;
        }
        if (sourceType === 'INSTAGRAM') {
            return <InstagramIcon className='w-5 h-5' />;
        }
        return null;
    };

    const title = recipeDetailData.title;
    const description = recipeDetailData.description;
    const imageUrl = recipeDetailData.thumbnailUrl;
    const userName = recipeDetailData.memberName;
    const userId = recipeDetailData.memberId;
    const author = recipeDetailData.authorName;
    const createdAt = recipeDetailData.regDt
        ? dayjs(recipeDetailData.regDt).format('YYYY.MM.DD')
        : '-';
    const likes = recipeDetailData.likeCount ?? 0;
    const bookmarks = recipeDetailData.bookmarkCount ?? 0;
    const time = formatDuration(recipeDetailData.durationSeconds);
    const servings = recipeDetailData.servings
        ? `${recipeDetailData.servings}인분`
        : '-';

    return (
        <>
            <PageMeta
                title={`${title} | 사용자 레시피 상세`}
                description={description}
            />

            <div className='flex-1 flex flex-col gap-6 px-6 pt-6 pb-10'>
                <div className='flex flex-col gap-3'>
                    <Link
                        to={PATHS.APP.USER_RECIPE.LIST}
                        className='inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#0a0a0a] transition-colors hover:text-[#ff6900]'
                    >
                        <ChevronLeftSmallIcon className='h-4 w-4' />
                        목록으로
                    </Link>
                    <h1 className='text-2xl font-bold tracking-tight text-[#101828]'>
                        사용자 레시피 상세
                    </h1>
                </div>

                {/* 메인 레시피 카드 */}
                <div className='bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                    {/* 히어로 이미지 */}
                    <div className='w-full aspect-[21/9] bg-[#f3f4f6] relative overflow-hidden'>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={title}
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <div className='h-full w-full bg-[#f3f4f6]' />
                        )}
                    </div>

                    {/* 상세 정보 */}
                    <div className='p-8 flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-[26px] font-bold text-[#101828]'>
                                    {title}
                                </h1>
                                <PlatformIcon
                                    sourceType={recipeDetailData.sourceType}
                                />
                            </div>
                            <div className='flex items-center gap-2 text-[14px] text-[#6a7282]'>
                                <span>
                                    사용자: {userName} ({userId})
                                </span>
                                <span className='w-[3px] h-[3px] rounded-full bg-[#d1d5db]' />
                                <span>작성자: {author}</span>
                                <span className='w-[3px] h-[3px] rounded-full bg-[#d1d5db]' />
                                <span>등록일: {createdAt}</span>
                            </div>
                        </div>

                        <p className='text-[16px] text-[#364153] leading-relaxed'>
                            {description}
                        </p>

                        <div className='flex items-center gap-5 py-4 border-y border-[#f3f4f6]'>
                            <div className='flex items-center gap-1.5 text-[14px] text-[#6a7282] font-medium'>
                                <BookmarkIcon
                                    className='w-4 h-4 text-[#6a7282]'
                                    strokeWidth='1.5'
                                />
                                북마크 {bookmarks.toLocaleString()}
                            </div>
                            <div className='flex items-center gap-1.5 text-[14px] text-[#6a7282] font-medium'>
                                <HeartIcon
                                    className='w-4 h-4 text-[#6a7282]'
                                    strokeWidth='1.5'
                                />
                                좋아요 {likes.toLocaleString()}
                            </div>
                            <div className='flex items-center gap-1.5 text-[14px] text-[#6a7282] font-medium'>
                                <TimeIcon className='w-4 h-4 text-[#6a7282]' />
                                {time}
                            </div>
                            <div className='flex items-center gap-1.5 text-[14px] text-[#6a7282] font-medium'>
                                <UsersIcon className='w-4 h-4 text-[#6a7282]' />
                                {servings}
                            </div>
                        </div>

                        {recipeDetailData.sourceUrl ? (
                            <a
                                href={recipeDetailData.sourceUrl}
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center gap-1.5 text-[14px] font-bold text-[#ff6900] hover:underline w-fit'
                            >
                                원본 레시피 보기
                                <ChevronRightSmallIcon
                                    className='w-3.5 h-3.5'
                                    strokeWidth={2}
                                />
                            </a>
                        ) : null}
                    </div>
                </div>

                {/* 그리드: 재료 + 조리 순서 */}
                <div className='grid grid-cols-1 gap-6'>
                    {/* 재료 카드 */}
                    <div className='bg-white border border-[#e5e7eb] rounded-2xl p-8 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                        <h3 className='text-[18px] font-bold text-[#101828] mb-6'>
                            재료
                        </h3>
                        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            {recipeDetailData.ingredients.map((item) => (
                                <li
                                    key={item.sno}
                                    className='flex flex-col gap-2'
                                >
                                    <div className='flex items-center gap-2 text-[15px] text-[#364153]'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-[#ff6900]' />
                                        {item.amount
                                            ? `${item.name} (${item.amount})`
                                            : item.name}
                                    </div>

                                    {item.coupangProduct?.url ? (
                                        <a
                                            href={item.coupangProduct.url}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='group flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white p-1 transition-colors hover:bg-[#fafafa]'
                                        >
                                            {item.coupangProduct.imageUrl ? (
                                                <img
                                                    src={
                                                        item.coupangProduct
                                                            .imageUrl
                                                    }
                                                    alt={
                                                        item.coupangProduct.name
                                                    }
                                                    className='h-10 w-10 shrink-0 rounded-lg object-cover'
                                                />
                                            ) : (
                                                <div className='h-10 w-10 shrink-0 rounded-lg bg-[#f3f4f6]' />
                                            )}
                                            <div className='min-w-0 flex-1'>
                                                <p className='truncate text-[13px] font-semibold text-[#101828] group-hover:underline'>
                                                    {item.coupangProduct.name}
                                                </p>
                                                <div className='mt-1 flex flex-wrap items-center gap-2 text-[12px] text-[#6a7282]'>
                                                    <span className='font-medium text-[#364153]'>
                                                        {item.coupangProduct.price.toLocaleString()}
                                                        원
                                                    </span>
                                                    {item.coupangProduct
                                                        .isRocket ? (
                                                        <span className='rounded-md bg-brand-50 px-2 py-0.5 text-brand-600'>
                                                            로켓
                                                        </span>
                                                    ) : null}
                                                    {item.coupangProduct
                                                        .isFreeShipping ? (
                                                        <span className='rounded-md bg-[#f3f4f6] px-2 py-0.5 text-[#364153]'>
                                                            무료배송
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <ChevronRightSmallIcon className='h-4 w-4 shrink-0 text-[#99a1af]' />
                                        </a>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 조리 순서 카드 */}
                    <div className='bg-white border border-[#e5e7eb] rounded-2xl p-8 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]'>
                        <h3 className='text-[18px] font-bold text-[#101828] mb-6'>
                            조리 순서
                        </h3>
                        <div className='flex flex-col gap-6'>
                            {recipeDetailData.steps.map((step) => (
                                <div key={step.sno} className='flex gap-4'>
                                    <span className='shrink-0 w-6 h-6 rounded-md bg-[#fff7ed] text-[#ff6900] text-[13px] font-bold flex items-center justify-center'>
                                        {step.stepNumber}
                                    </span>
                                    <p className='text-[15px] text-[#364153] leading-relaxed'>
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserRecipeDetail;
