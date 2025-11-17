'use client';

import { useState, useEffect } from "react";

export default function MainPopup() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hideToday = localStorage.getItem("hidePopupToday");

        if (!hideToday) {
            setTimeout(() => setOpen(true), 100);
        }
    }, []);

    const handleCloseToday = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = today.getMonth() + 1;
        const dd = today.getDate();
        const value = `${yyyy}-${mm}-${dd}`;

        // 오늘 날짜 저장
        localStorage.setItem("hidePopupToday", value);

        setOpen(false);
    };

    // 날짜가 바뀌면 팝업 다시 나오게 처리
    useEffect(() => {
        const saved = localStorage.getItem("hidePopupToday");
        if (!saved) return;

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = today.getMonth() + 1;
        const dd = today.getDate();
        const todayStr = `${yyyy}-${mm}-${dd}`;

        // 날짜가 달라지면 팝업 리셋
        if (saved !== todayStr) {
            localStorage.removeItem("hidePopupToday");
        }
    }, []);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
            onClick={() => setOpen(false)}>
            <div className="bg-white rounded-xl shadow-xl p-6 w-[360px] relative"
                onClick={(e) => e.stopPropagation()}>

                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-3 top-3 text-xl cursor-pointer">
                    ✕
                </button>

                <h2 className="text-xl font-bold mb-3">📢 공지</h2>
                <p className="text-sm">포트폴리오용 예시로 제작된 것으로,<br /> 실제 서비스가 아니며 상업적 용도로 사용되지 않습니다.</p>
                <div className="flex justify-between mt-5 text-sm ">
                    <button
                        className="underline cursor-pointer"
                        onClick={handleCloseToday}>
                        오늘 하루 보지 않기
                    </button>

                    <button
                        className="underline cursor-pointer"
                        onClick={() => setOpen(false)}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
