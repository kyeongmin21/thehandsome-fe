import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiHelper from "@/utils/apiHelper";


// 토큰 갱신 함수
async function refreshAccessToken(token) {

    try {
        const res = await apiHelper.post(
            '/refresh',
            {refresh_token: token.refreshToken})
        return {
            ...token,
            accessToken: res.access_token,
            accessTokenExpires: Date.now() + res.expires_in * 1000,
        };
    } catch (error) {
        console.error("🚨 토큰 갱신 실패:", error?.response?.status || error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
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
            // 1. 최초 로그인
            if (user) {
                // 백엔드 사용자 정보와 토큰 정보를 토큰 객체에 저장
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                    accessToken: user.access_token,
                    refreshToken: user.refresh_token,
                    accessTokenExpires: Date.now() + user.expires_in * 1000,
                };
            }

            // 2. jwt() 콜백에서 user가 undefined인 경우 -> 이미 로그인 되어있어 token기반으로 호출되는 모든 요청
            // 토큰이 존재하지만 아직 만료되지 않은 경우 (대부분의 요청)
            // 토큰 만료 시간이 없거나 (오류 방지) 만료 시간이 현재 시간보다 큰 경우
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                return token;
            }

            // 3. 토큰이 만료되었거나 만료 시간이 임박한 경우
            // refreshAccessToken 함수를 호출하여 토큰 갱신을 시도
            console.log("Access Token 만료 또는 만료 임박. 갱신 시도...");
            return refreshAccessToken(token);
        },

        async session({session, token}) {
            // 세션에 백엔드 토큰 추가
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