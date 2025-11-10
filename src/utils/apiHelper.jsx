import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000, // 10초 안에 응답이 안 오면 자동으로 요청을 취소하고 에러 발생
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 브라우저에게 "이 요청에는 인증 정보(쿠키, HTTP 인증 헤더 등)를 포함해야 해"라고 알려줌.
});

// 요청 인터셉터 (선택)
api.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    // 로그인, 회원가입 등 인증이 필요 없는 API는 토큰을 붙이지 않도록 예외 처리
    const isAuthUrl = config.url.includes('/login') || config.url.includes('/join');

    if (accessToken && !isAuthUrl) { // 토큰이 있고, 인증 URL이 아닐 때만
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// 응답 인터셉터 (선택)
api.interceptors.response.use(
    (res) => res.data,
    (err) => {
        // 공통 에러 처리 (예: alert 띄우기, 로그아웃 처리 등)
        console.error('API Error:', err);
        throw err;
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
