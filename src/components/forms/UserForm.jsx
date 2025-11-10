import UiInput from "@/components/ui/UiInput";
import ErrorMessage from "@/components/ui/ErrorMessage";
import UiButton from "@/components/ui/UiButton";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {joinSchema} from "@/utils/validators/join.schema";
import apiHelper from "@/utils/apiHelper";
import {ERROR_MESSAGES} from "@/constants/errorMsg";


const UserForm = ({isEdit}) => {
    const router = useRouter();

    const {
        watch,
        reset,
        register,
        setError,
        handleSubmit,
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
            address: '',
            birth_date: '',
        }
    })

    // 폼 값을 실시간으로 확인 (버튼 활성화 및 데이터 합치기에 사용)
    const idValue = watch('user_id');
    const passwordValue = watch("password");

    const onSubmit = async (data) => {

        if (isEdit) {
            const fieldsToWatch = ['address', 'marketing_agree', 'birth_date'];
            fieldsToWatch.forEach(name => {
                if (data[name] === undefined) {
                    data[name] = watch(name);
                }
            });
        }
        try {
            if (isEdit) {
                const res = await apiHelper.put("/mypage/me", data)
                alert(`회원정보가 수정되었습니다.`)
                router.push('/mypage')
            } else {
                const res = await apiHelper.post(
                    "/join",
                    data,
                    )
                alert(`${data.name}님 회원가입이 완료되었습니다.`)
                router.push("/login")
            }
        } catch (error) {
            const msg = error?.response?.data.detail

            if (Array.isArray(msg)) {
                msg.forEach(({ field, code }) => {
                    const message = ERROR_MESSAGES[code].message;
                    if (message) {
                        setError(field, { type: "manual", message });
                    }
                });
            }
        }
    }

    // 수정 모드이면 내 정보 GET
    useEffect(() => {
        if (isEdit) {
            const fetchUserData = async () => {
                try {
                    const res = await apiHelper.get("/mypage/me"); // 내 정보 가져오는 API
                    reset({
                        name: res.name,
                        email: res.email,
                        user_id: res.user_id,
                        login_type: res.login_type,
                        password: '',
                        passwordConfirm: '',
                        phone: res.phone,
                        address: res.address || '',
                        birth_date: res.birth_date || ''
                    });
                } catch (error) {
                    console.log("유저 정보 가져오기 실패", error);
                }
            };
            fetchUserData();
        }
    }, [isEdit, reset]);


    return (
     <>
         <form onSubmit={handleSubmit(onSubmit)}>
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
                 disabled={isEdit}
                 placeholder='이메일을 입력해 주세요.' />
             <ErrorMessage message={errors.email?.message} />

             <UiInput
                 label="아이디"
                 {...register('user_id')}
                 className='mt-5'
                 disabled={isEdit}
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

             {isEdit && (
                 <>
                     <UiInput
                         label="주소"
                         {...register('address')}
                         className='mt-5'
                         placeholder='주소를 입력해 주세요.' />
                     <ErrorMessage message={errors.address?.message} />

                     <UiInput
                         label="생년월일"
                         type='date'
                         {...register('birth_date')}
                         className='mt-5'
                         placeholder='생년월일을 입력해 주세요.' />
                     <ErrorMessage message={errors.birth_date?.message} />
                 </>
             )}
             <UiButton
                 type='submit'
                 size='m'
                 btnText={isEdit ? "정보 수정" : "회원가입"}
                 color={idValue && passwordValue && isValid ? 'blackFill' : 'grayFill'}
                 className='w-full mt-7' />

             {isEdit && <UiButton className='mt-5'
                                  size='s'
                                  color='grayText'
                                  btnText='탈퇴하기' />}
         </form>
     </>
    )
}

export default UserForm;