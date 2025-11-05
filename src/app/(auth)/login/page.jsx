'use client'
import UiInput from "@/components/ui/UiInput";
import UiButton from "@/components/ui/UiButton";
import {useState} from "react";

const LoginPage = () => {
    const [form, setForm] = useState({
        id: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleLogin = (e) => {
    }

    const handleKakaoLogin = (e) => {
    }

    const handleJoin = (e) => {
    }

    return (
        <div className='flex-center'>
            <div className='auth-container'>
                <h1>로그인</h1>
                <UiInput
                    name='id'
                    value={form.id}
                    className='mt-3'
                    onChange={handleChange}
                    placeholder='아이디를 입력해 주세요.'/>
                <UiInput
                    name='password'
                    value={form.password}
                    type="password"
                    className='mt-3 input-pw'
                    onChange={handleChange}
                    placeholder='비밀번호를 입력해 주세요.'/>
                <UiButton
                    onClick={handleLogin}
                    size='m'
                    btnText='로그인'
                    color={form.id && form.password ? 'blackFill' : 'grayFill'}
                    className='mt-7'/>
                <UiButton
                    onClick={handleKakaoLogin}
                    size='m'
                    color='yellowFill'
                    btnText='카카오 간편로그인'
                    btnIcon=''/>
                <UiButton
                    onClick={handleJoin}
                    size='m'
                    color='grayOutline'
                    btnText='회원가입'
                />
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