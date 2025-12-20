import QueryProvider from '@/app/provider/QueryProvider';
import SessionProvider from '@/app/provider/SessionProvider';
import type {PropsWithChildren} from "react";


export default function RootProvider({children}: PropsWithChildren) {
    return (
        <SessionProvider>
            <QueryProvider>
                {children}
            </QueryProvider>
        </SessionProvider>
    );
}