'use client'
import Link from "next/link";
import UiInput from "@/components/ui/UiInput";
import UiButton from "@/components/ui/UiButton";
import { useForm } from "react-hook-form";
import apiHelper from "@/api/apiHelper";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid},
    } = useForm({
        mode: "onChange",
        defaultValues: {
            user_id: '',
            password: ''
        }
    });

    const idValue = watch('user_id');
    const passwordValue = watch("password");

    const onSubmit = async (data) => {
        console.log('데이타', data)
        try {
            const res = await apiHelper.post("/login", data);
            console.log('res 확인', res);
        } catch (error) {
            console.log('에러확인', error);
        }
    }

    const handleKakaoLogin = (e) => {
    }

    return (
        <div className='flex-center'>
            <div className='auth-container'>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UiInput
                        {...register('user_id')}
                        className='mt-3'
                        placeholder='아이디를 입력해 주세요.'/>
                    <UiInput
                        {...register('password')}
                        type="password"
                        className='mt-3 input-pw'
                        placeholder='비밀번호를 입력해 주세요.'/>
                    <UiButton
                        type='submit'
                        size='m'
                        btnText='로그인'
                        color={idValue && passwordValue && isValid ? 'blackFill' : 'grayFill'}
                        className='mt-7 w-full'/>
                </form>
                <UiButton
                    onClick={handleKakaoLogin}
                    size='m'
                    color='yellowFill'
                    btnText='카카오 간편로그인'
                    btnIcon=''/>

                <Link href='/join'>
                    <UiButton
                        size='m'
                        color='grayOutline'
                        className='w-full'
                        btnText='회원가입'/>
                </Link>

                <div className='find-info'>
                    <ul>
                        <li>아이디 찾기</li>
                        <li>비밀번호 찾기</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;