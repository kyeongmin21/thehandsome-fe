'use client'
import {useState} from "react";
import {useForm} from "react-hook-form";
import UiButton from "@/components/ui/UiButton";
import UiInput from "@/components/ui/UiInput";
import apiHelper from "@/utils/apiHelper";

const FindIdPage = () => {
    const [foundId, setFoundId] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isValid},
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        console.log('data' , data.email);
        try {
            const res = await apiHelper.post(
                "/find/id",
                { email: data.email }
            );
            setFoundId(res.user_id); // 받은 아이디 상태에 저장
        } catch (error) {
            console.error("아이디 찾기 실패:", error);
            alert(error?.response?.data?.detail || "아이디를 찾을 수 없습니다.");
            setFoundId("");
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
                    {errors.email && <div className="text-red-500 mt-1 text-sm">이메일을 입력해 주세요.</div>}
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