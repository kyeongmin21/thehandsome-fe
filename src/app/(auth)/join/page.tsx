import UserForm from "@/components/forms/UserForm";


const JoinPage = () => {
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