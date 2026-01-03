import { loginSchema, registerSchema } from '@/utils/validators/user.schema';

describe('loginSchema', () => {
    test('정상적인 로그인 데이터는 통과한다', () => {
        const result = loginSchema.safeParse({
            email: 'test@example.com',
            password: '123456',
        });

        expect(result.success).toBe(true);
    });

    test('이메일 형식이 아니면 실패한다', () => {
        const result = loginSchema.safeParse({
            email: 'test',
            password: '123456',
        });

        expect(result.success).toBe(false);
    });

    test('비밀번호가 6자 미만이면 실패한다', () => {
        const result = loginSchema.safeParse({
            email: 'test@example.com',
            password: '123',
        });

        expect(result.success).toBe(false);
    });
});

describe('registerSchema', () => {
    test('정상적인 회원가입 데이터는 통과한다', () => {
        const result = registerSchema.safeParse({
            email: 'test@example.com',
            password: '123456',
            name: '민님',
        });

        expect(result.success).toBe(true);
    });

    test('이름이 2자 미만이면 실패한다', () => {
        const result = registerSchema.safeParse({
            email: 'test@example.com',
            password: '123456',
            name: '민',
        });

        expect(result.success).toBe(false);
    });

    test('이메일이 없으면 실패한다', () => {
        const result = registerSchema.safeParse({
            email: '',
            password: '123456',
            name: '민님',
        });

        expect(result.success).toBe(false);
    });
});
