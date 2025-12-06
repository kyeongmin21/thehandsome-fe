'use server';

import {getServerSession} from 'next-auth';
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function serverSession() {
    // 서버에서 세션과 토큰을 가져옵니다.
    return await getServerSession(authOptions);
}