import QueryProvider from '@/app/provider/QueryProvider';
import SessionProvider from '@/app/provider/SessionProvider';
import {getServerSession} from "next-auth";
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';
import type {PropsWithChildren} from "react";


export default async function RootProvider({children}: PropsWithChildren) {
    const session = await getServerSession(authOptions);

    return (
        <SessionProvider session={session}>
            <QueryProvider>
                {children}
            </QueryProvider>
        </SessionProvider>
    );
}