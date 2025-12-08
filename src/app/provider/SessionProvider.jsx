'use client'
import {SessionProvider as NextAuthSessionProvider} from "next-auth/react"

export default function SessionProvider({children, session}) {
    return (
        <NextAuthSessionProvider
            session={session}
            refetchInterval={0}
            refetchOnWindowFocus={false} // 포커스 시 갱신 끄기: 다른 탭 갔다가 돌아올 때 세션을 다시 호출할까?
        >
            {children}
        </NextAuthSessionProvider>
    )
}