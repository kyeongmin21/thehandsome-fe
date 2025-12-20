'use client'
import {JSX} from "react";
import UserForm from "@/components/forms/UserForm";


const JoinPage = (): JSX.Element => {
    return (
        <div className="flex-center">
            <div className="auth-container">
                <h1>회원가입</h1>
                <UserForm isEdit={false} />
            </div>
        </div>
    );
};
export default JoinPage