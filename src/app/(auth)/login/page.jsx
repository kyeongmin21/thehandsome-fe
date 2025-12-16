'use client'
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from 'next-auth/react';
import UiButton from "@/components/ui/UiButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Link from "next/link";
import UiInput from "@/components/ui/UiInput";
import {loginSchema} from "@/utils/validators/join.schema";
import {ERROR_MESSAGES} from "@/constants/errorMsg";
import {useState} from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: {errors, isValid},
    } = useForm({
        zodResolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            user_id: '',
            password: ''
        }
    });

    const idValue = watch('user_id');
    const passwordValue = watch("password");

    const onSubmit = async (data) => {
        setLoading(true);
        const result = await signIn('credentials', {
            redirect: false, // 리다이렉트 방지
            user_id: data.user_id,
            password: data.password
        })

        setLoading(false);

        if (result?.ok) {
            alert('로그인 되었습니다.')
            router.push("/");
        } else {
            const msg = JSON.parse(result.error)
            if (Array.isArray(msg)) {
                msg.forEach(({field, code}) => {
                    const message = ERROR_MESSAGES[code].message;
                    if (message) {
                        setError(field, {type: "manual", message});
                    }
                });
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
                        type="password"
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