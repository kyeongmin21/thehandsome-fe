'use client';
import QueryProvider from '@/app/provider/QueryProvider';
import SessionProvider from '@/app/provider/SessionProvider';


export default function RootProvider({children}) {
    return (
        <SessionProvider>
            <QueryProvider>
                {children}
            </QueryProvider>
        </SessionProvider>
    );
}