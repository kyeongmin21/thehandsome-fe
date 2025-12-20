
export const ERROR_MESSAGES = {
    NO_ID: { field: "user_id", message: "존재하지 않는 아이디입니다." },
    INVALID_PASSWORD: { field: "password", message: "비밀번호가 올바르지 않습니다." },

    USER_ID_TAKEN: { field: "user_id", message: "이미 사용 중인 아이디입니다." },
    EMAIL_TAKEN: { field: "email", message: "이미 사용 중인 이메일입니다." },
    PHONE_TAKEN: { field: "phone", message: "이미 사용 중인 폰번호입니다." },

    UNKNOWN_ERROR: { field: null, message: "알 수 없는 오류가 발생했습니다." },
} as const;
