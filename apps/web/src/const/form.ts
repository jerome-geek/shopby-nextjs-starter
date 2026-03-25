import { CountryCdType } from '@/models';

export const EMAIL_DOMAIN_LIST = [
    {
        label: '직접 입력',
        value: '',
    },
    {
        label: 'naver.com',
        value: 'naver.com',
    },
    {
        label: 'hanmail.net',
        value: 'hanmail.net',
    },
    {
        label: 'daum.net',
        value: 'daum.net',
    },
    {
        label: 'nate.com',
        value: 'nate.com',
    },
    {
        label: 'gmail.com',
        value: 'gmail.com',
    },
];

export const PHONE_FIRST_NUMBER_LIST = [
    { label: '010', value: '010' },
    { label: '011', value: '011' },
    { label: '016', value: '016' },
    { label: '017', value: '017' },
    { label: '018', value: '018' },
    { label: '019', value: '019' },
];

export const TEL_FIRST_NUMBER_LIST = [
    { label: '02', value: '02' }, // 서울
    { label: '031', value: '031' }, // 경기도 (수원, 성남 등)
    { label: '032', value: '032' }, // 인천
    { label: '033', value: '033' }, // 강원도 (춘천, 원주 등)
    { label: '041', value: '041' }, // 충청남도 (천안, 아산 등)
    { label: '042', value: '042' }, // 대전
    { label: '043', value: '043' }, // 충청북도 (청주, 제천 등)
    { label: '044', value: '044' }, // 세종특별자치시
    { label: '051', value: '051' }, // 부산
    { label: '052', value: '052' }, // 울산
    { label: '053', value: '053' }, // 대구
    { label: '054', value: '054' }, // 경상북도 (포항, 경주 등)
    { label: '055', value: '055' }, // 경상남도 (창원, 김해 등)
    { label: '061', value: '061' }, // 전라남도 (광주, 여수 등)
    { label: '062', value: '062' }, // 광주
    { label: '063', value: '063' }, // 전라북도 (전주, 익산 등)
    { label: '064', value: '064' }, // 제주도
];

export const ADDRESS_MEMO_LIST = [
    {
        label: '부재시 현관 앞에 놓아 주세요.',
        value: '부재시 현관 앞에 놓아 주세요.',
    },
    {
        label: '부재시 경비실에 맡겨 주세요.',
        value: '부재시 경비실에 맡겨 주세요.',
    },
    {
        label: '부재시 직접 연락 주세요.',
        value: '부재시 직접 연락 주세요.',
    },
    {
        label: '직접 입력',
        value: '직접 입력',
    },
];

export const MOBILE_COUNTRY_CODE_LIST = [
    {
        label: 'Andorra (+376)',
        value: 'AD',
    },
    {
        label: 'United Arab Emirates (+971)',
        value: 'AE',
    },
    {
        label: 'Afghanistan (+93)',
        value: 'AF',
    },
    {
        label: 'Antigua and Barbuda (+1)',
        value: 'AG',
    },
    {
        label: 'Anguilla (+1)',
        value: 'AI',
    },
    {
        label: 'Albania (+355)',
        value: 'AL',
    },
    {
        label: 'Armenia (+374)',
        value: 'AM',
    },
    {
        label: 'Angola (+244)',
        value: 'AO',
    },
    {
        label: 'Argentina (+54)',
        value: 'AR',
    },
    {
        label: 'American Samoa (+1)',
        value: 'AS',
    },
    {
        label: 'Austria (+43)',
        value: 'AT',
    },
    {
        label: 'Australia (+61)',
        value: 'AU',
    },
    {
        label: 'Aruba (+297)',
        value: 'AW',
    },
    {
        label: 'Åland Islands (+358)',
        value: 'AX',
    },
    {
        label: 'Azerbaijan (+994)',
        value: 'AZ',
    },
    {
        label: 'Bosnia and Herzegovina (+387)',
        value: 'BA',
    },
    {
        label: 'Barbados (+1)',
        value: 'BB',
    },
    {
        label: 'Bangladesh (+880)',
        value: 'BD',
    },
    {
        label: 'Belgium (+32)',
        value: 'BE',
    },
    {
        label: 'Burkina Faso (+226)',
        value: 'BF',
    },
    {
        label: 'Bulgaria (+359)',
        value: 'BG',
    },
    {
        label: 'Bahrain (+973)',
        value: 'BH',
    },
    {
        label: 'Burundi (+257)',
        value: 'BI',
    },
    {
        label: 'Benin (+229)',
        value: 'BJ',
    },
    {
        label: 'Saint Barthélemy (+590)',
        value: 'BL',
    },
    {
        label: 'Bermuda (+1)',
        value: 'BM',
    },
    {
        label: 'Brunei Darussalam (+673)',
        value: 'BN',
    },
    {
        label: 'Bolivia (+591)',
        value: 'BO',
    },
    {
        label: 'Bonaire, Sint Eustatius and Saba (+599)',
        value: 'BQ',
    },
    {
        label: 'Brazil (+55)',
        value: 'BR',
    },
    {
        label: 'Bahamas (+1)',
        value: 'BS',
    },
    {
        label: 'Bhutan (+975)',
        value: 'BT',
    },
    {
        label: 'Botswana (+267)',
        value: 'BW',
    },
    {
        label: 'Belarus (+375)',
        value: 'BY',
    },
    {
        label: 'Belize (+501)',
        value: 'BZ',
    },
    {
        label: 'Canada (+1)',
        value: 'CA',
    },
    {
        label: 'Cocos (Keeling) Islands (+61)',
        value: 'CC',
    },
    {
        label: 'Democratic Republic of the Congo (+243)',
        value: 'CD',
    },
    {
        label: 'Central African Republic (+236)',
        value: 'CF',
    },
    {
        label: 'Republic of the Congo (+242)',
        value: 'CG',
    },
    {
        label: 'Switzerland (+41)',
        value: 'CH',
    },
    {
        label: "Cote d'Ivoire (+225)",
        value: 'CI',
    },
    {
        label: 'Cook Islands (+682)',
        value: 'CK',
    },
    {
        label: 'Chile (+56)',
        value: 'CL',
    },
    {
        label: 'Cameroon (+237)',
        value: 'CM',
    },
    {
        label: "People's Republic of China (+86)",
        value: 'CN',
    },
    {
        label: 'Colombia (+57)',
        value: 'CO',
    },
    {
        label: 'Costa Rica (+506)',
        value: 'CR',
    },
    {
        label: 'Cuba (+53)',
        value: 'CU',
    },
    {
        label: 'Cape Verde (+238)',
        value: 'CV',
    },
    {
        label: 'Curaçao (+599)',
        value: 'CW',
    },
    {
        label: 'Christmas Island (+61)',
        value: 'CX',
    },
    {
        label: 'Cyprus (+357)',
        value: 'CY',
    },
    {
        label: 'Czech Republic (+420)',
        value: 'CZ',
    },
    {
        label: 'Germany (+49)',
        value: 'DE',
    },
    {
        label: 'Djibouti (+253)',
        value: 'DJ',
    },
    {
        label: 'Denmark (+45)',
        value: 'DK',
    },
    {
        label: 'Dominica (+1)',
        value: 'DM',
    },
    {
        label: 'Dominican Republic (+1)',
        value: 'DO',
    },
    {
        label: 'Algeria (+213)',
        value: 'DZ',
    },
    {
        label: 'Ecuador (+593)',
        value: 'EC',
    },
    {
        label: 'Estonia (+372)',
        value: 'EE',
    },
    {
        label: 'Egypt (+20)',
        value: 'EG',
    },
    {
        label: 'Western Sahara (+212)',
        value: 'EH',
    },
    {
        label: 'Eritrea (+291)',
        value: 'ER',
    },
    {
        label: 'Spain (+34)',
        value: 'ES',
    },
    {
        label: 'Ethiopia (+251)',
        value: 'ET',
    },
    {
        label: 'Finland (+358)',
        value: 'FI',
    },
    {
        label: 'Fiji (+679)',
        value: 'FJ',
    },
    {
        label: 'Falkland Islands (Malvinas) (+500)',
        value: 'FK',
    },
    {
        label: 'Micronesia, Federated States of (+691)',
        value: 'FM',
    },
    {
        label: 'Faroe Islands (+298)',
        value: 'FO',
    },
    {
        label: 'France (+33)',
        value: 'FR',
    },
    {
        label: 'Gabon (+241)',
        value: 'GA',
    },
    {
        label: 'United Kingdom (+44)',
        value: 'GB',
    },
    {
        label: 'Grenada (+1)',
        value: 'GD',
    },
    {
        label: 'Georgia (+995)',
        value: 'GE',
    },
    {
        label: 'French Guiana (+594)',
        value: 'GF',
    },
    {
        label: 'Guernsey (+44)',
        value: 'GG',
    },
    {
        label: 'Ghana (+233)',
        value: 'GH',
    },
    {
        label: 'Gibraltar (+350)',
        value: 'GI',
    },
    {
        label: 'Greenland (+299)',
        value: 'GL',
    },
    {
        label: 'Republic of The Gambia (+220)',
        value: 'GM',
    },
    {
        label: 'Guinea (+224)',
        value: 'GN',
    },
    {
        label: 'Guadeloupe (+590)',
        value: 'GP',
    },
    {
        label: 'Equatorial Guinea (+240)',
        value: 'GQ',
    },
    {
        label: 'Greece (+30)',
        value: 'GR',
    },
    {
        label: 'Guatemala (+502)',
        value: 'GT',
    },
    {
        label: 'Guam (+1)',
        value: 'GU',
    },
    {
        label: 'Guinea-Bissau (+245)',
        value: 'GW',
    },
    {
        label: 'Guyana (+592)',
        value: 'GY',
    },
    {
        label: 'Hong Kong (+852)',
        value: 'HK',
    },
    {
        label: 'Honduras (+504)',
        value: 'HN',
    },
    {
        label: 'Croatia (+385)',
        value: 'HR',
    },
    {
        label: 'Haiti (+509)',
        value: 'HT',
    },
    {
        label: 'Hungary (+36)',
        value: 'HU',
    },
    {
        label: 'Indonesia (+62)',
        value: 'ID',
    },
    {
        label: 'Ireland (+353)',
        value: 'IE',
    },
    {
        label: 'Israel (+972)',
        value: 'IL',
    },
    {
        label: 'Isle of Man (+44)',
        value: 'IM',
    },
    {
        label: 'India (+91)',
        value: 'IN',
    },
    {
        label: 'British Indian Ocean Territory (+246)',
        value: 'IO',
    },
    {
        label: 'Iraq (+964)',
        value: 'IQ',
    },
    {
        label: 'Islamic Republic of Iran (+98)',
        value: 'IR',
    },
    {
        label: 'Iceland (+354)',
        value: 'IS',
    },
    {
        label: 'Italy (+39)',
        value: 'IT',
    },
    {
        label: 'Jersey (+44)',
        value: 'JE',
    },
    {
        label: 'Jamaica (+1)',
        value: 'JM',
    },
    {
        label: 'Jordan (+962)',
        value: 'JO',
    },
    {
        label: 'Japan (+81)',
        value: 'JP',
    },
    {
        label: 'Kenya (+254)',
        value: 'KE',
    },
    {
        label: 'Kyrgyzstan (+996)',
        value: 'KG',
    },
    {
        label: 'Cambodia (+855)',
        value: 'KH',
    },
    {
        label: 'Kiribati (+686)',
        value: 'KI',
    },
    {
        label: 'Comoros (+269)',
        value: 'KM',
    },
    {
        label: 'Saint Kitts and Nevis (+1)',
        value: 'KN',
    },
    {
        label: 'North Korea (+850)',
        value: 'KP',
    },
    {
        label: 'South Korea (+82)',
        value: 'KR',
    },
    {
        label: 'Kuwait (+965)',
        value: 'KW',
    },
    {
        label: 'Cayman Islands (+1)',
        value: 'KY',
    },
    {
        label: 'Kazakhstan (+7)',
        value: 'KZ',
    },
    {
        label: "Lao People's Democratic Republic (+856)",
        value: 'LA',
    },
    {
        label: 'Lebanon (+961)',
        value: 'LB',
    },
    {
        label: 'Saint Lucia (+1)',
        value: 'LC',
    },
    {
        label: 'Liechtenstein (+423)',
        value: 'LI',
    },
    {
        label: 'Sri Lanka (+94)',
        value: 'LK',
    },
    {
        label: 'Liberia (+231)',
        value: 'LR',
    },
    {
        label: 'Lesotho (+266)',
        value: 'LS',
    },
    {
        label: 'Lithuania (+370)',
        value: 'LT',
    },
    {
        label: 'Luxembourg (+352)',
        value: 'LU',
    },
    {
        label: 'Latvia (+371)',
        value: 'LV',
    },
    {
        label: 'Libya (+218)',
        value: 'LY',
    },
    {
        label: 'Morocco (+212)',
        value: 'MA',
    },
    {
        label: 'Monaco (+377)',
        value: 'MC',
    },
    {
        label: 'Moldova, Republic of (+373)',
        value: 'MD',
    },
    {
        label: 'Montenegro (+382)',
        value: 'ME',
    },
    {
        label: 'Saint Martin (French part) (+590)',
        value: 'MF',
    },
    {
        label: 'Madagascar (+261)',
        value: 'MG',
    },
    {
        label: 'Marshall Islands (+692)',
        value: 'MH',
    },
    {
        label: 'The Republic of North Macedonia (+389)',
        value: 'MK',
    },
    {
        label: 'Mali (+223)',
        value: 'ML',
    },
    {
        label: 'Myanmar (+95)',
        value: 'MM',
    },
    {
        label: 'Mongolia (+976)',
        value: 'MN',
    },
    {
        label: 'Macao (+853)',
        value: 'MO',
    },
    {
        label: 'Northern Mariana Islands (+1)',
        value: 'MP',
    },
    {
        label: 'Martinique (+596)',
        value: 'MQ',
    },
    {
        label: 'Mauritania (+222)',
        value: 'MR',
    },
    {
        label: 'Montserrat (+1)',
        value: 'MS',
    },
    {
        label: 'Malta (+356)',
        value: 'MT',
    },
    {
        label: 'Mauritius (+230)',
        value: 'MU',
    },
    {
        label: 'Maldives (+960)',
        value: 'MV',
    },
    {
        label: 'Malawi (+265)',
        value: 'MW',
    },
    {
        label: 'Mexico (+52)',
        value: 'MX',
    },
    {
        label: 'Malaysia (+60)',
        value: 'MY',
    },
    {
        label: 'Mozambique (+258)',
        value: 'MZ',
    },
    {
        label: 'Namibia (+264)',
        value: 'NA',
    },
    {
        label: 'New Caledonia (+687)',
        value: 'NC',
    },
    {
        label: 'Niger (+227)',
        value: 'NE',
    },
    {
        label: 'Norfolk Island (+672)',
        value: 'NF',
    },
    {
        label: 'Nigeria (+234)',
        value: 'NG',
    },
    {
        label: 'Nicaragua (+505)',
        value: 'NI',
    },
    {
        label: 'Netherlands (+31)',
        value: 'NL',
    },
    {
        label: 'Norway (+47)',
        value: 'NO',
    },
    {
        label: 'Nepal (+977)',
        value: 'NP',
    },
    {
        label: 'Nauru (+674)',
        value: 'NR',
    },
    {
        label: 'Niue (+683)',
        value: 'NU',
    },
    {
        label: 'New Zealand (+64)',
        value: 'NZ',
    },
    {
        label: 'Oman (+968)',
        value: 'OM',
    },
    {
        label: 'Panama (+507)',
        value: 'PA',
    },
    {
        label: 'Peru (+51)',
        value: 'PE',
    },
    {
        label: 'French Polynesia (+689)',
        value: 'PF',
    },
    {
        label: 'Papua New Guinea (+675)',
        value: 'PG',
    },
    {
        label: 'Philippines (+63)',
        value: 'PH',
    },
    {
        label: 'Pakistan (+92)',
        value: 'PK',
    },
    {
        label: 'Poland (+48)',
        value: 'PL',
    },
    {
        label: 'Saint Pierre and Miquelon (+508)',
        value: 'PM',
    },
    {
        label: 'Puerto Rico (+1)',
        value: 'PR',
    },
    {
        label: 'State of Palestine (+970)',
        value: 'PS',
    },
    {
        label: 'Portugal (+351)',
        value: 'PT',
    },
    {
        label: 'Palau (+680)',
        value: 'PW',
    },
    {
        label: 'Paraguay (+595)',
        value: 'PY',
    },
    {
        label: 'Qatar (+974)',
        value: 'QA',
    },
    {
        label: 'Reunion (+262)',
        value: 'RE',
    },
    {
        label: 'Romania (+40)',
        value: 'RO',
    },
    {
        label: 'Serbia (+381)',
        value: 'RS',
    },
    {
        label: 'Russian Federation (+7)',
        value: 'RU',
    },
    {
        label: 'Rwanda (+250)',
        value: 'RW',
    },
    {
        label: 'Saudi Arabia (+966)',
        value: 'SA',
    },
    {
        label: 'Solomon Islands (+677)',
        value: 'SB',
    },
    {
        label: 'Seychelles (+248)',
        value: 'SC',
    },
    {
        label: 'Sudan (+249)',
        value: 'SD',
    },
    {
        label: 'Sweden (+46)',
        value: 'SE',
    },
    {
        label: 'Singapore (+65)',
        value: 'SG',
    },
    {
        label: 'Saint Helena (+290)',
        value: 'SH',
    },
    {
        label: 'Slovenia (+386)',
        value: 'SI',
    },
    {
        label: 'Svalbard and Jan Mayen (+47)',
        value: 'SJ',
    },
    {
        label: 'Slovakia (+421)',
        value: 'SK',
    },
    {
        label: 'Sierra Leone (+232)',
        value: 'SL',
    },
    {
        label: 'San Marino (+378)',
        value: 'SM',
    },
    {
        label: 'Senegal (+221)',
        value: 'SN',
    },
    {
        label: 'Somalia (+252)',
        value: 'SO',
    },
    {
        label: 'Suriname (+597)',
        value: 'SR',
    },
    {
        label: 'South Sudan (+211)',
        value: 'SS',
    },
    {
        label: 'Sao Tome and Principe (+239)',
        value: 'ST',
    },
    {
        label: 'El Salvador (+503)',
        value: 'SV',
    },
    {
        label: 'Sint Maarten (Dutch part) (+1)',
        value: 'SX',
    },
    {
        label: 'Syrian Arab Republic (+963)',
        value: 'SY',
    },
    {
        label: 'Eswatini (+268)',
        value: 'SZ',
    },
    {
        label: 'Turks and Caicos Islands (+1)',
        value: 'TC',
    },
    {
        label: 'Chad (+235)',
        value: 'TD',
    },
    {
        label: 'Togo (+228)',
        value: 'TG',
    },
    {
        label: 'Thailand (+66)',
        value: 'TH',
    },
    {
        label: 'Tajikistan (+992)',
        value: 'TJ',
    },
    {
        label: 'Tokelau (+690)',
        value: 'TK',
    },
    {
        label: 'Timor-Leste (+670)',
        value: 'TL',
    },
    {
        label: 'Turkmenistan (+993)',
        value: 'TM',
    },
    {
        label: 'Tunisia (+216)',
        value: 'TN',
    },
    {
        label: 'Tonga (+676)',
        value: 'TO',
    },
    {
        label: 'Türkiye (+90)',
        value: 'TR',
    },
    {
        label: 'Trinidad and Tobago (+1)',
        value: 'TT',
    },
    {
        label: 'Tuvalu (+688)',
        value: 'TV',
    },
    {
        label: 'Taiwan, Province of China (+886)',
        value: 'TW',
    },
    {
        label: 'United Republic of Tanzania (+255)',
        value: 'TZ',
    },
    {
        label: 'Ukraine (+380)',
        value: 'UA',
    },
    {
        label: 'Uganda (+256)',
        value: 'UG',
    },
    {
        label: 'United States of America (+1)',
        value: 'US',
    },
    {
        label: 'Uruguay (+598)',
        value: 'UY',
    },
    {
        label: 'Uzbekistan (+998)',
        value: 'UZ',
    },
    {
        label: 'Holy See (Vatican City State) (+39)',
        value: 'VA',
    },
    {
        label: 'Saint Vincent and the Grenadines (+1)',
        value: 'VC',
    },
    {
        label: 'Venezuela (+58)',
        value: 'VE',
    },
    {
        label: 'Virgin Islands, British (+1)',
        value: 'VG',
    },
    {
        label: 'Virgin Islands, U.S. (+1)',
        value: 'VI',
    },
    {
        label: 'Vietnam (+84)',
        value: 'VN',
    },
    {
        label: 'Vanuatu (+678)',
        value: 'VU',
    },
    {
        label: 'Wallis and Futuna (+681)',
        value: 'WF',
    },
    {
        label: 'Samoa (+685)',
        value: 'WS',
    },
    {
        label: 'Kosovo (+383)',
        value: 'XK',
    },
    {
        label: 'Yemen (+967)',
        value: 'YE',
    },
    {
        label: 'Mayotte (+262)',
        value: 'YT',
    },
    {
        label: 'South Africa (+27)',
        value: 'ZA',
    },
    {
        label: 'Zambia (+260)',
        value: 'ZM',
    },
    {
        label: 'Zimbabwe (+263)',
        value: 'ZW',
    },
];

export const COUNTRY_CODE_LIST: { label: string; value: CountryCdType }[] = [
    {
        label: 'Afghanistan',
        value: 'AF',
    },
    {
        label: 'Albania',
        value: 'AL',
    },
    {
        label: 'Algeria',
        value: 'DZ',
    },
    {
        label: 'American Samoa',
        value: 'AS',
    },
    {
        label: 'Andorra',
        value: 'AD',
    },
    {
        label: 'Angola',
        value: 'AO',
    },
    {
        label: 'Anguilla',
        value: 'AI',
    },
    {
        label: 'Antarctica',
        value: 'AQ',
    },
    {
        label: 'Antigua and Barbuda',
        value: 'AG',
    },
    {
        label: 'Argentina',
        value: 'AR',
    },
    {
        label: 'Armenia',
        value: 'AM',
    },
    {
        label: 'Aruba',
        value: 'AW',
    },
    {
        label: 'Australia',
        value: 'AU',
    },
    {
        label: 'Austria',
        value: 'AT',
    },
    {
        label: 'Azerbaijan',
        value: 'AZ',
    },
    {
        label: 'Bahamas',
        value: 'BS',
    },
    {
        label: 'Bahrain',
        value: 'BH',
    },
    {
        label: 'Bangladesh',
        value: 'BD',
    },
    {
        label: 'Barbados',
        value: 'BB',
    },
    {
        label: 'Belarus',
        value: 'BY',
    },
    {
        label: 'Belgium',
        value: 'BE',
    },
    {
        label: 'Belize',
        value: 'BZ',
    },
    {
        label: 'Benin',
        value: 'BJ',
    },
    {
        label: 'Bermuda',
        value: 'BM',
    },
    {
        label: 'Bhutan',
        value: 'BT',
    },
    {
        label: 'Bolivia',
        value: 'BO',
    },
    {
        label: 'Bosnia and Herzegovina',
        value: 'BA',
    },
    {
        label: 'Botswana',
        value: 'BW',
    },
    {
        label: 'Bouvet Island',
        value: 'BV',
    },
    {
        label: 'Brazil',
        value: 'BR',
    },
    {
        label: 'British Indian Ocean Territory',
        value: 'IO',
    },
    {
        label: 'Brunei Darussalam',
        value: 'BN',
    },
    {
        label: 'Bulgaria',
        value: 'BG',
    },
    {
        label: 'Burkina Faso',
        value: 'BF',
    },
    {
        label: 'Burundi',
        value: 'BI',
    },
    {
        label: 'Cambodia',
        value: 'KH',
    },
    {
        label: 'Cameroon',
        value: 'CM',
    },
    {
        label: 'Canada',
        value: 'CA',
    },
    {
        label: 'Cape Verde',
        value: 'CV',
    },
    {
        label: 'Cayman Islands',
        value: 'KY',
    },
    {
        label: 'Central African Republic',
        value: 'CF',
    },
    {
        label: 'Chad',
        value: 'TD',
    },
    {
        label: 'Chile',
        value: 'CL',
    },
    {
        label: "People's Republic of China",
        value: 'CN',
    },
    {
        label: 'Christmas Island',
        value: 'CX',
    },
    {
        label: 'Cocos (Keeling) Islands',
        value: 'CC',
    },
    {
        label: 'Colombia',
        value: 'CO',
    },
    {
        label: 'Comoros',
        value: 'KM',
    },
    {
        label: 'Republic of the Congo',
        value: 'CG',
    },
    {
        label: 'Democratic Republic of the Congo',
        value: 'CD',
    },
    {
        label: 'Cook Islands',
        value: 'CK',
    },
    {
        label: 'Costa Rica',
        value: 'CR',
    },
    {
        label: "Cote d'Ivoire",
        value: 'CI',
    },
    {
        label: 'Croatia',
        value: 'HR',
    },
    {
        label: 'Cuba',
        value: 'CU',
    },
    {
        label: 'Cyprus',
        value: 'CY',
    },
    {
        label: 'Czech Republic',
        value: 'CZ',
    },
    {
        label: 'Denmark',
        value: 'DK',
    },
    {
        label: 'Djibouti',
        value: 'DJ',
    },
    {
        label: 'Dominica',
        value: 'DM',
    },
    {
        label: 'Dominican Republic',
        value: 'DO',
    },
    {
        label: 'Ecuador',
        value: 'EC',
    },
    {
        label: 'Egypt',
        value: 'EG',
    },
    {
        label: 'El Salvador',
        value: 'SV',
    },
    {
        label: 'Equatorial Guinea',
        value: 'GQ',
    },
    {
        label: 'Eritrea',
        value: 'ER',
    },
    {
        label: 'Estonia',
        value: 'EE',
    },
    {
        label: 'Ethiopia',
        value: 'ET',
    },
    {
        label: 'Falkland Islands (Malvinas)',
        value: 'FK',
    },
    {
        label: 'Faroe Islands',
        value: 'FO',
    },
    {
        label: 'Fiji',
        value: 'FJ',
    },
    {
        label: 'Finland',
        value: 'FI',
    },
    {
        label: 'France',
        value: 'FR',
    },
    {
        label: 'French Guiana',
        value: 'GF',
    },
    {
        label: 'French Polynesia',
        value: 'PF',
    },
    {
        label: 'French Southern Territories',
        value: 'TF',
    },
    {
        label: 'Gabon',
        value: 'GA',
    },
    {
        label: 'Republic of The Gambia',
        value: 'GM',
    },
    {
        label: 'Georgia',
        value: 'GE',
    },
    {
        label: 'Germany',
        value: 'DE',
    },
    {
        label: 'Ghana',
        value: 'GH',
    },
    {
        label: 'Gibraltar',
        value: 'GI',
    },
    {
        label: 'Greece',
        value: 'GR',
    },
    {
        label: 'Greenland',
        value: 'GL',
    },
    {
        label: 'Grenada',
        value: 'GD',
    },
    {
        label: 'Guadeloupe',
        value: 'GP',
    },
    {
        label: 'Guam',
        value: 'GU',
    },
    {
        label: 'Guatemala',
        value: 'GT',
    },
    {
        label: 'Guinea',
        value: 'GN',
    },
    {
        label: 'Guinea-Bissau',
        value: 'GW',
    },
    {
        label: 'Guyana',
        value: 'GY',
    },
    {
        label: 'Haiti',
        value: 'HT',
    },
    {
        label: 'Heard Island and McDonald Islands',
        value: 'HM',
    },
    {
        label: 'Holy See (Vatican City State)',
        value: 'VA',
    },
    {
        label: 'Honduras',
        value: 'HN',
    },
    {
        label: 'Hong Kong',
        value: 'HK',
    },
    {
        label: 'Hungary',
        value: 'HU',
    },
    {
        label: 'Iceland',
        value: 'IS',
    },
    {
        label: 'India',
        value: 'IN',
    },
    {
        label: 'Indonesia',
        value: 'ID',
    },
    {
        label: 'Islamic Republic of Iran',
        value: 'IR',
    },
    {
        label: 'Iraq',
        value: 'IQ',
    },
    {
        label: 'Ireland',
        value: 'IE',
    },
    {
        label: 'Israel',
        value: 'IL',
    },
    {
        label: 'Italy',
        value: 'IT',
    },
    {
        label: 'Jamaica',
        value: 'JM',
    },
    {
        label: 'Japan',
        value: 'JP',
    },
    {
        label: 'Jordan',
        value: 'JO',
    },
    {
        label: 'Kazakhstan',
        value: 'KZ',
    },
    {
        label: 'Kenya',
        value: 'KE',
    },
    {
        label: 'Kiribati',
        value: 'KI',
    },
    {
        label: 'North Korea',
        value: 'KP',
    },
    {
        label: 'South Korea',
        value: 'KR',
    },
    {
        label: 'Kuwait',
        value: 'KW',
    },
    {
        label: 'Kyrgyzstan',
        value: 'KG',
    },
    {
        label: "Lao People's Democratic Republic",
        value: 'LA',
    },
    {
        label: 'Latvia',
        value: 'LV',
    },
    {
        label: 'Lebanon',
        value: 'LB',
    },
    {
        label: 'Lesotho',
        value: 'LS',
    },
    {
        label: 'Liberia',
        value: 'LR',
    },
    {
        label: 'Libya',
        value: 'LY',
    },
    {
        label: 'Liechtenstein',
        value: 'LI',
    },
    {
        label: 'Lithuania',
        value: 'LT',
    },
    {
        label: 'Luxembourg',
        value: 'LU',
    },
    {
        label: 'Macao',
        value: 'MO',
    },
    {
        label: 'Madagascar',
        value: 'MG',
    },
    {
        label: 'Malawi',
        value: 'MW',
    },
    {
        label: 'Malaysia',
        value: 'MY',
    },
    {
        label: 'Maldives',
        value: 'MV',
    },
    {
        label: 'Mali',
        value: 'ML',
    },
    {
        label: 'Malta',
        value: 'MT',
    },
    {
        label: 'Marshall Islands',
        value: 'MH',
    },
    {
        label: 'Martinique',
        value: 'MQ',
    },
    {
        label: 'Mauritania',
        value: 'MR',
    },
    {
        label: 'Mauritius',
        value: 'MU',
    },
    {
        label: 'Mayotte',
        value: 'YT',
    },
    {
        label: 'Mexico',
        value: 'MX',
    },
    {
        label: 'Micronesia, Federated States of',
        value: 'FM',
    },
    {
        label: 'Moldova, Republic of',
        value: 'MD',
    },
    {
        label: 'Monaco',
        value: 'MC',
    },
    {
        label: 'Mongolia',
        value: 'MN',
    },
    {
        label: 'Montserrat',
        value: 'MS',
    },
    {
        label: 'Morocco',
        value: 'MA',
    },
    {
        label: 'Mozambique',
        value: 'MZ',
    },
    {
        label: 'Myanmar',
        value: 'MM',
    },
    {
        label: 'Namibia',
        value: 'NA',
    },
    {
        label: 'Nauru',
        value: 'NR',
    },
    {
        label: 'Nepal',
        value: 'NP',
    },
    {
        label: 'Netherlands',
        value: 'NL',
    },
    {
        label: 'New Caledonia',
        value: 'NC',
    },
    {
        label: 'New Zealand',
        value: 'NZ',
    },
    {
        label: 'Nicaragua',
        value: 'NI',
    },
    {
        label: 'Niger',
        value: 'NE',
    },
    {
        label: 'Nigeria',
        value: 'NG',
    },
    {
        label: 'Niue',
        value: 'NU',
    },
    {
        label: 'Norfolk Island',
        value: 'NF',
    },
    {
        label: 'The Republic of North Macedonia',
        value: 'MK',
    },
    {
        label: 'Northern Mariana Islands',
        value: 'MP',
    },
    {
        label: 'Norway',
        value: 'NO',
    },
    {
        label: 'Oman',
        value: 'OM',
    },
    {
        label: 'Pakistan',
        value: 'PK',
    },
    {
        label: 'Palau',
        value: 'PW',
    },
    {
        label: 'State of Palestine',
        value: 'PS',
    },
    {
        label: 'Panama',
        value: 'PA',
    },
    {
        label: 'Papua New Guinea',
        value: 'PG',
    },
    {
        label: 'Paraguay',
        value: 'PY',
    },
    {
        label: 'Peru',
        value: 'PE',
    },
    {
        label: 'Philippines',
        value: 'PH',
    },
    {
        label: 'Pitcairn',
        value: 'PN',
    },
    {
        label: 'Poland',
        value: 'PL',
    },
    {
        label: 'Portugal',
        value: 'PT',
    },
    {
        label: 'Puerto Rico',
        value: 'PR',
    },
    {
        label: 'Qatar',
        value: 'QA',
    },
    {
        label: 'Reunion',
        value: 'RE',
    },
    {
        label: 'Romania',
        value: 'RO',
    },
    {
        label: 'Russian Federation',
        value: 'RU',
    },
    {
        label: 'Rwanda',
        value: 'RW',
    },
    {
        label: 'Saint Helena',
        value: 'SH',
    },
    {
        label: 'Saint Kitts and Nevis',
        value: 'KN',
    },
    {
        label: 'Saint Lucia',
        value: 'LC',
    },
    {
        label: 'Saint Pierre and Miquelon',
        value: 'PM',
    },
    {
        label: 'Saint Vincent and the Grenadines',
        value: 'VC',
    },
    {
        label: 'Samoa',
        value: 'WS',
    },
    {
        label: 'San Marino',
        value: 'SM',
    },
    {
        label: 'Sao Tome and Principe',
        value: 'ST',
    },
    {
        label: 'Saudi Arabia',
        value: 'SA',
    },
    {
        label: 'Senegal',
        value: 'SN',
    },
    {
        label: 'Seychelles',
        value: 'SC',
    },
    {
        label: 'Sierra Leone',
        value: 'SL',
    },
    {
        label: 'Singapore',
        value: 'SG',
    },
    {
        label: 'Slovakia',
        value: 'SK',
    },
    {
        label: 'Slovenia',
        value: 'SI',
    },
    {
        label: 'Solomon Islands',
        value: 'SB',
    },
    {
        label: 'Somalia',
        value: 'SO',
    },
    {
        label: 'South Africa',
        value: 'ZA',
    },
    {
        label: 'South Georgia and the South Sandwich Islands',
        value: 'GS',
    },
    {
        label: 'Spain',
        value: 'ES',
    },
    {
        label: 'Sri Lanka',
        value: 'LK',
    },
    {
        label: 'Sudan',
        value: 'SD',
    },
    {
        label: 'Suriname',
        value: 'SR',
    },
    {
        label: 'Svalbard and Jan Mayen',
        value: 'SJ',
    },
    {
        label: 'Eswatini',
        value: 'SZ',
    },
    {
        label: 'Sweden',
        value: 'SE',
    },
    {
        label: 'Switzerland',
        value: 'CH',
    },
    {
        label: 'Syrian Arab Republic',
        value: 'SY',
    },
    {
        label: 'Taiwan, Province of China',
        value: 'TW',
    },
    {
        label: 'Tajikistan',
        value: 'TJ',
    },
    {
        label: 'United Republic of Tanzania',
        value: 'TZ',
    },
    {
        label: 'Thailand',
        value: 'TH',
    },
    {
        label: 'Timor-Leste',
        value: 'TL',
    },
    {
        label: 'Togo',
        value: 'TG',
    },
    {
        label: 'Tokelau',
        value: 'TK',
    },
    {
        label: 'Tonga',
        value: 'TO',
    },
    {
        label: 'Trinidad and Tobago',
        value: 'TT',
    },
    {
        label: 'Tunisia',
        value: 'TN',
    },
    {
        label: 'Türkiye',
        value: 'TR',
    },
    {
        label: 'Turkmenistan',
        value: 'TM',
    },
    {
        label: 'Turks and Caicos Islands',
        value: 'TC',
    },
    {
        label: 'Tuvalu',
        value: 'TV',
    },
    {
        label: 'Uganda',
        value: 'UG',
    },
    {
        label: 'Ukraine',
        value: 'UA',
    },
    {
        label: 'United Arab Emirates',
        value: 'AE',
    },
    {
        label: 'United Kingdom',
        value: 'GB',
    },
    {
        label: 'United States of America',
        value: 'US',
    },
    {
        label: 'United States Minor Outlying Islands',
        value: 'UM',
    },
    {
        label: 'Uruguay',
        value: 'UY',
    },
    {
        label: 'Uzbekistan',
        value: 'UZ',
    },
    {
        label: 'Vanuatu',
        value: 'VU',
    },
    {
        label: 'Venezuela',
        value: 'VE',
    },
    {
        label: 'Vietnam',
        value: 'VN',
    },
    {
        label: 'Virgin Islands, British',
        value: 'VG',
    },
    {
        label: 'Virgin Islands, U.S.',
        value: 'VI',
    },
    {
        label: 'Wallis and Futuna',
        value: 'WF',
    },
    {
        label: 'Western Sahara',
        value: 'EH',
    },
    {
        label: 'Yemen',
        value: 'YE',
    },
    {
        label: 'Zambia',
        value: 'ZM',
    },
    {
        label: 'Zimbabwe',
        value: 'ZW',
    },
    {
        label: 'Åland Islands',
        value: 'AX',
    },
    {
        label: 'Bonaire, Sint Eustatius and Saba',
        value: 'BQ',
    },
    {
        label: 'Curaçao',
        value: 'CW',
    },
    {
        label: 'Guernsey',
        value: 'GG',
    },
    {
        label: 'Isle of Man',
        value: 'IM',
    },
    {
        label: 'Jersey',
        value: 'JE',
    },
    {
        label: 'Montenegro',
        value: 'ME',
    },
    {
        label: 'Saint Barthélemy',
        value: 'BL',
    },
    {
        label: 'Saint Martin (French part)',
        value: 'MF',
    },
    {
        label: 'Serbia',
        value: 'RS',
    },
    {
        label: 'Sint Maarten (Dutch part)',
        value: 'SX',
    },
    {
        label: 'South Sudan',
        value: 'SS',
    },
    {
        label: 'Kosovo',
        value: 'XK',
    },
];

const STATE_LIST = [
    {
        label: 'New York',
        value: 'NY',
    },
    {
        label: 'Pennsylvania',
        value: 'PA',
    },
    {
        label: 'Tennessee',
        value: 'TN',
    },
    {
        label: 'Virgin Islands, U.S.',
        value: 'VI',
    },
    {
        label: 'Nevada',
        value: 'NV',
    },
    {
        label: 'New Jersey',
        value: 'NJ',
    },
    {
        label: 'New Hampshire',
        value: 'NH',
    },
    {
        label: 'Virginia',
        value: 'VA',
    },
    {
        label: 'Hawaii',
        value: 'HI',
    },
    {
        label: 'Puerto Rico',
        value: 'PR',
    },
    {
        label: 'New Mexico',
        value: 'NM',
    },
    {
        label: 'North Carolina',
        value: 'NC',
    },
    {
        label: 'North Dakota',
        value: 'ND',
    },
    {
        label: 'Nebraska',
        value: 'NE',
    },
    {
        label: 'Louisiana',
        value: 'LA',
    },
    {
        label: 'Utah',
        value: 'UT',
    },
    {
        label: 'South Dakota',
        value: 'SD',
    },
    {
        label: 'District of Columbia',
        value: 'DC',
    },
    {
        label: 'Delaware',
        value: 'DE',
    },
    {
        label: 'Florida',
        value: 'FL',
    },
    {
        label: 'Washington',
        value: 'WA',
    },
    {
        label: 'United States Minor Outlying Islands',
        value: 'UM',
    },
    {
        label: 'Kansas',
        value: 'KS',
    },
    {
        label: 'Wisconsin',
        value: 'WI',
    },
    {
        label: 'Oregon',
        value: 'OR',
    },
    {
        label: 'Kentucky',
        value: 'KY',
    },
    {
        label: 'Maine',
        value: 'ME',
    },
    {
        label: 'Ohio',
        value: 'OH',
    },
    {
        label: 'Iowa',
        value: 'IA',
    },
    {
        label: 'Maryland',
        value: 'MD',
    },
    {
        label: 'Idaho',
        value: 'ID',
    },
    {
        label: 'Wyoming',
        value: 'WY',
    },
    {
        label: 'Vermont',
        value: 'VT',
    },
    {
        label: 'Rhode Island',
        value: 'RI',
    },
    {
        label: 'Indiana',
        value: 'IN',
    },
    {
        label: 'Illinois',
        value: 'IL',
    },
    {
        label: 'Alaska',
        value: 'AK',
    },
    {
        label: 'Texas',
        value: 'TX',
    },
    {
        label: 'Colorado',
        value: 'CO',
    },
    {
        label: 'Arkansas',
        value: 'AR',
    },
    {
        label: 'Guam',
        value: 'GU',
    },
    {
        label: 'Massachusetts',
        value: 'MA',
    },
    {
        label: 'Alabama',
        value: 'AL',
    },
    {
        label: 'Missouri',
        value: 'MO',
    },
    {
        label: 'Minnesota',
        value: 'MN',
    },
    {
        label: 'West Virginia',
        value: 'WV',
    },
    {
        label: 'California',
        value: 'CA',
    },
    {
        label: 'Oklahoma',
        value: 'OK',
    },
    {
        label: 'Michigan',
        value: 'MI',
    },
    {
        label: 'Georgia',
        value: 'GA',
    },
    {
        label: 'Arizona',
        value: 'AZ',
    },
    {
        label: 'Montana',
        value: 'MT',
    },
    {
        label: 'Mississippi',
        value: 'MS',
    },
    {
        label: 'South Carolina',
        value: 'SC',
    },
    {
        label: 'Northern Mariana Islands',
        value: 'MP',
    },
    {
        label: 'American Samoa',
        value: 'AS',
    },
    {
        label: 'Connecticut',
        value: 'CT',
    },
];

export const CANADA_STATE_LIST = [
    {
        label: 'Alberta',
        value: 'AB',
    },
    {
        label: 'British Columbia',
        value: 'BC',
    },
    {
        label: 'Manitoba',
        value: 'MB',
    },
    {
        label: 'New Brunswick',
        value: 'NB',
    },
    {
        label: 'Newfoundland and Labrador',
        value: 'NL',
    },
    {
        label: 'Northwest Territories',
        value: 'NT',
    },
    {
        label: 'Nova Scotia',
        value: 'NS',
    },
    {
        label: 'Nunavut',
        value: 'NU',
    },
    {
        label: 'Ontario',
        value: 'ON',
    },
    {
        label: 'Prince Edward Island',
        value: 'PE',
    },
    {
        label: 'Quebec',
        value: 'QC',
    },
    {
        label: 'Saskatchewan',
        value: 'SK',
    },
    {
        label: 'Yukon',
        value: 'YT',
    },
];

export const CASH_RECEIPT_KEY_TYPE_LIST = [
    {
        label: '휴대폰번호',
        value: 'MOBILE_NO',
    },
    {
        label: '사업자 번호',
        value: 'BUSINESS_NO',
    },
    {
        label: '카드번호',
        value: 'CARD_NO',
    },
    {
        label: '자진발급 번호 (국세청 지정 고정번호)',
        value: 'VOLUNTARY_NO',
    },
];

export const CASH_RECEIPT_RADIO_LIST = [
    {
        label: '소득공제용',
        value: 'INCOME_TAX_DEDUCTION',
    },
    {
        label: '지출증빙용',
        value: 'PROOF_EXPENDITURE',
    },
];
