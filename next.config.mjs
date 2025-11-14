/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // Next.js는 보안을 위해 next/image로 외부 이미지 도메인을 직접 쓸 수 없음
        // 그 도메인을 “허용 리스트”에 등록
        domains: ["cdn-img.thehandsome.com"],
    },
    experimental: {
        // 이 배열에 최적화하려는 패키지 이름을 추가
        optimizePackageImports: [
            'swiper',
            'react-icons',
            '@tanstack/react-query',
            '@tanstack/react-table',
        ],
        legacyBrowsers: false, // 불필요한 폴리필 제거
    },
    swcMinify: false, // dev 모드에서 SWC minify 끄기 → 빌드 속도 향상
};
export default nextConfig;
