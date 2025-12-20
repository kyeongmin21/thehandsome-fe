'use client';
import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import type {PropsWithChildren} from "react";


// React Query를 앱 전체에서 사용할 수 있게 초기화하는 Provider 컴포넌트
export default function QueryProvider({children}: PropsWithChildren) {
    const [queryClient] = useState(() =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 0,                    // 쿼리 실패 시 재시도 횟수
                    refetchOnWindowFocus: false, // 윈도우 포커싱 시 자동 리페치 비활성화
                    staleTime: 0,                // 캐시 즉시 만료
                    gcTime: 1000 * 60 * 5,       // 가비지 컬렉션 5분간 보관
                    refetchOnMount: 'always',    // 항상 마운트 시 refetch
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

