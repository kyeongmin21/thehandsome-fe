'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useSession, signOut} from 'next-auth/react';


export default function AuthStatus() {
    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== 'loading' && session?.error) {
            console.error('🚨 인증 오류 감지:', session.error);

            alert('인증 정보가 만료되었거나 손상되었습니다. 다시 로그인해 주세요.');

            signOut({redirect: false}).then(() => {
                router.replace('/login');
            });
        }
    }, [session, status, router]);

    return null;
}