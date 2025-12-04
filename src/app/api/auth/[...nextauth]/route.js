import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiHelper from "@/utils/apiHelper";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                try {
                    const res = await apiHelper.post(
                        '/login',
                        {
                            user_id: credentials.user_id, password: credentials.password
                        });

                    const {user, access_token} = res;
                    if (!user) return null;

                    // 백엔드에서 받은 토큰과 유저 정보 반환
                    return {
                        id: user.user_id,
                        name: user.name,
                        role: user.role,
                        access_token: access_token,
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
        async jwt({token, user, account}) {

            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                };
                token.access_token = user.access_token;
            }
            return token;
        },

        async session({session, token}) {
            // 세션에 백엔드 토큰 추가
            session.user = token.user;
            session.accessToken = token.access_token;
            session.error = token.error;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
}
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};