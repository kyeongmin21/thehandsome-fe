'use client'
import Link from "next/link";
import apiHelper from "@/api/apiHelper";
import UiInput from "@/components/ui/UiInput";
import UiButton from "@/components/ui/UiButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isValid},
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
        try {
            const res = await apiHelper.post("/login", data);
            router.push("/")
        } catch (error) {
            const msg = error?.response?.data.detail

            const errorMap = {
                NO_ID: {field: "user_id", message: "존재하지 않는 아이디입니다."},
                INVALID_PASSWORD: {field: "password", message: "비밀번호가 올바르지 않습니다."},
            };

            if (msg?.code && errorMap[msg.code]) {
                const { field, message } = errorMap[msg.code];
                setError(field, { type: "manual", message });
            } else {
                console.error("Unhandled error:", msg);
            }
        }
    }

    const handleKakaoLogin = (e) => {}

    return (
        <div className='flex-center'>
            <div className='auth-container'>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UiInput
                        {...register('user_id')}
                        className='mt-3'
                        placeholder='아이디를 입력해 주세요.'/>
                        <ErrorMessage message={errors.user_id?.message} />
                    <UiInput
                        {...register('password')}
                        type="password"
                        className='mt-3 input-pw'
                        placeholder='비밀번호를 입력해 주세요.'/>
                        <ErrorMessage message={errors.password?.message} />
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