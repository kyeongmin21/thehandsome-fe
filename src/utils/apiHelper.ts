import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import {getSession} from "next-auth/react";

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
    if (typeof window === "undefined") return config;

    const isAuthUrl = config.url?.includes("/login") ||
                    config.url?.includes("/join") ||
                    config.url?.includes("/refresh") ||
                    config.url?.includes("/api/auth/session");

    if (isAuthUrl) return config;

    // 캐시 없이 매번 최신 세션 가져오기
    const session = await getSession();

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

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
