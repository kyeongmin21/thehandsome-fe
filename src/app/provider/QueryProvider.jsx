'use client';
import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

export default function QueryProvider({children}) {
    const [queryClient] = useState(() =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 0, // 쿼리 실패 시 재시도 횟수
                    refetchOnWindowFocus: false, // 윈도우 포커싱 시 자동 리페치 비활성화
                    staleTime: 1000 * 60 * 5, // 5분
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

