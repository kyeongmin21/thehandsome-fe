import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, '상품명을 입력해주세요'),
    price: z.union([z.string(), z.number()])
        .refine((value) => !isNaN(Number(value)), {
            message: '가격은 숫자만 가능합니다.'
        }),
});