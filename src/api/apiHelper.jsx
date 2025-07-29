import axios from 'axios';

const api = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    access_token: '',
});

// 요청 인터셉터 (선택)
api.interceptors.request.use((config) => {
    // 토큰 붙이기 예시
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
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
