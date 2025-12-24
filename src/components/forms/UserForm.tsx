'use client'
import UiInput from '@/components/ui/UiInput';
import ErrorMessage from '@/components/ui/ErrorMessage';
import UiButton from '@/components/ui/UiButton';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {joinSchema} from '@/utils/validators/join.schema';
import {ERROR_MESSAGES} from '@/constants/errorMsg';
import apiHelper from '@/utils/apiHelper';
import type {z} from 'zod';


interface UserFormProps {
    isEdit: boolean;
}

type JoinFromData = z.infer<typeof joinSchema>;

// 2. 수정 시 필요한 필드들을 추가한 확장 타입 정의
interface UpdateFormData extends JoinFromData {
    address?: string;
    birth_date?: string;
    marketing_agree?: boolean;
    login_type?: string;
}

interface ErrorCode {
    field: any;
    code: string;
}

const UserForm = ({isEdit}: UserFormProps) => {
    const router = useRouter();

    const {
        watch,
        reset,
        register,
        setError,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<UpdateFormData>({
        resolver: zodResolver(joinSchema),
        mode: 'onChange',
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
    const passwordValue = watch('password');

    const onSubmit: SubmitHandler<UpdateFormData> = async (data) => {
        if (isEdit) {
            const fieldsToWatch: (keyof UpdateFormData)[] = ['address', 'marketing_agree', 'birth_date'];
            fieldsToWatch.forEach(name => {
                if (data[name] === undefined) {
                    // data의 타입을 유연하게 처리하기 위해 인덱스 접근
                    (data as any)[name] = watch(name as any);
                }
            });
        }

        try {
            if (isEdit) {
                const res = await apiHelper.put('/mypage/me', data)
                alert(`회원정보가 수정되었습니다.`)
                router.push('/mypage')
            } else {
                const res = await apiHelper.post('/join', data)
                alert(`${data.name}님 회원가입이 완료되었습니다.`)
                router.push('/login')
            }
        } catch (error: any) {
            const msg = error?.response?.data.detail

            if (Array.isArray(msg)) {
                msg.forEach(({ field, code }: ErrorCode) => {
                    // 1. code가 ERROR_MESSAGES의 키 중 하나인지 확인 (타입 단언)
                    const errorCode = code as keyof typeof ERROR_MESSAGES;
                    const errorConfig = ERROR_MESSAGES[errorCode];

                    // 2. 혹시라도 정의되지 않은 에러 코드가 올 수 있으므로 안전하게 체크
                    if (errorConfig) {
                        setError(field, {
                            type: 'manual',
                            message: errorConfig.message
                        });
                    } else {
                        // 정의되지 않은 코드일 경우 기본 에러 메시지 처리
                        setError(field, {
                            type: 'manual',
                            message: '알 수 없는 오류가 발생했습니다.'
                        });
                    }
                });
            }
        }
    }

    const handleDelete = async () => {
        if (!confirm('정말 탈퇴하시겠습니까? 😢')) return;
        try {
            await apiHelper.delete('/mypage/me');
            alert('회원 탈퇴가 완료되었습니다.')
            sessionStorage.removeItem('access_token');
            router.push('/');
        } catch (error) {
            console.error('회원 탈퇴 실패:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
    }

    // 수정 모드이면 내 정보 GET
    useEffect(() => {
        if (isEdit) {
            const fetchUserData = async () => {
                try {
                    const res = await apiHelper.get<UpdateFormData>('/mypage/me');
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
                    console.log('유저 정보 가져오기 실패', error);
                }
            };
            fetchUserData();
        }
    }, [isEdit, reset]);

    return (
     <>
         <form onSubmit={handleSubmit(onSubmit)}>
             <UiInput
                 label='이름'
                 className='mt-5'
                 {...register('name')}
                 placeholder='이름을 입력해 주세요.'/>
             <ErrorMessage message={errors.name?.message} />

             <UiInput
                 label='이메일'
                 {...register('email')}
                 className='mt-5'
                 disabled={isEdit}
                 placeholder='이메일을 입력해 주세요.' />
             <ErrorMessage message={errors.email?.message} />

             <UiInput
                 label='아이디'
                 {...register('user_id')}
                 className='mt-5'
                 disabled={isEdit}
                 placeholder='아이디를 입력해 주세요.' />
             <ErrorMessage message={errors.user_id?.message} />

             <UiInput
                 label='비밀번호'
                 {...register('password')}
                 type='password'
                 className='mt-5 input-pw'
                 placeholder='비밀번호를 입력해 주세요. (15자 이내)' />
             <ErrorMessage message={errors.password?.message} />

             <UiInput
                 label='비밀번호 확인'
                 {...register('passwordConfirm')}
                 type='password'
                 className='mt-5 input-pw'
                 placeholder='비밀번호를 입력해 주세요. (15자 이내)' />
             <ErrorMessage message={errors.passwordConfirm?.message} />

             <UiInput
                 label='폰번호'
                 {...register('phone')}
                 className='mt-5'
                 placeholder='- 제외한 숫자만 입력해 주세요.' />
             <ErrorMessage message={errors.phone?.message} />

             {isEdit && (
                 <>
                     <UiInput
                         label='주소'
                         {...register('address')}
                         className='mt-5'
                         placeholder='주소를 입력해 주세요.' />
                     <ErrorMessage message={errors.address?.message} />

                     <UiInput
                         label='생년월일'
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
                 btnText={isEdit ? '정보 수정' : '회원가입'}
                 color={idValue && passwordValue && isValid ? 'blackFill' : 'grayFill'}
                 className='w-full mt-7' />

             {isEdit && <UiButton className='mt-5'
                                  size='s'
                                  color='grayText'
                                  btnText='탈퇴하기'
                                  onClick={handleDelete}/>}
         </form>
     </>
    )
}

export default UserForm;