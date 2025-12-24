import {z} from 'zod';

export const requiredString = z.string().min(1, '값을 입력해주세요');
export const trimmedString = z.string().trim().min(1, '공백만 입력은 안돼요');

export const emailSchema = z.string().email('유효한 이메일을 입력해주세요');
export const passwordSchema = z.string()
    .min(8, '8자 이상')
    .regex(/[A-Z]/, '대문자 포함')
    .regex(/[0-9]/, '숫자 포함');

export const priceSchema = z.union([z.string(), z.number()])
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: '가격은 숫자만 입력 가능하고 0 이상이어야 합니다',
    });

export const idSchema = z.number().int().positive();
export const optionalString = z.string().optional();
export const nullableNumber = z.number().nullable();