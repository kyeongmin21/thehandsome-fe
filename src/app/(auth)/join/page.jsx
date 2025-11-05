'use client'
import apiHelper from "@/api/apiHelper";
import UiInput from "@/components/ui/UiInput";
import UiButton from "@/components/ui/UiButton";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinSchema } from "@/utils/validators/join.schema";


const JoinPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(joinSchema),
        mode: "onChange",
        defaultValues: {
            name: '',
            email: '',
            user_id: '',
            password: '',
            passwordConfirm: '',
            phone: '',
            login_type: '',
        }
    })

    // 폼 값을 실시간으로 확인 (버튼 활성화 및 데이터 합치기에 사용)
    const idValue = watch('user_id');
    const passwordValue = watch("password");

    const onSubmit = async (data) => {
        try {
            const res = await apiHelper.post("/user/create", data)
            alert(`${data.name}님 회원가입이 완료되었습니다.`)
            router.push("/")
        } catch (error) {
            const msg = error?.response?.data.detail

            if (Array.isArray(msg)) {
                const errorMessages = {
                    USER_ID_TAKEN: "이미 사용 중인 아이디입니다.",
                    EMAIL_TAKEN: "이미 사용 중인 이메일입니다.",
                    PHONE_TAKEN: "이미 사용 중인 폰번호입니다.",
                };

                msg.forEach(({ field, code }) => {
                    const message = errorMessages[code];
                    if (message) {
                        setError(field, { type: "manual", message });
                    }
                });
            }

        }
    }

    const ErrorMessage = ({ message }) => {
        return message ? (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {message}
            </div>
        ) : null;
    };
    
    return (
        <div className='flex-center'>
            <div className='auth-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                <h1>회원가입</h1>

                <UiInput
                    label="이름"
                    name='name'
                    className='mt-5'
                    {...register('name')}
                    placeholder='이름을 입력해 주세요.'/>
                    <ErrorMessage message={errors.name?.message} />

                <UiInput
                    label="이메일"
                    {...register('email')}
                    className='mt-5'
                    placeholder='이메일을 입력해 주세요.' />
                <ErrorMessage message={errors.email?.message} />

                <UiInput
                    label="아이디"
                    {...register('user_id')}
                    className='mt-5'
                    placeholder='아이디를 입력해 주세요.' />
                    <ErrorMessage message={errors.user_id?.message} />

                <UiInput
                    label="비밀번호"
                    {...register('password')}
                    type="password"
                    className='mt-5 input-pw'
                    placeholder='비밀번호를 입력해 주세요. (15자 이내)' />
                    <ErrorMessage message={errors.password?.message} />

                <UiInput
                    label="비밀번호 확인"
                    {...register('passwordConfirm')}
                    type="password"
                    className='mt-5 input-pw'
                    placeholder='비밀번호를 입력해 주세요. (15자 이내)' />
                    <ErrorMessage message={errors.passwordConfirm?.message} />

                <UiInput
                    label="폰번호"
                    {...register('phone')}
                    className='mt-5'
                    placeholder='- 제외한 숫자만 입력해 주세요.' />
                    <ErrorMessage message={errors.phone?.message} />

                <UiButton
                    type='submit'
                    size='m'
                    btnText='회원가입'
                    color={idValue && passwordValue && isValid ? 'blackFill' : 'grayFill'}
                    className='w-full mt-7' />
                </form>
            </div>
        </div>
    )
}

export default JoinPage