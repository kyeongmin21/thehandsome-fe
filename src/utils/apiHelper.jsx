import axios from 'axios';
import {getSession} from "next-auth/react";


let sessionCache = null;
let sessionPromise = null;

async function getCachedSession() {
    // 이미 캐시된 세션이 있다면 즉시 반환
    if (sessionCache) {
        return sessionCache;
    }

    // 이미 getSession 호출이 진행 중이라면, 해당 Promise를 기다립니다.
    if (sessionPromise) {
        return sessionPromise;
    }

    // 새로운 Promise를 생성하고 저장
    sessionPromise = getSession();

    try {
        // Promise가 완료될 때까지 대기
        const session = await sessionPromise;
        // 결과를 캐시에 저장 (만료 로직은 NextAuth 세션 자체에 맡깁니다)
        sessionCache = session;
        return session;
    } catch (error) {
        // 에러 발생 시 캐시와 Promise 초기화
        sessionCache = null;
        throw error;
    } finally {
        // 호출이 완료되면 Promise는 초기화
        sessionPromise = null;
    }
}


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


// 요청 인터셉터: 토큰을 헤더에 추가하여 서버로 보내기!
api.interceptors.request.use(async (config) => {
    // SSR (서버) 환경에서는 세션 토큰에 접근할 수 없으므로 무시
    if (typeof window === "undefined") {
        return config;
    }

    const session = await getCachedSession();

    console.log('🔑 인터셉터에서 캐시된 세션:', session);
    console.log(`➡️ 인터셉터 실행: ${config.method.toUpperCase()} ${config.url}`);

    const isAuthUrl = config.url.includes("/login") || config.url.includes("/join") || config.url.includes("/refresh");

    if (!session || !session.accessToken || isAuthUrl) {
        return config;
    }

    config.headers.Authorization = `Bearer ${session.accessToken}`;
    return config;
});


// 응답 인터셉터: 서버로 부터 받은 응답데이터
api.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        // 토큰 갱신 로직은 NextAuth에 있으므로, 여기서는 에러를 그대로 reject 합니다.
        return Promise.reject(error);
    }
);

export default {
    get: api.get,
    post: api.post,
    put: api.put,
    delete: api.delete,
    patch: api.patch,
    axios: api,
};