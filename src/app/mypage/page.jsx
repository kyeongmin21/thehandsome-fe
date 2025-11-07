'use client'
import useUserStore from "@/store/userStore";

const MyPage = () => {
    const userName = useUserStore((state) => state.userName);

    return (
        <>
            <h1>{`${userName} 마이페이지`}</h1>
        </>
    )
}

export default MyPage