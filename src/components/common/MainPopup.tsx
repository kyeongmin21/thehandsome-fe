'use client';

import { useState, useEffect, useCallback } from "react";

export default function MainPopup() {
    const [open, setOpen] = useState<boolean>(false);

    // 날짜를 YYYY-MM-DD 형식으로 만드는 도구 함수
    const getTodayString = useCallback(() => {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }, []);

    useEffect(() => {
        const savedDate = localStorage.getItem("hidePopupToday");
        const todayStr = getTodayString();

        // 날짜가 다르다면 로컬스토리지 비우기
        if (savedDate && savedDate !== todayStr) {
            localStorage.removeItem("hidePopupToday");
        }

        // 오늘 날짜로 저장된 기록이 없다면 팝업 띄우기
        if (!localStorage.getItem("hidePopupToday")) {
            const timer = setTimeout(() => setOpen(true), 100);
            return () => clearTimeout(timer);
        }
    }, [getTodayString]);

    const handleCloseToday = () => {
        localStorage.setItem("hidePopupToday", getTodayString());
        setOpen(false);
    };


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
