'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

const menuList = [
    {id: "", label: "마이페이지"},
    {id: "wishlist", label: "마이하트"},
    {id: "qna", label: "1:1문의"},
    {id: "edit", label: "개인정보 변경/탈퇴"},
];

export default function MyPageLayout({children}) {
    const pathname = usePathname();
    return (
        <div className="mypage-cont flex">

            {/* 왼쪽 메뉴 */}
            <div className="w-60 layout-left">
                {menuList.map((menu) => {
                    const href = menu.id ? `/mypage/${menu.id}` : `/mypage`;
                    const isActive =
                        (menu.id === "" && pathname === "/mypage") ||
                        (menu.id && pathname.startsWith(`/mypage/${menu.id}`));

                    return (
                        <Link href={href}
                              key={menu.id}
                              className={`block py-2 ${isActive ? "text-black" : "text-gray-400"}`}>
                            {menu.label}
                        </Link>
                    )
                })}
            </div>

            {/* 오른쪽 내용 */}
            <div className="layout-right w-full">
                {children}
            </div>
        </div>
    );
}
