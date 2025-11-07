import { z } from 'zod';

export const joinSchema = z.object({
    name: z
        .string()
        .min(1, "이름을 입력해주세요.")
        .regex(/^[가-힣a-zA-Z]+$/, "이름은 한글 또는 영어만 입력 가능합니다."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    user_id: z.string().min(4, "아이디는 4자 이상이어야 합니다."),
    password: z
        .string()
        .min(8, "비밀번호는 8자 이상이어야 합니다.")
        .max(15, "비밀번호는 15자 이내여야 합니다.")
        // 글자(영문 대소문자)와 숫자 조합을 필수로 포함 (하나 이상씩)
        .regex(/[a-zA-Z]/, "비밀번호는 최소 하나의 글자를 포함해야 합니다.")
        .regex(/[0-9]/, "비밀번호는 최소 하나의 숫자를 포함해야 합니다."),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    phone: z
        .string()
        .regex(/^[0-9]{10,11}$/, "휴대폰 번호는 숫자 10~11자리로 입력해주세요."), // 10~11자리 숫자만
}).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
});



export const loginSchema = z.object({
    user_id: z.string().min(4, "아이디는 4자 이상이어야 합니다."),
    password: z
        .string()
        .min(8, "비밀번호는 8자 이상이어야 합니다.")
        .max(15, "비밀번호는 15자 이내여야 합니다.")
        // 글자(영문 대소문자)와 숫자 조합을 필수로 포함 (하나 이상씩)
        .regex(/[a-zA-Z]/, "비밀번호는 최소 하나의 글자를 포함해야 합니다.")
        .regex(/[0-9]/, "비밀번호는 최소 하나의 숫자를 포함해야 합니다."),

})