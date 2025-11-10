import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiHelper from "@/utils/apiHelper";


// 이 파일은 로그인, 로그아웃, 세션 확인 등의 인증 요청을 처리하는 서버 코드입니다.
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const res = apiHelper.post(
                    '/login',
                    credentials,
                    { withCredentials: true }
                )

                const user = res.data.user
                const token = res.data.access_token
                console.log('확인!! user', user, )
                console.log('확인!! token', token, )

                return null;
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
