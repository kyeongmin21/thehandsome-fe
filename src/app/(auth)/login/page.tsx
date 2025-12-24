'use client'

import {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import {signIn} from 'next-auth/react';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Link from 'next/link';
import {loginSchema} from '@/utils/validators/join.schema';
import {ERROR_MESSAGES} from '@/constants/errorMsg';
import type {z} from 'zod';

// 2. 스키마에서 타입 자동 생성
type LoginFormData = z.infer<typeof loginSchema>;

interface ErrorItem {
    field: 'user_id' | 'password';
    code: string;
}

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // 3. useForm에 타입 전달
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: {errors, isValid},
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            user_id: '',
            password: ''
        }
    });

    // 4. 입력값 실시간 감시
    const idValue = watch('user_id');
    const passwordValue = watch('password');

    // 5. 제출 핸들러 타입 지정
    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setLoading(true);
        const result = await signIn('credentials', {
            redirect: false, // 리다이렉트 방지
            user_id: data.user_id,
            password: data.password
        })

        setLoading(false);

        if (!result) {
            alert('로그인 처리 중 오류가 발생했습니다.');
            return;
        }

        if (result?.ok) {
            alert('로그인 되었습니다.')
            router.push('/');
        } else {
            if (result.error) {
                try {
                    const msg: ErrorItem[] = JSON.parse(result.error)
                    if (Array.isArray(msg)) {
                        msg.forEach(({field, code}) => {
                            const message = (ERROR_MESSAGES as Record<string, any>)[code];
                            if (message) {
                                setError(field, {type: 'manual', message});
                            }
                        });
                    }
                } catch (error) {
                    console.error('parsing error', error);
                    alert('로그인정보가 올바르지 않습니다.');
                }
            }

        }
    }

    return (
        <div className='flex-center'>
            {loading && <LoadingSpinner fullScreen />}
            <div className='auth-container'>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UiInput
                        {...register('user_id')}
                        className='mt-3'
                        placeholder='아이디를 입력해 주세요.'/>
                    <ErrorMessage message={errors.user_id?.message}/>
                    <UiInput
                        {...register('password')}
                        type='password'
                        className='mt-3 input-pw'
                        placeholder='비밀번호를 입력해 주세요.'/>
                    <ErrorMessage message={errors.password?.message}/>
                    <UiButton
                        type='submit'
                        disabled={!isValid}
                        size='m'
                        btnText='로그인'
                        color={idValue && passwordValue && isValid ? 'blackFill' : 'grayFill'}
                        className='w-full mt-7'/>
                </form>

                <Link href='/join' aria-label='회원가입 이동'>
                    <UiButton
                        size='m'
                        color='grayOutline'
                        className='w-full'
                        btnText='회원가입'/>
                </Link>

                <div className='find-info'>
                    <ul>
                        <li><Link href='/find-id' aria-label='아이디 찾기로 이동'>아이디 찾기</Link></li>
                        <li>비밀번호 찾기</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;