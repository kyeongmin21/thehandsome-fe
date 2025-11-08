'use client'
import useUserStore from "@/store/userStore";

export default function InfoPage() {

    const userName = useUserStore((state) => state.userName);
    return (
        <div>
            <h2>마이페이지</h2>
            <hr />
            <div className="my-page-info">
                <ul>
                    <li>
                        <span className='text'>{userName}</span>님
                    </li>
                    <li>
                        <span className='title'>한섬마일리지</span>
                        <span className='text'>1,000 </span>M
                    </li>
                    <li>
                        <span className='title'>H.Point 김경민</span>
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
