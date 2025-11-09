import { NextResponse } from 'next/server'

export function middleware(req) {
    const token = req.cookies.get('access_token')  // JWT 토큰 쿠키에서 가져오기
    const { pathname } = req.nextUrl

    console.log('token', token)
    // /mypage로 시작하는 URL 접근 체크
    if (pathname.startsWith('/mypage') && !token) {
        // 로그인 안 됐으면 로그인 페이지로 리다이렉트
        const loginUrl = new URL('/login', req.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

// 미들웨어를 적용할 경로
export const config = {
    matcher: ['/mypage/:path*'], // /mypage 이하 모든 경로에 적용
}