'use client';
import QueryProvider from '@/app/provider/QueryProvider';
import SessionProvider from '@/app/provider/SessionProvider';


export default function RootProvider({children, session}) {
    return (
        <SessionProvider session={session}>
            <QueryProvider>
                {children}
            </QueryProvider>
        </SessionProvider>
    );
}