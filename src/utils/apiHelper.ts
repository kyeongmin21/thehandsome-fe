import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import {getSession} from "next-auth/react";
import type { Session } from 'next-auth';

let sessionCache: Session | null = null;
let sessionPromise: Promise<Session | null> | null = null;

async function getCachedSession(): Promise<Session | null> {
    // 이미 캐시된 세션이 있다면 즉시 반환
    if (sessionCache) return sessionCache;

    // 이미 getSession 호출이 진행 중이라면, 해당 Promise를 기다립니다.
    if (sessionPromise) return sessionPromise;

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


const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    }
});


// 요청 인터셉터: 토큰을 헤더에 추가하여 서버로 보내기!
api.interceptors.request.use(async (config) => {
    // SSR (서버) 환경에서는 세션 토큰에 접근할 수 없으므로 무시
    if (typeof window === "undefined") {
        return config;
    }

    const session = await getCachedSession();

    const isAuthUrl = config.url?.includes("/login") ||
                    config.url?.includes("/join") ||
                    config.url?.includes("/refresh") ||
                    config.url?.includes("/api/auth/session");

    if (!session || !session.accessToken || isAuthUrl) {
        return config;
    }

    config.headers.Authorization = `Bearer ${session.accessToken}`;
    return config;
});


// 응답 인터셉터: 서버로 부터 받은 응답데이터
api.interceptors.response.use(
    (res) => res.data,
    (error: AxiosError) => Promise.reject(error)
);

const apiHelper = {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return api.get(url, config);
    },
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return api.post(url, data, config);
    },
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return api.put(url, data, config);
    },
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return api.delete(url, config);
    },
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return api.patch(url, data, config);
    },
    axios: api,
};

export default apiHelper;