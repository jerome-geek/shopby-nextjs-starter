import {
    ACCUMULATION_RESERVE_REASON_MAP,
    CASH_RECEIPT_ISSUE_PURPOSE_TYPE_MAP,
    CASH_RECEIPT_ISSUE_TYPE_MAP,
    CLAIM_REASON_MAP,
    CLAIM_STATUS_MAP,
    CLAIM_TYPE_MAP,
    NEXT_ACTION_MAP,
    ORDER_REQUEST_MAP,
    ORDER_STATUS_MAP,
    PREVIOUS_ORDER_STATUS_MAP,
    PRODUCT_INQUIRY_MAP,
    PRODUCT_REVIEW_REPORT_MAP,
    SHOPBY_JOIN_AGREEMENT_TYPE_MAP,
    SHOPBY_TERM_HISTORY_MAP,
    SHOPBY_TERMS_TYPE_MAP,
} from '@/const/label';
import { orderTerms } from '@/const/terms';

type KcpCode =
    | '02' // 산업은행
    | '03' // 기업은행
    | '04' // 국민은행
    | '05' // 외환은행
    | '07' // 수협
    | '08' // 수출입은행
    | '11' // NH농협은행
    | '12' // 지역농축협
    | '20' // 우리은행
    | '23' // SC제일은행
    | '27' // 한국씨티은행
    | '31' // 대구은행
    | '32' // 부산은행
    | '34' // 광주은행
    | '35' // 제주은행
    | '37' // 전북은행
    | '39' // 경남은행
    | '45' // 새마을금고
    | '48' // 신협
    | '54' // HSBC은행
    | '64' // 산림조합중앙회
    | '71' // 우체국
    | '81' // KEB하나은행
    | '26' // 신한은행
    | '89' // 케이뱅크
    | '90' // 카카오뱅크
    | '92' // 토스뱅크
    | '209' // 유안타증권
    | '218' // KB증권
    | '238' // 미래에셋증권
    | '238' // 미래에셋대우증권
    | '240' // 삼성증권
    | '243' // 한국투자증권
    | '247' // NH투자증권
    | '261' // 교보증권
    | '262' // 하이투자증권
    | '263' // HMC투자증권
    | '264' // 키움증권
    | '265' // 이베스트투자증권
    | '266' // SK증권
    | '267' // 대신증권
    | '268' // 솔로몬증권
    | '269' // 한화투자증권
    | '270' // 하나금융투자
    | '278' // 신한금융투자
    | '279' // DB금융투자
    | '280' // 유진투자증권
    | '287' // 메리츠종합금융증권
    | '290' // 부국증권
    | '291' // 신영증권
    | '292'; // 케이프투자증권

type BankTypeCode =
    | '000' // 미확인은행
    | '002' // 산업은행
    | '003' // 기업은행
    | '004' // 국민은행
    | '005' // 외환은행
    | '007' // 수협
    | '008' // 수출입은행
    | '011' // NH농협은행
    | '012' // 지역농축협
    | '020' // 우리은행
    | '023' // SC제일은행
    | '027' // 한국씨티은행
    | '031' // 대구은행
    | '032' // 부산은행
    | '034' // 광주은행
    | '035' // 제주은행
    | '037' // 전북은행
    | '039' // 경남은행
    | '045' // 새마을금고
    | '048' // 신협
    | '050' // 상호저축은행
    | '054' // HSBC은행
    | '055' // 도이치은행
    | '064' // 산림조합중앙회
    | '071' // 우체국
    | '081' // KEB하나은행
    | '088' // 신한은행
    | '089' // 케이뱅크
    | '090' // 카카오뱅크
    | '092' // 토스뱅크
    | '209' // 유안타증권
    | '218' // KB증권
    | '230' // 미래에셋증권
    | '238' // 미래에셋대우증권
    | '240' // 삼성증권
    | '243' // 한국투자증권
    | '247' // NH투자증권
    | '261' // 교보증권
    | '262' // 하이투자증권
    | '263' // HMC투자증권
    | '264' // 키움증권
    | '265' // 이베스트투자증권
    | '266' // SK증권
    | '267' // 대신증권
    | '268' // 솔로몬증권
    | '269' // 한화투자증권
    | '270' // 하나금융투자
    | '278' // 신한금융투자
    | '279' // DB금융투자
    | '280' // 유진투자증권
    | '287' // 메리츠종합금융증권
    | '290' // 부국증권
    | '291' // 신영증권
    | '292' // 케이프투자증권
    | '901' // 미즈호은행
    | '905' // UFJ은행
    | '909' // 미쓰이스미토모은행
    | '910'; // 리소나은행

type BankTypeName =
    | '미확인은행'
    | '산업은행'
    | '기업은행'
    | '국민은행'
    | '외환은행'
    | '수협'
    | '수출입은행'
    | 'NH농협은행'
    | '지역농축협'
    | '우리은행'
    | 'SC제일은행'
    | '한국씨티은행'
    | '대구은행'
    | '부산은행'
    | '광주은행'
    | '제주은행'
    | '전북은행'
    | '경남은행'
    | '새마을금고'
    | '신협'
    | '상호저축은행'
    | 'HSBC은행'
    | '도이치은행'
    | '산림조합중앙회'
    | '우체국'
    | 'KEB하나은행'
    | '신한은행'
    | '케이뱅크'
    | '카카오뱅크'
    | '토스뱅크'
    | '유안타증권'
    | 'KB증권'
    | '미래에셋증권'
    | '미래에셋대우증권'
    | '삼성증권'
    | '한국투자증권'
    | 'NH투자증권'
    | '교보증권'
    | '하이투자증권'
    | 'HMC투자증권'
    | '키움증권'
    | '이베스트투자증권'
    | 'SK증권'
    | '대신증권'
    | '솔로몬증권'
    | '한화투자증권'
    | '하나금융투자'
    | '신한금융투자'
    | 'DB금융투자'
    | '유진투자증권'
    | '메리츠종합금융증권'
    | '부국증권'
    | '신영증권'
    | '케이프투자증권'
    | '미즈호은행'
    | 'UFJ은행'
    | '미쓰이스미토모은행'
    | '리소나은행';

type BankTypeValue =
    | 'ANONYMOUS' // 미확인은행
    | 'KDB' // 산업은행
    | 'IBK' // 기업은행
    | 'KB' // 국민은행
    | 'KEB' // 외환은행
    | 'SUHYUP' // 수협
    | 'KEXIM' // 수출입은행
    | 'NH' // NH농협은행
    | 'NHLOCAL' // 지역농축협
    | 'WOORI' // 우리은행
    | 'SC' // SC제일은행
    | 'CITY' // 한국씨티은행
    | 'DAEGU' // 대구은행
    | 'PUSAN' // 부산은행
    | 'GWANGJU' // 광주은행
    | 'JEJU' // 제주은행
    | 'JEONBUK' // 전북은행
    | 'GYEONGNAM' // 경남은행
    | 'KFCC' // 새마을금고
    | 'CU' // 신협
    | 'SANGHO' // 상호저축은행
    | 'HSBC' // HSBC은행
    | 'DEUTSCHE' // 도이치은행
    | 'NFCF' // 산림조합중앙회
    | 'EPOST' // 우체국
    | 'KEBHANA' // KEB하나은행
    | 'SHINHAN' // 신한은행
    | 'KBANK' // 케이뱅크
    | 'KAKAO' // 카카오뱅크
    | 'TOSS' // 토스뱅크
    | 'YUANTA' // 유안타증권
    | 'KBSEC' // KB증권
    | 'MIRAE' // 미래에셋증권
    | 'MIRAEDAEWOO' // 미래에셋대우증권
    | 'SAMSUNG' // 삼성증권
    | 'HANKOOK' // 한국투자증권
    | 'NH_INVEST' // NH투자증권
    | 'KYOBO' // 교보증권
    | 'HI_INVEST' // 하이투자증권
    | 'HMC_INVEST' // HMC투자증권
    | 'KIWOOM' // 키움증권
    | 'EBEST' // 이베스트투자증권
    | 'SK' // SK증권
    | 'DAISHIN' // 대신증권
    | 'SOLOMON_INVEST' // 솔로몬증권
    | 'HANHWA' // 한화투자증권
    | 'HANA_INVEST' // 하나금융투자
    | 'SHINHAN_INVEST' // 신한금융투자
    | 'DONGBU' // DB금융투자
    | 'EUGENE_INVEST' // 유진투자증권
    | 'MERITZ_COMPREHENSIVE' // 메리츠종합금융증권
    | 'BOOKOOK' // 부국증권
    | 'SHINYOUNG' // 신영증권
    | 'CAPE' // 케이프투자증권
    | 'MIZUHO' // 미즈호은행
    | 'UFJ' // UFJ은행
    | 'SMBC' // 미쓰이스미토모은행
    | 'RESONA'; // 리소나은행

/** LOCAL: 일반몰, INTEGRATED_GLOBAL: 통합형 글로벌 몰, SEPARATED_GLOBAL_MAIN: 분리형 글로벌 메인, SEPARATED_GLOBAL_SUB: 분리형 글로벌 서브 */
type GlobalMallType =
    | 'LOCAL'
    | 'INTEGRATED_GLOBAL'
    | 'SEPARATED_GLOBAL_MAIN'
    | 'SEPARATED_GLOBAL_SUB';

/**  */
type GlobalMallLanguage = 'KO' | 'ZH' | 'JA' | 'EN';

type GlobalMallCurrencyTo = 'KRW' | 'USD' | 'JPY' | 'CNY';

/** 쇼핑몰 회원 인증 수단 */
type AuthenticationType =
    | 'AUTHENTICATION_BY_PHONE' // 휴대폰 본인 인증
    | 'SMS_AUTHENTICATION' // SMS 비점유 인증
    | 'SMS_OCCUPANCY_AUTHENTICATION' // SMS 점유 인증
    | 'AUTHENTICATION_BY_EMAIL' // EMAIL 인증
    | 'NOT_USED'; // 인증 없음

/** 쇼핑몰 회원 인증 시점 */
type AuthenticationTimeType =
    | 'JOIN_TIME' // 회원가입 시 인증
    | 'PAYMENT_TIME' // 최초 상품 구매 시 인증
    // TODO 현재 스키마에는 없는데 지워야 하는지 확인
    | 'AFTER_JOIN_TIME' // 가입 완료 후 바로 인증
    | 'NONE'; // 인증하지 않음

/** 클라이언트 플랫폼 (PC, MOBILE_WEB, AOS, IOS) */
type ClientPlatformType = 'PC' | 'MOBILE_WEB' | 'AOS' | 'IOS';

/** 디자인 팝업 종류 */
type PopupDesignType = 'NORMAL' | 'MULTI';

/** 팝업타입 ([ WINDOW: Window Popup, LAYER: Layer Popup, MOVE: Move Layer Popup) */
type PopupType = 'WINDOW' | 'LAYER' | 'MOVE';

/** 팝업 페이지 타입 리스트 (MAIN: 메인페이지, CATEGORY: 전시카테고리, EVENT: 기획전, PRODUCT: 상품)  */
type PopupPageType = 'MAIN' | 'CATEGORY' | 'EVENT' | 'PRODUCT';

/** 팝업 노출 위치 */
type PopupPositionType =
    | 'MIDDLE'
    | 'LEFT'
    | 'RIGHT'
    | 'MIDDLE_TOP'
    | 'LEFT_TOP'
    | 'RIGHT_TOP'
    | 'MIDDLE_BOTTOM'
    | 'LEFT_BOTTOM'
    | 'RIGHT_BOTTOM';

/** 공통 - 팝업 창 종류 (FIXED: Fixed Layer Window, FIXED_TOP: Fixed Top Layer Pane, LAYER: Move Layer Window, WINDOW: Window Popup Window) */
type PopupScreenType = 'FIXED' | 'FIXED_TOP' | 'LAYER' | 'WINDOW';

/** 작성 플랫폼 타입 (PC: PC, MOBILE_WEB: 모바일 웹, MOBILE_APP: 모바일 앱, RESPONSIVE: 반응형) */
type PlatformType = 'PC' | 'MOBILE_WEB' | 'MOBILE_APP' | 'RESPONSIVE';

/** (01:male, 02: female) */
type SexCode = '01' | '02';

/** (01: local, 02:foreigner) */
type LocalCode = '01' | '02';

/** (페이코:PAYCO, 네이버:NAVER, 카카오:KAKAO, 페이스북:FACEBOOK, 아이엠스쿨:IAMSCHOOL,리브메이트:LIIVMATE, 엔에이치엔엔터:NHNENT, 유니원:UNIONE, 라인:LINE, 엔씨피스토어:NCPSTORE, 카카오싱크:KAKAO_SYNC) */
type ProviderType =
    | 'PAYCO'
    | 'NAVER'
    | 'KAKAO'
    | 'FACEBOOK'
    | 'IAMSCHOOL'
    | 'LIIVMATE'
    | 'NHNENT'
    | 'UNIONE'
    | 'LINE'
    | 'APPLE'
    | 'GOOGLE'
    | 'NCPSTORE'
    | 'KAKAO_SYNC';

type OpenIdProviderType =
    | 'PAYCO'
    | 'NAVER'
    | 'KAKAO'
    | 'KAKAO_SYNC'
    | 'FACEBOOK'
    | 'LINE'
    | 'APPLE'
    | 'GOOGLE';

/** 국가코드(248) */
type CountryCdType =
    | 'AX' // 올랜드 제도
    | 'AD' // 안도라
    | 'AU' // 호주
    | 'AT' // 오스트리아
    | 'BH' // 바레인
    | 'BE' // 벨기에
    | 'BZ' // 벨리즈
    | 'BR' // 브라질
    | 'BN' // 브루나이
    | 'BG' // 불가리아
    | 'CA' // 캐나다
    | 'ES_CANARY' // 스페인(에스파냐)
    | 'CL' // 칠레
    | 'CN' // 중국
    | 'CO' // 콜롬비아
    | 'CR' // 코스타리카
    | 'CY' // 키프로스
    | 'CZ' // 체코
    | 'DK' // 덴마크
    | 'EC' // 에콰도르
    | 'EG' // 이집트
    | 'SV' // 엘살바도르
    | 'EE' // 에스토니아
    | 'FR' // 프랑스
    | 'GF' // 프랑스령 기아나
    | 'DE' // 독일
    | 'GR' // 그리스
    | 'GL' // 덴마크
    | 'GU' // 괌
    | 'GT' // 과테말라
    | 'GG' // 건지
    | 'GY' // 가이아나
    | 'HK' // 홍콩
    | 'HU' // 헝가리
    | 'IS' // 아이슬란드
    | 'ID' // 인도네시아
    | 'IE' // 아일랜드
    | 'IL' // 이스라엘
    | 'IT' // 이탈리아
    | 'JP' // 일본
    | 'JE' // 저지
    | 'JO' // 요르단
    | 'KR' // 대한민국
    | 'KW' // 쿠웨이트
    | 'LV' // 라트비아
    | 'LB' // 레바논
    | 'LI' // 리히텐슈타인
    | 'LT' // 리투아니아
    | 'LU' // 룩셈부르크
    | 'MO' // 마카오
    | 'PT_MADEIRA' // 포르투갈
    | 'MY' // 말레이시아
    | 'NL' // 네덜란드
    | 'NZ' // 뉴질랜드
    | 'GB_NORTHERN_ISLAND' // 영국
    | 'NO' // 노르웨이
    | 'PY' // 파라과이
    | 'PE' // 페루
    | 'PL' // 폴란드
    | 'PT' // 포르투갈
    | 'RO' // 루마니아
    | 'RU' // 러시아
    | 'SM' // 산마리노
    | 'SA' // 사우디아라비아
    | 'GB_SCOTLAND' // 영국
    | 'SG' // 싱가폴
    | 'SK' // 슬로바키아
    | 'SI' // 슬로베니아
    | 'ES' // 스페인(에스파냐)
    | 'CH' // 스위스
    | 'TW' // 대만
    | 'TH' // 태국
    | 'TR' // 터키
    | 'AE' // 아랍에미리트
    | 'GB' // 영국
    | 'US' // 미국(대륙)
    | 'U2' // 미국(대륙)
    | 'UY' // 우루과이
    | 'VN' // 베트남
    | 'GB_WALES' // 영국
    | 'YE' // 예멘
    | 'HR' // 크로아티아
    | 'MT' // 몰타
    | 'FI' // 핀란드
    | 'SE' // 스웨덴
    | 'AF' // 아프가니스탄
    | 'AL' // 알바니아
    | 'DZ' // 알제리
    | 'AS' // 아메리칸 사모아
    | 'AO' // 앙골라
    | 'AI' // 앵귈라
    | 'AQ' // 남극대륙
    | 'AG' // 앤티가 바부다
    | 'AR' // 아르헨티나
    | 'AM' // 아르메니아
    | 'AW' // 아루바
    | 'AZ' // 아제르바이잔
    | 'BS' // 바하마
    | 'BD' // 방글라데시
    | 'BB' // 바베이도스
    | 'BY' // 벨라루스
    | 'BJ' // 베냉
    | 'BM' // 버뮤다
    | 'BT' // 부탄
    | 'BO' // 볼리비아
    | 'BA' // 보스니아 헤르체고비나
    | 'BW' // 보츠와나
    | 'IO' // 영국령 인도양 지역
    | 'VG' // 영국령 버진 아일랜드
    | 'BF' // 부르키나파소
    | 'BI' // 부룬디
    | 'KH' // 캄보디아
    | 'CM' // 카메룬
    | 'CV' // 카보베르데
    | 'KY' // 케이맨 제도
    | 'CF' // 중앙 아프리카 공화국
    | 'TD' // 차드
    | 'CX' // 크리스마스 섬
    | 'CC' // 코코스 제도
    | 'KM' // 코모로
    | 'CK' // 쿡 제도
    | 'CU' // 쿠바
    | 'CW' // 퀴라소
    | 'CD' // 콩고 민주 공화국
    | 'DJ' // 지부티
    | 'DM' // 도미니카
    | 'DO' // 도미니카 공화국
    | 'TL' // 동티모르
    | 'GQ' // 적도 기니
    | 'ER' // 에리트레아
    | 'ET' // 에티오피아
    | 'FK' // 포클랜드 제도
    | 'FO' // 페로 제도
    | 'FJ' // 피지
    | 'PF' // 프랑스령 폴리네시아
    | 'GA' // 가봉
    | 'GM' // 감비아
    | 'GE' // 그루지야
    | 'GH' // 가나
    | 'GI' // 지브롤터
    | 'GD' // 그레나다
    | 'GN' // 기니
    | 'GW' // 기니비사우
    | 'HT' // 아이티
    | 'HN' // 온두라스
    | 'IN' // 인도
    | 'IR' // 이란
    | 'IQ' // 이라크
    | 'IM' // 맨 섬
    | 'CI' // 상아 해안
    | 'JM' // 자메이카
    | 'KZ' // 카자흐스탄
    | 'KE' // 케냐
    | 'KI' // 키리바시
    | 'XK' // 코소보
    | 'KG' // 키르기스스탄
    | 'LA' // 라오스
    | 'LS' // 레소토
    | 'LR' // 라이베리아
    | 'LY' // 리비아
    | 'MK' // 마케도니아
    | 'MG' // 마다가스카르
    | 'MW' // 말라위
    | 'MV' // 몰디브
    | 'ML' // 말리
    | 'MH' // 마셜 제도
    | 'MR' // 모리타니
    | 'MU' // 모리셔스
    | 'YT' // 마요트
    | 'MX' // 멕시코
    | 'FM' // 미크로네시아
    | 'MD' // 몰도바
    | 'MC' // 모나코
    | 'MN' // 몽골리아
    | 'ME' // 몬테네그로
    | 'MS' // 몬세라트
    | 'MA' // 모로코 가죽
    | 'MZ' // 모잠비크
    | 'MM' // 미얀마
    | 'NA' // 나미비아
    | 'NR' // 나우루
    | 'NP' // 네팔
    | 'AN' // 네덜란드령 안틸레스
    | 'NC' // 뉴 칼레도니아
    | 'NI' // 니카라과
    | 'NE' // 니제르
    | 'NG' // 나이지리아
    | 'NU' // 니우에
    | 'KP' // 북한
    | 'MP' // 북마리아나 제도
    | 'OM' // 오만
    | 'PK' // 파키스탄
    | 'PW' // 팔라우
    | 'PS' // 팔레스타인
    | 'PA' // 파나마
    | 'PG' // 파푸아뉴기니
    | 'PH' // 필리핀 제도
    | 'PN' // 피트케언
    | 'PR' // 푸에르토리코
    | 'QA' // 카타르
    | 'CG' // 콩고 공화국
    | 'RE' // 레위니옹
    | 'RW' // 르완다
    | 'BL' // 생바르텔레미
    | 'SH' // 세인트 헬레나
    | 'KN' // 세인트키츠네비스
    | 'LC' // 세인트 루시아
    | 'MF' // 생 마르탱
    | 'PM' // 생피에르 미클롱
    | 'VC' // 세인트 빈센트 그레나딘
    | 'WS' // 사모아
    | 'ST' // 상투메 프린시페
    | 'SN' // 세네갈
    | 'RS' // 세르비아
    | 'SC' // 세이셸
    | 'SL' // 시에라리온
    | 'SX' // 신트마르틴
    | 'SB' // 솔로몬 제도
    | 'SO' // 소말리아
    | 'ZA' // 남아프리카 공화국
    | 'SS' // 남수단
    | 'LK' // 스리랑카
    | 'SD' // 수단
    | 'SR' // 수리남
    | 'SJ' // 스발바르 얀마옌 제도
    | 'SZ' // 스와질랜드
    | 'SY' // 시리아
    | 'TJ' // 타지키스탄
    | 'TZ' // 탄자니아
    | 'TG' // 토고
    | 'TK' // 토켈라우
    | 'TO' // 통가
    | 'TT' // 트리니다드 토바고
    | 'TN' // 튀니지
    | 'TM' // 투르크메니스탄
    | 'TC' // 터크스 케이커스 제도
    | 'TV' // 투발루
    | 'VI' // 미국령 버진 아일랜드
    | 'UG' // 우간다
    | 'UA' // 우크라이나
    | 'UZ' // 우즈베키스탄
    | 'VU' // 바누아투
    | 'VA' // 바티칸 궁전
    | 'VE' // 베네수엘라
    | 'WF' // 월리스 푸투나
    | 'EH' // 서사하라
    | 'ZM' // 잠비아
    | 'ZW'; // 짐바브웨

/** 최신 순 정렬 여부 (ASC: 최신 순, DESC: 오래된 순) */
type OrderDirectionType = 'ASC' | 'DESC';

/** 정렬 방법  */
type OrderByType =
    | 'POPULAR' // 판매인기순
    | 'SALE_YMD' // 판매일자
    | 'SALE_END_YMD' // 판매종료일자
    | 'DISCOUNTED_PRICE' // 가격순
    | 'REVIEW' // 상품평
    | 'SALE_CNT' // 총판매량순
    | 'RECENT_PRODUCT' // 최근상품순
    | 'MD_RECOMMEND' // MD추천순
    | 'LIKE_CNT' //  좋아요
    | 'EXPIRATION_DATE'; //  유효일자

type ReviewOrderByType =
    | 'RECOMMEND'
    | 'REGISTER_YMDT'
    | 'RATING'
    | 'BEST_REVIEW';

type EventProductOrder =
    | 'SALE'
    | 'ADMIN_SETTING'
    | 'BEST_SELLER'
    | 'BEST_REVIEW'
    | 'PRICE';

type CertificationUsage =
    | 'FIND_ID' // 아이디 찾기
    | 'FIND_PASSWORD' // 비밀번호 찾기
    | 'RELEASE_DORMANT' // 휴면 해제
    | 'JOIN' // 가입인증
    | 'CHANGE_ID' // 아이디 변경
    | 'CHANGE_EMAIL' // 이메일 변경
    | 'CHANGE_MOBILE_NO' // 휴대폰번호 변경
    | 'JOIN_URI'; // 가입 인증

type ProductReviewReportType = keyof typeof PRODUCT_REVIEW_REPORT_MAP;

type ProductReviewReportLabelType =
    (typeof PRODUCT_REVIEW_REPORT_MAP)[keyof typeof PRODUCT_REVIEW_REPORT_MAP];

/** 게시판 등록자 타입 */
type ArticleRegisterType = 'ADMIN' | 'MEMBER' | 'GUEST';

/** 브라우저 타겟 (CURRENT: 현재창, NEW: 새창, REF_URL: 새창) */
type BrowserTargetType = 'CURRENT' | 'NEW' | 'REF_URL';

/** 브랜드명 노출타입 (NAME_KO: Korean, NAME_EN: English, NONE: none) */
type BrandNameType = 'NAME_KO' | 'NAME_EN' | 'NONE';

/** 옵션형태 (PRODUCT_ONLY: 옵션없음, NORMAL_OPTION: 일반옵션, ADDITIONAL_PRODUCT: 추가옵션) */
type OptionType = 'PRODUCT_ONLY' | 'NORMAL_OPTION' | 'ADDITIONAL_PRODUCT';

/** 주문 상태 */
type OrderStatusType = keyof typeof ORDER_STATUS_MAP;

/** 주문 상태 */
type OrderRequestStatusType = keyof typeof ORDER_REQUEST_MAP;

/** 이전 주문 상태 */
type PreviousOrderStatusType = keyof typeof PREVIOUS_ORDER_STATUS_MAP;

/** 주문 상태 레이블 타입 */
type OrderStatusLabelType =
    (typeof ORDER_STATUS_MAP)[keyof typeof ORDER_STATUS_MAP];

/** 적립 지급/차감 구분 코드 */
type AccumulationStatusGroupType = 'PAYMENT' | 'DEDUCTION';

/** 기획전 URL 타입 (EVENT_NUMBER: 기획전 번호 사용, DIRECT: URL 직접입력) */
type EventUrlType = 'EVENT_NUMBER' | 'DIRECT';

/** 기획전 진행 상태 (ALL: 전체, READY: 진행대기, ING: 진행중, END: 진행종료) */
type EventProgressStatusType = 'ALL' | 'READY' | 'ING' | 'END';

/** 정렬 기준 ( ADMIN_SETTING: 랭킹순-관리자화면 기준, SALE: 판매량순, LOW_PRICE: 낮은 가격순, HIGH_PRICE: 높은 가격순, REVIEW: 상품평:, REGISTER: 등록일순) */
type ProductOrderType =
    | 'ADMIN_SETTING'
    | 'SALE'
    | 'LOW_PRICE'
    | 'HIGH_PRICE'
    | 'REVIEW'
    | 'REGISTER';

/** 옵션 선택 타입 (MULTI: 분리형, FLAT: 일체형) */
type OptionSelectType = 'MULTI' | 'FLAT';

/** 옵션 타입 (STANDARD: Standalone Option (ShopByPro: Text Option), COMBINATION: Combination Option, DEFAULT: No option, MAPPING: Mapping (Shop Buy Premium only), REQUIRED: Required and selective options) */
type optionType =
    | 'STANDARD'
    | 'COMBINATION'
    | 'DEFAULT'
    | 'MAPPING'
    | 'REQUIRED';

/** 판매타입 (AVAILABLE: 판매가능, SOLDOUT: 품절, UNAVAILABLE: 판매불가) */
type SaleType = 'AVAILABLE' | 'SOLDOUT' | 'UNAVAILABLE';

/** 주문옵션타입 (ALL: 전체, CLAIM: 클레임 진행, NORAML: 클레임 미진행) */
type OrderRequestType = 'ALL' | 'CLAIM' | 'NORMAL';

/** 영수증 타입 */
type ReceiptType =
    | 'SALE_STATEMENT' // 신용카드 거래 매출전표
    | 'TRADE_STATEMENT' // 가상계좌,실시간계좌이체 매출전표
    | 'CASH_RECEIPT'; // 현금영수증

/** 환불(예상)방법(PG) */
type RefundType =
    | 'PG' // PG 환불
    | 'CANCEL_DEPOSIT' // 입금 전 취소
    | 'ACCOUNT' // 무통장입금 환불
    | 'ACCUMULATION' // 적립금 환불
    | 'ZERO_REFUND' // 0원 환불
    | 'CASH' // 현금 환불
    | 'PAYCO' // 페이코 환불
    | 'PAYPAL' // PAYPAL 환불
    | 'STRIPE' // STRIPE 환불
    | 'KCP' // KCP 환불
    | 'CREDIT_CARD' // 신용카드 환불
    | 'LIIVMATE' // 리브메이트 환불
    | 'INICIS' // 이니시스 환불
    | 'NAVER_EASY_PAY' // 네이버페이(간편결제) 환불
    | 'KAKAO_PAY' // 카카오페이 환불
    | 'NAVER_PAY' // 네이버(주문형) 환불
    | 'LG_U_PLUS' // 토스페이먼츠 환불
    | 'TOSS_PAYMENTS' // 토스페이먼츠 환불
    | 'FORCE_REFUND' // 강제 환불
    | 'EXTERNAL_PAY' // 외부 결제 환불
    | 'DUMMY'; // 없음

/** 환불결제방법 */
type RefundPayType =
    | 'CANCEL_DEPOSIT' // 미입금 취소처리
    | 'PAYCO' // PAYCO
    | 'CASH' // PG없음
    | 'PAYPAL' // PAYPAL
    | 'STRIPE' // STRIPE
    | 'ZERO_REFUND' // 0원결제
    | 'KCP' // KCP
    | 'CREDIT_CARD' // 신용카드
    | 'LIIVMATE' // 리브메이트
    | 'ACCUMULATION' // 적립금 전액 사용
    | 'INICIS' // 이니시스
    | 'NAVER_EASY_PAY' // 네이버페이(간편결제)
    | 'KAKAO_PAY' // 카카오페이
    | 'NAVER_PAY' // 네이버페이(주문형)
    | 'LG_U_PLUS' // LG유플러스
    | 'TOSS_PAYMENTS' // 토스페이먼츠
    | 'ACCOUNT' // 무통장입금
    | 'DUMMY'; // PG없음

/** 결제수단(43) */
type PayType =
    | 'CREDIT_CARD' // 신용카드
    | 'ACCOUNT' // 무통장입금
    | 'MOBILE' // 휴대폰결제
    | 'REALTIME_ACCOUNT_TRANSFER' // 실시간계좌이체
    | 'VIRTUAL_ACCOUNT' // 가상계좌
    | 'GIFT' // 상품권
    | 'ATM' // ATM
    | 'PAYCO' // PAYCO
    | 'ZERO_PAY' // 0원결제
    | 'ACCUMULATION' // 적립금 전액 사용
    | 'PHONE_BILL' // 전화결제
    | 'POINT' // 포인트결제
    | 'YPAY' // 옐로페이
    | 'KPAY' // 케이페이
    | 'PAYPIN' // 페이핀
    | 'INIPAY' // INIPay 간편결제
    | 'PAYPAL' // PAYPAL
    | 'STRIPE' // STRIPE
    | 'NAVER_PAY' // 네이버페이 주문형
    | 'KAKAO_PAY' // 카카오페이
    | 'NAVER_EASY_PAY' // 네이버페이 결제형
    | 'SAMSUNG_PAY' // 삼성페이
    | 'CHAI' // 차이
    | 'TOSS_PAY' // 토스페이
    | 'SK_PAY' // SK페이
    | 'APPLE_PAY' // 애플페이
    | 'LPAY' // 엘페이
    | 'ESCROW_REALTIME_ACCOUNT_TRANSFER' // 실시간계좌이체-에스크로
    | 'ESCROW_VIRTUAL_ACCOUNT' // 가상계좌-에스크로
    | 'VERITRANS_CARD' // Veritrans CreditCard
    | 'TOASTCAM' // 토스트캠
    | 'RENTAL' // 렌탈결제
    | 'UNION_PAY' // Union Pay
    | 'ALIPAY' // Alipay Plus
    | 'WECHAT_PAY' // WeChat Pay
    | 'PINPAY' // 핀페이
    | 'EXTERNAL_PAY' // 외부 결제 전액 사용
    | 'HMG_PAY' // HMG pay
    | 'APP_CARD' // 앱카드
    | 'PAY_PAY' // 페이페이
    | 'E_CONTEXT' // 일본 편의점결제
    | 'HAPPY_VOUCHER' // 국민행복바우처
    | 'ETC'; // 기타결제수단

/** 외부 PG사(32) */
type PgType =
    | 'DUMMY' // 없음
    | 'PAYCO' // PAYCO
    | 'PAYPAL' // PayPal
    | 'STRIPE' // STRIPE
    | 'KCP' // KCP
    | 'INICIS' // 이니시스
    | 'NONE' // PG없음
    | 'KCP_MOBILE' // KCP(모바일)
    | 'KCP_APP' // KCP(앱)
    | 'NAVER_PAY' // 네이버페이(주문형)
    | 'LIIVMATE' // 리브메이트
    | 'PAYPALPRO' // PAYPAL PRO
    | 'ATHOR_NET' // AthorizeNet
    | 'KAKAO_PAY' // 카카오페이
    | 'NAVER_EASY_PAY' // 네이버페이(간편결제)
    | 'CHAI' // 차이
    | 'SMARTRO_PAY' // 스마트로페이
    | 'LG_U_PLUS' // 토스페이먼츠
    | 'TOSS_PAYMENTS' // 토스페이먼츠
    | 'VERITRANS' // Veritrans
    | 'NICEPAY' // 나이스페이
    | 'MY_PAY' // 마이페이
    | 'EXIMBAY_GLOBAL' // 엑심베이(글로벌)
    | 'EASY_PAY' // 이지페이
    | 'GALAXIA_MONEY_TREE' // 갤럭시아머니트리
    | 'KSNET' // KSNET
    | 'EASY_PAY_OVERSEAS' // 이지페이(해외구매대행전용)
    | 'BLUE_WALNUT' // 블루월넛
    | 'HMG_PAY_H' // 현대페이
    | 'HMG_PAY_K' // 기아페이
    | 'APP_CARD' // 앱카드
    | 'TOSS_EASY_PAY'; // 토스페이(간편결제)

type NextActionType = keyof typeof NEXT_ACTION_MAP;

/** 몰의 과세타입 (DUTY: 과세, DUTYFREE: 면세, SMALL: 영세) */
type TaxType = 'DUTY' | 'DUTYFREE' | 'SMALL';

/** 적립 유형(ADD: 지급, SUB: 차감) */
type AccumulationReasonType = 'ADD' | 'SUB';

/** 적립사유 코드 */
type AccumulationReserveReasonType =
    keyof typeof ACCUMULATION_RESERVE_REASON_MAP;

type AccumulationStatusType =
    | 'GIVE_AVAILABLE' // 지급
    | 'SUBTRACTION_CANCELED' // 차감롤백
    | 'SUBTRACTION_USED' // 차감
    | 'GIVE_CANCELED'; // 지급롤백

/** 쿠폰 종류 (PRODUCT: 상품적용 쿠폰, CART: 주문적용 쿠폰, CART_DELIVERY: 장바구니 배송비 할인, GIFT: 기프트 쿠폰) */
type CouponType = 'PRODUCT' | 'CART' | 'CART_DELIVERY' | 'GIFT';

/** 쿠폰 대상 종류 (ALL_PRODUCT: 전상품, PRODUCT: 개별상품, BRAND: 브랜드, CATEGORY: 카테고리, PARTNER: 파트너사) */
type CouponTargetType =
    | 'ALL_PRODUCT' // 전상품
    | 'PRODUCT' // 개별상품
    | 'BRAND' // 브랜드
    | 'CATEGORY' // 카테고리
    | 'PARTNER' // 파트너사
    | 'EVENT'; // 이벤트

type AllianceRefererType = 'DIRECT' | 'NAVER_KNOWLEDGE_SHOPPING';

/** 상품문의 답변 어드민 (PLATFORM: Platform, SERVICE: Service, PARTNER: Partner, SHOPBY: Service) */
type AdminType = 'PLATFORM' | 'SERVICE' | 'PARTNER' | 'SHOPBY';

/** 신고타입 (COPYRIGHT: 저작권 침해 및 기타사유, SLANDER: 욕설 또는 비방, ETC: 기타) */
type ProductInquiryReportType = 'COPYRIGHT' | 'SLANDER' | 'ETC';

/** 상품문의 타입 (PRODUCT: Product, DELIVERY: Delivery, CANCEL: Cancel, RETURN: Return, EXCHANGE: Exchange, REFUND: Refund, OTHER: Other) */
type ProductInquiryType = keyof typeof PRODUCT_INQUIRY_MAP;

type ProductInquiryLabelType =
    (typeof PRODUCT_INQUIRY_MAP)[keyof typeof PRODUCT_INQUIRY_MAP];

/** 전시 상태 ([DISPLAY: On display, BLIND: Do not display]) */
type DisplayStatusType = 'DISPLAY' | 'BLIND';

/** 검색어 기준 (Content: CONTENT, Product Name: PRODUCT_NAME, All: ALL) */
type ProductInquirySearchType = 'CONTENT' | 'PRODUCT_NAME' | 'ALL';

/** 검색어 기준 (Content: CONTENT, Product Name: TITLE, All: ALL) */
type InquirySearchType = 'TITLE' | 'CONTENT' | 'ALL';

/** 인입 채널 유형(NAVER_EP, DANAWA, ENURI, WONDER, COOCHA, FACEBOOK 또는 사용자 설정) */
type ChannelType =
    | 'NAVER_EP'
    | 'DANAWA'
    | 'ENURI'
    | 'WONDER'
    | 'COOCHA'
    | 'FACEBOOK';

/** 필수약관항목 */
type OrderTermsType =
    | 'USE' // 이용약관
    | 'PI_COLLECTION_AND_USE_ON_ORDER' // 개인정보 이용동의
    | 'PI_SELLER_PROVISION' // 개인정보 판매자 제공 동의
    | 'CLEARANCE_INFO_COLLECTION_AND_USE' // 통관정보 수집 · 이용 동의
    | 'TRANSFER_AGREE' // 개인정보 국외 이전 동의
    | 'ORDER_INFO_AGREE' // 주문 상품 정보 동의
    | 'PI_LIQUOR_PURCHASE_PROVISION' // 주류구매 개인정보 제공 동의
    | 'REGULAR_PAYMENT_USE' // 정기결제(배송) 이용약관
    | 'AUTO_APPROVAL_USE' // 자동 승인 이용약관
    | 'ORDER_DEFAULT' // 주문 기본 동의
    | 'PI_GIFT_ACCEPT_COLLECTION_AND_USE'; // 선물수락 개인정보 수집/이용 동의

/** 필수동의항목 */
type OrderAgreementType =
    | 'TERMS_OF_USE' // 이용약관
    | 'PRIVACY_USAGE_AGREEMENT' // 개인정보 이용동의
    | 'NONE_MEMBER_PRIVACY_USAGE_AGREEMENT' // 비회원 개인정보 수집 · 이용 동의
    | 'SELLER_PRIVACY_USAGE_AGREEMENT' // 개인정보 판매자 제공 동의
    | 'CUSTOMS_CLEARANCE_AGREEMENT' // 통관정보 수집 · 이용 동의
    | 'OVERSEA_PRIVACY_USAGE_AGREEMENT' // 개인정보 국외 이전 동의
    | 'ORDER_INFO_AGREE' // 주문 상품 정보 동의
    | 'PI_LIQUOR_PURCHASE_PROVISION' // 주류구매 개인정보 제공 동의
    | 'REGULAR_PAYMENT_USE' // 정기결제(배송) 이용약관
    | 'AUTO_APPROVAL_USE' // 자동 승인 이용약관
    | 'ORDER_DEFAULT'; // 주문 기본 동의

type OrderTermType = keyof typeof orderTerms;

/** 회원 구분 (MALL: 일반 회원, SYNC_ID: 연동형 회원, OPEN_ID: 간편로그인 회원) */
type MemberType = 'MALL' | 'SYNC_ID' | 'OPEN_ID';

/** 회원 상태 (대기: WAITING, 가입완료: ACTIVE, 휴면: FREEZE or DORMANT, 이용정지: PAUSED, 탈퇴 : WITHDRAWN, PENDING: 승인대기) */
type MemberStatsType =
    | 'WAITING'
    | 'ACTIVE'
    | 'FREEZE'
    | 'DORMANT'
    | 'PAUSED'
    | 'WITHDRAWN'
    | 'PENDING';

/** 클레임 구분 */
type ClaimType = keyof typeof CLAIM_TYPE_MAP;

/** 답변 상태 (ISSUED(ASKED-이전버전 호환용): 답변대기, IN_PROGRESS: 답변 진행중, ANSWERED: 답변완료) */
type InquiryStatusType = 'ISSUED' | 'ASKED' | 'IN_PROGRESS' | 'ANSWERED';

/** 클레임사유 */
type ClaimReasonType = keyof typeof CLAIM_REASON_MAP;

/** 클레임 사유 레이블 */
type ClaimReasonLabelType =
    (typeof CLAIM_REASON_MAP)[keyof typeof CLAIM_REASON_MAP];

/** 클레임상태 */
type ClaimStatusType = keyof typeof CLAIM_STATUS_MAP;

/** 배송 구분 (PARTNER_SHIPPING_AREA: 파트너사배송, MALL_SHIPPING_AREA: 쇼핑몰배송) */
type ShippingAreaType = 'PARTNER_SHIPPING_AREA' | 'MALL_SHIPPING_AREA';

/** 추가결제방법 */
type AdditionalPayType = 'CASH' | 'ACCUMULATION' | 'NAVER_PAY';

/** 택배사타입(53) */
type DeliveryCompanyType =
    | 'CJ' // CJ대한통운
    | 'POST' // 우체국택배
    | 'HANJIN' // 한진택배
    | 'GTX' // gtx로지스
    | 'LOTTE' // 롯데택배
    | 'KGB' // kgb택배
    | 'LOGEN' // 로젠택배
    | 'GSI' // gsi Express
    | 'KGL' // KG로지스
    | 'INTRAS' // INTRAS
    | 'UPS' // UPS
    | 'CHUNIL' // 천일택배
    | 'KDEXP' // 경동택배
    | 'HDEXP' // 합동택배
    | 'ILYANG' // 일양택배
    | 'POST_EMS' // 우체국 EMS
    | 'DAESIN' // 대신택배
    | 'CVS' // GSPostbox택배
    | 'DHL' // DHL
    | 'FEDEX' // FEDEX
    | 'GSM' // GSM국제택배
    | 'WARPEX' // WarpEx
    | 'WIZWA' // WIZWA
    | 'ACI' // ACI Express
    | 'PANTOS' // 범한판토스
    | 'CJ_INTERNATIONAL' // CJ대한통운(국제택배)
    | 'TNT' // TNT
    | 'CU' // CU편의점택배
    | 'KUNYOUNG' // 건영택배
    | 'LOTTE_INTERNATIONAL' // 롯데택배(국제택배)
    | 'HONAM' // 호남택배
    | 'HANIPS' // 한의사랑
    | 'IPARCEL' // i-Parcel
    | 'SLX' // SLX택배
    | 'USPS' // USPS
    | 'WONDERS' // 원더스퀵
    | 'REGISTPOST' // 우편등기
    | 'DHLDE' // DHL(독일)
    | 'EZUSA' // EZUSA
    | 'SWGEXP' // 성원글로벌
    | 'DAEWOON' // 대운글로벌
    | 'DODOFLEX' // 도도플렉스
    | 'NH_LOGIS' // 농협택배
    | 'UFO' // 유에프오
    | 'TODAY_PICKUP' // 카카오 T 당일배송
    | 'QEXPRESS' // 큐익스프레스
    | 'PINGPONG' // 핑퐁
    | 'CR_LOGITECH' // CR Logitech
    | 'TODAY' // 투데이
    | 'SELLUV' // 셀럽
    | 'EXMATE' // 이엑스메이트
    | 'WINION_LOGIS' // 위니온로지스
    | 'ETC'; // 기타

/** 반품수거 타입 */
type ReturnWayType =
    | 'SELLER_COLLECT' // 판매자수거요청
    | 'BUYER_DIRECT_RETURN'; // 구매자직접반품

/** 클레임 타입 */
type ClaimClassType =
    | 'LEGACY' // '레거시',
    | 'ORDER_CANCEL' // '전체취소',
    | 'OPTION_CANCEL' // '부분취소',
    | 'RETURN_EXCHANGE' // '출고 후 교환',
    | 'CANCEL_EXCHANGE' // '출고 전 교환',
    | 'RETURN'; // '반품',

/** 상품 할인 타입 */
type DiscountUnitType = 'WON' | 'RATE';

/** 쿠폰 할인 유형 */
type DiscountType = 'AMOUNT' | 'RATE';

/** 쿠폰 하위 타입 */
type CouponSubType =
    | 'CART' // 장바구니 쿠폰
    | 'DELIVERY_DEFAULT' // 기본 배송비 쿠폰
    | 'DELIVERY_ALL' // 전체 배송비 쿠폰
    | 'NONE'; // 장바구니 쿠폰 외

/** 판매 상태 (전체 판매 상태 조회: ALL_CONDITIONS, 판매대기와 판매중 상품 조회: READY_ONSALE, 판매중 상품만 조회: ONSALE - default, 예약판매중인 상품과 판매중인 상품만 조회: RESERVATION_AND_ONSALE) */
type ProductSaleStatusType =
    | 'ALL_CONDITIONS'
    | 'READY_ONSALE'
    | 'ONSALE'
    | 'RESERVATION_AND_ONSALE';

/** 판매상태 (상품진열, 리뷰에서 사용) */
type ProductSectionSaleStatusType =
    | 'READY' // 판매대기
    | 'ONSALE' // 판매중
    | 'FINISHED' // 판매종료
    | 'STOP' // 판매중지
    | 'PROHIBITION'; // 판매금지

type ReportType =
    | 'COPYRIGHT'
    | 'SLANDER'
    | 'COMMERCIAL'
    | 'PORNO'
    | 'ABUSE'
    | 'VIOLENCE'
    | 'TERROR'
    | 'BULLY'
    | 'SUICIDE'
    | 'WRONG'
    | 'ETC';

/** 쿠폰 발급 유형 */
type CouponIssueType =
    | 'DOWNLOAD' // 다운로드
    | 'CODE_DESIGNATE' // 지정코드
    | 'CODE_RANDOM' // 난수코드
    | 'INSERT' // 인서트발급
    | 'CODE_DESIGNATE_ADMIN_ONLY'; // 관리자지정코드

/** 리스트 이미지 유형 */
type ImageDisplayType =
    | 'NOT_USED' // 사용 안함
    | 'ATTACHMENT' // 첨부파일 사용
    | 'PRODUCT'; // 상품 이미지 사용

/** 이미지 타입 */
type ImageUrlType = 'IMAGE_URL' | 'VIDEO_URL';

/** 게시판 노출 유형 */
type BoardDisplayType =
    | 'LIST' // 리스트형
    | 'CARD' // 카드형
    | 'REPLY' // 댓글형
    | 'INQUIRY'; // 문의형

/** 게시판 권한 타입 */
type BoardAuthorityType =
    | 'ALL' // 전체
    | 'MEMBER_ONLY' // 회원 전용
    | 'SPECIFIC_MEMBERS' // 특정회원 전용
    | 'ADMIN' // 운영자 전용
    | 'NOT_USED'; // 사용 안함

/** 인트로 페이지 설정정보 */
type IntroRedirectionType =
    | 'NONE' // 사용안함
    | 'NO_ACCESS' // 접속 불가
    | 'ONLY_MEMBER' // 회원 인증
    | 'ONLY_ADULT'; // 성인 인증

/** 상품 금액 기준 설정 */
type ProductAccumulationBasisType =
    | 'SALE_PRICE' // 판매가
    | 'SALE_STANDARD_PRICE' // 판매가 ± 옵션가
    | 'SALE_PROMOTION_PRICE' // 판매가 ± 옵션가 - 프로모션할인
    | 'DISCOUNTED_PRICE' // 할인적용가
    | 'DISCOUNTED_STANDARD_PRICE' // 할인적용가 ± 옵션가
    | 'DISCOUNTED_PROMOTION_PRICE'; // 할인적용가 ± 옵션가 - 프로모션할인

/** 적립금 노출 설정 */
type AccumulationDisplayFormatType =
    | 'FIXED_AMT' // 정액 단일표시
    | 'FIXED_RATE' // 정률(%) 단일표시 (ex 2%)
    | 'FIRST_FIXED_RATE' // 정률 정액 동시표시
    | 'FIRST_FIXED_AMT'; // 정액 정률 동시표시

// 적립금 지급 시점
type AccumulationGivePointType =
    | 'IMMEDIATE' // 즉시적립
    | 'NEXTDAY' // 익일
    | 'DAY_AFTER_TOMMOROW' // 2일
    | 'AFTER_A_WEEK' // 7일
    | 'AFTER_TWO_WEEK' // 14일
    | 'AFTER_TWENTY_DAYS' // 20일
    | 'AFTER_THIRTY_DAYS' // 30일
    | 'NEXT_MONTH'; // 익월

/** 검색어 기준 */
type SearchType = 'ALL' | 'CONTENT' | 'PRODUCT_NAME';

/** 신고사유(저작권 침해: COPYRIGHT , 비방: SLANDER) */
type ReportReasonCdType = 'COPYRIGHT' | 'SLANDER';

/** 묶음배송조건 */
type GroupDeliveryAmtType =
    | 'MAXIMUM_SELECTED' // 최대부과
    | 'MINIMUM_SELECTED'; // 최소부과

/** 요일 */
type DaysOfWeekType =
    | 'SUN' // 일
    | 'MON' // 월
    | 'TUE' // 화
    | 'WED' // 수
    | 'THU' // 목
    | 'FRI' // 금
    | 'SAT'; // 토

type DayOfWeekCycleType =
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';

/** 배송타입 */
type DeliveryType =
    | 'PARCEL_DELIVERY' // 택배/등기/소포
    | 'DIRECT_DELIVERY' // 직접배송(화물배달)
    | 'NONE'; // 없음

/** 최종 할인가격 검색 조건 */
type DiscountedComparisonType = 'GT' | 'LTE' | 'GTE' | 'EQ' | 'BETWEEN';

/** 판매상태 */
type SaleStatusType =
    | 'ALL_CONDITIONS'
    | 'READY_ONSALE' // 판매대기, 판매중 상품만 조회
    | 'ONSALE' // 판매중인 상품만 조회
    | 'RESERVATION_AND_ONSALE'; // 예약판매중인 상품과 판매중인 상품만 조회:

/** 판매기간 타입 (REGULAR: regular sale, PERIOD: Period Sale ) */
type SalePeriodType = 'REGULAR' | 'PERIOD';

/** 전시카테고리 검색 조건 */
type CategoryOperatorType = 'AND' | 'OR';

/** 상품유형 (DEFAULT: General product, EVENT: Event Product, OFFLINE: Offline product, RENTAL: Rental Product) */
type ProductType = 'DEFAULT' | 'EVENT' | 'OFFLINE' | 'RENTAL';

type AuthType = 'NONE' | 'SMS' | 'EMAIL' | 'MOBILE';

type CertificatedUsage =
    | 'FIND_ID'
    | 'FIND_PASSWORD'
    | 'CHANGE_MOBILE_NO'
    | 'RELEASE_DORMANT'
    | 'ADMIN'
    | 'JOIN'
    | 'JOIN_URI'
    | 'CHANGE_ID'
    | 'ADMIN_SECONDARY'
    | 'CHANGE_EMAIL';

// 지원하는 오픈 아이디
type OpenIdJoinProvider =
    | 'naver'
    | 'kakao'
    | 'kakao-sync'
    | 'line'
    | 'facebook'
    | 'payco'
    | 'ncpstore'
    | 'apple'
    | 'google';

// 오픈아이디 Provider
type NcpOpenIdProviderType =
    | 'ncp_naver'
    | 'ncp_kakao'
    | 'ncp_kakao-sync'
    | 'ncp_line'
    | 'ncp_facebook'
    | 'ncp_payco'
    | 'ncpstore'
    | 'ncp_apple'
    | 'ncp_google'
    | 'app-card';

/** 성별 */
type Sex = 'M' | 'F';

type ShopbyJoinAgreementTypes = keyof typeof SHOPBY_JOIN_AGREEMENT_TYPE_MAP;
type ShopbyTermsTypes = keyof typeof SHOPBY_TERMS_TYPE_MAP;
type ShopbyTermHistoryTypes = keyof typeof SHOPBY_TERM_HISTORY_MAP;

/** 배송조건 */
type DeliveryConditionType =
    | 'FREE' // 무료
    | 'CONDITIONAL' // 조건부 무료
    | 'FIXED_FEE' // 유료(고정 배송비)
    | 'QUANTITY_PROPOSITIONAL_FEE' // 수량 비례
    | 'PRICE_FEE' // 금액별 차등
    | 'QUANTITY_FEE' // 수량별 차등
    | 'WEIGHT_FEE'; // 중량별 차등

/** 현금영수증 발급 타입: INCOME_TAX_DEDUCTION = 소득 공제용, PROOF_EXPENDITURE = 지출증빙용*/
type CashReceiptIssuePurposeType =
    keyof typeof CASH_RECEIPT_ISSUE_PURPOSE_TYPE_MAP;

/** 현금영수증 발급 키 타입  */
type CashReceiptKeyType =
    | 'CARD_NO' // 카드번호
    | 'MOBILE_NO' // 휴대폰번호
    | 'BUSINESS_NO' // 사업자 번호
    | 'VOLUNTARY_NO'; // 자진발급 번호 (국세청 지정 고정번호)

/** 현금영수증 발행 상태 */
type CashReceiptIssueType = keyof typeof CASH_RECEIPT_ISSUE_TYPE_MAP;

/** 배송비 착불 여부 (PREPAID_DELIVERY: 배송비 선불, PAY_ON_DELIVERY: 배송비 착불) */
type DeliveryPayType = 'PREPAID_DELIVERY' | 'PAY_ON_DELIVERY';

/** 정렬 필드(default: BRAND_NAME), (BRAND_NAME:브랜드명, LIKE_COUNT:브랜드 좋아요 수) */
type BrandSortCriterionType = 'BRAND_NAME' | 'LIKE_COUNT';

/** 정렬 필드 (null 또는 값 없음(default) - 브랜드명 가나다순 / PRODUCT_COUNT - 브랜드 상품 매핑 수로 정렬 후, 브랜드 가나다순 / REGISTER_DATE - 등록일순) */
type SortCriterionType = 'PRODUCT_COUNT' | 'REGISTER_DATE';

/** 장바구니 상품 추가 타입 (QUANTITY: 수량 추가, ROW: 행 추가) */
type CartEquivalentOptionUnitType = 'QUANTITY' | 'ROW';

/** 회원가입 항목 사용 여부 (USED: 사용함, REQUIRED: 필수, NOT_USED: 사용안함)  */
type MemberJoinConfigType = 'USED' | 'REQUIRED' | 'NOT_USED';

/** 회원가입 항목 사용 여부 (USED: 사용함, REQUIRED: 필수, NOT_USED: 사용안함)  */
type ExtraInfoType =
    | 'TEXTBOX'
    | 'RADIOBUTTON'
    | 'CHECKBOX'
    | 'DROPDOWN'
    | 'IMAGE';

/** 카드사(발급사) */
type CardCompanyType =
    | 'ANONYMOUS'
    | 'BC' // BC카드
    | 'KB' // KB국민카드
    | 'NH' // NH농협카드
    | 'KWANGJU' // 광주카드
    | 'LOTTE_AMEX' // 롯데아멕스카드
    | 'LOTTE' // 롯데카드
    | 'KDB' // 산업카드
    | 'SAMSUNG' // 삼성카드
    | 'SUHYUP' // 수협카드
    | 'SHINSEGAE' // 신세계카드
    | 'SHINHAN' // 신한카드
    | 'SHINHYUP' // 신협카드
    | 'CITY' // 씨티카드
    | 'WOORI' // 우리카드
    | 'UNIONPAY' // 은련카드
    | 'JEOCHOOK' // 저축카드
    | 'JEONBUK' // 전북카드
    | 'JEJU' // 제주카드
    | 'HANA_KEB' // 하나(외환)카드
    | 'HANA' // 하나카드
    | 'HANMI' // 한미카드
    | 'JCB' // JCB카드
    | 'MASTER' // MASTER카드
    | 'VISA' // VISA카드
    | 'HYUNDAI' // 현대카드
    | 'AMEX' // AMEX카드
    | 'DINERS' // 다이너스카드
    | 'GWANGJU' // 광주카드
    | 'KAKAO' // 카카오뱅크카드
    | 'KBANK' // 케이뱅크카드
    | 'IBK' // 기업은행카드
    | 'HCB' // 국민은행(구주택)
    | 'NHLOCAL' // 단위농협
    | 'NHLIVESTOCK' // 축협중앙회
    | 'JH' // 신한은행(조흥은행)
    | 'SC' // 제일은행
    | 'DAEGU' // 대구은행
    | 'PUSAN' // 부산은행
    | 'KANGWON' // 강원은행
    | 'GYEONGNAM' // 경남은행
    | 'HSB' // 홍콩상하이은행
    | 'EPOST' // 우체국
    | 'HANA_SEOUL' // 하나은행(서울은행)
    | 'PB' // 평화은행
    | 'SHINHAN_JH' // 신한은행(조흥 통합)
    | 'PAYCO' // PAYCO
    | 'KFCC' // 새마을금고
    | 'DISCOVER' // DISCOVER카드
    | 'HYUNDAI_STOCK' // 현대증권카드
    | 'NAVER_POINT' // 네이버포인트
    | 'TOSS_MONEY' // 토스머니
    | 'SSG_MONEY' // SSG머니
    | 'L_POINT' // 엘포인트
    | 'KAKAO_MONEY'; // 카카오머니

type ReplyType = 'EMAIL' | 'SMS';

/** 정기결제 배송주기 타입 */
type CycleType =
    | 'MONTH' // 월
    | 'WEEK'; // 주

/** 배송지 타입 */
type AddressType =
    | 'BOOK' // 기본주소
    | 'RECENT' // 최근주소
    | 'RECURRING_PAYMENT' // 정기결제 배송주소
    | 'RECURRING_PAYMENT_PRESENT'; // 정기결제 선물하기 배송주소

// 은행 영문 관리명(54)
type BankType =
    | 'ANONYMOUS'
    | 'KDB'
    | 'IBK'
    | 'KB'
    | 'KEB'
    | 'SUHYUP'
    | 'KEXIM'
    | 'NH'
    | 'NHLOCAL'
    | 'WOORI'
    | 'SC'
    | 'CITY'
    | 'DAEGU'
    | 'PUSAN'
    | 'GWANGJU'
    | 'JEJU'
    | 'JEONBUK'
    | 'GYEONGNAM'
    | 'KFCC'
    | 'CU'
    | 'SANGHO'
    | 'HSBC'
    | 'DEUTSCHE'
    | 'NFCF'
    | 'EPOST'
    | 'KEBHANA'
    | 'SHINHAN'
    | 'KBANK'
    | 'KAKAO'
    | 'TOSS'
    | 'YUANTA'
    | 'KBSEC'
    | 'MIRAE'
    | 'MIRAEDAEWOO'
    | 'SAMSUNG'
    | 'HANKOOK'
    | 'NH_INVEST'
    | 'KYOBO'
    | 'HI_INVEST'
    | 'HMC_INVEST'
    | 'KIWOOM'
    | 'EBEST'
    | 'SK'
    | 'DAISHIN'
    | 'SOLOMON_INVEST'
    | 'HANHWA'
    | 'HANA_INVEST'
    | 'SHINHAN_INVEST'
    | 'DONGBU'
    | 'EUGENE_INVEST'
    | 'MERITZ_COMPREHENSIVE'
    | 'BOOKOOK'
    | 'SHINYOUNG'
    | 'CAPE';

// TODO: 체크 필요
type ProductDirectionType = 'DESC_DELIVERY_FEIGN_CLIENT' | 'DESC' | 'ASC';

type CriterionType = 'PRODUCT_COUNT' | 'RECENT_PRODUCT';

type By =
    | 'SALE_YMD'
    | 'ADMIN_SETTING'
    | 'POPULAR'
    | 'RECOMMENDATION'
    | 'DISCOUNTED_PRICE';

/** 귀책타입 (BUYER: 구매자 귀책, SELLER: 판매자 귀책) */
type ResponsibleObjectType = 'BUYER' | 'SELLER';

/** 판매 상태 ((판매대기, 판매중 상품만 조회: READY_ONSALE, 판매중인 상품만 조회: ONSALE, 예약판매중인 상품과 판매중인 상품만 조회: RESERVATION_AND_ONSALE) */
type EventSaleStatusType = 'READY_ONSALE' | 'ONSALE' | 'RESERVATION_AND_ONSALE';

/** 페이지 타입 */
type PageType =
    | 'MAIN' // 메인 페이지
    | 'COMMON_HEAD' // 상단 공통영역
    | 'COMMON_FOOTER' // 하단 공통영역
    | 'PRODUCT' // 상품 상세 페이지
    | 'PRODUCT_LIST' // 상품 리스트 페이지
    | 'PRODUCT_SEARCH' // 상품 검색결과 페이지
    | 'CART' // 장바구니 페이지
    | 'ORDER' // 주문하기 페이지
    | 'ORDER_DETAIL' // 주문상세 페이지
    | 'ORDER_COMPLETE' // 주문완료 페이지
    | 'DISPLAY_SECTION' // 메인 싱품 분류지
    | 'MEMBER_JOIN_COMPLETE' // 회원가입완료 페이지
    | 'LOGIN' // 로그인 페이지
    | 'MYPAGE'; // 마이 페이지

/** 배너 전시 기간 타입 (REGULAR: 상시, PERIOD: 기간설정) */
type BannerDisplayType = 'REGULAR' | 'PERIOD';

/** 배너 그룹 타입 */
type BannerGroupType = 'LOGO' | 'SLIDE' | 'NORMAL';

/** 배너 사이즈 단위 */
type SizeUnitType = 'PERCENT' | 'PIXEL';

/** 슬라이드 배너 - 전환 속도 */
type SlideSpeedType = 'FAST' | 'NORMAL' | 'SLOW';

/** 슬라이드 배너 - 네비게이션 노출 유형 (VISIBLE: 노출, INVISIBLE: 노출 안함, UPLOAD: 직접 등록) */
type SlideNavigationType = 'VISIBLE' | 'INVISIBLE' | 'UPLOAD';

/** 슬라이드 배너 - 효과 종류 */
type SlideEffectType = 'SLIDE' | 'FADE';

/** 슬라이드 배너 - 네비게이션 노출 버튼 디자인 */
type ButtonSizeType =
    | 'SIZE_ONE'
    | 'SIZE_TWO'
    | 'SIZE_THREE'
    | 'SIZE_FOUR'
    | 'SIZE_FIVE'
    | 'SIZE_SIX';

/** 슬라이드 배너 - 네비게이션 노출 버튼 디자인 */
type ButtonBorderType = 'CIRCLE' | 'ROUND_SQUARE' | 'SQUARE';

/** 전시기간 타입  */
type DisplayPeriodType = SalePeriodType;

/** 배너 이미지 랜딩 타겟 (SELF: 현재창, NEW: 새창) */
type OpenLocationType = 'SELF' | 'NEW';

/** 구매자 작성형 정보 매칭 타입 (OPTION: By Option, PRODUCT: By Product, AMOUNT: By quantity) */
type InputMatchingType = 'OPTION' | 'PRODUCT' | 'AMOUNT';

/** 카드 코드 타입 (KCP) */
type CardCodeType =
    | 'CCLG' // 신한
    | 'CCDI' // 현대
    | 'CCLO' // 롯데
    | 'CCKE' // 외환
    | 'CCSS' // 삼성
    | 'CCKM' // 국민
    | 'CCBC' // 비씨
    | 'CCNH' // 농협
    | 'CCHN' // 하나 SK
    | 'CCCT' // 씨티
    | 'CCPH' // 우리
    | 'CCKJ' // 광주
    | 'CCSU' // 수협
    | 'CCJB' // 전북
    | 'CCCJ' // 제주
    | 'CCKD' // KDB 산은
    | 'CCSB' // 저축
    | 'CCCU' // 신협
    | 'CCPB' // 우체국
    | 'CCSM' // MG 새마을
    | 'CCXX' // 해외
    | 'CCUF' // 은련
    | 'BC81'; // 하나비씨

type AuthorityConfigType =
    | 'MEMBER_NAME' // 회원명,
    | 'MEMBER_ID' // 회원아이디,
    | 'MEMBER_NICKNAME' // 닉네임,
    | 'MEMBER_EMAIL'; // 회원 이메일주소

type ClaimValidationType =
    /** 이후 클레임 신청 건이 있고 장바구니 쿠폰이 적용된 경우 철회 불가 */
    | 'EXISTS_AFTER_CLAIM_WITH_CART_COUPON'
    /** 동일 배송번호에 클레임 신청 건이 있으면 철회 불가 */
    | 'EXISTS_SAME_SHIPPING_NO_CLAIM'
    /** 철회 가능 */
    | 'WITHDRAWABLE';

/** 해외창고 국가 구분 */
type WarehouseAddressType =
    /** 한국  */
    | 'ADDRESS'
    /** 대체문구 */
    | 'SUBSTITUTION';

type ProductSectionDisplayType =
    | 'GALLERY' // 갤러리형
    | 'LIST' // 리스트형
    | 'CART' // 장바구니형
    | 'SIMPLE_IMAGE' // 심플 이미지형
    | 'PRODUCT_MOVE' // 상품 이동
    | 'SWIPE'; // 스와이프형

type EvaluationCondition =
    | 'PAY_AMT' //구매금액 |
    | 'PAY_CNT' //  구매횟수
    | 'AMT_AND_CNT' // 구매금액 and 구매횟수
    | 'AMT_OR_CNT'; //구매금액 or 구매횟수'

type EvaluationDetailCondition =
    | 'BUY_CONFIRM' // 구매 확정 상태 기준 (default)
    | 'PAY_DONE' // 결제 완료 상태 기준
    | 'DELIVERY_ING' // 배송중 상태 기준
    | 'DELIVERY_DONE' // 배송 완료 상태 기준
    | 'AMT_OR_CNT';

type SupplyType = 'NONE' | 'ONCE' | 'MONTHLY';

/** 거래명세서 쇼핑몰 출력 항목 설정 */
type ShopSpecificationFields =
    | 'IMMEDIATE_DISCOUNT_PRICE'
    | 'PRODUCT_NO'
    | 'FREE_GIFT'
    | 'DELIVERY_AMT'
    | 'DISCOUNT_AMT'
    | 'SUB_PAY_AMT'
    | 'EXTERNAL_PAY_INFO';

/** 타겟회원타입 */
type MemberTargetType = 'MEMBER' | 'NON_MEMBER' | 'TARGET';

/** 제한멤버 유형 */
type LimitedMemberType = 'ALL' | 'MEMBER' | 'TARGET';

/** 지급옵션수량 타입 */
type FreeGiftOptionCountType = 'ALL' | 'SELECT';

/** 적립금 사용 금액 단위 */
type AccumulationUnitType = 'AMOUNT' | 'PERCENT';

/** 상품 항목 추가 정보 - 추가 항목 타입 */
type CustomPropertiesPropType = 'STRING' | 'COLOR';

/** 상품의 상품 노출 타입 */
type ProductSalePeriodType = 'REGULAR' | 'PERIOD';

/** 스티커 타입 */
type StickerInfoType = 'TEXT' | 'IMAGE';

/** 옵션 여부 */
type OptionYnType = 'Y' | 'N';

/** 배송 구분 */
type SearchShippingAreaType = 'PARTNER' | 'MALL';

/** 사입 위탁 구분 값 */
type SaleMethodType = 'PURCHASE' | 'CONSIGNMENT';

/** 클레임 불가 사유 */
type NonClaimReasonType =
    | 'ORDER_STATUS_TYPE'
    | 'NAVER_PAY'
    | 'NON_CLAIM_PRODUCT';

export type KeywordType = 'TAG' | 'NAME';

export type KeywordInfoType = KeywordType | 'NO' | 'URL' | 'ID';

export type EventTopImageUrlType = 'HTML' | 'FILE';

/** 현금영수증 신청 결과 */
type CashReceiptResultType = 'ISSUE' | 'REQUEST_ONLY' | 'FAIL';

/** 할부 타입 */
type InstType =
    | 'STANDARD'
    | 'NO_INTEREST'
    | 'STANDARD_5'
    | 'NO_INTEREST_5'
    | 'STANDARD_7'
    | 'NO_INTEREST_7'
    | 'STANDARD_10'
    | 'NO_INTEREST_10';

/** 주문유형 */
type OrderType = 'NORMAL' | 'LATER_SHIPPING_INPUT';

/** 현금영수증 신청 결과 */
type RequestCashReceiptResultType =
    | 'ISSUE'
    | 'CANCEL'
    | 'REQUEST_ONLY'
    | 'FAIL'
    | 'REQUEST';

/** 배너 노출 설정 */
type OrderBannerDisplayType = 'NONE' | 'PC' | 'MOBILE' | 'ALL';

/** 검색 타입 */
type PreviousOrderSearchType = 'ORDER_NO' | 'ORDERER_NAME' | 'PRODUCT_NAME';

/** 기기 타입 */
type DeviceType = 'PC' | 'MOBILE' | 'BASE';

/** 기간 검색타입 */
type SearchDateType = 'REGISTER_YMD' | 'USE_END_YMD';

/** 인증 타입 */
type CertificationType = 'TARGET' | 'NOT_TARGET' | 'DETAIL_PAGE';

/** 상품군 */
type ProductGroupType = 'DELIVERY' | 'SERVICE';

/** 상품등록유형 */
type MappingType = 'SINGLE' | 'MAPPING';

export type {
    AccumulationDisplayFormatType,
    AccumulationGivePointType,
    AccumulationReasonType,
    AccumulationReserveReasonType,
    AccumulationStatusGroupType,
    AccumulationStatusType,
    AccumulationUnitType,
    AdditionalPayType,
    AddressType,
    AdminType,
    AllianceRefererType,
    ArticleRegisterType,
    AuthenticationTimeType,
    AuthenticationType,
    AuthorityConfigType,
    AuthType,
    BankType,
    BankTypeCode,
    BankTypeName,
    BankTypeValue,
    BannerDisplayType,
    BannerGroupType,
    BoardAuthorityType,
    BoardDisplayType,
    BrandNameType,
    BrandSortCriterionType,
    BrowserTargetType,
    ButtonBorderType,
    ButtonSizeType,
    By,
    CardCodeType,
    CardCompanyType,
    CartEquivalentOptionUnitType,
    CashReceiptIssuePurposeType,
    CashReceiptIssueType,
    CashReceiptKeyType,
    CashReceiptResultType,
    CategoryOperatorType,
    CertificatedUsage,
    CertificationType,
    CertificationUsage,
    ChannelType,
    ClaimClassType,
    ClaimReasonLabelType,
    ClaimReasonType,
    ClaimStatusType,
    ClaimType,
    ClaimValidationType,
    ClientPlatformType,
    CountryCdType,
    CouponIssueType,
    CouponSubType,
    CouponTargetType,
    CouponType,
    CriterionType,
    CustomPropertiesPropType,
    CycleType,
    DayOfWeekCycleType,
    DaysOfWeekType,
    DeliveryCompanyType,
    DeliveryConditionType,
    DeliveryPayType,
    DeliveryType,
    DeviceType,
    DiscountedComparisonType,
    DiscountType,
    DiscountUnitType,
    DisplayPeriodType,
    DisplayStatusType,
    EvaluationCondition,
    EvaluationDetailCondition,
    EventProductOrder,
    EventProgressStatusType,
    EventSaleStatusType,
    EventUrlType,
    ExtraInfoType,
    FreeGiftOptionCountType,
    GlobalMallCurrencyTo,
    GlobalMallLanguage,
    GlobalMallType,
    GroupDeliveryAmtType,
    ImageDisplayType,
    ImageUrlType,
    InputMatchingType,
    InquirySearchType,
    InquiryStatusType,
    InstType,
    IntroRedirectionType,
    KcpCode,
    LimitedMemberType,
    LocalCode,
    MappingType,
    MemberJoinConfigType,
    MemberStatsType,
    MemberTargetType,
    MemberType,
    NcpOpenIdProviderType,
    NextActionType,
    NonClaimReasonType,
    OpenIdJoinProvider,
    OpenIdProviderType,
    OpenLocationType,
    OptionSelectType,
    OptionType,
    optionType,
    OptionYnType,
    OrderAgreementType,
    OrderBannerDisplayType,
    OrderByType,
    OrderDirectionType,
    OrderRequestStatusType,
    OrderRequestType,
    OrderStatusLabelType,
    OrderStatusType,
    OrderTermsType,
    OrderTermType,
    OrderType,
    PageType,
    PayType,
    PgType,
    PlatformType,
    PopupDesignType,
    PopupPageType,
    PopupPositionType,
    PopupScreenType,
    PopupType,
    PreviousOrderSearchType,
    PreviousOrderStatusType,
    ProductAccumulationBasisType,
    ProductDirectionType,
    ProductGroupType,
    ProductInquiryLabelType,
    ProductInquiryReportType,
    ProductInquirySearchType,
    ProductInquiryType,
    ProductOrderType,
    ProductReviewReportLabelType,
    ProductReviewReportType,
    ProductSalePeriodType,
    ProductSaleStatusType,
    ProductSectionDisplayType,
    ProductSectionSaleStatusType,
    ProductType,
    ProviderType,
    ReceiptType,
    RefundPayType,
    RefundType,
    ReplyType,
    ReportReasonCdType,
    ReportType,
    RequestCashReceiptResultType,
    ResponsibleObjectType,
    ReturnWayType,
    ReviewOrderByType,
    SaleMethodType,
    SalePeriodType,
    SaleStatusType,
    SaleType,
    SearchDateType,
    SearchShippingAreaType,
    SearchType,
    Sex,
    SexCode,
    ShippingAreaType,
    ShopbyJoinAgreementTypes,
    ShopbyTermHistoryTypes,
    ShopbyTermsTypes,
    ShopSpecificationFields,
    SizeUnitType,
    SlideEffectType,
    SlideNavigationType,
    SlideSpeedType,
    SortCriterionType,
    StickerInfoType,
    SupplyType,
    TaxType,
    WarehouseAddressType,
};

/*********************************************************************/
/* ENUM 타입 */
/*********************************************************************/

enum BEST_REVIEW_YN {
    Y, // 우수 상품평
    N, // 일반 상품평
    NULL, // 전체
}

enum MY_REVIEW_YN {
    Y, // 내 상품평
    N, // 전체 상품평
}

enum HAS_ATTACHMENT_FILE {
    Y, // 파일 첨부
    N, // 파일 미첨부
    ALL, // 빈값
}

enum NAVER_PAY_PAGE_TYPE {
    CART = 1, // 장바구니 페이지
    PRODUCT_DETAIL = 2, // 쇼핑몰 상품상세 페이지
}

export {
    BEST_REVIEW_YN,
    HAS_ATTACHMENT_FILE,
    MY_REVIEW_YN,
    NAVER_PAY_PAGE_TYPE,
};

/** Nullable 유틸 타입 */
export type Nullable<T> = T | null;
