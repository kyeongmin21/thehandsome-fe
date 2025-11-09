'use client'
import Link from "next/link";
import apiHelper from "@/api/apiHelper";
import useUserStore from "@/store/userStore";
import UiInput from "@/components/ui/UiInput";
import UiButton from "@/components/ui/UiButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/validators/join.schema";
import { ERROR_MESSAGES } from "@/constants/errorMsg";

const LoginPage = () => {
    const router = useRouter();
    const { setUser } = useUserStore();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isValid},
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
        await apiHelper.post("/login", data)
            .then((res) => {
                const { access_token, user } = res;
                sessionStorage.setItem("accessToken", access_token);
                setUser({
                    accessToken: access_token,
                    userId: user.user_id,
                    userName: user.name
                });
                alert('로그인 되었습니다.')
                router.push("/");
            })
            .catch((error) => {
                const msg = error?.response?.data.detail

                if (Array.isArray(msg)) {
                    msg.forEach(({ field, code }) => {
                        const message = ERROR_MESSAGES[code].message;
                        if (message) {
                            setError(field, { type: "manual", message });
                        }
                    });
                }
            })
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
                        disabled={!isValid}
                        size='m'
                        btnText='로그인'
                        color={idValue && passwordValue && isValid ? 'blackFill' : 'grayFill'}
                        className='w-full mt-7' />
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