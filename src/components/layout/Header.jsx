'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CiUser} from "react-icons/ci";
import {SlMagnifier, SlLogin, SlLogout, SlHeart, SlBag} from "react-icons/sl";
import Link from "next/link";
import useUserStore from "@/store/userStore";
import {MAIN_MENU} from "@/config/Category";
import {IoIosArrowForward} from "react-icons/io";

export default () => {
    const router = useRouter();
    const login = useUserStore((state) => state.isLoginIn);
    const logout = useUserStore((state) => state.logout);

    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);

    const mouseEnter = (idx) => {
        setIsShow(true);
        setActiveMenuIndex(idx);
    }

    const mouseLeave = (idx) => {
        setIsShow(false);
        setActiveMenuIndex(idx);
    }

    const handleLogout = () => {
        const isConfirmed = confirm('로그아웃 하시겠습니까?');
        if (isConfirmed) {
            logout();
            alert('로그아웃 처리되었습니다.');
            router.push('/');
        }
    }

    const handleUserClick = () => {
        if (login) {
            router.push("/mypage");
        } else {
            router.push("/login");
        }
    };

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`header ${scrolled ? "scrolled" : ""} `}
             onMouseLeave={mouseLeave}>
            <div className="header-top first">
                <Link href='/'>
                    <img className="header-top-logo"
                         src="https://www.thehandsome.com/images/common/header-footer-logo.svg"
                         alt="메인로고 이미지"/>
                </Link>
            </div>

            <div className="header-category">
                <div className="header-category-left">
                    <ul className="header-bottom header-menu">
                        {MAIN_MENU.map((menu, index) => (
                            <li key={`${menu.label}-${index}`}
                                onMouseEnter={() => mouseEnter(index)}>
                                <span className="cursor-pointer">{menu.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="header-category-right">
                    <ul className='header-bottom'>
                        <li>매거진</li>
                        <li>기획전</li>
                        <li>이벤트</li>
                        <li>룩북</li>
                    </ul>
                </div>
            </div>

            {isShow && activeMenuIndex !== null && MAIN_MENU[activeMenuIndex]?.data && (
                <div className="dropdown-menu absolute shadow-lg flex">
                    {Object.keys(MAIN_MENU[activeMenuIndex]?.data).map((title) => (
                        <div key={title} className="menu-box">
                            <h4 className="title-menu">
                                {title}{MAIN_MENU[activeMenuIndex].type === "brand"
                                    ? <> 브랜드</>
                                    : <IoIosArrowForward/>}
                            </h4>
                            {MAIN_MENU[activeMenuIndex].data[title].map((sub) => (
                                <li key={sub} className="sub-menu">
                                    {MAIN_MENU[activeMenuIndex].type === "brand"
                                        && <span className='inline-block mr-2'><SlHeart size={16}/></span>}
                                    {sub}
                                </li>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            <div className="header-top">
                <div className='header-top-icon'>
                    <ul>
                        {/* 검색 */}
                        <li><SlMagnifier size={22}/></li>

                        {/* 로그인/로그아웃 */}
                        <li>
                            {login ? (
                                <div onClick={handleLogout}><SlLogout size={22}/></div>
                            ) : (
                                <div onClick={() => router.push('/login')}><SlLogin size={22}/></div>
                            )}
                        </li>

                        {/* 마이페이지 */}
                        <li onClick={handleUserClick}><CiUser size={25} strokeWidth={.5}/></li>

                        {/* 좋아요 */}
                        <li><SlHeart size={23}/></li>

                        {/* 장바구니 */}
                        <li><Link href="/cart"><SlBag size={23}/></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
