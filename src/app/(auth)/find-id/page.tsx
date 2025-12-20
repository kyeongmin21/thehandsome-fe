'use client'
import {JSX, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import UiButton from "@/components/ui/UiButton";
import UiInput from "@/components/ui/UiInput";
import apiHelper from "@/utils/apiHelper";


interface FindIdForm {
    email: string;
}

interface FindIdResponse {
    user_id: string;
}


const FindIdPage = (): JSX.Element => {
    const [foundId, setFoundId] = useState<string>('');

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm<FindIdForm>({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<FindIdForm> = async (data) => {
        try {
            const res = await apiHelper.post<FindIdResponse>(
                "/find/id",
                { email: data.email }
            );
            setFoundId(res.user_id);
        } catch (error: any) {
            const details = error.response?.data?.detail;
            if (details && details.length > 0) {
                setError('email', {
                    type: 'server',
                    message: '올바른 이메일 주소가 아닙니다.'
                });
            } else {
                alert('알 수 없는 에러가 발생했습니다.');
            }
        }
    }

    return (
        <div className='flex-center'>
            <div className='auth-container'>
                <h1>아이디 찾기</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UiInput
                        label="이메일"
                        {...register('email', { required: true })}
                        placeholder='이메일을 입력해 주세요.'
                    />
                    {errors.email && <div className="text-red-500 mt-1 text-sm">{errors.email.message}</div>}
                    <UiButton
                        type='submit'
                        size='m'
                        className='w-full mt-7'
                        btnText='확인'
                    />
                </form>

                {foundId && (
                    <p className="mt-5 text-green-600 text-sm">
                        회원님의 아이디는 <strong>{foundId}</strong> 입니다.
                    </p>
                )}
            </div>
        </div>
    )
}

export default FindIdPage;