'use client'
import { useState } from 'react';
import UiInput from "@/components/ui/UiInput";
import UiButton from "@/components/ui/UiButton";
import apiHelper from "@/api/apiHelper";


const Page = (data) => {
    const [password, setPassword] = useState("");
    const [verified, setVerified] = useState(null);

    const handleVerify = async () => {
        try {
            const res = await apiHelper.post('/mypage/verify-password', {
                password,
            })
            console.log('비밀번호 맞음')
        } catch (error) {
            console.log('비밀번호 틀림')
            console.log(error);
        }
    }

    return (
        <div>
            <h2>개인정보 수정</h2>
            <hr />
            <p className='text-sm'>정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해주세요.</p>
            <div className='flex'>
                <UiInput label=""
                         type='password'
                         value={password}
                         className='mt-5 w-90'
                         placeholder='비밀번호를 입력해 주세요.'
                         onChange={e => setPassword(e.target.value)}/>
                <UiButton  type='button'
                           size='s'
                           btnText='완료'
                           onClick={handleVerify}/>
            </div>

        </div>
    )
}

export default Page;