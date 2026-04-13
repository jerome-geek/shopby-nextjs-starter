const BOARD_DEFAULT_START_YMD = '2020-01-01';

const BOARD_PAGINATION = {
    DEFAULT: {
        DEFAULT_PAGE_NUMBER: '1',
        DEFAULT_PAGE_SIZE: '10',
    },
    NOTICE: {
        DEFAULT_PAGE_NUMBER: '1',
        DEFAULT_PAGE_SIZE: '10',
    },
    FAQ: {
        DEFAULT_PAGE_NUMBER: '1',
        DEFAULT_PAGE_SIZE: '10',
    },
    REPLY: {
        DEFAULT_PAGE_NUMBER: '1',
        DEFAULT_PAGE_SIZE: '5',
    },
};

const BOARD_REPLY_MAX_LENGTH = 1000;

const BOARD_GUEST_SECRET_PASSWORD_ERROR_CODE = 'B0003';

const BOARD_SORT = [
    { id: 'DESC', name: '최신순' },
    { id: 'ASC', name: '오래된순' },
    { id: 'RECOMMEND_COUNT', name: '추천순' },
    { id: 'READ_COUNT', name: '조회수순' },
] as const;

const BOARD_SEARCH_TYPE = [
    { label: '전체', value: 'ALL' },
    { label: '제목', value: 'TITLE' },
    { label: '내용', value: 'CONTENT' },
    { label: '작성자', value: 'WRITER' },
];

export {
    BOARD_DEFAULT_START_YMD,
    BOARD_GUEST_SECRET_PASSWORD_ERROR_CODE,
    BOARD_PAGINATION,
    BOARD_SORT,
    BOARD_SEARCH_TYPE,
    BOARD_REPLY_MAX_LENGTH,
};
