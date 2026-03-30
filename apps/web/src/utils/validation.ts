export const onlyNumberFormatter = (inputString: string) => {
    const numberCheck = /^[0-9]+$/;
    if (numberCheck.test(inputString)) {
        return inputString;
    } else {
        return inputString.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }
};

export const regEx = {
    guestPassword:
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~])[A-Za-z\d!@#$%^&*()_+~]{8,12}$/,
    password:
        /^(?:(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*]))(?=.{10,})|(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,9}).*$/,
    // eslint-disable-next-line
    email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    continueWordFour: /(\w)\1\1\1/,
    birthday:
        /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    customsId: /^[p|P][1-6]{1}[0-9]{11}$/,

    number: /[0-9]/g,
    notNumber: /[^0-9]/g,
    negativeNumber: /[0-9-]+/g,
    decimalNumber: /[0-9.]+/g,
    eng: /[a-zA-Z]/g,
    ko: /[ㄱ-힣]/g,
    koEng: /[a-zA-Z0-9ㄱ-힣]/g,
    currency: /[0-9,]/g,
    at: /@/g,
    noSpace: /\s/g, // 공백만 불가
    space: /(?:\r\n|\r|\n)/g, // 줄바꿈
    noCommonSpecial: /['"<>₩\\`'"]/gi, // 공통 제한 문자 불가
    noPartSpecial: /['"'"<>\\`(),:;@[\]\s]/g, // 일부 특수문자('"<>\`(),:;@[])와 공백 불가
    noSpecialSpace: /[^a-zA-Z0-9ㄱ-힣\s]/g, // 한글, 영문, 숫자, 공백만 가능
    /* eslint-disable */
    userid: /[^a-zA-Z0-9@\._\-]/g,
    passwordSpecial: /[!@#$%^&+=\-_.()]/g, // 특수문자 : ! @ # $ % ^ & + = - _ . ( ) 만 사용 가능
    emailId: /^[_A-Za-z0-9-\\+]+(.[_A-Za-z0-9-]+)$/,
    emailDomain: /^[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
    // email: /[_A-Za-z0-9-\\+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$/,
    mobileNo: /(\d{11,12})/g,
    // birthday:
    //     /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    // customsId: /^[p|P][1-6]{1}[0-9]{11}$/, // 개인통관고유번호 (숫자, 영어 p가 아닌 영어, p + 영어, 한글, p+특수문자 제외)
    engNumber: /[^0-9a-zA-Z]/g, //영문, 숫자만 가능
    imageExtension: /.(bmp|png|jpg|jpeg|gif)$/i,
    bankDepositorName: /[^a-zA-Zㄱ-힣!@#$%^&+=\-_.()]/g, //한글,영문대소문자,특수문자 : ! @ # $ % ^ & + = - _ . ( ) 만 사용 가능
    phone: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
    phoneNumberIncludeSafeNumber:
        /^01[0|1|6|7|8|9]([0-9]{3,4})([0-9]{4})$|050[0-9]{1}([0-9]{3,4})([0-9]{4})$/,
    /* eslint-enable */
    /** 회원 아이디 영문자(소,대), 숫자 8~16자리 */
    memberId: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/,
    memberIdNew: /^[a-zA-Z0-9_]{5,}$/,
};

export const idPasswordChecker = ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const id = email.split('@')[0];

    if (id.length <= 4) {
        if (password.includes(id)) {
            return false;
        }
        return true;
    }

    for (let i = 0; i < id.length; i++) {
        const slicedId = id.slice(i, 4 + i);

        if (slicedId.length < 4) {
            break;
        }

        if (password.includes(slicedId)) {
            return false;
        }
    }

    return true;
};

export const passwordChecker = ({
    email,
    password,
}: {
    email: string;
    password: string;
}): {
    value: boolean;
    message?: string;
} => {
    if (!password) {
        return {
            value: false,
            message: '패스워드를 입력해주세요.',
        };
    }

    if (!regEx.password.test(password)) {
        return {
            value: false,
            message: '비밀번호 형식에 맞게 입력해주세요',
        };
    }

    if (regEx.continueWordFour.test(password)) {
        return {
            value: false,
            message:
                '연속된 문자, 숫자의(4자리 이상) 비밀번호를 사용하지 마세요',
        };
    }

    if (!idPasswordChecker({ email, password })) {
        return {
            value: false,
            message: '아이디와 동일한(4자리 이상) 비밀번호를 사용하지 마세요',
        };
    }

    return {
        value: true,
    };
};

export const maxLengthCheck = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > e.currentTarget.maxLength) {
        e.currentTarget.value = e.currentTarget.value.slice(
            0,
            e.currentTarget.maxLength,
        );
    }
};

export const isChild = (birthDay: string | number) => {
    const today = new Date();
    const year = today.getFullYear();
    const month =
        today.getMonth() < 9
            ? '0' + (today.getMonth() + 1)
            : today.getMonth() + 1;
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();

    const currentDate = parseInt(`${year}${month}${day}`);
    const userBirthDay =
        typeof birthDay === 'number' ? birthDay : parseInt(birthDay);

    return currentDate - userBirthDay - 140000 < 0;
};
