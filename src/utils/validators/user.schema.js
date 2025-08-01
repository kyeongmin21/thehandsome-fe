import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("이메일이 형식이 아닙니다."),
    password: z.string().min(6, "비밀번호는 최소 6자입니다."),
});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
});
