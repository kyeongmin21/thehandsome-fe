'use client'
import UiInput from "@/components/ui/UiInput";
import {useState} from "react";
import UiButton from "@/components/ui/UiButton";


const JoinPage = (props) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        id: '',
        password: '',
        passwordConfirm: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleJoin = (e) => {
    }


    return (
        <div className='flex-center'>
            <div className='auth-container'>
                <h1>회원가입</h1>
                <UiInput
                    label="이름"
                    name='name'
                    value={form.name}
                    className='mt-3'
                    onChange={handleChange}
                    placeholder='이름을 입력해 주세요.'/>
                <UiInput
                    label="이메일"
                    name='email'
                    value={form.email}
                    className='mt-3'
                    onChange={handleChange}
                    placeholder='이메일을 입력해 주세요.'/>
                <UiInput
                    label="아이디"
                    name='id'
                    value={form.id}
                    className='mt-3'
                    onChange={handleChange}
                    placeholder='아이디를 입력해 주세요.'/>
                <UiInput
                    label="비밀번호"
                    name='password'
                    value={form.password}
                    type="password"
                    className='mt-3 input-pw'
                    onChange={handleChange}
                    placeholder='비밀번호를 입력해 주세요. (15자 이내)'/>
                <UiInput
                    label="비밀번호 확인"
                    name='password'
                    value={form.passwordConfirm}
                    type="password"
                    className='mt-3 input-pw'
                    onChange={handleChange}
                    placeholder='비밀번호를 입력해 주세요. (15자 이내)'/>
                <UiInput
                    label="폰번호"
                    name='phone'
                    value={form.phone}
                    className='mt-3'
                    onChange={handleChange}
                    placeholder='- 제외한 숫자만 입력해 주세요.'/>

                <UiButton
                    onClick={handleJoin}
                    size='m'
                    btnText='회원가입'
                    color={form.id && form.password ? 'blackFill' : 'grayFill'}
                    className='mt-7'/>
            </div>
        </div>
    )
}

export default JoinPage