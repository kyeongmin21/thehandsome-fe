'use client'

import Link from "next/link";
import {MAIN_MENU} from "@/config/Category";
import {useEffect, useState, memo} from "react";
import {useRouter} from "next/navigation";
import {signOut, useSession} from "next-auth/react"
import {CiUser} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";
import {IoIosArrowForward} from "react-icons/io";
import {SlMagnifier, SlLogin, SlLogout, SlHeart, SlBag} from "react-icons/sl";
import useMyBrandList from "@/hooks/queries/useWishedBrands";
import useToggleBrand from "@/hooks/queries/useToggleBrand";
import useBrandList from "@/hooks/queries/useBrandList";


const Header = ({ initSession }) => {
    const router = useRouter();
    const {data: session, status} = useSession();
    const currentSession = status === 'loading' ? initSession : session;

    const [scrolled, setScrolled] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);

    const {brandList} = useBrandList();
    const {wishedBrandList, wishedBrandMap, isWishedBrandLoading} = useMyBrandList();
    const {toggleBrand} = useToggleBrand();


    const mouseEnter = (idx) => {
        setIsShow(true);
        setActiveMenuIndex(idx);
    }

    const mouseLeave = (idx) => {
        setIsShow(false);
        setActiveMenuIndex(idx);
    }

    const handleLogout = async () => {
        const isConfirmed = confirm('로그아웃 하시겠습니까?');
        if (!isConfirmed) return

        await signOut({redirect: false})
        alert('로그아웃 처리되었습니다.');
        router.push('/');
    }

    const handleUserClick = () => {
        if (currentSession) {
            router.push("/mypage");
        } else {
            router.push("/login");
        }
    };

    const handleWishClick = () => {
        if (currentSession) {
            router.push("/mypage/wishlist");
        } else {
            alert('로그인이 필요한 서비스입니다.')
            router.push("/login");
        }
    }

    const handleBrandsClick = async (code) => {
        toggleBrand(code);
    }

    useEffect(() => {
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

            {isShow && activeMenuIndex !== null && (
                <div className="dropdown-menu absolute shadow-lg flex">

                    {/* 카테고리 메뉴 */}
                    {MAIN_MENU[activeMenuIndex]?.type === "category" &&
                        Object.keys(MAIN_MENU[activeMenuIndex].data).map((title) => (
                            <div key={title} className="menu-box">
                                <h4 className="title-menu">
                                    {title} <IoIosArrowForward/>
                                </h4>
                                <ul>
                                    {MAIN_MENU[activeMenuIndex].data[title].map((item) => (
                                        <li key={item} className="sub-menu">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }

                    {/* 브랜드 메뉴 */}
                    {MAIN_MENU[activeMenuIndex]?.type === "brand" &&
                        brandList.map((group) => (
                            <div key={group.brand_type} className="menu-box">
                                <h4 className="title-menu">{group.brand_type} 브랜드</h4>
                                <ul>
                                    {group.brands.map((item) => (
                                        <li key={item.brand_code} className="sub-menu">
                                             <span className="inline-block mr-2" style={{paddingTop: '1px'}}>
                                                  {wishedBrandMap[item.brand_code] ? (
                                                      <FaHeart size={16}
                                                               onClick={() => handleBrandsClick(item.brand_code)}/>
                                                  ) : (
                                                      <SlHeart size={16}
                                                               onClick={() => handleBrandsClick(item.brand_code)}/>
                                                  )}
                                            </span>
                                            <span>{item.brand_name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }

                </div>
            )}

            <div className="header-top">
                <div className='header-top-icon'>
                    <ul>
                        {/* 검색 */}
                        <li><SlMagnifier size={22}/></li>

                        {/* 로그인/로그아웃 */}
                        <li>
                            {currentSession ? (
                                <div onClick={handleLogout}><SlLogout size={22}/></div>
                            ) : (
                                <div onClick={() => router.push('/login')}><SlLogin size={22}/></div>
                            )}
                        </li>

                        {/* 마이페이지 */}
                        <li onClick={handleUserClick}><CiUser size={25} strokeWidth={.5}/></li>

                        {/* 마이하트 */}
                        <li onClick={handleWishClick}><SlHeart size={23}/></li>

                        {/* 장바구니 */}
                        <li><Link href="/cart"><SlBag size={23}/></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default memo(Header, (prevProps, nextProps) => {

});
