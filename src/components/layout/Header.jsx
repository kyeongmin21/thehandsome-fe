'use client'
import {useEffect, useState} from "react";
import {CiUser} from "react-icons/ci";
import {SlMagnifier, SlLogin, SlHeart, SlBag} from "react-icons/sl";
import Link from "next/link";

export default () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-top first">
                <Link href='/'>
                    <img className="header-top-logo"
                         src="https://www.thehandsome.com/images/common/header-footer-logo.svg"
                         alt="메인로고 이미지"/>
                </Link>
            </div>


            <div className="header-category">
                <div className="header-category-left">
                    <ul>
                        <li>카테고리</li>
                        <li>브랜드</li>
                        <li>브랜드</li>
                        <li>아울렛</li>
                        <li>TOP 100</li>
                    </ul>
                </div>
                <div className="header-category-right">
                    <ul>
                        <li>매거진</li>
                        <li>기획전</li>
                        <li>이벤트</li>
                        <li>룩북</li>
                    </ul>
                </div>
            </div>

            <div className="header-top">
                <div className='header-top-icon' >
                    <ul>
                        <li><SlMagnifier size={22}/></li>
                        <li><SlLogin size={22}/></li>
                        <li>
                            <Link href="/login">
                                <CiUser size={25} strokeWidth={.5}/>
                            </Link>
                        </li>
                        <li><SlHeart size={23}/></li>
                        <li>
                            <Link href="/cart">
                                <SlBag size={23}/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
