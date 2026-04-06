import { BoardAuthorityType } from '@/models';
import { BoardConfigs } from '@/models/manage/board';
import { GetProfileResponse } from '@/models/member/profile';

/**
 * 게시판 글쓰기 권한 확인
 * @param boardConfig 게시판 설정
 * @param profileData 회원 프로필 데이터 (nullable)
 * @returns 글쓰기 권한 여부
 */
export const checkBoardWritePermission = (
    boardConfig: BoardConfigs | null,
    profileData: GetProfileResponse | null | undefined,
): boolean => {
    if (!boardConfig) {
        return false;
    }

    const postWriteConfig = boardConfig.authorityConfig?.postWriteConfig;

    // 권한 설정이 없거나 사용하지 않는 경우
    if (!postWriteConfig || postWriteConfig.type === 'NOT_USED') {
        return false;
    }

    const isLoggedIn = !!profileData;
    const writeType: BoardAuthorityType = postWriteConfig.type;

    if (writeType === 'ADMIN') {
        return false;
    }

    // ALL: 전체 (회원/비회원 모두 가능)
    if (writeType === 'ALL') {
        if (isLoggedIn) {
            return boardConfig.memberPostingUsed === true;
        } else {
            return boardConfig.guestPostingUsed === true;
        }
    }

    // MEMBER_ONLY: 회원 전용
    if (writeType === 'MEMBER_ONLY') {
        return isLoggedIn && boardConfig.memberPostingUsed === true;
    }

    // SPECIFIC_MEMBERS: 특정 회원 전용
    if (writeType === 'SPECIFIC_MEMBERS') {
        if (!isLoggedIn || !profileData) {
            return false;
        }

        if (boardConfig.memberPostingUsed !== true) {
            return false;
        }

        const configuredGroupNos = postWriteConfig.groupNos || [];
        const configuredGradeNos = postWriteConfig.gradeNos || [];

        // 그룹 번호와 등급 번호가 모두 비어있는 경우 접근 불가
        if (
            configuredGroupNos.length === 0 &&
            configuredGradeNos.length === 0
        ) {
            return false;
        }

        // 그룹 번호 확인
        const userGroupNos =
            profileData.memberGroups?.map((group) => group.memberGroupNo) || [];
        const hasMatchingGroup =
            configuredGroupNos.length > 0 &&
            configuredGroupNos.some((groupNo) =>
                userGroupNos.includes(groupNo),
            );

        // 등급 번호 확인
        const userGradeNo = profileData.memberGradeNo;
        const hasMatchingGrade =
            configuredGradeNos.length > 0 &&
            userGradeNo != null &&
            configuredGradeNos.includes(userGradeNo);

        // 그룹 또는 등급 중 하나라도 일치하면 권한 있음
        return hasMatchingGroup || hasMatchingGrade;
    }

    return false;
};
