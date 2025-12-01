'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CiUser} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";
import {IoIosArrowForward} from "react-icons/io";
import {SlMagnifier, SlLogin, SlLogout, SlHeart, SlBag} from "react-icons/sl";
import Link from "next/link";
import useUserStore from "@/store/userStore";
import {MAIN_MENU} from "@/config/Category";
import apiHelper from "@/utils/apiHelper";


export default () => {
    const router = useRouter();
    const login = useUserStore((state) => state.isLoginIn);
    const logout = useUserStore((state) => state.logout);
    const [scrolled, setScrolled] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [isBrandWished, setIsBrandWished] = useState(false);
    const [brands, setBrands] = useState([]);


    const mouseEnter = (idx) => {
        setIsShow(true);
        setActiveMenuIndex(idx);
        // 이미 호출했으면 skip
        if (!Object.keys(isBrandWished).length && login) {
            fetchBrandLike();
        }
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

    const handleWishClick = () => {
        if (login) {
            router.push("/mypage/wishlist");
        } else {
            alert('로그인이 필요한 서비스입니다.')
            router.push("/login");
        }
    }

    const fetchBrands = async () => {
        try {
            const res = await apiHelper.get('/brands/list')
            setBrands(Array.isArray(res) ? res : []);
        } catch (error) {
            console.log('브랜드 조회 실패')
        }
    }

    const fetchBrandLike = async () => {
        if (!login) return
        try {
            const res = await apiHelper.get('/brandlike/my-brands');
            const brandsMap = {};
            res.forEach(item => {
                brandsMap[item.brand_code] = true;
            });
            setIsBrandWished(brandsMap);
        } catch (error) {
            console.log('브랜드 찜하기 리스트 조회 실패', error)
        }
    }

    const handleBrandsClick = async (code) => {
        if (login) {
            try {
                const res = await apiHelper.post(
                    '/brandlike/toggle',
                    {brand_code: code});
                setIsBrandWished((prev) => ({
                    ...prev,
                    [code]: !prev[code], // 해당 상품만 토글
                }))
            } catch (error) {
                console.log('브랜드 찜하기 실패', error);
            }
        } else {
            const ok = confirm("로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?");
            if (ok) {
                router.push('/login');
            }
            return;
        }
    }


    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            logout();
        }
        fetchBrands();
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
                    {MAIN_MENU[activeMenuIndex]?.type === "brand" && Array.isArray(brands) &&
                        brands.map((group) => (
                            <div key={group.brand_type} className="menu-box">
                                <h4 className="title-menu">{group.brand_type} 브랜드</h4>
                                <ul>
                                    {group.brands.map((item) => (
                                        <li key={item.brand_code} className="sub-menu">
                                             <span className="inline-block mr-2" style={{paddingTop: '1px'}}>
                                                  {isBrandWished[item.brand_code] ? (
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
                            {login ? (
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
