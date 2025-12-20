import NextAuth from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';

// 핸들러는 실제 API 엔드포인트에서만 정의되어야함
const handler = NextAuth(authOptions);

// Next.js 규격에 맞춰 GET, POST로 내보냄)
export {handler as GET, handler as POST};