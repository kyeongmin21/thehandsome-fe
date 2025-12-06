'use client'
import {useEffect, useState, memo} from "react";
import {useRouter} from "next/navigation";
import {signOut, useSession} from "next-auth/react"
import {CiUser} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";
import {IoIosArrowForward} from "react-icons/io";
import {SlMagnifier, SlLogin, SlLogout, SlHeart, SlBag} from "react-icons/sl";
import Link from "next/link";
import apiHelper from "@/utils/apiHelper";
import {MAIN_MENU} from "@/config/Category";


const Header = ({ initSession, initBrandLike = {} }) => {
    const router = useRouter();
    const {data: session, status} = useSession();
    const currentSession = status === 'loading' ? initSession : session;

    const [scrolled, setScrolled] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [isBrandWished, setIsBrandWished] = useState(() => initBrandLike);
    const [brands, setBrands] = useState([]);

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

    const fetchBrands = async () => {
        try {
            const res = await apiHelper.get('/brands/list')
            setBrands(Array.isArray(res) ? res : []);
        } catch (error) {
            console.log('브랜드 조회 실패')
        }
    }


    const handleBrandsClick = async (code) => {
        const isWished = !!isBrandWished[code];

        // 낙관적 업데이트: UI를 즉시 변경
        const prevState = isBrandWished;
        setIsBrandWished(prev => ({
            ...prev,
            [code]: !isWished, // 즉시 상태를 반전
        }))

        if (currentSession) {
            try {
                const res = await apiHelper.post(
                    '/brandlike/toggle',
                    {brand_code: code});
                // API 성공시 아무것도 하지 않음. 이미 낙관적 업데이트에서 변경됨
            } catch (error) {
                setIsBrandWished(prevState); // 상태를 클릭 전 상태로 되돌림
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
