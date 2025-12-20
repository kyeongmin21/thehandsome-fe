import {DefaultSession} from "next-auth";

// 1. 백엔드에서 주는 유저 객체 구조
interface MyUser {
    id: string;
    name: string;
    role: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

// 2. NextAuth의 Session 타입을 확장 (프론트엔드에서 세션 사용할 때)
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            role: string;
        } & DefaultSession["user"];
        accessToken?: string;
        refreshToken?: string;
        error?: string;
    }

    // authorize 함수에서 반환하는 값의 타입
    interface User extends MyUser {}
}

// 3. JWT 토큰 내부 구조 확장
declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            name: string;
            role: string;
        };
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: string;
    }
}

interface LoginResponse {
    user: {
        user_id: string;
        name: string;
        role: string;
    };
    access_token: string;
    refresh_token: string;
    expires_in: number;
}