import { joinSchema, loginSchema } from '@/utils/validators/join.schema';

describe('joinSchema', () => {
    test('정상 데이터는 통과한다', () => {
        expect(
            joinSchema.safeParse({
                name: '김민님',
                email: 'test@example.com',
                user_id: 'min1234',
                password: 'abc12345',
                passwordConfirm: 'abc12345',
                phone: '01012345678',
            }).success
        ).toBe(true);
    });

    test('비밀번호가 다르면 실패한다', () => {
        const result = joinSchema.safeParse({
            name: '김민님',
            email: 'test@example.com',
            user_id: 'min1234',
            password: 'abc12345',
            passwordConfirm: 'abc99999',
            phone: '01012345678',
        });

        expect(result.success).toBe(false);
    });
});

describe('loginSchema', () => {
    test('정상 로그인은 통과한다', () => {
        expect(
            loginSchema.safeParse({
                user_id: 'min1234',
                password: 'abc12345',
            }).success
        ).toBe(true);
    });
});
