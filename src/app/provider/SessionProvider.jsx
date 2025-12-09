'use client'
import {SessionProvider as NextAuthSessionProvider} from "next-auth/react"


// useSession() 훅을 호출하는 곳마다 서버에 세션을 요청할 필요 없이, 캐시된 세션 상태를 읽어올 수 있음
export default function SessionProvider({children}) {
    return (
        <NextAuthSessionProvider
            refetchInterval={0}
            refetchOnWindowFocus={false} // 포커스 시 갱신 끄기: 다른 탭 갔다가 돌아올 때 세션을 다시 호출할까?
        >
            {children}
        </NextAuthSessionProvider>
    )
}