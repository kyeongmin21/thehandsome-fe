'use client'
import {useState} from 'react';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import UserForm from '@/components/forms/UserForm';
import apiHelper from '@/utils/apiHelper';
import {ERROR_MESSAGES} from '@/constants/errorMsg';

interface VerifyResponse {
    verified: boolean;
}

const Page = () => {
    const [password, setPassword] = useState<string>('');
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const handleVerify = async () => {
        try {
            const res: VerifyResponse = await apiHelper.post(
                '/mypage/verify-password',
                {password}
            )
            if (res.verified) {
                setIsVerified(true);
            }
        } catch (error: any) {
            const msg = error?.response?.data.detail;

            if (Array.isArray(msg)) {
                msg.forEach(({code}: {code: string}) => {
                    const message = ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES]?.message;
                    alert(message)
                });
            }
        }
    }

    return (
        <div>
            <h2>개인정보 수정</h2>
            <hr/>
            {isVerified ? (
                <UserForm isEdit={true}/>
            ) : (
                <>
                    <p className='text-sm mb-5'>정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해주세요.</p>
                    <div className='flex gap-4'>
                        <UiInput label=''
                                 type='password'
                                 value={password}
                                 className='w-70'
                                 placeholder='비밀번호를 입력해 주세요.'
                                 onChange={e => setPassword(e.target.value)}/>
                        <UiButton type='button'
                                  size='s'
                                  btnText='완료'
                                  color='grayOutline'
                                  className='px-5'
                                  onClick={handleVerify}/>
                    </div>

                </>
            )}
        </div>
    )
}

export default Page;