'use client'

import Image from "next/image";
import Link from 'next/link';
import {MAIN_MENU} from '@/config/Category';
import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {CiUser} from 'react-icons/ci';
import {SlMagnifier, SlLogin, SlLogout, SlHeart, SlBag} from 'react-icons/sl';
import {IoIosArrowForward} from 'react-icons/io';
import {FaHeart} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import useBrandList from '@/hooks/queries/useBrandList';
import useMyBrandList from '@/hooks/queries/useWishedBrands';
import useToggleBrand from '@/hooks/queries/useToggleBrand';
import type {MouseEvent} from 'react';
import {Session} from 'next-auth';
import {BrandItem} from "@/types/brand";


interface HeaderClientProps {
    session: Session | null; // 로그인 안 된 경우 null
}

export const HeaderClient = ({session}: HeaderClientProps) => {
    const router = useRouter();
    const isAuthenticated = !!session

    const [scrolled, setScrolled] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

    const {brandList} = useBrandList();
    const {wishedBrandMap} = useMyBrandList();
    const {toggleBrand} = useToggleBrand();


    const mouseEnter = (idx: number) => {
        setIsShow(true);
        setActiveMenuIndex(idx);
    }

    const mouseLeave = () => {
        setIsShow(false);
        setActiveMenuIndex(null);
    }


    const handleLogout = async () => {
        const isConfirmed = confirm('로그아웃 하시겠습니까?');
        if (!isConfirmed) return

        await signOut({redirect: false})
        alert('로그아웃 처리되었습니다.');
        router.push('/');
    }

    const handleUserClick = () => {
        if (isAuthenticated) {
            router.push('/mypage');
        } else {
            router.push('/login');
        }
    };

    const handleWishClick = () => {
        if (isAuthenticated) {
            router.push('/mypage/wishlist');
        } else {
            alert('로그인이 필요한 서비스입니다.')
            router.push('/login');
        }
    }

    const handleBrandsClick = async (event: MouseEvent<HTMLElement | SVGElement>, code: string) => {
        event.stopPropagation();
        toggleBrand(code);
    }


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className={`header ${scrolled ? 'scrolled' : ''} `}
             onMouseLeave={mouseLeave}>
            <div className='header-top first'>
                <Link href='/' aria-label='메인으로 이동'>
                    <Image className='header-top-logo'
                           src='https://www.thehandsome.com/images/common/header-footer-logo.svg'
                           alt='메인로고 이미지'
                           width={200}
                           height={50}
                           priority={true}  // 중요한 이미지면 바로 로딩
                    />
                </Link>
            </div>

            <div className='header-category'>
                <div className='header-category-left'>
                    <ul className='header-bottom header-menu'>
                        {MAIN_MENU.map((menu, index) => (
                            <li key={`${menu.label}-${index}`}
                                onMouseEnter={() => mouseEnter(index)}>
                                <span className='cursor-pointer'>{menu.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='header-category-right'>
                    <ul className='header-bottom'>
                        <li>매거진</li>
                        <li>기획전</li>
                        <li>이벤트</li>
                        <li>룩북</li>
                    </ul>
                </div>
            </div>

            {isShow && activeMenuIndex !== null && (
                <div className='dropdown-menu absolute shadow-lg flex'>

                    {/* 카테고리 메뉴 */}
                    {MAIN_MENU[activeMenuIndex]?.type === 'category' && (
                        Object.keys(MAIN_MENU[activeMenuIndex].data).map((title) => {
                            const items = MAIN_MENU[activeMenuIndex].data?.[title] as string[];
                            return (
                                <div key={title} className='menu-box'>
                                    <h4 className='title-menu'>
                                        {title} <IoIosArrowForward/>
                                    </h4>
                                    <ul>
                                        {items.map((item) => (
                                            <li key={item} className='sub-menu'>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })
                    )}

                    {/* 브랜드 메뉴 */}
                    {MAIN_MENU[activeMenuIndex]?.type === 'brand' &&
                        brandList.map((group) => (
                            <div key={group.brand_type} className='menu-box'>
                                <h4 className='title-menu'>{group.brand_type} 브랜드</h4>
                                <ul>
                                    {group.brands.map((item: BrandItem) => (
                                        <li key={item.brand_code} className='sub-menu'>
                                             <span className='inline-block mr-2' style={{paddingTop: '1px'}}>
                                                  {wishedBrandMap[item.brand_code] ? (
                                                      <FaHeart size={16}
                                                               onClick={(event) => handleBrandsClick(event, item.brand_code)}/>
                                                  ) : (
                                                      <SlHeart size={16}
                                                               onClick={(event) => handleBrandsClick(event, item.brand_code)}/>
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

            <div className='header-top'>
                <div className='header-top-icon'>
                    <ul>
                        {/* 검색 */}
                        <li><SlMagnifier size={22}/></li>

                        {/* 로그인/로그아웃 */}
                        <li>
                            {isAuthenticated ? (
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
                        <li>
                            <Link href='/cart' aria-label='장바구니로 이동'>
                                <SlBag size={23}/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};