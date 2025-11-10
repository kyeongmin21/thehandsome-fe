import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
    const token = req.cookies.get('access_token')

    console.log('서버의 access_token', req.cookies.get('access_token'))
    console.log('트루냐 폴스냐', token)

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/mypage/:path*'],
}