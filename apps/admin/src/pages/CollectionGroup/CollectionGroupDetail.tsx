import { Link, useParams } from 'react-router';

import PageMeta from '@/components/common/PageMeta';
import { DisplayVisibilityBadge } from '@/components/ui/badge/display-visibility';
import { PATHS } from '@/const/paths';
import { useCollectionExposureGroupDetail } from '@/hooks/suspenseQuery/collection';
import type { CollectionExposureGroupDetailResponse } from '@/model/collection';

import { ReactComponent as ChevronLeftSmallIcon } from '@/icons/chevron-left-small.svg?react';

const CollectionGroupDetail = () => {
    const { sno } = useParams<{ sno: string }>();

    const groupSno = Number(sno) || 0;

    const { data: collectionExposureGroupDetailData } =
        useCollectionExposureGroupDetail({
            groupSno,
        });

    const groupInfoItems = buildGroupInfoItems(
        collectionExposureGroupDetailData,
    );

    return (
        <>
            <PageMeta
                title={`${collectionExposureGroupDetailData.groupName} | 컬렉션 그룹 상세`}
                description={
                    collectionExposureGroupDetailData.description ||
                    collectionExposureGroupDetailData.groupName
                }
            />

            <div className='flex flex-1 flex-col gap-6 px-6 pt-6 pb-10'>
                <div className='flex flex-col gap-3'>
                    <Link
                        to={PATHS.APP.COLLECTION_GROUP.LIST}
                        className='inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#0a0a0a] transition-colors hover:text-[#ff6900]'
                    >
                        <ChevronLeftSmallIcon className='h-4 w-4' />
                        목록으로
                    </Link>
                    <h1 className='text-2xl font-bold tracking-tight text-[#101828]'>
                        컬렉션 그룹 상세
                    </h1>
                </div>

                <div className='rounded-2xl border border-[#e5e7eb] bg-white px-6 pt-6 pb-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
                    <div className='grid grid-cols-2 gap-x-6 gap-y-6'>
                        {groupInfoItems.map(({ key, fullWidth, node }) => (
                            <div
                                key={key}
                                className={fullWidth ? 'col-span-2' : undefined}
                            >
                                {node}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='rounded-2xl border border-[#e5e7eb] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
                    <div className='flex flex-col gap-4 px-6 pt-5 pb-5'>
                        <h2 className='text-sm font-semibold text-[#101828]'>
                            컬렉션 정보
                        </h2>

                        <div className='rounded-xl border border-[#ffd6a8] bg-[#fff7ed] px-4 pt-4 pb-4'>
                            <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
                                <div className='flex flex-col gap-1'>
                                    <span className={infoLabelClass}>
                                        컬렉션명
                                    </span>
                                    <span className='text-sm font-medium text-[#101828]'>
                                        {
                                            collectionExposureGroupDetailData
                                                .collection.title
                                        }
                                    </span>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <span className={infoLabelClass}>
                                        공유 코드
                                    </span>
                                    <span className='font-mono text-xs text-[#364153]'>
                                        {formatCollectionDisplayId(
                                            collectionExposureGroupDetailData.collection,
                                        )}
                                    </span>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <span className={infoLabelClass}>
                                        작성자
                                    </span>
                                    <span className='text-sm font-medium text-[#101828]'>
                                        {
                                            collectionExposureGroupDetailData
                                                .collection.memberName
                                        }
                                    </span>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <span className={infoLabelClass}>
                                        회원 번호
                                    </span>
                                    <span className='text-sm font-medium tabular-nums text-[#101828]'>
                                        {
                                            collectionExposureGroupDetailData
                                                .collection.memberNo
                                        }
                                    </span>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <span className={infoLabelClass}>
                                        포함 레시피 수
                                    </span>
                                    <span className='text-sm font-medium tabular-nums text-[#101828]'>
                                        {collectionExposureGroupDetailData.collection.recipeCount.toLocaleString()}
                                        개
                                    </span>
                                </div>
                            </div>

                            <div className='mt-4 border-t border-[#ffd6a8]/70 pt-4'>
                                <div className='flex flex-col gap-1'>
                                    <span className={infoLabelClass}>
                                        컬렉션 설명
                                    </span>
                                    <span className='text-sm font-normal text-[#364153]'>
                                        {collectionExposureGroupDetailData.collection.description?.trim()
                                            ? collectionExposureGroupDetailData
                                                  .collection.description
                                            : '—'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const infoLabelClass = 'text-xs font-normal text-[#6a7282]';

const buildGroupInfoItems = (detail: CollectionExposureGroupDetailResponse) => [
    {
        key: 'exposureLocation',
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>그룹 아이디</span>
                <span className='inline-block w-fit rounded-lg bg-[#f3f4f6] px-2.5 py-1 font-mono text-xs text-[#364153]'>
                    {detail.exposureLocation}
                </span>
            </div>
        ),
    },
    {
        key: 'sno',
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>그룹 번호</span>
                <span className='text-sm font-medium text-[#101828]'>
                    {detail.sno}
                </span>
            </div>
        ),
    },
    {
        key: 'groupName',
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>그룹명</span>
                <span className='text-sm font-medium text-[#101828]'>
                    {detail.groupName}
                </span>
            </div>
        ),
    },
    {
        key: 'sortOrder',
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>정렬 순서</span>
                <span className='text-sm font-medium tabular-nums text-[#101828]'>
                    {detail.sortOrder}
                </span>
            </div>
        ),
    },
    {
        key: 'description',
        fullWidth: true,
        node: (
            <div className='flex flex-col gap-1.5'>
                <span className={infoLabelClass}>설명</span>
                <span className='text-sm font-normal text-[#364153]'>
                    {detail.description?.trim() ? detail.description : '—'}
                </span>
            </div>
        ),
    },
    {
        key: 'displayAndCreated',
        fullWidth: true,
        node: (
            <div className='flex items-start gap-6'>
                <div className='flex flex-col gap-1.5'>
                    <span className={infoLabelClass}>노출 상태</span>
                    <DisplayVisibilityBadge isVisible={detail.isDisplay} />
                </div>
                <div className='flex flex-col gap-1.5'>
                    <span className={infoLabelClass}>생성일</span>
                    <span className='text-sm font-normal text-[#364153]'>
                        —
                    </span>
                </div>
            </div>
        ),
    },
];

const formatCollectionDisplayId = (
    collection: CollectionExposureGroupDetailResponse['collection'],
) => {
    const code = collection.shareCode?.trim();

    if (code) {
        return code;
    }

    return String(collection.collectionSno);
};

export default CollectionGroupDetail;
