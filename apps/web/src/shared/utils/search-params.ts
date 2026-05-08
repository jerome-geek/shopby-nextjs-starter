import { createSerializer, parseAsString } from 'nuqs';

/**
 * 검색 쿼리 파라미터 직렬화 유틸리티
 * keyword, tab 파라미터를 안전하게 URL 쿼리 스트링으로 변환합니다.
 */
export const searchSerializer = createSerializer({
    keyword: parseAsString,
    tab: parseAsString,
});
