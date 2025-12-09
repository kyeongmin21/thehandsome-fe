import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiHelper from "@/utils/apiHelper";
import axios from 'axios';

// 무한 루프 차단하기 위해 (인터셉터를 전혀 등록하지 않은 순수한 Axios 인스턴스)
const refreshApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});


async function refreshAccessToken(token) {
    try {
        const res = await refreshApi.post(
            '/refresh',
            {refresh_token: token.refreshToken})
        return {
            ...token,
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
            accessTokenExpires: Date.now() + res.data.expires_in * 1000,
        };
    } catch (error) {
        console.error("🚨 토큰 갱신 실패:", error?.response?.status || error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
            refreshToken: token.refresh_token,
        };
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                try {
                    const res = await apiHelper.post(
                        '/login',
                        {
                            user_id: credentials.user_id,
                            password: credentials.password
                        });

                    const {user, access_token, refresh_token, expires_in} = res;

                    if (!user) return null;

                    // 백엔드에서 받은 토큰과 유저 정보 반환
                    return {
                        id: user.user_id,
                        name: user.name,
                        role: user.role,
                        access_token: access_token,
                        refresh_token: refresh_token,
                        expires_in: expires_in,
                    }

                } catch (error) {
                    const msg = error?.response?.data?.detail
                    if (Array.isArray(msg)) {
                        throw new Error(JSON.stringify(msg));
                    }
                    throw new Error("로그인 실패");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        // 로그인 시 백엔드 토큰을 JWT에 저장
        // jwt() 콜백이 매 요청마다 실행되면 만료 체크 => 자동 갱신
        async jwt({token, user}) {
            // 1. 최초 로그인: 백엔드 사용자 정보와 토큰 정보를 토큰 객체에 저장
            if (user) {
                return {
                    ...token,
                    user: {
                        id: user.id,
                        name: user.name,
                        role: user.role,
                    },
                    accessToken: user.access_token,
                    refreshToken: user.refresh_token,
                    accessTokenExpires: Date.now() + user.expires_in * 1000,
                };
            }

            // 2. jwt() 콜백에서 user가 undefined인 경우 -> 이미 로그인 되어있어 token기반으로 호출되는 모든 요청
            // 토큰이 존재하지만 아직 만료되지 않은 경우 (대부분의 요청)
            const fiveMinutes = 5 * 60 * 1000;
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires - fiveMinutes) {
                return token;
            }

            if (!token.refreshToken) {
                console.error("🚨 토큰 갱신 불가: refreshToken이 없음");
                return { ...token, error: "MissingRefreshTokenError" };
            }

            return refreshAccessToken(token);
        },

        // 세션 콜백: 프론트로 전달되는 값
        async session({session, token}) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.error = token.error;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET

}
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};