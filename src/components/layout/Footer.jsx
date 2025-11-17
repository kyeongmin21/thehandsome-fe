'use client'

import Image from "next/image";
import {FaApple} from "react-icons/fa";
import {IoLogoYoutube, IoLogoInstagram} from "react-icons/io5";
import {FaGooglePlay} from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <hr/>
            <div className="footer layout-custom">
                <div className="footer-wrap">

                    <div className="footer-head">
                        <div className="footer-notice">
                            <h5>공지</h5>
                            <a>[당첨자 발표] 10주년 코트리그 경품 당첨자</a>
                        </div>
                        <div className="footer-stores">
                            <IoLogoInstagram size={28}/>
                            <IoLogoYoutube size={28}/>
                            <FaApple size={28}/>
                            <FaGooglePlay size={22} className='mt-1'/>
                        </div>
                    </div>

                    <div className="footer-body">
                        <div className="footer-company-info">
                            <img className="header-top-logo mb-5"
                                 src="https://www.thehandsome.com/images/common/header-footer-logo.svg"
                                 alt="메인로고 이미지"/>
                            <div className="fci-text">
                                <div>
                                    <span>㈜한섬</span>
                                    <span>대표이사: 김민덕</span>
                                    <span>서울시 강남구 도산대로 523 한섬빌딩</span>
                                </div>
                                <div>
                                    <span>FAX  02-6078-2856</span>
                                    <span>사업자등록번호  120-81-26337</span>
                                    <span>통신판매업신고번호 강남 제 00826호</span>
                                </div>
                                <div>
                                    <span>개인정보관리책임자 : 윤인수</span>
                                    <span>호스팅서비스 : ㈜ 한섬</span>
                                </div>
                                <div className="fci-copy">COPYRIGHT © 2025 HANDSOME. ALL RIGHTS RESERVED.</div>
                            </div>
                        </div>

                        <div className="footer-links">
                            <ul className="fl-col">
                                <li>서비스이용약관</li>
                                <li className='text-black'><b>개인정보처리방침</b></li>
                                <li>통신사업자정보확인</li>
                                <li>채무지급보증 가입 확인</li>
                            </ul>
                            <ul className="fl-col">
                                <li>온라인 멤버십</li>
                                <li>한섬 VVIP 혜택</li>
                                <li>한섬마일리지 혜택</li>
                                <li>반품&amp;환불안내</li>
                            </ul>
                            <ul className="fl-col">
                                <li>고객센터</li>
                                <li>FAQ</li>
                                <li>수선진행조회</li>
                                <li>매장안내</li>
                                <li>고객리뷰</li>
                            </ul>
                            <ul className="fl-col">
                                <li>로그인</li>
                                <li>주문배송조회</li>
                                <li>취소/환불</li>
                                <li>마이하트</li>
                            </ul>
                            <ul className="fl-col">
                                <li>회사소개</li>
                                <li>브랜드 소개</li>
                                <li>투자정보</li>
                                <li>채용정보</li>
                                <li>ESG</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer;