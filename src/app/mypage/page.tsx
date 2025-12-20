'use client'

import {useSession} from "next-auth/react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function InfoPage() {
    const {data: session, status} = useSession();

    // 로딩 중이면 UI 잠시 숨기거나 로딩 표시
    if (status === "loading") {
        return <LoadingSpinner fullScreen/>;
    }

    return (
        <div>
            <h2>마이페이지</h2>
            <hr />
            <div className="my-page-info">
                <ul>
                    <li>
                        <span className='title'>{session?.user?.id}</span>
                        <span className='text'>{session?.user?.name}</span>님
                    </li>
                    <li>
                        <span className='title'>한섬마일리지</span>
                        <span className='text'>1,000 </span>M
                    </li>
                    <li>
                        <span className='title'>H.Point</span>
                        <span className='text'>500 </span>P
                    </li>
                    <li>
                        <span className='title'>e-money</span>
                        <span className='text'>0 </span>P
                    </li>
                    <li>
                        <span className='title'>쿠폰</span>
                        <span className='text'>3 </span>개
                    </li>
                </ul>
            </div>
        </div>
    );
}
